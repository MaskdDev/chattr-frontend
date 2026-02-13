import type { Message } from "@/lib/types";
import {
  RoomSubscribeSocketMessage,
  RoomUnsubscribeSocketMessage,
  SocketMessage,
} from "@/lib/socketTypes";
import { gatewayUrl } from "@/lib/utils";

// Create listener types
type MessageListener = (message: Message) => void | Promise<void>;
type EventListener = () => void;
type EventType = "connected" | "reconnected" | "reconnecting";

export class GatewaySocket {
  // Fields
  private socket: WebSocket | null = null;

  // Listeners
  private messageListeners: Map<string, Set<MessageListener>> = new Map();
  private eventListeners: Record<EventType, Set<EventListener>> = {
    connected: new Set(),
    reconnected: new Set(),
    reconnecting: new Set(),
  };

  // Reconnect logic
  private retryCooldown: number = 500;
  private reconnecting: boolean = false;

  // Constructors
  constructor() {
    // Connect to websocket
    this.connect();
  }

  // Methods
  /**
   * Send a message through this websocket.
   */
  sendMessage(message: SocketMessage) {
    this.socket?.send(JSON.stringify(message));
  }

  /**
   * Subscribe to an event from this socket.
   */
  addEventListener(eventType: EventType, listener: EventListener) {
    this.eventListeners[eventType].add(listener);
  }

  /**
   * Unsubscribe from an event from this socket.
   */
  removeEventListener(eventType: EventType, listener: EventListener) {
    this.eventListeners[eventType].delete(listener);
  }

  /**
   * Run all event listeners of a given type.
   */
  private broadcastEvent(eventType: EventType) {
    this.eventListeners[eventType].forEach((listener) => listener());
  }

  /**
   * Subscribe to messages from a given room ID.
   */
  subscribe(roomId: string, listener: MessageListener) {
    // Check if socket is open
    if (this.socket?.readyState === WebSocket.OPEN) {
      if (this.messageListeners.has(roomId)) {
        // Check if room ID is in subscriptions
        this.messageListeners.get(roomId)?.add(listener);
      } else {
        // Add listener to listeners
        this.messageListeners.set(roomId, new Set([listener]));

        // Create subscribe request
        const subscribeRequest: RoomSubscribeSocketMessage = {
          type: "subscribe",
          roomId,
        };

        // Send subscribe request
        this.sendMessage(subscribeRequest);
      }
    } else {
      setTimeout(() => this.subscribe(roomId, listener), 500);
    }
  }

  /**
   * Unsubscribe a listener from messages from a given room ID.
   */
  unsubscribe(roomId: string, listener: MessageListener) {
    // Check if socket is open
    if (this.socket?.readyState === WebSocket.OPEN) {
      // Get listener set
      const listenerSet = this.messageListeners.get(roomId);

      // Check if listener set exists
      if (listenerSet !== undefined) {
        // Delete listener from listener set, if it exists.
        listenerSet.delete(listener);

        // Check if listener set is now empty
        if (listenerSet.size === 0) {
          // Create unsubscribe request
          const unsubRequest: RoomUnsubscribeSocketMessage = {
            type: "unsubscribe",
            roomId: roomId,
          };

          // Send unsubscribe request in 10 seconds, if there are still no listeners
          setTimeout(() => {
            if (!this.messageListeners.get(roomId)?.size) {
              this.sendMessage(unsubRequest);
            }
          }, 10000);
        }
      }
    } else {
      setTimeout(() => this.unsubscribe(roomId, listener), 500);
    }
  }

  /**
   * Connect to the underlying websocket.
   */
  private connect() {
    // Create websocket connection with gateway
    const socket = new WebSocket(gatewayUrl());

    // Set socket
    this.socket = socket;

    // Add listener for messages from gateway
    socket.addEventListener("message", (event) => {
      // Parse message JSON
      const socketMessage: SocketMessage = JSON.parse(event.data);

      // Match message type
      switch (socketMessage.type) {
        // If a ping frame is received
        case "ping": {
          // Respond with pong message
          socket.send(JSON.stringify({ type: "pong" }));
          break;
        }

        // If a new message is received
        case "message":
          // Get message object
          const message = socketMessage.body;

          // Send message to all listeners
          if (this.messageListeners.has(message.roomId)) {
            this.messageListeners.get(message.roomId)?.forEach((listener) => {
              listener(message);
            });
          }
          break;
      }
    });

    // Add listener for websocket opening.
    socket.addEventListener("open", () => {
      // Get subscription keys
      const subKeys = this.messageListeners.keys().toArray();

      // If there are any subscriptions, send subscription message
      if (subKeys.length > 0) {
        const subscribeMessage: RoomSubscribeSocketMessage = {
          type: "subscribe",
          roomIds: subKeys,
        };

        // Send subscribe message
        socket.send(JSON.stringify(subscribeMessage));
      }

      // Broadcast connected event
      this.broadcastEvent("connected");

      // Check if this was a reconnect
      if (this.reconnecting) {
        // Reset retry cooldown and set reconnecting to false.
        this.retryCooldown = 500;
        this.reconnecting = false;

        // Broadcast reconnected event
        this.broadcastEvent("reconnected");
      }
    });

    // Add listener for websocket error.
    socket.addEventListener("error", () => {
      // Close websocket.
      socket.close();
    });

    // Add listener for websocket closing.
    socket.addEventListener("close", async () => {
      // Check if reconnect is necessary (websocket exists)
      if (this.socket !== null) {
        // Check if this is the first reconnect attempt
        if (!this.reconnecting) {
          // Set reconnecting to be true and broadcast reconnecting event
          this.reconnecting = true;
          this.broadcastEvent("reconnecting");
        }

        // Try reconnecting after the retry cooldown
        setTimeout(() => this.connect(), this.retryCooldown);

        // Double retry cooldown
        this.retryCooldown *= 2;
      }
    });
  }

  /**
   * Close this websocket.
   */
  close() {
    this.socket?.close();
    this.socket = null;
  }
}

// Initialise gateway socket
export const gatewaySocket = new GatewaySocket();

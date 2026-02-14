import type { Message, MessageEdit } from "./types.ts";

/**
 * A type representing a websocket message.
 */
export type SocketMessage =
  | MessageEvent
  | PingSocketMessage
  | PongSocketMessage
  | RoomSubscribeSocketMessage
  | RoomUnsubscribeSocketMessage;

/**
 * A type representing the possible websocket message event types.
 */
export type MessageEvent =
  | NewMessageEvent
  | EditMessageEvent
  | DeleteMessageEvent;

/**
 * A type representing a websocket message, indicating a new message has been sent.
 */
export type NewMessageEvent = {
  type: "message_new";
  roomId: string;
  body: Message;
};

/**
 * A type representing a websocket message edit event, indicating a message has been edited.
 */
export type EditMessageEvent = {
  type: "message_edit";
  roomId: string;
  body: MessageEdit;
};

/**
 * A type representing a websocket message delete event, indicating a message has been deleted.
 */
export type DeleteMessageEvent = {
  type: "message_delete";
  roomId: string;
  messageId: string;
};

/**
 * A type representing a PING websocket message.
 */
export type PingSocketMessage = {
  type: "ping";
};

/**
 * A type representing a PONG websocket message.
 */
export type PongSocketMessage = {
  type: "pong";
};

/**
 * A type representing a client requesting to subscribe to one/many given rooms.
 */
export type RoomSubscribeSocketMessage = {
  type: "subscribe";
  roomId?: string;
  roomIds?: string[];
};

/**
 * A type representing a client requesting to unsubscribe from one/many given room.
 */
export type RoomUnsubscribeSocketMessage = {
  type: "unsubscribe";
  roomId?: string;
  roomIds?: string[];
};

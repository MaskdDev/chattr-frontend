import axios from "axios";
import { backendUrl } from "@/lib/utils";
import {
  Invite,
  InviteCreate,
  Message,
  MessageCreate,
  PartialInvite,
  PartialRoom,
  Room,
  RoomCreate,
  RoomPatch,
  UserProfile,
} from "@/lib/types";

/**
 * Make a GET request to the backend and return the JSON response.
 */
async function get<T>(path: string): Promise<T> {
  return (await axios.get(`${backendUrl()}${path}`)).data;
}

/**
 * Make an authenticated GET request to the backend and return the JSON response.
 */
async function getAuthed<T>(path: string): Promise<T> {
  return (await axios.get(`${backendUrl()}${path}`, { withCredentials: true }))
    .data;
}

/**
 * Make an authenticated GET request to the backend using the internal API key and return the JSON response.
 */
async function getAuthedInternal<T>(path: string): Promise<T> {
  return (
    await axios.get(`${backendUrl()}${path}`, {
      headers: { Authorization: `Bearer ${process.env.INTERNAL_API_KEY}` },
      withCredentials: true,
    })
  ).data;
}

/**
 * Make an authenticated POST request to the backend and return the JSON response.
 */
async function postAuthed<T>(path: string, body: object): Promise<T> {
  return (
    await axios.post(`${backendUrl()}${path}`, body, { withCredentials: true })
  ).data;
}

/**
 * Make an authenticated PATCH request to the backend and return the JSON response.
 */
async function patchAuthed<T>(path: string, body: object): Promise<T> {
  return (
    await axios.patch(`${backendUrl()}${path}`, body, { withCredentials: true })
  ).data;
}

/**
 * Make an authenticated DELETE request to the backend and return the JSON response.
 */
async function deleteAuthed<T>(path: string): Promise<T> {
  return (await axios.delete(`${backendUrl()}${path}`)).data;
}

/**
 * Fetch a user using their ID.
 */
export async function getUser(userId: string): Promise<UserProfile> {
  return await get<UserProfile>(`/users/${userId}`);
}

/**
 * Get a summary of all rooms available to the currently logged-in user.
 */
export async function getRooms(): Promise<PartialRoom[]> {
  return (await getAuthed<{ rooms: PartialRoom[] }>("/rooms")).rooms;
}

/**
 * Create a new room as the currently logged-in user.
 */
export async function createRoom(body: RoomCreate): Promise<PartialRoom> {
  return await postAuthed<PartialRoom>("/rooms", body);
}

/**
 * Get information on a specific room.
 *
 * Returns null if the room doesn't exist.
 */
export async function getRoom(
  roomId: string,
  internal: boolean = false,
): Promise<Room | null> {
  try {
    if (internal) {
      return await getAuthedInternal<Room>(`/rooms/${roomId}`);
    } else {
      return await getAuthed<Room>(`/rooms/${roomId}`);
    }
  } catch {
    return null;
  }
}

/**
 * Update an existing room as the currently logged-in user.
 */
export async function updateRoom(
  roomId: string,
  body: RoomPatch,
): Promise<void> {
  await patchAuthed<void>(`/rooms/${roomId}`, body);
}

/**
 * Delete the room with the specified ID.
 */
export async function deleteRoom(roomId: string): Promise<void> {
  await deleteAuthed<void>(`/rooms/${roomId}`);
}

/**
 * Get the members in a specific room.
 */
export async function getMembers(
  roomId: string,
  internal: boolean = false,
): Promise<UserProfile[]> {
  if (internal) {
    return (
      await getAuthedInternal<{ members: UserProfile[] }>(
        `/rooms/${roomId}/members`,
      )
    ).members;
  } else {
    return (
      await getAuthed<{ members: UserProfile[] }>(`/rooms/${roomId}/members`)
    ).members;
  }
}

/**
 * Remove a member from a room.
 */
export async function removeMember(
  roomId: string,
  memberId: string,
): Promise<void> {
  await deleteAuthed<void>(`/rooms/${roomId}/members/${memberId}`);
}

/**
 * Get the invites for a room.
 */
export async function getInvites(roomId: string): Promise<Invite[]> {
  return (await getAuthed<{ invites: Invite[] }>(`/rooms/${roomId}/invites`))
    .invites;
}

/**
 * Create a new invite for a room.
 */
export async function createInvite(
  roomId: string,
  body: InviteCreate,
): Promise<PartialInvite> {
  return await postAuthed<PartialInvite>(`/rooms/${roomId}/invites`, body);
}

/**
 * Get information for a specific invite.
 */
export async function getInvite(inviteCode: string): Promise<Invite> {
  return await getAuthed<Invite>(`/invites/${inviteCode}`);
}

/**
 * Accept an invite with the given code.
 */
export async function acceptInvite(inviteCode: string): Promise<Invite> {
  return await postAuthed<Invite>(`/invites/${inviteCode}`, {});
}
/**
 * Delete the invite with the specified code.
 */
export async function deleteInvite(inviteCode: string): Promise<void> {
  await deleteAuthed<void>(`/invites/${inviteCode}`);
}

/**
 * Get the messages for a room.
 */
export async function getMessages(
  roomId: string,
  limit: number = 25,
  before?: string | null,
  after?: string | null,
): Promise<Message[]> {
  // Construct query string
  let queryString = `?limit=${limit}`;
  if (before) {
    queryString += `&before=${before}`;
  }
  if (after) {
    queryString += `&after=${after}`;
  }

  // Return request
  return (
    await getAuthed<{ messages: Message[] }>(
      `/rooms/${roomId}/messages${queryString}`,
    )
  ).messages;
}

/**
 * Send a new message in a room.
 */
export async function postMessage(
  roomId: string,
  message: MessageCreate,
): Promise<Message> {
  return await postAuthed<Message>(`/rooms/${roomId}/messages`, message);
}

/**
 * Fetch a message from a room.
 */
export async function getMessage(
  roomId: string,
  messageId: string,
): Promise<Message> {
  return await getAuthed<Message>(`/rooms/${roomId}/messages/${messageId}`);
}

/**
 * Edit a message in a room.
 */
export async function editMessage(
  roomId: string,
  messageId: string,
  content: string,
): Promise<void> {
  await patchAuthed<void>(`/rooms/${roomId}/messages/${messageId}`, {
    content,
  });
}

/**
 * Delete a message in a room.
 */
export async function deleteMessage(
  roomId: string,
  messageId: string,
): Promise<void> {
  await deleteAuthed<void>(`/rooms/${roomId}/messages/${messageId}`);
}

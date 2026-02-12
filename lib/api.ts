import axios from "axios";
import { backendUrl } from "@/lib/utils";
import {
  Invite,
  InviteCreate,
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
 */
export async function getRoom(roomId: string): Promise<Room> {
  return await getAuthed<Room>(`/rooms/${roomId}`);
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
export async function getMembers(roomId: string): Promise<UserProfile[]> {
  return (
    await getAuthed<{ members: UserProfile[] }>(`/rooms/${roomId}/members`)
  ).members;
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
  return await postAuthed<PartialInvite>(`/rooms/${roomId}`, body);
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
export async function acceptInvite(inviteCode: string): Promise<void> {
  return await postAuthed<void>(`/invites/${inviteCode}`, {});
}
/**
 * Delete the invite with the specified code.
 */
export async function deleteInvite(inviteCode: string): Promise<void> {
  await deleteAuthed<void>(`/invites/${inviteCode}`);
}

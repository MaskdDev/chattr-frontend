import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { acceptInvite } from "@/lib/api";
import { ApiError, Invite, PartialInvite } from "@/lib/types";
import { AxiosError } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get the backend URL for this deployment.
 */
export function backendUrl(): string {
  return process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
}

/**
 * Get the frontend URL for this deployment.
 */
export function frontendUrl(): string {
  return process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3001";
}

/**
 * Get the websocket gateway URL for this deployment.
 */
export function gatewayUrl(): string {
  return process.env.NEXT_PUBLIC_GATEWAY_URL || "ws://localhost:3000/gateway";
}

/**
 * Format an ISO string.
 */
export function formatIsoString(isoString: string) {
  const dateObject = new Date(isoString);
  const formatOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return dateObject.toLocaleTimeString("en-US", formatOptions);
}

/**
 * Get the fallback initials, given an author name.
 */
export function getInitials(author: string) {
  // Split author name
  const splitName = author.trim().split(/\s+/);

  // Check number of segments
  if (splitName.length === 0) {
    return "@";
  } else if (splitName.length === 1) {
    return splitName[0][0].toUpperCase();
  } else {
    return (splitName[0][0] + splitName[1][0]).toUpperCase();
  }
}

/**
 * Generate a 128 bit nonce for an optimistic resource send.
 */
export function generateNonce(): string {
  return crypto.randomUUID();
}

/**
 * Attempt to accept an invite with the provided code.
 */
export async function attemptInviteAccept(
  invite: Invite,
  router: AppRouterInstance,
) {
  // Try accepting invite
  try {
    // Accept invite
    await acceptInvite(invite.code);

    // Redirect to room
    router.push(`/rooms/${invite.room.id}`);
  } catch (e) {
    if (e instanceof AxiosError && e.status === 409) {
      // Get error object
      const error: ApiError = e.response?.data;

      // Check message
      switch (error.message) {
        case "User is already in room.":
          router.push(`/rooms/${invite.room.id}`);
          break;
        case "Invite has expired.":
        case "Invite has been used up.":
          alert("This invite has expired.");
          break;
      }
    } else {
      alert("Could not accept invite. Please try again later.");
    }
  }
}

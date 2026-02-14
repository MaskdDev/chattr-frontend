import { getInvite } from "@/lib/api";
import { notFound } from "next/navigation";
import InviteScreen from "@/components/InviteScreen";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ inviteId: string }>;
}): Promise<Metadata> {
  // Get invite ID
  const { inviteId } = await params;

  // Fetch invite
  const invite = await getInvite(inviteId);

  // Check if invite exists, and return appropriate metadata.
  if (invite !== null) {
    return {
      title: "Chattr - A simple chatting app!",
      description:
        invite.creator !== null
          ? `${invite.creator.displayName} has invited you to join "${invite.room.name}"!`
          : `You've been invited to join "${invite.room.name}"!`,
      openGraph: {
        images: ["/embed.png"],
      },
      twitter: {
        card: "summary_large_image",
      },
    };
  } else {
    // Return default metadata
    return {
      title: "Chattr - A simple chatting app!",
      description: "This invite does not exist or has expired.",
      openGraph: {
        images: ["/embed.png"],
      },
      twitter: {
        card: "summary_large_image",
      },
    };
  }
}

export default async function InvitePage({
  params,
}: {
  params: Promise<{ inviteId: string }>;
}) {
  // Get invite ID
  const { inviteId } = await params;

  // Fetch invite
  const invite = await getInvite(inviteId);

  // If invite exists, return invite screen
  if (invite) {
    return <InviteScreen invite={invite} />;
  } else {
    // Otherwise, return not found page
    return notFound();
  }
}

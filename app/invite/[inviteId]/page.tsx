import { getInvite } from "@/lib/api";
import { notFound } from "next/navigation";
import InviteScreen from "@/components/InviteScreen";

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

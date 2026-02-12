import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function CreateOrJoinRoom() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center overflow-y-hidden bg-slate-950 sm:space-y-4">
      <a
        className="absolute top-5 left-5 cursor-pointer text-lg text-slate-50 underline"
        onClick={() => authClient.signOut()}
      >
        Sign Out
      </a>
      <h1 className="mb-2.5 text-center text-4xl text-cyan-300 sm:mb-4 sm:text-6xl">
        You aren&#39;t in any rooms!
      </h1>
      <h2 className="mb-3 text-center text-xl text-slate-50 sm:mb-7 sm:text-3xl">
        Create or join one to start chatting.
      </h2>
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Button
          variant="secondary"
          className="h-8 w-36 bg-slate-50 text-slate-950 sm:h-9 sm:w-50 sm:text-lg"
        >
          Create Room
        </Button>
        <Button
          variant="secondary"
          className="h-8 w-36 bg-slate-50 text-slate-950 sm:h-9 sm:w-50 sm:text-lg"
        >
          Join Room
        </Button>
      </div>
    </div>
  );
}

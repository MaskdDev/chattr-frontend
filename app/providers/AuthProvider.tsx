import { createContext, ReactNode, useContext } from "react";
import { authClient, Session } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";

export const AuthContext = createContext<Session | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Get user session
  const { data: session, isPending } = authClient.useSession();

  // Check if session has been fetched
  if (isPending) {
    return (
      <AuthContext.Provider value={session}>
        <div className="flex h-dvh w-dvw flex-col items-center justify-center gap-4 bg-slate-950 sm:gap-7">
          <h1 className="text-center font-sans text-4xl text-cyan-300 sm:text-6xl">
            Authenticating
          </h1>
          <Spinner className="size-8 text-cyan-300 sm:size-16" />
        </div>
      </AuthContext.Provider>
    );
  }
  return (
    <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

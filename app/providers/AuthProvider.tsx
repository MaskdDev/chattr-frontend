import { createContext, ReactNode, useContext } from "react";
import { authClient, Session } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";
import { SessionQueryParams } from "better-auth";

export type AuthContextType = {
  session: Session | null;
  isPending: boolean;
  refetch: (
    queryParams?:
      | {
          query?: SessionQueryParams;
        }
      | undefined,
  ) => Promise<void>;
  isRefetching: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Get user session
  const {
    data: session,
    isPending,
    refetch,
    isRefetching,
  } = authClient.useSession();

  // Return auth provider
  return (
    <AuthContext.Provider value={{ session, isPending, refetch, isRefetching }}>
      {isPending || isRefetching ? (
        <div className="flex h-dvh w-dvw flex-col items-center justify-center gap-4 bg-slate-950 sm:gap-7">
          <h1 className="text-center font-sans text-4xl text-cyan-300 sm:text-6xl">
            Authenticating
          </h1>
          <Spinner className="size-8 text-cyan-300 sm:size-16" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  // Get context, and ensure it isn't null
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider component.");
  }

  // Otherwise, return context
  return context;
}

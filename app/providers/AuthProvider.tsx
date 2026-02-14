import { createContext, ReactNode, useContext } from "react";
import { authClient, Session } from "@/lib/auth-client";
import { SessionQueryParams } from "better-auth";
import LoadingScreen from "@/components/LoadingScreen";
import { UserProfile } from "@/lib/types";
import { getUser } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

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
  userProfile: UserProfile | null;
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

  // Create user profile query
  const { data: userProfile } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () =>
      session?.user.id ? await getUser(session?.user.id) : null,
    enabled: !!session?.user.id,
  });

  // Return auth provider
  return (
    <AuthContext.Provider
      value={{
        session,
        isPending,
        refetch,
        isRefetching,
        userProfile: userProfile ?? null,
      }}
    >
      {children}
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

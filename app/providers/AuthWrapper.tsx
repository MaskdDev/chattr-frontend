import { ReactNode } from "react";
import { useAuth } from "@/app/providers/AuthProvider";
import LoadingScreen from "@/components/LoadingScreen";

export default function AuthWrapper({ children }: { children: ReactNode }) {
  // Use auth
  const { isPending } = useAuth();

  // Check if auth status is pending
  if (isPending) {
    return <LoadingScreen loadingText="Authenticating" />;
  }

  // Otherwise, return children
  return <>{children}</>;
}

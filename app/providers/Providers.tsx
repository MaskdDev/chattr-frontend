"use client";

import { ReactNode, useEffect } from "react";
import { AuthProvider } from "@/app/providers/AuthProvider";
import { gatewaySocket } from "@/lib/sockets";
import { toast } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import AuthWrapper from "@/app/providers/AuthWrapper";

export default function Providers({ children }: { children: ReactNode }) {
  // Add gateway socket event listeners
  useEffect(() => {
    // Create gateway event listeners
    const connectedListener = () => console.log("Connected to gateway.");
    const reconnectingListener = () =>
      toast.loading("Reconnecting to server...", {
        duration: Infinity,
        id: "reconnect-toast",
      });
    const reconnectedListener = () => {
      toast.dismiss("reconnect-toast");
      toast.success("Connected to server!", { id: "reconnect-toast" });
    };

    // Add event listeners
    gatewaySocket.addEventListener("connected", connectedListener);
    gatewaySocket.addEventListener("reconnecting", reconnectingListener);
    gatewaySocket.addEventListener("reconnected", reconnectedListener);

    // Return cleanup function
    return () => {
      gatewaySocket.removeEventListener("connected", connectedListener);
      gatewaySocket.removeEventListener("reconnecting", reconnectingListener);
      gatewaySocket.removeEventListener("reconnected", reconnectedListener);
    };
  }, []);

  // Create query client
  const queryClient = new QueryClient();

  // Return providers
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <AuthWrapper>{children}</AuthWrapper>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

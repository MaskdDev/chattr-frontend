"use client";

import { ReactNode, useEffect } from "react";
import { AuthProvider } from "@/app/providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import { gatewaySocket } from "@/lib/sockets";
import { toast } from "sonner";

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

  // Return providers
  return (
    <AuthProvider>
      {children}
      <Toaster richColors position="top-center" />
    </AuthProvider>
  );
}

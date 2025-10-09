
"use client";

import { AuthProvider } from "@/context/auth-context";
import { CartProvider } from "@/context/cart-context";
import { initializeLocalStorage } from "@/lib/data";

export function AppProviders({ children }: { children: React.ReactNode }) {
  // Initialize the central data store when the app loads
  if (typeof window !== "undefined") {
    initializeLocalStorage();
  }
  
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}

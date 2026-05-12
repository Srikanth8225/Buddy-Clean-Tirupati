"use client";

import { AuthProvider } from "@/context/auth-context";
import { CartProvider } from "@/context/cart-context";
import { initializeLocalStorage } from "@/lib/data";
import { useEffect } from "react";

export function AppProviders({ children }: { children: React.ReactNode }) {
  // Move initialization to a useEffect to avoid blocking the initial render
  // and minimize main-thread work during hydration.
  useEffect(() => {
    initializeLocalStorage();
  }, []);
  
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}

"use client";

import { getAdminPhoneNumbers } from "@/lib/data";
import type { User } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useUser, useClerk } from "@clerk/nextjs";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (phone: string, otp: string, name?: string) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn, user: clerkUser } = useUser();
  const { signOut } = useClerk();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn && clerkUser) {
        const phone = clerkUser.primaryPhoneNumber?.phoneNumber || "";
        const email = clerkUser.primaryEmailAddress?.emailAddress || "";
        const adminPhones = getAdminPhoneNumbers();
        const phoneWithoutCountryCode = phone.replace("+91", "").trim();
        const isAdmin = adminPhones.includes(phoneWithoutCountryCode) || email.toLowerCase() === "admin@buddyclean.store";
        
        setUser({
          uid: clerkUser.id,
          name: clerkUser.fullName || clerkUser.username || "User",
          phone: phone || email,
          isAdmin: isAdmin
        });
      } else {
        setUser(null);
      }
    }
  }, [isLoaded, isSignedIn, clerkUser]);

  const login = (phone: string, otp: string, name?: string) => {
    const redirect = searchParams.get("redirect") || "/";
    router.push(`/login?redirect=${encodeURIComponent(redirect)}`);
  };

  const logout = async () => {
    await signOut();
    setUser(null);
    router.push("/");
  };
  
  const updateUser = async (data: Partial<User>) => {
    if (clerkUser && data.name) {
      const parts = data.name.split(" ");
      const firstName = parts[0] || "";
      const lastName = parts.slice(1).join(" ") || "";
      try {
        await clerkUser.update({
          firstName,
          lastName
        });
      } catch (err) {
        console.error("Failed to update name in Clerk:", err);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading: !isLoaded, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

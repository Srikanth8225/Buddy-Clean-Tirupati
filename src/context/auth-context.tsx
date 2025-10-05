"use client";

import { getAdminPhoneNumbers, getMockUserByPhone } from "@/lib/data";
import type { User } from "@/lib/types";
import { useRouter } from "next/navigation";
import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (phone: string, name: string) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("buddy-clean-user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem("buddy-clean-user");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (phone: string, name: string) => {
    setLoading(true);
    // Simulate API call and OTP verification
    setTimeout(() => {
      const adminPhones = getAdminPhoneNumbers();
      const existingUser = getMockUserByPhone(phone);

      const newUser: User = {
        uid: existingUser ? existingUser.id : `user-${Date.now()}`,
        name: existingUser ? existingUser.name : name,
        phone,
        isAdmin: adminPhones.includes(phone),
      };

      localStorage.setItem("buddy-clean-user", JSON.stringify(newUser));
      setUser(newUser);
      setLoading(false);
      router.push("/");
    }, 1000);
  };

  const logout = () => {
    localStorage.removeItem("buddy-clean-user");
    setUser(null);
    router.push("/");
  };
  
  const updateUser = async (data: Partial<User>) => {
    return new Promise<void>((resolve) => {
        setLoading(true);
        setTimeout(() => {
            if (user) {
                const updatedUser = { ...user, ...data };
                setUser(updatedUser);
                localStorage.setItem("buddy-clean-user", JSON.stringify(updatedUser));
            }
            setLoading(false);
            resolve();
        }, 500);
    });
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

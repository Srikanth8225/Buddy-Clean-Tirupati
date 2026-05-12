
"use client";

import { getAdminPhoneNumbers, getMockUserByPhone, saveCustomer } from "@/lib/data";
import type { User, Customer } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (phone: string, otp: string, name?: string) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("buddy-clean-user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        
        // CRITICAL: Re-verify admin status on mount to handle updates to the admin list
        const adminPhones = getAdminPhoneNumbers();
        const phoneWithoutCountryCode = parsedUser.phone.replace('+91', '');
        const isAdmin = adminPhones.includes(phoneWithoutCountryCode);
        
        setUser({ ...parsedUser, isAdmin });
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem("buddy-clean-user");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (phone: string, otp: string, name?: string) => {
    setLoading(true);
    setTimeout(() => {
      const adminPhones = getAdminPhoneNumbers();
      const phoneWithoutCountryCode = phone.replace('+91', '');
      const existingUser = getMockUserByPhone(phone);
      
      let finalUser: User;

      if (existingUser) {
        finalUser = {
            uid: existingUser.id,
            name: existingUser.name,
            phone: existingUser.phone,
            isAdmin: adminPhones.includes(phoneWithoutCountryCode)
        };
      } else {
        const newUserId = `user-${Date.now()}`;
        finalUser = {
            uid: newUserId,
            name: name || 'New User',
            phone,
            isAdmin: adminPhones.includes(phoneWithoutCountryCode),
        };
        const newCustomer: Customer = {
          id: newUserId,
          name: finalUser.name,
          phone: finalUser.phone,
          createdAt: new Date(),
        };
        saveCustomer(newCustomer);
      }

      localStorage.setItem("buddy-clean-user", JSON.stringify(finalUser));
      setUser(finalUser);
      setLoading(false);
      
      const redirect = searchParams.get('redirect') || '/';
      router.replace(redirect);

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

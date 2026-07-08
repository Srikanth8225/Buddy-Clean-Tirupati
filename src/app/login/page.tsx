"use client";

import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-12">
      <SignIn
        appearance={{
          variables: {
            colorPrimary: "#2d6a30",
            colorBackground: "#F7F7F2",
            borderRadius: "0.5rem",
          },
          elements: {
            card: "border border-[#A7D1AB] shadow-lg rounded-xl p-6",
            headerTitle: "text-2xl font-bold font-headline text-[#2d6a30]",
            headerSubtitle: "text-sm text-[#DFA262]",
            formButtonPrimary: "bg-[#2d6a30] hover:bg-[#2d6a30]/90 text-white font-medium shadow-sm transition-colors",
            footerActionLink: "text-[#DFA262] hover:text-[#DFA262]/80",
          }
        }}
      />
    </div>
  );
}

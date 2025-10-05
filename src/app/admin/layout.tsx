"use client";

import { AdminSidebar } from "@/components/admin-sidebar";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace(`/login?redirect=${pathname}`);
      } else if (!user.isAdmin) {
        router.replace("/");
      }
    }
  }, [user, loading, router, pathname]);

  if (loading || !user || !user.isAdmin) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <SidebarInset className="flex-1 flex flex-col">
            <header className="flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <SidebarTrigger className="md:hidden"/>
                <h1 className="text-lg font-semibold">{pathname.split('/').pop()?.replace('-', ' ')?.replace(/\b\w/g, l => l.toUpperCase()) || 'Dashboard'}</h1>
            </header>
            <main className="flex-1 p-4 md:p-6 bg-muted/40">
                {children}
            </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

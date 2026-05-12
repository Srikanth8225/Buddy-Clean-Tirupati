
"use client";

import { AdminSidebar } from "@/components/admin-sidebar";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import './admin-theme.css';


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace(`/login?redirect=${pathname}`);
      } else if (!user.isAdmin) {
        router.replace("/");
      } else {
        setIsReady(true);
      }
    }
  }, [user, loading, router, pathname]);

  if (loading || !isReady) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Verifying Admin Access...</p>
        </div>
      </div>
    );
  }

  const isDashboard = pathname === '/admin';
  const segments = pathname.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1] || 'Dashboard';
  const pageTitle = lastSegment === 'admin' ? 'Dashboard' : lastSegment.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <SidebarInset className="flex-1 flex flex-col min-w-0">
            <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-background px-4 md:px-6 sticky top-0 z-30">
                <SidebarTrigger className="md:hidden"/>
                {!isDashboard && (
                    <Button asChild variant="outline" size="icon" className="h-8 w-8">
                        <Link href="/admin">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Back to Dashboard</span>
                        </Link>
                    </Button>
                )}
                <h1 className="text-lg font-semibold truncate">{pageTitle}</h1>
            </header>
            <main className="flex-1 p-4 md:p-6 bg-muted/40 overflow-auto">
                {children}
            </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

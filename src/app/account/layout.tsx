"use client";

import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">My Account</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Manage your orders and personal information.
        </p>
      </div>

      <Tabs value={pathname} className="space-y-4">
        <TabsList>
          <TabsTrigger value="/account" asChild>
            <Link href="/account">Profile</Link>
          </TabsTrigger>
          <TabsTrigger value="/account/orders" asChild>
            <Link href="/account/orders">My Orders</Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value={pathname}>
            {children}
        </TabsContent>
      </Tabs>
    </div>
  );
}

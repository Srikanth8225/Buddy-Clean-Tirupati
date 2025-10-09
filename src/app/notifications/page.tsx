
"use client";

import { useEffect, useState } from "react";
import { Bell, BellRing } from "lucide-react";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getNotifications } from "@/lib/data";
import { Notification } from "@/lib/types";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setNotifications(getNotifications());
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">Notifications</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Stay updated with the latest announcements and offers from Buddy Clean.
            </p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Recent Announcements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.length > 0 ? (
                  notifications.map(notif => (
                    <div key={notif.id} className="flex items-start gap-4 p-4 border rounded-md">
                        <div className="bg-primary/10 text-primary p-2 rounded-full mt-1">
                            <Bell className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-semibold">{notif.title}</p>
                            <p className="text-sm text-muted-foreground">{notif.message}</p>
                            <div className="text-xs text-muted-foreground mt-2 flex items-center gap-4">
                                <span>Sent to: <Badge variant="secondary">All users</Badge></span>
                                <span>{format(notif.sentAt, "PPp")}</span>
                            </div>
                        </div>
                    </div>
                  ))
              ) : (
                <div className="text-center text-muted-foreground py-16">
                    <BellRing className="mx-auto h-16 w-16" />
                    <p className="mt-4 text-lg">No new notifications.</p>
                    <p className="mt-1">Check back later for updates!</p>
                </div>
              )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

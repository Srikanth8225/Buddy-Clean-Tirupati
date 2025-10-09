
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Loader2, Calendar as CalendarIcon, BellRing, Bell } from "lucide-react";
import { getNotifications, saveNotification } from "@/lib/data";
import { Notification } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const notificationSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
  sendTime: z.enum(["now", "schedule"]),
  scheduledAt: z.date().optional(),
}).refine(data => {
    if (data.sendTime === 'schedule' && !data.scheduledAt) {
        return false;
    }
    return true;
}, {
    message: "Please select a date and time for scheduled sending.",
    path: ["scheduledAt"],
});

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof notificationSchema>>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      title: "",
      message: "",
      sendTime: "now",
    },
  });
  
  const sendTime = form.watch("sendTime");

  useEffect(() => {
    setNotifications(getNotifications());
  }, []);

  const onSubmit = (data: z.infer<typeof notificationSchema>) => {
    setIsSubmitting(true);
    
    const newNotification: Notification = {
        id: `notif-${Date.now()}`,
        title: data.title,
        message: data.message,
        createdAt: new Date(),
        sentAt: data.sendTime === 'now' ? new Date() : data.scheduledAt!,
    };

    saveNotification(newNotification);
    
    // The UI now reads directly from the updated source of truth
    setNotifications(getNotifications());
    
    toast({
        title: "Notification Sent!",
        description: `Your notification "${data.title}" has been successfully sent/scheduled.`
    });

    form.reset();
    setIsSubmitting(false);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Send Notification</CardTitle>
          <CardDescription>Compose and send a message to your customers.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl><Input placeholder="e.g., Special Holiday Offer" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl><Textarea placeholder="Describe the notification..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sendTime"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Send Time</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex items-center gap-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl><RadioGroupItem value="now" /></FormControl>
                          <FormLabel className="font-normal">Send Now</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl><RadioGroupItem value="schedule" /></FormControl>
                          <FormLabel className="font-normal">Schedule</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {sendTime === "schedule" && (
                 <FormField
                    control={form.control}
                    name="scheduledAt"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Schedule Date</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                )}
                                >
                                {field.value ? (
                                    format(field.value, "PPP")
                                ) : (
                                    <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                date < new Date(new Date().setHours(0,0,0,0))
                                }
                                initialFocus
                            />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
              )}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Notification
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card>
          <CardHeader>
              <CardTitle>Sent Notifications</CardTitle>
              <CardDescription>A log of all previously sent notifications.</CardDescription>
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
                <div className="text-center text-muted-foreground py-8">
                    <BellRing className="mx-auto h-12 w-12" />
                    <p className="mt-4">No notifications sent yet.</p>
                </div>
              )}
          </CardContent>
      </Card>
    </div>
  );
}

    

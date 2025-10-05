
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2, LocateIcon, MapPin } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { saveOrder } from "@/lib/data";
import { Order } from "@/lib/types";

const checkoutSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().min(10, "A detailed address is required"),
  serviceDate: z.date({ required_error: "Please select a date for the service." }),
  paymentMethod: z.enum(["Online", "Cash on Delivery"], { required_error: "Please select a payment method." }),
});

const timeSlots = ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"];

export default function CheckoutPage() {
  const { user, loading: authLoading } = useAuth();
  const { items, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      phone: "",
      paymentMethod: "Online",
    },
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login?redirect=/checkout");
    }
    if (user) {
      form.reset({
        name: user.name,
        phone: user.phone,
        paymentMethod: "Online",
      });
    }
  }, [user, authLoading, router, form]);
  
  const handleUseLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, you would use a geocoding service to convert lat/lng to an address
        toast({ title: "Location Found!", description: "Mock address filled in." });
        form.setValue("address", "123 Mockingbird Lane, Geolocation City, 517501");
      },
      () => {
        toast({ title: "Error", description: "Could not get your location. Please enable location services.", variant: "destructive" });
      }
    );
  };

  function onSubmit(data: z.infer<typeof checkoutSchema>) {
    if (!user) {
        toast({ title: "Error", description: "You must be logged in to place an order.", variant: "destructive" });
        return;
    }
    if (!selectedTime) {
        toast({ title: "Error", description: "Please select a time slot.", variant: "destructive" });
        return;
    }

    setSubmitting(true);
    
    const serviceDateWithTime = new Date(data.serviceDate);
    const [time, modifier] = selectedTime.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    serviceDateWithTime.setHours(hours, minutes);

    const newOrder: Order = {
        id: Date.now().toString().slice(-6),
        customerId: user.uid,
        customerName: data.name,
        customerPhone: data.phone,
        items: items,
        total: cartTotal,
        address: data.address,
        serviceDate: serviceDateWithTime,
        status: 'Pending',
        paymentMethod: data.paymentMethod,
        createdAt: new Date(),
    };

    saveOrder(newOrder);
    
    setTimeout(() => {
        toast({
            title: "Order Placed! 🎉",
            description: "Your booking is confirmed. We'll be in touch shortly.",
        });
        clearCart();
        setSubmitting(false);
        router.push("/account/orders");
    }, 1500);
  }

  if (authLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (items.length === 0 && !submitting) {
     return (
        <div className="container mx-auto text-center py-20">
            <h1 className="text-2xl font-bold">Your cart is empty</h1>
            <p className="text-muted-foreground mt-2">Add some services to your cart before checking out.</p>
            <Button asChild className="mt-4"><Link href="/">Browse Services</Link></Button>
        </div>
     )
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-bold font-headline text-center mb-12">Checkout</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader><CardTitle>1. Contact & Address</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="address" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Address</FormLabel>
                    <div className="relative">
                        <FormControl><Textarea placeholder="Enter your full address including landmarks..." {...field} className="pr-12" /></FormControl>
                        <MapPin className="absolute top-3 right-3 text-muted-foreground" />
                    </div>
                    <FormMessage />
                    <Button type="button" variant="outline" size="sm" onClick={handleUseLocation} className="mt-2">
                        <LocateIcon className="mr-2 h-4 w-4"/> Use My Location
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">Note: Service available only in Tirupati.</p>
                  </FormItem>
                )} />
              </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>2. Schedule Your Service</CardTitle></CardHeader>
                <CardContent className="space-y-4 md:flex md:gap-8">
                    <FormField control={form.control} name="serviceDate" render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date</FormLabel>
                            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                                <PopoverTrigger asChild>
                                <FormControl>
                                    <Button variant={"outline"} className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={(date) => {
                                            field.onChange(date);
                                            setIsCalendarOpen(false);
                                        }}
                                        disabled={(date) => date < new Date(new Date().setHours(0,0,0,0)) || date < new Date("1900-01-01")}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )} />
                     <div>
                        <FormLabel>Time Slot</FormLabel>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                            {timeSlots.map(time => (
                                <Button key={time} type="button" variant={selectedTime === time ? "default" : "outline"} onClick={() => setSelectedTime(time)}>
                                    {time}
                                </Button>
                            ))}
                        </div>
                     </div>
                </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>3. Payment Method</CardTitle></CardHeader>
              <CardContent>
                <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="Online" /></FormControl>
                          <FormLabel className="font-normal">Pay Online (Razorpay)</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="Cash on Delivery" /></FormControl>
                          <FormLabel className="font-normal">Cash on Delivery</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                 {items.map(item => (
                    <div key={item.variantId} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <div className="relative h-12 w-12 rounded-md overflow-hidden">
                                <Image src={item.imageSrc} alt={item.serviceName} fill className="object-cover" />
                            </div>
                            <div>
                               <p className="font-medium">{item.serviceName}</p>
                               <p className="text-muted-foreground">{item.variantName} x{item.quantity}</p>
                            </div>
                        </div>
                        <p className="font-medium">INR {item.price * item.quantity}</p>
                    </div>
                ))}
                <Separator />
                <div className="flex justify-between font-bold text-lg"><p>Total</p><p>INR {cartTotal.toFixed(2)}</p></div>
              </CardContent>
              <CardContent>
                <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Place Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
}

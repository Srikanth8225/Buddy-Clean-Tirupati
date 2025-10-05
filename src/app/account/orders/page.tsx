"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { getOrdersByCustomerId } from "@/lib/data";
import { Order } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function OrdersPage() {
  const { user } = useAuth();
  // In a real app, this would be a data fetch.
  const orders = user ? getOrdersByCustomerId(user.uid) : [];

  const getStatusVariant = (status: Order['status']) => {
    switch (status) {
        case 'Completed': return 'default';
        case 'In Progress': return 'secondary';
        case 'Pending': return 'outline';
        case 'Cancelled': return 'destructive';
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">My Orders</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Here is a history of all your bookings with Buddy Clean.
        </p>
      </div>

      <div className="space-y-8">
        {orders.length > 0 ? (
          orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex-row justify-between items-start">
                <div>
                  <CardTitle>Order #{order.id}</CardTitle>
                  <CardDescription>
                    Placed on {order.createdAt.toLocaleDateString()}
                  </CardDescription>
                </div>
                <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                    <h4 className="font-semibold">Service on:</h4>
                    <p className="text-muted-foreground">{order.serviceDate.toLocaleString([], { dateStyle: 'long', timeStyle: 'short' })}</p>
                </div>
                <Separator />
                <div className="space-y-2">
                    {order.items.map(item => (
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
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 p-4 flex justify-between">
                <span className="text-sm text-muted-foreground">Payment: {order.paymentMethod}</span>
                <div className="font-bold">Total: INR {order.total.toFixed(2)}</div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p>You haven't placed any orders yet.</p>
        )}
      </div>
    </div>
  );
}

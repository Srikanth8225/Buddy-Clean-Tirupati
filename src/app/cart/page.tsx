'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Your Cart</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Review your selected services and proceed to booking when you're ready.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground" />
          <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">Looks like you haven't added any services yet.</p>
          <Button asChild className="mt-6">
            <Link href="/">Explore Services</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <Card key={item.variantId} className="flex items-center p-4">
                <div className="relative h-24 w-24 rounded-md overflow-hidden">
                  <Image src={item.imageSrc} alt={item.serviceName} fill className="object-cover"/>
                </div>
                <div className="flex-grow ml-4">
                    <h3 className="font-semibold">{item.serviceName}</h3>
                    <p className="text-sm text-muted-foreground">{item.variantName}</p>
                    <p className="text-lg font-bold mt-1">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center border rounded-md">
                        <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => updateQuantity(item.variantId, item.quantity - 1)}>
                            <Minus className="h-4 w-4" />
                        </Button>
                        <Input type="number" value={item.quantity} readOnly className="h-9 w-12 text-center border-0 focus-visible:ring-0" />
                        <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => updateQuantity(item.variantId, item.quantity + 1)}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <Button variant="outline" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => removeFromCart(item.variantId)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>
                  Here's a summary of your order.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({cartCount} {cartCount > 1 ? 'items' : 'item'})</span>
                  <span className="font-semibold">₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Taxes & Fees</span>
                  <span>Calculated at checkout</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild size="lg" className="w-full">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

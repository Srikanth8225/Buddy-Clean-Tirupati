
"use client";

import { useToast } from "@/hooks/use-toast";
import type { CartItem, Service, ServiceVariant } from "@/lib/types";
import React, { createContext, useState, useEffect, ReactNode } from "react";

interface CartContextType {
  items: CartItem[];
  addToCart: (service: Service, variant: ServiceVariant) => void;
  removeFromCart: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("buddy-clean-cart");
      if (storedCart) {
        setItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      localStorage.removeItem("buddy-clean-cart");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("buddy-clean-cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (service: Service, variant: ServiceVariant) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.variantId === variant.id
      );

      if (existingItem) {
        toast({
          title: "Item already in cart",
          description: "You can update the quantity in your cart.",
        });
        return prevItems;
      } else {
        const newItem: CartItem = {
          serviceId: service.id,
          serviceName: service.name,
          variantId: variant.id,
          variantName: variant.name,
          price: variant.price,
          quantity: 1,
          imageSrc: service.image.imageUrl,
        };
        toast({
          title: "Added to cart!",
          description: `${service.name} (${variant.name}) has been added.`,
        });
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (variantId: string) => {
    setItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.variantId !== variantId);
      if (newItems.length < prevItems.length) {
          toast({
              title: "Item removed",
              description: "The item has been removed from your cart.",
              variant: "destructive"
          })
      }
      return newItems;
    });
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(variantId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.variantId === variantId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

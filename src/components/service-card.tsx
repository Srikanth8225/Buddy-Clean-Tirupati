

"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/hooks/use-cart";
import { Service } from "@/lib/types";
import { CheckCircle, ShoppingCart, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function ServiceCard({ service }: { service: Service }) {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    service.variants[0].id
  );
  const { addToCart } = useCart();
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const router = useRouter();

  const selectedVariant = service.variants.find(
    (v) => v.id === selectedVariantId
  )!;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(service, selectedVariant);
  };
  
  const handleVariantChange = (value: string) => {
    setSelectedVariantId(value);
  }

  const featuresToShow = featuresExpanded ? service.features : service.features.slice(0, 3);

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg group">
        <Link href={`/service/${service.id}`} className="flex flex-col flex-grow">
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full">
          <Image
            src={service.image.imageUrl}
            alt={service.image.description}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={service.image.imageHint}
          />
        </div>
        <div className="p-6">
          <CardTitle className="font-headline">{service.name}</CardTitle>
          <CardDescription className="mt-2">{service.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6 pt-0">
        <ul className="space-y-2 text-sm text-muted-foreground">
            {featuresToShow.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-1 shrink-0" />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
        {service.features.length > 3 && (
            <Button variant="link" size="sm" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFeaturesExpanded(!featuresExpanded); }} className="p-0 h-auto mt-2">
                {featuresExpanded ? 'View Less' : 'View More'}
                {featuresExpanded ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
            </Button>
        )}
      </CardContent>
      </Link>
      <CardFooter className="flex-col items-start gap-4 p-6 pt-0 bg-muted/50 mt-auto">
        <div className="w-full" onClick={(e) => e.stopPropagation()}>
            <label htmlFor={`variant-select-${service.id}`} className="text-sm font-medium text-muted-foreground">
                Select Variant
            </label>
            <Select value={selectedVariantId} onValueChange={handleVariantChange}>
            <SelectTrigger id={`variant-select-${service.id}`} className="w-full mt-1 bg-background">
                <SelectValue placeholder="Select a size" />
            </SelectTrigger>
            <SelectContent>
                {service.variants.map((variant) => (
                <SelectItem key={variant.id} value={variant.id}>
                    {variant.name}
                </SelectItem>
                ))}
            </SelectContent>
            </Select>
        </div>

        <div className="flex justify-between items-center w-full">
            <div className="text-2xl font-bold text-foreground">
            INR {selectedVariant.price}
            </div>
            <Button onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
            </Button>
        </div>
        <div className="w-full pt-2 border-t">
          <Link href={`/service/${service.id}`} className="text-sm font-medium text-primary hover:underline flex items-center justify-center">
            View Details <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}


export default React.memo(ServiceCard);

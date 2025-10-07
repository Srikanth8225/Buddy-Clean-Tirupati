
'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getServiceById } from '@/lib/data';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCart } from '@/hooks/use-cart';
import { CheckCircle, ShoppingCart } from 'lucide-react';
import { Service, ServiceVariant } from '@/lib/types';
import ServiceCard from '@/components/service-card';
import { getServices } from '@/lib/data';

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const service = getServiceById(params.id);

  if (!service) {
    notFound();
  }
  
  const relatedServices = getServices(service.category).filter(s => s.id !== service.id).slice(0, 3);

  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    service.variants[0].id
  );
  const { addToCart } = useCart();

  const selectedVariant = service.variants.find(
    (v) => v.id === selectedVariantId
  )!;

  const handleAddToCart = () => {
    addToCart(service, selectedVariant);
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className="relative aspect-video w-full rounded-lg overflow-hidden border">
            <Image
              src={service.image.imageUrl}
              alt={service.image.description}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
           {service.gallery && service.gallery.length > 0 && (
            <div className="mt-4">
                <h3 className="text-xl font-semibold mb-3">Gallery</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {service.gallery.map((img) => (
                        <div key={img.id} className="relative aspect-square w-full rounded-lg overflow-hidden border">
                            <Image
                                src={img.imageUrl}
                                alt={img.description}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                            />
                        </div>
                    ))}
                </div>
            </div>
           )}
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">{service.name}</h1>
          <p className="text-lg text-muted-foreground">{service.description}</p>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">What's included:</h3>
            <ul className="space-y-3">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4 rounded-lg border bg-muted/50 p-6">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label htmlFor={`variant-select-${service.id}`} className="text-sm font-medium">
                        Select Variant
                    </label>
                    <Select value={selectedVariantId} onValueChange={setSelectedVariantId}>
                        <SelectTrigger id={`variant-select-${service.id}`} className="w-full bg-background">
                            <SelectValue placeholder="Select an option" />
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
                <div className="space-y-2">
                     <p className="text-sm font-medium">Price</p>
                     <p className="text-3xl font-bold text-foreground">INR {selectedVariant.price}</p>
                </div>
             </div>

            <Button onClick={handleAddToCart} size="lg" className="w-full">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      
      {relatedServices.length > 0 && (
        <div className="mt-20">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">Related Services</h2>
                <p className="mt-2 text-lg text-muted-foreground">
                    Other services you might be interested in.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedServices.map((relatedService) => (
                    <ServiceCard key={relatedService.id} service={relatedService} />
                ))}
            </div>
        </div>
      )}
    </div>
  );
}

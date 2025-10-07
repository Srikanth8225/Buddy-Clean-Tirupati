
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
import { Separator } from '@/components/ui/separator';

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const service = getServiceById(params.id);

  if (!service) {
    notFound();
  }
  
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

        {service.process && service.process.length > 0 && (
            <div className="mt-16">
                <Separator />
                <div className="py-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">Our Cleaning Process</h2>
                    <div className="relative">
                        <div className="absolute left-1/2 h-full w-0.5 bg-border -translate-x-1/2 hidden md:block" aria-hidden="true"></div>
                        <div className="space-y-12 md:space-y-16">
                        {service.process.map((step, index) => (
                            <div key={step.step} className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                                <div className="md:w-1/2 flex-shrink-0">
                                    <div className="md:max-w-md mx-auto">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="bg-primary text-primary-foreground h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold shrink-0">
                                                {step.step}
                                            </div>
                                            <h3 className="text-2xl font-bold font-headline">{step.title}</h3>
                                        </div>
                                        <p className="mt-2 text-muted-foreground">{step.description}</p>
                                    </div>
                                </div>
                                <div className="md:w-1/2">
                                    <div className="relative aspect-video w-full max-w-md mx-auto bg-muted rounded-lg border overflow-hidden">
                                      <Image 
                                        src={step.image.imageUrl}
                                        alt={step.title}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={step.image.imageHint}
                                      />
                                    </div>
                                </div>
                             </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}

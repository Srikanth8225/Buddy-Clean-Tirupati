import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, Home as HomeIcon, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import placeholderImages from '@/lib/placeholder-images.json';
import { cn } from '@/lib/utils';
import { Service, getServices } from '@/lib/data';
import ServiceCard from '@/components/service-card';

const heroImage = placeholderImages.placeholderImages.find(p => p.id === 'hero-1');

export default function Home() {
  const featuredServices = getServices().slice(0, 3);
  
  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            priority
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center gap-6 p-4">
          <div className="flex items-center gap-3 rounded-full bg-primary/20 px-4 py-2 text-primary-foreground backdrop-blur-sm">
            <Sparkles className="h-6 w-6 text-accent" />
            <span className="font-semibold">Your Trusted Cleaning Partner in Tirupati</span>
          </div>
          <h1 className="text-4xl font-bold md:text-6xl font-headline tracking-tight text-shadow-lg">
            Impeccable Cleaning, Every Time
          </h1>
          <p className="max-w-2xl text-lg text-primary-foreground/90">
            From sparkling homes to gleaming cars, Buddy Clean delivers professional cleaning services tailored to your needs. Book now and experience the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/services/home-cleaning">
                <HomeIcon className="mr-2 h-5 w-5" />
                Book Home Cleaning
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/services/car-wash">
                <Car className="mr-2 h-5 w-5" />
                Book Car Wash
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Popular Services</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Discover our range of services designed to make your life easier and your spaces cleaner.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/services/home-cleaning">Explore All Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

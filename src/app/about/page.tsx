
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import placeholderImages from '@/lib/placeholder-images.json';
import Link from "next/link";
import { Button } from "@/components/ui/button";

const teamMembers = [
  {
    name: 'Rishi',
    role: 'Founder & CEO',
    avatarId: 'avatar-1'
  },
  {
    name: 'Sreekanth',
    role: 'Head of Operations',
    avatarId: 'avatar-3'
  },
];

const aboutHeroImage = placeholderImages.placeholderImages.find(p => p.id === 'home-cleaning-3');

export default function AboutUsPage() {
  return (
    <div className="flex flex-col">
      <section className="relative h-80 w-full flex items-center justify-center text-center text-white">
        {aboutHeroImage && (
            <Image
                src={aboutHeroImage.imageUrl}
                alt={aboutHeroImage.description}
                fill
                priority
                className="object-cover"
                data-ai-hint={aboutHeroImage.imageHint}
            />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center gap-4 p-4">
          <h1 className="text-4xl font-bold md:text-5xl font-headline tracking-tight">About Buddy Clean</h1>
          <p className="max-w-2xl text-lg text-primary-foreground/90">
            Your trusted partner for a sparkling clean home and car in Tirupati.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold font-headline text-primary">Our Story</h2>
            <p className="text-muted-foreground text-lg">
              Founded with a simple mission to make professional cleaning services accessible and hassle-free, Buddy Clean started as a small team of passionate individuals dedicated to perfection. We saw a need in Tirupati for a reliable, high-quality cleaning service that residents and businesses could trust.
            </p>
            <p className="text-muted-foreground text-lg">
              Today, we've grown into a beloved local brand, known for our meticulous attention to detail, friendly staff, and commitment to customer satisfaction. Whether it's your home that needs a refresh or your car that deserves a showroom shine, we're the buddies you can count on.
            </p>
            <Button asChild size="lg">
              <Link href="/services">Explore Our Services</Link>
            </Button>
          </div>
          <div className="relative h-80 w-full rounded-lg overflow-hidden">
            <Image
                src="https://images.unsplash.com/photo-1595704982635-a6a380a06c58?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Our cleaning team"
                fill
                className="object-cover"
                data-ai-hint="cleaning team"
            />
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold font-headline mb-12">Meet the Team</h2>
            <div className="flex flex-wrap justify-center gap-8">
                {teamMembers.map((member) => {
                    const avatarImage = placeholderImages.placeholderImages.find(p => p.id === member.avatarId);
                    return (
                        <div key={member.name} className="flex flex-col items-center gap-4">
                            <Avatar className="h-32 w-32 border-4 border-background">
                                {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt={member.name} />}
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="text-center">
                                <h3 className="text-xl font-semibold">{member.name}</h3>
                                <p className="text-muted-foreground">{member.role}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
      </section>
    </div>
  );
}

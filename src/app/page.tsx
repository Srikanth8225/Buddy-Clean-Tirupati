
import { Button } from '@/components/ui/button';
import { Car, Home as HomeIcon, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import placeholderImages from '@/lib/placeholder-images.json';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const heroImage = placeholderImages.placeholderImages.find(p => p.id === 'hero-1');

const faqItems = [
    {
        question: 'What areas in Tirupati do you serve?',
        answer: 'We serve all major areas within Tirupati city limits. If you are unsure whether your location is covered, please feel free to contact us.'
    },
    {
        question: 'How can I book a service?',
        answer: 'You can book a service directly through our website. Simply browse our services, select the one you need, choose a variant, and add it to your cart. Then, proceed to checkout to schedule your appointment.'
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept online payments through Razorpay (which supports credit cards, debit cards, UPI, and more) as well as Cash on Delivery (COD).'
    },
    {
        question: 'Are your cleaning products safe for pets and children?',
        answer: 'Yes, we prioritize the safety of your family. We use high-quality, eco-friendly, and non-toxic cleaning products that are safe for both children and pets.'
    }
]

export default function Home() {
  
  return (
    <div className="flex flex-col">
      <section className="relative h-[calc(100vh-4rem)] w-full flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            priority
            className="object-cover"
            sizes="100vw"
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
            Your Cleaning Buddy.
          </h1>
          <p className="max-w-2xl text-lg text-primary-foreground/90">
            Home & car cleaning, tailored for you. Book now for a sparkling clean experience.
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

      <section id="faq" className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
           <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">Frequently Asked Questions</h2>
                <p className="mt-2 text-lg text-muted-foreground">
                    Have questions? We've got answers.
                </p>
            </div>
            <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="text-lg font-semibold text-left">{item.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
      </section>
    </div>
  );
}

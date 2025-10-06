import ServiceCard from "@/components/service-card";
import { getServices } from "@/lib/data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function HomeCleaningPage() {
  const homeServices = getServices('home');

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
       <div className="mb-8">
            <Link href="/" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
            </Link>
        </div>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Home Cleaning Services</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Enjoy a spotless home without the hassle. We offer cleaning packages for every need.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {homeServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}

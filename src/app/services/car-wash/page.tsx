import ServiceCard from "@/components/service-card";
import { getServices } from "@/lib/data";

export default function CarWashPage() {
  const carServices = getServices('car');

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Vehicle Wash Services</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Give your car the care it deserves. Our meticulous washing and detailing services will leave your vehicle looking brand new, inside and out.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {carServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function ContactUsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Contact Us</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Have a question or need a custom quote? We'd love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
            <Card>
                <CardHeader className="flex-row items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <Phone className="h-6 w-6" />
                    </div>
                    <div>
                        <CardTitle>Phone</CardTitle>
                        <CardDescription>
                            Reach out to us directly for immediate assistance.
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <a href="tel:+918096092423" className="text-lg font-semibold text-primary hover:underline">+91 80960 92423</a>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex-row items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <Mail className="h-6 w-6" />
                    </div>
                    <div>
                        <CardTitle>Email</CardTitle>
                        <CardDescription>
                            For inquiries and support, send us an email.
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                     <a href="mailto:support@buddyclean.in" className="text-lg font-semibold text-primary hover:underline">support@buddyclean.in</a>
                </CardContent>
            </Card>

             <Card>
                <CardHeader className="flex-row items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                        <CardTitle>Our Office</CardTitle>
                        <CardDescription>
                            We are a locally operated business based in Tirupati.
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                     <p className="text-lg font-semibold">Tirupati, Andhra Pradesh, India</p>
                </CardContent>
            </Card>
        </div>

        <Card className="h-fit">
            <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you shortly.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="first-name">First Name</Label>
                            <Input id="first-name" placeholder="Srinivas" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="last-name">Last Name</Label>
                            <Input id="last-name" placeholder="Rao" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="name@example.com" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" placeholder="Your message..." />
                    </div>
                    <Button type="submit" className="w-full">Send Message</Button>
                </form>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

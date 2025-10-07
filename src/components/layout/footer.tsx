
"use client";

import Logo from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram } from "lucide-react";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";

export default function Footer() {
    const { user } = useAuth();
    const pathname = usePathname();
    const whatsappLink = `https://wa.me/918096092423?text=${encodeURIComponent("Hello Buddy Clean! I'm interested in your services.")}`;

    const isAdminPath = pathname.startsWith('/admin');
    if (isAdminPath) return null;

    return (
        <footer className="bg-muted/50 border-t">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Logo />
                        <p className="text-sm text-muted-foreground">Your trusted partner for a sparkling clean home and car in Tirupati.</p>
                        <div className="flex items-center gap-4">
                            <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                                <Instagram className="h-6 w-6" />
                                <span className="sr-only">Instagram</span>
                            </a>
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                                <WhatsappIcon className="h-6 w-6 fill-current" />
                                <span className="sr-only">WhatsApp</span>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <Link href="/services/home-cleaning" className="hover:text-foreground">Home Cleaning</Link>
                            <Link href="/services/car-wash" className="hover:text-foreground">Car Wash</Link>
                             {user?.isAdmin && (
                                <Link href="/admin" className="hover:text-foreground font-medium text-primary">Admin Dashboard</Link>
                            )}
                        </nav>
                    </div>
                     <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <Link href="/about" className="hover:text-foreground">About Us</Link>
                            <Link href="/contact" className="hover:text-foreground">Contact Us</Link>
                            <Link href="/refund-policy" className="hover:text-foreground">Refund & Cancellation</Link>
                        </nav>
                    </div>
                     <div>
                        <h4 className="font-semibold mb-4">Contact</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <p>Tirupati, Andhra Pradesh</p>
                             <a href="tel:+918096092423" className="block hover:text-foreground">+91 80960 92423</a>
                             <a href="mailto:buddycleanservices@gmail.com" className="block hover:text-foreground">buddycleanservices@gmail.com</a>
                        </div>
                    </div>
                </div>
                <Separator className="my-6" />
                <div className="text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Buddy Clean. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}

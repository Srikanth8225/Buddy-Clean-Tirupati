import Logo from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-muted/50">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <Logo />
                    <nav className="flex gap-6 text-sm text-muted-foreground">
                        <Link href="/services/home-cleaning" className="hover:text-foreground">Home Cleaning</Link>
                        <Link href="/services/car-wash" className="hover:text-foreground">Car Wash</Link>
                        <Link href="/#faq" className="hover:text-foreground">FAQs</Link>
                    </nav>
                </div>
                <Separator className="my-6" />
                <div className="text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Buddy Clean. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}

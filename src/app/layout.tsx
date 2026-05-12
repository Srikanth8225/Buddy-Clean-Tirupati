import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/app/providers';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import { cn } from '@/lib/utils';
import Footer from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'Buddy Clean - Professional Cleaning Services in Tirupati',
  description: 'Experience premium home cleaning and car wash services in Tirupati. Trusted local experts for deep cleaning, sofa shampooing, water tank cleaning, and vehicle detailing. Book your appointment online today!',
  applicationName: 'Buddy Clean',
  keywords: ['cleaning services', 'Tirupati', 'home cleaning', 'car wash', 'deep cleaning', 'sofa shampooing', 'water tank cleaning', 'best cleaning service Tirupati'],
  authors: [{ name: 'Buddy Clean Team' }],
  creator: 'Buddy Clean',
  publisher: 'Buddy Clean',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://buddy-clean-demo.web.app',
    siteName: 'Buddy Clean',
    title: 'Buddy Clean - Professional Cleaning Services in Tirupati',
    description: 'Expert home and car cleaning services in Tirupati. Quality care for your space and vehicle.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6954?auto=format&fit=crop&q=80&w=1200&h=630',
        width: 1200,
        height: 630,
        alt: 'Buddy Clean Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buddy Clean - Professional Cleaning Services in Tirupati',
    description: 'Expert home and car cleaning services in Tirupati.',
    images: ['https://images.unsplash.com/photo-1581578731548-c64695cc6954?auto=format&fit=crop&q=80&w=1200&h=630'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-body antialiased min-h-screen bg-background', inter.variable)}>
        <AppProviders>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}

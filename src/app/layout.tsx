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
  description: 'Experience premium home cleaning and car wash services in Tirupati. Trusted experts for deep cleaning, sofa shampooing, and vehicle detailing.',
  manifest: '/manifest.json',
  keywords: ['cleaning services', 'Tirupati', 'home cleaning', 'car wash', 'deep cleaning', 'sofa shampooing'],
  authors: [{ name: 'Buddy Clean Team' }],
  viewport: 'width=device-width, initial-scale=1',
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

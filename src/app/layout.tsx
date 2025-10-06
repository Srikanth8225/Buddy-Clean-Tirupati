import type { Metadata } from 'next';
import { PT_Sans } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/app/providers';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Buddy Clean',
  description: 'Car and Home Cleaning Services in Tirupati',
  manifest: '/manifest.json',
};

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-pt-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-body antialiased', ptSans.variable)}>
        <AppProviders>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main>{children}</main>
            {/* <Footer /> */}
          </div>
          <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}

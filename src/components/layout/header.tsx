'use client';

import {
  ArrowLeft,
  Car,
  Home as HomeIcon,
  LogOut,
  Menu,
  ShieldCheck,
  ShoppingCart,
  User as UserIcon,
  Wrench,
  ListOrdered,
  Bell,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import Logo from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/hooks/use-auth';
import { useCart } from '@/hooks/use-cart';
import { cn } from '@/lib/utils';
import { WhatsappIcon } from '@/components/icons/whatsapp-icon';
import { getNotifications, markAllNotificationsAsRead } from '@/lib/data';
import { useLocalStorageSync } from '@/hooks/use-local-storage-sync';
import { Show, UserButton } from '@clerk/nextjs';
import { Notification } from '@/lib/types';

const navLinks = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/services', label: 'All Services', icon: Wrench },
  { href: '/services/home-cleaning', label: 'Home Cleaning', icon: HomeIcon },
  { href: '/services/car-wash', label: 'Car Wash', icon: Car },
];

export default function Header() {
  const { user, logout, loading } = useAuth();
  const { cartCount } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = () => {
    setNotifications(getNotifications());
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useLocalStorageSync('buddy-clean-notifications', fetchNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = () => {
    markAllNotificationsAsRead();
    fetchNotifications(); // Re-fetch to update the state immediately
  }

  const isAdminPath = pathname.startsWith('/admin');

  if (isAdminPath) return null; // Don't render the main header in the admin area

  const whatsappLink = `https://wa.me/918096092423?text=${encodeURIComponent("Hello Buddy Clean! I'm interested in your services.")}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        <nav className="hidden md:flex md:ml-6 md:items-center md:gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === link.href ? 'text-foreground' : 'text-foreground/60'
              )}
            >
              {link.label}
            </Link>
          ))}
          {user && !user.isAdmin && (
             <Link
                href="/account/orders"
                className={cn(
                    'transition-colors hover:text-foreground/80',
                    pathname.startsWith('/account') ? 'text-foreground' : 'text-foreground/60'
                )}
                >
                My Account
            </Link>
          )}
          {user?.isAdmin && (
             <Link
                href="/admin"
                className={cn(
                    'flex items-center gap-2 transition-colors hover:text-foreground/80',
                    pathname.startsWith('/admin') ? 'text-foreground' : 'text-foreground/60'
                )}
                >
                <ShieldCheck className="h-5 w-5" />
                Admin
            </Link>
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2">
             <Button asChild size="icon" className="bg-[#25D366] hover:bg-[#1EBE57] text-white">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                    <WhatsappIcon className="h-5 w-5 fill-white" />
                </a>
            </Button>

            <Button asChild variant="ghost" size="icon" className="relative" onClick={handleNotificationClick}>
                <Link href="/notifications" aria-label="Notifications">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-5 w-5 justify-center rounded-full p-0 text-xs"
                        >
                        {unreadCount}
                        </Badge>
                    )}
                </Link>
            </Button>

          <Button asChild variant="ghost" size="icon" className="relative">
            <Link href="/cart" aria-label="Shopping Cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 justify-center rounded-full p-0 text-xs"
                >
                  {cartCount}
                </Badge>
              )}
            </Link>
          </Button>

          {!loading && (
            <>
              <Show when="signed-out">
                <Button asChild size="sm" className="hidden md:flex">
                  <Link href="/login">Login</Link>
                </Button>
              </Show>
              <Show when="signed-in">
                <div className="flex items-center gap-4">
                  {user?.isAdmin && (
                    <Button asChild variant="outline" size="sm" className="hidden md:flex">
                      <Link href="/admin">Admin Panel</Link>
                    </Button>
                  )}
                  <UserButton />
                </div>
              </Show>
            </>
          )}

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full">
              <div className="flex justify-between items-center mb-6">
                <Logo />
              </div>
              <nav className="flex flex-col gap-4 text-lg font-medium">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-muted',
                      pathname === link.href ? 'bg-muted' : ''
                    )}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                ))}
                 <Link
                    href="/notifications"
                    onClick={() => {
                        handleNotificationClick();
                        setMobileMenuOpen(false);
                    }}
                    className={cn(
                        'flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-muted',
                        pathname.startsWith('/notifications') ? 'bg-muted' : ''
                    )}
                >
                    <Bell className="h-5 w-5" />
                    Notifications
                </Link>
                {user && (
                    <Link
                        href="/account"
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                            'flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-muted',
                            pathname.startsWith('/account') ? 'bg-muted' : ''
                        )}
                    >
                        <UserIcon className="h-5 w-5" />
                        My Account
                    </Link>
                )}
                 {user?.isAdmin && (
                    <Link
                        href="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                            'flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-muted',
                            pathname.startsWith('/admin') ? 'bg-muted' : ''
                        )}
                    >
                        <ShieldCheck className="h-5 w-5" />
                        Admin
                    </Link>
                )}
              </nav>
              {!loading && (
                <>
                  <Show when="signed-out">
                    <Button asChild size="lg" className="w-full mt-8">
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                    </Button>
                  </Show>
                  <Show when="signed-in">
                    <div className="mt-8 flex justify-center">
                      <UserButton />
                    </div>
                  </Show>
                </>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

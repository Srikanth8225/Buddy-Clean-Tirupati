
"use client";

import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ListOrdered,
  LogOut,
  Shield,
  Users,
  Wrench,
} from 'lucide-react';
import Link from 'next/link';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import Logo from '@/components/logo';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, tooltip: 'Dashboard' },
  { href: '/admin/orders', label: 'Orders', icon: ListOrdered, tooltip: 'Orders' },
  { href: '/admin/services', label: 'Services', icon: Wrench, tooltip: 'Services' },
  { href: '/admin/customers', label: 'Customers', icon: Users, tooltip: 'Customers' },
  { href: '/admin/admins', label: 'Admins', icon: Shield, tooltip: 'Admins' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} className="w-full">
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={{ children: item.tooltip, side: 'right' }}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className='border-t'>
         {user && (
            <div className='flex items-center gap-3 p-2'>
                <Avatar className="h-9 w-9">
                    <AvatarImage src={`https://picsum.photos/seed/${user.uid}/100/100`} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden group-data-[collapsible=icon]:hidden">
                    <p className="font-medium truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.phone}</p>
                </div>
                <button onClick={logout} className="group-data-[collapsible=icon]:hidden">
                    <LogOut className='h-5 w-5 text-muted-foreground hover:text-foreground' />
                </button>
            </div>
         )}
      </SidebarFooter>
    </Sidebar>
  );
}


"use client";

import { usePathname } from 'next/navigation';
import {
  Bell,
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
  { href: '/admin/notifications', label: 'Notifications', icon: Bell, tooltip: 'Notifications' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-16 flex items-center px-4">
        <Logo className="group-data-[collapsible=icon]:hidden" />
        <div className="hidden group-data-[collapsible=icon]:flex h-8 w-8 items-center justify-center bg-primary rounded-lg text-primary-foreground">
             <Shield className="h-5 w-5" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-2">
          {menuItems.map((item) => {
            // Check if the current path starts with the menu item href for better active state detection
            const isActive = item.href === '/admin' 
                ? pathname === '/admin' 
                : pathname.startsWith(item.href);

            return (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} className="w-full">
                  <SidebarMenuButton
                    isActive={isActive}
                    tooltip={item.tooltip}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className='border-t mt-auto p-2'>
         <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={logout} tooltip="Logout">
                    <LogOut />
                    <span>Logout</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
         </SidebarMenu>
         <Separator className="my-2" />
         {user && (
            <div className='flex items-center gap-3 p-2 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center'>
                <Avatar className="h-9 w-9 shrink-0">
                    <AvatarImage src={`https://picsum.photos/seed/${user.uid}/100/100`} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden group-data-[collapsible=icon]:hidden">
                    <p className="font-medium truncate text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.phone}</p>
                </div>
            </div>
         )}
      </SidebarFooter>
    </Sidebar>
  );
}

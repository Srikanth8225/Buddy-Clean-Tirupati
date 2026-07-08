
import type placeholderImages from './placeholder-images.json';

export type ImagePlaceholder = (typeof placeholderImages.placeholderImages)[number];

export interface User {
  uid: string;
  name: string;
  phone: string;
  isAdmin: boolean;
}

export interface ServiceVariant {
  id: string;
  name: string; // e.g., '1BHK', '5-Seater'
  price: number;
}

export interface ServiceProcessStep {
    step: number;
    title: string;
    description: string;
    image: ImagePlaceholder;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'home' | 'car';
  image: ImagePlaceholder;
  gallery: ImagePlaceholder[];
  features: string[];
  variants: ServiceVariant[];
  process?: ServiceProcessStep[];
}

export interface CartItem {
  serviceId: string;
  serviceName: string;
  variantId: string;
  variantName: string;
  price: number;
  quantity: number;
  imageSrc: string;
}

export interface Order {
  id:string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  items: CartItem[];
  total: number;
  address: string;
  serviceDate: Date;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled' | 'Failed';
  paymentMethod: 'Online' | 'Cash on Delivery';
  createdAt: Date;
}

export interface Customer {
    id: string; // UID from auth
    name: string;
    phone: string;
    createdAt: Date;
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    createdAt: Date;
    sentAt: Date; // Can be in the future for scheduled notifications
    read: boolean;
}

    


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

export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'home' | 'car';
  image: ImagePlaceholder;
  gallery: ImagePlaceholder[];
  features: string[];
  variants: ServiceVariant[];
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
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  items: CartItem[];
  total: number;
  address: string;
  serviceDate: Date;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  paymentMethod: 'Online' | 'Cash on Delivery';
  createdAt: Date;
}

export interface Customer {
    id: string; // UID from auth
    name: string;
    phone: string;
    createdAt: Date;
}

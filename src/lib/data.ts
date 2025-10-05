import { Service, Customer, Order } from './types';
import placeholderImages from './placeholder-images.json';

const allImages = placeholderImages.placeholderImages;

const MOCK_SERVICES: Service[] = [
  {
    id: 'home-deep-clean',
    name: 'Deep Home Cleaning',
    description: 'A comprehensive top-to-bottom cleaning of your entire home.',
    category: 'home',
    image: allImages.find(img => img.id === 'home-cleaning-1')!,
    features: ['Floor Scrubbing', 'Window Cleaning', 'Kitchen Degreasing', 'Bathroom Sanitization'],
    variants: [
      { id: '1bhk', name: '1 BHK', price: 2499 },
      { id: '2bhk', name: '2 BHK', price: 3499 },
      { id: '3bhk', name: '3 BHK', price: 4499 },
      { id: 'villa', name: 'Villa', price: 6999 },
    ],
  },
  {
    id: 'sofa-cleaning',
    name: 'Sofa & Upholstery Cleaning',
    description: 'Bring back the life to your sofas and upholstery with our specialized cleaning.',
    category: 'home',
    image: allImages.find(img => img.id === 'home-cleaning-2')!,
    features: ['Shampooing', 'Stain Removal', 'Vacuuming', 'Sanitization'],
    variants: [
      { id: 'sofa-5-seater', name: 'Up to 5 Seats', price: 999 },
      { id: 'sofa-7-seater', name: 'Up to 7 Seats', price: 1399 },
    ],
  },
  {
    id: 'car-exterior-wash',
    name: 'Exterior Car Wash',
    description: 'A meticulous hand wash for a sparkling clean exterior.',
    category: 'car',
    image: allImages.find(img => img.id === 'car-wash-1')!,
    features: ['Pressure Wash', 'Foam Cannon', 'Hand Wash & Dry', 'Tire Dressing'],
    variants: [
      { id: 'hatchback-ext', name: 'Hatchback', price: 499 },
      { id: 'sedan-ext', name: 'Sedan', price: 599 },
      { id: 'suv-ext', name: 'SUV / 7-Seater', price: 699 },
    ],
  },
  {
    id: 'car-full-service',
    name: 'Full Service Car Spa',
    description: 'Complete interior and exterior detailing for a showroom finish.',
    category: 'car',
    image: allImages.find(img => img.id === 'car-wash-2')!,
    features: ['Exterior Wash', 'Interior Vacuum', 'Dashboard Polishing', 'Upholstery Cleaning'],
    variants: [
      { id: 'hatchback-full', name: 'Hatchback', price: 1499 },
      { id: 'sedan-full', name: 'Sedan', price: 1799 },
      { id: 'suv-full', name: 'SUV / 7-Seater', price: 2199 },
    ],
  },
];

const MOCK_CUSTOMERS: Customer[] = [
    { id: 'user-1-uid', name: 'Srinivas Rao', phone: '+919876543210', createdAt: new Date('2023-10-15') },
    { id: 'user-2-uid', name: 'Priya Reddy', phone: '+919123456789', createdAt: new Date('2023-11-02') },
    { id: 'admin-uid', name: 'Admin User', phone: '+919999999999', createdAt: new Date('2023-01-01') },
    { id: 'admin-2-uid', name: 'New Admin', phone: '+917997707697', createdAt: new Date('2024-01-01') },
];

const MOCK_ORDERS: Order[] = [
    {
        id: 'ORD001',
        customerId: 'user-1-uid',
        customerName: 'Srinivas Rao',
        customerPhone: '+919876543210',
        items: [
            { serviceId: 'home-deep-clean', serviceName: 'Deep Home Cleaning', variantId: '2bhk', variantName: '2 BHK', price: 3499, quantity: 1, imageSrc: allImages.find(img => img.id === 'home-cleaning-1')!.imageUrl },
        ],
        total: 3499,
        address: '123, SV Nagar, Tirupati, Andhra Pradesh 517501',
        serviceDate: new Date('2023-11-20T10:00:00'),
        status: 'Completed',
        paymentMethod: 'Online',
        createdAt: new Date('2023-11-18T14:30:00'),
    },
    {
        id: 'ORD002',
        customerId: 'user-2-uid',
        customerName: 'Priya Reddy',
        customerPhone: '+919123456789',
        items: [
            { serviceId: 'car-full-service', serviceName: 'Full Service Car Spa', variantId: 'suv-full', variantName: 'SUV / 7-Seater', price: 2199, quantity: 1, imageSrc: allImages.find(img => img.id === 'car-wash-2')!.imageUrl },
        ],
        total: 2199,
        address: '456, Reddy Colony, Tirupati, Andhra Pradesh 517502',
        serviceDate: new Date('2023-12-05T14:00:00'),
        status: 'In Progress',
        paymentMethod: 'Cash on Delivery',
        createdAt: new Date('2023-12-02T09:00:00'),
    },
    {
        id: 'ORD003',
        customerId: 'user-1-uid',
        customerName: 'Srinivas Rao',
        customerPhone: '+919876543210',
        items: [
            { serviceId: 'sofa-cleaning', serviceName: 'Sofa & Upholstery Cleaning', variantId: 'sofa-7-seater', variantName: 'Up to 7 Seats', price: 1399, quantity: 1, imageSrc: allImages.find(img => img.id === 'home-cleaning-2')!.imageUrl },
            { serviceId: 'car-exterior-wash', serviceName: 'Exterior Car Wash', variantId: 'sedan-ext', variantName: 'Sedan', price: 599, quantity: 1, imageSrc: allImages.find(img => img.id === 'car-wash-1')!.imageUrl },
        ],
        total: 1998,
        address: '123, SV Nagar, Tirupati, Andhra Pradesh 517501',
        serviceDate: new Date(),
        status: 'Pending',
        paymentMethod: 'Online',
        createdAt: new Date(),
    },
];

// API-like functions to simulate data fetching
export const getServices = (category?: 'home' | 'car'): Service[] => {
  if (category) {
    return MOCK_SERVICES.filter(service => service.category === category);
  }
  return MOCK_SERVICES;
};

export const getServiceById = (id: string): Service | undefined => {
    return MOCK_SERVICES.find(service => service.id === id);
}

export const getCustomers = (): Customer[] => MOCK_CUSTOMERS;
export const getOrders = (): Order[] => MOCK_ORDERS;
export const getOrdersByCustomerId = (customerId: string): Order[] => MOCK_ORDERS.filter(order => order.customerId === customerId);
export const getAdminPhoneNumbers = (): string[] => ['+919999999999', '+917997707697'];
export const getMockUserByPhone = (phone: string): Customer | undefined => MOCK_CUSTOMERS.find(c => c.phone === phone);

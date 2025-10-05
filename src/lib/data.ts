import { Service, Customer, Order } from './types';
import placeholderImages from './placeholder-images.json';

const allImages = placeholderImages.placeholderImages;

const MOCK_SERVICES: Service[] = [
  {
    id: 'full-home-clean',
    name: 'Full Home Clean',
    description: 'The ultimate cleaning package for a pristine home, covering every corner.',
    category: 'home',
    image: allImages.find(img => img.id === 'home-cleaning-1')!,
    features: ['Complete dusting of all surfaces, furniture, and fixtures', 'Thorough sweeping and mopping of all floors', 'Deep cleaning of kitchen, including appliance exteriors'],
    variants: [
      { id: '1bhk', name: '1 BHK', price: 1800 },
      { id: '2bhk', name: '2 BHK', price: 4200 },
      { id: '3bhk', name: '3 BHK', price: 4499 },
      { id: 'villa', name: 'Villa', price: 6999 },
    ],
  },
  {
    id: 'move-in-out-cleaning',
    name: 'Move-In/Out Cleaning',
    description: 'Prepare your new home or ensure you get your deposit back with our move in/out service.',
    category: 'home',
    image: allImages.find(img => img.id === 'move-in-out-cleaning')!,
    features: ['Complete deep clean', 'Inside of all cabinets and closets', 'Wall mark removal'],
    variants: [
      { id: 'move-in-1bhk', name: '1 BHK', price: 2800 },
      { id: 'move-in-2bhk', name: '2 BHK', price: 4700 },
    ],
  },
  {
    id: 'kitchen-cleaning',
    name: 'Kitchen Cleaning',
    description: 'A specialized deep clean for your kitchen, tackling grease and grime.',
    category: 'home',
    image: allImages.find(img => img.id === 'kitchen-cleaning')!,
    features: ['Stove and chimney cleaning', 'Degreasing of surfaces', 'Cabinet interior/exterior'],
    variants: [
      { id: 'kitchen-standard', name: 'Standard Kitchen', price: 1500 },
    ],
  },
  {
    id: 'bathroom-cleaning',
    name: 'Bathroom Cleaning',
    description: 'A complete sanitization and deep clean of your bathrooms.',
    category: 'home',
    image: allImages.find(img => img.id === 'washroom-cleaning')!,
    features: ['Tile and grout scrubbing', 'Descaling of taps and showers', 'Toilet bowl sanitization'],
    variants: [
      { id: '1-bathroom', name: '1 Bathroom', price: 800 },
      { id: '2-bathrooms', name: '2 Bathrooms', price: 1400 },
    ],
  },
  {
    id: 'mattress-cleaning',
    name: 'Mattress Cleaning',
    description: 'A clean mattress for a healthy and restful sleep. Price is per mattress.',
    category: 'home',
    image: allImages.find(img => img.id === 'mattress-cleaning')!,
    features: ['Dust mite removal', 'Sanitization', 'Deodorizing'],
    variants: [
      { id: 'mattress-single', name: 'Single', price: 599 },
      { id: 'mattress-double', name: 'Double', price: 899 },
    ],
  },
  {
    id: 'sofa-shampooing',
    name: 'Sofa Shampooing',
    description: 'Bring your sofa back to life. Price is per seat.',
    category: 'home',
    image: allImages.find(img => img.id === 'home-cleaning-2')!,
    features: ['Removes stains & dirt', 'Kills germs & allergens', 'Fabric protection'],
    variants: [
      { id: 'sofa-per-seat', name: 'Per Seat', price: 299 },
    ],
  },
  {
    id: 'window-glass-polishing',
    name: 'Window & Glass Polishing',
    description: 'Streak-free shine for all your windows and glass surfaces.',
    category: 'home',
    image: allImages.find(img => img.id === 'window-glass-polishing')!,
    features: ['Interior & exterior windows', 'Mirrors & glass tables', 'Removes tough spots'],
    variants: [
      { id: 'window-standard', name: 'Standard Home', price: 799 },
    ],
  },
  {
    id: 'water-tank-cleaning',
    name: 'Water Tank Cleaning',
    description: 'Ensure your water storage is clean and hygienic with our professional tank cleaning service.',
    category: 'home',
    image: allImages.find(img => img.id === 'water-tank-cleaning')!,
    features: ['Mechanized dewatering', 'Sludge and sediment removal', 'High-pressure cleaning'],
    variants: [
      { id: 'tank-500l', name: 'Up to 500L', price: 499 },
      { id: 'tank-1000l', name: 'Up to 1000L', price: 699 },
    ],
  },
  {
    id: 'car-express-wash',
    name: 'Express Wash',
    description: 'A quick and efficient wash to get your car looking fresh in no time.',
    category: 'car',
    image: allImages.find(img => img.id === 'car-wash-1')!,
    features: ['Exterior foam wash', 'Tire and rim cleaning', 'Exterior window wipe'],
    variants: [
      { id: 'hatchback-express', name: '5 Seater', price: 399 },
    ],
  },
  {
    id: 'car-deluxe-wash',
    name: 'Deluxe Wash',
    description: 'A comprehensive wash that includes interior vacuuming and dashboard polishing.',
    category: 'car',
    image: allImages.find(img => img.id === 'car-wash-red')!,
    features: ['All Express Wash features', 'Interior vacuuming', 'Dashboard polishing'],
    variants: [
      { id: 'sedan-deluxe', name: '5 Seater', price: 699 },
    ],
  },
  {
    id: 'car-inner-wash',
    name: 'Car Inner Wash',
    description: "A deep clean for your car's interior, leaving it spotless and hygienic.",
    category: 'car',
    image: allImages.find(img => img.id === 'car-interior-detailing')!,
    features: ['Deep interior vacuuming', 'Upholstery & carpet shampooing', 'Leather conditioning'],
    variants: [
        { id: 'suv-inner', name: '5 Seater', price: 999 },
    ]
  },
  {
    id: 'car-royal-treatment',
    name: 'Royal Treatment',
    description: 'The ultimate detailing package for a showroom finish, inside and out.',
    category: 'car',
    image: allImages.find(img => img.id === 'car-wash-bentley')!,
    features: ['All Deluxe Wash features', 'Exterior wax and polish', 'Engine bay cleaning'],
    variants: [
        { id: 'suv-royal', name: '5 Seater', price: 1499 },
    ]
  },
  {
    id: 'bike-express-wash',
    name: 'Bike Express Wash',
    description: 'A professional wash to make your motorcycle sparkle.',
    category: 'car',
    image: allImages.find(img => img.id === 'bike-wash')!,
    features: ['Full body foam wash', 'Chain cleaning and lubrication', 'Tire and rim detailing'],
    variants: [
        { id: 'bike-express', name: 'Standard Bike', price: 249 },
    ]
  }
];

const MOCK_CUSTOMERS: Customer[] = [
    { id: 'user-1-uid', name: 'Srinivas Rao', phone: '+919876543210', createdAt: new Date('2023-10-15') },
    { id: 'user-2-uid', name: 'Priya Reddy', phone: '+919123456789', createdAt: new Date('2023-11-02') },
    { id: 'admin-uid', name: 'Admin User', phone: '+919999999999', createdAt: new Date('2023-01-01') },
    { id: 'admin-2-uid', name: 'New Admin', phone: '+917997707697', createdAt: new Date('2024-01-01') },
];

const MOCK_ORDERS: Omit<Order, 'createdAt' | 'serviceDate'> & { createdAt: string, serviceDate: string }[] = [
    {
        id: 'ORD001',
        customerId: 'user-1-uid',
        customerName: 'Srinivas Rao',
        customerPhone: '+919876543210',
        items: [
            { serviceId: 'full-home-clean', serviceName: 'Full Home Clean', variantId: '2bhk', variantName: '2 BHK', price: 3499, quantity: 1, imageSrc: allImages.find(img => img.id === 'home-cleaning-1')!.imageUrl },
        ],
        total: 3499,
        address: '123, SV Nagar, Tirupati, Andhra Pradesh 517501',
        serviceDate: new Date('2023-11-20T10:00:00').toISOString(),
        status: 'Completed',
        paymentMethod: 'Online',
        createdAt: new Date('2023-11-18T14:30:00').toISOString(),
    },
    {
        id: 'ORD002',
        customerId: 'user-2-uid',
        customerName: 'Priya Reddy',
        customerPhone: '+919123456789',
        items: [
            { serviceId: 'car-deluxe-wash', serviceName: 'Deluxe Wash', variantId: 'sedan-deluxe', variantName: '5 Seater', price: 699, quantity: 1, imageSrc: allImages.find(img => img.id === 'car-wash-red')!.imageUrl },
        ],
        total: 699,
        address: '456, Reddy Colony, Tirupati, Andhra Pradesh 517502',
        serviceDate: new Date('2023-12-05T14:00:00').toISOString(),
        status: 'In Progress',
        paymentMethod: 'Cash on Delivery',
        createdAt: new Date('2023-12-02T09:00:00').toISOString(),
    },
    {
        id: 'ORD003',
        customerId: 'user-1-uid',
        customerName: 'Srinivas Rao',
        customerPhone: '+919876543210',
        items: [
            { serviceId: 'sofa-shampooing', serviceName: 'Sofa Shampooing', variantId: 'sofa-per-seat', variantName: 'Per Seat', price: 299, quantity: 5, imageSrc: allImages.find(img => img.id === 'home-cleaning-2')!.imageUrl },
            { serviceId: 'car-express-wash', serviceName: 'Express Wash', variantId: 'hatchback-express', variantName: '5 Seater', price: 399, quantity: 1, imageSrc: allImages.find(img => img.id === 'car-wash-1')!.imageUrl },
        ],
        total: (299 * 5) + 399,
        address: '123, SV Nagar, Tirupati, Andhra Pradesh 517501',
        serviceDate: new Date().toISOString(),
        status: 'Pending',
        paymentMethod: 'Online',
        createdAt: new Date().toISOString(),
    },
];

const parseOrderDates = (order: any): Order => ({
    ...order,
    createdAt: new Date(order.createdAt),
    serviceDate: new Date(order.serviceDate),
});

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

export const getCustomers = (): Customer[] => MOCK_CUSTOMERS.map(c => ({...c, createdAt: new Date(c.createdAt)}));
export const getOrders = (): Order[] => {
    let allOrders = [...MOCK_ORDERS.map(parseOrderDates)];
    if (typeof window !== 'undefined') {
        const storedOrders = JSON.parse(localStorage.getItem("buddy-clean-orders") || "[]");
        allOrders = [...allOrders, ...storedOrders.map(parseOrderDates)];
    }
    return allOrders;
}

export const getOrdersByCustomerId = (customerId: string): Order[] => {
    return getOrders().filter(order => order.customerId === customerId);
}

export const saveOrder = (order: Order) => {
    if (typeof window === 'undefined') return;
    const allOrders = getOrders();
    const newOrders = [...allOrders, order];
    const serializableOrders = newOrders.map(o => ({
        ...o,
        createdAt: o.createdAt.toISOString(),
        serviceDate: o.serviceDate.toISOString()
    }));
    // We only store the orders placed by the user, not the mock ones
    localStorage.setItem("buddy-clean-orders", JSON.stringify(serializableOrders.filter(o => !MOCK_ORDERS.find(mo => mo.id === o.id))));
}

export const getAdminPhoneNumbers = (): string[] => ['+919999999999', '+917997707697'];
export const getMockUserByPhone = (phone: string): Customer | undefined => MOCK_CUSTOMERS.find(c => c.phone === phone);

    
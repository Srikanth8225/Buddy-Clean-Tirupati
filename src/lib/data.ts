
import { Service, Customer, Order, Notification } from './types';
import placeholderImages from './placeholder-images.json';

const allImages = placeholderImages.placeholderImages;

const INITIAL_MOCK_SERVICES: Service[] = [
    {
      id: 'full-home-clean',
      name: 'Full Home Clean',
      description: 'The ultimate cleaning package for a pristine home, covering every corner.',
      category: 'home',
      image: allImages.find(img => img.id === 'home-cleaning-1')!,
      gallery: [
          allImages.find(img => img.id === 'home-cleaning-1')!,
          allImages.find(img => img.id === 'home-cleaning-2')!,
          allImages.find(img => img.id === 'home-cleaning-3')!,
      ],
      features: ['Complete dusting of all surfaces, furniture, and fixtures', 'Thorough sweeping and mopping of all floors', 'Deep cleaning of kitchen, including appliance exteriors', 'Sanitization of bathrooms, including toilets, showers, and sinks'],
      variants: [
        { id: '1bhk', name: '1 BHK', price: 1800 },
        { id: '2bhk', name: '2 BHK', price: 4200 },
        { id: '3bhk', name: '3 BHK', price: 4499 },
        { id: 'villa', name: 'Villa', price: 6999 },
      ],
      process: [
          { step: 1, title: 'Dry Dusting and Cobweb Removal', description: 'We start by thoroughly dusting all surfaces, including walls, ceilings, furniture, and fixtures to remove loose dirt and cobwebs.', image: allImages.find(img => img.id === 'process-dusting')! },
          { step: 2, title: 'Scrubbing & Wiping', description: 'Next, we meticulously scrub and wipe down all areas, focusing on stubborn stains and high-touch surfaces to ensure everything is spotless.', image: allImages.find(img => img.id === 'process-wiping')! },
          { step: 3, title: 'Kitchen Deep Clean', description: 'The kitchen receives special attention. We deep clean countertops, sinks, cabinet exteriors, and the outside of appliances to remove grease and grime.', image: allImages.find(img => img.id === 'kitchen-cleaning')! },
          { step: 4, title: 'Bathroom Sanitization', description: 'We sanitize the entire bathroom, including the toilet, shower, sink, and floor, using high-quality disinfectants to ensure a hygienic space.', image: allImages.find(img => img.id === 'bathroom-cleaning')! },
          { step: 5, title: 'Floor Cleaning', description: 'Finally, we sweep and mop all floors, leaving them sparkling clean and fresh.', image: allImages.find(img => img.id === 'process-floor-cleaning')! },
      ]
    },
    {
      id: 'move-in-out-cleaning',
      name: 'Move-In/Out Cleaning',
      description: 'Prepare your new home or ensure you get your deposit back with our move in/out service.',
      category: 'home',
      image: allImages.find(img => img.id === 'move-in-out-cleaning')!,
      gallery: [
          allImages.find(img => img.id === 'move-in-out-cleaning')!,
      ],
      features: ['Complete deep clean', 'Inside of all cabinets and closets', 'Wall mark removal'],
      variants: [
        { id: 'move-in-1bhk', name: '1 BHK', price: 2800 },
        { id: 'move-in-2bhk', name: '2 BHK', price: 4700 },
        { id: 'move-in-3bhk', name: '3 BHK', price: 5499 },
        { id: 'move-in-villa', name: 'Villa', price: 7999 },
      ],
    },
    {
      id: 'kitchen-cleaning',
      name: 'Kitchen Cleaning',
      description: 'A specialized deep clean for your kitchen, tackling grease and grime.',
      category: 'home',
      image: allImages.find(img => img.id === 'kitchen-cleaning')!,
      gallery: [
          allImages.find(img => img.id === 'kitchen-cleaning')!,
      ],
      features: ['Stove and chimney cleaning', 'Degreasing of surfaces', 'Cabinet interior/exterior'],
      variants: [
        { id: '1-kitchen', name: '1 Kitchen', price: 1500 },
        { id: '2-kitchens', name: '2 Kitchens', price: 2800 },
      ],
    },
    {
      id: 'bathroom-cleaning',
      name: 'Bathroom Cleaning',
      description: 'A complete sanitization and deep clean of your bathrooms.',
      category: 'home',
      image: allImages.find(img => img.id === 'bathroom-cleaning')!,
      gallery: [
          allImages.find(img => img.id === 'bathroom-cleaning')!,
      ],
      features: ['Tile and grout scrubbing', 'Descaling of taps and showers', 'Toilet bowl sanitization'],
      variants: [
        { id: '1-bathroom', name: '1 Bathroom', price: 800 },
        { id: '2-bathrooms', name: '2 Bathrooms', price: 1400 },
        { id: '3-bathrooms', name: '3 Bathrooms', price: 2000 },
        { id: '4-bathrooms', name: '4 Bathrooms', price: 2500 },
        { id: '5-bathrooms', name: '5 Bathrooms', price: 3000 },
      ],
    },
    {
      id: 'mattress-cleaning',
      name: 'Mattress Cleaning',
      description: 'A clean mattress for a healthy and restful sleep. Price is per mattress.',
      category: 'home',
      image: allImages.find(img => img.id === 'mattress-cleaning')!,
      gallery: [
          allImages.find(img => img.id === 'mattress-cleaning')!,
      ],
      features: ['Dust mite removal', 'Sanitization', 'Deodorizing'],
      variants: [
        { id: 'mattress-single', name: 'Single', price: 599 },
        { id: 'mattress-double', name: 'Double', price: 899 },
      ],
    },
    {
      id: 'sofa-shampooing',
      name: 'Sofa Shampooing',
      description: 'Bring your sofa back to life with our professional shampooing service.',
      category: 'home',
      image: allImages.find(img => img.id === 'sofa-shampooing')!,
      gallery: [
          allImages.find(img => img.id === 'sofa-shampooing')!,
      ],
      features: ['Removes stains & dirt', 'Kills germs & allergens', 'Fabric protection'],
      variants: [
        { id: 'sofa-5-seater', name: '5 Seater', price: 1499 },
        { id: 'sofa-7-seater', name: '7 Seater', price: 2099 },
      ],
    },
    {
      id: 'window-glass-polishing',
      name: 'Window & Glass Polishing',
      description: 'Streak-free shine for all your windows and glass surfaces.',
      category: 'home',
      image: allImages.find(img => img.id === 'window-glass-polishing')!,
      gallery: [
          allImages.find(img => img.id === 'window-glass-polishing')!,
      ],
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
      gallery: [
          allImages.find(img => img.id === 'water-tank-cleaning')!,
      ],
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
      gallery: [
          allImages.find(img => img.id === 'car-wash-1')!,
          allImages.find(img => img.id === 'car-wash-2')!,
          allImages.find(img => img.id === 'car-wash-3')!,
      ],
      features: ['Exterior foam wash', 'Tire and rim cleaning', 'Exterior window wipe'],
      variants: [
        { id: 'hatchback-express-5', name: '5 Seater', price: 399 },
        { id: 'hatchback-express-7', name: '7 Seater', price: 499 },
      ],
    },
    {
      id: 'car-deluxe-wash',
      name: 'Deluxe Wash',
      description: 'A comprehensive wash that includes interior vacuuming and dashboard polishing.',
      category: 'car',
      image: allImages.find(img => img.id === 'car-wash-red')!,
      gallery: [
          allImages.find(img => img.id === 'car-wash-red')!,
      ],
      features: ['All Express Wash features', 'Interior vacuuming', 'Dashboard polishing'],
      variants: [
        { id: 'sedan-deluxe-5', name: '5 Seater', price: 699 },
        { id: 'sedan-deluxe-7', name: '7 Seater', price: 799 },
      ],
    },
    {
      id: 'car-inner-wash',
      name: 'Car Inner Wash',
      description: "A deep clean for your car's interior, leaving it spotless and hygienic.",
      category: 'car',
      image: allImages.find(img => img.id === 'car-interior-detailing')!,
      gallery: [
          allImages.find(img => img.id === 'car-interior-detailing')!,
      ],
      features: ['Deep interior vacuuming', 'Upholstery & carpet shampooing', 'Leather conditioning'],
      variants: [
          { id: 'suv-inner-5', name: '5 Seater', price: 999 },
          { id: 'suv-inner-7', name: '7 Seater', price: 1199 },
      ]
    },
    {
      id: 'car-royal-treatment',
      name: 'Royal Treatment',
      description: 'The ultimate detailing package for a showroom finish, inside and out.',
      category: 'car',
      image: allImages.find(img => img.id === 'car-wash-bentley')!,
      gallery: [
          allImages.find(img => img.id === 'car-wash-bentley')!,
      ],
      features: ['All Deluxe Wash features', 'Exterior wax and polish', 'Engine bay cleaning'],
      variants: [
          { id: 'suv-royal-5', name: '5 Seater', price: 1499 },
          { id: 'suv-royal-7', name: '7 Seater', price: 1699 },
      ]
    },
    {
      id: 'bike-express-wash',
      name: 'Bike Express Wash',
      description: 'A professional wash to make your motorcycle sparkle.',
      category: 'car',
      image: allImages.find(img => img.id === 'bike-wash')!,
      gallery: [
          allImages.find(img => img.id === 'bike-wash')!,
      ],
      features: ['Full body foam wash', 'Chain cleaning and lubrication', 'Tire and rim detailing'],
      variants: [
          { id: 'bike-express', name: 'Standard Bike', price: 249 },
      ]
    }
];

const INITIAL_MOCK_CUSTOMERS: Customer[] = [
    { id: 'user-1-uid', name: 'Srinivas Rao', phone: '+919876543210', createdAt: new Date('2023-10-15') },
    { id: 'user-2-uid', name: 'Priya Reddy', phone: '+919123456789', createdAt: new Date('2023-11-02') },
    { id: 'admin-uid', name: 'Rishi', phone: '8096092423', createdAt: new Date('2023-01-01') },
    { id: 'admin-2-uid', name: 'sreekanth', phone: '+917997707697', createdAt: new Date('2024-01-01') },
];

const INITIAL_MOCK_ORDERS: Order[] = [
    {
        id: '431336',
        customerId: 'user-1-uid',
        customerName: 'Srinivas Rao',
        customerPhone: '+919876543210',
        items: [
            { serviceId: 'full-home-clean', serviceName: 'Full Home Clean', variantId: '2bhk', variantName: '2 BHK', price: 3499, quantity: 1, imageSrc: allImages.find(img => img.id === 'home-cleaning-1')!.imageUrl },
        ],
        total: 3499,
        address: '123, SV Nagar, Tirupati, Andhra Pradesh 517501',
        serviceDate: new Date('2023-11-20T10:00:00'),
        status: 'Completed',
        paymentMethod: 'Online',
        createdAt: new Date('2023-11-18T14:30:00'),
    },
    {
        id: '298900',
        customerId: 'user-2-uid',
        customerName: 'Priya Reddy',
        customerPhone: '+919123456789',
        items: [
            { serviceId: 'car-deluxe-wash', serviceName: 'Deluxe Wash', variantId: 'sedan-deluxe', variantName: '5 Seater', price: 699, quantity: 1, imageSrc: allImages.find(img => img.id === 'car-wash-red')!.imageUrl },
        ],
        total: 699,
        address: '456, Reddy Colony, Tirupati, Andhra Pradesh 517502',
        serviceDate: new Date('2023-12-05T14:00:00'),
        status: 'In Progress',
        paymentMethod: 'Cash on Delivery',
        createdAt: new Date('2023-12-02T09:00:00'),
    },
    {
        id: '982345',
        customerId: 'user-1-uid',
        customerName: 'Srinivas Rao',
        customerPhone: '+919876543210',
        items: [
            { serviceId: 'sofa-shampooing', serviceName: 'Sofa Shampooing', variantId: 'sofa-5-seater', variantName: '5 Seater', price: 1499, quantity: 1, imageSrc: allImages.find(img => img.id === 'sofa-shampooing')!.imageUrl },
            { serviceId: 'car-express-wash', serviceName: 'Express Wash', variantId: 'hatchback-express', variantName: '5 Seater', price: 399, quantity: 1, imageSrc: allImages.find(img => img.id === 'car-wash-1')!.imageUrl },
        ],
        total: (1499) + 399,
        address: '123, SV Nagar, Tirupati, Andhra Pradesh 517501',
        serviceDate: new Date('2024-07-25T11:00:00'),
        status: 'Pending',
        paymentMethod: 'Online',
        createdAt: new Date('2024-07-22T10:00:00'),
    },
];

const INITIAL_MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: 'notif-1',
        title: 'Diwali Special Offer!',
        message: 'Get 20% off on all home cleaning services this festive season. Book now!',
        createdAt: new Date('2023-10-20T10:00:00'),
        sentAt: new Date('2023-10-20T10:05:00'),
    },
    {
        id: 'notif-2',
        title: 'Monsoon Car Care',
        message: 'Protect your car from the rains. Avail our deluxe car wash with waxing.',
        createdAt: new Date('2023-07-01T12:00:00'),
        sentAt: new Date('2023-07-01T12:00:00'),
    },
    {
        id: 'notif-3',
        title: 'Welcome to Buddy Clean!',
        message: 'Thanks for signing up. Explore our services for a sparkling clean experience.',
        createdAt: new Date('2023-01-01T10:00:00'),
        sentAt: new Date('2023-01-01T10:00:00'),
    }
];

// --- Data Initialization ---
let isInitialized = false;

// Function to safely parse JSON from localStorage
function getFromLocalStorage<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        console.error(`Error reading from localStorage key “${key}”:`, e);
        return defaultValue;
    }
}

// Function to safely save JSON to localStorage
function saveToLocalStorage<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error(`Error saving to localStorage key “${key}”:`, e);
    }
}

// This function seeds localStorage with initial data if it's not already there.
export const initializeLocalStorage = () => {
    if (typeof window === 'undefined' || isInitialized) return;

    if (localStorage.getItem('buddy-clean-data-initialized') !== 'true') {
        console.log("Initializing local storage with mock data...");
        // Stringify dates for storage
        saveToLocalStorage('buddy-clean-customers', INITIAL_MOCK_CUSTOMERS.map(c => ({...c, createdAt: c.createdAt.toISOString()})));
        saveToLocalStorage('buddy-clean-orders', INITIAL_MOCK_ORDERS.map(o => ({...o, createdAt: o.createdAt.toISOString(), serviceDate: o.serviceDate.toISOString()})));
        saveToLocalStorage('buddy-clean-notifications', INITIAL_MOCK_NOTIFICATIONS.map(n => ({...n, createdAt: n.createdAt.toISOString(), sentAt: n.sentAt.toISOString()})));
        
        localStorage.setItem('buddy-clean-data-initialized', 'true');
    }
    isInitialized = true;
};

// --- Parsers ---
const parseCustomerDates = (customer: any): Customer => ({
    ...customer,
    createdAt: new Date(customer.createdAt),
});

const parseOrderDates = (order: any): Order => ({
    ...order,
    createdAt: new Date(order.createdAt),
    serviceDate: new Date(order.serviceDate),
});

const parseNotificationDates = (notification: any): Notification => ({
    ...notification,
    createdAt: new Date(notification.createdAt),
    sentAt: new Date(notification.sentAt),
});

// --- Services ---
// Services are considered static and don't need to be in localStorage for this app.
export const getServices = (category?: 'home' | 'car'): Service[] => {
  if (category) {
    return INITIAL_MOCK_SERVICES.filter(service => service.category === category);
  }
  return INITIAL_MOCK_SERVICES;
};

export const getServiceById = (id: string): Service | undefined => {
    return INITIAL_MOCK_SERVICES.find(service => service.id === id);
}

// --- Customers ---
export const getCustomers = (): Customer[] => {
    return getFromLocalStorage('buddy-clean-customers', []).map(parseCustomerDates);
}

export const saveCustomer = (customer: Customer): void => {
    const customers = getCustomers();
    const existingIndex = customers.findIndex(c => c.id === customer.id);
    if (existingIndex > -1) {
        customers[existingIndex] = customer;
    } else {
        customers.push(customer);
    }
    saveToLocalStorage('buddy-clean-customers', customers.map(c => ({...c, createdAt: c.createdAt.toISOString()})));
}

export const deleteCustomer = (id: string): void => {
    let customers = getCustomers();
    customers = customers.filter(customer => customer.id !== id);
    saveToLocalStorage('buddy-clean-customers', customers.map(c => ({...c, createdAt: c.createdAt.toISOString()})));
};

export const getAdmins = (): Customer[] => {
    const adminPhones = getAdminPhoneNumbers();
    return getCustomers().filter(c => adminPhones.includes(c.phone.replace('+91', '')));
};

export const getMockUserByPhone = (phone: string): Customer | undefined => {
    // This now checks the "live" data from localStorage instead of the initial mock array
    return getCustomers().find(c => c.phone === phone);
};


// --- Orders ---
export const getOrders = (): Order[] => {
    return getFromLocalStorage('buddy-clean-orders', []).map(parseOrderDates);
}

export const saveOrder = (order: Order) => {
    const orders = getOrders();
    const existingIndex = orders.findIndex(o => o.id === order.id);
    if (existingIndex > -1) {
        orders[existingIndex] = order;
    } else {
        orders.push(order);
    }
    saveToLocalStorage('buddy-clean-orders', orders.map(o => ({...o, createdAt: o.createdAt.toISOString(), serviceDate: o.serviceDate.toISOString()})));
}

export const updateOrderStatus = (orderId: string, status: Order['status']) => {
    const orders = getOrders();
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex > -1) {
        orders[orderIndex].status = status;
        saveToLocalStorage('buddy-clean-orders', orders.map(o => ({...o, createdAt: o.createdAt.toISOString(), serviceDate: o.serviceDate.toISOString()})));
    }
};

// --- Notifications ---
export const getNotifications = (): Notification[] => {
    const notifications = getFromLocalStorage('buddy-clean-notifications', []).map(parseNotificationDates);
    // Always return sorted by most recent
    return notifications.sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const saveNotification = (notification: Notification) => {
    const notifications = getNotifications(); // This gets the sorted list, but we don't need it sorted for saving
    notifications.push(notification);
    saveToLocalStorage('buddy-clean-notifications', notifications.map(n => ({...n, createdAt: n.createdAt.toISOString(), sentAt: n.sentAt.toISOString()})));
};


// --- Misc ---
export const getAdminPhoneNumbers = (): string[] => ['8096092423', '7997707697'];

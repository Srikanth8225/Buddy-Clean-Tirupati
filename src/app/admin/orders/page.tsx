"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { getOrders, updateOrderStatus, getServices, saveOrder, saveCustomer } from "@/lib/data";
import { Order, Service } from "@/lib/types";
import { ChevronDown, Plus, MessageSquare, AlertCircle, Database } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useLocalStorageSync } from "@/hooks/use-local-storage-sync";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [services, setServices] = useState<Service[]>([]);
    const { toast } = useToast();

    // Offline Order Form States
    const [offlineOpen, setOfflineOpen] = useState(false);
    const [offlineName, setOfflineName] = useState('');
    const [offlinePhone, setOfflinePhone] = useState('');
    const [offlineAddress, setOfflineAddress] = useState('');
    const [selectedServiceId, setSelectedServiceId] = useState('');
    const [selectedVariantId, setSelectedVariantId] = useState('');
    const [offlineDate, setOfflineDate] = useState('');
    const [offlinePayment, setOfflinePayment] = useState<'Online' | 'Cash on Delivery'>('Cash on Delivery');

    // WhatsApp Template Dialog States
    const [whatsappOpen, setWhatsappOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState<'confirm' | 'fail'>('confirm');

    const fetchOrders = () => {
        setOrders(getOrders());
    };

    useEffect(() => {
        fetchOrders();
        setServices(getServices());
    }, []);

    useLocalStorageSync('buddy-clean-orders', fetchOrders);

    const getStatusVariant = (status: Order['status']) => {
        switch (status) {
            case 'Completed': return 'default';
            case 'In Progress': return 'secondary';
            case 'Pending': return 'outline';
            case 'Cancelled': return 'destructive';
            case 'Failed': return 'destructive';
        }
    };

    const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
        updateOrderStatus(orderId, newStatus);
        fetchOrders();
        toast({
            title: "Status Updated",
            description: `Order #${orderId} status set to "${newStatus}".`
        });
    };

    const handleCreateOfflineOrder = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!offlineName || !offlinePhone || !offlineAddress || !selectedServiceId || !selectedVariantId || !offlineDate) {
            toast({ title: "Error", description: "Please fill in all fields.", variant: "destructive" });
            return;
        }

        const selectedService = services.find(s => s.id === selectedServiceId);
        const selectedVariant = selectedService?.variants.find(v => v.id === selectedVariantId);

        if (!selectedService || !selectedVariant) {
            toast({ title: "Error", description: "Invalid service or variant selection.", variant: "destructive" });
            return;
        }

        const cleanPhone = offlinePhone.replace(/\D/g, '');
        if (cleanPhone.length !== 10) {
            toast({ title: "Error", description: "Phone number must be exactly 10 digits.", variant: "destructive" });
            return;
        }

        const orderId = `BC-${Date.now()}`;
        const newOrder: Order = {
            id: orderId,
            customerId: `offline-${Date.now()}`,
            customerName: offlineName,
            customerPhone: `+91${cleanPhone}`,
            items: [{
                serviceId: selectedService.id,
                serviceName: selectedService.name,
                variantId: selectedVariant.id,
                variantName: selectedVariant.name,
                price: selectedVariant.price,
                quantity: 1,
                imageSrc: selectedService.image?.imageUrl || ''
            }],
            total: selectedVariant.price,
            address: offlineAddress,
            serviceDate: new Date(offlineDate),
            status: 'Pending',
            paymentMethod: offlinePayment,
            createdAt: new Date()
        };

        saveOrder(newOrder);
        saveCustomer({
            id: newOrder.customerId,
            name: newOrder.customerName,
            phone: newOrder.customerPhone,
            createdAt: new Date()
        });

        toast({ title: "Offline Order Created", description: `Order #${orderId} created successfully.` });
        setOfflineOpen(false);
        fetchOrders();
        
        // Reset form
        setOfflineName('');
        setOfflinePhone('');
        setOfflineAddress('');
        setSelectedServiceId('');
        setSelectedVariantId('');
        setOfflineDate('');
    };

    const handleSendWhatsApp = () => {
        if (!selectedOrder) return;
        
        const name = selectedOrder.customerName;
        const phone = selectedOrder.customerPhone.replace(/\D/g, '');
        const service = selectedOrder.items[0]?.serviceName || "Cleaning Service";
        const date = new Date(selectedOrder.serviceDate).toLocaleDateString();
        const total = selectedOrder.total;

        let message = '';
        if (selectedTemplate === 'confirm') {
            message = `Hello *${name}*, your Buddy Clean booking for *${service}* is confirmed on *${date}*. Total amount: *INR ${total}*. Thank you for choosing us!`;
        } else {
            message = `Hello *${name}*, we noticed your booking request for *${service}* has failed or was cancelled. Would you like to reschedule or customize your request? Please reply here to coordinate!`;
        }

        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        setWhatsappOpen(false);
    };

    const orderStatuses: Order['status'][] = ['Pending', 'In Progress', 'Completed', 'Cancelled', 'Failed'];

    const filteredOrders = useMemo(() => {
        if (!searchQuery) {
            return orders;
        }
        return orders.filter(order =>
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.total.toString().includes(searchQuery)
        );
    }, [orders, searchQuery]);

    const activeService = services.find(s => s.id === selectedServiceId);

    return (
        <Card className="border-[#A7D1AB]/30">
            <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <CardTitle className="text-xl font-headline text-primary flex items-center gap-2">
                        <Database className="h-5 w-5 text-primary" /> Order Management
                    </CardTitle>
                    <CardDescription>Monitor bookings, track status updates, and dispatch WhatsApp templates.</CardDescription>
                </div>
                <div className="flex gap-2">
                    <Dialog open={offlineOpen} onOpenChange={setOfflineOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-primary hover:bg-primary/95 text-white flex items-center gap-2">
                                <Plus className="h-4 w-4" /> Create Offline Order
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md bg-background">
                            <form onSubmit={handleCreateOfflineOrder}>
                                <DialogHeader>
                                    <DialogTitle>Add Offline Booking</DialogTitle>
                                    <DialogDescription>Input local or phone bookings into the dashboard.</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="custName">Customer Name</Label>
                                        <Input id="custName" value={offlineName} onChange={(e) => setOfflineName(e.target.value)} placeholder="Sreekanth" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="custPhone">Phone Number</Label>
                                        <div className="flex">
                                            <span className="flex items-center rounded-l-md border border-r-0 bg-muted px-3 text-sm text-muted-foreground">+91</span>
                                            <Input id="custPhone" type="tel" maxLength={10} value={offlinePhone} onChange={(e) => setOfflinePhone(e.target.value)} placeholder="9876543210" className="rounded-l-none" required />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="custAddress">Full Address</Label>
                                        <Input id="custAddress" value={offlineAddress} onChange={(e) => setOfflineAddress(e.target.value)} placeholder="Tirupati, Andhra Pradesh" required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label>Service</Label>
                                            <Select onValueChange={setSelectedServiceId} value={selectedServiceId}>
                                                <SelectTrigger><SelectValue placeholder="Select service" /></SelectTrigger>
                                                <SelectContent>
                                                    {services.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label>Variant</Label>
                                            <Select onValueChange={setSelectedVariantId} value={selectedVariantId} disabled={!selectedServiceId}>
                                                <SelectTrigger><SelectValue placeholder="Select variant" /></SelectTrigger>
                                                <SelectContent>
                                                    {activeService?.variants.map(v => <SelectItem key={v.id} value={v.id}>{v.name} (INR {v.price})</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="serviceDate">Service Date</Label>
                                            <Input id="serviceDate" type="date" value={offlineDate} onChange={(e) => setOfflineDate(e.target.value)} required />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label>Payment</Label>
                                            <Select onValueChange={(val: any) => setOfflinePayment(val)} value={offlinePayment}>
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Cash on Delivery">Cash on Delivery</SelectItem>
                                                    <SelectItem value="Online">Online</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={() => setOfflineOpen(false)}>Cancel</Button>
                                    <Button type="submit" className="bg-primary hover:bg-primary/95 text-white">Create Order</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
                <div className="pb-4">
                    <Input 
                        placeholder="Search by Order ID, Customer Name, Status..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border-[#A7D1AB]/30 max-w-sm"
                    />
                </div>
                <Table>
                    <TableHeader>
                        <TableRow className="bg-[#F7F7F2]">
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Service Date</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead>Payment</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(order => (
                            <TableRow key={order.id} className={order.status === 'Failed' ? 'bg-red-50/40 hover:bg-red-50/70' : ''}>
                                <TableCell className="font-mono text-sm">{order.id}</TableCell>
                                <TableCell>
                                    <div className="font-semibold text-[#1a1a1a]">{order.customerName}</div>
                                    <div className="text-sm text-muted-foreground">{order.customerPhone}</div>
                                </TableCell>
                                <TableCell className="text-sm">{new Date(order.serviceDate).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right font-semibold">INR {order.total.toFixed(2)}</TableCell>
                                <TableCell className="text-sm">{order.paymentMethod}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" size="sm" className="flex items-center gap-2 border-border/80">
                                                 <Badge variant={getStatusVariant(order.status)} className="m-0 pointer-events-none">{order.status}</Badge>
                                                 <ChevronDown className="h-3 w-3 text-muted-foreground" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            {orderStatuses.map(status => (
                                                <DropdownMenuItem 
                                                    key={status} 
                                                    onClick={() => handleStatusChange(order.id, status)}
                                                    disabled={order.status === status}
                                                    className={status === 'Failed' ? 'text-red-600 focus:bg-red-50' : ''}
                                                >
                                                    {status}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button 
                                        variant="outline" 
                                        size="icon" 
                                        className="border-green-300 text-green-700 hover:bg-green-50"
                                        onClick={() => {
                                            setSelectedOrder(order);
                                            setWhatsappOpen(true);
                                        }}
                                        title="Send WhatsApp Alert"
                                    >
                                        <MessageSquare className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>

            {/* WhatsApp Notification Dialog */}
            <Dialog open={whatsappOpen} onOpenChange={setWhatsappOpen}>
                <DialogContent className="max-w-md bg-background">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-primary font-headline">
                            <MessageSquare className="h-5 w-5 text-green-600" /> WhatsApp Template Dispatcher
                        </DialogTitle>
                        <DialogDescription>
                            Configure notification dispatch for customer *{selectedOrder?.customerName}*.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid gap-2">
                            <Label>Template Type</Label>
                            <Select onValueChange={(val: any) => setSelectedTemplate(val)} value={selectedTemplate}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="confirm">Order Confirmation Template</SelectItem>
                                    <SelectItem value="fail">Order Failed/Cancelled Template</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="rounded-md bg-muted p-3 text-sm space-y-2 border">
                            <Label className="text-xs text-muted-foreground">Message Preview:</Label>
                            {selectedTemplate === 'confirm' ? (
                                <p className="text-xs italic text-foreground">
                                    "Hello *{selectedOrder?.customerName}*, your Buddy Clean booking for *{selectedOrder?.items[0]?.serviceName || 'Cleaning Service'}* is confirmed on *{selectedOrder ? new Date(selectedOrder.serviceDate).toLocaleDateString() : ''}*. Total amount: *INR {selectedOrder?.total}*. Thank you for choosing us!"
                                </p>
                            ) : (
                                <p className="text-xs italic text-red-700">
                                    "Hello *{selectedOrder?.customerName}*, we noticed your booking request for *{selectedOrder?.items[0]?.serviceName || 'Cleaning Service'}* has failed or was cancelled. Would you like to reschedule or customize your request? Please reply here to coordinate!"
                                </p>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setWhatsappOpen(false)}>Cancel</Button>
                        <Button onClick={handleSendWhatsApp} className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" /> Send on WhatsApp
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
}

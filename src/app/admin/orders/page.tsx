
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { getOrders, updateOrderStatus } from "@/lib/data";
import { Order } from "@/lib/types";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { useLocalStorageSync } from "@/hooks/use-local-storage-sync";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>(getOrders());
    const [searchQuery, setSearchQuery] = useState('');
    const { toast } = useToast();
    const router = useRouter();

    useLocalStorageSync('buddy-clean-orders', () => {
        setOrders(getOrders());
    });

    const getStatusVariant = (status: Order['status']) => {
        switch (status) {
            case 'Completed': return 'default';
            case 'In Progress': return 'secondary';
            case 'Pending': return 'outline';
            case 'Cancelled': return 'destructive';
        }
    }

    const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
        updateOrderStatus(orderId, newStatus);
        setOrders(getOrders()); // Refresh data
        toast({
            title: "Status Updated",
            description: `Order #${orderId} has been updated to "${newStatus}".`
        });
        // No need for router.refresh() as local state is managed
    };

    const orderStatuses: Order['status'][] = ['Pending', 'In Progress', 'Completed', 'Cancelled'];

    const filteredOrders = useMemo(() => {
        if (!searchQuery) {
            return orders;
        }
        return orders.filter(order =>
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.total.toString().includes(searchQuery)
        );
    }, [orders, searchQuery]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>All Orders</CardTitle>
                <CardDescription>A list of all bookings from your customers.</CardDescription>
                <div className="pt-4">
                    <Input 
                        placeholder="Search by Order ID, Name, Amount..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Service Date</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead>Payment</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredOrders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).map(order => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>
                                    <div className="font-medium">{order.customerName}</div>
                                    <div className="text-sm text-muted-foreground">{order.customerPhone}</div>
                                </TableCell>
                                <TableCell>{order.serviceDate.toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">INR {order.total.toFixed(2)}</TableCell>
                                <TableCell>{order.paymentMethod}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="flex items-center gap-2">
                                                 <Badge variant={getStatusVariant(order.status)} className="m-0 p-1 px-2 pointer-events-none">{order.status}</Badge>
                                                 <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            {orderStatuses.map(status => (
                                                <DropdownMenuItem 
                                                    key={status} 
                                                    onClick={() => handleStatusChange(order.id, status)}
                                                    disabled={order.status === status}
                                                >
                                                    {status}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

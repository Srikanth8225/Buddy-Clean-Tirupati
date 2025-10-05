
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getCustomers } from "@/lib/data";
import { Customer } from "@/lib/types";
import { useEffect, useState } from "react";

export default function AdminCustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        setCustomers(getCustomers());
    }, []);

  return (
    <Card>
        <CardHeader>
            <CardTitle>Customers</CardTitle>
            <CardDescription>A list of all your registered customers.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Registered On</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {customers.map(customer => (
                        <TableRow key={customer.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={`https://picsum.photos/seed/${customer.id}/100/100`} />
                                        <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">{customer.name}</span>
                                </div>
                            </TableCell>
                            <TableCell>{customer.phone}</TableCell>
                            <TableCell>{new Date(customer.createdAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  );
}


"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deleteCustomer, getCustomers } from "@/lib/data";
import { Customer } from "@/lib/types";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorageSync } from "@/hooks/use-local-storage-sync";

export default function AdminCustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);
    const { toast } = useToast();

    const fetchCustomers = () => {
        setCustomers(getCustomers());
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    useLocalStorageSync('buddy-clean-customers', fetchCustomers);

    const handleDeleteClick = (customer: Customer) => {
        setCustomerToDelete(customer);
    };

    const handleConfirmDelete = () => {
        if (customerToDelete) {
            deleteCustomer(customerToDelete.id);
            fetchCustomers();
            toast({
                title: "Customer Deleted",
                description: `${customerToDelete.name} has been removed.`,
                variant: "destructive"
            });
            setCustomerToDelete(null);
        }
    };

  return (
    <>
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
                          <TableHead><span className="sr-only">Actions</span></TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {customers.map(customer => (
                          <TableRow key={customer.id}>
                              <TableCell>
                                  <div className="flex items-center gap-3">
                                      <Avatar>
                                          <AvatarImage src={`https://picsum.photos/seed/${customer.id}/100/100`} />
                                          <AvatarFallback>{customer.name.charAt(0).toUpperCase()}</AvatarFallback>
                                      </Avatar>
                                      <span className="font-medium">{customer.name}</span>
                                  </div>
                              </TableCell>
                              <TableCell>{customer.phone}</TableCell>
                              <TableCell>{new Date(customer.createdAt).toLocaleDateString()}</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(customer)}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                    <span className="sr-only">Delete Customer</span>
                                </Button>
                              </TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </CardContent>
      </Card>
      
      <AlertDialog open={!!customerToDelete} onOpenChange={(isOpen) => !isOpen && setCustomerToDelete(null)}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the customer
                account and remove their data from our servers.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

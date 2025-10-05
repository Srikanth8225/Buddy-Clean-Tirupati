"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getServices } from "@/lib/data";
import { Car, Edit, Home as HomeIcon, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminServicesPage() {
  const services = getServices();
  const router = useRouter();

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle>Services</CardTitle>
          <CardDescription>A list of all cleaning services you offer.</CardDescription>
        </div>
        <Button size="sm" asChild>
          <Link href="/admin/services/edit">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Service
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Variants</TableHead>
              <TableHead>Base Price</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.name}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-2">
                    {service.category === 'home' ? <HomeIcon className="h-4 w-4 text-muted-foreground"/> : <Car className="h-4 w-4 text-muted-foreground"/>}
                    {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                  </span>
                </TableCell>
                <TableCell>{service.variants.length}</TableCell>
                <TableCell>INR {service.variants[0].price}</TableCell>
                <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => router.push(`/admin/services/edit?id=${service.id}`)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

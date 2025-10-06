
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAdmins } from "@/lib/data";
import { Customer } from "@/lib/types";
import { useEffect, useState } from "react";

export default function AdminAdminsPage() {
    const [admins, setAdmins] = useState<Customer[]>([]);

    useEffect(() => {
        setAdmins(getAdmins());
    }, []);

  return (
    <>
      <Card>
          <CardHeader>
              <CardTitle>Admins</CardTitle>
              <CardDescription>A list of all users with admin privileges.</CardDescription>
          </CardHeader>
          <CardContent>
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead>Admin</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Registered On</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {admins.map(admin => (
                          <TableRow key={admin.id}>
                              <TableCell>
                                  <div className="flex items-center gap-3">
                                      <Avatar>
                                          <AvatarImage src={`https://picsum.photos/seed/${admin.id}/100/100`} />
                                          <AvatarFallback>{admin.name.charAt(0).toUpperCase()}</AvatarFallback>
                                      </Avatar>
                                      <span className="font-medium">{admin.name}</span>
                                  </div>
                              </TableCell>
                              <TableCell>{admin.phone}</TableCell>
                              <TableCell>{new Date(admin.createdAt).toLocaleDateString()}</TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </CardContent>
      </Card>
    </>
  );
}

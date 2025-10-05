"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { getCustomers, getOrders } from "@/lib/data";
import { DollarSign, ListOrdered, UserPlus } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
    const orders = getOrders();
    const customers = getCustomers();

    const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
    const newOrders = orders.filter(o => o.createdAt > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length;
    const newCustomers = customers.filter(c => c.createdAt > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length;

    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        setChartData([
            { date: "Jan", revenue: Math.floor(Math.random() * 5000) + 1000 },
            { date: "Feb", revenue: Math.floor(Math.random() * 5000) + 1000 },
            { date: "Mar", revenue: Math.floor(Math.random() * 5000) + 1000 },
            { date: "Apr", revenue: Math.floor(Math.random() * 5000) + 1000 },
            { date: "May", revenue: Math.floor(Math.random() * 5000) + 1000 },
            { date: "Jun", revenue: totalRevenue },
          ]);
    }, [totalRevenue]);

    const chartConfig = {
        revenue: {
            label: "Revenue",
            color: "hsl(var(--primary))",
        },
    }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString('en-IN')}</div>
            <p className="text-xs text-muted-foreground">Across all orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Orders</CardTitle>
            <ListOrdered className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{newOrders}</div>
            <p className="text-xs text-muted-foreground">in the last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{newCustomers}</div>
            <p className="text-xs text-muted-foreground">in the last 30 days</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                    dataKey="date"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                </BarChart>
            </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

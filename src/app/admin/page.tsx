
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { getCustomers, getOrders } from "@/lib/data";
import { Order } from "@/lib/types";
import { DollarSign, ListOrdered, UserPlus } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useEffect, useState } from "react";
import { useLocalStorageSync } from "@/hooks/use-local-storage-sync";

export default function AdminDashboardPage() {
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [newOrders, setNewOrders] = useState(0);
    const [newCustomers, setNewCustomers] = useState(0);
    const [chartData, setChartData] = useState<any[]>([]);
    const [mounted, setMounted] = useState(false);

    const updateDashboardData = () => {
        const orders = getOrders();
        const customers = getCustomers();

        const totalRev = orders.reduce((acc, order) => acc + order.total, 0);
        setTotalRevenue(totalRev);

        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        
        const newOrd = orders.filter(o => new Date(o.createdAt) > thirtyDaysAgo).length;
        setNewOrders(newOrd);

        const newCust = customers.filter(c => new Date(c.createdAt) > thirtyDaysAgo).length;
        setNewCustomers(newCust);

        const monthlyRevenue: { [key: string]: number } = {};
        
        orders.forEach((order: Order) => {
            const month = new Date(order.createdAt).toLocaleString('default', { month: 'short' });
            if (!monthlyRevenue[month]) {
                monthlyRevenue[month] = 0;
            }
            monthlyRevenue[month] += order.total;
        });

        const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        const data = monthOrder.slice(0, new Date().getMonth() + 1).map(month => ({
            date: month,
            revenue: monthlyRevenue[month] || 0
        }));

        setChartData(data);
    };

    useEffect(() => {
        setMounted(true);
        updateDashboardData();
    }, []);

    useLocalStorageSync('buddy-clean-orders', updateDashboardData);
    useLocalStorageSync('buddy-clean-customers', updateDashboardData);


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
            <div className="text-2xl font-bold">INR {totalRevenue.toLocaleString('en-IN')}</div>
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
            {mounted ? (
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
            ) : (
              <div className="h-[250px] w-full bg-muted/20 animate-pulse rounded-md" />
            )}
        </CardContent>
      </Card>
    </div>
  );
}


"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { getCustomers, getOrders } from "@/lib/data";
import { Order } from "@/lib/types";
import { DollarSign, ListOrdered, UserPlus, Loader2 } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts";
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
        const currentMonthIdx = new Date().getMonth();
        
        const data = monthOrder.slice(0, currentMonthIdx + 1).map(month => ({
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
            <p className="text-xs text-muted-foreground">Across all time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Orders</CardTitle>
            <ListOrdered className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{newOrders}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{newCustomers}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px]">
            {mounted ? (
              <ChartContainer config={chartConfig} className="h-full w-full">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
                      <XAxis
                        dataKey="date"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        fontSize={12}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
                  </BarChart>
              </ChartContainer>
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-muted/10 rounded-md">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}

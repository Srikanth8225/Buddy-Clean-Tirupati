"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getTimeSlots, saveTimeSlots } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { Trash2, PlusCircle, Loader2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [newSlot, setNewSlot] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setTimeSlots(getTimeSlots());
    setLoading(false);
  }, []);

  const handleAddSlot = () => {
    if (!newSlot.trim()) return;
    const updatedSlots = [...timeSlots, newSlot.trim()].sort((a, b) => {
      // Basic sorting logic for 12-hour format if possible, otherwise alphabetical
      return a.localeCompare(b); 
    });
    setTimeSlots(updatedSlots);
    saveTimeSlots(updatedSlots);
    setNewSlot("");
    toast({ title: "Time Slot Added", description: `Added ${newSlot.trim()} to available slots.` });
  };

  const handleRemoveSlot = (slotToRemove: string) => {
    const updatedSlots = timeSlots.filter(slot => slot !== slotToRemove);
    setTimeSlots(updatedSlots);
    saveTimeSlots(updatedSlots);
    toast({ title: "Time Slot Removed", description: `Removed ${slotToRemove} from available slots.` });
  };

  if (loading) return <div className="flex h-32 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage Time Slots</CardTitle>
          <CardDescription>Configure the available booking time slots for customers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-end gap-4 max-w-sm">
            <div className="space-y-2 flex-1">
              <Label htmlFor="new-slot">Add New Slot</Label>
              <Input
                id="new-slot"
                placeholder="e.g., 08:00 AM"
                value={newSlot}
                onChange={(e) => setNewSlot(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddSlot()}
              />
            </div>
            <Button onClick={handleAddSlot}><PlusCircle className="mr-2 h-4 w-4" /> Add</Button>
          </div>

          <div className="space-y-2">
            <Label>Current Time Slots</Label>
            {timeSlots.length === 0 ? (
              <p className="text-sm text-muted-foreground">No time slots available.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {timeSlots.map((slot, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-md bg-muted/50">
                    <span className="text-sm font-medium">{slot}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleRemoveSlot(slot)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getServiceById, getServices, saveService } from "@/lib/data";
import { Service } from "@/lib/types";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

const variantSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Variant name is required."),
  price: z.coerce.number().min(0, "Price must be a positive number."),
});

const serviceSchema = z.object({
  name: z.string().min(3, "Service name must be at least 3 characters."),
  description: z.string().min(10, "Description is too short."),
  category: z.enum(["home", "car"], { required_error: "Please select a category." }),
  imageUrl: z.string().url("Please enter a valid image URL.").regex(/^https:\/\/images\.unsplash\.com\//, "Only images from images.unsplash.com are allowed."),
  features: z.array(z.string().min(3, "Feature description is too short.")).min(1, "At least one feature is required."),
  variants: z.array(variantSchema).min(1, "At least one service variant is required."),
});

export default function EditServicePage() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("id");
  const { toast } = useToast();
  const router = useRouter();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      features: [""],
      variants: [{ name: "", price: 0 }],
    },
  });
  
  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
    control: form.control,
    name: "features" as any,
  });

  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  useEffect(() => {
    if (serviceId) {
      const existingService = getServiceById(serviceId);
      if (existingService) {
        // @ts-ignore
        setService(existingService);
        form.reset({
            ...existingService,
            imageUrl: existingService.image.imageUrl,
            features: existingService.features.length > 0 ? existingService.features : [""]
        });
      }
    }
    setLoading(false);
  }, [serviceId, form]);

  const onSubmit = (data: z.infer<typeof serviceSchema>) => {
    setSubmitting(true);
    
    // Create new service object
    const newService: Service = {
      id: serviceId || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: data.name,
      description: data.description,
      category: data.category as "home" | "car",
      // @ts-ignore - bypassing strict image type check for dynamic images
      image: { id: "custom", description: data.name, imageUrl: data.imageUrl, imageHint: "custom" },
      // @ts-ignore
      gallery: [{ id: "custom", description: data.name, imageUrl: data.imageUrl, imageHint: "custom" }],
      features: data.features,
      process: [], // Optional field based on data.ts
      variants: data.variants.map((v, i) => ({ id: v.id || `var-${Date.now()}-${i}`, name: v.name, price: v.price })),
    };

    saveService(newService);

    setTimeout(() => {
      toast({
        title: serviceId ? "Service Updated" : "Service Created",
        description: `The service "${data.name}" has been successfully saved.`,
      });
      setSubmitting(false);
      router.push("/admin/services");
    }, 500);
  };
  
  const imageUrl = form.watch("imageUrl");

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>{serviceId ? "Edit Service" : "Add New Service"}</CardTitle>
            <CardDescription>Fill out the details for the service.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Name</FormLabel>
                  <FormControl><Input {...field} placeholder="e.g., Full Home Clean" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl><Textarea {...field} placeholder="Describe the service..." /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="home">Home Cleaning</SelectItem>
                      <SelectItem value="car">Car Wash</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl><Input {...field} placeholder="https://images.unsplash.com/..." /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {imageUrl && form.getFieldState('imageUrl').invalid === false && (
                <div className="relative aspect-video w-full max-w-sm rounded-md overflow-hidden border">
                    <Image src={imageUrl} alt="Service Image Preview" fill className="object-cover" />
                </div>
            )}
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Features</CardTitle>
                <CardDescription>List the key features of this service.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {featureFields.map((field, index) => (
                    <FormField
                        key={field.id}
                        control={form.control}
                        name={`features.${index}`}
                        render={({ field }) => (
                            <FormItem>
                               <div className="flex items-center gap-2">
                                    <FormControl><Input {...field} placeholder={`Feature ${index + 1}`} /></FormControl>
                                    <Button type="button" variant="destructive" size="icon" onClick={() => removeFeature(index)} disabled={featureFields.length <= 1}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                               </div>
                               <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendFeature("")}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Feature
                </Button>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Variants & Pricing</CardTitle>
                <CardDescription>Define the different options and prices for this service.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {variantFields.map((field, index) => (
                    <div key={field.id} className="flex items-start gap-4 p-4 border rounded-md">
                        <div className="grid grid-cols-2 gap-4 flex-grow">
                            <FormField
                                control={form.control}
                                name={`variants.${index}.name`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Variant Name</FormLabel>
                                        <FormControl><Input {...field} placeholder="e.g., 2 BHK" /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name={`variants.${index}.price`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price (INR)</FormLabel>
                                        <FormControl><Input type="number" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="button" variant="destructive" size="icon" onClick={() => removeVariant(index)} disabled={variantFields.length <= 1} className="mt-8">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
                 <Button type="button" variant="outline" size="sm" onClick={() => appendVariant({ name: "", price: 0 })}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Variant
                </Button>
            </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {serviceId ? "Update Service" : "Create Service"}
            </Button>
        </div>
      </form>
    </Form>
  );
}

    
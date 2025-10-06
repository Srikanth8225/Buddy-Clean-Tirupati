
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const phoneSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  phone: z.string().length(10, "Phone number must be 10 digits."),
});

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits."),
});

const PhoneStep = ({ onPhoneSubmit, loading }: { onPhoneSubmit: (data: z.infer<typeof phoneSchema>) => void; loading: boolean }) => {
  const form = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { name: "", phone: "" },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onPhoneSubmit)} className="space-y-6">
         <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Srinivas Rao" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <span className="flex h-10 items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">
                    +91
                  </span>
                  <Input placeholder="98765 43210" {...field} className="rounded-l-none" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Send OTP
        </Button>
      </form>
    </Form>
  );
};

const OtpStep = ({ phone, onBack, onOtpSubmit, loading }: { phone: string; onBack: () => void; onOtpSubmit: (otp: string) => void, loading: boolean }) => {
  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => onOtpSubmit(data.otp))} className="space-y-6">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <Input type="tel" inputMode="numeric" pattern="[0-9]*" placeholder="123456" {...field} maxLength={6} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Verify & Login
        </Button>
        <Button variant="link" onClick={onBack} className="w-full">
          Change number
        </Button>
      </form>
    </Form>
  );
};

export default function LoginPage() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const { login, loading, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (user) {
      router.replace(redirect);
    }
  }, [user, router, redirect]);

  const handlePhoneSubmit = (data: z.infer<typeof phoneSchema>) => {
    setFormData({ name: data.name, phone: `+91${data.phone}` });
    console.log(`Sending OTP to +91${data.phone}`);
    setStep('otp');
  };

  const handleOtpSubmit = (otp: string) => {
    console.log(`Verifying OTP ${otp} for ${formData.phone}`);
    login(formData.phone, otp, formData.name);
  };

  const handleBack = () => {
    setFormData({ name: '', phone: '' });
    setStep('phone');
  };

  return (
    <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">
            {step === 'phone' ? "Login or Sign Up" : "Enter OTP"}
          </CardTitle>
          <CardDescription>
            {step === 'phone'
              ? "Enter your name and phone number to get started."
              : `Enter the 6-digit OTP sent to ${formData.phone}.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'phone' ? (
            <PhoneStep onPhoneSubmit={handlePhoneSubmit} loading={loading} />
          ) : (
            <OtpStep phone={formData.phone} onBack={handleBack} onOtpSubmit={handleOtpSubmit} loading={loading} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

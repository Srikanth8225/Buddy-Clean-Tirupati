
"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
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
  phone: z.string().length(10, "Phone number must be 10 digits."),
});

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits."),
});

const PhoneStep = ({ onPhoneSubmit, loading }: { onPhoneSubmit: (phone: string) => void; loading: boolean }) => {
  const form = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "" },
  });

  const handleSubmit = (data: z.infer<typeof phoneSchema>) => {
    onPhoneSubmit(`+91${data.phone}`);
  };
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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

    const handleSubmit = (data: z.infer<typeof otpSchema>) => {
        onOtpSubmit(data.otp);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
  const [phone, setPhone] = useState('');
  const { login, loading, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (user) {
        router.replace(redirect);
    }
  }, [user, router, redirect]);
  
  const handlePhoneSubmit = (submittedPhone: string) => {
    setPhone(submittedPhone);
    // Here you would typically send an OTP. For this demo, we'll just move to the next step.
    console.log(`Sending OTP to ${submittedPhone}`);
    setStep('otp');
  };

  const handleOtpSubmit = (otp: string) => {
    // Here you would verify the OTP.
    console.log(`Verifying OTP ${otp} for ${phone}`);
    login(phone, otp); // Pass OTP to login function for verification
  };

  const handleBack = () => {
    setPhone('');
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
              ? "Enter your phone number to receive an OTP for verification."
              : `Enter the 6-digit OTP sent to ${phone}.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'phone' ? (
            <PhoneStep onPhoneSubmit={handlePhoneSubmit} loading={loading} />
          ) : (
            <OtpStep phone={phone} onBack={handleBack} onOtpSubmit={handleOtpSubmit} loading={loading} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

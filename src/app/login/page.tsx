
"use client";

import { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
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

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const phoneSchema = z.object({
  phone: z.string().regex(phoneRegex, "Invalid phone number format.").min(10, { message: "Phone number must be at least 10 digits." }),
});

const otpSchema = z.object({
  otp: z.string().min(6, { message: "OTP must be 6 digits." }).max(6, { message: "OTP must be 6 digits." }),
});


const PhoneStep = ({ onPhoneSubmit }: { onPhoneSubmit: (phone: string) => void; }) => {
    const { login, loading } = useAuth();
    const form = useForm<z.infer<typeof phoneSchema>>({
        resolver: zodResolver(phoneSchema),
        defaultValues: { phone: "" },
    });

    const handleSubmit = (data: z.infer<typeof phoneSchema>) => {
        onPhoneSubmit(data.phone);
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
                    <Input placeholder="+91 98765 43210" {...field} />
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

const OtpStep = ({ phone, onBack }: { phone: string; onBack: () => void; }) => {
    const { login, loading } = useAuth();
    const form = useForm<z.infer<typeof otpSchema>>({
        resolver: zodResolver(otpSchema),
        defaultValues: { otp: "" },
    });

    const handleSubmit = (data: z.infer<typeof otpSchema>) => {
        // In a real app, you'd verify the OTP (data.otp) here.
        // We'll just use the mock login function with the stored phone data.
        login(phone);
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
  
  const handlePhoneSubmit = (submittedPhone: string) => {
    setPhone(submittedPhone);
    setStep('otp');
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
            <PhoneStep onPhoneSubmit={handlePhoneSubmit} />
          ) : (
            <OtpStep phone={phone} onBack={handleBack} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

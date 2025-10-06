
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
import { getMockUserByPhone } from "@/lib/data";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const phoneFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().regex(phoneRegex, "Invalid phone number format.").min(10, { message: "Phone number must be at least 10 digits." }),
});

const otpFormSchema = z.object({
  otp: z.string().min(6, { message: "OTP must be 6 digits." }).max(6, { message: "OTP must be 6 digits." }),
});

export default function LoginPage() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneData, setPhoneData] = useState({ name: '', phone: '' });
  const { login, loading } = useAuth();
  
  const phoneForm = useForm<z.infer<typeof phoneFormSchema>>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: { name: "", phone: "" },
  });

  const otpForm = useForm<z.infer<typeof otpFormSchema>>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: { otp: "" },
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value;
    phoneForm.setValue('phone', phone);
    const existingUser = getMockUserByPhone(phone);
    if (existingUser) {
        phoneForm.setValue('name', existingUser.name, { shouldValidate: true });
    }
  };

  function onPhoneSubmit(data: z.infer<typeof phoneFormSchema>) {
    setPhoneData(data);
    // In a real app, you'd send an OTP here.
    // For this mock, we'll just move to the next step.
    setStep('otp');
  }

  function onOtpSubmit(data: z.infer<typeof otpFormSchema>) {
    // In a real app, you'd verify the OTP (data.otp) here.
    // We'll just use the mock login function with the stored phone data.
    login(phoneData.phone, phoneData.name);
  }

  return (
    <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">
            {step === 'phone' ? "Login or Sign Up" : "Enter OTP"}
          </CardTitle>
          <CardDescription>
            {step === 'phone'
              ? "Enter your details to receive an OTP for verification."
              : `We've sent a mock OTP to ${phoneData.phone}.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'phone' ? (
            <Form {...phoneForm}>
              <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-6">
                <FormField
                  control={phoneForm.control}
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
                  control={phoneForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 98765 43210" {...field} onChange={handlePhoneChange} />
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
          ) : (
            <Form {...otpForm}>
              <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-6">
                <FormField
                  control={otpForm.control}
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
                <Button variant="link" onClick={() => { setStep('phone'); otpForm.reset(); }} className="w-full">
                  Change number
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

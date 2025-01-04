import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { Verified } from "lucide-react";
import { userRegisterSchema } from "@/schema/auth";
import {
  IIsEmailVerify,
  sendVerifyEmailPayload,
  sendVerifyEmailResponse,
  userRegisterPayload,
  userRegisterResponse,
} from "@/types/auth";
import { sendVerifyEmail, userRegister } from "@/api/auth";
import useAuthContext from "@/context/auth/useAuthContext";
import { CLIENT_ID } from "@/lib/constants";
import { Link } from "react-router-dom";
import InputOTPForm from "./InputOTPForm";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  password: "",
};

const RegisterForm = () => {
  const [isEmailVerified, setIsEmailVerified] = useState<IIsEmailVerify>({ email: "", isVerified: false });
  // const navigate = useNavigate();
  const { login } = useAuthContext();

  // 1. Define your form.
  const form = useForm<z.infer<typeof userRegisterSchema>>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues,
  });

  const { reset, getValues } = form;

  // mutation for sending mail for verification
  const EmailOtpMutation = useMutation<sendVerifyEmailResponse, Error, sendVerifyEmailPayload>({
    mutationFn: sendVerifyEmail,
    onSuccess: (data) => {
      if (data.message == "Email address already Verified.") {
        setIsEmailVerified({ email: data.email, isVerified: true });
      } else {
        setIsEmailVerified({ email: data.email, isVerified: false });
      }
      toast({
        title: "Email verification:",
        description: data.message,
      });
    },
    onError: (error: any) => {
      console.log("error", error);
      toast({
        title: "warning:",
        description: error?.response?.data?.message || error.message,
        variant: "destructive",
      });
    },
  });

  // mutation for sending mail for verification
  const RegisterMutation = useMutation<userRegisterResponse, Error, userRegisterPayload>({
    mutationFn: userRegister,
    onSuccess: (data) => {
      login(data.token);
      reset();
      toast({
        title: "Success:",
        description: data.message,
      });
      // window.location.href = MAIN_COURSES_PAGE;
      // navigate("/");
    },
    onError: (error: any) => {
      console.log("error", error);
      toast({
        title: "Registration warning:",
        description: error?.response.data.message || error.message,
        variant: "destructive",
      });
    },
  });

  const sendVerificationEmailHandle = () => {
    const email = getValues("email");
    if (email) {
      EmailOtpMutation.mutate({ email });
    } else {
      toast({
        title: "Warning",
        description: "Enter email for verification.",
      });
    }
  };

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof userRegisterSchema>) {
    const { firstName, lastName, email, mobile, password } = values;
    // ✅ This will be type-safe and validated.
    console.log(values);
    if (isEmailVerified.isVerified) {
      RegisterMutation.mutate({
        name: `${firstName} ${lastName}`,
        email,
        mobile,
        password,
        creatorId: CLIENT_ID,
      });
    } else {
      toast({
        title: "Warning",
        description: "Email is not verified, first verify.",
      });
    }
  }

  if (isEmailVerified?.email && !isEmailVerified?.isVerified) {
    return (
      <div className="grid gap-4">
        <InputOTPForm isEmailVerified={isEmailVerified} setIsEmailVerified={setIsEmailVerified} isRegister={true} />
      </div>
    );
  }

  console.log("error");
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="surname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid gap-2" style={{ marginTop: "0.5rem" }}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input placeholder="Email address" {...field} />
                      {!isEmailVerified.isVerified && (
                        <Button size={"default"} type="button" onClick={sendVerificationEmailHandle}>
                          {EmailOtpMutation.isPending ? "Sending.." : "Verify"}
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  {isEmailVerified.isVerified ? (
                    <FormDescription className="text-green-600 flex items-center gap-1">
                      <Verified className="h-4 w-4" /> Verified
                    </FormDescription>
                  ) : (
                    <FormDescription>First verify email address</FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2" style={{ marginTop: "0.5rem" }}>
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile number</FormLabel>
                  <FormControl>
                    <Input placeholder="Mobile number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2" style={{ marginTop: "0.5rem" }}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormDescription>Password must be strong and at least 8 characters long.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            {RegisterMutation.isPending ? "Creating..." : "Create an account"}
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link to="/" className="underline">
          Login
        </Link>
      </div>
    </>
  );
};

export default RegisterForm;

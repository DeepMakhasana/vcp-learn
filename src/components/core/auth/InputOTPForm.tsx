import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Dispatch, SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";
import { IIsEmailVerify } from "@/types/auth";
import { verifyEmailOtp, verifyRegisterOtp } from "@/api/auth";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

interface IInputOTPForm {
  isEmailVerified: IIsEmailVerify;
  setIsEmailVerified: Dispatch<SetStateAction<IIsEmailVerify>>;
  isRegister?: boolean;
}

type verifyEmailResponse = {
  email: string;
  message: string;
};

type verifyEmailPayload = {
  email: string;
  otp: string;
};

function InputOTPForm({ isEmailVerified, setIsEmailVerified, isRegister }: IInputOTPForm) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  // mutation for verify otp for verification
  const mutation = useMutation<verifyEmailResponse, Error, verifyEmailPayload>({
    mutationFn: isRegister ? verifyRegisterOtp : verifyEmailOtp,
    onSuccess: (data) => {
      console.log("successfully verification done", data);
      setIsEmailVerified({ email: isEmailVerified.email, isVerified: true });
      toast({
        title: "OTP verification:",
        description: <pre className="mt-2 w-[340px] rounded-md p-4">{data.message}</pre>,
      });
    },
    onError: (error: any) => {
      console.log("error", error);
      toast({
        title: "OTP verification error:",
        description: <pre className="w-[340px] rounded-md py-2">{error?.response.data.message || error.message}</pre>,
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    mutation.mutate({ email: isEmailVerified.email, otp: data.pin });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your {isEmailVerified.email} Email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={mutation.isPending} type="submit">
          {mutation.isPending ? "Verify..." : "Verify"}
        </Button>
      </form>
    </Form>
  );
}

export default InputOTPForm;

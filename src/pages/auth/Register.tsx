import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "@/components/core/auth/RegisterForm";

const Register = () => {
  return (
    <main className="h-screen flex justify-center items-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>Enter your details below to register your account</CardDescription>
        </CardHeader>
        <CardContent>
          {/* form */}
          <RegisterForm />
          {/* --- */}
        </CardContent>
      </Card>
    </main>
  );
};

export default Register;

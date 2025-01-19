import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getCourseBySlug, purchaseCourse, purchaseVerifyCourse } from "@/api/course";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useAuthContext from "@/context/auth/useAuthContext";
import { CourseCheckoutType, IPurchaseCoursePayload, IPurchaseVerifyCoursePayload } from "@/types/course";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { courseImageBaseUrl } from "@/lib/constants";
import NotFound from "./NotFound";
import { useEffect, useState } from "react";
import { loadRazorpayScript } from "@/lib/utils";

const Checkout = () => {
  const { slug } = useParams();
  const [paymentGatewayLoading, setPaymentGatewayLoading] = useState<boolean | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuthContext();

  const {
    data: course,
    isLoading: dataLoafing,
    isError,
    error,
  } = useQuery<CourseCheckoutType, Error>({
    queryKey: ["course", { slug }],
    queryFn: () => getCourseBySlug(slug as string),
    enabled: !!slug,
  });

  // mutation for checkout
  const { mutate, isPending } = useMutation<any, Error, IPurchaseCoursePayload>({
    mutationFn: purchaseCourse,
    onSuccess: (data) => {
      console.log("order data", data);
      handlePaymentVerify(data);
    },
    onError: (error: any) => {
      console.log("error", error);
      toast({
        title: "warning:",
        description: error?.response.data.message || error.message,
        variant: "destructive",
      });
    },
  });

  // order verify
  const { mutate: orderVerifyMutate, isPending: isOrderVerifyPending } = useMutation<
    any,
    Error,
    IPurchaseVerifyCoursePayload
  >({
    mutationFn: purchaseVerifyCourse,
    onSuccess: (data) => {
      console.log("verify data", data);
      if (data.status === "SUCCESS") {
        setPaymentStatus(true);
      } else {
        alert(
          "Fail payment try again, if amount is debit from your account then it will be refund in 5 to 6 working day."
        );
      }
    },
    onError: (error: any) => {
      console.log("error", error);
      toast({
        title: "warning:",
        description: error?.response.data.message || error.message,
        variant: "destructive",
      });
    },
  });

  // handlePaymentVerify Function
  const handlePaymentVerify = async (data: any) => {
    setPaymentGatewayLoading(true);
    const paymentScript = await loadRazorpayScript();
    setPaymentGatewayLoading(false);

    if (!paymentScript) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_gxKZu0qp1RcLv5",
      amount: data.amount,
      currency: data.currency,
      name: course?.title,
      description: "Test Mode",
      order_id: data.id,
      handler: async (response: any) => {
        console.log("response", response);
        orderVerifyMutate({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          courseId: Number(course?.id),
          userId: Number(user?.id),
          price: Number(course?.price),
          duration: Number(course?.duration),
        });
      },
      theme: {
        color: "#5f63b8",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  function handleCoursePurchase() {
    if (isAuthenticated) {
      mutate({
        userId: Number(user?.id),
        courseId: course?.id as number,
        price: course?.price as number,
        duration: course?.duration as number,
      });
    } else {
      navigate("/register", { state: { previous: location.pathname } });
    }
  }

  useEffect(() => {
    if (paymentStatus) {
      navigate("/");
    }
  }, [paymentStatus, navigate]);

  if (dataLoafing || isOrderVerifyPending || paymentGatewayLoading) {
    return (
      <div className="flex gap-2 justify-center my-4">
        <Loader2 className="animate-spin w-6 h-6" /> {paymentGatewayLoading && "Processing"}{" "}
        {isOrderVerifyPending && "Verifying"}
      </div>
    );
  }

  if (isError) {
    console.log({ error });
    return <p>Error: {error.message}</p>;
  }

  if (!course) {
    return <NotFound />;
  }

  return (
    <section className="flex max-w-screen-xl justify-center mx-auto items-center lg:h-screen">
      <div className="grid lg:gap-10 grid-cols-1 lg:grid-cols-3 px-3 pb-10 lg:py-8 items-start">
        <div className="col-span-2">
          <div className="flex gap-3 items-center py-8 mb-4">
            <Button variant={"outline"} size={"icon"} onClick={() => navigate(-1)}>
              <ChevronLeft />
            </Button>
            <h2 className="text-xl font-semibold">Your Checkout</h2>
          </div>
          <Card className="flex flex-col md:flex-row items-center">
            <img
              src={`${courseImageBaseUrl}${course?.image}`}
              alt={course?.title}
              width={512}
              height={288}
              className="rounded"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <CardHeader className="min-w-[200px]">
              <CardTitle className="text-lg">{course?.title}</CardTitle>
              <CardDescription className="text-xl font-bold">₹ {course?.price}.00</CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="w-full">
          <h2 className="text-xl font-semibold py-8 lg:py-10 lg:mb-4">Summary</h2>
          <div>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left py-4">Item</TableHead>
                  <TableHead className="text-right w-[100px]">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow key={course?.id}>
                  <TableCell className="text-sm font-medium py-6">{course?.title}</TableCell>
                  <TableCell className="text-right">₹ {course?.price}</TableCell>
                </TableRow>
                {/* <TableRow>
                  <TableCell className="text-sm font-medium py-6">% Discount</TableCell>
                  <TableCell className="text-right">₹ -120.00 </TableCell>
                </TableRow> */}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell className="py-4">Total</TableCell>
                  <TableCell className="text-right">₹ {course?.price}.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            <Button className="block w-full mt-4" onClick={handleCoursePurchase} disabled={isPending}>
              {isPending ? "Order process.." : "Conform Payment"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;

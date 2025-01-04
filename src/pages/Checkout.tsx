import { useNavigate, useParams } from "react-router-dom";
import { getCourseBySlug, purchaseCourse } from "@/api/course";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useAuthContext from "@/context/auth/useAuthContext";
import { CourseCheckoutType, IPurchaseCoursePayload, IPurchaseCourseResponse } from "@/types/course";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { courseImageBaseUrl } from "@/lib/constants";
import NotFound from "./NotFound";
import routeProtection from "@/components/HOC/routeProtection";

const Checkout = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthContext();

  const {
    data: course,
    isLoading: dataLoafing,
    isError,
    error,
  } = useQuery<CourseCheckoutType, Error>({
    queryKey: ["course", { slug }],
    queryFn: () => getCourseBySlug(slug as string),
    enabled: !!slug && isAuthenticated,
  });

  // mutation for checkout
  const { mutate, isPending } = useMutation<IPurchaseCourseResponse, Error, IPurchaseCoursePayload>({
    mutationFn: purchaseCourse,
    onSuccess: (data) => {
      if (data.userId == user?.id) {
        toast({
          title: "Success:",
          description: "Course purchased successfully",
        });
        navigate("/dashboard");
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

  if (dataLoafing) {
    return (
      <div className="flex justify-center my-4">
        <Loader2 className="animate-spin w-6 h-6" />
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
            <Button
              className="block w-full mt-4"
              onClick={() =>
                mutate({
                  userId: Number(user?.id),
                  courseId: course.id,
                  price: course.price,
                  duration: course.duration,
                })
              }
              disabled={isPending}
            >
              {isPending ? "Order process.." : "Conform Payment"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default routeProtection(Checkout, true);

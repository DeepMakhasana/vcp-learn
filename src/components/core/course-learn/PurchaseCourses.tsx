import { getPurchaseCourses } from "@/api/course";
import { IPurchaseCoursesResponse } from "@/types/course";
import { useQuery } from "@tanstack/react-query";
import PurchasedCourse from "./PurchasedCourse";
import { Button } from "@/components/ui/button";
import { MAIN_COURSES_PAGE } from "@/lib/constants";
import { Loader2 } from "lucide-react";

const PurchaseCourses = () => {
  const { data, isLoading, isError, error } = useQuery<IPurchaseCoursesResponse[], Error>({
    queryKey: ["courses"],
    queryFn: getPurchaseCourses,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center my-4">
        <Loader2 className="animate-spin w-6 h-6" />
      </div>
    );
  }
  if (isError) {
    return <p>{error.message}</p>;
  }

  if (data?.length === 0) {
    return <NoCourses />;
  }

  return (
    <div className="grid gap-4">
      {data
        ?.filter((course) => new Date(course.endAt as Date).getTime() > Date.now())
        .map((course) => (
          <PurchasedCourse key={course.id} course={course} />
        ))}
    </div>
  );
};

const NoCourses = () => {
  return (
    <div
      className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
      x-chunk="dashboard-02-chunk-1"
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">You have no purchase courses</h3>
        <p className="text-sm text-muted-foreground">You can start learning as soon.</p>
        <a href={MAIN_COURSES_PAGE}>
          <Button className="mt-4">explore</Button>
        </a>
      </div>
    </div>
  );
};

export default PurchaseCourses;

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { courseImageBaseUrl } from "@/lib/constants";
import { IPurchaseCoursesResponse } from "@/types/course";
import { SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import CourseProgress from "./CourseProgress";
import { formateDateTime } from "@/lib/utils";

const PurchasedCourse = ({ course }: { course: IPurchaseCoursesResponse }) => {
  function getDaysBetweenDates(startDate: string, endDate: string): number {
    // Parse the ISO strings into Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate the difference in milliseconds
    const diffInMilliseconds = end.getTime() - start.getTime();

    // Convert milliseconds to days
    return Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  }

  return (
    <Card className="flex flex-col md:flex-row">
      <CardHeader className="p-3">
        <img
          src={`${courseImageBaseUrl}${course.course.image}`}
          alt={course.course.title}
          width={640}
          height={360}
          className="w-full max-h-64 min-h-36 object-cover rounded bg-slate-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </CardHeader>
      <CardContent className="p-3 flex gap-3 justify-between w-full flex-col sm:flex-row">
        <div className="w-full">
          <h2 className="mb-2 text-lg font-medium">{course.course?.title}</h2>
          <p className="text-muted-foreground my-2 text-sm">Start Date: {formateDateTime(course.createdAt)}</p>
          {/* learning progress */}
          <CourseProgress purchaseId={course?.id} courseId={course?.course?.id} />
          {/* remaining days */}
          <p className="mt-2 mb-4 line-clamp-4 text-sm text-muted-foreground">
            <b>remaining:</b> {getDaysBetweenDates(`${course.createdAt}`, `${course.endAt}`)} Days
          </p>
          <div className="flex gap-2">
            <Link to={`/dashboard/learn/${course.course.slug}/${course.id}`}>
              <Button variant={"default"}>
                <SlidersHorizontal />
                Start Learning
              </Button>
            </Link>
          </div>
        </div>
        <div>
          {/* <Link
            href={`/courses/${course.course.id}`}
            className="flex gap-2 justify-center items-center border rounded-lg px-4 py-2"
          >
            <LinkIcon className="h-4 w-4" />
            Preview
          </Link> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default PurchasedCourse;

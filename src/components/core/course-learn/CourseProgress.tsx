import { getLearningProgress } from "@/api/course";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

const CourseProgress = ({ purchaseId, courseId }: { purchaseId: string; courseId: number }) => {
  const { data, isLoading, isError, error } = useQuery<{ progressPercentage: number }, Error>({
    queryKey: ["courseProgress", { purchaseId }],
    queryFn: () => getLearningProgress({ purchaseId, courseId }),
    staleTime: 60,
    gcTime: 60,
  });

  if (isLoading) {
    return (
      <div className="grid gap-2 mb-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-full" />
      </div>
    );
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="grid gap-2 mb-2">
      <span className="text-sm text-muted-foreground">{data?.progressPercentage}% Completed</span>
      <Progress value={data?.progressPercentage} className={`w-[${data?.progressPercentage}%]`} />
    </div>
  );
};

export default CourseProgress;

import { getLearningProgress } from "@/api/course";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const CourseProgress = ({ purchaseId, courseId }: { purchaseId: number; courseId: number }) => {
  const { data, isLoading, isError, error } = useQuery<{ progressPercentage: number }, Error>({
    queryKey: ["courseProgress", { courseId }],
    queryFn: () => getLearningProgress({ purchaseId, courseId }),
    staleTime: 60,
    gcTime: 60,
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

  return (
    <div className="grid gap-2 mb-2">
      <span className="text-sm text-muted-foreground">{data?.progressPercentage}% Completed</span>
      <Progress value={data?.progressPercentage} className={`w-[${data?.progressPercentage}%]`} />
    </div>
  );
};

export default CourseProgress;

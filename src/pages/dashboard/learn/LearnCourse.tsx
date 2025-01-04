import { createLessonProgress } from "@/api/course";
import { Button } from "@/components/ui/button";
import useLessonNavigationContext from "@/context/lessonNavigation/useLessonNavigationContext";
import { toast } from "@/hooks/use-toast";
import { ICreateLessonProgressPayload, ICreateLessonProgressResponse } from "@/types/course";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import LearnVideo from "@/components/core/course-learn/LearnVideo";
import LearnTask from "@/components/core/course-learn/LearnTask";
import PublicVideoPlayer from "@/components/core/course-learn/PublicVideoPlayer";

const LearnCourse = () => {
  const { slug, purchaseId } = useParams();
  const { currentLesson, nextLesson, previousLesson, setCurrentLesson } = useLessonNavigationContext();
  const queryClient = useQueryClient();

  // mutation for add progress in lesson
  const { mutate: nextMutate, isPending: nextPending } = useMutation<
    ICreateLessonProgressResponse,
    Error,
    ICreateLessonProgressPayload
  >({
    mutationFn: createLessonProgress,
    onSuccess: (data) => {
      // Update the query data
      queryClient.setQueryData(["learn", { slug }], (oldData: any) => {
        if (!oldData) return oldData; // Return if the data doesn't exist

        // Deep clone the old data to prevent mutations
        const updatedData = structuredClone(oldData);

        // Find the module containing the lesson
        updatedData.modules.forEach((module: any) => {
          const lesson = module.lessons.find((lesson: any) => lesson.id === data.lessonId);
          if (lesson) {
            // Add the new progress to the lesson's progresses array
            lesson.progresses = lesson.progresses || [];
            lesson.progresses.push(data);
          }
        });

        return updatedData; // Return the updated data
      });
      const nextId = nextLesson?.id;
      if (nextId) {
        setCurrentLesson(nextId);
      }
    },
    onError: (error: any) => {
      console.log("error", error);
      toast({
        title: "Error:",
        description: error?.response.data.message || error.message,
        variant: "destructive",
      });
    },
  });

  const nextLessonHandle = () => {
    const currentId = currentLesson?.id;
    const nextId = nextLesson?.id;
    if (currentId && !currentLesson?.progresses.length) {
      nextMutate({ purchaseId: Number(purchaseId), lessonId: currentId });
    } else {
      if (nextId) {
        setCurrentLesson(nextId);
      }
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      {currentLesson?.isVideo ? (
        <div className="bg-slate-400">
          {currentLesson?.public?.url ? (
            <PublicVideoPlayer url={currentLesson?.public?.url} />
          ) : currentLesson?.isPrivateVideo ? (
            <LearnVideo />
          ) : (
            <p className="bg-white text-center">No video uploaded in this lesson.</p>
          )}
        </div>
      ) : (
        <div>
          {currentLesson?.tasks ? <LearnTask /> : <p className="text-center">No task uploaded in this lesson.</p>}
        </div>
      )}

      {/* lesson navigation */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <p>{currentLesson?.title}</p>
        <div className="flex justify-between items-center gap-4">
          {previousLesson?.id ? (
            <Button variant={"outline"} onClick={() => setCurrentLesson(previousLesson?.id)}>
              Previous
            </Button>
          ) : (
            <Button variant={"outline"} disabled>
              Previous
            </Button>
          )}
          {nextLesson?.id ? (
            <Button variant={"default"} disabled={nextPending} onClick={nextLessonHandle}>
              {nextPending ? "Loading..." : "Next"}
            </Button>
          ) : (
            <Button variant={"default"}>Completed</Button>
          )}
        </div>
      </div>
    </main>
  );
};

export default LearnCourse;

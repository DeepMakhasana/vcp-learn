import { getPrivateTaskUrl } from "@/api/course";
import { useQuery } from "@tanstack/react-query";
import TaskFile from "./TaskFile";
import { useParams } from "react-router-dom";
import useLessonNavigationContext from "@/context/lessonNavigation/useLessonNavigationContext";
import { IPrivateTaskResponse } from "@/types/course";
import { Loader2 } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Textarea } from "@/components/ui/textarea";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// Zod schema for form validation
// const TaskSchema = z.object({
//   file: z
//     .instanceof(File, { message: "A valid file is required" })
//     .nullable()
//     .refine((file) => file !== null, "File is required"),
//   remark: z.string().min(1, "Task remark is required").max(500, "Remark cannot exceed 500 characters"),
// });

// type TaskFormValues = z.infer<typeof TaskSchema>;

const LearnTask = () => {
  const { slug, purchaseId } = useParams();
  const { currentLesson } = useLessonNavigationContext();

  const lessonId = currentLesson?.id as number;
  const { data: taskData, isLoading: taskLoading } = useQuery<IPrivateTaskResponse[], Error>({
    queryKey: ["task", { lessonId }],
    queryFn: () => getPrivateTaskUrl({ purchaseId: Number(purchaseId), lessonId }),
    enabled: !!slug && !!purchaseId && !!lessonId,
  });

  // task submission
  // const form = useForm<TaskFormValues>({
  //   resolver: zodResolver(TaskSchema),
  //   defaultValues: {
  //     file: undefined,
  //     remark: "",
  //   },
  // });

  // const onSubmit = async (data: TaskFormValues) => {
  //   if (data.file) {
  //     // await uploadFileMutation.mutateAsync(data.file);
  //   }

  //   // Submit task remark here
  //   console.log("Task data:", data);
  // };

  if (taskLoading) {
    return (
      <div className="flex justify-center my-4">
        <Loader2 className="animate-spin w-6 h-6" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {taskData?.map((task) => (
        <div key={task.fileName} className="flex flex-col gap-2 items-end">
          <TaskFile task={task} />
          {/* <Dialog>
            <DialogTrigger asChild>
              <p className="text-sm text-muted-foreground cursor-pointer">Submit Your Task, if you want!</p>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Task Submission</DialogTitle>
                <DialogDescription>Upload your creative solution</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    name="file"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload Document</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="remark"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Task Remark</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Add your task remark here..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter className="mt-4">
                    <Button type="submit">Submit</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog> */}
        </div>
      ))}
    </div>
  );
};

export default LearnTask;

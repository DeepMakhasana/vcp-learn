import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../../ui/sheet";
import { CircleCheckBig, File, LockKeyhole, Menu, TvMinimalPlay, Video } from "lucide-react";
import { Button } from "../../ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion";
import { ICourseLearnResponse } from "@/types/learn";
import useLessonNavigationContext from "@/context/lessonNavigation/useLessonNavigationContext";

const CourseLearnSMSideBar = ({ course }: { course: ICourseLearnResponse }) => {
  const { currentLesson, setCurrentLesson } = useLessonNavigationContext();

  const handleLessonSwitch = (id: number) => {
    setCurrentLesson(id);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col px-4">
        <div className="flex-1 overflow-y-scroll  scrollbar-hide">
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={course.modules.map((module) => `${module.order}`)}
          >
            {course.modules.map((module) => (
              <AccordionItem value={`${module.order}`} key={module.id}>
                <AccordionTrigger>{module.title}</AccordionTrigger>
                <AccordionContent>
                  {module.lessons.map((lesson) => (
                    <SheetClose
                      key={lesson.id}
                      className={`w-full  ${lesson.progresses.length > 0 ? "cursor-pointer" : "cursor-default"}`}
                    >
                      <div
                        className={`flex justify-between items-center p-4 border ${
                          currentLesson?.id == lesson.id && "border-black"
                        } rounded mb-2`}
                        onClick={() => lesson.progresses.length > 0 && handleLessonSwitch(lesson.id)}
                      >
                        <div className="flex gap-4">
                          <div>{lesson.isVideo ? <Video className="w-5 h-5" /> : <File className="w-5 h-5" />}</div>
                          <p className="line-clamp-1">{lesson.title}</p>
                        </div>
                        {currentLesson?.id != lesson.id ? (
                          <div>
                            {lesson.progresses.length <= 0 ? (
                              <LockKeyhole className="w-5 h-5" />
                            ) : (
                              <CircleCheckBig className="w-5 h-5" />
                            )}
                          </div>
                        ) : (
                          <div>
                            <TvMinimalPlay className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    </SheetClose>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CourseLearnSMSideBar;

import { ICourseLearnResponse } from "@/types/learn";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion";
import { Book, CircleCheckBig, File, LockKeyhole, TvMinimalPlay, Video } from "lucide-react";
import useLessonNavigationContext from "@/context/lessonNavigation/useLessonNavigationContext";

const CourseLearnLGSideBar = ({ course }: { course: ICourseLearnResponse }) => {
  const { currentLesson, setCurrentLesson } = useLessonNavigationContext();

  const handleLessonSwitch = (id: number) => {
    setCurrentLesson(id);
  };

  return (
    <div className="flex-1 px-4 overflow-y-scroll scrollbar-hide">
      <Accordion type="multiple" className="w-full" defaultValue={course.modules.map((module) => `${module.order}`)}>
        {course.modules.map((module) => (
          <AccordionItem value={`${module.order}`} key={module.id}>
            <AccordionTrigger>{module.title}</AccordionTrigger>
            <AccordionContent>
              {module.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className={`flex justify-between items-center p-4 border ${
                    currentLesson?.id == lesson.id && "border-black"
                  } rounded mb-2 ${lesson.progresses.length > 0 ? "cursor-pointer" : "cursor-default"}`}
                  onClick={() => lesson.progresses.length > 0 && handleLessonSwitch(lesson.id)}
                >
                  <div className="flex gap-4">
                    <div>{lesson.isVideo ? <Video className="w-5 h-5" /> : <File className="w-5 h-5" />}</div>
                    <p>{lesson.title}</p>
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
                      {currentLesson.isVideo ? <TvMinimalPlay className="w-5 h-5" /> : <Book className="w-5 h-5" />}
                    </div>
                  )}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CourseLearnLGSideBar;

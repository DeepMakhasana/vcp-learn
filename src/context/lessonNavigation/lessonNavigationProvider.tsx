import { ReactNode, useMemo, useState } from "react";
import LessonNavigationContext, { Lesson } from "./lessonNavigationContext";

type LearnProviderProps = {
  data: any;
  children: ReactNode;
};

// Provider component
export const LessonNavigationProvider = ({ data, children }: LearnProviderProps) => {
  // const [currentLessonId, setCurrentLessonId] = useState(initialLessonId);

  // Flatten and sort the lessons safely
  const sortedLessons: Lesson[] = useMemo(() => {
    if (!data?.modules) return []; // Return an empty array if `data` or `data.modules` is null/undefined

    const lessons: Lesson[] = data.modules.flatMap(
      (module: any) =>
        module.lessons?.map((lesson: any) => ({
          id: lesson.id,
          title: lesson.title,
          isVideo: lesson.isVideo,
          moduleId: module.id,
          order: lesson.order,
          progresses: lesson.progresses,
          public: lesson.public ? { url: lesson.public.url } : null,
          isPrivateVideo: lesson.video ? true : false,
          tasks: lesson.tasks.length,
        })) ?? [] // Ensure `lessons` is always an array
    );

    // Sort lessons by module order and lesson order
    lessons.sort((a, b) => {
      if (a.moduleId === b.moduleId) {
        return a.order - b.order;
      }

      const moduleA = data.modules.find((mod: any) => mod.id === a.moduleId);
      const moduleB = data.modules.find((mod: any) => mod.id === b.moduleId);

      return (moduleA?.order ?? 0) - (moduleB?.order ?? 0); // Handle potential null values
    });

    return lessons;
  }, [data]);

  console.log("===", sortedLessons);

  // Determine the first lesson without progress
  const initialLesson = useMemo(() => {
    if (!sortedLessons.length) return null;

    // Find the first lesson with an empty progresses array
    return sortedLessons.find((lesson) => !lesson.progresses?.length) ?? null;
  }, [sortedLessons]);

  console.log("--", initialLesson);

  // Set the current lesson ID, prioritizing the first unprogressed lesson
  const [currentLessonId, setCurrentLessonId] = useState(
    initialLesson?.id // Fallback to initialLessonId or null
  );

  // Find current, next, and previous lessons
  const { currentLesson, nextLesson, previousLesson } = useMemo(() => {
    if (!sortedLessons.length) return { currentLesson: null, nextLesson: null, previousLesson: null };

    const currentIndex = sortedLessons.findIndex((lesson) => lesson.id === currentLessonId);
    const current = currentIndex !== -1 ? sortedLessons[currentIndex] : null;
    const next = currentIndex < sortedLessons.length - 1 ? sortedLessons[currentIndex + 1] : null;
    const previous = currentIndex > 0 ? sortedLessons[currentIndex - 1] : null;

    return { currentLesson: current, nextLesson: next, previousLesson: previous };
  }, [currentLessonId, sortedLessons]);

  // Function to update the current lesson
  const setCurrentLesson = (lessonId: number) => setCurrentLessonId(lessonId);

  // Expose navigation state and methods
  const lessonNavigation = { currentLesson, nextLesson, previousLesson, setCurrentLesson };

  return <LessonNavigationContext.Provider value={lessonNavigation}>{children}</LessonNavigationContext.Provider>;
};

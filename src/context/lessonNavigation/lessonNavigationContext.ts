import { createContext } from "react";

type Progresses = {
  id: number;
  purchaseId: number;
  lessonId: number;
  status: boolean;
};

type Public = {
  url: string;
};

export type Lesson = {
  id: number;
  title: string;
  moduleId: number;
  order: number;
  progresses: Progresses[];
  public: Public;
  isVideo: boolean;
  isPrivateVideo: boolean;
  tasks: number;
};

export type LessonNavigationContextType = {
  currentLesson: Lesson | null;
  nextLesson: Lesson | null;
  previousLesson: Lesson | null;
  setCurrentLesson: (lessonId: number) => void;
};

const defaultValves: LessonNavigationContextType = {
  currentLesson: null,
  nextLesson: null,
  previousLesson: null,
  setCurrentLesson: () => {},
};

// auth context
const LessonNavigationContext = createContext<LessonNavigationContextType>(defaultValves);

export default LessonNavigationContext;

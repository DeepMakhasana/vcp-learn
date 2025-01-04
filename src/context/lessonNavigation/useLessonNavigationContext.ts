import { useContext } from "react";
import LessonNavigationContext, { LessonNavigationContextType } from "./lessonNavigationContext";

export const useLessonNavigationContext = (): LessonNavigationContextType => {
  const context = useContext(LessonNavigationContext);
  if (!context) {
    throw new Error("useLessonNavigationContext must be used within a LessonNavigationProvider");
  }
  return context;
};

export default useLessonNavigationContext;

export interface ICourseLearnResponse {
  id: number;
  title: string;
  image: string;
  duration: number;
  modules: Module[];
}

interface Module {
  id: number;
  title: string;
  courseId: number;
  isPublish: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  lessons: Lesson[];
}

interface Lesson {
  id: number;
  title: string;
  moduleId: number;
  isVideo: boolean;
  order: number;
  isPublish: boolean;
  createdAt: string;
  updatedAt: string;
  public: Public | null;
  video: Video | null;
  tasks: Task[];
  progresses: Progress[];
}

interface Public {
  id: number;
  lessonId: number;
  url: string;
  createdAt: string;
  updatedAt: string;
}

interface Video {
  id: number;
  lessonId: number;
  createdAt: string;
  updatedAt: string;
  resourceId: string;
}

interface Task {
  id: number;
  lessonId: number;
  createdAt: string;
  updatedAt: string;
  resourceId: string;
}

interface Progress {
  // Add fields for progress if available; left empty as none are provided in the JSON.
  id?: number;
}

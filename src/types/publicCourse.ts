interface CourseCreator {
  name: string;
  bio: string;
  role: string;
  email: string;
  image: string;
}

interface Lesson {
  id: number;
  title: string;
  moduleId: number;
  isVideo: boolean;
}

interface Module {
  id: number;
  title: string;
  courseId: number;
  createdAt: string; // ISO 8601 date
  isPublish: boolean;
  lessons: Lesson[];
}

export interface FullCourseDetail {
  id: number;
  slug: string;
  title: string;
  duration: number;
  description: string;
  price: number | string;
  image: string;
  highlights: string; // HTML content
  outcomes: string; // HTML content
  prerequisites: string; // HTML content
  createdAt: string; // ISO 8601 date
  updatedAt: string; // ISO 8601 date
  creatorId: number;
  status: boolean;
  creator: CourseCreator;
  modules: Module[];
}

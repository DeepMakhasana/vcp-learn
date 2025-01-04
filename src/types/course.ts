export type CourseType = {
  id: number;
  slug: string;
  title: string;
  duration: number;
  description: string;
  image: string;
  creator: {
    name: string;
  };
};

export interface ICourseDetails {
  highlights: string;
  learningOutcomes: string;
  prerequisites: string;
}

// export interface ICoursePage extends ICourse, ICourseDetails {}

export type LessonType = {
  id?: number;
  title: string;
  duration: number;
  video_url?: string;
  moduleId?: number;
};

export interface ICourseContent {
  id: number;
  title: string;
  lessons: LessonType[];
}

export interface ICourseReview {
  id: number;
  image: string;
  name: string;
  time: string;
  rating: number;
  review: string;
}

export type StudentType = {
  id: number;
  name: string;
  email: string;
  number: string;
  purchaseCount: number;
};

export interface ICourse {
  id: string;
  image: string;
  title: string;
  description: string;
  author: string;
  price: number;
}

export type ModuleType = {
  id: number;
  courseId: number;
  title: string;
  lessonsCount: number;
};

export interface ICourseFullDetail {
  title: string;
  description: string;
  price: number;
  image: string;
  slug: string;
  duration: number;
  highlights: string;
  outcomes: string;
  prerequisites: string;
  status: boolean;
}

export type CourseCheckoutType = {
  id: number;
  title: string;
  price: number;
  image: string;
  duration: number;
};

export interface ICourseFullDetails extends ICourseFullDetail {
  id: number;
  creatorId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICourseFullDetailResponse {
  message: string;
  course: ICourseFullDetails;
}

export interface IS3PutObjectResponse {
  url: string;
}

export interface IS3PutObjectPayload {
  fileName: string;
  fileType: string;
  bucket: string;
}

export interface IImageUploadPayload {
  url: string;
  payload: {
    file: File;
    fileType: string;
  };
}

export interface IPurchaseCoursePayload {
  courseId: number;
  userId: number;
  price: number;
  duration: number;
  endAt?: Date;
}

export interface IPurchaseCourseResponse extends IPurchaseCoursePayload {
  id: number;
  createdAt: Date;
}

export interface IPurchaseCoursesResponse extends IPurchaseCourseResponse {
  course: {
    id: number;
    slug: string;
    title: string;
    image: string;
    duration: number;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface ICreateLessonProgressPayload {
  purchaseId: number;
  lessonId: number;
}

export interface ICreateLessonProgressResponse {
  id: number;
  purchaseId: number;
  lessonId: number;
  status: boolean;
}

export interface IPrivateResourcePayload {
  purchaseId: number;
  lessonId: number;
}

export interface IPrivateVideoResponse {
  url: string;
}

export interface IPrivateTaskResponse {
  fileName: string;
  url: string;
}

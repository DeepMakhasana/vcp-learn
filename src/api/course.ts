import axiosInstance from "@/lib/axiosInstance";
import { endpoints } from ".";
import {
  CourseCheckoutType,
  ICertificatePayload,
  ICertificateResponse,
  ICourseFullDetail,
  ICourseFullDetailResponse,
  ICreateLessonProgressPayload,
  ICreateLessonProgressResponse,
  IPrivateResourcePayload,
  IPrivateTaskResponse,
  IPrivateVideoResponse,
  IPurchaseCoursePayload,
  IPurchaseCourseResponse,
  IPurchaseCoursesResponse,
} from "@/types/course";
import { ICourseLearnResponse } from "@/types/learn";

export async function createCourse(payload: ICourseFullDetail): Promise<ICourseFullDetailResponse> {
  const { data } = await axiosInstance.post(endpoints.course.create, payload);
  return data;
}

export async function getCourseBySlug(slug: string): Promise<CourseCheckoutType> {
  const { data } = await axiosInstance.get(`${endpoints.course.create}/slug/${slug}`);
  return data;
}

export async function purchaseCourse(payload: IPurchaseCoursePayload): Promise<IPurchaseCourseResponse> {
  const { data } = await axiosInstance.post(endpoints.purchase.main, payload);
  return data;
}

export async function getPurchaseCourses(): Promise<IPurchaseCoursesResponse[]> {
  const { data } = await axiosInstance.get(`${endpoints.purchase.main}`);
  return data;
}

export async function getPurchasedLearnCourse(payload: {
  slag: string;
  purchaseId: number;
}): Promise<ICourseLearnResponse> {
  const { data } = await axiosInstance.get(`${endpoints.learn.main}/${payload.slag}/${payload.purchaseId}`);
  return data;
}

export async function createLessonProgress(
  payload: ICreateLessonProgressPayload
): Promise<ICreateLessonProgressResponse> {
  const { data } = await axiosInstance.post(endpoints.progress.main, payload);
  return data;
}

export async function getPrivateVideoUrl(payload: IPrivateResourcePayload): Promise<IPrivateVideoResponse> {
  const { data } = await axiosInstance.get(`${endpoints.learn.video}/${payload.purchaseId}/${payload.lessonId}`);
  return data;
}

export async function getPrivateTaskUrl(payload: IPrivateResourcePayload): Promise<IPrivateTaskResponse[]> {
  const { data } = await axiosInstance.get(`${endpoints.learn.task}/${payload.purchaseId}/${payload.lessonId}`);
  return data;
}

export async function getLearningProgress(payload: {
  purchaseId: number;
  courseId: number;
}): Promise<{ progressPercentage: number }> {
  const { data } = await axiosInstance.get(`${endpoints.learn.process}/${payload.purchaseId}/${payload.courseId}`);
  return data;
}

export async function sendCourseCertificate(payload: ICertificatePayload): Promise<ICertificateResponse> {
  const { data } = await axiosInstance.post(endpoints.course.certificate, payload);
  return data;
}

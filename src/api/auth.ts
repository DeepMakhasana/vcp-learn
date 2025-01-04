import axiosInstance from "@/lib/axiosInstance";
import { endpoints } from ".";
import {
  loginPayload,
  loginResponse,
  registerPayload,
  registerResponse,
  resetPayload,
  resetResponse,
  sendVerifyEmailPayload,
  sendVerifyEmailResponse,
  userLoginPayload,
  userRegisterPayload,
  userRegisterResponse,
  verifyEmailResponse,
} from "@/types/auth";

export async function sendVerifyOtpEmail(payload: { email: string }): Promise<sendVerifyEmailResponse> {
  const { data } = await axiosInstance.post(endpoints.auth.sendVerifyOtpEmail, payload);
  return data;
}

export async function sendForgotPasswordVerifyOtpEmail(payload: { email: string }): Promise<sendVerifyEmailResponse> {
  const { data } = await axiosInstance.post(endpoints.auth.forgotPasswordVerifyEmailSend, payload);
  return data;
}

export async function verifyEmailOtp(payload: { email: string; otp: string }): Promise<verifyEmailResponse> {
  const { data } = await axiosInstance.post(endpoints.auth.verifyEmailOtp, payload);
  return data;
}

export async function verifyRegisterOtp(payload: { email: string; otp: string }): Promise<verifyEmailResponse> {
  const { data } = await axiosInstance.post(endpoints.auth.verifyRegisterOtp, payload);
  return data;
}

export async function creatorRegister(payload: registerPayload): Promise<registerResponse> {
  const { data } = await axiosInstance.post(endpoints.auth.register, payload);
  return data;
}

export async function creatorLogin(payload: loginPayload): Promise<loginResponse> {
  const { data } = await axiosInstance.post(endpoints.auth.login, payload);
  return data;
}

export async function creatorPasswordReset(payload: resetPayload): Promise<resetResponse> {
  const { data } = await axiosInstance.post(endpoints.auth.resetPassword, payload);
  return data;
}

// Function to make the POST request for sendVerifyEmail
export const sendVerifyEmail = async (payload: sendVerifyEmailPayload): Promise<sendVerifyEmailResponse> => {
  const { data } = await axiosInstance.post("/auth/user/send-verify-email", payload);
  return data;
};

// Function to make the POST request for user register
export const userRegister = async (payload: userRegisterPayload): Promise<userRegisterResponse> => {
  const { data } = await axiosInstance.post("/auth/user/register", payload);
  return data;
};

// Function to make the POST request for user register
export const userLogin = async (payload: userLoginPayload): Promise<userRegisterResponse> => {
  const { data } = await axiosInstance.post("/auth/user/login", payload);
  return data;
};

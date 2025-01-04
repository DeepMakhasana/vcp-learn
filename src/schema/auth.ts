import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const userRegisterSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name require minimum 2 characters")
    .max(30, "First Name cannot exceed 30 characters"),
  lastName: z
    .string()
    .min(2, "Last name require minimum 2 characters")
    .max(30, "Last Name cannot exceed 30 characters"),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be 255 characters or less" }),
  mobile: z
    .string()
    .length(10, { message: "Mobile number must be exactly 10 digits" })
    .regex(/^\d+$/, { message: "Mobile number must contain only digits" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100, { message: "Password must be less than 100 characters" }),
});

export const userLoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be 255 characters or less" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100, { message: "Password must be less than 100 characters" }),
});

export const creatorRegisterSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name require minimum 2 characters")
    .max(70, "First Name cannot exceed 70 characters"),
  lastName: z
    .string()
    .min(2, "Last name require minimum 2 characters")
    .max(70, "Last Name cannot exceed 70 characters"),
  email: z.string().email("Invalid email address").max(255, "Email cannot exceed 255 characters"),
  number: z.string().length(10, "Mobile number must be 10 digits"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password cannot exceed 20 characters"),
  domain: z.string().min(4, "Domain name require minimum 2 characters").max(255, "Domain cannot exceed 255 characters"),
  bio: z.string().min(20, "bio require minimum 20 characters"),
  role: z.string().min(4, "Role require minimum 4 characters").max(70, "Role cannot exceed 70 characters"),
});

export const emailOtpValidationSchema = z.object({
  otp: z.string().min(6, "Your one-time password must be 6 characters."),
});

export const forgotPasswordValidationSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetPasswordValidationSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password cannot exceed 20 characters"),
  repeatPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password cannot exceed 20 characters"),
});

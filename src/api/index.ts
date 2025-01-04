export const endpoints = {
  auth: {
    sendVerifyOtpEmail: "/auth/creator/send-verify-email",
    verifyEmailOtp: "/auth/verify-email-otp",
    verifyRegisterOtp: "/auth/verify-register-otp",
    register: "/auth/creator/register",
    login: "/auth/creator/login",
    forgotPasswordVerifyEmailSend: "/auth/creator/forgot-password/send-verify-email",
    resetPassword: "/auth/creator/reset-password",
  },
  course: {
    create: "/course",
  },
  learn: {
    main: "/learn",
    video: "/learn/video",
    task: "/learn/task",
    process: "/learn/progress",
  },
  purchase: {
    main: "/purchase",
  },
  progress: {
    main: "/progress",
  },
  s3: {
    putObject: "/s3/putObject",
    getObject: "/s3/getObject",
  },
};

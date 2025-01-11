export const constants = {
  TOKEN: "auth_token",
};

export const allowPath = ["/", "/register", "/forgot-password"];

export const afterLoginAllowedPath = ["/checkout"];

export const courseImageBaseUrl = "https://vpc-public.s3.ap-south-1.amazonaws.com/course/cover-image/";

export const clientEndpoints = {
  auth: {
    register: "/register",
    login: "/",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
  },
  course: {
    main: "/dashboard",
  },
};

export const CLIENT_ID = 5;
// export const MAIN_COURSES_PAGE = "vcp-client.vercel.app";
export const MAIN_COURSES_PAGE = "https://paramcadcenter.com/learn";

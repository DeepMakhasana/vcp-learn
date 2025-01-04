import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Layout from "./Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import Checkout from "./pages/Checkout";
import LearnCourse from "./pages/dashboard/learn/LearnCourse";

// Creating the router with route configurations
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Login /> },
      { path: "checkout/:slug", element: <Checkout /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      // Catch-all for unknown routes under this section
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/dashboard",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "learn/:slug/:purchaseId", element: <LearnCourse /> },
      // { path: "courses", element: <Courses /> },
      // { path: "courses/:courseId/modules/:moduleId/lessons", element: <CourseLessons /> },
      // { path: "courses/:courseId/modules/:moduleId/lessons/:lessonId", element: <Lesson /> },
      // { path: "students", element: <Students /> },
      // { path: "purchases", element: <Purchase /> },
      // Catch-all for unknown routes under dashboard section
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;

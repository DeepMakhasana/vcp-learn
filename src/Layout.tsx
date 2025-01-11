import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import useAuthContext from "./context/auth/useAuthContext";
import routeProtection from "./components/HOC/routeProtection";
import ProfileMenu from "./components/core/ProfileMenu";
import DashboardLGSideBar from "./components/core/DashboardLGSideBar";
import { ChevronLeft, Loader2, Package2 } from "lucide-react";
import DashboardSMSideBar from "./components/core/DashboardSMSideBar";
import CourseLearnLGSideBar from "./components/core/course-learn/CourseLearnLGSideBar";
import CourseLearnSMSideBar from "./components/core/course-learn/CourseLearnSMSideBar";
import { getPurchasedLearnCourse } from "./api/course";
import { ICourseLearnResponse } from "./types/learn";
import { useQuery } from "@tanstack/react-query";
import NotFound from "./pages/NotFound";
import { LessonNavigationProvider } from "./context/lessonNavigation/lessonNavigationProvider";
import { Button } from "./components/ui/button";
import { MAIN_COURSES_PAGE } from "./lib/constants";

const Layout = () => {
  const { logout, isAuthenticated, user } = useAuthContext();
  const path = useLocation();
  const { slug, purchaseId } = useParams();
  const navigate = useNavigate();

  const {
    data: course,
    isLoading: dataLoafing,
    isError,
    error,
  } = useQuery<ICourseLearnResponse, Error>({
    queryKey: ["learn", { slug }],
    queryFn: () => getPurchasedLearnCourse({ slag: String(slug), purchaseId: Number(purchaseId) }),
    enabled: !!slug && isAuthenticated && path.pathname.includes("/learn/") && !!purchaseId,
  });

  function checkPath(optionPath: string) {
    return path.pathname === optionPath;
  }

  if (dataLoafing) {
    return (
      <div className="flex justify-center my-4">
        <Loader2 className="animate-spin w-6 h-6" />
      </div>
    );
  }

  if (isError) {
    console.log({ error });
    return <p>Error: {error.message}</p>;
  }

  if (!course && path.pathname.includes("/learn/")) {
    return <NotFound />;
  }

  console.log("learn course", course);

  return (
    <LessonNavigationProvider data={course}>
      <div
        className={`grid min-h-screen w-full ${
          path.pathname.includes("/learn/") ? "lg:grid-cols-[400px_1fr]" : "lg:grid-cols-[250px_1fr]"
        }`}
      >
        <div className="hidden border-r bg-muted/40 lg:block">
          <div className="flex h-full max-h-screen flex-col gap-2 lg:sticky lg:top-0">
            <div className="flex min-h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <a href={MAIN_COURSES_PAGE} className="flex items-center gap-2 font-semibold">
                <Package2 className="h-6 w-6" />
                <span className="font-sans font-medium">Param CAD Center</span>
              </a>
            </div>
            {path.pathname.includes("/learn/") && course ? (
              <CourseLearnLGSideBar course={course} />
            ) : (
              <DashboardLGSideBar checkPath={checkPath} />
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex min-h-14 justify-between items-center z-10 gap-2 sm:gap-4 border-b bg-muted/40 px-4 lg:sticky lg:top-0 lg:h-[60px] lg:px-6">
            {path.pathname.includes("/learn/") && course ? (
              <CourseLearnSMSideBar course={course} />
            ) : (
              <DashboardSMSideBar checkPath={checkPath} />
            )}
            {path.pathname.includes("/learn/") && (
              <div className="flex gap-2 items-center">
                <Button variant={"outline"} size={"icon"} className="min-w-8" onClick={() => navigate(-1)}>
                  <ChevronLeft />
                </Button>
                <p className="line-clamp-1 font-medium">{course?.title}</p>
              </div>
            )}

            {/* Right side profile menu */}
            <ProfileMenu user={user} logout={logout} />
          </header>
          <Outlet />
        </div>
      </div>
    </LessonNavigationProvider>
  );
};

export default routeProtection(Layout);

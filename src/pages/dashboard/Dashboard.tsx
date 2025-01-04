import PurchaseCourses from "@/components/core/course-learn/PurchaseCourses";
import { Button } from "@/components/ui/button";
import { MAIN_COURSES_PAGE } from "@/lib/constants";

const Dashboard = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between items-center my-4">
        <div>
          <h1 className="text-2xl font-medium">Courses</h1>
          <p className="text-sm hidden text-muted-foreground sm:block">View and manage courses</p>
        </div>
        <div>
          <a href={MAIN_COURSES_PAGE}>
            <Button>explore</Button>
          </a>
        </div>
      </div>
      <PurchaseCourses />
    </main>
  );
};

export default Dashboard;

import { MAIN_COURSES_PAGE } from "@/lib/constants";
import { Home, Package } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardLGSideBar = ({ checkPath }: { checkPath: (path: string) => boolean }) => {
  return (
    <div>
      <div className="flex-1">
        <nav className="grid gap-1 items-start px-2 text-sm font-medium lg:px-4 mt-2">
          <Link
            to="/dashboard"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
              checkPath("/dashboard") ? "bg-muted text-primary" : "text-muted-foreground"
            }`}
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <a
            href={MAIN_COURSES_PAGE}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
              checkPath("/") ? "bg-muted text-primary" : "text-muted-foreground"
            }`}
          >
            <Package className="h-4 w-4" />
            Explore
          </a>
        </nav>
      </div>
      {/* <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 lg:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 lg:p-4 lg:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div> */}
    </div>
  );
};

export default DashboardLGSideBar;

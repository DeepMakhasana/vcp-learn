import { Link } from "react-router-dom";

import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Home, Menu, Package, Package2 } from "lucide-react";
import { Button } from "../ui/button";
import { MAIN_COURSES_PAGE } from "@/lib/constants";

const DashboardSMSideBar = ({ checkPath }: { checkPath: (path: string) => boolean }) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <SheetClose asChild>
              <Link to="/dashboard" className="flex items-center gap-2 text-lg font-semibold">
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Logo.</span>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                to="/dashboard"
                className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground mt-4 ${
                  checkPath("/dashboard") ? "bg-muted text-foreground" : "text-muted-foreground"
                }`}
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <a
                href={MAIN_COURSES_PAGE}
                className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                  checkPath("/dashboard/purchases") ? "bg-muted text-foreground" : "text-muted-foreground"
                }`}
              >
                <Package className="h-5 w-5" />
                Explore
              </a>
            </SheetClose>
          </nav>
          {/* <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div> */}
        </SheetContent>
      </Sheet>
      {/* <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search Courses..."
                  className="w-full appearance-none bg-background pl-8 shadow-none lg:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div> */}
    </div>
  );
};

export default DashboardSMSideBar;

import { CircleUser, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { User } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { userLogout } from "@/api/auth";
import { toast } from "@/hooks/use-toast";

interface IProfileMenuProps {
  logout: () => void;
  user: User | null;
}

const ProfileMenu = ({ logout, user }: IProfileMenuProps) => {
  // mutation for logout
  const { mutate, isPending } = useMutation<{ message: string }, Error>({
    mutationFn: userLogout,
    onSuccess: (data) => {
      toast({
        title: "Success:",
        description: data.message,
      });
      logout();
    },
    onError: (error: any) => {
      console.log("error", error);
      toast({
        title: "warning:",
        description: error?.response.data.message || error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Welcome, {user?.name}!</DropdownMenuItem>
          {/* <DropdownMenuItem>Support</DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => mutate()} className="flex gap-2 items-center">
            {isPending && <Loader2 className="animate-spin" />} Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileMenu;

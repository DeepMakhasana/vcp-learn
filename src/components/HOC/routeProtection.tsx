import useAuthContext from "@/context/auth/useAuthContext";
import { Loader2 } from "lucide-react";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

const routeProtection = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  navigateToRegister?: boolean
): React.FC<P> => {
  const ProtectedComponent = (props: P) => {
    const navigate = useNavigate();
    const { isAuthenticated, isLoading } = useAuthContext(); // Replace with your auth logic
    console.log("protect route: ", isAuthenticated);

    useLayoutEffect(() => {
      if (!isLoading && !isAuthenticated) {
        navigate(navigateToRegister ? "/register" : "/");
      }
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading) {
      return (
        <div className="flex justify-center my-4">
          <Loader2 className="animate-spin w-6 h-6" />
        </div>
      ); // Show a spinner or skeleton while checking authentication
    }

    if (!isAuthenticated) {
      return null; // Render nothing or a loading spinner while redirecting
    }

    return <WrappedComponent {...props} />;
  };

  return ProtectedComponent;
};

export default routeProtection;

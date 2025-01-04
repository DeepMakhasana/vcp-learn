import { Outlet } from "react-router-dom";
import publicRoute from "./components/HOC/publicRoute";

const RootLayout = () => {
  return <Outlet />;
};

export default publicRoute(RootLayout);

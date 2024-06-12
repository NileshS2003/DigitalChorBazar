import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../app/store";

function PrivateRoute() {
  const user= useSelector((state:RootState) => state.auth.loggedInUser);
  return user ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default PrivateRoute;

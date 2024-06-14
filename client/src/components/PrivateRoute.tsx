import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState, useAppDispatch } from "../app/store";
import { useEffect } from "react";
import { fetchUserAsync } from "../features/Auth/authSlice";

function PrivateRoute() {
  const user = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserAsync());
  }, [dispatch]);
  return user.loggedInUser ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default PrivateRoute;
 
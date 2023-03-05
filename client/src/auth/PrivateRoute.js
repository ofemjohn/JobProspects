import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AccessDenied from "../componets/AccessDenied";
import { useAuth } from "./AuthProvider";

const PrivateRoute = ({ roles, ...rest }) => {
  const { isAuthenticated, user } = useAuth();

  // useEffect(() => {
  //   console.log(roles, userHasRequiredRole);
  // }, []);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  const parsedUser = typeof user === "string" ? JSON.parse(user) : user;

  const userHasRequiredRole =
    user && roles.includes(parsedUser.userType) ? true : false;

  if (isAuthenticated && !userHasRequiredRole) {
    return <AccessDenied />;
  }

  return <Outlet {...rest} />;
};

export default PrivateRoute;

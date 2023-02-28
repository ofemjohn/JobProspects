import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateRoute = () => {
  const { state } = useAuth();
  return state.user !== null ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;

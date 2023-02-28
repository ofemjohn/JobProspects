import { Button } from "@mui/material";
import React from "react";
import { useAuth } from "../auth/AuthProvider";

const Logout = () => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <Button variant="contained" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;

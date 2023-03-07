import { Button } from "@mui/material";
import React from "react";
import { useAuth } from "../auth/AuthProvider";
import { Logout } from "@mui/icons-material";

const LogoutUser = () => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <Button sx={{ color: "#008080", fontSize: "18px" }} onClick={handleLogout}>
      <Logout />
      LOGOUT
    </Button>
  );
};

export default LogoutUser;

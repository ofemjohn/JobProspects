import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import {
  Menu as MenuIcon,
  NotificationsNone,
  MailOutline,
  Person,
} from "@mui/icons-material";
import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import "./header.css";
import { useAuth } from "../../auth/AuthProvider";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Grid } from "@mui/material";

const Header = ({ setOpen, setType, name }) => {
  const { isAuthenticated, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <div className="header-container">
        {/* LOGO */}
        <div className="logo">JOB PROSPECTS</div>
        {/* NAVBAR */}
        {isMobile ? (
          <div className="mobile-nav-container">
            <IconButton onClick={handleClick}>
              <MenuIcon sx={{ color: "#fff" }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ "aria-labelledby": "basic-button" }}
            >
              <Navbar setOpen={setOpen} setType={setType} />
            </Menu>
          </div>
        ) : (
          <Navbar setOpen={setOpen} setType={setType} />
        )}
      </div>
    </>
  );
};

export default Header;

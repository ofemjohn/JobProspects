import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import { NotificationsNone, MailOutline, Person } from "@mui/icons-material";

import "./header.css";
import { useAuth } from "../../auth/AuthProvider";

const Header = ({ setOpen, setType, name, id }) => {
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return id !== "app" ? (
    <header className="header">
      <h1>{name}</h1>
      <div className="header-icons">
        <IconButton className="icon-btn">
          <NotificationsNone sx={{ color: "#fff" }} />
        </IconButton>
        <IconButton className="icon-btn">
          <MailOutline sx={{ color: "#fff" }} />
        </IconButton>
        <IconButton
          className="icon-btn"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <Person sx={{ color: "#fff" }} />
        </IconButton>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={async () => await logout()}>Logout</MenuItem>
        </Menu>
      </div>
    </header>
  ) : (
    <div className="header-container">
      {/* LOGO */}
      <div className="logo">JOB PROSPECTS</div>
      {/* NAVBAR */}
      <Navbar setOpen={setOpen} setType={setType} />
    </div>
  );
};

export default Header;

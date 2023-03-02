import { Avatar, IconButton, Typography } from "@mui/material";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./sidebar.css";
import { Logout, TravelExplore } from "@mui/icons-material";

const SideBar = ({ links }) => {
  return (
    <div className="sidebar-container">
      {/* Navigation Links */}
      <div className="sidebar-links">
        <div className="sidebar-title">
          <TravelExplore fontSize="large" />
          JOB PROSPECTS
        </div>
        {links.map((link, i) => (
          <div className="sidebar-links-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
              }
              to={link.to}
            >
              {link.icon}
              {link.name}
            </NavLink>
          </div>
        ))}
      </div>
      <div className="sidebar-logout">
        <div className="sidebar-links-item logout-icon">
          <Logout />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

import React from "react";
import "./styles.css";
import { Paper } from "@mui/material";
import { NavLink } from "react-router-dom";
import BasicInformation from "../../componets/BasicInformation";

const links = [
  {
    name: "Basic Information",
    component: "mycomponent",
  },
  {
    name: "Educational Qualifications",
    component: "mycomponent",
  },
  {
    name: "Employment History",
    component: "mycomponent",
  },
];

const UserProfile = () => {
  return (
    <div className="profile-container">
      <div>MY PROFILE</div>
      <div className="profile-wrapper">
        {/* PROF */}

        <Paper className="profile-tabs" elevation={3}>
          {links.map((link, i) => (
            <span className="profile-links">{link.name}</span>
          ))}
        </Paper>

        {/* BASIC INFORMATION */}
        <Paper className="profile-content" elevation={3}>
          <BasicInformation />
        </Paper>
      </div>
    </div>
  );
};

export default UserProfile;

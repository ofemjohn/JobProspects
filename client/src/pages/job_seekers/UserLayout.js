import {
  Home,
  Person,
  Description,
  HomeRepairService,
  WorkHistory,
  Forum,
} from "@mui/icons-material";
import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../componets/sidebar/SideBar";

const sideBarLinks = [
  {
    name: "Dashboard",
    to: "/userdashboard",
    icon: <Home fontSize="large" />,
  },
  {
    name: "Profile",
    to: "/userprofile",
    icon: <Person fontSize="large" />,
  },
  {
    name: "Resume",
    to: "/resume",
    icon: <Description fontSize="large" />,
  },
  {
    name: "Applied Jobs",
    to: "/appliedjobs",
    icon: <HomeRepairService fontSize="large" />,
  },
  {
    name: "Unfinished Jobs",
    to: "/unfinishedjobs",
    icon: <WorkHistory fontSize="large" />,
  },
  {
    name: "Messages",
    to: "/messages",
    icon: <Forum fontSize="large" />,
  },
];

const UserLayout = () => {
  return (
    <div className="layout">
      {/* <Header id="user" name="JOB SEEKER DASHBOARD" /> */}
      <div className="main">
        <aside className="sidebar">
          <SideBar links={sideBarLinks} />
        </aside>
        <main className="content">
          <Outlet />
        </main>
      </div>
      <footer className="footer">Footer content</footer>
    </div>
  );
};

export default UserLayout;

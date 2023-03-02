import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../componets/header/Header";

const UserLayout = () => {
  return (
    <div className="layout">
      <Header id="user" name="JOB SEEKER DASHBOARD" />
      <div className="main">
        <aside className="sidebar">Sidebar content</aside>
        <main className="content">
          <Outlet />
        </main>
      </div>
      <footer className="footer">Footer content</footer>
    </div>
  );
};

export default UserLayout;

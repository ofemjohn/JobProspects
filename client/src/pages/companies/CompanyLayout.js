import { Box, Typography } from "@mui/material";
import React from "react";
import "./styles.css";
import { Link, Outlet } from "react-router-dom";
import Header from "../../componets/header/Header";

const CompanyLayout = () => {
  return (
    <div className="layout">
      <Header id="company" name="COMPANY DASHBOARD" />
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

export default CompanyLayout;

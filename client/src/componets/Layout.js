import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";

const Layout = ({ setOpen, setType }) => {
  return (
    <div className="layout">
      <Header
        setOpen={setOpen}
        setType={setType}
        id="app"
        name="JOB PROSPECTIVES"
      />
      <main className="main-layout">
        <Outlet />
      </main>

      <footer className="footer">Footer content</footer>
    </div>
  );
};

export default Layout;

import React from "react";
import Navbar from "../navbar/Navbar";
import "./header.css";

const Header = ({ setOpen, setType }) => {
  return (
    <div className="header-container">
      {/* LOGO */}
      <div className="logo">JOB PROSPECTS</div>
      {/* NAVBAR */}
      <Navbar setOpen={setOpen} setType={setType} />
    </div>
  );
};

export default Header;

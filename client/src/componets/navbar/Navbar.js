import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModalCustom from "../ModalCustom";
import "./navbar.css";

const Navbar = ({ setOpen, setType }) => {
  const handleOpenLogin = () => {
    setOpen(true);
    setType("login");
  };
  const handleOpenSignUp = () => {
    setOpen(true);
    setType("signup");
  };
  return (
    <>
      <div className="navbar">
        <ul>
          <li>
            <Link className="navbar-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="navbar-link" to="/services">
              Services
            </Link>
          </li>
          <li>
            <Button onClick={handleOpenLogin} variant="outlined">
              Hire
            </Button>
          </li>
          <li>
            <Button onClick={handleOpenSignUp} variant="outlined">
              Looking for a Job?
            </Button>
          </li>
        </ul>
      </div>
      {/* <ModalCustom show={show} setShow={setShow} /> */}
    </>
  );
};

export default Navbar;

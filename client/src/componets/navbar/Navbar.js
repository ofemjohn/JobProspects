import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
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
          <Button variant="outlined">Sign In</Button>
        </li>
        <li>
          <Button variant="outlined">Sign Up</Button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

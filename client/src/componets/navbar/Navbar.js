import { Button } from "@mui/material";
import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import "./navbar.css";

const Navbar = ({ setOpen, setType }) => {
  const navigate = useNavigate();
  const { state } = useAuth();
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
          {state.user !== null ? (
            <li>
              <Button onClick={() => navigate("/user")} variant="outlined">
                Go To profile
              </Button>
            </li>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </div>
      {/* <ModalCustom show={show} setShow={setShow} /> */}
    </>
  );
};

export default Navbar;

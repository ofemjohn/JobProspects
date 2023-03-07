import { Button } from "@mui/material";
import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import LogoutUser from "../Logout";
import "./navbar.css";

const Navbar = ({ setOpen, setType }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
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
          {isAuthenticated ? (
            <>
              <li>
                <Button
                  onClick={() =>
                    user.userType === "company"
                      ? navigate("/company")
                      : navigate("/userprofile")
                  }
                  variant="outlined"
                >
                  Go To profile
                </Button>
              </li>
              <li>
                <LogoutUser />
              </li>
            </>
          ) : (
            <>
              <li>
                <Button variant="outlined">
                  <Link
                    style={{ textDecoration: "none", color: "#008080" }}
                    to="/register_company"
                  >
                    Hire
                  </Link>
                </Button>
              </li>
              <li>
                {/* <Button onClick={handleOpenSignUp} variant="outlined">
                  Looking for a Job?
                </Button> */}
                <Button variant="outlined">
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "#008080",
                    }}
                    to="/jobsearch"
                  >
                    Looking for a Job?
                  </Link>
                </Button>
              </li>
              <li>
                <Button onClick={handleOpenLogin} variant="contained">
                  Login
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

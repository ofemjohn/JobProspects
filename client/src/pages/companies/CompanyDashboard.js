import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

const CompanyDashboard = () => {
  return (
    <>
      <Box>
        COMPANIES DASHBOARD
        {/* SIDEBAR */}
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              width: "15%",
              position: "fixed",
              left: 0,
              top: "100px",
              bottom: 0,
              backgroundColor: "#f2f2f2",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box sx={{ width: "200px" }} my={2}>
                <img
                  style={{ borderRadius: "100%" }}
                  src="https://miro.medium.com/max/2400/1*E1LonYGC5Fx4QLY4W5SaVA.jpeg"
                  alt=""
                  width="100%"
                />
              </Box>
              <Typography variant="h5">ALX AFRICA</Typography>
            </Box>
            {/* SIDEBAR NAVBAR */}
            <ul
              style={{
                display: "flex",
                listStyle: "none",
                flexDirection: "column",
                gap: "30px",
              }}
              className="sidebar-nav"
            >
              <li>
                <Link to="/c_jobs" className="sidebar-link">
                  Jobs
                </Link>
              </li>
              <li>
                <Link to="" className="sidebar-link">
                  Applications
                </Link>
              </li>
            </ul>
          </Box>
          {/* MAIN BODY */}
          <Box
            sx={{
              top: 30,
              flex: 1,
              minHeight: "200vh",
              marginLeft:
                "15%" /* make sure to leave space for the fixed left section */,
              overflow: "auto",
            }}
          >
            THIS IS THE CONTAINER
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CompanyDashboard;

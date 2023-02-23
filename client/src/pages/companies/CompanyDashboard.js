import { Box } from "@mui/system";
import React from "react";

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
            THIS IS THE SIDEBAR
          </Box>
          {/* MAIN BODY */}
          <Box
            sx={{
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

import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import {
  Edit,
  FactCheck,
  Group,
  PictureAsPdf,
  PostAdd,
} from "@mui/icons-material";

const CompanyDashboard = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "40px",
          marginBottom: "40px",
        }}
      >
        <Link style={{ textDecoration: "none" }} to="/jobs/post">
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "250px",
              width: "250px",
              cursor: "pointer",
            }}
            elevation={5}
          >
            <PostAdd sx={{ fontSize: "100px", color: "#008080" }} />
            <Typography sx={{ fontSize: "22px", color: "#008080" }}>
              Create New Job
            </Typography>
          </Paper>
        </Link>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "250px",
            width: "250px",
            cursor: "pointer",
          }}
          elevation={5}
        >
          <FactCheck sx={{ fontSize: "100px", color: "#008080" }} />
          <Typography
            variant="subtitle1"
            sx={{ fontSize: "22px", color: "#008080" }}
          >
            View My Jobs
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "#9fa0a4", fontSize: "18px" }}
          >
            0 Active
          </Typography>
        </Paper>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "250px",
            width: "250px",
            cursor: "pointer",
          }}
          elevation={5}
        >
          <Group sx={{ fontSize: "100px", color: "#008080" }} />
          <Typography
            variant="subtitle1"
            sx={{ fontSize: "22px", color: "#008080" }}
          >
            View My Candidates
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "#9fa0a4", fontSize: "18px" }}
          >
            90 total
          </Typography>
        </Paper>
      </Box>
      {/* ROW 2 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "40px",
          marginBottom: "40px",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "250px",
            width: "250px",
            cursor: "pointer",
          }}
          elevation={5}
        >
          <PictureAsPdf sx={{ fontSize: "100px", color: "#008080" }} />
          <Typography
            sx={{ fontSize: "22px", color: "#008080", textAlign: "center" }}
          >
            Search the Resume Database
          </Typography>
        </Paper>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "250px",
            width: "250px",
            cursor: "pointer",
          }}
          elevation={5}
        >
          <Edit sx={{ fontSize: "100px", color: "#008080" }} />
          <Typography
            variant="subtitle1"
            sx={{ fontSize: "22px", color: "#008080", textAlign: "center" }}
          >
            Add/Edit Company Details
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "#9fa0a4", fontSize: "18px" }}
          >
            0 Active
          </Typography>
        </Paper>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "250px",
            width: "250px",
            cursor: "pointer",
          }}
          elevation={5}
        >
          <Group sx={{ fontSize: "100px", color: "#008080" }} />
          <Typography
            variant="subtitle1"
            sx={{ fontSize: "22px", color: "#008080" }}
          >
            Job Match
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "#9fa0a4", fontSize: "18px" }}
          >
            90 total
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default CompanyDashboard;

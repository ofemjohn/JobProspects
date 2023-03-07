import { Button, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = ({ setOpen, setType }) => {
  return (
    <>
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          padding: "20px",
        }}
      >
        {/* INTRO */}
        <Box
          sx={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
            justifyContent: "center",
            padding: "20px 60px 20px 60px",
          }}
        >
          <Typography variant="h3" sx={{ fontSize: "50px", color: "#008080" }}>
            Join our Network: Register Your Company Today
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontSize: "20px", textAlign: "justify" }}
          >
            Welcome to our platform! We're excited to offer a resource for
            companies looking to hire top talent. Our platform is designed to
            make the hiring process easier, faster, and more efficient than ever
            before. Whether you're a small business or a large corporation,
            we're here to help you find the right candidates for your open
            positions. With our user-friendly platform and a wide range of tools
            and resources, we make it easy to post jobs, manage applications,
            and connect with potential candidates. So why wait? Sign up today
            and start hiring the best talent for your business!
          </Typography>
        </Box>
        {/* REGISTRATION FORM */}
        <Paper
          sx={{ width: "60%", marginTop: "20px", padding: "20px" }}
          elevation={3}
        >
          <Typography
            sx={{
              display: "flex",
              fontSize: "24px",
              color: "#008080",
            }}
          >
            CREATE AN ACCOUNT AND START ADVERTISING
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "30px 20px",
              gap: "40px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                paddin: "20px",
                gap: "50px",
              }}
            >
              <TextField
                sx={{ width: "100%" }}
                type="text"
                variant="outlined"
                size="medium"
                label="Company Name"
              />
              <TextField
                sx={{ width: "100%" }}
                type="email"
                variant="outlined"
                size="medium"
                label="Company Email"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddin: "20px",
                gap: "50px",
              }}
            >
              <TextField
                sx={{ width: "100%" }}
                type="text"
                variant="outlined"
                size="medium"
                label="Country"
              />
              <TextField
                sx={{ width: "100%" }}
                type="url"
                variant="outlined"
                size="medium"
                label="Company Website"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddin: "20px",
                gap: "50px",
              }}
            >
              <TextField
                sx={{ width: "100%" }}
                type="file"
                variant="filled"
                size="medium"
                placeholder="Company Logo"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddin: "20px",
                gap: "50px",
              }}
            >
              <TextField
                sx={{ width: "100%" }}
                type="password"
                variant="outlined"
                size="medium"
                label="Password"
              />
              <TextField
                sx={{ width: "100%" }}
                type="email"
                variant="outlined"
                size="medium"
                label="Confirm Password"
              />
            </Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#008080",
                display: "flex",
                alignSelf: "center",
                padding: "10px 15%",
                fontSize: "20px",
              }}
            >
              Register
            </Button>
            <Typography
              sx={{
                display: "flex",
                alignSelf: "center",
                fontSize: "16px",
              }}
            >
              Already registered?{" "}
              <Link
                onClick={() => {
                  setOpen(true);
                  setType("company");
                }}
                to="#"
              >
                Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default RegisterPage;

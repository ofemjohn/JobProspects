import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "./loginForm.css";

const LoginForm = ({ setType }) => {
  const handleSubmit = () => {};
  return (
    <Box
      sx={{
        width: "100%",
        height: "content-height",
        display: "flex",
        flexDirection: "column",
        // padding: "0 15px 15px 15px",
      }}
    >
      <h3 style={{ display: "flex", alignSelf: "center" }}>LOGIN</h3>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          id="standard-email-input"
          sx={{ fontSize: "24px" }}
          label="Email"
          type="email"
          size="normal"
          variant="standard"
        />
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          size="normal"
          variant="standard"
        />
        <Button variant="outlined">Submit</Button>

        <a href="#">Forgot Password?</a>
        <p>
          No account?{" "}
          <button
            onClick={() => setType("signup")}
            style={{
              backgroundColor: "#fff",
              color: "#008080",
              border: "1px solid #fff",
              textDecoration: "underline",
            }}
          >
            Register Here
          </button>
        </p>
      </form>
    </Box>
  );
};

export default LoginForm;

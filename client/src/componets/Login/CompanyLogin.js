import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import "./loginForm.css";
import { useAuth } from "../../auth/AuthProvider";

const CompanyLogin = ({ setType, setOpen }) => {
  const { company_login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ msg: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await company_login({
        email,
        password,
        setMessage,
        setOpen,
      });
    } catch (error) {
      console.log(error);
    }
  };
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
      <h3 style={{ display: "flex", alignSelf: "center" }}>COMPANY LOGIN</h3>
      <p className={`${message.type === "error" ? "error" : "success"}`}>
        {message.msg}
      </p>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
        onSubmit={handleSubmit}
        method="POST"
      >
        <TextField
          id="standard-email-input"
          onChange={(e) => setEmail(e.target.value)}
          sx={{ fontSize: "24px" }}
          label="Email"
          type="email"
          size="normal"
          name="email"
          variant="standard"
        />
        <TextField
          id="standard-password-input"
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          size="normal"
          variant="standard"
        />
        <Button type="submit" variant="outlined">
          Submit
        </Button>

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

export default CompanyLogin;

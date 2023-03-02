import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import "./signup.css";
import React, { useState } from "react";
import { useAuth } from "../../auth/AuthProvider";

const Signup = ({ setType }) => {
  const { signUp } = useAuth();
  const [message, setMessage] = useState({ msg: "", type: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "",
    country: "",
    state: "",
    address: "",
    gender: "",
    password: "",
  });

  function passwordMatchesConfirmPassword() {
    return data.password === confirmPassword;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasAllValues = Object.values(data).every((value) => !!value);

    if (!hasAllValues) {
      setMessage({ msg: "Ensure all fields are filled", type: "error" });
      return;
    }
    if (!passwordMatchesConfirmPassword()) {
      setMessage({ msg: "Passwords do not match", type: "error" });
      return;
    }
    try {
      if (data !== null)
        await signUp({ data: data, setMessage: setMessage, setType: setType });
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
      }}
    >
      <h3 style={{ display: "flex", alignSelf: "center" }}>Register</h3>
      <p className={`${message.type === "error" ? "error" : "success"}`}>
        {message.msg}
      </p>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 20,
        }}
        onSubmit={handleSubmit}
      >
        <Box sx={{ display: "flex", gap: "20px" }}>
          <TextField
            id="standard-fname"
            sx={{ fontSize: "24px" }}
            onChange={(e) => setData({ ...data, first_name: e.target.value })}
            label="First Name"
            type="text"
            size="normal"
            variant="standard"
          />
          <TextField
            id="standard-lname"
            sx={{ fontSize: "24px" }}
            label="Last Name"
            onChange={(e) => setData({ ...data, last_name: e.target.value })}
            type="text"
            size="normal"
            variant="standard"
          />
        </Box>
        <Box sx={{ display: "flex", gap: "20px" }}>
          <TextField
            id="standard-email"
            sx={{ fontSize: "24px" }}
            label="Email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            type="email"
            size="normal"
            variant="standard"
          />
          <TextField
            id="standard-phone"
            sx={{ fontSize: "24px" }}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            label="Phone Number"
            type="tel"
            size="normal"
            variant="standard"
          />
        </Box>
        <Box sx={{ display: "flex", gap: "20px", alignSelf: "flex-start" }}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              onChange={(e) => setData({ ...data, gender: e.target.value })}
            >
              <Box sx={{ display: "flex" }}>
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </Box>
            </RadioGroup>
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", gap: "20px" }}>
          <TextField
            sx={{ fontSize: "24px" }}
            label="Country"
            onChange={(e) => setData({ ...data, country: e.target.value })}
            type="text"
            size="normal"
            variant="standard"
          />
          <TextField
            sx={{ fontSize: "24px" }}
            label="State"
            onChange={(e) => setData({ ...data, state: e.target.value })}
            type="text"
            size="normal"
            variant="standard"
          />
        </Box>

        <TextField
          onChange={(e) => setData({ ...data, address: e.target.value })}
          label="Address"
          type="text"
          autoComplete="current-password"
          size="normal"
          variant="standard"
          multiline
          rows={2}
        />
        <Box sx={{ display: "flex", gap: "20px" }}>
          <TextField
            sx={{ fontSize: "24px" }}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            label="Password"
            type="password"
            size="normal"
            variant="standard"
          />
          <TextField
            sx={{ fontSize: "24px" }}
            onChange={(e) => setConfirmPassword(e.target.value)}
            label="Confirm Password"
            type="password"
            size="normal"
            variant="standard"
          />
        </Box>

        <Button variant="outlined" onClick={handleSubmit}>
          SIGNUP
        </Button>
        <p>
          Already have an account?{" "}
          <button
            onClick={() => setType("login")}
            style={{
              backgroundColor: "#fff",
              color: "#008080",
              border: "1px solid #fff",
              textDecoration: "underline",
            }}
          >
            Login
          </button>
        </p>
      </form>
    </Box>
  );
};

export default Signup;

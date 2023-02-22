import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

const Signup = ({ setType }) => {
  const [gender, setGender] = useState({
    male: false,
    female: false,
  });

  const { male, female } = gender;

  const handleSubmit = () => {};
  return (
    <Box
      sx={{
        width: "100%",
        height: "content-height",
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        // padding: "0 15px 15px 15px",
      }}
    >
      <h3 style={{ display: "flex", alignSelf: "center" }}>Register</h3>
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
            id="standard-email-input"
            sx={{ fontSize: "24px" }}
            label="First Name"
            type="text"
            size="normal"
            variant="standard"
          />
          <TextField
            id="standard-email-input"
            sx={{ fontSize: "24px" }}
            label="Last Name"
            type="text"
            size="normal"
            variant="standard"
          />
        </Box>
        <Box sx={{ display: "flex", gap: "20px" }}>
          <TextField
            id="standard-email-input"
            sx={{ fontSize: "24px" }}
            label="Email"
            type="email"
            size="normal"
            variant="standard"
          />
          <TextField
            id="standard-email-input"
            sx={{ fontSize: "24px" }}
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
            id="standard-email-input"
            sx={{ fontSize: "24px" }}
            label="Country"
            type="text"
            size="normal"
            variant="standard"
          />
          <TextField
            id="standard-email-input"
            sx={{ fontSize: "24px" }}
            label="State"
            type="text"
            size="normal"
            variant="standard"
          />
        </Box>

        <TextField
          id="standard-password-input"
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
            id="standard-email-input"
            sx={{ fontSize: "24px" }}
            label="Password"
            type="password"
            size="normal"
            variant="standard"
          />
          <TextField
            id="standard-email-input"
            sx={{ fontSize: "24px" }}
            label="Confirm Password"
            type="password"
            size="normal"
            variant="standard"
          />
        </Box>

        <Button variant="outlined">SIGNUP</Button>
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

import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = ({ setOpen, setType }) => {
  const [message, setMessage] = useState({
    type: "",
    msg: "",
  });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    country: "",
    website: "",
    file: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === "file" ? target.files[0] : target.value;
    const name = target.name;
    setSignupData({ ...signupData, [name]: value });
  };

  useEffect(() => {
    if (signupData.password !== signupData.confirmPassword) {
      console.log("password do not match");
    }
  }, [signupData.confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allValuesPresent = Object.values(signupData).every(
      (val) => val !== ""
    );
    if (!allValuesPresent) {
      setMessage({ msg: "* All fields should be filled", type: "error" });
    } else {
      console.log(signupData);
      const formData = new FormData();
      formData.append("name", signupData.name);
      formData.append("email", signupData.email);
      formData.append("country", signupData.country);
      formData.append("website", signupData.website);
      formData.append("file", signupData.file);
      formData.append("password", signupData.password);

      try {
        const response = await axios.post(
          "/companies/auth/register",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          setMessage({
            msg: "Account Created Successfully, You can now log in...",
            type: "success",
          });
          setTimeout(() => {
            setOpen(true);
            setType("company");
          }, 5000);
          setSignupData({
            name: "",
            email: "",
            country: "",
            website: "",
            file: "",
            password: "",
            confirmPassword: "",
          });
        }
      } catch (error) {
        setMessage({ msg: error.response.data.message, type: "error" });
      }
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography variant="h3" sx={{ fontSize: "50px", color: "#008080" }}>
          Join our Network: Register Your Company Today
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ fontSize: "20px", textAlign: "justify" }}
        >
          Welcome to our platform! We're excited to offer a resource for
          companies looking to hire top talent. Our platform is designed to make
          the hiring process easier, faster, and more efficient than ever
          before. Whether you're a small business or a large corporation, we're
          here to help you find the right candidates for your open positions.
          With our user-friendly platform and a wide range of tools and
          resources, we make it easy to post jobs, manage applications, and
          connect with potential candidates. So why wait? Sign up today and
          start hiring the best talent for your business!
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "30px 20px",
            gap: "40px",
          }}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: "100%" }}
                type="text"
                variant="outlined"
                name="name"
                onFocus={() => setMessage({ msg: "", type: "" })}
                onChange={handleChange}
                value={signupData.name}
                size="medium"
                label="Company Name"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: "100%" }}
                type="email"
                onFocus={() => setMessage({ msg: "", type: "" })}
                name="email"
                onChange={handleChange}
                value={signupData.email}
                variant="outlined"
                size="medium"
                label="Company Email"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: "100%" }}
                type="text"
                name="country"
                onFocus={() => setMessage({ msg: "", type: "" })}
                onChange={handleChange}
                value={signupData.country}
                variant="outlined"
                size="medium"
                label="Country"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: "100%" }}
                type="url"
                name="website"
                onFocus={() => setMessage({ msg: "", type: "" })}
                onChange={handleChange}
                value={signupData.website}
                variant="outlined"
                size="medium"
                label="Company Website"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <InputLabel shrink id="cv-label">
                  Upload Company Logo
                </InputLabel>
                <Input
                  fullWidth
                  name="file"
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "file",
                        value: e.target.files[0],
                      },
                    })
                  }
                  id="file"
                  type="file"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: "100%" }}
                type="password"
                name="password"
                onFocus={() => setMessage({ msg: "", type: "" })}
                onChange={handleChange}
                value={signupData.password}
                variant="outlined"
                size="medium"
                label="Password"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: "100%" }}
                type="password"
                onFocus={() => setMessage({ msg: "", type: "" })}
                name="confirmPassword"
                onChange={handleChange}
                value={signupData.confirmPassword}
                variant="outlined"
                size="medium"
                label="Confirm Password"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
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
              <Typography className={`${message.type}`}>
                {message.msg}
              </Typography>
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
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;

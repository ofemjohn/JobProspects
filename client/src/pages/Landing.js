import {
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import "./landing.css";
import { Box } from "@mui/system";
import image from "../assets/images/hero-img.jpg";
import { Link } from "react-router-dom";
import CustomCarousel from "../componets/CustomCarousel";
import { useNavigate } from "react-router-dom";

// JOBS
const jobs = [
  {
    id: 1,
    title: "React Developer",
    description:
      "We are looking for a self-motavaited and ready to learn and team play with react js experience to work together with our developer ...",
  },
  {
    id: 2,
    title: "Finance Officer",
    description:
      "We are looking for a self-motavaited and ready to learn and team play with react js experience to work together with our developer ...",
  },
  {
    id: 3,
    title: "Human Resource Intern",
    description:
      "We are looking for a self-motavaited and ready to learn and team play with react js experience to work together with our developer ...",
  },
  {
    id: 4,
    title: "Juniour Backend Developer",
    description:
      "We are looking for a self-motavaited and ready to learn and team play with react js experience to work together with our developer ...",
  },
];

const Landing = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    console.log("You clicked me");
    navigate("/register_company");
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {/* HERO SECTION */}
      <Grid container sx={{ height: "80vh" }} alignItems="center">
        {/* Left side */}
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            padding: isSmallScreen
              ? "20px"
              : isMediumScreen
              ? "20px"
              : "20px 60px",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: isSmallScreen
                ? "50px"
                : isMediumScreen
                ? "50px"
                : "70px",
            }}
          >
            Find Your Dream Job Today
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: isSmallScreen
                ? "16px"
                : isMediumScreen
                ? "16px"
                : "24px",
            }}
          >
            Looking for a job that matches your skills and experience? Look no
            further! Our platform connects job seekers with the latest and
            greatest job openings from top companies in your area. Whether
            you're just starting out in your career or are a seasoned
            professional, we've got the perfect job for you.
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignSelf: "flex-start",
              marginTop: isSmallScreen && isMediumScreen ? "20px" : "40px",
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#008080",
                padding: "20px 30px",
                borderRadius: "10px",
              }}
              onClick={handleNavigate}
            >
              Are You Hiring?
            </Button>
          </Box>
          <Typography
            sx={{
              display: "flex",
              alignSelf: "flex-start",
              fontSize: isSmallScreen
                ? "14px"
                : isMediumScreen
                ? "14px"
                : "16px",
              marginTop: isSmallScreen ? "20px" : "40px",
            }}
            variant="button"
          >
            {" "}
            Looking for Jobs instead?
            <Link style={{ color: "#008080" }} to="#">
              Apply For Jobs{" "}
            </Link>
          </Typography>
        </Grid>
        {/* Right side */}
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            marginTop: isSmallScreen ? "20px" : isMediumScreen ? "20px" : "0px",
          }}
        >
          <Box sx={{ width: "100%", marginTop: "20px" }}>
            <img src={image} alt="hero bg" width="100%" />
            <CustomCarousel jobs={jobs} />
          </Box>
        </Grid>
      </Grid>
      {/* HERO TWO */}
      <Box>
        <Typography> </Typography>
      </Box>
    </>
  );
};

export default Landing;

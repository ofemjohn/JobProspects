import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  Slider,
  Button,
  Box,
  Paper,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import Axios from "axios";
import JobCard from "../componets/JobCard";
import JobModal from "../componets/JobModal";

const jobTypes = ["Full time", "Part time", "Contract", "Internship"];

function JobSearchPage() {
  const [selectedJob, setSelectedJob] = useState();
  const [open, setOpen] = useState(false);
  const [jobs, setJobs] = useState();
  const [location, setLocation] = React.useState("");
  const [jobType, setJobType] = React.useState("");
  const [jobTitle, setJobTitle] = React.useState("");
  const [salaryRange, setSalaryRange] = React.useState([0, 999999]);
  const [searchParams, setSearchParams] = React.useState({
    location: "",
    job_type: "",
    job_title: "",
    min_salary: "",
    max_salary: "",
  });

  const handleJobTypeChange = (event) => {
    setJobType(event.target.value);
  };

  const handleSalaryRangeChange = (event, newValue) => {
    setSalaryRange(newValue);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleJobTitleChange = (event) => {
    setJobTitle(event.target.value);
  };

  useEffect(() => {
    setSearchParams({
      type: jobType,
      title: jobTitle,
      location: location,
      min_salary: salaryRange[0],
      max_salary: salaryRange[1],
    });
  }, [jobTitle, jobType, location, salaryRange]);

  const handleSearch = async () => {
    // handle search logic here
    console.log(searchParams);
    try {
      const response = await Axios.get("/jobs/search", {
        params: searchParams,
      });
      console.log(response.data);
      setJobs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // close modal
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" align="center">
            Search Jobs
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="jobTitle"
            label="Job Title"
            variant="outlined"
            placeholder="e.g Python Developer"
            fullWidth
            value={jobTitle}
            onChange={handleJobTitleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="location"
            label="Location"
            variant="outlined"
            placeholder="e.g Lagos, Nigeria"
            fullWidth
            value={location}
            onChange={handleLocationChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Select
            id="jobType"
            value={jobType}
            label="Job Type"
            fullWidth
            onChange={handleJobTypeChange}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Job Type
            </MenuItem>
            {jobTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="body1" component="p">
            Salary Range: ${salaryRange[0]} - ${salaryRange[1]}
          </Typography>
          <Slider
            sx={{
              color: "#008080",
            }}
            value={salaryRange}
            onChange={handleSalaryRangeChange}
            valueLabelDisplay="auto"
            min={0}
            max={999999}
            step={1000}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Button
            sx={{
              padding: "10px 20px",
              bgcolor: "#008080",
            }}
            variant="contained"
            onClick={handleSearch}
          >
            <Search />
            Search
          </Button>
        </Grid>

        {/* DISPLAY RESULTS */}

        {jobs && (
          <Grid container spacing={2} mt={5}>
            {jobs.map((job) => (
              <Grid item key={job.job_id} xs={12} sm={6} md={3}>
                <JobCard
                  setOpen={setOpen}
                  setSelectedJob={setSelectedJob}
                  job={job}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
      <JobModal
        open={open}
        setOpen={setOpen}
        onClose={handleClose}
        selectedJob={selectedJob}
      />
    </Container>
  );
}

export default JobSearchPage;

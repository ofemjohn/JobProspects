import { Download } from "@mui/icons-material";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleApplication = () => {
  const [application, setApplication] = useState();
  const [status, setStatus] = useState("");
  const { id } = useParams();

  //   FETCH APPLICATION
  const fetchApplication = async () => {
    try {
      const response = await axios.get(`/api/applications/${id}`);
      console.log(response.data);
      setApplication(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchApplication();
  }, [id]);
  useEffect(() => {
    updateStatus();
  }, [status]);

  // UPDATE STATUS
  const updateStatus = async () => {
    if (status) {
      try {
        const response = await axios.put(`/api/application/${id}`, {
          status: status,
        });
        console.log(response.data.message);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    application && (
      <Grid container spacing={2} justifyContent="center" p={3}>
        <Typography>SINGLE JOB APPLICATION</Typography>
        <Grid item xs={12} md={6}>
          <Typography>Job Title: {application.job.job_title}</Typography>
          <Typography>Job Status: {application.job.job_status}</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Update Application Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Update Application Status"
              onChange={handleChange}
            >
              <MenuItem value="Reviewed">Reviewed</MenuItem>
              <MenuItem value="Invited for Interview">
                Invited for Interview
              </MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
              <MenuItem value="Hired">Hired</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography>APPLICANT INFORMATION</Typography>
        </Grid>
        <Grid container spacing={2} p={3} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Typography>
              Name: {application.user.first_name} {application.user.last_name}
            </Typography>
            <Typography>Email: {application.user.email}</Typography>
            <Typography>Phone: {application.user.phone}</Typography>
            <Typography>Country: {application.user.country}</Typography>
            <Typography>City: {application.user.state}</Typography>
            <Typography>Address: {application.user.address}</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography>
              {application.application.application_cover_letter}
            </Typography>
            <Typography>Download applicant resume</Typography>
            <Button href="#" download>
              <Download />
              Download
            </Button>
          </Grid>
        </Grid>
      </Grid>
    )
  );
};

export default SingleApplication;

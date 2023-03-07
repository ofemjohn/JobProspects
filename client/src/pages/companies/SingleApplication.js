import { Download } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleApplication = () => {
  const [application, setApplication] = useState();
  const { id } = useParams();

  //   FETCH APPLICATION
  const fetchApplication = async () => {
    try {
      const response = await axios.get(`/applications/${id}`);
      console.log(response.data);
      setApplication(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchApplication();
  }, [id]);
  return (
    application && (
      <Grid container spacing={2} justifyContent="center" p={3}>
        <Typography>SINGLE JOB APPLICATION</Typography>
        <Grid item xs={12}>
          <Typography>Job Title: {application.job.job_title}</Typography>
          <Typography>Job Status: {application.job.job_status}</Typography>
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

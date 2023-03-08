import React from "react";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import { GetApp } from "@mui/icons-material";
import axios from "axios";

const downloadFile = async (url) => {
  try {
    const response = await axios.get(url, { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "filename.pdf");
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error(error);
  }
};

const ApplicationDetail = (props) => {
  //   const classes = useStyles();
  const { selectedApplication } = props;

  console.log(selectedApplication);

  return (
    <Box>
      <Typography>APPLIED JOB DETAILS</Typography>
      {!selectedApplication ? (
        "Loading ..."
      ) : (
        <Grid
          container
          component={Paper}
          justifyContent="center"
          spacing={2}
          p={4}
        >
          <Grid item xs={12}>
            <Typography sx={{ fontSize: "44px", fontWeight: "bold" }}>
              {selectedApplication.job.job_title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <img
              src={selectedApplication.company.company_logo_url}
              width="100px"
              height="100%"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              sx={{ fontSize: "24px", fontWeight: "bold" }}
            >
              Company:
              <span style={{ fontWeight: "normal", fontSize: "20px" }}>
                {" "}
                {selectedApplication.company.company_name}
              </span>
            </Typography>
            <Typography variant="h6" sx={{ fontSize: "24px" }}>
              {`${selectedApplication.job.employment_type} |
            ${
              selectedApplication.job.job_is_remote === true
                ? "Remote"
                : "In Office"
            }`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              {selectedApplication.job.job_description}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              sx={{ fontSize: "24px", fontWeight: "bold" }}
            >
              Your Information
            </Typography>

            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              Cover Letter
            </Typography>
            <Typography>
              {selectedApplication.application.application_cover_letter}
            </Typography>
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              Application Status:{" "}
              {selectedApplication.application.application_status}
            </Typography>
            <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
              Resume
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<GetApp />}
              href={`${selectedApplication.application.application_resume_url}`}
              // {selectedApplication.application.application_resume_url}
              download="cirriculum vitae"
              target="_blank"
            >
              Download
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ApplicationDetail;

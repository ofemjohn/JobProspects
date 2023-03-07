import React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import { GetApp, Image } from "@mui/icons-material";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     padding: theme.spacing(2),
//   },
//   paper: {
//     padding: theme.spacing(2),
//     marginBottom: theme.spacing(2),
//   },
//   title: {
//     fontWeight: "bold",
//     marginBottom: theme.spacing(1),
//   },
// }));

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
              href="../../../../api/file_upload/receipt.pdf"
              // {selectedApplication.application.application_resume_url}
              download
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

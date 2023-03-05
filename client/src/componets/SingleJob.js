import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";

function SingleJob({ selectedJob, onClose }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const rootStyle = {
    position: "fixed",
    right: 0,
    top: "10px",
    bottom: 0,
    width: "75%",
    backgroundColor: "white",
    overflowY: "scroll",
    padding: "24px",
    zIndex: 9999,
    "@media (max-width: 600px)": {
      width: "100%",
    },
  };
  const overlay = {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9998,
  };
  const companyLogoStyle = {
    maxWidth: "100%",
    height: "auto",
    marginBottom: "16px",
  };

  return (
    <>
      <div style={overlay} onClick={onClose}></div>
      <Grid container style={rootStyle}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h1" gutterBottom>
            {selectedJob.job_title} - {selectedJob.company_name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {selectedJob.job_salary_currency} {selectedJob.job_salary} /{" "}
            {selectedJob.job_salary_period}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {selectedJob.job_city}, {selectedJob.job_country}
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            Job Description
          </Typography>
          <Typography variant="body1" gutterBottom>
            {showFullDescription
              ? selectedJob.job_description
              : selectedJob.job_description.slice(0, 150) + "... "}
            <a href="#" onClick={toggleDescription}>
              {showFullDescription ? "Read less" : "Read more"}
            </a>
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            Required Experience
          </Typography>
          {/* <ul>
          {selectedJob.job_required_experience.map((exp, index) => (
            <li key={index}>{exp}</li>
          ))}
        </ul> */}
          <Typography variant="h6" component="h2" gutterBottom>
            Required Education
          </Typography>
          {/* <ul>
          {selectedJob.job_required_education.map((edu, index) => (
            <li key={index}>{edu}</li>
          ))}
        </ul> */}
          <Typography variant="h6" component="h2" gutterBottom>
            Required Skills
          </Typography>
          {/* <ul>
          {selectedJob.job_required_skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul> */}
          <Typography variant="h6" component="h2" gutterBottom>
            Benefits
          </Typography>
          <Typography variant="body1" gutterBottom>
            {selectedJob.job_benefits}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <img
            src={selectedJob.company_logo_url}
            alt={selectedJob.company_name}
            style={companyLogoStyle}
          />
          <Typography variant="h6" component="h2" gutterBottom>
            About the company
          </Typography>
          <Typography variant="body1" gutterBottom>
            {selectedJob.company_description}
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            How to apply
          </Typography>
          <Typography variant="body1" gutterBottom>
            To apply, please visit:{" "}
            <a href={selectedJob.job_apply_link}>
              {selectedJob.job_apply_link}
            </a>
          </Typography>
          {/* <Button variant="contained" sx={{ width: "100%" }}>
          Easy Apply
        </Button> */}
        </Grid>
      </Grid>
    </>
  );
}

export default SingleJob;

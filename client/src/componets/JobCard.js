import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Card, CardContent, Typography, Button } from "@mui/material";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
  },
  cardContent: {
    // paddingBottom: theme.spacing(2),
    paddingBottom: "10px",
  },
  button: {
    marginTop: "auto",
  },
}));

const truncateDescription = (description) => {
  const words = description.split(" ");
  const truncated = words.slice(0, 20).join(" ");
  if (words.length > 20) {
    return truncated + "...";
  }
  return truncated;
};

function JobCard({ job, setSelectedJob, setOpen }) {
  const classes = useStyles();

  // HANDLE APPLY JOB
  const handleApply = async (id) => {
    if (id) {
      try {
        const response = await Axios.get(`/jobs/${id}`);
        setSelectedJob(response.data);
        setOpen(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h6" component="h3" gutterBottom>
          {job.job_title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {`${job.job_city}, ${job.job_country}`} | {job.employment_type} | $
          {job.job_salary}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {truncateDescription(job.job_description)}
        </Typography>
      </CardContent>
      <Button
        onClick={() => handleApply(job.job_id)}
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Apply
      </Button>
    </Card>
  );
}

export default JobCard;

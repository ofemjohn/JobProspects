import {
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";

const CompanyJobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("active");

  useEffect(() => {
    // Fetch jobs by company id and update state
    const fetchJobs = async () => {
      try {
        const response = await Axios.get(`/api/jobs/company/${user.companyId}`);

        if (response.status === 200) {
          const data = response.data;
          setJobs(data);
          setFilteredJobs(
            data.filter((job) => job.job_status === statusFilter)
          );
        } else {
          console.log("Error fetching");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, [user.companyId, statusFilter]);

  // const handleStatusToggle = (event, jobId) => {
  //   const newStatus = event.target.checked ? "active" : "closed";
  //   // Update job status in database and update state
  //   // updateJobStatus(jobId, newStatus).then(() => {
  //   //   setJobs((prevJobs) =>
  //   //     prevJobs.map((job) => {
  //   //       if (job.id === jobId) {
  //   //         return { ...job, status: newStatus };
  //   //       }
  //   //       return job;
  //   //     })
  //   //   );
  //   //   setFilteredJobs((prevJobs) =>
  //   //     prevJobs.map((job) => {
  //   //       if (job.id === jobId) {
  //   //         return { ...job, status: newStatus };
  //   //       }
  //   //       return job;
  //   //     })
  //   //   );
  //   // });
  // };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setFilteredJobs(
      jobs.filter((job) => job.job_status === event.target.value)
    );
  };

  const handleJobStatusChange = (jobId) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId
          ? { ...job, status: job.status === "active" ? "closed" : "active" }
          : job
      )
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Job Listings</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="body1">Show:</Typography>
            <Select value={statusFilter} onChange={handleStatusFilterChange}>
              <MenuItem value="active">Active Jobs</MenuItem>
              <MenuItem value="closed">Closed Jobs</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <Typography variant="body1">Toggle Job Status:</Typography>
            <Switch
              color="primary"
              inputProps={{ "aria-label": "toggle job status" }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredJobs.map((job) => (
                <TableRow key={job.job_id}>
                  <TableCell>{job.job_id}</TableCell>
                  <TableCell>{job.job_title}</TableCell>
                  <TableCell>{job.job_company}</TableCell>
                  <TableCell>{job.job_location}</TableCell>
                  <TableCell>{job.job_status}</TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={job.job_status === "active"}
                          onChange={() => handleJobStatusChange(job.job_id)}
                        />
                      }
                      label={job.job_status === "active" ? "Active" : "Closed"}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default CompanyJobs;

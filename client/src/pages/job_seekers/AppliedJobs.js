import React, { useEffect, useState } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Visibility } from "@mui/icons-material";
import axios from "axios";
import { useAuth } from "../../auth/AuthProvider";
import { format } from "date-fns";

function AppliedJobs({ setSelectedApplication }) {
  const { user } = useAuth();
  const [appliedJobs, setAppliedJobs] = useState();

  // JOB APPLICATION FETCH
  const fetchApplication = async () => {
    try {
      const response = await axios.get(`/user/jobs/${user.userId}`);
      setAppliedJobs(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch applied jobs data from backend API
    fetchApplication();
  }, []);

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h4">APPLIED JOBS</Typography>
        <Typography variant="subtitle1">
          Keep track of all your job application status from here
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Application Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appliedJobs &&
                appliedJobs.map((job) => (
                  <TableRow key={job.application.application_id}>
                    <TableCell>{job.job.job_title}</TableCell>
                    <TableCell>{job.company.company_name}</TableCell>

                    <TableCell>{job.application.application_status}</TableCell>
                    <TableCell>
                      {format(
                        new Date(Date.parse(job.application.application_date)),
                        "dd/MM/yyyy"
                      )}
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`/applied_jobs/${job.application.application_id}`}
                        onClick={() => setSelectedApplication(job)}
                      >
                        <Visibility />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default AppliedJobs;

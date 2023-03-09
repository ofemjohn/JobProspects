import { Visibility } from "@mui/icons-material";
import {
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";

const JobApplications = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [applications, setApplications] = useState();

  useEffect(() => {
    //   FETCH APPLICATIONS FUNCTION
    const fetchApplication = async () => {
      try {
        const response = await axios.get(
          `/company/applications/${user.companyId}`
        );
        setApplications(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplication();
  }, [user.companyId]);

  const handleVisibility = async (id) => {
    try {
      const res = await axios.get(`/api/applications/${id}`);
      if (res.data.application.application_status === "pending") {
        const response = await axios.put(`/api/application/${id}`, {
          status: "Application Under Review",
        });

        if (response.status === 200) {
          navigate(`/singleApplication/${id}`);
        }
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Grid container spacing={2} justifyContent="center">
      <Typography>JOB APPLICANTS</Typography>
      <Grid item xs={12}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>City/ Country</TableCell>
                <TableCell>Job</TableCell>
                <TableCell>Application Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications &&
                applications.map((application) => (
                  <TableRow key={application.application.application_id}>
                    <TableCell>{`${application.user.first_name} ${application.user.last_name}`}</TableCell>
                    <TableCell>{application.user.email}</TableCell>
                    <TableCell>{application.user.phone}</TableCell>
                    <TableCell>
                      {application.user.state}, {application.user.country}
                    </TableCell>
                    <TableCell>{application.job.job_title}</TableCell>
                    <TableCell>
                      {format(
                        new Date(
                          Date.parse(application.application.application_date)
                        ),
                        "dd/MM/yyyy"
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() =>
                          handleVisibility(
                            application.application.application_id
                          )
                        }
                      >
                        <Visibility />
                      </IconButton>
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

export default JobApplications;

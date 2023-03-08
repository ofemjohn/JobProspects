import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../auth/AuthProvider";
import Axios from "axios";

function SingleJob({ selectedJob, onClose, setOpenLogin, setType }) {
  const { user } = useAuth();
  const [message, setMessage] = useState({
    type: "",
    msg: "",
  });
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [application, setApplication] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    phone: user ? user.phone : "",
    cover_letter: "",
    file: "",
  });

  useEffect(() => {
    setApplication({
      name: user ? user.name : "",
      email: user ? user.email : "",
      phone: user ? user.phone : "",
      cover_letter: "",
      file: "",
    });
  }, [user]);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "file" ? target.files[0] : target.value;
    const name = target.name;
    setApplication({ ...application, [name]: value });
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user.userId);
    const allValuesPresent = Object.values(application).every(
      (val) => val !== ""
    );
    if (!allValuesPresent) {
      setMessage({ msg: "* All fields should be filled", type: "error" });
    } else {
      const formData = new FormData();
      console.log("formData", formData);
      formData.append("job_id", selectedJob.job_id);
      formData.append("user_id", user.userId);
      formData.append("cover_letter", application.cover_letter);
      formData.append("file", application.file);

      try {
        const response = await Axios.post("/jobs/apply", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          setMessage({ msg: response.data.message, type: "success" });
        } else {
          setMessage({ msg: response.data.message, type: "error" });
        }
      } catch (error) {
        setMessage({ msg: error.response.data.message, type: "error" });
      }
    }
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
        <Grid item xs={12} md={6}>
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
        <Grid p={2} item xs={12} md={6}>
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
          {user ? (
            <Typography variant="h6" component="h2" gutterBottom>
              FILL THIS FORM TO SEND YOUR APPLICATION
            </Typography>
          ) : (
            <>
              <Typography variant="h6" component="h2" gutterBottom>
                To apply for this job,
                <span>You need to have an account with use first</span>
              </Typography>{" "}
              <Button
                onClick={() => {
                  setType("login");
                  setOpenLogin(true);
                }}
              >
                Login
              </Button>
            </>
          )}
          {user && (
            <form onSubmit={handleSubmit} enctype="multipart/form-data">
              <Grid container spacing={2}>
                <Grid item xs={12} md={10}>
                  <TextField
                    id="name"
                    fullWidth
                    onChange={handleInputChange}
                    name="name"
                    value={application.name}
                    label="Name"
                    placeholder="eg. Brian Murithi"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email"
                    value={application.email}
                    onChange={handleInputChange}
                    name="email"
                    placeholder="eg. name@mail.com"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    value={application.phone}
                    id="phone-input"
                    name="phone"
                    label="Phone Number"
                    onChange={handleInputChange}
                    placeholder="eg. +25412345678"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl>
                    <InputLabel shrink id="cv-label">
                      UPLOAD CV
                    </InputLabel>
                    <Input
                      fullWidth
                      name="file"
                      onChange={(e) =>
                        handleInputChange({
                          target: {
                            name: "file",
                            value: e.target.files[0],
                          },
                        })
                      }
                      id="file"
                      disableUnderline
                      type="file"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Cover Letter</Typography>
                  <TextField
                    fullWidth
                    id="cover_letter_input"
                    labelId="cover_letter"
                    name="cover_letter"
                    value={application.cover_letter}
                    onChange={handleInputChange}
                    multiline
                    rows={10}
                    placeholder="eg. Write a cover Letter"
                  />
                </Grid>
                <Grid item xm={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: "100%" }}
                  >
                    Easy Apply
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
          {/* <Typography variant="body1" gutterBottom>
            To apply, please visit:{" "}
            <a href={selectedJob.job_apply_link}>
              {selectedJob.job_apply_link}
            </a>
          </Typography> */}
          <Typography mt={4} variant="subtitle1" className={`${message.type}`}>
            {message.msg}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default SingleJob;

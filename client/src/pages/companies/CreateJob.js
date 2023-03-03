import React, { useState } from "react";
import "./styles.css";
import {
  TextField,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  Typography,
} from "@mui/material";

const initialFormState = {
  job_title: "",
  employment_type: "",
  job_description: "",
  job_is_remote: false,
  job_apply_link: "",
  company_id: "",
  job_salary: "",
  job_salary_currency: "",
  job_salary_period: "",
  job_city: "",
  job_country: "",
  job_status: "",
  apply_by: "",
  external_apply_links: "",
  job_required_experience: [],
  job_required_education: [],
  job_required_skills: [],
  job_benefits: "",
};

const CreateJob = () => {
  const [formData, setFormData] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px 40px" }}>
      <Typography>CREATE A JOB POSTING</Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            label="Job Title"
            name="job_title"
            value={formData.job_title}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={3}>
          <Select
            label="Employment Type"
            name="employment_type"
            value={formData.employment_type}
            onChange={handleInputChange}
            fullWidth
          >
            <MenuItem value="Full-time">Full-time</MenuItem>
            <MenuItem value="Part-time">Part-time</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
            <MenuItem value="Internship">Internship</MenuItem>
            <MenuItem value="Temporary">Temporary</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.job_is_remote}
                onChange={handleInputChange}
                name="job_is_remote"
                color="primary"
              />
            }
            label="Remote"
          />
        </Grid>

        <Grid item xs={4} md={3}>
          <TextField
            label="Salary"
            name="job_salary"
            value={formData.job_salary}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={4} md={3}>
          <Select
            label="Salary Currency"
            name="job_salary_currency"
            value={formData.job_salary_currency}
            onChange={handleInputChange}
            fullWidth
          >
            <MenuItem value="dollar">Dollar ($)</MenuItem>
            <MenuItem value="euro">Euro (€)</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={4} md={3}>
          <TextField
            label="Salary Period"
            name="job_salary_period"
            value={formData.job_salary_period}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={4} md={3}>
          <TextField
            label="City"
            name="job_city"
            value={formData.job_city}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={4} md={3}>
          <TextField
            label="Country"
            name="job_country"
            value={formData.job_country}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={4} md={3}>
          <TextField
            label="Apply Link"
            name="job_apply_link"
            value={formData.job_apply_link}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={4} md={3}>
          <TextField
            label="Status"
            name="job_status"
            value={formData.job_status}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            label="Apply By"
            name="apply_by"
            value={formData.apply_by}
            onChange={handleInputChange}
            fullWidth
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="External Apply Links"
            name="external_apply_links"
            value={formData.external_apply_links}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Job Description"
            name="job_description"
            value={formData.job_description}
            onChange={handleInputChange}
            fullWidth
            required
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Required Experience"
            name="job_required_experience"
            value={formData.job_required_experience}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Required Education"
            name="job_required_education"
            value={formData.job_required_education}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Required Skills"
            name="job_required_skills"
            value={formData.job_required_skills}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Benefits"
            name="job_benefits"
            value={formData.job_benefits}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12} md={4}></Grid>
        <Grid item xs={12} md={4}>
          <Button
            sx={{ width: "100%", margin: "20px auto 20px auto" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </Grid>
        <Grid item xs={12} md={4}></Grid>
      </Grid>
    </form>
  );
};

export default CreateJob;

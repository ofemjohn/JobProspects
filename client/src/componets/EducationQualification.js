import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import {
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Delete, Edit } from "@mui/icons-material";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const educationAwards = ["Masters", "Bachelor", "Diploma", "Certificate"];
const grades = {
  secondary: ["A", "A-", "B+", "C+", "C", "C-", "D+", "D", "D-", "E"],
  tertiary: [
    "First Class Honours",
    "Second Class Honors Upper Division",
    "Second Class Honors Lower Division",
    "Pass",
    "Distinction",
  ],
};

const EducationQualification = () => {
  const [education, setEducation] = useState({
    schoolName: "",
    yearFrom: "",
    yearCompleted: "",
    level: "",
    award: "",
    grade: "",
  });

  const [educations, setEducations] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEducation({ ...education, [name]: value });
  };

  const handleAddEducation = () => {
    const allValuesPresent = Object.values(education).every(
      (val) => val !== ""
    );
    if (!allValuesPresent) {
      console.log("All fields should be filled");
    } else {
      setEducations([...educations, education]);
      setEducation({
        schoolName: "",
        course: "",
        yearFrom: "",
        yearCompleted: "",
        level: "",
        award: "",
        grade: "",
      });
    }
  };

  const handleEdit = (index) => {
    const educationToEdit = educations[index];
    setEducation({
      schoolName: educationToEdit.schoolName,
      yearFrom: educationToEdit.yearFrom,
      yearCompleted: educationToEdit.yearCompleted,
      level: educationToEdit.level,
      award: educationToEdit.award,
      course: educationToEdit.course,
      grade: educationToEdit.grade,
    });
    setEducations(educations.filter((_, i) => i !== index));
  };

  const handleDelete = (index) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Education Form
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            name="schoolName"
            value={education.schoolName}
            onChange={handleInputChange}
            label="Shool Name"
          />
        </Grid>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid item xs={12} sm={6}>
            <DatePicker
              name="yearFrom"
              value={education.yearFrom}
              onChange={(date) => {
                handleInputChange({
                  target: {
                    name: "yearFrom",
                    value: date,
                  },
                });
              }}
              label="Year From"
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              name="yearCompleted"
              value={education.yearCompleted}
              onChange={(date) => {
                handleInputChange({
                  target: {
                    name: "yearCompleted",
                    value: date,
                  },
                });
              }}
              label="Year Completed"
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
        </LocalizationProvider>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="level">Level Completed</InputLabel>
            <Select
              labelId="level"
              name="level"
              label="Level Completed"
              value={education.level}
              onChange={handleInputChange}
            >
              <MenuItem value="highschool">High School</MenuItem>
              <MenuItem value="tertiary">Tertiary</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="award">Award</InputLabel>
            <Select
              labelId="award"
              id="award-select"
              name="award"
              label="Award"
              value={education.award}
              onChange={handleInputChange}
            >
              {education.level === "tertiary" ? (
                educationAwards.map((award, i) => (
                  <MenuItem key={i} value={award}>
                    {award}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="kcse">KCSE</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
        {education.level === "tertiary" && (
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="course"
              value={education.course}
              onChange={handleInputChange}
              label="Course Pursued"
            />
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Grade Attained</InputLabel>
            <Select
              name="grade"
              label="Grade Attained"
              value={education.grade}
              onChange={handleInputChange}
            >
              {education.level === "tertiary"
                ? grades.tertiary.map((grade, i) => (
                    <MenuItem key={i} value={grade}>
                      {grade}
                    </MenuItem>
                  ))
                : grades.secondary.map((grade, i) => (
                    <MenuItem key={i} value={grade}>
                      {grade}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddEducation}
          >
            Add Education
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>School Name</TableCell>
                  <TableCell>Level</TableCell>
                  <TableCell>Award</TableCell>
                  <TableCell>Course</TableCell>
                  <TableCell>Year From</TableCell>
                  <TableCell>Year Completed</TableCell>
                  <TableCell>Grade Attained</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {educations.map((education, index) => (
                  <TableRow key={index}>
                    <TableCell>{education.schoolName}</TableCell>
                    <TableCell>{education.level}</TableCell>
                    <TableCell>{education.award}</TableCell>
                    <TableCell>{education.course}</TableCell>
                    <TableCell>
                      {format(education.yearFrom, "dd/MM/yyy")}
                    </TableCell>
                    <TableCell>
                      {format(education.yearCompleted, "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>{education.grade}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleEdit(index)}
                        aria-label="edit"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(index)}
                        aria-label="delete"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default EducationQualification;

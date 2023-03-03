import React, { useState } from "react";
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

const EducationQualification = () => {
  const classes = useStyles();

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
    setEducations([...educations, education]);
    setEducation({
      schoolName: "",
      yearFrom: "",
      yearCompleted: "",
      level: "",
      award: "",
      grade: "",
    });
  };

  const handleEdit = (index) => {
    const educationToEdit = educations[index];
    setEducation({
      schoolName: educationToEdit.schoolName,
      yearFrom: educationToEdit.yearFrom,
      yearCompleted: educationToEdit.yearCompleted,
      level: educationToEdit.level,
      award: educationToEdit.award,
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
        <Grid item xs={12}>
          <TextField
            name="schoolName"
            value={education.schoolName}
            onChange={handleInputChange}
            label="Shool Name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="yearFrom"
            value={education.yearFrom}
            onChange={handleInputChange}
            label="Year From"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="yearCompleted"
            value={education.yearCompleted}
            onChange={handleInputChange}
            label="Year Completed"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel>Level</InputLabel>
            <Select
              name="level"
              value={education.level}
              onChange={handleInputChange}
            >
              <MenuItem value="highschool">High School</MenuItem>
              <MenuItem value="tertiary">Tertiary</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel>Award</InputLabel>
            <Select
              name="award"
              value={education.award}
              onChange={handleInputChange}
            >
              {education.level === "tertiary" ? (
                <>
                  <MenuItem value="bachelor">Bachelor</MenuItem>
                  <MenuItem value="masters">Masters</MenuItem>
                  <MenuItem value="diploma">Diploma</MenuItem>
                  <MenuItem value="certificate">Certificate</MenuItem>
                </>
              ) : (
                <MenuItem value="kcse">KCSE</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel>Grade Attained</InputLabel>
            <Select
              name="grade"
              value={education.grade}
              onChange={handleInputChange}
            >
              {education.level === "tertiary" ? (
                <>
                  <MenuItem value="first-class-honours">
                    First Class Honours
                  </MenuItem>
                  <MenuItem value="second-class-upper-division">
                    Second Class Upper Division
                  </MenuItem>
                  <MenuItem value="second-class-lower-division">
                    Second Class Honours Lower Division
                  </MenuItem>
                  <MenuItem value="pass">Pass</MenuItem>
                  <MenuItem value="distinction">Distinction</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="A-">A-</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="B-">B-</MenuItem>
                  <MenuItem value="C+">C+</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                  <MenuItem value="C-">C-</MenuItem>
                  <MenuItem value="D+">D+</MenuItem>
                  <MenuItem value="D">D</MenuItem>
                  <MenuItem value="D-">D-</MenuItem>
                  <MenuItem value="E">E</MenuItem>
                </>
              )}
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
                    <TableCell>{education.yearFrom}</TableCell>
                    <TableCell>{education.yearCompleted}</TableCell>
                    <TableCell>{education.gradeAttained}</TableCell>
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

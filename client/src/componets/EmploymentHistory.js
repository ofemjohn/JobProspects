import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";

const EmploymentHistory = () => {
  const [historyList, setHistoryList] = useState([]);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [roles, setRoles] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newHistory = {
      name: name,
      position: position,
      roles: roles,
      startDate: startDate,
      endDate: endDate,
    };
    setHistoryList([...historyList, newHistory]);

    setName("");
    setPosition("");
    setRoles("");
    setStartDate("");
    setEndDate("");
  };

  const handleDelete = (index) => {
    const newList = [...historyList];
    newList.splice(index, 1);
    setHistoryList(newList);
  };

  const handleEdit = (index) => {
    const history = index;
    setName(history.name);
    setPosition(history.position);
    setRoles(history.roles);
    setStartDate(history.startDate);
    setEndDate(history.endDate);
    handleDelete(index);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6">Employment History</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name of Organization"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Position"
              value={position}
              onChange={(event) => setPosition(event.target.value)}
            />
          </Grid>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid item xs={12} sm={6}>
              <DatePicker
                name="startDate"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
                label="Start Date"
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                name="endDate"
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
                label="End Date"
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
          </LocalizationProvider>
          <Grid item xs={12}>
            <TextField
              multiline
              rows={10}
              fullWidth
              label="Roles and responsibilities"
              value={roles}
              onChange={(event) => setRoles(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>

      <Box mt={4}>
        <TableContainer component={Paper}>
          <Table
            // className={classes.table}
            aria-label="employment history table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Name of Organization</TableCell>
                <TableCell align="center">Position</TableCell>
                <TableCell align="center">Roles</TableCell>
                <TableCell align="center">Date Started</TableCell>
                <TableCell align="center">Date Ended</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historyList.map((history, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {history.name}
                  </TableCell>
                  <TableCell align="center">{history.position}</TableCell>
                  <TableCell align="center">{history.roles}</TableCell>
                  <TableCell align="center">
                    {format(history.startDate, "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell align="center">
                    {format(history.endDate, "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEdit(history)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(index)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default EmploymentHistory;

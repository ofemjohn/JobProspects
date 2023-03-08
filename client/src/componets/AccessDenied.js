import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Container, Typography } from "@mui/material";
import { ReportProblem } from "@mui/icons-material";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    padding: "16px",
  },
  message: {
    marginBottom: "20px",
    textAlign: "center",
  },
  button: {
    marginTop: "16px",
  },
});

function AccessDenied() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ color: "red" }}
        className={classes.message}
      >
        <ReportProblem fontSize="large" sx={{ marginRight: "20px" }} />
        Access Denied
      </Typography>
      <Typography variant="body1" component="p" className={classes.message}>
        Sorry, you do not have permission to access this page.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        href="/"
        className={classes.button}
      >
        Go to Homepage
      </Button>
    </Container>
  );
}

export default AccessDenied;

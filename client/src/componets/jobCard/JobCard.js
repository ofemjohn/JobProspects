import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import "./jobCard.css";

const JobCard = () => {
  return (
    <Card sx={{ width: "100%", marginTop: "20px", backgroundColor: "#ECECEC" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Microsoft
        </Typography>
        <h1>Java Developer</h1>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Nairobi, Kenya
        </Typography>
        <p>
          We are seeking a skilled software engineer to join our team and help
          develop cutting-edge software solutions....
        </p>
      </CardContent>
      <CardActions>
        <Button
          sx={{ display: "flex", alignSelf: "center", width: "100%" }}
          size="medium"
          variant="outlined"
        >
          APPLY
        </Button>
      </CardActions>
    </Card>
  );
};

export default JobCard;

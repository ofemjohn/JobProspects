import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import SingleJob from "./SingleJob";

function JobModal(props) {
  const { selectedJob, open, onClose } = props;

  return (
    selectedJob && (
      <Dialog open={open} onClose={onClose}>
        <SingleJob selectedJob={selectedJob} onClose={onClose} />
      </Dialog>
    )
  );
}

export default JobModal;

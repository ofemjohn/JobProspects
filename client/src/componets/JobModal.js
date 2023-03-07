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
  const { selectedJob, open, onClose, setType, setOpenLogin } = props;

  return (
    selectedJob && (
      <Dialog open={open} onClose={onClose}>
        <SingleJob
          selectedJob={selectedJob}
          onClose={onClose}
          setType={setType}
          setOpenLogin={setOpenLogin}
        />
      </Dialog>
    )
  );
}

export default JobModal;

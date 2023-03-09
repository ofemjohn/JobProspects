import React from "react";
import { Dialog } from "@mui/material";
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

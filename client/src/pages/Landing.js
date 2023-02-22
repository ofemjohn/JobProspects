import { IconButton, Paper } from "@mui/material";
import React from "react";

import "./landing.css";
import SearchIcon from "@mui/icons-material/Search";
import Filter from "../componets/filter/Filter";
import JobCard from "../componets/jobCard/JobCard";
import { Box } from "@mui/system";

const Landing = () => {
  return (
    <div>
      {/* TITLE */}
      <div className="landing-title">Find Your Dream Job Today</div>
      {/* SEARCH INPUT */}
      <div className="search-wrapper">
        <input
          className="search-input"
          type="search"
          placeholder="e.g Python Developer"
        />
        <IconButton>
          <SearchIcon fontSize="large" />
        </IconButton>
      </div>
      {/* FILTERS */}
      <Box pb={5}>
        <Filter />
      </Box>
      {/* JOBS */}
      <Paper elevation={5}>
        <Box
          p={3}
          // display={{ x }}
          sx={{
            display: "grid",
            columnGap: 3,
            rowGap: 1,
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
        </Box>
      </Paper>
      {/* <div className="jobs">
        
      </div> */}
    </div>
  );
};

export default Landing;

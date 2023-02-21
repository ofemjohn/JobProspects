import { IconButton } from "@mui/material";
import React from "react";

import "./landing.css";
import SearchIcon from "@mui/icons-material/Search";
import Filter from "../componets/filter/Filter";
import JobCard from "../componets/jobCard/JobCard";

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
      <Filter />
      {/* JOBS */}
      <div className="jobs">
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
      </div>
    </div>
  );
};

export default Landing;

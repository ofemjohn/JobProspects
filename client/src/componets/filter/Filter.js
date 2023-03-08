import React from "react";
import CustomSelect from "../CustomSelect";
import CustomSlider from "../CustomSlider";
import "./filter.css";

const job_type = ["Part time", "Full time", "Internship", "Contract"];

const Filter = () => {
  return (
    <div className="filter-container">
      <h3>FILTER BY:</h3>
      <div className="filter-wrapper">
        {/* LOCATION */}
        <div className="filterby-wrapper">
          <span>Country / Location </span>
          <input
            className="filter-input"
            type="text"
            placeholder="e.g lagos or Nigeria"
          />
        </div>
        {/* TYPE */}
        <div className="filterby-wrapper">
          <span>Employment Type</span>
          <CustomSelect data={job_type} name="Employment Type" />
        </div>
        {/* SALARY RANGE */}
        <div className="filterby-wrapper">
          <span>Salary Range</span>
          <CustomSlider />
        </div>
      </div>
    </div>
  );
};

export default Filter;

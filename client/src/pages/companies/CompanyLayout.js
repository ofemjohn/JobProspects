import * as React from "react";
import PropTypes from "prop-types";
import { AppBar, Tabs, Tab, Typography, Box } from "@mui/material";
import { FactCheck, Group, Home, Note, Settings } from "@mui/icons-material";
import { Link, Outlet } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function CompanyLayout() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
      <AppBar
        sx={{
          bgcolor: "#008080",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
        }}
        position="static"
      >
        <Typography>Job Prospects</Typography>
        <Tabs
          sx={{
            display: "flex",
            // marginLeft: "auto",
            alignItems: "center",
          }}
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="standard"
          aria-label="nav tabs example"
        >
          <Tab
            icon={<Home />}
            iconPosition="start"
            label="Home"
            to="/company"
            component={Link}
          />
          <Tab
            icon={<FactCheck />}
            iconPosition="start"
            label="My Jobs"
            to="/jobs"
            component={Link}
          />
          <Tab
            icon={<Group />}
            iconPosition="start"
            label="My Candidates"
            to="/candidates"
            component={Link}
          />
          <Tab
            icon={<Note />}
            iconPosition="start"
            label="Resume Database"
            to="/resumes"
            component={Link}
          />
          <Tab
            icon={<Settings />}
            iconPosition="start"
            label="Account"
            to="/profile"
            component={Link}
          />
        </Tabs>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "40px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

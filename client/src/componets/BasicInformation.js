import React from "react";
import "./styles.css";
import {
  Edit,
  Email,
  Flag,
  LinkedIn,
  Paid,
  Person,
  Phone,
  Transgender,
} from "@mui/icons-material";
import { Avatar, Button, IconButton, Typography } from "@mui/material";

const BasicInformation = () => {
  return (
    <>
      <div className="basic-header">
        <Typography>Basic Information</Typography>
        <Button variant="contained">
          <Edit />
          Change Information
        </Button>
      </div>
      <div className="basic-container">
        <div className="basic-left">
          {/*CONTENT HOLDER */}
          <div className="info-wrapper">
            <div className="info-data-wrapper">
              <div>
                <Person
                  className="info-icon"
                  sx={{ width: "100%", color: "#008080b6" }}
                  fontSize="large"
                />
              </div>
              <div className="info-data">
                <Typography variant="subtitle1" fontSize="20px">
                  First name
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  Brian
                </Typography>
              </div>
            </div>
            <div className="info-data-wrapper">
              <div>
                <Person
                  className="info-icon"
                  sx={{ width: "100%", color: "#008080b6" }}
                  fontSize="large"
                />
              </div>
              <div className="info-data">
                <Typography variant="subtitle1" fontSize="20px">
                  Last name
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  Murithi
                </Typography>
              </div>
            </div>
          </div>
          <div className="info-wrapper">
            <div className="info-data-wrapper">
              <div>
                <Email
                  className="info-icon"
                  sx={{ width: "100%", color: "#008080b6" }}
                  fontSize="large"
                />
              </div>
              <div className="info-data">
                <Typography variant="subtitle1" fontSize="20px">
                  Email
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  bm.mutwiri@gmail.com
                </Typography>
              </div>
            </div>
            <div className="info-data-wrapper">
              <div>
                <Phone
                  className="info-icon"
                  sx={{ width: "100%", color: "#008080b6" }}
                  fontSize="large"
                />
              </div>
              <div className="info-data">
                <Typography variant="subtitle1" fontSize="20px">
                  Phone Number
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  +254706134387
                </Typography>
              </div>
            </div>
          </div>
          <div className="info-wrapper">
            <div className="info-data-wrapper">
              <div>
                <Flag
                  className="info-icon"
                  sx={{ width: "100%", color: "#008080b6" }}
                  fontSize="large"
                />
              </div>
              <div className="info-data">
                <Typography variant="subtitle1" fontSize="20px">
                  Nationality
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  Kenyan
                </Typography>
              </div>
            </div>
            <div className="info-data-wrapper">
              <div>
                <Transgender
                  className="info-icon"
                  sx={{ width: "100%", color: "#008080b6" }}
                  fontSize="large"
                />
              </div>
              <div className="info-data">
                <Typography variant="subtitle1" fontSize="20px">
                  Gender
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  Male
                </Typography>
              </div>
            </div>
          </div>
          <div className="info-wrapper">
            <div className="info-data-wrapper">
              <div>
                <Paid
                  className="info-icon"
                  sx={{ width: "100%", color: "#008080b6" }}
                  fontSize="large"
                />
              </div>
              <div className="info-data">
                <Typography variant="subtitle1" fontSize="20px">
                  Expected Salary
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  30,000
                </Typography>
              </div>
            </div>
            <div className="info-data-wrapper">
              <div>
                <LinkedIn
                  className="info-icon"
                  sx={{ width: "100%", color: "#008080b6" }}
                  fontSize="large"
                />
              </div>
              <div className="info-data">
                <Typography variant="subtitle1" fontSize="20px">
                  Linkedin Profile
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  linkedin.me/brian_murithi
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="basic-right">
          <Avatar sx={{ width: "100px", height: "100px" }} />
          <Button variant="outlined">Change</Button>
        </div>
      </div>
    </>
  );
};

export default BasicInformation;

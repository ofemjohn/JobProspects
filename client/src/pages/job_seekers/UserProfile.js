import React, { useEffect, useState } from "react";
import "./styles.css";
import { Paper } from "@mui/material";
import BasicInformation from "../../componets/BasicInformation";
import { useAuth } from "../../auth/AuthProvider";
import Axios from "axios";
import EducationQualification from "../../componets/EducationQualification";
import EmploymentHistory from "../../componets/EmploymentHistory";

const links = [
  {
    id: 1,
    name: "Basic Information",
    component: "mycomponent",
  },
  {
    id: 2,
    name: "Educational Qualifications",
    component: "mycomponent",
  },
  {
    id: 3,
    name: "Employment History",
    component: "mycomponent",
  },
];

const UserProfile = () => {
  const { userId } = useAuth();
  const [userData, setUserData] = useState();
  const [component, setComponent] = useState("");

  useEffect(() => {
    fetchUserData();
    console.log(userData);
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const response = await Axios.get(`/api/user/${parseInt(userId)}`, {
        credentials: "include",
      });

      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle click
  useEffect(() => {
    console.log(component);
  }, [component]);
  return (
    <div className="profile-container">
      <div>MY PROFILE</div>
      <div className="profile-wrapper">
        {/* PROF */}

        <Paper className="profile-tabs" elevation={3}>
          {links.map((link, i) => (
            <span
              key={i}
              onClick={() => {
                setComponent(link.id);
              }}
              className="profile-links"
            >
              {link.name}
            </span>
          ))}
        </Paper>

        {/* BASIC INFORMATION */}
        <Paper className="profile-content" elevation={3}>
          {component === 1 ? (
            <BasicInformation userData={userData} />
          ) : component === 2 ? (
            <EducationQualification />
          ) : component === 3 ? (
            <EmploymentHistory />
          ) : (
            <BasicInformation userData={userData} />
          )}
        </Paper>
      </div>
    </div>
  );
};

export default UserProfile;

import "./App.css";
import React, { useState } from "react";
import Landing from "./pages/Landing";
import { Route, Routes } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import ModalCustom from "./componets/ModalCustom";
import RegisterPage from "./pages/companies/RegisterPage";
import CompanyDashboard from "./pages/companies/CompanyDashboard";
import CompanyJobs from "./pages/companies/CompanyJobs";
import PrivateRoute from "./auth/PrivateRoute";
import axios from "axios";
import Layout from "./componets/Layout";
import CompanyLayout from "./pages/companies/CompanyLayout";
import UserLayout from "./pages/job_seekers/UserLayout";
import UserDashboard from "./pages/job_seekers/UserDashboard";
import UserProfile from "./pages/job_seekers/UserProfile";
import UserResume from "./pages/job_seekers/UserResume";
import AppliedJobs from "./pages/job_seekers/AppliedJobs";
import UnfinishedJobs from "./pages/job_seekers/UnfinishedJobs";
import Messages from "./pages/job_seekers/Messages";
import { useAuth } from "./auth/AuthProvider";
import CreateJob from "./pages/companies/CreateJob";
import { ROLE } from "./auth/roles";
import JobSearchPage from "./pages/JobSearchPage";
import ApplicationDetail from "./pages/job_seekers/ApplicationDetail";
import JobApplications from "./pages/companies/JobApplications";
import SingleApplication from "./pages/companies/SingleApplication";

function AppWrapper() {
  const { token } = useAuth();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("user");
  const [selectedApplication, setSelectedApplication] = useState();

  // SET HEADERS
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers.post["Authorization"] = `Bearer ${token}`;
  axios.defaults.headers.get["Authorization"] = `Bearer ${token}`;

  return (
    <>
      <Routes>
        <Route element={<Layout setType={setType} setOpen={setOpen} />}>
          <Route path="/" element={<Landing />} exact />
          <Route
            path="/register_company"
            element={<RegisterPage setOpen={setOpen} setType={setType} />}
          />
          <Route
            path="/jobsearch"
            element={<JobSearchPage setOpenLogin={setOpen} setType={setType} />}
          />
        </Route>
        <Route path="*" element={<NoMatch />} />

        {/* COMPANY ROUTES */}
        <Route element={<PrivateRoute roles={[ROLE.company]} />}>
          <Route element={<CompanyLayout />}>
            <Route path="/company" element={<CompanyDashboard />} />
            <Route path="/jobs/post" element={<CreateJob />} />
            <Route path="/jobs" element={<CompanyJobs />} />
            <Route path="/candidates" element={<JobApplications />} />
            <Route
              path="/singleApplication/:id"
              element={<SingleApplication />}
            />
          </Route>
        </Route>

        {/* JOB SEEKERS ROUTES */}
        <Route element={<PrivateRoute roles={[ROLE.user]} />}>
          <Route element={<UserLayout />}>
            <Route path="/userdashboard" element={<UserDashboard />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route
              path={`/applied_jobs/:id`}
              element={
                <ApplicationDetail selectedApplication={selectedApplication} />
              }
            />
            <Route path="/resume" element={<UserResume />} />
            <Route
              path="/appliedjobs"
              element={
                <AppliedJobs setSelectedApplication={setSelectedApplication} />
              }
            />
            <Route path="/unfinishedjobs" element={<UnfinishedJobs />} />
            <Route path="/messages" element={<Messages />} />
          </Route>
        </Route>
      </Routes>

      {/* FOOTER */}
      {/* </div> */}
      {/* <div className="modal-container"> */}
      <ModalCustom
        open={open}
        setOpen={setOpen}
        type={type}
        setType={setType}
      />
    </>
  );
}

export default AppWrapper;

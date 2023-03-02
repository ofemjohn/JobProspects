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

axios.defaults.headers.post["Content-Type"] = "application/json";

function AppWrapper() {
  //   const { state } = useAuth();
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [type, setType] = useState("user");

  return (
    <>
      <Routes>
        <Route element={<Layout setType={setType} setOpen={setOpen} />}>
          <Route path="/" element={<Landing />} exact />
          <Route path="/register_company" element={<RegisterPage />} />
        </Route>
        <Route path="*" element={<NoMatch />} />

        {/* COMPANY ROUTES */}
        <Route element={<PrivateRoute />}>
          <Route element={<CompanyLayout />}>
            <Route path="/c_dashboard" element={<CompanyDashboard />} />
            <Route path="/c_jobs" element={<CompanyJobs />} />
          </Route>
        </Route>

        {/* JOB SEEKERS ROUTES */}
        <Route element={<PrivateRoute />}>
          <Route element={<UserLayout />}>
            <Route path="/user" element={<UserDashboard />} />
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

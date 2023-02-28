import "./App.css";
import React, { useState } from "react";
import Landing from "./pages/Landing";
import { Route, Routes } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import Header from "./componets/header/Header";
import ModalCustom from "./componets/ModalCustom";
import User from "./pages/job_seekers/User";
import RegisterPage from "./pages/companies/RegisterPage";
import CompanyDashboard from "./pages/companies/CompanyDashboard";
import CompanyJobs from "./pages/companies/CompanyJobs";
import PrivateRoute from "./auth/PrivateRoute";
import { useAuth } from "./auth/AuthProvider";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

function AppWrapper() {
  //   const { state } = useAuth();
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [type, setType] = useState("user");

  return (
    <>
      <Header setOpen={setOpen} setType={setType} />
      {/* <button onClick={handleOpen}>CLICK ME</button> */}
      <Routes>
        <Route path="/" element={<Landing />} exact />
        <Route path="/register_company" element={<RegisterPage />} />
        <Route path="*" element={<NoMatch />} />

        {/* COMPANY ROUTES */}
        <Route element={<PrivateRoute />}>
          <Route path="/c_dashboard" element={<CompanyDashboard />} />
          <Route path="/c_jobs" element={<CompanyJobs />} />
        </Route>

        {/* JOB SEEKERS ROUTES */}
        <Route element={<PrivateRoute />}>
          <Route path="/user" element={<User />} />
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

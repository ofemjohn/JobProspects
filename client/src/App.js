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

import { AuthProvider } from "./auth/AuthProvider";
import AppWrapper from "./AppWrapper";

function App() {
  return (
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  );
}

export default App;

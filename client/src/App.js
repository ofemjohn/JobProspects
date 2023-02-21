import "./App.css";
import React from "react";
import Landing from "./pages/Landing";
import { Route, Routes } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import Header from "./componets/header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      {/* FOOTER */}
    </div>
  );
}

export default App;

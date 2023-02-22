import "./App.css";
import React, { useState } from "react";
import Landing from "./pages/Landing";
import { Route, Routes } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import Header from "./componets/header/Header";
import ModalCustom from "./componets/ModalCustom";
import User from "./pages/job_seekers/User";

function App() {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = useState("");

  return (
    <>
      {/* <div className="App"> */}
      <Header setOpen={setOpen} setType={setType} />
      {/* <button onClick={handleOpen}>CLICK ME</button> */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/user" element={<User />} />
        <Route path="*" element={<NoMatch />} />
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

export default App;

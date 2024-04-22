import React from "react";
import Homepage from "./components/Homepage";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import "./App.css";
const App = () => {
  return (
    <>
      <Navbar />
      <div className="routes App">
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
};

export default App;

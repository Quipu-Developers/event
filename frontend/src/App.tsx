import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Start from "@/pages/Start";
import Login from "@/pages/Login";
import Search from "@/pages/Search";
import Error from "@/pages/Error";
import Register from "@/pages/Register";

function App() {
  return (
    <div className="app">
      <Router basename="/event">
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Start from "@/pages/Start";
import Login from "@/pages/Login";
import Search from "@/pages/Search";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          {/* <Route path="*" element={<Error />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
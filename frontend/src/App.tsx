import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Start from "@/pages/Start";
import Login from "@/pages/Login";
import Search from "@/pages/Search";
import Error from "@/pages/Error";
import Register from "@/pages/Register";
import Test from "@/pages/Test";
import OtherStore from "@/pages/OtherStore";

function App() {
  return (
    <div className="app">
      <Router basename="/event">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/test" element={<Test />} />
          <Route path="/start" element={<Start />} />
          <Route path="/search" element={<Search />} />
          <Route path="/otherstore" element={<OtherStore />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

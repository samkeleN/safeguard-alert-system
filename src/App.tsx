import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home";
import AboutPage from "./Components/AboutPage";
import Contact from "./Components/Contact";
import Dashboard from "./Components/Dashboard";
import SignUp from "./Components/SignUp";

const App: React.FC = () => {
  const [theme, setTheme] = useState<string>("light");

  return (
    <Router>
      <Navbar theme={theme} setTheme={setTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
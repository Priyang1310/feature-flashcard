import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RoleSelection from "./components/RoleSelection";
import UserFlashcards from "./components/UserFlashcards";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import "./App.css";

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    document.body.classList.toggle("light-theme", !isDarkTheme);
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <Router>
      <div className="theme-toggle">
        <input
          type="checkbox"
          id="theme-toggle"
          checked={isDarkTheme}
          onChange={toggleTheme}
        />
        <label htmlFor="theme-toggle"></label>
      </div>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/user" element={<UserFlashcards isDarkTheme={isDarkTheme} />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard isDarkTheme={isDarkTheme} />} />
      </Routes>
    </Router>
  );
};

export default App;

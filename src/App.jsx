import React from "react";
import { Routes, Route } from "react-router-dom";
import Assessment from "./pages/Assessment";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Assessment />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
};

export default App;
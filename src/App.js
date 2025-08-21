import React from "react";
import { Routes, Route  } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";


function App() {
  return (
    <div className="bg-white text-gray-900">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;

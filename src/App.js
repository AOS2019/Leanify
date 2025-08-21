import React from "react";
import { Routes, Route  } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <div className="bg-white text-gray-900">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;

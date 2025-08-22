import React from "react";
import { Routes, Route  } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import LearnerDashboard from "./pages/LearnerDashboard";
import TutorDashboard from "./pages/TutorDashboard";


function App() {
  return (
    <div className="bg-white text-gray-900">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Learner Dashboard */}
          <Route
            path="/learner-dashboard"
            element={
              <PrivateRoute>
                <LearnerDashboard />
              </PrivateRoute>
            } />

          {/* Protected Tutor Dashboard */}
          <Route
          path="tutor-dashboard"
          element={
            <PrivateRoute>
              <TutorDashboard />
            </PrivateRoute>
          } />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;

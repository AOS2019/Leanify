import React from "react";
import { Routes, Route  } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
// import ProtectedRoute from "./components/ProtectedRoute";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import LearnerDashboard from "./pages/LearnerDashboard";
import TutorDashboard from "./pages/TutorDashboard";
import BrowseCourses from "./pages/BrowseCourses";
import Pricing from "./pages/Pricing";


function App() {
  return (
    <div className="bg-white text-gray-900">
      <UserProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />

            {/* Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

             {/* Public marketing pages */}
            <Route path="/courses" element={<BrowseCourses />} />
            <Route path="/pricing" element={<Pricing />} />

            {/* Protected Learner Dashboard */}
            <Route
              path="/learner-dashboard"
              element={
                <PrivateRoute role="learner">
                  <LearnerDashboard />
                </PrivateRoute>
              } />

            {/* Protected Tutor Dashboard */}
            <Route
            path="tutor-dashboard"
            element={
              <PrivateRoute role="tutor">
                <TutorDashboard />
              </PrivateRoute>
            } />
          </Routes>
        </AuthProvider>
      </UserProvider>  
    </div>
  );
}

export default App;

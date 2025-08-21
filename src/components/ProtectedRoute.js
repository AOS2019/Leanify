import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="animate-pulse text-gray-600">Checking your session…</p>
      </div>
    );
  }

  if (!user) {
    // Redirect to login, keep where user tried to go
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

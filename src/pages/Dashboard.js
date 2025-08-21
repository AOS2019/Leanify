import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50 p-6">
        <nav className="p-4 bg-indigo-600 text-white flex justify-between">
            <div className="flex gap-4">
                <Link to="/dashboard">Dashboard</Link>
            </div>
            <div className="flex gap-4">
                {!user ? (
                <>
                    <Link to="/login" className="underline">Login</Link>
                    <Link to="/register" className="underline">Register</Link>
                </>
                ) : (
                <button onClick={logout} className="underline">Logout</button>
                )}
            </div>
        </nav>
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
            <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-600 mb-6">
                Welcome,{user?.displayName ? `, ${user.displayName}` : ""}! <br />
                <span className="text-sm text-gray-500">({user?.email})</span>
            </p>
            {user?.photoURL && (
                <img
                src={user.photoURL}
                alt="Profile"
                className="w-20 h-20 rounded-full mb-4"
                />
            )}
            <button
            onClick={logout}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
            >
            Logout
            </button>
        </div>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { motion } from "framer-motion";
import { User, LogOut, Settings } from "lucide-react";

export default function ProfileMenu({ userName }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg shadow hover:bg-gray-200"
      >
        <User className="w-5 h-5" />
        {/* <span>Profile</span> */}
        {userName || "Profile"}
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200"
        >
          <button
            className="flex w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => navigate("/settings")}
          >
            <Settings className="w-4 h-4 mr-2" /> Account Settings
          </button>
          <button
            className="flex w-full px-4 py-2 text-red-600 hover:bg-gray-100"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </button>
        </motion.div>
      )}
    </div>
  );
}

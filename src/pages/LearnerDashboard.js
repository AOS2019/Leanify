import React, { useEffect, useState } from "react";
// import LogoutButton from "../components/LogoutButton";
// import { useNavigate } from "react-router-dom";
// import { signOut } from "firebase/auth";
import ProfileMenu from "../components/ProfileMenu";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import ProfileCard from "../components/ProfileCard";

export default function LearnerDashboard() {
  const [userData, setUserData] = useState(null);
  // const [name, setName] = useState("");
  // const navigate = useNavigate();


  useEffect(() => {
    const fetchUser = async () => {
      if (auth.currentUser) {
        const ref = doc(db, "users", auth.currentUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setUserData(snap.data());
        }
      }
    };
    fetchUser();
  }, []);

  // const handleLogout = async () => {
  //   await signOut(auth);
  //   navigate("/signin");
  // };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      {/* <header className="flex justify-between items-center p-4 bg-white shadow"> */}
      <div className="w-full max-w-md">
        {userData && <ProfileCard userData={userData} setUserData={setUserData} />}
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          Welcome, {userData?.name || "Learner"} 👋 {/* 🎓 Learner Dashboard */}
        </h1>
        
        <ProfileMenu />
      </div>
      {/* </header> */}
      <main className="p-6">
        <p className="text-lg text-gray-700">
          Welcome! Here you can browse courses, track progress, and continue learning.
        </p>
      </main>

      {/* <LogoutButton /> */}
    </div>
  );
}

import React, { useEffect, useState } from "react";
// import LogoutButton from "../components/LogoutButton";
// import { useNavigate } from "react-router-dom";
// import { signOut } from "firebase/auth";
import ProfileMenu from "../components/ProfileMenu";
import ProfileCard from "../components/ProfileCard";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function TutorDashboard() {
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


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      {/* <header className="flex justify-between items-center p-4 bg-white shadow">     */}
      <div className="w-full max-w-md">
        {userData && <ProfileCard userData={userData} setUserData={setUserData} />}
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          Welcome, {userData?.name || "Learner"} 👋 {/* 👩🏽‍🏫 Tutor Dashboard */}
        </h1>

        <ProfileMenu />
      </div>
      {/* </header> */}
      <main className="p-6">  
        <p className="text-lg text-gray-700">
          Welcome! Here you can manage courses, view learners, and share your expertise.
        </p>
      </main>
      
      {/* <LogoutButton /> */}
    </div>
  );
}

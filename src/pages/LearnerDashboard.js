import React, { useEffect, useState } from "react";
// import LogoutButton from "../components/LogoutButton";
// import { useNavigate } from "react-router-dom";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { signOut } from "firebase/auth";
import ProfileMenu from "../components/ProfileMenu";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

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







  // const auth = getAuth();
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/auth.user
  //     if (user.role !== "learner") {
  //       signOut(auth);
  //       navigate("/login");
  //       console.log("Not Authorised!");
  //     }
  //   }
  // });
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <header className="flex justify-between items-center p-4 bg-white shadow">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
           Welcome, {userData?.name || "Learner"} 👋 {/* 🎓 Learner Dashboard */}
        </h1>

        {/* Profile Section */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left">
          <p><strong>Name:</strong> {userData?.name}</p>
          <p><strong>Email:</strong> {auth.currentUser?.email}</p>
          <p><strong>Role:</strong> {userData?.role}</p>
        </div>
        
        <ProfileMenu />
      </header>
      <main className="p-6">
        <p className="text-lg text-gray-700">
          Welcome! Here you can browse courses, track progress, and continue learning.
        </p>
      </main>

      {/* <LogoutButton /> */}
    </div>
  );
}

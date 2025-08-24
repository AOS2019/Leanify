import React, { useState } from "react";
import { motion } from "framer-motion";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, googleProvider, db } from "../firebase";
import { UserPlus, Mail } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("learner"); // Default role is learner
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/login";

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Check if user already exists in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
// REMEMBER TO RECHECK THIS
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          role, // Use selected role
          photoURL: user.photoURL,
          createdAt: new Date(),
        });
      } else {alert("User already exist, Please login")}
      alert("Registration successful! You can now log in.");
      setEmail("");
      setPassword("");

      // Update profile with displayName
      await updateProfile(userCredential.user, { displayName: name });
      setName("");

      // Save user to Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        name,
        email,
        role,
        createdAt: new Date(),
      });
      
      // after successful email/password or Google registration:
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err.message);
      setError(err.message);
      // alert(err.message);
    }
    setLoading(false);
  };

  const handleGoogleRegister = async () => {
    setError("");
    try {
      const userCred = await signInWithPopup(auth, googleProvider);
      const user = userCred.user;
      
      // Check if user already exists in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
// REMEMBER TO RECHECK THIS
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          role, // Use selected role
          photoURL: user.photoURL,
          createdAt: new Date(),
        });
      } else {alert("User already exist, Please login")}
      alert("Google registration successful!");
      // after successful email/password or Google registration:
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <div className="flex items-center gap-2 mb-6">
          <UserPlus className="text-indigo-600" />
          <h2 className="text-2xl font-bold">Register</h2>
        </div>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">

          {/* Role Tabs */}
        <div className="flex mb-4 border-b">
          <button
            type="button"
            onClick={() => setRole("learner")}
            className={`flex-1 p-2 ${
              role === "learner"
                ? "border-b-2 border-indigo-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            Learner
          </button>
          <button
            type="button"
            onClick={() => setRole("tutor")}
            className={`flex-1 p-2 ${
              role === "tutor"
                ? "border-b-2 border-indigo-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            Tutor
          </button>
        </div>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={handleGoogleRegister}
            className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Mail className="text-red-500" />
            Continue with Google
          </button>
        </div>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-semibold">
            Sign In
          </a>
        </p>
      </motion.div>
    </div>
  );
}

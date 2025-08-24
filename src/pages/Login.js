import React, { useState } from "react";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider } from "../firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "../firebase";
// import { auth } from "../firebase";
import { LogIn, Mail } from "lucide-react";
// import { useLocation, useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";

/**
 * Wrap Login to support redirecting the user back to the page they wanted
 * (i.e., /dashboard) after successful login.
 */

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("learner"); // Default role
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/dashboard";
  const navigate = useNavigate();
  // const { login, loginWithGoogle } = useAuth();
  // const { loginWithGoogle } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // await signInWithEmailAndPassword(auth, email, password);
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;

      // Get user role from Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        console.log("User Role:", userData.role);
        const role = userData.role;
        navigate(`/${role}-dashboard`);

        // Redirect based on role
        // if (userData.role === "tutor") {
        //   navigate("/tutor-dashboard");
        //   // Optionally, you can show a success message
        //   alert("User Role:", userData.role);
        //   // setEmail("");
        //   // setPassword("");
        // } else if (userData.role === "learner"){
        //   navigate("/learner-dashboard");
        //             // Optionally, you can show a success message
        //   alert("User Role:", userData.role);
        //   setEmail("");
        //   setPassword("");
        // } else {
        //   alert("Unknown role, redirecting to registration.");
        //   navigate("/register");}
        } else {
          alert("Unknown role, redirecting to registration.");
          navigate("/register");}
      // after successful email/password or Google login:
      // navigate(from, { replace: true });
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // alert("Google login successful!");
      // await loginWithGoogle();
      //  const result = await loginWithGoogle();
       const user = result.user;
      
      // Get user role from Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        console.log("User Role:", userData.role);
        const role = userData.role;
        navigate(`/${role}-dashboard`);

        // let userRole = role; // default from tab

        // Redirect based on role
        // if (userData.role === "tutor") {
        //   navigate("/tutor-dashboard");
        // } else if (userData.role === "learner") {
        //   navigate("/learner-dashboard");
        // } else {
        //   alert("Unknown role, redirecting to registration.");
        //   navigate("/register");
        // }
      }else {
          alert("Unknown role, redirecting to registration.");
          navigate("/register");}

    
      // after successful email/password or Google login:
      // navigate(from, { replace: true });
    } catch (err) {
      console.error(err.message);
      setError(err.message);
      // alert(err.message);
    }
  };

  // after successful email/password or Google login:
  // navigate(from, { replace: true });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <div className="flex items-center gap-2 mb-6">
          <LogIn className="text-indigo-600" />
          <h2 className="text-2xl font-bold">Sign In</h2>
        </div>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">

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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Mail className="text-red-500" />
            Continue with Google
          </button>
        </div>
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 font-semibold">
            Sign Up
          </a>
        </p>
      </motion.div>
    </div>
  );
}

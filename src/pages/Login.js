import React, { useState } from "react";
import { motion } from "framer-motion";
// import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { LogIn, Mail } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Wrap Login to support redirecting the user back to the page they wanted
 * (i.e., /dashboard) after successful login.
 */

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/dashboard";
  // const { login, loginWithGoogle } = useAuth();
  const { loginWithGoogle } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      setEmail("");
      setPassword("");
      // after successful email/password or Google login:
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      // await signInWithPopup(auth, googleProvider);
      // alert("Google login successful!");
      await loginWithGoogle();
      // after successful email/password or Google login:
      navigate(from, { replace: true });
    } catch (err) {
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
          <h2 className="text-2xl font-bold">Login</h2>
        </div>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
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
      </motion.div>
    </div>
  );
}

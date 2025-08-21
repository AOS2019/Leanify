import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PlayCircle, Star, Users, CheckCircle } from "lucide-react";

function ProgressBar({ percentage }) {
  // Ensure percentage is between 0 and 100
  const progress = Math.max(0, Math.min(100, percentage));

  return (
    <div className="w-full max-w-lg mx-auto rounded-lg flex items-center">
      <div className="w-full bg-gray-200 ml-4 h-4 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-indigo-500 rounded-full flex items-center justify-center text-white md:px-4"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {progress > 5 ? `${progress.toFixed(0)}%` : ''} {/* Show percentage only if enough space */}
        </motion.div>
      </div>

      <div className="ml-4 text-gray-700 text-md">
        {progress.toFixed(0)}%
      </div>

      {progress === 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-4 text-green-600"
        >
          <CheckCircle size={48} />
        </motion.div>
      )}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="bg-gray-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto items-center gap-10 px-4 py-16 grid md:grid-cols-2  md:gap-12 md:px-6 md:py-20">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Learn Anywhere, <span className="text-indigo-600">Build Real Skills</span>
          </h1>
          <p className="max-w-prose text-muted-foreground md:text-lg mb-6">
            Master coding, design, and business skills with hands-on courses
            designed for mobile learners.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/register"><button className="bg-indigo-600 text-white px-6 py-3 rounded-lg">
              Get Started Free
            </button></ Link>
            <Link to="/"><button className="flex items-center gap-2 border border-indigo-600 px-6 py-3 rounded-lg">
              <PlayCircle size={18} /> Watch Demo
            </button></Link>
          </div>
          <div className="flex items-center gap-6 pt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><Star className="h-4 w-4" /> 4.8/5 average rating</span>
            <span className="flex items-center gap-2"><Users className="h-4 w-4" /> 20k+ learners</span>
          </div>
        </motion.div>

        {/* Image card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white shadow-lg rounded-xl p-6"
        >
          <div className="relative space-y-3">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/10 via-transparent to-primary/10 blur-2xl" />
            <h3 className="font-semibold mb-3">Today's Learning Plan</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span>Semantic HTML</span> <span className="text-gray-500 w-full max-w-md"><ProgressBar percentage={70} /></span>
              </li>
              <li className="flex justify-between">
                <span>Flexbox & Grid</span> <span className="text-gray-500 w-full max-w-md"><ProgressBar percentage={40} /></span>
              </li>
              <li className="flex justify-between">
                <span>JS Variables</span> <span className="text-gray-500 w-full max-w-md"><ProgressBar percentage={10} /></span>
              </li>
            </ul>
            <div className="space-y-3 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Keep a 7‑day streak!</div>
              <Link to="/"><button size="sm" className="bg-gray-400 text-indigo-500 px-6 py-3 rounded-lg">Continue</button></Link>
            </div>
        </div>
        </motion.div>
      </div>
    </section>
  );
}

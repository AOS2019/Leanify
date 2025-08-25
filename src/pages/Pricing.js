import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PLANS = [
  {
    id: "free",
    name: "Starter",
    monthly: 0,
    yearly: 0,
    highlight: false,
    features: [
      "Access to 5 free courses",
      "Community Q&A",
      "Basic progress tracking",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 1500,
    yearly: 14400, // 20% off (12*15=180 → 144)
    highlight: true,
    features: [
      "All free features",
      "Unlimited courses",
      "Downloadable resources",
      "Certificates of completion",
      "Priority support",
    ],
  },
  {
    id: "teams",
    name: "Teams",
    monthly: 4900,
    yearly: 46800, // 20% off (12*49=588 → 468)
    highlight: false,
    features: [
      "Everything in Pro",
      "Team dashboards",
      "Seat management",
      "Private cohorts",
      "SLA support",
    ],
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Simple, transparent pricing</h1>
            <p className="mt-3 text-gray-600">Choose a plan that grows with your learning.</p>

            {/* Toggle */}
            <div className="mt-6 inline-flex items-center gap-3 bg-white rounded-full p-1 shadow">
              <button
                onClick={() => setYearly(false)}
                className={`px-4 py-2 rounded-full ${!yearly ? "bg-blue-600 text-white" : ""}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setYearly(true)}
                className={`px-4 py-2 rounded-full ${yearly ? "bg-blue-600 text-white" : ""}`}
              >
                Yearly <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Save 20%</span>
              </button>
            </div>
          </div>

          {/* Plans */}
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {PLANS.map((p) => {
              const price = yearly ? p.yearly : p.monthly;
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-2xl border bg-white p-6 shadow-sm ${
                    p.highlight ? "ring-2 ring-blue-600" : ""
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xl font-semibold">{p.name}</h3>
                    {p.highlight && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <div className="mt-4">
                    {price === 0 ? (
                      <p className="text-4xl font-bold">Free</p>
                    ) : (
                      <p className="text-4xl font-bold">
                        ₦{price}
                        <span className="text-base text-gray-500 font-normal">
                          /{yearly ? "yr" : "mo"}
                        </span>
                      </p>
                    )}
                  </div>

                  <ul className="mt-6 space-y-3">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-5 h-5 mt-0.5 text-green-600" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={p.id === "free" ? "/register" : "/register"}
                    className={`mt-6 block text-center w-full py-2 rounded-xl ${
                      p.highlight
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-900 text-white hover:bg-black"
                    }`}
                  >
                    {p.id === "free" ? "Get Started" : "Start Pro"}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            Prices in NGN. VAT/taxes may apply at checkout.
          </p>
        </div>
      </div>
      <Footer />
    </>  
  );
}

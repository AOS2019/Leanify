import React from "react";
import { BrowserRouter, Routes, Route } from "react-route-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Courses from "./components/Courses";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-white text-gray-900">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      <Navbar />
      <Hero />
      <Features />
      <Courses />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;

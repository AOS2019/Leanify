import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Courses from "../components/Courses";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function HomePage() {
    return(
        <>
            <Navbar />
            <Hero />
            <Features />
            <Courses />
            <Testimonials />
            <CTA />
            <Footer />
        </>
    );
}
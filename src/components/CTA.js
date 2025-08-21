import React from "react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="bg-indigo-600 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute -inset-16 -z-10 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-3xl" />
            <div>
              <code className="bg-gray-300 text-indigo-600 p-2 ml-3 rounded-2xl">Get started free</code>
              <p className="text-2xl md:text-3xl mb-4">Your first week is on us</p>
              <p className="mb-2">Access any course, track your progress, and join our community rooms.</p>
            </div>
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row">
              <div className="mb-10 text-sm">No credit card required • Cancel anytime</div>
              <div className="flex w-full gap-2 sm:w-auto">
                <Link to="/register"><button className="bg-white text-indigo-600 px-6 py-3 rounded-lg w-full sm:w-auto">Create free account</button></Link>
                <Link to="/"><button className="border border-white px-6 py-3 rounded-lg w-full sm:w-auto">See pricing</button></Link>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}

import React from "react";

export default function CTA() {
  return (
    <section className="py-16 bg-indigo-600 text-white text-center">
      <h2 className="text-3xl font-bold mb-4">Start Learning Today</h2>
      <p className="mb-6">Your first week is free. No credit card required.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg">Create Free Account</button>
        <button className="border border-white px-6 py-3 rounded-lg">See Pricing</button>
      </div>
    </section>
  );
}

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-white font-bold mb-2">Learnify</h3>
          <p className="text-sm">Practical, mobile-first courses to level up your career.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Company</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="./company/About">About</a></li>
            <li><a href="./company/Blog">Blog</a></li>
            <li><a href="./company/Careers">Careers</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Support</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="./support/Help">Help Center</a></li>
            <li><a href="./support/Contact">Contact</a></li>
            <li><a href="./support/Terms">Terms & Privacy</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-6 text-center text-xs border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Learnify. All rights reserved.
      </div>
    </footer>
  );
}

import React from "react";
import { GraduationCap } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-gray-900 text-gray-400 py-8">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gray-100">
                <GraduationCap className="text-indigo-600 h-5 w-5" />
              </div>
              <span className="text-lg font-semibold tracking-tight">Learnify</span>
            </div>
            <p className="max-w-xs text-sm">
              Practical, mobile‑first courses to level up your career.
            </p>
          </div>


          <div>
            <h4 className="mb-3 font-semibold">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/courses">Browse Courses</a></li>
              <li><a href="/pricing">Pricing</a></li>
              <li><a href="/">Certificates</a></li>
            </ul>
          </div>


            <div>
              <h4 className="mb-3 font-semibold">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/">About</a></li>
                <li><a href="/">Blog</a></li>
                <li><a href="/">Careers</a></li>
              </ul>
            </div>


            <div>
              <h4 className="mb-3 font-semibold">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/">Help Center</a></li>
                <li><a href="/">Contact</a></li>
                <li><a href="/">Terms & Privacy</a></li>
              </ul>
            </div>
          </div>


            <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs sm:flex-row">
              <p>© {new Date().getFullYear()} Learnify. All rights reserved.</p>
              <p>Made with ❤️ for learners everywhere.</p>
            </div>
          </div>
    </footer>
  );
}

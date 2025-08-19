import React, { useState } from "react";
import { Menu, X, GraduationCap } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="hadow-md sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:px-6">
        <a href="./"  className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10">
            <GraduationCap className="text-indigo-600 h-5 w-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">Learnify</span>
        </a>
        <div className="hidden items-center gap-6 md:flex">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground">Features</a>
          <a href="#courses" className="text-sm text-muted-foreground hover:text-foreground">Courses</a>
          <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground">Testimonials</a>
          <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button className="border px-6 py-3 rounded-lg">Sign in</button>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg">Get Started</button>
        </div>

        {/* Mobile menu */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-gray-50 p-4 space-y-2">
          <a href="#features" className="block">Features</a>
          <a href="#courses" className="block">Courses</a>
          <a href="#testimonials" className="block">Testimonials</a>
          <a href="#faqs" className="block">FAQs</a>
          <div className="mt-4 flex gap-2">
            <button className="border px-6 py-3 rounded-lg w-full">Sign in</button>
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg w-full">Get Started</button>
          </div>
        </div>
      )}
    </nav>
  );
}

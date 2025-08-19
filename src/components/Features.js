import React from "react";
import { BookOpen, Users, Trophy, Search } from "lucide-react";

const features = [
  {
    icon: <BookOpen className="h-5 w-5 text-indigo-600" size={24} />,
    title: "Bite-size Lessons",
    text: "Learn in short 5–10 minute videos designed for mobile."
  },
  {
    icon: <Trophy className="h-5 w-5 text-indigo-600" size={24} />,
    title: "Projects that Matter",
    text: "Build portfolio-ready projects and earn certificates."
  },
  {
    icon: <Users className="h-5 w-5 text-indigo-600" size={24} />,
    title: "Mentor Support",
    text: "Ask questions and get feedback from real mentors."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-16 border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h6 className="mb-3">Why Learnify</h6>
          <h2 className="text-2xl font-bold tracking-tight md:text-4xl">Built for mobile. Powered by community.</h2>
          <p className="mt-3 text-muted-foreground md:text-lg">Everything you need to go from curious to capable, right from your phone.</p>
        </div>

        <div className="mt-10 mb-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div key={i} className="bg-gray-100 p-6 rounded-2xl shadow-sm text-center">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">{f.icon}</div>
              <h3 className="font-semibold mb-2 text-lg">{f.title}</h3>
              <p className="text-gray-600 text-sm">{f.text}</p>
            </div>
          ))}
        </div>

        {/* Search bar */}
        <div className="mt-10">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input className="bg-gray-200 h-11 pl-9 rounded-lg" placeholder="Search courses e.g. Python, UI Design" />
            </div>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg sm:w-auto">Search</button>
          </div>
        </div>
      </div>
    </section>
  );
}

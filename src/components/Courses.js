import React from "react";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const courses = [
  { id: 1, 
    title: "Intro to HTML & CSS", 
    instructor: "Ada Lovelace", 
    rating: 4.8, 
    students: 1200, 
    hours: 6, 
    level: "Beginner", 
    thumbnail: "data:image/svg+xml;utf8,\
      <svg xmlns='http://www.w3.org/2000/svg' width='640' height='360'>\
        <rect width='100%' height='100%' fill='%23ecfeff'/>\
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%230e7490'>HTML</text>\
      </svg>", },
  { id: 2, title: "JavaScript From Scratch", instructor: "Grace Hopper", rating: 4.9, students: 1800, hours: 10, level: "Beginner", thumbnail: "data:image/svg+xml;utf8,\
      <svg xmlns='http://www.w3.org/2000/svg' width='640' height='360'>\
        <rect width='100%' height='100%' fill='%23eef2ff'/>\
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%231e40af'>HTML & CSS</text>\
      </svg>", },
  { id: 3, title: "Responsive Web Design", instructor: "Tim Berners-Lee", rating: 4.7, students: 950, hours: 7, level: "Intermediate", thumbnail: "data:image/svg+xml;utf8,\
      <svg xmlns='http://www.w3.org/2000/svg' width='640' height='360'>\
        <rect width='100%' height='100%' fill='%23f0fdf4'/>\
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%23158743'>RWD</text>\
      </svg>", },
];

export default function Courses() {
  const navigate = useNavigate();
  return (
    <section id="courses" className="bg-gray-200 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Popular Courses</h2>
            <p className="text-muted-foreground">Fresh, practical, project‑based content updated monthly.</p>
          </div>
          <button 
          className="bg-white text-indigo-500 border px-4 py-2 rounded-lg"
          onClick={() => navigate("/courses")}
          >Browse All</button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <div key={c.id} className="bg-white p-5 rounded-xl shadow-sm overflow-hidden rounded-2xl">
              <div className="aspect-video w-full bg-muted">
                <img src={c.thumbnail} alt={c.title} className="h-full w-full object-cover" />
              </div>
              <div className="flex items-center gap-2">
                <code className="bg-gray-100 m-3 p-1 border shadow-sm rounded-lg">{c.level}</code>
              </div>
              <h3 className="font-semibold line-clamp-1 text-lg mb-1">{c.title}</h3>
              <p className="line-clamp-1 text-sm text-gray-600 mb-2">By {c.instructor}</p>
              <div className="flex items-center justify-between gap-3 py-0 text-sm text-gray-500">
                <span className="flex items-center gap-1"><Star size={14} className="text-yellow-500"/> {c.rating}</span>
                <span>{c.students.toLocaleString()} students</span>
                <span>{c.hours}h</span>
              </div>
              <div className="mt-4 flex gap-2 items-center justify-between">
                <button className="flex-1 border rounded-lg py-2">Preview</button>
                <button className="flex-1 bg-indigo-600 text-white rounded-lg py-2">Enroll</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

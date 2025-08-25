import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, Clock, User, Layers } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SAMPLE_COURSES = [
  {
    id: "c1",
    title: "React for Beginners",
    category: "Web Dev",
    level: "Beginner",
    duration: "6h 30m",
    rating: 4.7,
    students: 1240,
    thumbnail: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=800",
    tutor: "Jane Doe",
    price: 0,
  },
  {
    id: "c2",
    title: "Tailwind CSS Mastery",
    category: "Design",
    level: "Intermediate",
    duration: "4h 10m",
    rating: 4.8,
    students: 890,
    thumbnail: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800",
    tutor: "Arinze Okoye",
    price: 10000,
  },
  {
    id: "c3",
    title: "Firebase for Frontend Devs",
    category: "Backend",
    level: "Intermediate",
    duration: "5h 05m",
    rating: 4.6,
    students: 560,
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800",
    tutor: "Sofia Mensah",
    price: 20000,
  },
  {
    id: "c4",
    title: "Data Visualization with D3",
    category: "Data",
    level: "Advanced",
    duration: "7h 40m",
    rating: 4.5,
    students: 320,
    thumbnail: "https://images.unsplash.com/photo-1534759846116-57968a6b9a37?q=80&w=800",
    tutor: "Kofi Boateng",
    price: 50000,
  },
];

const CATEGORIES = ["All", "Web Dev", "Design", "Backend", "Data"];

function CourseCard({ course }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
    >
      <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100">{course.category}</span>
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100">{course.level}</span>
          {course.price === 0 ? (
            <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">Free</span>
          ) : (
            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">₦{course.price}</span>
          )}
        </div>
        <h3 className="font-semibold text-lg line-clamp-2">{course.title}</h3>
        <div className="mt-2 flex items-center gap-3 text-sm text-gray-600">
          <span className="flex items-center gap-1"><Clock size={16} /> {course.duration}</span>
          <span className="flex items-center gap-1"><Star size={16} /> {course.rating}</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm text-gray-700">
          <span className="flex items-center gap-2"><User size={16} /> {course.tutor}</span>
          <span className="flex items-center gap-1"><Layers size={16} /> {course.students.toLocaleString()}</span>
        </div>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700">
          View Course
        </button>
      </div>
    </motion.div>
  );
}

export default function BrowseCourses() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");

  // const filtered = courses.filter(c =>
  //   c.title.toLowerCase().includes(search.toLowerCase())
  // );

  const filtered = useMemo(() => {
    return SAMPLE_COURSES.filter((c) => {
      const matchesQ =
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.tutor.toLowerCase().includes(query.toLowerCase()) ||
        c.category.toLowerCase().includes(query.toLowerCase());
      const matchesCat = cat === "All" || c.category === cat;
      return matchesQ && matchesCat;
    });
  }, [query, cat]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">Browse Courses</h1>
            <div className="relative">
              <input
                className="w-full md:w-80 bg-white rounded-xl border px-4 py-2 pl-10"
                placeholder="Search courses, tutors, categories…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-500" />
              {/* <input
                type="text"
                placeholder="Search courses..."
                className="border p-2 rounded w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              /> */}
            </div>
          </div>

          {/* Categories */}
          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-3 py-1 rounded-full border ${
                  cat === c ? "bg-blue-600 text-white border-blue-600" : "bg-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-center text-gray-600 py-16">
                No courses match your search.
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </>  
  );
}

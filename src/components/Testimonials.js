import React from "react";

const testimonials = [
  { name: "Samuel A.", role: "Beginner Developer", quote: "The lessons made learning on my phone super easy.", avatar: "data:image/svg+xml;utf8,\
      <svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'>\
        <rect width='100%' height='100%' fill='%23f0fdf4'/>\
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%23158743'>SA</text>\
      </svg>", },
  { name: "Zainab O.", role: "Student, UniLag", quote: "The quizzes helped me pass my exams with confidence.", avatar: "data:image/svg+xml;utf8,\
      <svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'>\
        <rect width='100%' height='100%' fill='%23f0fdf4'/>\
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%23158743'>ZO</text>\
      </svg>", },
  { name: "Chinedu I.", role: "Product Designer", quote: "Clean UI, practical content, and great mentors.", avatar: "data:image/svg+xml;utf8,\
      <svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'>\
        <rect width='100%' height='100%' fill='%23f0fdf4'/>\
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%23158743'>CI</text>\
      </svg>", },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="border-t py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h6 className="mb-3">What Our Learners Say</h6>
          <h2 className="text-2xl font-bold tracking-tight md:text-4xl">Real stories, real results</h2>
          <p className="mt-3 text-muted-foreground md:text-lg">Join thousands who are leveling up their careers with Learnify.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-gray-100 p-6 rounded-2xl shadow-sm">
              <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} />
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
              </div>
              <div>
                <p className="text-sm leading-relaxed">“{t.quote}”</p>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

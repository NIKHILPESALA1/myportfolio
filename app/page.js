'use client';
import { useState, useEffect, useRef } from "react";

export default function PortfolioHome() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(18px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeUp {
        animation: fadeUp 0.6s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const navigateTo = (page) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsTransitioning(false);
      window.scrollTo(0, 0);
    }, 250);
  };

  const NavLink = ({ page, label }) => (
    <button
      onClick={() => navigateTo(page)}
      className={`text-sm transition-colors ${
        currentPage === page
          ? "text-gray-900 font-semibold"
          : "text-gray-600 hover:text-gray-900"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50
        bg-white/70 backdrop-blur-xl
        border-b border-gray-200/60">
        <div className="max-w-5xl mx-auto px-8 py-5 flex justify-between items-center">
          <h1
            onClick={() => navigateTo("home")}
            className="text-xl font-semibold tracking-tight cursor-pointer"
          >
            Nikhil Pesala
          </h1>
          <div className="flex gap-8">
            <NavLink page="about" label="About" />
            <NavLink page="projects" label="Projects" />
            <NavLink page="skills" label="Skills" />
            <NavLink page="contact" label="Contact" />
          </div>
        </div>
      </nav>

      {/* PAGE */}
      <div
        className={`pt-28 transition-all duration-300 ${
          isTransitioning ? "opacity-0 translate-y-4" : "opacity-100"
        }`}
      >
        {currentPage === "home" && <Home navigateTo={navigateTo} />}
        {currentPage === "about" && <About />}
        {currentPage === "projects" && <Projects />}
        {currentPage === "skills" && <Skills />}
        {currentPage === "contact" && <Contact />}
      </div>
    </div>
  );
}

/* ---------------- HOME ---------------- */

function Home({ navigateTo }) {
  return (
    <section className="min-h-screen flex items-center px-8">
      <div className="max-w-3xl mx-auto animate-fadeUp">
        <h2 className="text-7xl font-extrabold leading-tight tracking-tight mb-6">
          Computer Science{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">
            Engineer
          </span>
        </h2>

        <p className="text-xl text-gray-600 leading-relaxed mb-10">
          B.Tech student at VIT Chennai specializing in DevOps, Cloud Architecture,
          AI/ML, and enterprise-scale systems.
        </p>

        <div className="flex gap-4 flex-wrap mb-10">
          <Social href="https://github.com/NIKHILPESALA1">GitHub</Social>
          <Social href="https://linkedin.com/in/nikhilpesala">LinkedIn</Social>
          <Social href="https://leetcode.com/u/NIKHIL_pesala/">LeetCode</Social>
        </div>

        <div className="flex gap-4">
          <a
            href="/resume.pdf"
            className="px-6 py-3 bg-gray-900 text-white rounded-lg
            hover:scale-105 transition"
          >
            Download Resume
          </a>
          <button
            onClick={() => navigateTo("contact")}
            className="px-6 py-3 border border-gray-300 rounded-lg
            hover:border-gray-900 hover:scale-105 transition"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */

function About() {
  return (
    <section className="px-8 py-28">
      <div className="max-w-4xl mx-auto animate-fadeUp">
        <h2 className="text-5xl font-bold mb-16">About Me</h2>

        <div className="bg-white/70 backdrop-blur-xl border border-gray-200/60
          rounded-2xl p-10 shadow-sm">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            B.Tech CSE student at VIT Chennai with CGPA 9.07, passionate about
            scalable systems, DevOps automation, and AI-driven platforms.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Experienced with AWS, Azure, Jenkins, Docker, Terraform, and GenAI.
            Active open-source contributor and competitive programmer.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROJECTS ---------------- */

function Projects() {
  const projects = [
    ["Automated Meeting Summarizer", "GenAI + Salesforce + Jenkins"],
    ["Advanced RAG Optimization Module", "Hybrid Retrieval, BM25, Vector DB"],
    ["Spotify Playlist Automation", "Docker + Jenkins CI/CD"],
    ["Honey Adulteration Detection", "ML Classification – 92% Accuracy"],
  ];

  return (
    <section className="px-8 py-28">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold mb-16">Projects</h2>

        <div className="grid gap-8">
          {projects.map(([title, desc], i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur-xl
              border border-gray-200/60 rounded-2xl p-8
              shadow-sm hover:shadow-xl
              transition hover:-translate-y-1 animate-fadeUp"
            >
              <h3 className="text-2xl font-semibold mb-3">{title}</h3>
              <p className="text-gray-700">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SKILLS ---------------- */

function Skills() {
  const skills = [
    "Java", "Python", "AWS", "Azure", "Docker", "Jenkins",
    "Terraform", "GenAI", "RAG", "Salesforce"
  ];

  return (
    <section className="px-8 py-28">
      <div className="max-w-4xl mx-auto animate-fadeUp">
        <h2 className="text-5xl font-bold mb-16">Skills</h2>

        <div className="bg-white/70 backdrop-blur-xl border border-gray-200/60
          rounded-2xl p-10 shadow-sm flex flex-wrap gap-3">
          {skills.map((s) => (
            <span key={s} className="px-4 py-2 bg-gray-100 rounded-full border">
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */

function Contact() {
  return (
    <section className="px-8 py-28">
      <div className="max-w-2xl mx-auto animate-fadeUp">
        <h2 className="text-5xl font-bold mb-12">Get In Touch</h2>

        <div className="bg-white/70 backdrop-blur-xl border border-gray-200/60
          rounded-2xl p-10 shadow-sm">
          <p className="text-lg mb-6">
            📧 nikhilpesala4@gmail.com
          </p>
          <p className="text-lg mb-6">
            📍 Nellore, India
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- UTILS ---------------- */

function Social({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      className="px-4 py-2 border border-gray-300 rounded-lg
      hover:border-gray-900 hover:scale-105 transition"
    >
      {children}
    </a>
  );
}

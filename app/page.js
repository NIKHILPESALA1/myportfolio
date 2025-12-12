'use client';
import { useState, useEffect } from "react";

export default function PortfolioHome() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // ✅ FIXED: Inject animation CSS safely on the client
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
      @keyframes slideDown{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
      @keyframes slideRight{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
      @keyframes slideLeft{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}

      .animate-fadeIn{animation:fadeIn .6s ease-out forwards}
      .animate-slideDown{animation:slideDown .6s ease-out forwards}
      .animate-slideRight{animation:slideRight .6s ease-out forwards}
      .animate-slideLeft{animation:slideLeft .6s ease-out forwards}
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
    }, 300);
  };

  const NavLink = ({ page, label }) => (
    <button
      onClick={() => navigateTo(page)}
      className={`transition-colors ${currentPage === page ? "text-gray-900 font-semibold" : "text-gray-600 hover:text-gray-900"}`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* NAVBAR */}
      <nav className="w-full py-6 px-8 bg-white border-b border-gray-200 fixed top-0 left-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold tracking-tight cursor-pointer" onClick={() => navigateTo("home")}>
            Nikhil Pesala
          </h1>
          <div className="flex gap-8 text-sm">
            <NavLink page="about" label="About" />
            <NavLink page="projects" label="Projects" />
            <NavLink page="skills" label="Skills" />
            <NavLink page="contact" label="Contact" />
          </div>
        </div>
      </nav>

      {/* PAGE TRANSITION WRAPPER */}
      <div className={`transition-all duration-300 ${isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
        {currentPage === "home" && <HomePage navigateTo={navigateTo} />}
        {currentPage === "about" && <AboutPage />}
        {currentPage === "projects" && <ProjectsPage />}
        {currentPage === "skills" && <SkillsPage />}
        {currentPage === "contact" && <ContactPage />}
      </div>

      {/* FOOTER */}
      <footer className="py-8 px-8 border-t border-gray-200">
        <div className="max-w-3xl mx-auto text-center text-sm text-gray-600">
          <p>© 2024 Nikhil Pesala. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

//////////////////////////////////////////////////////////
//                     HOME PAGE                       //
//////////////////////////////////////////////////////////

function HomePage({ navigateTo }) {
  const SocialLink = ({ href, icon, label }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 py-2 border border-gray-300 rounded-md hover:border-gray-900 transition-all transform hover:scale-105 flex items-center gap-2"
    >
      {icon}
      {label}
    </a>
  );

  return (
    <section className="pt-32 pb-20 px-8 min-h-screen flex items-center">
      <div className="max-w-3xl mx-auto animate-fadeIn">
        <h2 className="text-6xl font-bold mb-6 leading-tight">Computer Science Engineer</h2>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          B.Tech student at VIT Chennai specializing in DevOps, Cloud Architecture, AI/ML, and Enterprise Solutions.
        </p>

        <div className="flex gap-4 mb-8 flex-wrap">
          <SocialLink href="https://github.com/NIKHILPESALA1" label="GitHub" icon={<GitHubIcon />} />
          <SocialLink href="https://linkedin.com/in/nikhilpesala" label="LinkedIn" icon={<LinkedInIcon />} />
          <SocialLink href="https://leetcode.com/u/NIKHIL_pesala/" label="LeetCode" icon={<LeetCodeIcon />} />
        </div>

        <div className="flex gap-4">
          <a
            href="/resume.pdf"
            download
            className="px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-all transform hover:scale-105 font-medium"
          >
            Download Resume
          </a>
          <button
            onClick={() => navigateTo("contact")}
            className="px-6 py-3 border border-gray-300 rounded-md hover:border-gray-900 transition-all transform hover:scale-105 font-medium"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
}

//////////////////////////////////////////////////////////
//                     ABOUT PAGE                      //
//////////////////////////////////////////////////////////

function AboutPage() {
  const certifications = ["SQL (Coursera)", "Microsoft Azure DP-900", "Agile Scrum Fundamentals", "DevOps (Oracle)"];
  const achievements = [
    "Contributed to open-source DevOps GitHub repositories",
    "Coordinated events for the Mathematics Club",
    "Active LeetCode problem solver and contest participant",
    "Active contributor to academic projects"
  ];

  return (
    <section className="pt-32 pb-20 px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 animate-slideDown">About Me</h2>

        <div className="grid md:grid-cols-4 gap-12 items-start">
          {/* PROFILE BOX */}
          <div className="md:col-span-1 animate-slideRight">
            <div className="w-48 h-48 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
              <UserIcon />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold">Nikhil Pesala</h3>
              <p className="text-sm text-gray-600">DevOps & Cloud Engineer</p>
              <p className="text-xs text-gray-500 mt-1">Nellore, India</p>
            </div>
          </div>

          {/* ABOUT CONTENT */}
          <div className="md:col-span-3 space-y-6 animate-slideLeft">
            <p className="text-lg text-gray-700 leading-relaxed">
              B.Tech Computer Science Engineering student at VIT Chennai with CGPA 9.07/10.0. Passionate about building scalable systems and automating workflows.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Experienced in DevOps, cloud platforms (AWS, Azure), and Salesforce. Contributor to open-source DevOps projects and active LeetCode participant.
            </p>

            {/* Education */}
            <SectionHeading title="Education" />
            <TimelineItem title="B.Tech in Computer Science" place="VIT Chennai • 2022 - 2026" detail="CGPA: 9.07/10.0" bold />

            <TimelineItem title="Class XI–XII" place="Narayana Junior College • 2020 - 2022" detail="93.5%" />
            <TimelineItem title="Class X" place="Narayana Concept School • 2019 - 2020" detail="98.3%" />

            {/* Certifications */}
            <SectionHeading title="Certifications" />
            <div className="grid grid-cols-2 gap-3">{certifications.map((c, i) => <Pill key={i} label={c} />)}</div>

            {/* Achievements */}
            <SectionHeading title="Achievements" />
            <ul className="space-y-3">{achievements.map((a, i) => <ListItem key={i} text={a} />)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}

//////////////////////////////////////////////////////////
//                     PROJECTS PAGE                    //
//////////////////////////////////////////////////////////

function ProjectsPage() {
  const projects = [
    {
      title: "Automated Meeting Summarizer",
      desc: "GenAI pipeline for meeting transcription and summarization. CI/CD with Jenkins and GitHub. Automated Salesforce integration.",
      tags: ["GenAI", "Salesforce", "Jenkins", "GitHub"],
      impact: "40% efficiency gain",
    },
    {
      title: "Advanced RAG Optimization Module",
      desc: "Upgraded Naive RAG → Advanced hybrid RAG using Vector + BM25, reranking, chunk compression.",
      tags: ["Python", "ChromaDB", "BM25", "LLMs", "RAG"],
      impact: "Modular architecture",
    },
    {
      title: "Spotify Playlist Automation",
      desc: "Automated playlist updates using Docker, Jenkins, and PowerShell.",
      tags: ["Docker", "Jenkins", "Spotify API"],
      impact: "Daily automation",
    },
    {
      title: "Honey Adulteration Detection",
      desc: "ML models (LDA, KNN) with 92% accuracy and automated preprocessing pipeline.",
      tags: ["Python", "ML", "LDA", "KNN"],
      impact: "92% accuracy",
    },
    {
      title: "AWS Infra Automation (Terraform)",
      desc: "IaC deployment of EC2, VPC, subnet and Apache server using Terraform.",
      tags: ["AWS", "Terraform", "EC2", "IaC"],
      impact: "Automated deployment",
    },
  ];

  return (
    <section className="pt-32 pb-20 px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 animate-slideDown">Projects</h2>

        <div className="space-y-8">
          {projects.map((p, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fadeIn"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-semibold">{p.title}</h3>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-semibold">{p.impact}</span>
              </div>

              <p className="text-gray-700 mb-4">{p.desc}</p>

              <div className="flex flex-wrap gap-2">
                {p.tags.map((t, j) => (
                  <span key={j} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

//////////////////////////////////////////////////////////
//                     SKILLS PAGE                      //
//////////////////////////////////////////////////////////

function SkillsPage() {
  const techSkills = [
    { cat: "Programming", skills: ["Java", "Python", "MySQL", "SQL"] },
    { cat: "Cloud & Infra", skills: ["AWS", "Lambda", "EC2", "Terraform", "Azure"] },
    { cat: "DevOps & CI/CD", skills: ["Docker", "Jenkins", "Prometheus", "Grafana"] },
    { cat: "AI & ML", skills: ["RAG", "GenAI", "NLP", "LLMs"] },
    { cat: "Enterprise", skills: ["Salesforce", "Apex", "Lightning"] },
    { cat: "Tools", skills: ["BM25", "ChromaDB", "Git", "REST APIs"] },
  ];

  const softSkills = ["Problem Solving", "Teamwork", "Communication", "Adaptability", "Time Management"];

  return (
    <section className="pt-32 pb-20 px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 animate-slideDown">Skills</h2>

        {/* Technical Skills */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {techSkills.map((g, i) => (
            <div
              key={i}
              className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 animate-fadeIn"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <h3 className="text-xl font-semibold mb-4">{g.cat}</h3>
              <div className="flex flex-wrap gap-2">
                {g.skills.map((s, j) => (
                  <span key={j} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Soft Skills */}
        <div className="animate-fadeIn" style={{ animationDelay: "700ms" }}>
          <h3 className="text-2xl font-semibold mb-6">Soft Skills</h3>
          <div className="p-8 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex flex-wrap gap-3">
              {softSkills.map((s, i) => (
                <span key={i} className="px-4 py-2 text-blue-900 bg-blue-100 rounded-full border border-blue-300 font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

//////////////////////////////////////////////////////////
//                     CONTACT PAGE                     //
//////////////////////////////////////////////////////////

function ContactPage() {
  return (
    <section className="pt-32 pb-20 px-8 min-h-screen flex items-center">
      <div className="max-w-2xl mx-auto w-full">
        <h2 className="text-4xl font-bold mb-8 animate-slideDown">Get In Touch</h2>

        <div className="bg-white border border-gray-200 rounded-lg p-10 shadow-sm animate-fadeIn">

          <p className="text-lg text-gray-700 mb-8">
            I'm open to internship opportunities and would love to contribute to your team!
          </p>

          <ContactItem icon={<MailIcon />} label="Email" value="nikhilpesala4@gmail.com" link="mailto:nikhilpesala4@gmail.com" />
          <ContactItem icon={<PhoneIcon />} label="Phone" value="+91 72072 50539" link="tel:+917207250539" />
          <ContactItem icon={<LocationIcon />} label="Location" value="Nellore, India" />

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">Connect with me:</p>
            <div className="flex gap-4">
              <SocialBtn label="GitHub" href="https://github.com/NIKHILPESALA1" bg="bg-gray-900" />
              <SocialBtn label="LinkedIn" href="https://linkedin.com/in/nikhilpesala" bg="bg-blue-600" />
              <SocialBtn label="LeetCode" href="https://leetcode.com/u/NIKHIL_pesala/" bg="bg-orange-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

//////////////////////////////////////////////////////////
//                 SMALL REUSABLE COMPONENTS            //
//////////////////////////////////////////////////////////

function SectionHeading({ title }) {
  return <h3 className="text-2xl font-semibold mb-6 pt-8 border-t border-gray-200">{title}</h3>;
}

function TimelineItem({ title, place, detail, bold }) {
  return (
    <div className="border-l-4 border-gray-400 pl-6 mb-6">
      <h4 className="text-xl font-semibold">{title}</h4>
      <p className="text-gray-600">{place}</p>
      <p className={`font-semibold ${bold ? "text-gray-900" : "text-gray-700"}`}>{detail}</p>
    </div>
  );
}

function Pill({ label }) {
  return <div className="px-4 py-2 bg-gray-100 rounded-lg border text-center text-sm font-medium">{label}</div>;
}

function ListItem({ text }) {
  return (
    <li className="flex gap-3">
      <span className="text-gray-900 mt-1">•</span>
      <span>{text}</span>
    </li>
  );
}

function ContactItem({ icon, label, value, link }) {
  return (
    <div className="flex items-center gap-4 group mb-6">
      <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        {link ? (
          <a href={link} className="text-lg text-gray-900 hover:underline font-medium">{value}</a>
        ) : (
          <p className="text-lg text-gray-900 font-medium">{value}</p>
        )}
      </div>
    </div>
  );
}

function SocialBtn({ label, href, bg }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`px-4 py-2 ${bg} text-white rounded-md hover:opacity-90 transition-all transform hover:scale-105 text-sm font-medium`}
    >
      {label}
    </a>
  );
}

//////////////////////////////////////////////////////////
//                       ICONS                          //
//////////////////////////////////////////////////////////

function GitHubIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387..." />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14..." />
    </svg>
  );
}

function LeetCodeIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438..." />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="w-20 h-20 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 12c2.21 0 4-1.79 4-4..." />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89..." />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28..." />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657..." />
    </svg>
  );
}

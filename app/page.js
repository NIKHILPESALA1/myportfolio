'use client';
import { useState } from "react";

export default function PortfolioHome() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isTransitioning, setIsTransitioning] = useState(false);

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

      <div className={`transition-all duration-300 ${isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
        {currentPage === "home" && <HomePage navigateTo={navigateTo} />}
        {currentPage === "about" && <AboutPage />}
        {currentPage === "projects" && <ProjectsPage />}
        {currentPage === "skills" && <SkillsPage />}
        {currentPage === "contact" && <ContactPage />}
      </div>

      <footer className="py-8 px-8 border-t border-gray-200">
        <div className="max-w-3xl mx-auto text-center text-sm text-gray-600">
          <p>© 2024 Nikhil Pesala. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function HomePage({ navigateTo }) {
  const SocialLink = ({ href, icon, label }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" 
       className="px-4 py-2 border border-gray-300 rounded-md hover:border-gray-900 transition-all transform hover:scale-105 flex items-center gap-2">
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
          <SocialLink href="https://github.com/NIKHILPESALA1" label="GitHub"
            icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>} />
          <SocialLink href="https://linkedin.com/in/nikhilpesala" label="LinkedIn"
            icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>} />
          <SocialLink href="https://leetcode.com/u/NIKHIL_pesala/" label="LeetCode"
            icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg>} />
        </div>

        <div className="flex gap-4">
          <a href="/resume.pdf" download className="px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-all transform hover:scale-105 font-medium">
            Download Resume
          </a>
          <button onClick={() => navigateTo("contact")} className="px-6 py-3 border border-gray-300 rounded-md hover:border-gray-900 transition-all transform hover:scale-105 font-medium">
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
}

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
          <div className="md:col-span-1 animate-slideRight">
            <div className="w-48 h-48 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
              <svg className="w-20 h-20 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold">Nikhil Pesala</h3>
              <p className="text-sm text-gray-600">DevOps & Cloud Engineer</p>
              <p className="text-xs text-gray-500 mt-1">Nellore, India</p>
            </div>
          </div>

          <div className="md:col-span-3 space-y-6 animate-slideLeft">
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>B.Tech Computer Science Engineering student at VIT Chennai with CGPA 9.07/10.0. Passionate about building scalable systems and automating workflows.</p>
              <p>Experienced in DevOps, cloud platforms (AWS, Azure), and Salesforce. Contributor to open-source DevOps repositories and active on LeetCode.</p>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-semibold mb-6">Education</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-gray-900 pl-6">
                  <h4 className="text-xl font-semibold">B.Tech in Computer Science</h4>
                  <p className="text-gray-600">VIT Chennai • 2022 - 2026</p>
                  <p className="text-gray-900 font-semibold">CGPA: 9.07/10.0</p>
                </div>
                <div className="border-l-4 border-gray-400 pl-6">
                  <h4 className="text-lg font-semibold">Class XI-XII</h4>
                  <p className="text-gray-600">Narayana Junior College • 2020 - 2022</p>
                  <p className="text-gray-900 font-semibold">93.5%</p>
                </div>
                <div className="border-l-4 border-gray-400 pl-6">
                  <h4 className="text-lg font-semibold">Class X</h4>
                  <p className="text-gray-600">Narayana Concept School • 2019 - 2020</p>
                  <p className="text-gray-900 font-semibold">98.3%</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-semibold mb-6">Certifications</h3>
              <div className="grid grid-cols-2 gap-3">
                {certifications.map((cert, i) => (
                  <div key={i} className="px-4 py-2 bg-gray-100 rounded-lg border border-gray-200 text-center text-sm font-medium">{cert}</div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-semibold mb-6">Achievements</h3>
              <ul className="space-y-3 text-gray-700">
                {achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-gray-900 mt-1">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsPage() {
  const projects = [
    {
      title: "Automated Meeting Summarizer",
      desc: "GenAI pipeline for meeting transcription and summarization. CI/CD with Jenkins and GitHub. Automated Salesforce integration. 40% efficiency improvement.",
      tags: ["GenAI", "Salesforce", "Jenkins", "GitHub"],
      impact: "40% efficiency gain"
    },
    {
      title: "Advanced RAG Optimization Module",
      desc: "Plug-and-play module upgrading Naive RAG to Advanced RAG. Hybrid retrieval (Vector + BM25), reranking, chunk compression, hallucination reduction.",
      tags: ["Python", "ChromaDB", "BM25", "LLMs", "RAG"],
      impact: "Modular architecture"
    },
    {
      title: "Spotify Playlist Automation",
      desc: "Daily automated playlist updates with Docker and Jenkins. PowerShell script for fetching latest songs from selected artists.",
      tags: ["Docker", "Jenkins", "Spotify API"],
      impact: "Daily automation"
    },
    {
      title: "Honey Adulteration Detection",
      desc: "ML models (LDA, KNN) with 92% accuracy. Reduced manual testing by 60% through automated preprocessing and classification.",
      tags: ["Python", "ML", "LDA", "KNN"],
      impact: "92% accuracy"
    },
    {
      title: "AWS Infrastructure (Terraform)",
      desc: "IaC deployment of Ubuntu/Apache2 on AWS. Created VPC, subnet, and EC2 instance with Terraform best practices.",
      tags: ["AWS", "Terraform", "EC2", "IaC"],
      impact: "Automated deployment"
    }
  ];

  return (
    <section className="pt-32 pb-20 px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 animate-slideDown">Projects</h2>
        <div className="space-y-8">
          {projects.map((p, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fadeIn" style={{animationDelay: `${i*100}ms`}}>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-semibold">{p.title}</h3>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-semibold">{p.impact}</span>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((tag, j) => (
                  <span key={j} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-200">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsPage() {
  const techSkills = [
    {cat: "Programming", skills: ["Java", "Python", "MySQL", "SQL"]},
    {cat: "Cloud & Infrastructure", skills: ["AWS (S3, Lambda, EC2)", "Terraform", "Azure"]},
    {cat: "DevOps & CI/CD", skills: ["Docker", "Jenkins", "Prometheus", "Grafana"]},
    {cat: "AI & ML", skills: ["RAG", "GenAI", "NLP", "LLMs"]},
    {cat: "Enterprise", skills: ["Salesforce", "Apex", "Lightning"]},
    {cat: "Tools", skills: ["ChromaDB", "BM25", "Git", "REST APIs"]}
  ];
  const softSkills = ["Problem Solving", "Teamwork", "Communication", "Adaptability", "Time Management"];

  return (
    <section className="pt-32 pb-20 px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 animate-slideDown">Technical Skills</h2>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {techSkills.map((g, i) => (
            <div key={i} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fadeIn" style={{animationDelay: `${i*100}ms`}}>
              <h3 className="text-xl font-semibold mb-4">{g.cat}</h3>
              <div className="flex flex-wrap gap-2">
                {g.skills.map((s, j) => (
                  <span key={j} className="px-3 py-1 bg-white text-gray-700 text-sm rounded-full border border-gray-300 hover:border-gray-900 transition-colors">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="animate-fadeIn" style={{animationDelay: "600ms"}}>
          <h3 className="text-2xl font-semibold mb-6">Soft Skills</h3>
          <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-lg p-8">
            <div className="flex flex-wrap gap-3">
              {softSkills.map((s, i) => (
                <span key={i} className="px-4 py-2 bg-blue-100 text-blue-900 text-sm rounded-full border border-blue-300 font-medium">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <section className="pt-32 pb-20 px-8 min-h-screen flex items-center">
      <div className="max-w-2xl mx-auto w-full">
        <h2 className="text-4xl font-bold mb-8 animate-slideDown">Get In Touch</h2>
        <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-10 animate-fadeIn">
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            I'm open to internship opportunities and would love to discuss how I can contribute to your team!
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <a href="mailto:nikhilpesala4@gmail.com" className="text-lg text-gray-900 hover:underline font-medium">nikhilpesala4@gmail.com</a>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <a href="tel:+917207250539" className="text-lg text-gray-900 hover:underline font-medium">+91 72072 50539</a>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="text-lg text-gray-900 font-medium">Nellore, India</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">Connect with me:</p>
            <div className="flex gap-4">
              <a href="https://github.com/NIKHILPESALA1" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-all transform hover:scale-105 text-sm font-medium">GitHub</a>
              <a href="https://linkedin.com/in/nikhilpesala" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all transform hover:scale-105 text-sm font-medium">LinkedIn</a>
              <a href="https://leetcode.com/u/NIKHIL_pesala/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-all transform hover:scale-105 text-sm font-medium">LeetCode</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const style = document.createElement('style');
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
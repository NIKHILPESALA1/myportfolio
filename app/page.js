'use client';
import { useState, useEffect, useRef } from "react";

/**
 * Full portfolio page with expanded About, Projects, Skills, Contact
 * and the upgraded draggable ChatAssistant integrated.
 *
 * Paste this whole file into your Next.js page (e.g. app/page.jsx) and it should run.
 * Make sure Tailwind CSS is enabled in your project for the classes to work.
 */

export default function PortfolioHome() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Inject custom keyframe animations + typing dots CSS (client-side only)
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = 
      @keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
      @keyframes slideDown{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
      @keyframes slideRight{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
      @keyframes slideLeft{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}

      .animate-fadeIn{animation:fadeIn .6s ease-out forwards}
      .animate-slideDown{animation:slideDown .6s ease-out forwards}
      .animate-slideRight{animation:slideRight .6s ease-out forwards}
      .animate-slideLeft{animation:slideLeft .6s ease-out forwards}

      @keyframes fadeInSlow {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeInSlow { animation: fadeInSlow 0.45s ease-out forwards; }

      @keyframes bounceSlow {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
      }
      .animate-bounce-slow { animation: bounceSlow 2.5s infinite ease-in-out; }

      .typing-dots { display: inline-flex; gap: 6px; align-items:center; }
      .typing-dots .dot {
        width: 7px;
        height: 7px;
        background: #9CA3AF;
        border-radius: 50%;
        display:inline-block;
        animation: blink 1.2s infinite both;
      }
      .typing-dots .dot:nth-child(2) { animation-delay: 0.15s; }
      .typing-dots .dot:nth-child(3) { animation-delay: 0.3s; }

      @keyframes blink {
        0% { opacity: .2; transform: translateY(0); }
        20% { opacity: 1; transform: translateY(-2px); }
        100% { opacity: .2; transform: translateY(0); }
      }

      /* small responsive tweak */
      @media (max-width: 640px) {
        .chat-panel-mobile { right: 1rem !important; left: 1rem !important; width: calc(100% - 2rem) !important; bottom: 6rem !important; }
      }
    ;
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
      className={transition-colors ${currentPage === page ? "text-gray-900 font-semibold" : "text-gray-600 hover:text-gray-900"}}
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
      <div className={transition-all duration-300 z-0 relative ${isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}}>
        {currentPage === "home" && <HomePage navigateTo={navigateTo} />}
        {currentPage === "about" && <AboutPage />}
        {currentPage === "projects" && <ProjectsPage />}
        {currentPage === "skills" && <SkillsPage />}
        {currentPage === "contact" && <ContactPage />}
      </div>



      {/* FLOATING AI CHAT ASSISTANT */}
      <ChatAssistant />
    </div>
  );
}

//////////////////////////////////////////////////////////
//                     CHAT ASSISTANT                  //
//////////////////////////////////////////////////////////

function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatRef = useRef(null);
  const scrollRef = useRef(null);
  const dragOffset = useRef({ offsetX: 0, offsetY: 0 });
  const isDragging = useRef(false);

  const CHAT_WIDTH = 420;
  const CHAT_HEIGHT = 520;

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, loading]);

  // 🔒 Clamp chat inside viewport
  const clampPosition = (x, y) => {
    const maxX = window.innerWidth - CHAT_WIDTH - 10;
    const maxY = window.innerHeight - CHAT_HEIGHT - 10;

    return {
      x: Math.max(10, Math.min(x, maxX)),
      y: Math.max(10, Math.min(y, maxY)),
    };
  };

  // ✅ Set safe position when opening
  useEffect(() => {
    if (isOpen && chatRef.current) {
      const initialX = window.innerWidth - CHAT_WIDTH - 20;
      const initialY = window.innerHeight - CHAT_HEIGHT - 100;

      const { x, y } = clampPosition(initialX, initialY);

      chatRef.current.style.left = ${x}px;
      chatRef.current.style.top = ${y}px;
      chatRef.current.style.right = "auto";
      chatRef.current.style.bottom = "auto";
    }
  }, [isOpen]);

  // Drag start
  const startDrag = (e) => {
    if (!chatRef.current) return;
    isDragging.current = true;

    const rect = chatRef.current.getBoundingClientRect();
    dragOffset.current.offsetX = e.clientX - rect.left;
    dragOffset.current.offsetY = e.clientY - rect.top;

    document.addEventListener("mousemove", moveDrag);
    document.addEventListener("mouseup", stopDrag);
  };

  const moveDrag = (e) => {
    if (!isDragging.current || !chatRef.current) return;

    const rawX = e.clientX - dragOffset.current.offsetX;
    const rawY = e.clientY - dragOffset.current.offsetY;

    const { x, y } = clampPosition(rawX, rawY);

    chatRef.current.style.left = ${x}px;
    chatRef.current.style.top = ${y}px;
  };

  const stopDrag = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", moveDrag);
    document.removeEventListener("mouseup", stopDrag);
  };

  // Send message
  const sendMessage = async (preset) => {
    const text = preset || input;
    if (!text.trim()) return;

    setMessages((p) => [...p, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://kundu.app.n8n.cloud/webhook/portfolio-assistant",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userMessage: text }),
        }
      );

      const data = await res.json();
      setMessages((p) => [...p, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((p) => [
        ...p,
        { role: "assistant", content: "⚠️ Error contacting assistant." },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-8 right-8 z-[999999]
        bg-gray-900 text-white p-4 rounded-full
        shadow-xl hover:scale-110 transition animate-bounce-slow"
      >
        💬
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatRef}
          className="fixed w-[420px] h-[520px]
          bg-white/90 backdrop-blur-xl
          border border-gray-300 rounded-2xl
          shadow-2xl p-4 flex flex-col
          z-[999999]"
        >
          {/* Header */}
          <div
            onMouseDown={startDrag}
            className="cursor-move flex justify-between items-center
            pb-2 border-b"
          >
            <div className="flex gap-2 items-center">
              <div className="w-9 h-9 bg-gray-900 text-white rounded-full flex items-center justify-center">
                🤖
              </div>
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-xs text-gray-500">Ask about Nikhil</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto py-3 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={max-w-[75%] p-3 rounded-xl ${
                  m.role === "user"
                    ? "ml-auto bg-gray-900 text-white"
                    : "bg-gray-100"
                }}
              >
                {m.content}
              </div>
            ))}
            {loading && <div className="text-sm text-gray-500">Typing…</div>}
          </div>

          {/* Input */}
          <div className="flex gap-2 pt-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              rows={1}
              className="flex-grow p-2 border rounded-xl resize-none"
              placeholder="Ask something…"
            />
            <button
              onClick={() => sendMessage()}
              className="px-4 bg-gray-900 text-white rounded-xl"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}


//////////////////////////////////////////////////////////
//                   HOME PAGE                          //
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
//                    ABOUT PAGE                        //
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
            <TimelineItem title="B.Tech in Computer Science" place="VIT Chennai • Sep 2022 - Jul 2026" detail="CGPA: 9.07/10.0" bold />
            <TimelineItem title="Class XI–XII" place="Narayana Junior College • Jul 2020 - Apr 2022" detail="93.5%" />
            <TimelineItem title="Class X" place="Narayana Concept School • Jun 2019 - Apr 2020" detail="98.3%" />

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
//                  PROJECTS PAGE                       //
//////////////////////////////////////////////////////////

function ProjectsPage() {
  const projects = [
    {
      title: "Automated Meeting Summarizer",
      desc: "Built a GenAI pipeline to transcribe and summarize meetings, integrated with Salesforce. Configured CI/CD with GitHub + Jenkins and automated creation of summarized file objects in Salesforce.",
      tags: ["GenAI", "Salesforce", "Jenkins", "GitHub"],
      impact: "40% efficiency gain",
    },
    {
      title: "Advanced RAG Optimization Module",
      desc: "Plug-and-play module that upgrades Naive RAG systems to Advanced RAG using hybrid retrieval (Vector + BM25), reranking, chunk compression and grounding prompts to reduce hallucination.",
      tags: ["Python", "ChromaDB", "BM25", "LLMs", "RAG"],
      impact: "Modular architecture",
    },
    {
      title: "Spotify Playlist Automation",
      desc: "Automated daily playlist updates using Docker and Jenkins. Dockerized PowerShell script integrated with Jenkins for CI/CD scheduling.",
      tags: ["Docker", "Jenkins", "Spotify API"],
      impact: "Daily automation",
    },
    {
      title: "Honey Adulteration Detection",
      desc: "Designed ML pipeline using LDA and KNN achieving 92% classification accuracy, with automated preprocessing to reduce manual testing time.",
      tags: ["Python", "ML", "LDA", "KNN"],
      impact: "92% accuracy",
    },
    {
      title: "AWS Infra Automation (Terraform)",
      desc: "Deployed Ubuntu/Apache2 server on AWS by creating VPC, subnet, and EC2 instances using Terraform.",
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
              style={{ animationDelay: ${i * 120}ms }}
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
//                   SKILLS PAGE                        //
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
              style={{ animationDelay: ${i * 120}ms }}
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
//                   CONTACT PAGE                       //
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
      <p className={font-semibold ${bold ? "text-gray-900" : "text-gray-700"}}>{detail}</p>
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
      className={px-4 py-2 ${bg} text-white rounded-md hover:opacity-90 transition-all transform hover:scale-105 text-sm font-medium}
    >
      {label}
    </a>
  );
}

//////////////////////////////////////////////////////////
//                      ICONS                           //
//////////////////////////////////////////////////////////

function GitHubIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.76-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.468-2.381 1.236-3.222-.124-.303-.536-1.525.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.289-1.552 3.295-1.23 3.295-1.23.655 1.651.243 2.873.12 3.176.77.842 1.235 1.913 1.235 3.222 0 4.61-2.807 5.624-5.479 5.921.43.372.814 1.103.814 2.222 0 1.605-.015 2.896-.015 3.289 0 .32.216.694.825.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V9h3v10zM6.5 7.5C5.12 7.5 4 6.38 4 5s1.12-2.5 2.5-2.5S9 3.62 9 5 7.88 7.5 6.5 7.5zM20 19h-3v-5.5c0-3.03-3.5-2.8-3.5 0V19h-3V9h3v1.4c1.396-2.586 6-2.777 6 2.47V19z" />
    </svg>
  );
}

function LeetCodeIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438l-3.38 3.376a1.374 1.374 0 0 0 1.941 1.944l1.928-1.927v4.997c0 .758.614 1.372 1.372 1.372s1.372-.614 1.372-1.372V4.686c0-.758-.614-1.372-1.372-1.372zM7.77 7.77a1.374 1.374 0 0 0 0 1.944 8.27 8.27 0 1 0 11.694 0 1.374 1.374 0 0 0-1.944-1.944 5.523 5.523 0 1 1-7.806 0 1.374 1.374 0 0 0-1.944 0z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="w-20 h-20 text-gray-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.668L10.8 7.8a1 1 0 01-.232.996l-1.2 1.6a11.042 11.042 0 005.6 5.6l1.6-1.2a1 1 0 01.996-.232l3.132 1.524A1 1 0 0121 18.72V22a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11a4 4 0 100-8 4 4 0 000 8zm0 9s-6-4.35-6-9a6 6 0 1112 0c0 4.65-6 9-6 9z" />
    </svg>
  );
} 

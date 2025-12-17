'use client';
import { useState, useEffect, useRef } from "react";

export default function PortfolioHome() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeIn{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
      @keyframes slideDown{from{opacity:0;transform:translateY(-30px)}to{opacity:1;transform:translateY(0)}}
      @keyframes slideRight{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:translateX(0)}}
      @keyframes slideLeft{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
      @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
      @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(139,92,246,.3)}50%{box-shadow:0 0 40px rgba(139,92,246,.6)}}
      
      .animate-fadeIn{animation:fadeIn .8s ease-out forwards}
      .animate-slideDown{animation:slideDown .7s ease-out forwards}
      .animate-slideRight{animation:slideRight .7s ease-out forwards}
      .animate-slideLeft{animation:slideLeft .7s ease-out forwards}
      .animate-float{animation:float 3s ease-in-out infinite}
      .animate-glow{animation:glow 2s ease-in-out infinite}

      .gradient-text {
        background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .glass-card {
        background: rgba(17, 24, 39, 0.7);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(139, 92, 246, 0.2);
      }

      .hover-lift {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .hover-lift:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(139, 92, 246, 0.3);
      }

      @keyframes gradient-shift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      .animated-gradient {
        background: linear-gradient(270deg, #8b5cf6, #ec4899, #6366f1);
        background-size: 600% 600%;
        animation: gradient-shift 8s ease infinite;
      }

      .typing-dots{display:inline-flex;gap:6px;align-items:center}
      .typing-dots .dot{width:7px;height:7px;background:#8b5cf6;border-radius:50%;display:inline-block;animation:blink 1.2s infinite both}
      .typing-dots .dot:nth-child(2){animation-delay:.15s}
      .typing-dots .dot:nth-child(3){animation-delay:.3s}
      @keyframes blink{0%{opacity:.2;transform:translateY(0)}20%{opacity:1;transform:translateY(-2px)}100%{opacity:.2;transform:translateY(0)}}

      @media (max-width: 640px) {
        .chat-panel-mobile { right: 1rem !important; left: 1rem !important; width: calc(100% - 2rem) !important; bottom: 6rem !important; }
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
    }, 300);
  };

  const NavLink = ({ page, label }) => (
    <button
      onClick={() => navigateTo(page)}
      className={`relative px-4 py-2 transition-all duration-300 ${
        currentPage === page 
          ? "text-purple-400 font-semibold" 
          : "text-gray-400 hover:text-white"
      }`}
    >
      {label}
      {currentPage === page && (
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"></div>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <nav className={`w-full py-6 px-8 fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-900/80 backdrop-blur-xl border-b border-purple-500/20 shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 
            className="text-2xl font-bold tracking-tight cursor-pointer gradient-text hover:scale-105 transition-transform"
            onClick={() => navigateTo("home")}
          >
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

      <div className={`transition-all duration-300 relative z-10 ${
        isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
      }`}>
        {currentPage === "home" && <HomePage navigateTo={navigateTo} />}
        {currentPage === "about" && <AboutPage />}
        {currentPage === "projects" && <ProjectsPage />}
        {currentPage === "skills" && <SkillsPage />}
        {currentPage === "contact" && <ContactPage />}
      </div>

      <ChatAssistant />
    </div>
  );
}

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

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, loading]);

  const clampPosition = (x, y) => {
    const maxX = window.innerWidth - CHAT_WIDTH - 10;
    const maxY = window.innerHeight - CHAT_HEIGHT - 10;
    return {
      x: Math.max(10, Math.min(x, maxX)),
      y: Math.max(10, Math.min(y, maxY)),
    };
  };

  useEffect(() => {
    if (isOpen && chatRef.current) {
      const initialX = window.innerWidth - CHAT_WIDTH - 20;
      const initialY = window.innerHeight - CHAT_HEIGHT - 100;
      const { x, y } = clampPosition(initialX, initialY);
      chatRef.current.style.left = `${x}px`;
      chatRef.current.style.top = `${y}px`;
      chatRef.current.style.right = "auto";
      chatRef.current.style.bottom = "auto";
    }
  }, [isOpen]);

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
    chatRef.current.style.left = `${x}px`;
    chatRef.current.style.top = `${y}px`;
  };

  const stopDrag = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", moveDrag);
    document.removeEventListener("mouseup", stopDrag);
  };

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
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-8 right-8 z-[999999] bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 animate-glow"
      >
        💬
      </button>

      {isOpen && (
        <div
          ref={chatRef}
          className="fixed w-[420px] h-[520px] glass-card rounded-2xl shadow-2xl p-4 flex flex-col z-[999999]"
        >
          <div
            onMouseDown={startDrag}
            className="cursor-move flex justify-between items-center pb-2 border-b border-purple-500/30"
          >
            <div className="flex gap-2 items-center">
              <div className="w-9 h-9 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center">
                🤖
              </div>
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-xs text-gray-400">Ask about Nikhil</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-2xl hover:text-purple-400 transition">×</button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto py-3 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[75%] p-3 rounded-xl ${
                  m.role === "user"
                    ? "ml-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "bg-gray-800/50 border border-purple-500/20"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && <div className="text-sm text-purple-400">Typing…</div>}
          </div>

          <div className="flex gap-2 pt-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              rows={1}
              className="flex-grow p-2 bg-gray-800/50 border border-purple-500/30 rounded-xl resize-none text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              placeholder="Ask something…"
            />
            <button
              onClick={() => sendMessage()}
              className="px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:scale-105 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function HomePage({ navigateTo }) {
  return (
    <section className="pt-32 pb-20 px-8 min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto animate-fadeIn">
        <div className="mb-6">
          <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300">
            Available for Internship Opportunities
          </span>
        </div>
        
        <h2 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
          Computer Science
          <br />
          <span className="gradient-text">Engineer</span>
        </h2>
        
        <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
          B.Tech student at VIT Chennai specializing in DevOps, Cloud Architecture, AI/ML, and Enterprise Solutions. Building scalable systems that make a difference.
        </p>

        <div className="flex gap-4 mb-8 flex-wrap">
          <SocialLink href="https://github.com/NIKHILPESALA1" label="GitHub" icon="🐙" />
          <SocialLink href="https://linkedin.com/in/nikhilpesala" label="LinkedIn" icon="💼" />
          <SocialLink href="https://leetcode.com/u/NIKHIL_pesala/" label="LeetCode" icon="💻" />
        </div>

        <div className="flex gap-4">
          <a
            href="/resume.pdf"
            download
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:scale-105 transition-all duration-300 font-medium shadow-lg"
          >
            Download Resume
          </a>
          <button
            onClick={() => navigateTo("contact")}
            className="px-8 py-4 border border-purple-500/50 rounded-lg hover:bg-purple-500/10 transition-all duration-300 font-medium"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 py-2 glass-card rounded-lg hover:border-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2"
    >
      <span>{icon}</span>
      {label}
    </a>
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
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl font-bold mb-12 animate-slideDown gradient-text">About Me</h2>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="glass-card rounded-2xl p-8 hover-lift">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">CGPA</h3>
            <p className="text-3xl font-bold gradient-text">9.07/10</p>
            <p className="text-gray-400 text-sm mt-2">VIT Chennai</p>
          </div>
          
          <div className="glass-card rounded-2xl p-8 hover-lift">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2">Projects</h3>
            <p className="text-3xl font-bold gradient-text">5+</p>
            <p className="text-gray-400 text-sm mt-2">Major Projects</p>
          </div>
          
          <div className="glass-card rounded-2xl p-8 hover-lift">
            <div className="text-4xl mb-4">📜</div>
            <h3 className="text-xl font-semibold mb-2">Certifications</h3>
            <p className="text-3xl font-bold gradient-text">4+</p>
            <p className="text-gray-400 text-sm mt-2">Industry Recognized</p>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-8 mb-8 animate-fadeIn">
          <h3 className="text-2xl font-semibold mb-4 gradient-text">Bio</h3>
          <p className="text-lg text-gray-300 leading-relaxed mb-4">
            B.Tech Computer Science Engineering student at VIT Chennai with CGPA 9.07/10.0. Passionate about building scalable systems and automating workflows.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Experienced in DevOps, cloud platforms (AWS, Azure), and Salesforce. Contributor to open-source DevOps projects and active LeetCode participant with a strong foundation in data structures and algorithms.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8 mb-8">
          <h3 className="text-2xl font-semibold mb-6 gradient-text">Education</h3>
          <div className="space-y-6">
            <TimelineItem 
              title="B.Tech in Computer Science" 
              place="VIT Chennai" 
              date="Sep 2022 - Jul 2026"
              detail="CGPA: 9.07/10.0" 
              highlight 
            />
            <TimelineItem 
              title="Class XI–XII" 
              place="Narayana Junior College" 
              date="Jul 2020 - Apr 2022"
              detail="93.5%" 
            />
            <TimelineItem 
              title="Class X" 
              place="Narayana Concept School" 
              date="Jun 2019 - Apr 2020"
              detail="98.3%" 
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-6 gradient-text">Certifications</h3>
            <div className="space-y-3">
              {certifications.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-300">{c}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-6 gradient-text">Achievements</h3>
            <div className="space-y-3">
              {achievements.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                  <span className="text-gray-300">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ title, place, date, detail, highlight }) {
  return (
    <div className="border-l-2 border-purple-500/50 pl-6 relative">
      <div className="absolute -left-[5px] top-0 w-2 h-2 bg-purple-500 rounded-full"></div>
      <h4 className="text-xl font-semibold">{title}</h4>
      <p className="text-gray-400">{place} • {date}</p>
      <p className={`font-semibold mt-1 ${highlight ? 'text-purple-400' : 'text-gray-300'}`}>{detail}</p>
    </div>
  );
}

function ProjectsPage() {
  const projects = [
    {
      title: "Automated Meeting Summarizer",
      desc: "Built a GenAI pipeline to transcribe and summarize meetings, integrated with Salesforce. Configured CI/CD with GitHub + Jenkins and automated creation of summarized file objects in Salesforce.",
      tags: ["GenAI", "Salesforce", "Jenkins", "GitHub"],
      impact: "40% efficiency gain",
      icon: "🤖"
    },
    {
      title: "Advanced RAG Optimization Module",
      desc: "Plug-and-play module that upgrades Naive RAG systems to Advanced RAG using hybrid retrieval (Vector + BM25), reranking, chunk compression and grounding prompts to reduce hallucination.",
      tags: ["Python", "ChromaDB", "BM25", "LLMs", "RAG"],
      impact: "Modular architecture",
      icon: "🧠"
    },
    {
      title: "Spotify Playlist Automation",
      desc: "Automated daily playlist updates using Docker and Jenkins. Dockerized PowerShell script integrated with Jenkins for CI/CD scheduling.",
      tags: ["Docker", "Jenkins", "Spotify API"],
      impact: "Daily automation",
      icon: "🎵"
    },
    {
      title: "Honey Adulteration Detection",
      desc: "Designed ML pipeline using LDA and KNN achieving 92% classification accuracy, with automated preprocessing to reduce manual testing time.",
      tags: ["Python", "ML", "LDA", "KNN"],
      impact: "92% accuracy",
      icon: "🍯"
    },
    {
      title: "AWS Infra Automation (Terraform)",
      desc: "Deployed Ubuntu/Apache2 server on AWS by creating VPC, subnet, and EC2 instances using Terraform.",
      tags: ["AWS", "Terraform", "EC2", "IaC"],
      impact: "Automated deployment",
      icon: "☁️"
    },
  ];

  return (
    <section className="pt-32 pb-20 px-8 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl font-bold mb-12 animate-slideDown gradient-text">Projects</h2>

        <div className="grid gap-6">
          {projects.map((p, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-8 hover-lift animate-fadeIn"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{p.icon}</div>
                  <div>
                    <h3 className="text-2xl font-semibold">{p.title}</h3>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30 mt-2 inline-block">
                      {p.impact}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 mb-4 leading-relaxed">{p.desc}</p>

              <div className="flex flex-wrap gap-2">
                {p.tags.map((t, j) => (
                  <span key={j} className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-500/30">
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

function SkillsPage() {
  const techSkills = [
    { cat: "Programming", skills: ["Java", "Python", "MySQL", "SQL"], icon: "💻" },
    { cat: "Cloud & Infra", skills: ["AWS", "Lambda", "EC2", "Terraform", "Azure"], icon: "☁️" },
    { cat: "DevOps & CI/CD", skills: ["Docker", "Jenkins", "Prometheus", "Grafana"], icon: "🔧" },
    { cat: "AI & ML", skills: ["RAG", "GenAI", "NLP", "LLMs"], icon: "🤖" },
    { cat: "Enterprise", skills: ["Salesforce", "Apex", "Lightning"], icon: "⚡" },
    { cat: "Tools", skills: ["BM25", "ChromaDB", "Git", "REST APIs"], icon: "🛠️" },
  ];

  const softSkills = ["Problem Solving", "Teamwork", "Communication", "Adaptability", "Time Management"];

  return (
    <section className="pt-32 pb-20 px-8 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl font-bold mb-12 animate-slideDown gradient-text">Skills</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {techSkills.map((g, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-8 hover-lift animate-fadeIn"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{g.icon}</span>
                <h3 className="text-xl font-semibold gradient-text">{g.cat}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.skills.map((s, j) => (
                  <span key={j} className="px-3 py-2 bg-gray-800/50 text-gray-300 text-sm rounded-lg border border-purple-500/30 hover:border-purple-500/50 transition">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-8 animate-fadeIn" style={{ animationDelay: "600ms" }}>
          <h3 className="text-2xl font-semibold mb-6 gradient-text">Soft Skills</h3>
          <div className="flex flex-wrap gap-3">
            {softSkills.map((s, i) => (
              <span key={i} className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-lg border border-purple-500/30 font-medium hover:scale-105 transition">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <section className="pt-32 pb-20 px-8 min-h-screen flex items-center">
      <div className="max-w-3xl mx-auto w-full">
        <h2 className="text-5xl font-bold mb-8 animate-slideDown gradient-text">
          Get In Touch
        </h2>

        <div className="glass-card rounded-2xl p-10 shadow-2xl animate-fadeIn">
          <p className="text-lg text-gray-300 mb-8">
            I am open to internship opportunities and would love to contribute to your team!
          </p>

          <div className="space-y-6">
            <ContactItem
              icon="📧"
              label="Email"
              value="nikhilpesala4@gmail.com"
              link="mailto:nikhilpesala4@gmail.com"
            />

            <ContactItem
              icon="📱"
              label="Phone"
              value="+91 72072 50539"
              link="tel:+917207250539"
            />

            <ContactItem
              icon="💼"
              label="LinkedIn"
              value="linkedin.com/in/nikhilpesala"
              link="https://linkedin.com/in/nikhilpesala"
            />

            <ContactItem
              icon="🐙"
              label="GitHub"
              value="github.com/NIKHILPESALA1"
              link="https://github.com/NIKHILPESALA1"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
function ContactItem({ icon, label, value, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 rounded-xl glass-card hover-lift transition-all duration-300"
    >
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-lg font-medium text-white">{value}</p>
      </div>
    </a>
  );
}

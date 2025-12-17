'use client';
import { useState, useEffect, useRef } from "react";

export default function PortfolioHome() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isTransitioning, setIsTransitioning] = useState(false);

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

      .animate-bounce-slow {
        animation: bounceSlow 2.5s infinite ease-in-out;
      }

      @keyframes bounceSlow {
        0%,100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  };

  const NavLink = ({ page, label }) => (
    <button
      onClick={() => navigateTo(page)}
      className={`transition-colors ${
        currentPage === page
          ? "text-indigo-700 font-semibold"
          : "text-slate-600 hover:text-indigo-700"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 text-slate-900">

      {/* NAVBAR */}
      <nav className="w-full py-6 px-8 bg-white/70 backdrop-blur-xl border-b border-indigo-200/40 fixed top-0 left-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1
            className="text-xl font-semibold tracking-tight cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
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

      {/* CONTENT */}
      <div className={`pt-28 transition-all duration-300 ${isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
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

/* ================= CHAT ASSISTANT ================= */

function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const text = input;
    setMessages(p => [...p, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://kundu.app.n8n.cloud/webhook/portfolio-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: text })
      });
      const data = await res.json();
      setMessages(p => [...p, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages(p => [...p, { role: "assistant", content: "⚠️ Assistant unavailable" }]);
    }

    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(o => !o)}
        className="fixed bottom-8 right-8 z-[9999]
        bg-gradient-to-br from-indigo-600 to-purple-600 text-white
        p-4 rounded-full shadow-xl hover:scale-110 transition animate-bounce-slow"
      >
        💬
      </button>

      {isOpen && (
        <div
          ref={chatRef}
          className="fixed bottom-28 right-8 w-[420px] h-[520px]
          bg-white/90 backdrop-blur-xl border border-indigo-200/40
          rounded-2xl shadow-2xl flex flex-col z-[9999]"
        >
          <div className="p-4 border-b flex justify-between font-semibold">
            AI Assistant
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[75%] p-3 rounded-xl ${
                  m.role === "user"
                    ? "ml-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                    : "bg-indigo-50 border border-indigo-100"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && <p className="text-sm text-gray-500">Typing…</p>}
          </div>

          <div className="p-3 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              className="flex-1 border rounded-lg p-2"
              placeholder="Ask something…"
            />
            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ================= SECTIONS ================= */

function HomePage({ navigateTo }) {
  return (
    <section className="min-h-screen flex items-center px-8">
      <div className="max-w-3xl mx-auto animate-fadeIn">
        <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Computer Science Engineer
        </h2>
        <p className="text-xl text-slate-600 mb-8">
          B.Tech student at VIT Chennai specializing in DevOps, Cloud Architecture, AI/ML.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigateTo("contact")}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:opacity-90 transition"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="px-8 py-28">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-lg border border-indigo-200/40 rounded-2xl p-10 animate-fadeIn">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          About Me
        </h2>
        <p>
          B.Tech CSE student at VIT Chennai with strong DevOps, Cloud, Salesforce and GenAI experience.
        </p>
      </div>
    </section>
  );
}

function ProjectsPage() {
  return (
    <section className="px-8 py-28">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Projects
        </h2>
        <div className="grid gap-6">
          {["Automated Meeting Summarizer","Advanced RAG Optimization","Spotify Playlist Automation","Honey Adulteration Detection"].map(p => (
            <div
              key={p}
              className="bg-white/80 backdrop-blur-lg border border-indigo-200/40 rounded-xl p-6 hover:shadow-xl hover:shadow-indigo-200/40 transition"
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsPage() {
  return (
    <section className="px-8 py-28">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-lg border border-indigo-200/40 rounded-2xl p-10">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Skills
        </h2>
        <p>Java • Python • AWS • Docker • Jenkins • Terraform • GenAI</p>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <section className="px-8 py-28">
      <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-lg border border-indigo-200/40 rounded-2xl p-10">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Contact
        </h2>
        <p>📧 nikhilpesala4@gmail.com</p>
        <p>📍 Nellore, India</p>
      </div>
    </section>
  );
}

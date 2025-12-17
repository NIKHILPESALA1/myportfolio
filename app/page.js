'use client';
import { useState, useEffect, useRef } from "react";

/* =====================================================
   MAIN PAGE
===================================================== */

export default function PortfolioHome() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isTransitioning, setIsTransitioning] = useState(false);

  /* Inject animations once */
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fadeUp {
        from { opacity:0; transform: translateY(24px); }
        to { opacity:1; transform: translateY(0); }
      }
      .fade-up { animation: fadeUp .6s ease-out both; }

      @keyframes float {
        0%,100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
      }
      .float { animation: float 3s ease-in-out infinite; }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1
            onClick={() => navigateTo("home")}
            className="text-lg font-semibold cursor-pointer"
          >
            Nikhil Pesala
          </h1>
          <div className="flex gap-8 text-sm text-slate-600">
            {["about", "projects", "skills", "contact"].map(p => (
              <button
                key={p}
                onClick={() => navigateTo(p)}
                className="hover:text-slate-900 transition"
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <div className={`pt-32 transition-all ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
        {currentPage === "home" && <HomePage />}
        {currentPage === "about" && <AboutPage />}
        {currentPage === "projects" && <ProjectsPage />}
        {currentPage === "skills" && <SkillsPage />}
        {currentPage === "contact" && <ContactPage />}
      </div>

      {/* CHATBOT */}
      <ChatAssistant />
    </div>
  );
}

/* =====================================================
   CHAT ASSISTANT (POLISHED)
===================================================== */

function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const boxRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const text = input;
    setInput("");
    setMessages(m => [...m, { role: "user", content: text }]);
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
      setMessages(m => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", content: "⚠️ Error contacting assistant." }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-slate-900 text-white shadow-xl float z-50"
      >
        💬
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div
          ref={boxRef}
          className="fixed bottom-24 right-6 w-[420px] h-[520px]
          bg-white/90 backdrop-blur-xl border rounded-2xl shadow-2xl
          flex flex-col z-50 fade-up"
        >
          {/* HEADER */}
          <div className="px-4 py-3 border-b flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center">
                🤖
              </div>
              <div>
                <p className="font-semibold text-sm">AI Assistant</p>
                <p className="text-xs text-slate-500">Ask about Nikhil</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* MESSAGES */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[75%] p-3 rounded-xl text-sm ${
                  m.role === "user"
                    ? "ml-auto bg-slate-900 text-white"
                    : "bg-slate-100"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && <p className="text-xs text-slate-500">Assistant typing…</p>}
          </div>

          {/* INPUT */}
          <div className="p-3 border-t flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none"
              placeholder="Ask something…"
            />
            <button
              onClick={sendMessage}
              className="px-4 rounded-xl bg-slate-900 text-white"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* =====================================================
   PAGES
===================================================== */

function HomePage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24 fade-up">
      <h2 className="text-6xl font-extrabold leading-tight">
        DevOps & Cloud Engineer
      </h2>
      <p className="mt-6 text-xl text-slate-600 max-w-2xl">
        B.Tech CSE @ VIT Chennai · AWS · Azure · Docker · Jenkins · GenAI
      </p>
      <div className="mt-10 flex gap-4">
        <a href="/resume.pdf" className="px-6 py-3 rounded-xl bg-slate-900 text-white">
          Resume
        </a>
        <a href="mailto:nikhilpesala4@gmail.com" className="px-6 py-3 rounded-xl border">
          Contact
        </a>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24 fade-up">
      <h2 className="text-4xl font-bold mb-6">About</h2>
      <p className="text-lg text-slate-700">
        B.Tech CSE student at VIT Chennai with strong focus on DevOps, Cloud and AI.
        Experienced with AWS, Azure, Terraform, Docker and GenAI pipelines.
      </p>
    </section>
  );
}

function ProjectsPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24 fade-up">
      <h2 className="text-4xl font-bold mb-10">Projects</h2>
      <div className="grid gap-6">
        {[
          ["Automated Meeting Summarizer", "GenAI + Salesforce + Jenkins"],
          ["Advanced RAG Module", "Hybrid retrieval + hallucination reduction"],
          ["Spotify Automation", "Docker + Jenkins CI/CD"],
        ].map((p, i) => (
          <div key={i} className="p-6 bg-white/70 backdrop-blur border rounded-xl shadow">
            <h3 className="text-xl font-semibold">{p[0]}</h3>
            <p className="text-slate-600 mt-2">{p[1]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SkillsPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24 fade-up">
      <h2 className="text-4xl font-bold mb-8">Skills</h2>
      <div className="flex flex-wrap gap-3">
        {[
          "Java","Python","AWS","Azure","Terraform","Docker",
          "Jenkins","RAG","GenAI","Salesforce"
        ].map(s => (
          <span key={s} className="px-4 py-2 rounded-full bg-slate-100 border">
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24 fade-up">
      <h2 className="text-4xl font-bold mb-6">Contact</h2>
      <p className="text-lg text-slate-700">
        Email: <a className="underline" href="mailto:nikhilpesala4@gmail.com">nikhilpesala4@gmail.com</a>
      </p>
    </section>
  );
}

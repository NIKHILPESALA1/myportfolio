'use client';
import { useState, useEffect, useRef } from "react";

/* ========================= ROOT ========================= */

export default function PortfolioHome() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeUp { animation: fadeUp .6s ease-out forwards; }
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
    <div className="min-h-screen">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50
        bg-white/70 backdrop-blur-xl border-b border-gray-200/60">
        <div className="max-w-5xl mx-auto px-8 py-5 flex justify-between items-center">
          <h1
            onClick={() => navigateTo("home")}
            className="text-xl font-semibold cursor-pointer"
          >
            Nikhil Pesala
          </h1>
          <div className="flex gap-8 text-sm">
            {["home","about","projects","skills","contact"].map(p => (
              <button key={p} onClick={() => navigateTo(p)}
                className="text-gray-600 hover:text-gray-900 transition">
                {p.charAt(0).toUpperCase()+p.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <div className={`pt-28 transition-all ${isTransitioning ? "opacity-0 translate-y-4" : "opacity-100"}`}>
        {currentPage === "home" && <Home />}
        {currentPage === "about" && <About />}
        {currentPage === "projects" && <Projects />}
        {currentPage === "skills" && <Skills />}
        {currentPage === "contact" && <Contact />}
      </div>

      {/* AI ASSISTANT (RESTORED) */}
      <ChatAssistant />
    </div>
  );
}

/* ========================= AI ASSISTANT ========================= */

function ChatAssistant() {
  const [open, setOpen] = useState(false);
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

    setMessages(p => [...p, { role: "user", content: input }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://kundu.app.n8n.cloud/webhook/portfolio-assistant",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userMessage: input }),
        }
      );
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
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-8 right-8 z-[9999]
        bg-gray-900 text-white p-4 rounded-full shadow-xl hover:scale-110 transition">
        💬
      </button>

      {open && (
        <div ref={chatRef}
          className="fixed bottom-28 right-8 w-[420px] h-[520px]
          bg-white/90 backdrop-blur-xl border border-gray-300/60
          rounded-2xl shadow-2xl flex flex-col z-[9999]">

          <div className="p-4 border-b font-semibold flex justify-between">
            AI Assistant
            <button onClick={() => setOpen(false)}>×</button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m,i)=>(
              <div key={i}
                className={`p-3 rounded-xl max-w-[75%]
                ${m.role==="user" ? "ml-auto bg-gray-900 text-white" : "bg-gray-100"}`}>
                {m.content}
              </div>
            ))}
            {loading && <p className="text-sm text-gray-500">Typing…</p>}
          </div>

          <div className="p-3 flex gap-2">
            <input
              value={input}
              onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>e.key==="Enter" && sendMessage()}
              className="flex-1 border rounded-lg p-2"
              placeholder="Ask about Nikhil..."
            />
            <button onClick={sendMessage}
              className="bg-gray-900 text-white px-4 rounded-lg">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ========================= SECTIONS ========================= */

function Home() {
  return (
    <section className="min-h-screen flex items-center px-8 animate-fadeUp">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-7xl font-extrabold mb-6">
          Computer Science <span className="text-gray-500">Engineer</span>
        </h2>
        <p className="text-xl text-gray-600">
          B.Tech at VIT Chennai • DevOps • Cloud • AI
        </p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="px-8 py-28 animate-fadeUp">
      <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-xl border rounded-2xl p-10">
        <h2 className="text-4xl font-bold mb-6">About Me</h2>
        <p>
          B.Tech CSE student at VIT Chennai with strong DevOps, Cloud,
          Salesforce and GenAI experience.
        </p>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="px-8 py-28">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-10">Projects</h2>
        <div className="grid gap-6">
          {[
            "Automated Meeting Summarizer",
            "Advanced RAG Optimization",
            "Spotify Playlist Automation",
            "Honey Adulteration Detection"
          ].map(p=>(
            <div key={p} className="bg-white/70 border rounded-xl p-6">
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="px-8 py-28">
      <div className="max-w-4xl mx-auto bg-white/70 border rounded-2xl p-10">
        <h2 className="text-4xl font-bold mb-6">Skills</h2>
        <p>Java • Python • AWS • Docker • Jenkins • Terraform • GenAI</p>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="px-8 py-28">
      <div className="max-w-2xl mx-auto bg-white/70 border rounded-2xl p-10">
        <h2 className="text-4xl font-bold mb-6">Contact</h2>
        <p>📧 nikhilpesala4@gmail.com</p>
        <p>📍 Nellore, India</p>
      </div>
    </section>
  );
}

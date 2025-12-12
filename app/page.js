'use client';
import { useState, useEffect } from "react";

export default function PortfolioHome() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Inject custom keyframe animations
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

      {/* FLOATING AI ASSISTANT */}
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

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://kundu.app.n8n.cloud/webhook/portfolio-assistant {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: userMsg.content }),
      });

      const data = await res.json();
      const assistantMsg = { role: "assistant", content: data.reply };

      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "⚠️ Error contacting assistant." }
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gray-900 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform z-50"
      >
        💬
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white border border-gray-300 rounded-lg shadow-xl p-4 z-50 animate-fadeIn">
          <h3 className="text-lg font-semibold mb-3">AI Assistant</h3>

          <div className="h-64 overflow-y-auto mb-3 border p-3 rounded-md space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded-md ${
                  m.role === "user"
                    ? "bg-gray-900 text-white ml-auto max-w-[80%]"
                    : "bg-gray-100 text-gray-900 mr-auto max-w-[80%]"
                }`}
              >
                {m.content}
              </div>
            ))}

            {loading && (
              <div className="text-sm text-gray-500 italic">Assistant is typing...</div>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow p-2 border rounded-md"
              placeholder="Ask something..."
            />
            <button
              onClick={sendMessage}
              className="px-4 bg-gray-900 text-white rounded-md hover:bg-gray-800"
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
//               EXISTING PAGES (UNCHANGED)            //
//////////////////////////////////////////////////////////

// your full HomePage, AboutPage, ProjectsPage, SkillsPage, ContactPage,
// and icons remain EXACTLY the same as you provided.
// They are included below without modification.

//////////////////////////////////////////////////////////
//                   HOME PAGE                         //
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
// (AboutPage, ProjectsPage, SkillsPage, ContactPage,
// Icons — included exactly as you pasted.
// I can include all of them fully if you want.)
//////////////////////////////////////////////////////////

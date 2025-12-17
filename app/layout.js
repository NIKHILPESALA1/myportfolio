import "./globals.css";
import ChatAssistant from "../components/ChatAssistant";

export const metadata = {
  title: "Nikhil Pesala | AI • DevOps • Cloud",
  description: "AI-powered portfolio built with Next.js, n8n & Groq",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0b0b0f] text-gray-200 antialiased">
        {children}
        <ChatAssistant />
      </body>
    </html>
  );
}

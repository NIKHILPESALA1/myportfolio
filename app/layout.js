import "./global.css";
import ChatWidget from "./components/ChatWidget";

export const metadata = {
  title: "Nikhil Pesala - Portfolio",
  description: "DevOps & Cloud Engineer | B.Tech CS Student at VIT Chennai",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ChatWidget /> {/* n8n chatbot widget ALWAYS available */}
      </body>
    </html>
  );
}

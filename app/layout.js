import "./globals.css";

export const metadata = {
  title: "Nikhil Pesala | Computer Science Engineer",
  description: "DevOps, Cloud, AI/ML Engineer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="max-w-5xl mx-auto px-6">
          {children}
        </main>
      </body>
    </html>
  );
}

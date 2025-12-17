import "./globals.css";

export const metadata = {
  title: "Nikhil Pesala | Portfolio",
  description: "DevOps • Cloud • AI Engineer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata = {
  title: "Win Cycle – ثورة التدوير الذكي في الجزائر",
  description: "انضم إلى فريق المشروع المختار ضمن برنامج DZ Young Leaders",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable}`}>
      <body className="min-h-screen flex flex-col font-cairo bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}

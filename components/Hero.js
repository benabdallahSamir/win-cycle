"use client";

import { LeafIcon } from "./Icons";

export default function Hero({ scrollToForm }) {
  return (
    <header className="relative bg-gradient-to-l from-green-700 to-green-500 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32 flex flex-col items-center text-center">
        <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold tracking-wider mb-6 border border-white/30 shadow-sm">
          مبادرة وطنية للشباب
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold max-w-4xl tracking-tight leading-tight mb-6 drop-shadow-md">
          Win Cycle – ثورة التدوير الذكي في الجزائر 🇩🇿
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl max-w-2xl text-green-50 mb-10 drop-shadow-sm font-medium">
          انضم إلى فريق المشروع المختار ضمن برنامج DZ Young Leaders لتكون جزءاً من التغيير.
        </p>
        <button 
          onClick={scrollToForm}
          className="group flex items-center justify-center gap-2 bg-white text-green-700 font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >
          <span>سجل الآن للمشاركة</span>
          <LeafIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        </button>
      </div>
      
      {/* Custom shape divider */}
      <div className="absolute bottom-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C-3.83,93.63,161.4,96.38,321.39,56.44Z" className="fill-gray-50"></path>
        </svg>
      </div>
    </header>
  );
}

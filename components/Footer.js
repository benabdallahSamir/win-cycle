"use client";

import { LeafIcon } from "./Icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks = ["فيسبوك", "تويتر", "لينكد إن"];

  return (
    <footer className="bg-gray-900 border-t-8 border-green-600 text-gray-400 py-16 px-6 text-right">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
        <div>
          <h4 className="text-white font-black text-2xl mb-4 flex items-center gap-2">
            <LeafIcon className="w-6 h-6 text-green-500" />
            Win Cycle 🇩🇿
          </h4>
          <p className="text-sm leading-relaxed mb-6 font-medium">
            مشروع وطني يهدف لرقمنة إعادة التدوير من خلال حاويات ذكية ونظام مكافآت لخلق بيئة سليمة ومستدامة، برقم قياسي من الطموحات.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full block"></span>
            روابط هامة
          </h4>
          <ul className="space-y-3 text-sm font-medium">
            <li><a href="#" className="hover:text-green-400 hover:pr-2 transition-all block">عن البرنامج - DZ Young Leaders</a></li>
            <li><a href="#" className="hover:text-green-400 hover:pr-2 transition-all block">الأسئلة الشائعة</a></li>
            <li><a href="#" className="hover:text-green-400 hover:pr-2 transition-all block">الشروط والأحكام الخاصة بالتسجيل</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full block"></span>
            تواصل معنا
          </h4>
          <p className="text-sm mb-4 font-mono font-medium tracking-wide">
            info@wincycle.dz
          </p>
          <div className="flex gap-3 justify-start">
            {socialLinks.map((social, idx) => (
              <div key={idx} className="bg-gray-800 text-gray-300 hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg font-semibold text-xs cursor-pointer transition-colors border border-gray-700 hover:border-green-500">
                {social}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm font-medium gap-4">
        <p>© {currentYear} مشروع Win Cycle. جميع الحقوق محفوظة.</p>
        <p className="text-gray-500">صنع بشغف لجزائر خضراء</p>
      </div>
    </footer>
  );
}

"use client";

export default function Partners() {
  return (
    <section className="py-20 bg-white px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h3 className="text-lg font-bold text-gray-400 mb-10 uppercase tracking-widest flex items-center justify-center gap-4">
          <span className="w-12 h-px bg-gray-200 block"></span>
          بدعم ورعاية من
          <span className="w-12 h-px bg-gray-200 block"></span>
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 hover:opacity-100 transition-opacity duration-500">
          <div className="font-black text-2xl text-gray-800 tracking-tight">وزارة الشباب</div>
          <div className="w-2 h-2 rounded-full bg-green-300 hidden md:block"></div>
          <div className="font-black text-2xl text-gray-800 tracking-tight">المجلس الأعلى للشباب</div>
          <div className="w-2 h-2 rounded-full bg-green-500 hidden md:block"></div>
        </div>
      </div>
    </section>
  );
}

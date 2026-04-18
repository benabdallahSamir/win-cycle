"use client";

import { StarIcon, TargetIcon } from "./Icons";

export default function JoinUs() {
  const benefits = [
    "بناء شبكة علاقات وطنية قوية مع نخبة مكونة من 1000 شاب استثنائي عبر الوطن.",
    "إثراء السيرة الذاتية (CV) بتجربة معتمدة تدعم طلبات المنح الدراسية الدولية.",
    "تدريب عالي المستوى (حضورياً وعبر الإنترنت) على أيدي دكاترة، خبراء دوليين وإطارات الدولة.",
    "المساهمة في بيئة نظيفة وتطوير مناطق الظل، مع فرصة الفوز بنقاط وجوائز قيمة."
  ];

  const targetAudience = ["مبرمجون", "طاقم تسويق", "مهندسو إلكترونيات", "متطوعون ميدانيون", "صناع محتوى وإعلاميون"];

  return (
    <section className="py-20 bg-green-50 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 relative">
        {/* Background design */}
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-green-200 rounded-full blur-[100px] opacity-40 -z-10 pointer-events-none transform -translate-y-1/2"></div>
        
        {/* Benefits */}
        <div className="text-right">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-3">
            <span className="bg-green-200 text-green-700 p-2 rounded-lg inline-flex"><StarIcon className="w-6 h-6"/></span>
            لماذا عليك الانضمام إلينا؟
          </h2>
          <ul className="space-y-6">
            {benefits.map((item, idx) => (
              <li key={idx} className="flex gap-4 items-start bg-white p-5 rounded-xl shadow-sm border border-green-100/50 hover:border-green-300 transition-colors group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-600 flex flex-col items-center justify-center font-bold group-hover:scale-110 transition-transform">
                  {idx + 1}
                </div>
                <p className="text-gray-700 leading-relaxed font-medium">{item}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Target Audience */}
        <div className="bg-green-600 text-white rounded-3xl p-10 shadow-2xl relative overflow-hidden flex flex-col justify-center text-right border border-green-400">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-500 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-green-700 rounded-full blur-3xl opacity-60"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6 text-white">من نبحث عنه؟</h2>
            <p className="text-green-50 mb-8 text-lg font-medium leading-relaxed">
              نبحث عن الطاقات الشبابية الطموحة في مختلف المجالات للمساهمة في إنجاح وتطوير المشروع:
            </p>
            
            <div className="flex flex-wrap gap-3 mb-10">
              {targetAudience.map((tag, i) => (
                <span key={i} className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white font-semibold shadow-sm border border-white/10 hover:bg-white/30 transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="bg-white text-green-700 p-6 rounded-2xl shadow-inner font-bold text-xl text-center flex items-center justify-center gap-3">
              سواء كنت طالباً أو هاوياً، مكانك محجوز معنا – من أي ولاية كنت!
              <TargetIcon className="hidden sm:block w-8 h-8 text-green-500 opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

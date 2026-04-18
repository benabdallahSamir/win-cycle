"use client";

import { TargetIcon, AwardIcon } from "./Icons";

export default function About() {
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 space-y-6 text-right">
          <div className="inline-flex items-center gap-2 text-rose-500 font-bold mb-2">
            <TargetIcon className="w-5 h-5" /> <span>برنامج النخبة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            عن برنامج DZ Young Leaders
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg text-justify">
            برنامج وطني ضخم تحت إشراف وزارة الشباب والرياضة، المجلس الأعلى للشباب، ومستشار رئيس الجمهورية. يهدف إلى تكوين قادة المستقبل من الشباب الجزائري.
          </p>
          
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 border-r-4 border-r-rose-500">
              <div className="text-3xl font-black text-rose-500 mb-1">75,000+</div>
              <div className="text-sm text-gray-500 font-medium">مسجل في البرنامج</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 border-r-4 border-r-green-500">
              <div className="text-3xl font-black text-green-500 mb-1">1,000</div>
              <div className="text-sm text-gray-500 font-medium">شاب مختار فقط</div>
            </div>
          </div>
          
          <p className="text-gray-600 leading-relaxed font-medium bg-rose-50 p-4 rounded-lg border border-rose-100">
            <span className="font-bold text-rose-600">الهدف:</span> الحصول على تمويل دولي لأفضل 4 مشاريع، بالإضافة إلى وسام شرفي رئاسي. ومشروع <span className="font-bold text-gray-900">Win Cycle</span> هو أحد المشاريع الواعدة المختارة بقوة للمنافسة النهائية!
          </p>
        </div>
        <div className="order-1 md:order-2 relative h-full min-h-[300px] rounded-2xl bg-gradient-to-br from-rose-100 to-orange-100 p-8 flex items-center justify-center overflow-hidden shadow-lg border border-white/50">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full blur-2xl"></div>
           <div className="relative text-center z-10">
             <AwardIcon className="w-24 h-24 text-rose-500 mx-auto mb-4" />
             <h3 className="text-2xl font-bold text-rose-900 mb-2">النخبة الوطنية</h3>
             <p className="text-rose-700 font-medium">تمكين الشباب الجزائري في مسار القيادة والابتكار</p>
           </div>
        </div>
      </div>
    </section>
  );
}

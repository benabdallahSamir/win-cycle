"use client";

import { LeafIcon, StarIcon, UsersIcon } from "./Icons";

export default function Features() {
  return (
    <section className="py-20 bg-white px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 relative">
          <span className="text-green-600 font-bold tracking-wider uppercase text-sm mb-2 block">الابتكار الأخضر</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 inline-block relative">
            ما هو مشروع Win Cycle؟
            <div className="h-1 w-1/2 bg-green-500 absolute -bottom-4 right-1/4 rounded-full"></div>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-2xl p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-gray-100 group text-right">
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <LeafIcon />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">الحاويات الذكية</h3>
            <p className="text-gray-600 leading-relaxed">
              حاويات متصلة بتقنية QR code، تعتمد على وزن المواد المسترجعة وتمنحك نقاطاً فورية عبر تطبيق ذكي مخصص.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-gray-100 group text-right">
            <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <StarIcon />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">نظام المكافآت (Gamification)</h3>
            <p className="text-gray-600 leading-relaxed">
              قائمة صدارة للمستخدمين، متجر للجوائز القيمة، وتحويل مستقبلي للنقاط إلى مدفوعات رقمية عبر تقنية NFC.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-gray-100 group text-right">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <UsersIcon />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">سوق B2B متكامل</h3>
            <p className="text-gray-600 leading-relaxed">
              ربط الشركات الناشئة وعمال النظافة مع كبرى الشركات لشراء وبيع المواد القابلة للتدوير بكل شفافية وفعالية.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";

// Icons 
const LeafIcon = ({ className = "w-6 h-6" }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>);
const TargetIcon = ({ className = "w-6 h-6" }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>);
const AwardIcon = ({ className = "w-6 h-6" }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>);
const UsersIcon = ({ className = "w-6 h-6" }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>);
const StarIcon = ({ className = "w-6 h-6" }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>);

const WILAYAS = [
  "أدرار", "الشلف", "الأغواط", "أم البواقي", "باتنة", "بجاية", "بسكرة", "بشار", "البليدة", "البويرة",
  "تمنراست", "تبسة", "تلمسان", "تيارت", "تيزي وزو", "الجزائر", "الجلفة", "جيجل", "سطيف", "سعيدة",
  "سكيكدة", "سيدي بلعباس", "عنابة", "قالمة", "قسنطينة", "المدية", "مستغانم", "المسيلة", "معسكر", "ورقلة",
  "وهران", "البيض", "إليزي", "برج بوعريريج", "بومرداس", "الطارف", "تندوف", "تيسمسيلت", "الوادي", "خنشلة",
  "سوق أهراس", "تيبازة", "ميلة", "عين الدفلى", "النعامة", "عين تموشنت", "غرداية", "غليزان", "تيميمون", "برج باجي مختار",
  "أولاد جلال", "بني عباس", "إن صالح", "إن قزام", "تقرت", "جانت", "المغير", "المنيعة"
];

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: "",
    wilaya: "",
    phone: "",
    email: "",
    gender: "",
    birthDate: ""
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "الاسم الكامل مطلوب";
    if (!formData.wilaya) newErrors.wilaya = "الرجاء اختيار الولاية";
    if (!formData.phone.match(/^(05|06|07)\d{8}$/)) {
      newErrors.phone = "رقم هاتف غير صالح (يجب أن يبدأ بـ 05 أو 06 أو 07 ويتكون من 10 أرقام)";
    }
    if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      newErrors.email = "بريد إلكتروني غير صالح";
    }
    if (!formData.gender) newErrors.gender = "الرجاء تحديد الجنس";
    if (!formData.birthDate) {
      newErrors.birthDate = "تاريخ الميلاد مطلوب";
    } else {
      const birthYear = new Date(formData.birthDate).getFullYear();
      const currentYear = new Date().getFullYear();
      if (currentYear - birthYear < 16) {
        newErrors.birthDate = "يجب أن يكون العمر 16 سنة أو أكثر";
      }
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save to localStorage
    const saved = localStorage.getItem("winCycleSubmissions");
    const submissions = saved ? JSON.parse(saved) : [];
    const newSubmission = {
      id: Date.now(),
      ...formData,
      registeredAt: new Date().toISOString()
    };
    localStorage.setItem("winCycleSubmissions", JSON.stringify([newSubmission, ...submissions]));
    
    setSuccessMsg("تم تسجيل طلبك بنجاح!");
    setFormData({
      fullName: "",
      wilaya: "",
      phone: "",
      email: "",
      gender: "",
      birthDate: ""
    });

    setTimeout(() => {
      setSuccessMsg("");
    }, 5000);
  };

  const scrollToForm = () => {
    const formEl = document.getElementById("registration-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-cairo text-gray-900">
      
      {/* Hero Section */}
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

      <main className="flex-grow">
        {/* About DZ Young Leaders */}
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

        {/* What is Win Cycle? */}
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

        {/* Why Join Us & Who We Need */}
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
                {[
                  "بناء شبكة علاقات وطنية قوية مع نخبة مكونة من 1000 شاب استثنائي عبر الوطن.",
                  "إثراء السيرة الذاتية (CV) بتجربة معتمدة تدعم طلبات المنح الدراسية الدولية.",
                  "تدريب عالي المستوى (حضورياً وعبر الإنترنت) على أيدي دكاترة، خبراء دوليين وإطارات الدولة.",
                  "المساهمة في بيئة نظيفة وتطوير مناطق الظل، مع فرصة الفوز بنقاط وجوائز قيمة."
                ].map((item, idx) => (
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
                  {["مبرمجون", "طاقم تسويق", "مهندسو إلكترونيات", "متطوعون ميدانيون", "صناع محتوى وإعلاميون"].map((tag, i) => (
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

        {/* Registration Form Section */}
        <section id="registration-form" className="py-24 px-6 relative bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-green-600 font-bold tracking-wider uppercase text-sm mb-2 block">حجز مقعد</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 inline-block relative">
                استمارة التسجيل
                <div className="h-1 w-1/2 bg-green-500 absolute -bottom-4 right-1/4 rounded-full"></div>
              </h2>
              <p className="text-gray-600 mt-8 font-medium">املأ البيانات أدناه لتصبح جزءاً من فريقنا المتميز في برنامج DZ Young Leaders.</p>
            </div>

            {successMsg && (
              <div className="mb-8 p-4 bg-green-100 text-green-800 rounded-xl border border-green-200 flex items-center gap-3 font-semibold shadow-sm animate-fade-in text-right">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white border text-right border-gray-100 shadow-xl rounded-3xl p-8 md:p-10 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-green-600 to-green-400"></div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">الاسم الكامل <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-green-500'} focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-colors`}
                    placeholder="أدخل اسمك الكامل"
                  />
                  {errors.fullName && <p className="text-red-500 text-xs font-semibold mt-1">{errors.fullName}</p>}
                </div>

                {/* Wilaya dropdown */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">الولاية <span className="text-red-500">*</span></label>
                  <select 
                    name="wilaya"
                    value={formData.wilaya}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.wilaya ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-green-500'} focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-colors appearance-none cursor-pointer`}
                  >
                    <option value="">اختر الولاية...</option>
                    {WILAYAS.map((w, idx) => (
                      <option key={idx} value={w}>{`${idx + 1} - ${w}`}</option>
                    ))}
                  </select>
                  {errors.wilaya && <p className="text-red-500 text-xs font-semibold mt-1">{errors.wilaya}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Phone */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">رقم الهاتف <span className="text-red-500">*</span></label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    dir="ltr"
                    className={`w-full px-4 py-3 text-right rounded-xl border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-green-500'} focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-colors`}
                    placeholder="05 / 06 / 07 XX XX XX XX"
                  />
                  {errors.phone && <p className="text-red-500 text-xs font-semibold mt-1">{errors.phone}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">البريد الإلكتروني <span className="text-red-500">*</span></label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    dir="ltr"
                    className={`w-full text-right px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-green-500'} focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-colors`}
                    placeholder="example@mail.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs font-semibold mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Gender */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700 mb-3">الجنس <span className="text-red-500">*</span></label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-4 py-2 rounded-xl border border-gray-200 hover:border-green-300 transition-colors">
                      <input 
                        type="radio" 
                        name="gender" 
                        value="ذكر"
                        checked={formData.gender === "ذكر"}
                        onChange={handleChange}
                        className="w-5 h-5 text-green-600 focus:ring-green-500 accent-green-600"
                      />
                      <span className="font-medium text-gray-700">ذكر</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-4 py-2 rounded-xl border border-gray-200 hover:border-green-300 transition-colors">
                      <input 
                        type="radio" 
                        name="gender" 
                        value="أنثى"
                        checked={formData.gender === "أنثى"}
                        onChange={handleChange}
                        className="w-5 h-5 text-green-600 focus:ring-green-500 accent-green-600"
                      />
                      <span className="font-medium text-gray-700">أنثى</span>
                    </label>
                  </div>
                  {errors.gender && <p className="text-red-500 text-xs font-semibold mt-1">{errors.gender}</p>}
                </div>

                {/* Birth Date */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">تاريخ الميلاد <span className="text-red-500">*</span></label>
                  <input 
                    type="date" 
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.birthDate ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-green-500'} focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-colors w-full uppercase`}
                  />
                  {errors.birthDate && <p className="text-red-500 text-xs font-semibold mt-1">{errors.birthDate}</p>}
                </div>
              </div>

              <div className="pt-6">
                <button 
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-4 rounded-xl shadow-[0_4px_14px_0_rgba(22,163,74,0.39)] hover:shadow-[0_6px_20px_rgba(22,163,74,0.23)] hover:-translate-y-0.5 transition-all active:scale-[0.98] flex justify-center items-center gap-2"
                >
                  أرسل طلب الانضمام
                </button>
              </div>

            </form>
          </div>
        </section>

        {/* Partners */}
        <section className="py-20 bg-white px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h3 className="text-lg font-bold text-gray-400 mb-10 uppercase tracking-widest flex items-center justify-center gap-4">
              <span className="w-12 h-px bg-gray-200 block"></span>
              بدعم ورعاية من
              <span className="w-12 h-px bg-gray-200 block"></span>
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 hover:opacity-100 transition-opacity duration-500">
              <div className="font-black text-2xl text-gray-800 tracking-tight">وزارة الشباب والرياضة</div>
              <div className="w-2 h-2 rounded-full bg-gray-300 hidden md:block"></div>
              <div className="font-black text-2xl text-gray-800 tracking-tight">المجلس الأعلى للشباب</div>
              <div className="w-2 h-2 rounded-full bg-green-500 hidden md:block"></div>
              <div className="font-black text-2xl text-blue-600/90 flex items-center gap-2">
                 شركة مسعد (شريك محتمل)
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
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
               {/* Dummy social icons styled beautifully */}
               {["فيسبوك", "تويتر", "لينكد إن"].map((social, idx) => (
                  <div key={idx} className="bg-gray-800 text-gray-300 hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg font-semibold text-xs cursor-pointer transition-colors border border-gray-700 hover:border-green-500">
                    {social}
                  </div>
               ))}
             </div>
           </div>
         </div>
         <div className="max-w-6xl mx-auto border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm font-medium gap-4">
           <p>© {new Date().getFullYear()} مشروع Win Cycle. جميع الحقوق محفوظة.</p>
           <p className="text-gray-500">صنع بشغف لجزائر خضراء</p>
         </div>
      </footer>
    </div>
  );
}

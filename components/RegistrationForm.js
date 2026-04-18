"use client";

import { useState } from "react";
import { WILAYAS } from "@/lib/constants";
import { db } from "@/lib/db";
import { submitToGoogleSheets } from "@/app/actions";

export default function RegistrationForm() {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setServerError("");
    setSuccessMsg("");

    // 1. Try to save to Google Sheets
    const result = await submitToGoogleSheets(formData);
    
    if (result.success) {
      // 2. Also save to LocalStorage as a backup (optional)
      db.saveSubmission(formData);
      
      setSuccessMsg("تم تسجيل طلبك بنجاح في قاعدة البيانات!");
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
      }, 7000);
    } else {
      setServerError(result.error || "عذراً، حدث خطأ أثناء التسجيل. يرجى مراجعة إعدادات Google Sheets.");
    }
    
    setIsSubmitting(false);
  };

  return (
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

        {serverError && (
          <div className="mb-8 p-4 bg-red-100 text-red-800 rounded-xl border border-red-200 flex items-center gap-3 font-semibold shadow-sm animate-fade-in text-right">
            <svg className="w-6 h-6 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            {serverError}
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
              disabled={isSubmitting}
              className={`w-full ${isSubmitting ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white font-bold text-lg py-4 rounded-xl shadow-[0_4px_14px_0_rgba(22,163,74,0.39)] hover:shadow-[0_6px_20px_rgba(22,163,74,0.23)] hover:-translate-y-0.5 transition-all active:scale-[0.98] flex justify-center items-center gap-2`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  جاري تسجيل طلبك...
                </>
              ) : "أرسل طلب الانضمام"}
            </button>
          </div>

        </form>
      </div>
    </section>
  );
}

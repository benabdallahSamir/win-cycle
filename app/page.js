"use client";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import JoinUs from "@/components/JoinUs";
import RegistrationForm from "@/components/RegistrationForm";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";

export default function Home() {
  const scrollToForm = () => {
    const formEl = document.getElementById("registration-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-cairo text-gray-900">
      <Hero scrollToForm={scrollToForm} />
      
      <main className="flex-grow">
        <About />
        <Features />
        <JoinUs />
        <RegistrationForm />
        <Partners />
      </main>

      <Footer />
    </div>
  );
}

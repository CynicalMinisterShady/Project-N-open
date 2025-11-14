"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Zap, Cpu, ArrowRight, Menu, X, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const divisions = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "AI Innovation & Research",
      description: "Focused on predictive systems, machine learning models, and intelligent automation for next-gen solutions."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Health & Wellness Systems",
      description: "Dedicated to personalized health and mental wellness technologies that enhance quality of life."
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Software Architecture & Engineering",
      description: "Responsible for robust, scalable system design with modular architecture across all verticals."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Experience & Interface Design",
      description: "Ensures human centered, aesthetic digital experiences with intuitive interactions."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Cloud & Data Operations",
      description: "Manages secure, efficient cloud deployments and data pipelines for optimal performance."
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Management Support",
      description: "Enables smooth team workflows, task tracking, and HR processes through reliable management tools."
    },
  ];

  const objectives = [
    "Establish NirveonX Labs as a central hub for next generation product development",
    "Create an internal developer environment supporting continuous learning and prototype deployment",
    "Design scalable, modular systems integrating across all NirveonX verticals",
    "Encourage collaboration between AI, data science, and engineering teams",
    "Serve as the foundation for intelligent wellness platforms to AI-powered business tools"
  ];

  // NEW FAQ SECTION
  const faqs = [
    {
      question: "What is NirveonX Labs?",
      answer: "Labs is the innovation and R&D wing of NirveonX Omnicare, responsible for AI, engineering, and next gen digital ecosystems."
    },
    {
      question: "Who can collaborate with Labs?",
      answer: "Internal teams, research partners, startups, and enterprise collaborators seeking AI, automation, or health tech solutions."
    },
    {
      question: "Do you develop custom AI models?",
      answer: "Yes. Labs specializes in custom predictive systems, automation engines, and domain specific intelligence models."
    },
    {
      question: "How do I request a project or collaboration?",
      answer: "Use the ‘Get Our Services’ section or contact NirveonX Omnicare for proposal submission."
    }
  ];

  return (
    <div className="cursor-auto min-h-screen bg-black text-blue-100 overflow-hidden">

      {/* Animated background grid */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Glow Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000" />
      </div>

      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50 ? "bg-black/90 backdrop-blur-md border-b border-blue-900/50" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-400 tracking-wide">
            NirveonX Labs
          </h1>
          
          <button 
            className="md:hidden text-blue-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>

          <div className="hidden md:block">
            <button className="group relative px-6 py-2.5 rounded bg-blue-600 hover:bg-blue-500 transition-all duration-300 border border-blue-500/50 hover:border-blue-400">
              <span className="relative z-10 flex items-center gap-2 text-white font-medium">
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-blue-900/50 p-6">
            <a href="mailto: support@nirveonx.com" className="underline hover:text-white">
               <button className="w-full px-6 py-3 rounded bg-blue-600 hover:bg-blue-500 transition-all duration-300 text-white font-medium">
              Get Started
            </button>
            </a>
            <button className="w-full px-6 py-3 rounded bg-blue-600 hover:bg-blue-500 transition-all duration-300 text-white font-medium">
              Get Started
            </button>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-white">
            Building the Future of <br />
            <span className="text-blue-400">Intelligent Systems</span>
          </h2>

          <p className="text-xl text-blue-300/80 max-w-3xl mx-auto mb-10 leading-relaxed">
            The innovation wing of NirveonX Omnicare Pvt. Ltd. where technology,
            intelligence and healthcare converge to build futuristic solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group px-8 py-4 rounded bg-blue-600 hover:bg-blue-500 transition-all duration-300 font-semibold text-white border border-blue-500/50 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20">
              <span className="flex items-center justify-center gap-2">
                Explore Divisions
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="px-8 py-4 rounded border border-blue-700 hover:bg-blue-950/50 transition-all duration-300 font-semibold text-blue-300">
              View Research
            </button>
          </div>
        </div>
      </section>

      {/* DIVISIONS SECTION */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-white">Key Divisions</h3>
            <p className="text-blue-300/70 text-lg">Cross domain collaboration for impactful innovation</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {divisions.map((division, index) => (
              <div key={index} className="group relative p-8 rounded-sm bg-blue-950/30 border border-blue-800/30 hover:border-blue-600/50 hover:bg-blue-950/50 transition-all duration-500">
                <div className="inline-flex p-4 rounded-sm bg-blue-900/50 border border-blue-700/50 mb-6 text-blue-400">
                  {division.icon}
                </div>
                <h4 className="text-2xl font-bold mb-3 text-blue-300">{division.title}</h4>
                <p className="text-blue-400/70 mb-6">{division.description}</p>
                <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium">
                  Learn More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION + APPROACH */}
      <section className="relative py-24 px-6 border-t border-blue-900/30">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="p-10 rounded-sm bg-blue-950/30 border border-blue-800/30">
            <h3 className="text-3xl font-bold mb-6 text-blue-300">Our Vision</h3>
            <p className="text-lg text-blue-200/80 leading-relaxed">
              To build an integrated platform fostering innovation across health, AI, and
              smart living powered by ethics, sustainability, and data driven design.
            </p>
            <p className="text-lg text-blue-200/80 mt-4 leading-relaxed">
              We combine AI, engineering, and human centered design to enable rapid experimentation and scalable solutions.
            </p>
          </div>

          <div className="p-10 rounded-sm bg-blue-950/30 border border-blue-800/30">
            <h3 className="text-3xl font-bold mb-6 text-blue-300">Our Approach</h3>
            <ul className="space-y-3">
              {[
                "Open collaboration among teams & partners",
                "Modular, scalable development models",
                "High coding standards with CI/CD",
                "Transparency & documentation at every stage"
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                  <p className="text-blue-200/80">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* OBJECTIVES */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h3 className="text-4xl md:text-5xl font-bold text-white">Core Objectives</h3>
          <p className="text-blue-300/70 text-lg">Our roadmap to transformative innovation</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {objectives.map((obj, index) => (
            <div key={index} className="group p-6 rounded-sm bg-blue-950/20 border border-blue-800/30 hover:border-blue-600/50 hover:bg-blue-950/40 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-900/50 border border-blue-700/50 text-blue-400 rounded-sm">
                  {index + 1}
                </div>
                <p className="text-blue-200/90 pt-1">{obj}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== FAQ SECTION ===================== */}
      <section id="faqs" className="py-24 bg-black border-t border-blue-900/40 px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-blue-300/80 mt-3">Everything you need to know about NirveonX Labs</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-blue-950/30 border border-blue-800/40 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-blue-200 flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-blue-400 mt-1" /> {faq.question}
              </h3>
              <p className="text-blue-300/70 mt-2 pl-8">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== CTA: GET OUR SERVICES NOW ===================== */}
      <section className="py-24 bg-gradient-to-r from-blue-900/30 to-blue-600/20 border-t border-blue-900/40 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-6">Get Our Services Now</h2>
          <p className="text-xl text-blue-200/80 mb-10">
            Partner with NirveonX Labs to build intelligent healthcare, AI automation,
            and next-gen software solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg border border-blue-500/50">
              Request Collaboration
            </button>
            <button className="border border-blue-400 text-blue-300 hover:bg-blue-950 px-8 py-4 rounded-lg text-lg font-semibold">
              Contact Support
            </button>
          </div>

          <p className="mt-6 text-blue-300 text-sm">
            Email us at{" "}
            <a href="mailto: support@nirveonx.com" className="underline hover:text-white">
               support@nirveonx.com
            </a>
          </p>
        </div>
      </section>

      {/* ===================== NEW FOOTER ===================== */}
      <footer className="bg-black py-16 border-t border-blue-900/40">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-blue-300 mb-4">NirveonX Labs</h3>
            <p className="text-blue-400/70">
              Advanced R&D unit powering AI, health tech, and next-gen digital systems.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-semibold text-blue-200 mb-4">Services</h4>
            <ul className="space-y-2 text-blue-400/70">
              <li><Link href="/HealthMateLanding" className="hover:text-blue-200">HealthMate</Link></li>
              <li><Link href="/mindease" className="hover:text-blue-200">MindEase</Link></li>
              <li><Link href="/goldencare" className="hover:text-blue-200">GoldenCare</Link></li>
              <li><Link href="/amborapid" className="hover:text-blue-200">AmboRapid</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xl font-semibold text-blue-200 mb-4">Company</h4>
            <ul className="space-y-2 text-blue-400/70">
              <li><Link href="/about" className="hover:text-blue-200">About Us</Link></li>
              <li><Link href="/team" className="hover:text-blue-200">Our Team</Link></li>
              <li><Link href="/careers" className="hover:text-blue-200">Careers</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xl font-semibold text-blue-200 mb-4">Support</h4>
            <ul className="space-y-2 text-blue-400/70">
              <li><a href="mailto:support@nirveonx.com" className="hover:text-blue-200">Contact Support</a></li>
              {/* <li><a href="tel:+919491689462" className="hover:text-blue-200">+91 94916 89462</a></li> */}
              <li><Link href="/privacy" className="hover:text-blue-200">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-900/40 mt-10 pt-8 text-center text-blue-500/60">
          © {new Date().getFullYear()} NirveonX Labs — Building the Future of Intelligence.
        </div>
      </footer>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}

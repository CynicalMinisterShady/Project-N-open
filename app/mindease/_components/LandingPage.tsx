'use client'
import React, { memo } from "react";
import { ArrowLeft, Phone, Video, BrainCircuit, Palette, Smile, Lightbulb, Users, HeartHandshake, Sparkles, Brain, Heart } from "lucide-react";
import { motion } from "framer-motion";

const SERVICES = [
  { title: "Guided Meditation", imagePath: "/Guided-mindease.png", link: "/bloom-buds", description: "Find calm and clarity with guided sessions.", icon: BrainCircuit, color: "bg-green-500" },
  { title: "HobbyBased Therapy", imagePath: "/Hobby-mindease.png", link: "/echo-match", description: "Rediscover joy and reduce stress with hobbies.", icon: Palette, color: "bg-purple-500" },
  { title: "Daily Stress Check", imagePath: "/Daily-mindease.png", link: "/bubble", description: "Assess your stress and get recommendations.", icon: Smile, color: "bg-yellow-500" },
  { title: "Mindfulness Tips", imagePath: "/Mindfull-mindease.png", link: "/mindease/chat", description: "Daily tips and exercises for mindfulness.", icon: Lightbulb, color: "bg-blue-500" },
  { title: "Early Adult Support", imagePath: "/Mindfull-mindease.png", link: "/earlyAdult", description: "Navigate early adulthood with dedicated support.", icon: Users, color: "bg-indigo-500" },
  { title: "Indian Grandparent", imagePath: "/Mindfull-mindease.png", link: "/indiangrand", description: "Connect with a virtual Indian grandparent.", icon: HeartHandshake, color: "bg-rose-500" },
];

const Header = memo(({ callerName }: { callerName: string }) => (
  <header className="w-full px-6 py-4 flex justify-between items-center">
    <div className="flex items-center gap-4">
      <a href="/VirzeonX" className="bg-zinc-800 hover:bg-zinc-700 rounded-lg p-2 transition-colors">
        <ArrowLeft className="text-white h-5 w-5" />
      </a>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">MindEase</h1>
        <p className="text-zinc-400 text-sm">Your Personal Wellness Coach</p>
      </div>
    </div>
    <div className="flex gap-3">
      <a href={`/callscreen/audio_call?callerName=${encodeURIComponent(callerName)}&app=mindease`} className="bg-green-600 hover:bg-green-700 rounded-lg p-2.5 transition-colors">
        <Phone className="text-white h-5 w-5" />
      </a>
      <a href={`/callscreen/video_call?callerName=${encodeURIComponent(callerName)}&app=mindease`} className="bg-red-600 hover:bg-red-700 rounded-lg p-2.5 transition-colors">
        <Video className="text-white h-5 w-5" />
      </a>
    </div>
  </header>
));

const StatsCard = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
    <div className="flex items-center gap-3 mb-2">
      <div className="bg-blue-500/20 rounded-lg p-2">
        <Icon className="text-blue-400 h-5 w-5" />
      </div>
      <p className="text-zinc-400 text-sm">{label}</p>
    </div>
    <p className="text-2xl font-bold text-white">{value}</p>
  </div>
);

const ServiceCard = memo(({ service, index }: { service: any; index: number }) => {
  const Icon = service.icon;
  
  return (
    <motion.a
      href={service.link}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <img 
              src={service.imagePath} 
              alt={service.title}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className={`absolute -bottom-2 -right-2 ${service.color} rounded-lg p-1.5`}>
              <Icon className="text-white h-4 w-4" />
            </div>
          </div>
          <h3 className="text-white font-semibold text-lg group-hover:text-blue-400 transition-colors">{service.title}</h3>
        </div>
        <p className="text-zinc-400 text-sm flex-grow">{service.description}</p>
        <div className="mt-4 flex items-center text-blue-400 text-sm font-medium">
          Explore <ArrowLeft className="ml-2 h-4 w-4 rotate-180 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.a>
  );
});

const CircularLayout = memo(() => {
  const radius = 200;
  const numServices = SERVICES.length;

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {/* Center logo */}
      <div className="absolute z-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-1">
        <div className="bg-zinc-900 rounded-xl p-6">
          <img 
            src="https://res.cloudinary.com/dnfq7ty1x/image/upload/v1759127653/nirveonx-mindease-lable_pz2vts.png" 
            alt="MindEase Logo" 
            className="w-20 h-20"
          />
        </div>
      </div>

      {/* Orbit cards */}
      {SERVICES.map((service, i) => {
        const angle = (i / numServices) * 2 * Math.PI - Math.PI / 2;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        const Icon = service.icon;

        return (
          <motion.a
            key={service.title}
            href={service.link}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, x, y }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="absolute group bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-all w-40"
          >
            <div className="flex flex-col items-center text-center gap-2">
              <img 
                src={service.imagePath} 
                alt={service.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <h3 className="text-white text-sm font-semibold group-hover:text-blue-400 transition-colors">{service.title}</h3>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
});

export default function LandingPage() {
  const callerName = "MindEase Assistant";

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <Header callerName={callerName} />
        
        {/* Hero Section */}
        <div className="px-6 py-8">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-4"
              >
                <span className="text-blue-400 text-sm font-medium">🧘 Mental Wellness Platform</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent"
              >
                Transform Your Mental Wellbeing
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-zinc-400 text-lg mb-6"
              >
                Experience personalized mental health support through AI-powered guidance, meditation, and lifestyle coaching.
              </motion.p>
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                href="/mindease/chat"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
              >
                Start Your Journey
              </motion.a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <StatsCard icon={Brain} label="Active Users" value="12.5K+" />
              <StatsCard icon={Heart} label="Sessions Today" value="3.2K+" />
              <StatsCard icon={Sparkles} label="Success Rate" value="94%" />
              <StatsCard icon={Users} label="Experts" value="50+" />
            </div>
          </div>

          {/* Circular Layout for Desktop */}
          <div className="hidden lg:block mb-12">
            <h3 className="text-2xl font-bold text-center mb-8">Explore Our Services</h3>
            <CircularLayout />
          </div>

          {/* Grid Layout */}
          <div className="lg:hidden mb-8">
            <h3 className="text-2xl font-bold mb-6">Our Services</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {SERVICES.map((service, i) => (
                <ServiceCard key={service.title} service={service} index={i} />
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-4 mb-12">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl p-8 text-center"
          >
            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-yellow-500 text-xl">★</span>
              ))}
            </div>
            <p className="text-zinc-300 text-lg italic mb-4">
              "MindEase has transformed my daily routine. The guided meditations and personalized support have made a real difference in managing my stress."
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full" />
              <div className="text-left">
                <p className="text-white font-semibold">Sarah Johnson</p>
                <p className="text-zinc-400 text-sm">Mental Health Advocate</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-800 px-6 py-6 text-center text-zinc-500 text-sm">
          © 2025 MindEase. Comprehensive wellness solutions designed for your peace of mind.
        </div>
      </div>
    </div>
  );
}
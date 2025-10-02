"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import ParticlesBackground from "@/components/shared/particle-background";
import CustomCursor from "@/components/shared/custom-cursor";
import BackButton from "@/components/Auth/BackButton";
import "@/styles/responsive.css";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Heart,
  Shield,
  Brain,
  Dumbbell,
  Star,
  Stethoscope,
  Home,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const VirzeonXMainComponent = () => {
  const containerRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState<number>(1); // Default first service
  const [isVisible, setIsVisible] = useState(false);

  const handleCardHover = useCallback((serviceId: number) => {
    setHoveredCard(serviceId);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const virzeonXServiceData = [
    {
      id: 1,
      title: "CuraForgeX",
      description:
        "AI-driven fitness and wellness platform offering personalized workout plans and health tracking.",
      path: "/forum",
      url: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1755869157/CuraForgeX_tp52fg.jpg",
      icon: <Dumbbell className="w-6 h-6" />,
      color: "from-emerald-400 to-cyan-400",
      category: "Fitness",
    },
    {
      id: 2,
      title: "FastMediX",
      description:
        "Instant AI-powered medical support and emergency assistance for faster healthcare access.",
      path: "/FastMediX",
      url: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1757928362/ChatGPT_Image_Sep_15_2025_02_55_48_PM_lx0lga.png",
      icon: <Star className="w-6 h-6" />,
      color: "from-blue-400 to-cyan-400",
      category: "Wellness",
    },
    {
      id: 3,
      title: "PharmXPlus",
      description:
        "Smart AI-driven pharmaceutical platform connecting patients with reliable medication access.",
      path: "/PharmXPlus",
      url: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1757928309/ChatGPT_Image_Sep_15_2025_02_54_32_PM_foo46v.png",
      icon: <Stethoscope className="w-6 h-6" />,
      color: "from-blue-400 to-indigo-400",
      category: "Telehealth",
    },
    {
      id: 4,
      title: "AmboRapid",
      description:
        "AI-optimized ambulance dispatch system for real-time emergency response and care.",
      path: "/AmboRapid",
      url: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1757928207/ChatGPT_Image_Sep_15_2025_02_53_07_PM_ntplxt.png",
      icon: <Home className="w-6 h-6" />,
      color: "from-sky-400 to-blue-500",
      category: "Elder Care",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const leftVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const rightVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 30 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: i * 0.05,
      },
    }),
    hover: {
      y: -6,
      scale: 1.02,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <ParticlesBackground />
      <div className="relative z-50">
        <BackButton />
      </div>
      <CustomCursor containerRef={containerRef} />

      <motion.div
        className="relative z-10 px-4 sm:px-6 lg:px-8 pt-16 pb-12"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center min-h-[85vh]">
            {/* Left Side */}
            <motion.div
              className="space-y-6 lg:space-y-8 lg:pr-4"
              variants={leftVariants}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300 uppercase tracking-wide">
                  ArovianX Services
                </span>
              </motion.div>

              <div className="space-y-4 lg:space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
                    Medhcare
                  </span>
                  <br />
                  <span className="text-white">Services</span>
                </h1>

                <div className="flex items-center gap-2 lg:gap-3 text-blue-400">
                  <Zap className="w-5 h-5 lg:w-7 lg:h-7" />
                  <span className="text-lg lg:text-xl font-medium">
                    Powered by Innovation
                  </span>
                </div>
              </div>

              <p className="text-gray-300 text-lg lg:text-xl leading-relaxed">
                Discover revolutionary healthcare solutions powered by artificial
                intelligence. Transform your wellness journey with our
                comprehensive suite of AI-driven platforms designed to enhance
                your health, fitness, and overall well-being.
              </p>

              <div className="space-y-4">
                {[
                  { icon: <Heart className="w-5 h-5" />, text: "Personalized Care" },
                  { icon: <Shield className="w-5 h-5" />, text: "Secure & Private" },
                  { icon: <Brain className="w-5 h-5" />, text: "AI-Powered Intelligence" },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <div className="text-blue-400">{feature.icon}</div>
                    <span className="text-lg">{feature.text}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 lg:gap-6 pt-4 lg:pt-6">
                {[
                  { number: "6+", label: "AI Services" },
                  // { number: "10k+", label: "Users" },
                  { number: "24/7", label: "Support" },
                ].map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-2xl lg:text-3xl font-bold text-white">
                      {stat.number}
                    </div>
                    <div className="text-xs lg:text-sm text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Side */}
            <motion.div
              className="space-y-4 lg:space-y-6 relative mt-8 lg:mt-0"
              variants={rightVariants}
            >
              {/* Featured Service */}
              <div className="relative h-64 md:h-72 lg:h-80 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10">
                {(() => {
                  const service =
                    virzeonXServiceData.find((s) => s.id === hoveredCard) ||
                    virzeonXServiceData[0];
                  return (
                    <div className="relative w-full h-full">
                      <img
                        src={service.url}
                        alt={service.title}
                        className="w-full h-full object-cover transition-opacity duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20`}
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                        <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
                          <div className="text-white text-2xl lg:text-3xl">
                            {service.icon}
                          </div>
                          <span className="px-2 lg:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs lg:text-sm font-medium text-white">
                            {service.category}
                          </span>
                        </div>
                        <h3 className="text-xl lg:text-2xl font-bold text-white mb-1 lg:mb-2">
                          {service.title}
                        </h3>
                        <p className="text-gray-200 text-sm lg:text-base leading-relaxed line-clamp-2 lg:line-clamp-none">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Service Navigation Pills */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 lg:gap-3">
                {virzeonXServiceData.map((service, index) => (
                  <motion.div
                    key={service.id}
                    variants={cardVariants}
                    custom={index}
                    whileHover="hover"
                    whileTap="tap"
                    onMouseEnter={() => handleCardHover(service.id)}
                    onTouchStart={() => handleCardHover(service.id)}
                    className="group cursor-pointer touch-manipulation"
                  >
                    <Link href={service.path}>
                      <div
                        className={`relative p-3 lg:p-4 rounded-xl border transition-all duration-200 ${
                          hoveredCard === service.id
                            ? "bg-white/10 border-white/30 backdrop-blur-sm"
                            : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                        }`}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-200 rounded-xl`}
                        />
                        <div className="relative z-10 text-center">
                          <div className="text-white mb-1 lg:mb-2 flex justify-center">
                            {service.icon}
                          </div>
                          <h4 className="text-xs lg:text-sm font-semibold text-white group-hover:text-blue-300 transition-colors duration-200 line-clamp-1">
                            {service.title}
                          </h4>
                          <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-200 hidden md:block">
                            {service.category}
                          </span>
                          <div
                            className={`mt-2 lg:mt-3 h-0.5 bg-gradient-to-r ${service.color} ${
                              hoveredCard === service.id
                                ? "scale-x-100"
                                : "scale-x-0 group-hover:scale-x-100"
                            } transition-transform duration-200 origin-center`}
                          />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VirzeonXMainComponent;

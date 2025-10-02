// DESIGN 1

// "use client";
// import React, { useRef, useState, useEffect } from "react";
// import ParticlesBackground from "@/components/shared/particle-background";
// import CustomCursor from "@/components/shared/custom-cursor";
// import BackButton from "@/components/Auth/BackButton";
// import "@/styles/responsive.css";
// import { ArrowRight, Sparkles, Zap } from "lucide-react";
// import Link from "next/link";
// import { motion } from "framer-motion";

// const VirzeonXMainComponent = () => {
//   const containerRef = useRef(null);
//   const [hoveredCard, setHoveredCard] = useState<number | null>(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   const virzeonXServiceData = [
//     {
//       id: 1,
//       title: "FitronX",
//       description:
//         "AI-driven fitness and wellness platform offering personalized workout plans and health tracking.",
//       path: "/fitronx",
//       url: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1757926604/FitronX_ty8omf.webp",
//       icon: "💪",
//       color: "from-emerald-400 to-cyan-400"
//     },
//     {
//       id: 2,
//       title: "Wellip",
//       description:
//         "Comprehensive wellness platform with AI-powered health monitoring and lifestyle optimization.",
//       path: "/wellip",
//       url: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1756118529/Wellip__kfqux2.png",
//       icon: "🌟",
//       color: "from-purple-400 to-pink-400"
//     },
//     {
//       id: 3,
//       title: "HealthMate",
//       description:
//         "Telehealth consultation platform connecting patients with healthcare professionals instantly.",
//       path: "/HealthMateLanding",
//       url: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1757926656/telehealth-consultation_uylybn.webp",
//       icon: "🩺",
//       color: "from-blue-400 to-indigo-400"
//     },
//     {
//       id: 4,
//       title: "GoldenCare",
//       description:
//         "Specialized healthcare solutions for elderly care with 24/7 monitoring and support.",
//       path: "/goldencare",
//       url: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1757926657/service-goldencare-pic_l4i5oq.webp",
//       icon: "🏥",
//       color: "from-amber-400 to-orange-400"
//     },
//     {
//       id: 5,
//       title: "MindEase",
//       description:
//         "Mental health and meditation platform with AI-powered therapy and stress management.",
//       path: "/mindease",
//       url: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1757926656/girl-sitting-pose_yvyaxi.webp",
//       icon: "🧘‍♀️",
//       color: "from-teal-400 to-blue-400"
//     },
//     {
//       id: 6,
//       title: "PetAI",
//       description:
//         "AI-powered pet healthcare monitoring and veterinary consultation platform.",
//       path: "/pet-ai",
//       url: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1757926657/petai_l3rvpm.webp",
//       icon: "🐾",
//       color: "from-rose-400 to-pink-400"
//     },
//   ];
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { duration: 0.6, ease: "easeOut" }
//     }
//   };

//   const cardVariants = {
//     hidden: { scale: 0.9, opacity: 0, y: 30 },
//     visible: { 
//       scale: 1, 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut" }
//     },
//     hover: {
//       y: -8,
//       scale: 1.02,
//       transition: { duration: 0.3, ease: "easeInOut" }
//     }
//   };

//   return (
//     <div className="min-h-screen w-full relative overflow-hidden">
//       <ParticlesBackground />
//       <div className="relative z-50">
//         <BackButton />
//       </div>
//       <CustomCursor containerRef={containerRef} />

//       {/* Background Gradient And Animated Background Elements add here below */}
//       <motion.div 
//         className="relative z-10 px-4 sm:px-6 lg:px-8 pt-20 pb-12"
//         initial="hidden"
//         animate={isVisible ? "visible" : "hidden"}
//         variants={containerVariants}
//       >
//         <div className="max-w-7xl mx-auto">
//           {/* Centered Header Section */}
//           <div className="text-center space-y-8 mb-16">
//             {/* Badge */}
//             <motion.div 
//               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 backdrop-blur-sm"
//               whileHover={{ scale: 1.05 }}
//               transition={{ duration: 0.2 }}
//               variants={itemVariants}
//             >
//               <Sparkles className="w-4 h-4 text-purple-400" />
//               <span className="text-sm font-medium text-purple-300 uppercase tracking-wide">
//                 VirzeonX Services
//               </span>
//             </motion.div>

//             {/* Main Heading */}
//             <div className="space-y-6">
//               <motion.h1 
//                 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
//                 variants={itemVariants}
//               >
//                 <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
//                   AI Healthcare
//                 </span>
//                 <br />
//                 <span className="text-white">Solutions</span>
//               </motion.h1>

//               <motion.div 
//                 className="flex items-center justify-center gap-2 text-purple-400"
//                 variants={itemVariants}
//               >
//                 <Zap className="w-6 h-6" />
//                 <span className="text-lg font-medium">Powered by Innovation</span>
//               </motion.div>
//             </div>

//             {/* Description */}
//             <motion.p 
//               className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto"
//               variants={itemVariants}
//             >
//               Discover revolutionary healthcare solutions powered by artificial intelligence. 
//               Transform your wellness journey with our comprehensive suite of AI-driven platforms 
//               designed to enhance your health, fitness, and overall well-being.
//             </motion.p>

//             {/* Stats */}
//             <motion.div 
//               className="flex justify-center"
//               variants={itemVariants}
//             >
//               <div className="grid grid-cols-3 gap-8 lg:gap-12">
//                 {[
//                   { number: "6+", label: "AI Services" },
//                   { number: "10k+", label: "Users" },
//                   { number: "24/7", label: "Support" }
//                 ].map((stat, index) => (
//                   <div key={index} className="text-center">
//                     <div className="text-3xl font-bold text-white">{stat.number}</div>
//                     <div className="text-sm text-gray-400">{stat.label}</div>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>

//           {/* Services Grid Section */}
//           <motion.div 
//             className="space-y-8"
//             variants={itemVariants}
//           >
//             {/* Section Title */}
//             <motion.div 
//               className="text-center"
//               variants={itemVariants}
//             >
//               <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
//                 Our AI-Powered Services
//               </h2>
//               <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full"></div>
//             </motion.div>

//             {/* Services Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
//               {virzeonXServiceData.map((service, index) => (
//                 <motion.div
//                   key={service.id}
//                   variants={cardVariants}
//                   whileHover="hover"
//                   onHoverStart={() => setHoveredCard(service.id)}
//                   onHoverEnd={() => setHoveredCard(null)}
//                   className="group relative"
//                   custom={index}
//                 >
//                   <Link href={service.path}>
//                     <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:border-white/20 h-full">
//                       {/* Gradient Background */}
//                       <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

//                       {/* Image Container */}
//                       <div className="relative h-56 overflow-hidden">
//                         <img
//                           src={service.url}
//                           alt={service.title}
//                           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                         />

//                         {/* Overlay */}
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

//                         {/* Icon */}
//                         <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-xl">
//                           {service.icon}
//                         </div>

//                         {/* Hover Arrow */}
//                         <motion.div 
//                           className="absolute bottom-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
//                           initial={{ scale: 0.8, opacity: 0 }}
//                           whileHover={{ scale: 1, opacity: 1 }}
//                           transition={{ duration: 0.2 }}
//                         >
//                           <ArrowRight className="w-5 h-5 text-white" />
//                         </motion.div>
//                       </div>

//                       {/* Content */}
//                       <div className="p-6 space-y-4">
//                         <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
//                           {service.title}
//                         </h3>

//                         <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300 line-clamp-3">
//                           {service.description}
//                         </p>

//                         {/* Bottom Border Animation */}
//                         <div className={`h-0.5 bg-gradient-to-r ${service.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
//                       </div>
//                     </div>
//                   </Link>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default VirzeonXMainComponent;


// DESIGN 2

"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import ParticlesBackground from "@/components/shared/particle-background";
import CustomCursor from "@/components/shared/custom-cursor";
import BackButton from "@/components/Auth/BackButton";
import "@/styles/responsive.css";
import { ArrowRight, Sparkles, Zap, Heart, Shield, Brain, Dumbbell, Star, Stethoscope, Home, Brain as MindIcon, PawPrint } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const VirzeonXMainComponent = () => {
  const containerRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState<number>(1); // Set first service as default
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
      title: "FitronX",
      description:
        "AI-driven fitness and wellness platform offering personalized workout plans and health tracking.",
      path: "/fitronx",
      url: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1758817264/fitronx_ea0teu.png",
      icon: <Dumbbell className="w-6 h-6" />,
      color: "from-emerald-400 to-cyan-400",
      category: "Fitness"
    },
    {
      id: 2,
      title: "Wellip",
      description:
        "Comprehensive wellness platform with AI-powered health monitoring and lifestyle optimization.",
      path: "/wellip",
      url: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1756118529/Wellip__kfqux2.pn",
      icon: <Star className="w-6 h-6" />,
      color: "from-blue-400 to-cyan-400",
      category: "Wellness"
    },
    {
      id: 3,
      title: "HealthMate",
      description:
        "Telehealth consultation platform connecting patients with healthcare professionals instantly.",
      path: "/HealthMateLanding",
      url: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1758816753/Gemini_Generated_Image_aj84e9aj84e9aj84_xuk2qk.png",
      icon: <Stethoscope className="w-6 h-6" />,
      color: "from-blue-400 to-indigo-400",
      category: "Telehealth"
    },
    {
      id: 4,
      title: "GoldenCare",
      description:
        "Specialized healthcare solutions for elderly care with 24/7 monitoring and support.",
      path: "/goldencare",
      url: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1758816767/Gemini_Generated_Image_b5iypjb5iypjb5iy_mdwkgr.png",
      icon: <Home className="w-6 h-6" />,
      color: "from-sky-400 to-blue-500",
      category: "Elder Care"
    },
    {
      id: 5,
      title: "MindEase",
      description:
        "Mental health and meditation platform with AI-powered therapy and stress management.",
      path: "/mindease",
      url: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1758816767/Gemini_Generated_Image_ov3y83ov3y83ov3y_jiaylc.png",
      icon: <MindIcon className="w-6 h-6" />,
      color: "from-teal-400 to-blue-400",
      category: "Mental Health"
    },
    {
      id: 6,
      title: "PetAI",
      description:
        "AI-powered pet Healthcare monitoring and veterinary consultation platform.",
      path: "/pet-ai",
      url: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1758816768/Gemini_Generated_Image_pj34eapj34eapj34_loybml.png",
      icon: <PawPrint className="w-6 h-6" />,
      color: "from-cyan-400 to-blue-500",
      category: "Pet Care"
    },
  ];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const leftVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const rightVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
    }
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
        delay: i * 0.05
      }
    }),
    hover: {
      y: -6,
      scale: 1.02,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <ParticlesBackground />
      <div className="relative z-50">
        <BackButton />
      </div>
      <CustomCursor containerRef={containerRef} />

      {/* Background Gradient Animated Background Elements */}
    {/*}
<div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800/20 to-slate-900" />


<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
*/}


      <motion.div
        className="relative z-10 px-4 sm:px-6 lg:px-8 pt-16 pb-12"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center min-h-[85vh]">

            {/* Left Side - Main Heading */}
            <motion.div
              className="space-y-6 lg:space-y-8 lg:pr-4"
              variants={leftVariants}
            >
              {/* Badge */}
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

              {/* Main Heading */}
              <div className="space-y-4 lg:space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
                    AI Healthcare
                  </span>
                  <br />
                  <span className="text-white">Solutions</span>
                </h1>

                <div className="flex items-center gap-2 lg:gap-3 text-blue-400">
                  <Zap className="w-5 h-5 lg:w-7 lg:h-7" />
                  <span className="text-lg lg:text-xl font-medium">Powered by Innovation</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-lg lg:text-xl leading-relaxed">
                Discover revolutionary healthcare solutions powered by artificial intelligence.
                Transform your wellness journey with our comprehensive suite of AI-driven platforms
                designed to enhance your health, fitness, and overall well-being.
              </p>

              {/* Feature Highlights */}
              <div className="space-y-4">
                {[
                  { icon: <Heart className="w-5 h-5" />, text: "Personalized Care" },
                  { icon: <Shield className="w-5 h-5" />, text: "Secure & Private" },
                  { icon: <Brain className="w-5 h-5" />, text: "AI-Powered Intelligence" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-300">
                    <div className="text-blue-400">{feature.icon}</div>
                    <span className="text-lg">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 lg:gap-6 pt-4 lg:pt-6">
                {[
                  { number: "6+", label: "AI Services" },
                  // { number: "10k+", label: "Users" },
                  { number: "24/7", label: "Support" }
                ].map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-2xl lg:text-3xl font-bold text-white">{stat.number}</div>
                    <div className="text-xs lg:text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Interactive Services Display */}
            <motion.div
              className="space-y-4 lg:space-y-6 relative mt-8 lg:mt-0"
              variants={rightVariants}
            >
              <div className="text-center lg:text-left mb-4 lg:mb-8">
                <h2 className="text-2xl lg:text-3xl font-semibold text-white mb-3 lg:mb-4">
                  Our Services
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mx-auto lg:mx-0"></div>
              </div>

              {/* Featured Service Display */}
              <div className="relative h-64 md:h-72 lg:h-80 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10">
                {/* Main Featured Service */}
                <div className="absolute inset-0">
                  {(() => {
                    const service = virzeonXServiceData.find(s => s.id === hoveredCard) || virzeonXServiceData[0];
                    return (
                      <div className="relative w-full h-full">
                        <img
                          src={service.url}
                          alt={service.title}
                          className="w-full h-full object-cover transition-opacity duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20 transition-opacity duration-300`} />
                        <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                          <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
                            <div className="text-white text-2xl lg:text-3xl">{service.icon}</div>
                            <span className="px-2 lg:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs lg:text-sm font-medium text-white">
                              {service.category}
                            </span>
                          </div>
                          <h3 className="text-xl lg:text-2xl font-bold text-white mb-1 lg:mb-2">{service.title}</h3>
                          <p className="text-gray-200 text-sm lg:text-base leading-relaxed line-clamp-2 lg:line-clamp-none">{service.description}</p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
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
                      <div className={`relative p-3 lg:p-4 rounded-xl border transition-all duration-200 ${hoveredCard === service.id
                        ? 'bg-white/10 border-white/30 backdrop-blur-sm'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                        }`}>
                        {/* Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-200 rounded-xl`} />

                        <div className="relative z-10 text-center">
                          <div className="text-white mb-1 lg:mb-2 flex justify-center">{service.icon}</div>
                          <h4 className="text-xs lg:text-sm font-semibold text-white group-hover:text-blue-300 transition-colors duration-200 line-clamp-1">
                            {service.title}
                          </h4>
                          <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-200 hidden md:block">
                            {service.category}
                          </span>

                          {/* Bottom Border Animation */}
                          <div className={`mt-2 lg:mt-3 h-0.5 bg-gradient-to-r ${service.color} ${hoveredCard === service.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                            } transition-transform duration-200 origin-center`} />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Quick Stats for Active Service */}
              {hoveredCard && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-between items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                >
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">AI-Powered</div>
                    <div className="text-xs text-gray-400">Technology</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">24/7</div>
                    <div className="text-xs text-gray-400">Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">Secure</div>
                    <div className="text-xs text-gray-400">Platform</div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VirzeonXMainComponent;

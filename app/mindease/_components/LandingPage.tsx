'use client'
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, Video, BrainCircuit, Palette, Smile, Lightbulb, Users, HeartHandshake, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.215, 0.610, 0.355, 1.000]
    }
  }),
};

const imageVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 8px 25px rgba(255, 255, 255, 0.3)",
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  tap: {
    scale: 0.98
  }
};

const Header = ({ callerName }: { callerName: string }) => (
  <header className="w-full p-4 sm:p-6 flex justify-between items-center z-30 absolute top-0 left-0">
    <div className="flex items-center gap-4">
      <Link href="/VirzeonX" passHref>
        <motion.div
          whileHover={{ scale: 1.1, rotate: -10 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white/10 backdrop-blur-sm rounded-full p-2 cursor-pointer w-9 h-9 flex items-center justify-center"
        >
          <ArrowLeft className="text-white h-5 w-5" />
        </motion.div>
      </Link>
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-white"
        >
          MindEase
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="text-white/80 text-sm md:text-base font-medium"
        >
          Your Personal Wellness & Lifestyle Coach
        </motion.p>
      </div>
    </div>
    <div className="flex justify-end items-center gap-3">
      <Link href={`/callscreen/audio_call?callerName=${encodeURIComponent(callerName)}&app=mindease`} passHref>
        <motion.div
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-500/80 backdrop-blur-sm rounded-full p-2.5 shadow-lg shadow-green-500/20"
        >
          <Phone className="text-white h-5 w-5" />
        </motion.div>
      </Link>
      <Link href={`/callscreen/video_call?callerName=${encodeURIComponent(callerName)}&app=mindease`} passHref>
        <motion.div
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-500/80 backdrop-blur-sm rounded-full p-2.5 shadow-lg shadow-red-500/20"
        >
          <Video className="text-white h-5 w-5" />
        </motion.div>
      </Link>
    </div>
  </header>
);

const TitleSection = () => null; // This is no longer needed as its content is moved to the Header.

const services = [
  { title: "Guided Meditation", imagePath: "/Guided-mindease.png", link: "/bloom-buds", description: "Find calm and clarity with guided sessions.", icon: BrainCircuit, color: "text-green-400", gradient: "from-green-500/20 to-blue-500/20" },
  { title: "HobbyBased Therapy", imagePath: "/Hobby-mindease.png", link: "/echo-match", description: "Rediscover joy and reduce stress with hobbies.", icon: Palette, color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20" },
  { title: "Daily Stress Check", imagePath: "/Daily-mindease.png", link: "/bubble", description: "Assess your stress and get recommendations.", icon: Smile, color: "text-yellow-400", gradient: "from-yellow-500/20 to-orange-500/20" },
  { title: "Mindfulness Tips", imagePath: "/Mindfull-mindease.png", link: "/mindease/chat", description: "Daily tips and exercises for mindfulness.", icon: Lightbulb, color: "text-blue-400", gradient: "from-blue-500/20 to-indigo-500/20" },
  { title: "Early Adult Support", imagePath: "/Mindfull-mindease.png", link: "/earlyAdult", description: "Navigate early adulthood with dedicated support.", icon: Users, color: "text-indigo-400", gradient: "from-indigo-500/20 to-purple-500/20" },
  { title: "Indian Grandparent", imagePath: "/Mindfull-mindease.png", link: "/indiangrand", description: "Connect with a virtual Indian grandparent.", icon: HeartHandshake, color: "text-rose-400", gradient: "from-rose-500/20 to-red-500/20" },
];

const CircularLayout = () => {
  const radius = 280;
  const iconRadius = 450; // Kept a balanced radius for icons
  const numServices = services.length;

  return (
    <div className="relative w-full max-w-[900px] h-[90vh] flex items-center justify-center mx-auto">
      {/* Dotted circle for icons */}
      <div 
        className="absolute border-2 border-dotted border-white/10 rounded-full z-0"
        style={{ width: iconRadius * 2, height: iconRadius * 2 }}
      />

      {/* Dotted circle for cards */}
      <div 
        className="absolute border-4 border-dotted border-white/10 rounded-full z-10"
        style={{ width: radius * 2, height: radius * 2 }}
      />

      {/* Centerpiece */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute flex items-center justify-center z-20"
      >
        <motion.div
          className="w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-md"
          animate={{
            boxShadow: [
              "0 0 160px rgba(59, 130, 246, 0.3)",
              "0 0 200px rgba(168, 85, 247, 0.4)",
              "0 0 120px rgba(59, 130, 246, 0.3)",
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Image src="https://res.cloudinary.com/dnfq7ty1x/image/upload/v1759127653/nirveonx-mindease-lable_pz2vts.png" alt="MindEase Logo" width={70} height={70} />
        </motion.div>
      </motion.div>

      {/* Icons */}
      {services.map((service, i) => {
        const angle = ((i + 0.5) / numServices) * 2 * Math.PI - Math.PI / 2; // Offset angle to be between cards
        const x = iconRadius * Math.cos(angle);
        const y = iconRadius * Math.sin(angle);
        const Icon = service.icon;

        return (
          <motion.div
            key={`${service.title}-icon`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, x, y }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
            className="absolute z-20"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 shadow-lg`}>
              <Icon className={`${service.color} w-6 h-6`} />
            </div>
          </motion.div>
        );
      })}

      {/* Cards */}
      {services.map((service, i) => {
        const angle = (i / numServices) * 2 * Math.PI - Math.PI / 2; // Start from top
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        return (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
            animate={{ opacity: 1, scale: 1, x, y }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
            className="absolute z-10"
          >
            <Card
              title={service.title}
              description={service.description}
              link={service.link}
              imagePath={service.imagePath}
              gradient={service.gradient}
              custom={i}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default function LandingPage() {
  const callerName = "MindEase Assistant";
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-[#1a1a1a] relative overflow-hidden">

      <div className="relative z-10 flex flex-col items-center w-full min-h-screen px-4 pt-32 pb-12">
        <Header callerName={callerName} />
        <TitleSection />

        <div className="w-full flex-grow flex flex-col items-center justify-center">
          <div className="hidden md:flex w-full justify-center">
            <CircularLayout />
          </div>
          <div className="block md:hidden w-full max-w-md mt-8">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mx-auto pb-16"
            >
              {services.map((service, i) => (
                <Card
                  key={service.title}
                  title={service.title}
                  description={service.description}
                  link={service.link}
                  imagePath={service.imagePath}
                  gradient={service.gradient}
                  custom={i}
                  variant="grid"
                />
              ))}
            </motion.div>
          </div>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-10 text-center text-white/60 text-sm sm:text-base"
        >
          Our design team conducted detailed research, allowing us to create both <br /> attractive and useful design.
        </motion.p>
      </div>
    </div>
  );
}

function Card({
  title,
  link,
  custom,
  description,
  imagePath,
  gradient,
  variant = "orbit",
}: {
  title: string;
  link: string;
  custom?: number;
  description: string;
  imagePath?: string;
  gradient?: string;
  variant?: "orbit" | "grid";
}) {
  const [isHovered, setIsHovered] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);
  const isGrid = variant === "grid";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      variants={cardVariants}
      custom={custom}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`bg-white/5 backdrop-blur-lg rounded-2xl shadow-lg relative overflow-hidden group transform-gpu border border-white/10 p-4 flex flex-col justify-between ${
        isGrid
          ? "w-full min-h-[12rem]"
          : "w-48 h-56"
      }`}
    >
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-r ${gradient} transition-all duration-500`}
        animate={{ opacity: isHovered ? 0.5 : 0.2 }}
      />
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/50 transition-colors duration-300" style={{ transform: "translateZ(20px)" }} />
      
      <div className="flex-grow flex flex-col items-center text-center gap-2" style={{ transform: "translateZ(10px)" }}>
        {imagePath && (
          <div className="relative w-16 h-16 mx-auto mt-2">
            <Image
              src={imagePath}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        )}
        <h2
          className="text-white text-base font-semibold group-hover:text-blue-300 transition-colors duration-300 mt-2"
          style={{ textShadow: isHovered ? "0 0 8px rgba(96, 165, 250, 0.5)" : "none" }}
        >
          {title}
        </h2>
        <p className="text-white/70 text-xs leading-relaxed px-2">
          {description}
        </p>
      </div>

      <div className="w-full mt-auto pt-2" style={{ transform: "translateZ(20px)" }}>
        <Link href={link} passHref>
          <Button
            size="sm"
            className="w-full bg-white text-black hover:bg-gray-200 border border-white rounded-md px-3 py-1 text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-gray-200/40"
          >
            Explore
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
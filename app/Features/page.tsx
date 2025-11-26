"use client";
import { useRef } from "react";
import CustomCursor from "@/components/shared/custom-cursor";
import ParticlesBackground from "@/components/shared/particle-background";
import FeaturesSection from "@/sections/Features/features-section";
import { ThemeProvider } from "next-themes";
import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
// import AnimatedHoverPage from '@/components/featuretrial';

const page = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <CustomCursor
          containerRef={containerRef as React.RefObject<HTMLDivElement>}
        />
        <ParticlesBackground />
        <Link href="/" className="z-[500] absolute left-[20px]  md:left-[52px]  top-[55px]">
          <div className="p-2 text-black bg-white cursor-auto hover:bg-[#b3b3b3] w-10 h-10 rounded-[50%] flex justify-center items-center">
            <ChevronLeft size={36} />
          </div>
        </Link>
        <FeaturesSection />
        {/* <AnimatedHoverPage/> */}
      </ThemeProvider>
    </div>
  );
};

export default page;

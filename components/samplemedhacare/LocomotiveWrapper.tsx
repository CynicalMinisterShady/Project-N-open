"use client";

import React, { useEffect, useRef } from "react";
import MedhaCareNavbar from "@/components/samplemedhacare/MedhaCareNavbar";
import LandingPage from "@/components/samplemedhacare/LandingPage";
import Marquee from "@/components/samplemedhacare/Marquee";
import MedhacareAbout from "@/components/samplemedhacare/MedhacareAbout";
import MedhaCareService from "@/components/samplemedhacare/MedhaCareService";
import ServiceSwiperSection from "@/components/samplemedhacare/ServiceSwiperSection";

const LocomotiveWrapper = () => {
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      scrollRef.current = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]") as HTMLElement,
        smooth: true,
        // Add any other options you need
      });
    })();

    return () => {
      if (scrollRef.current) {
        scrollRef.current.destroy();
      }
    };
  }, []);

  return (
    <div data-scroll-container>
      <MedhaCareNavbar />
      <LandingPage />
      <Marquee />
      <MedhacareAbout />
      <MedhaCareService />
      <ServiceSwiperSection />
    </div>
  );
};

export default LocomotiveWrapper;
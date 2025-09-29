// LocomotiveWrapper.tsx
"use client"
import React, { useEffect, useRef } from 'react'
import VirzeonxNavbar from "@/components/sampelvirzeonx/VirzeonxNavbar"
import LandingPage from "@/components/sampelvirzeonx/LandingPage"
import Marquee from "@/components/sampelvirzeonx/Marquee"
import About from "@/components/sampelvirzeonx/About"
import VirzeonxService from "@/components/sampelvirzeonx/VirzeonxService"
import ServiceSwiperSection from './ServiceSwiperSection';

const LocomotiveWrapper = () => {
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      
      scrollRef.current = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]') as HTMLElement,
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
      <VirzeonxNavbar/>
      <LandingPage/>
      <Marquee/>
      <About/>
      <VirzeonxService/>
      <ServiceSwiperSection />
    </div>
  )
}

export default LocomotiveWrapper
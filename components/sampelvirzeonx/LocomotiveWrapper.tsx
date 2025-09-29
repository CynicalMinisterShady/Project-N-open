"use client"
import React, {useEffect} from 'react'
import LocomotiveScroll from 'locomotive-scroll';
import VirzeonxNavbar from "@/components/sampelvirzeonx/VirzeonxNavbar"
import LandingPage from "@/components/sampelvirzeonx/LandingPage"
import Marquee from "@/components/sampelvirzeonx/Marquee"
import About from "@/components/sampelvirzeonx/About"
import VirzeonxService from "@/components/sampelvirzeonx/VirzeonxService"
import ServiceSwiperSection from './ServiceSwiperSection';

const locomotiveScroll = new LocomotiveScroll();

const LocomotiveWrapper = () => {
  return (
    <div>
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
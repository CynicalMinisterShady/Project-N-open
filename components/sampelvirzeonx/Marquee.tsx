"use client";
import React from "react";
import '@/styles/CustomMarquee.css'

const MarqueeContent = () => {
    return (
        <div className="con-custom-marquee inline-block py-[2rem] relative whitespace-nowrap z-[90] text-[9vw] md:text-[7rem] font-[600]">
            <h1 className="inline-block">EXPERIENCE</h1>
            <div className="dot-ball inline-block w-[1.2rem] h-[1.2rem] md:w-[2rem] md:h-[2rem] lg:w-[4rem] lg:h-[4rem] rounded-[50%] bg-[#07797d] mb-1 md:mb-2 ml-[2rem] mr-[2rem]"></div>
            <h1 className="inline-block">NIRVEONX</h1>
            <div className="dot-ball inline-block w-[1.2rem] h-[1.2rem] md:w-[2rem] md:h-[2rem] lg:w-[4rem] lg:h-[4rem] rounded-[50%] bg-[#07797d] mb-1 md:mb-2 ml-[2rem] mr-[2rem]"></div>
            <h1 className="inline-block">HEALTHCARE</h1>
            <div className="dot-ball inline-block w-[1.2rem] h-[1.2rem] md:w-[2rem] md:h-[2rem] lg:w-[4rem] lg:h-[4rem] rounded-[50%] bg-[#07797d] mb-1 md:mb-2 ml-[2rem] mr-[2rem]"></div>
            <h1 className="inline-block">AROVIANX</h1>
            <div className="dot-ball inline-block w-[1.2rem] h-[1.2rem] md:w-[2rem] md:h-[2rem] lg:w-[4rem] lg:h-[4rem] rounded-[50%] bg-[#07797d] mb-1 md:mb-2 ml-[2rem] mr-[2rem]"></div>
        </div>
    )
}

const Marquee = () => {
  return (
    <div className="w-[100%] max-h-[100vh] overflow-hidden cursor-auto lg:pt-[3rem]">
      <div className="moving-text whitespace-nowrap overflow-x-auto scrollbar-hide">
           <MarqueeContent/>
           <MarqueeContent/>
           <MarqueeContent/>
      </div>
    </div>
  );
};

export default Marquee;

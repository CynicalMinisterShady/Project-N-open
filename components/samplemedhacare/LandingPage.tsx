"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ParticlesBackground from "@/components/shared/particle-background";

gsap.registerPlugin(useGSAP);

const Headling = ({ content = "MEDHACARE" }) => {
  return (
    <h1 className="heading text-[2.5rem] font-[500] sm:text-[5rem] md:text-[4rem] lg:text-[7rem] leading-[1]">
      {content}
    </h1>
  );
};

// const BlurBgBall = () => {
//   return (
//     <div>
//       <div className="blur-bg-ball-1 absolute w-[15rem] h-[15rem] sm:w-[25rem] sm:h-[24rem] lg:w-[50rem] lg:h-[30rem] bg-gradient-to-br from-[#4fc3f7] to-[#0288d1] top-[70%] sm:top-[50%] lg:top-[38%] right-[0%] rounded-l-[40%] rounded-r-[40%] blur-[20px]"></div>
//       <div className="blur-bg-ball-2 absolute w-[15rem] h-[15rem] sm:w-[25rem] sm:h-[24rem] lg:w-[50rem] lg:h-[30rem] bg-gradient-to-br from-[#81c784] to-[#388e3c] top-[60%] sm:top-[50%] lg:top-[38%] right-[-10%] rounded-[50%] blur-[20px]"></div>
//     </div>
//   );
// };






const BlurBgBall = () => {
  return (
    <div>
      {/* First ball - Pink to Purple */}
      <div className="blur-bg-ball-1 absolute w-[15rem] h-[15rem] sm:w-[25rem] sm:h-[24rem] lg:w-[50rem] lg:h-[30rem] bg-gradient-to-br from-pink-400 to-purple-600 top-[70%] sm:top-[50%] lg:top-[38%] right-[0%] rounded-l-[40%] rounded-r-[40%] blur-[20px]"></div>
      
      {/* Second ball - Light Pink to Violet */}
      <div className="blur-bg-ball-2 absolute w-[15rem] h-[15rem] sm:w-[25rem] sm:h-[24rem] lg:w-[50rem] lg:h-[30rem] bg-gradient-to-br from-pink-300 to-violet-500 top-[60%] sm:top-[50%] lg:top-[38%] right-[-10%] rounded-[50%] blur-[20px]"></div>
    </div>
  );
};

//export default BlurBgBall;


const LandingPage = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".heading",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 1,
          stagger: 0.3,
          ease: "power2.out",
          repeat: 2,
          yoyo: true,
        }
      );

      gsap.fromTo(
        ".para",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 1.3,
          stagger: 0.3,
          ease: "power2.out",
        }
      );

      gsap.to(".blur-bg-ball-1", {
        y: "random(-50, 50)",
        x: "random(-80, 80)",
        rotation: "random(-15, 15)",
        scale: "random(0.9, 1.1)",
        duration: "random(4, 7)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
      });

      gsap.to(".blur-bg-ball-2", {
        x: "random(-50, 50, 5)",
        y: "random(-50, 50, 5)",
        rotation: "random(-45, 45)",
        scale: "random(0.8, 1.2, 0.1)",
        duration: "random(3, 6)",
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
      });
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="font-poppins relative cursor-auto overflow-hidden px-[2rem] pb-[2rem] flex flex-col"
    >
      <ParticlesBackground />

      <div className="font-poppins cursor-auto pb-[4.8rem] flex flex-col md:flex-row h-[80vh] items-end">
        {/* Right side Headings */}
        <div className="right order-1 md:order-2 h-full flex flex-1 flex-col justify-end items-end text-right md:text-right mb-8 md:mb-0">
          <Headling content={"YOUR"} />
          <Headling content={"PARTNER IN"} />
          <Headling content={"HEALTHCARE"} />
        </div>

        {/* Left side description */}
        <div className="left order-2 md:order-1">
          <p className="w-[100%] flex flex-col text-[1rem] md:text-[1.8rem] font-[500]">
            <span className="para">MedhaCare is a healthcare platform</span>
            <span className="para">focused on providing reliable,</span>
            <span className="para">accessible, and innovative</span>
            <span className="para">medical solutions.</span>
          </p>
        </div>
      </div>

      <div className="w-[100%] border-t-2 border-[#ffffff20]"></div>

      <BlurBgBall />

      <div className="video-wrapper relative mt-[3rem] rounded-4xl overflow-hidden">
        <video className="relative z-[100]" autoPlay muted loop playsInline>
          <source
            src="https://res.cloudinary.com/dzhczzqwf/video/upload/v1759073901/uwc-hero-video-compressed_tq4lti.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
};

export default LandingPage;
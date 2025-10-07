"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const BlurBgBall = () => {
  return (
    <div>
      <div className="blur-bg-ball-1 absolute w-[15rem] h-[15rem] sm:w-[20rem] sm:h-[20rem] lg:w-[35rem] z-[80] lg:h-[35rem] bg-gradient-to-br from-pink-500 to-purple-600 top-[20%] right-[40%] rounded-l-[40%] rounded-r-[40%] blur-[20px]"></div>
      <div className="blur-bg-ball-2 absolute w-[15rem] h-[15rem] sm:w-[20rem] sm:h-[20rem] lg:w-[35rem] z-[90] lg:h-[35rem] bg-gradient-to-br from-pink-400 to-purple-500 top-[20%] right-[35%] rounded-[50%] blur-[20px]"></div>
    </div>
  );
};

const MedhacareAbout = () => {
  const container = useRef<HTMLDivElement>(null);
  const ballAnimationsRef = useRef<gsap.core.Tween[]>([]);

  useGSAP(
    () => {
      gsap.from(".about-headling", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-headling",
          start: "top 50%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
          scrub: 2,
        },
      });

      gsap.from(".about-image", {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-image",
          start: "top 50%",
          end: "bottom 45%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".about-para span", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-para",
          start: "top 70%",
          end: "bottom 40%",
          toggleActions: "play none none reverse",
        },
      });

      // Optimized blur ball animations - limited repeats and slower
      const ball1Animation = gsap.to(".blur-bg-ball-1", {
        y: "random(-50, 50)",
        x: "random(-80, 80)",
        rotation: "random(-15, 15)",
        scale: "random(0.9, 1.1)",
        duration: "random(8, 12)", // Slower = less CPU
        ease: "sine.inOut",
        repeat: 3, // Limited instead of -1
        yoyo: true,
        repeatRefresh: true,
      });

      const ball2Animation = gsap.to(".blur-bg-ball-2", {
        x: "random(-50, 50, 5)",
        y: "random(-50, 50, 5)",
        rotation: "random(-45, 45)",
        scale: "random(0.8, 1.2, 0.1)",
        duration: "random(6, 10)", // Slower = less CPU
        ease: "power2.inOut",
        repeat: 3, // Limited instead of -1
        yoyo: true,
        repeatRefresh: true,
      });

      // Store references for cleanup
      ballAnimationsRef.current = [ball1Animation, ball2Animation];
    },
    { scope: container }
  );

  // Kill animations when component is off-screen to save CPU
  useEffect(() => {
    if (!container.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            // Component is off-screen, pause animations
            ballAnimationsRef.current.forEach((tween) => {
              if (tween) tween.pause();
            });
          } else {
            // Component is on-screen, resume animations
            ballAnimationsRef.current.forEach((tween) => {
              if (tween) tween.resume();
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(container.current);

    return () => {
      observer.disconnect();
      // Clean up animations on unmount
      ballAnimationsRef.current.forEach((tween) => {
        if (tween) tween.kill();
      });
    };
  }, []);

  return (
    <div
      ref={container}
      className="cursor-auto p-[2rem] pb-0 mt-[7rem] font-poppins flex relative min-h-[80vh] w-[100%]"
    >
      <div className="content-box flex flex-col md:flex-row lg:flex-row w-[100%] h-[100%] justify-between gap-8">
        
        {/* Left Headings */}
        <div className="left relative z-[100] flex flex-col text-[1.4rem] md:text-[1.6rem] lg:text-[3.2rem] lg:ml-[5rem] font-[500] leading-[1.2]">
          <span className="about-headling">We are a healthcare-focused</span>
          <span className="about-headling">team of innovators, clinicians,</span>
          <span className="about-headling">and technologists working to</span>
          <span className="about-headling">improve lives through</span>
          <span className="about-headling">compassion and innovation.</span>
        </div>

        <BlurBgBall />

        {/* Right Side Image & Para */}
        <div className="right relative z-[100] lg:mr-[5rem] mt-[5rem] lg:mt-[7rem]">
          <div className="about-image w-[20rem] rounded-2xl overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://res.cloudinary.com/dyzpbubpy/image/upload/v1759217272/Screenshot_2025-09-30_125733_ognolw.png"
              alt="medhacare-about"
            />
          </div>

          <div className="about-para flex flex-col text-[0.88rem] font-[200] mt-[3rem]">
            <span>We are passionate about creating solutions</span>
            <span>that make healthcare more accessible,</span>
            <span>affordable, and patient-centric. With a</span>
            <span>commitment to innovation and empathy,</span>
            <span>we strive to redefine the future of care.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedhacareAbout;
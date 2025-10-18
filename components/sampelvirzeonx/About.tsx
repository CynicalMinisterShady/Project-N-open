"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const BlurBgBall = ({}) => {
  return (
    <div>
      <div className="blur-bg-ball-1 absolute w-[15rem] h-[15rem] sm:w-[20rem] sm:h-[20rem] lg:w-[35rem] z-[80] lg:h-[35rem] bg-gradient-to-br from-[#0c5245] to-[#05303d] top-[20%] right-[40%]  rounded-l-[40%] rounded-r-[40%] blur-[20px]"></div>
      <div className="blur-bg-ball-2 absolute w-[15rem] h-[15rem] sm:w-[20rem] sm:h-[20rem] lg:w-[35rem] z-[90] lg:h-[35rem] bg-gradient-to-br from-[#51c0ab] to-[#077A7D] top-[20%] right-[35%] rounded-[50%] blur-[20px]"></div>
    </div>
  );
};

const About = () => {
  const container = useRef<HTMLDivElement>(null);
  const ballAnimationsRef = useRef<gsap.core.Tween[]>([]);

  useGSAP(
    () => {
      // Proper scroll-triggered animation
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
          markers: false,
          scrub: 2,
        },
      });

      // Image animation
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

      // Para animation
      gsap.from(".about-para span", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-para",
          markers: false,
          start: "top 70%",
          end: "bottom 40%",
          toggleActions: "play none none reverse",
        },
      });

      // Optimized blur ball animations - limited repeats and slower
      // const ball1Animation = gsap.to(".blur-bg-ball-1", {
      //   y: "random(-50, 50)",
      //   x: "random(-80, 80)",
      //   rotation: "random(-15, 15)",
      //   scale: "random(0.9, 1.1)",
      //   duration: "random(8, 12)", // Slower = less CPU
      //   ease: "sine.inOut",
      //   repeat: 3, // Limited instead of -1
      //   yoyo: true,
      //   repeatRefresh: true,
      // });

      // const ball2Animation = gsap.to(".blur-bg-ball-2", {
      //   x: "random(-50, 50, 5)",
      //   y: "random(-50, 50, 5)",
      //   rotation: "random(-45, 45)",
      //   scale: "random(0.8, 1.2, 0.1)",
      //   duration: "random(6, 10)", // Slower = less CPU
      //   ease: "power2.inOut",
      //   repeat: 3, // Limited instead of -1
      //   yoyo: true,
      //   repeatRefresh: true,
      // });

      // // Store references for cleanup
      // ballAnimationsRef.current = [ball1Animation, ball2Animation];
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
        <div className="left relative z-[100] flex flex-col text-[1.4rem] md:text-[1.6rem] lg:text-[3.2rem] lg:ml-[5rem] font-[500] leading-[1.2]">
          <span className="about-headling">We are a group of design</span>
          <span className="about-headling">driven, goal focused creators,</span>
          <span className="about-headling">producers, and designers who</span>
          <span className="about-headling">believe that the details make</span>
          <span className="about-headling">all the difference.</span>
        </div>

        <BlurBgBall />

        <div className="right relative z-[100] lg:mr-[5rem] mt-[5rem] lg:mt-[7rem]">
          <div className="about-image w-[20rem] rounded-2xl overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://res.cloudinary.com/dnfq7ty1x/image/upload/v1759110568/nirveonx-virzeonx-about-image_fnflul.jpg"
              alt="nirveonx"
            />
          </div>

          <div className="about-para flex flex-col text-[0.88rem] font-[200] mt-[3rem]">
            <span>We love to create, we love to solve, we love to</span>
            <span>collaborate, and we love to turn amazing</span>
            <span>ideas into reality. We are here to partner with</span>
            <span>you through every step of the process and</span>
            <span>know that relationships are the most</span>
            <span>important things we build.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
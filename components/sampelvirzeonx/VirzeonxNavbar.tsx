"use client";
import React from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

gsap.registerPlugin(useGSAP);

const NavButton = ({ name = "home" }) => {
  return (
    <div className="navbutton px-4 py-2 border border-solid border-white rounded-full text-xs justify-center items-center hidden sm:hidden md:flex hover:bg-white hover:text-black">
      {name}
    </div>
  );
};

const MobileNabButton = ({ name = "Home" }) => {
  return (
    <div className="navbutton px-4 py-2 border border-solid border-white rounded-full text-xs flex justify-center items-center sm:flex md:hidden">
      {name}
    </div>
  );
};

const VirzeonxNavbar = () => {
  const container = useRef();

  useGSAP(
    () => {
      // Better animation: start from hidden state
      gsap.fromTo(
        ".heading",
        {
          y: -50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 1,
          ease: "power2.out",
        }
      );
      gsap.fromTo(
        ".navbutton",
        {
          y: -50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          delay: 1.5,
          ease: "power2.out",
          stagger: 0.5,
        }
      );
    },
    { scope: container }
  );
  return (
    <div
      ref={container}
      className="font-poppins cursor-auto px-[2rem] py-[1.5rem] flex justify-between"
    >
      <h1 className="heading text-[1.8rem]">ArovianX</h1>
      <div className="flex gap-[1rem]">
        <Link href="/">
          <NavButton name={"Home"} />
        </Link>
        <Link href="/signup">
          <NavButton name={"Signup"} />
        </Link>
        <Link href="/login">
          <NavButton name={"Login"} />
        </Link>
      </div>
    </div>
  );
};

export default VirzeonxNavbar;

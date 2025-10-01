"use client";
import React from "react";
import Link from "next/link";

const serviceData = [
  {
    id: 1,
    name: "CuraForgeX",
    description:
      "AI-driven fitness and wellness platform offering personalized workout plans and health tracking.",
    path: "/forum",
    url: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1758816781/Gemini_Generated_Image_v2tszkv2tszkv2ts_zqeewl.png",
    type: "Fitness",
    count: "01",
    lableUrl: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1759294285/nirveonx-curaforgex-lable_mwznli.png",
  },
  {
    id: 2,
    name: "FastMediX",
    description:
      "Instant AI-powered medical support and emergency assistance for faster healthcare access.",
    path: "/FastMediX",
    url: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1758816741/6_rzznsi.png",
    type: "Wellness",
    count: "02",
    lableUrl: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1759294285/nirveonx-fastmedix-lable_tlgbbi.png",
  },
  {
    id: 3,
    name: "PharmXPlus",
    description:
      "Smart AI-driven pharmaceutical platform connecting patients with reliable medication access.",
    path: "/PharmXPlus",
    url: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1758816741/5_wpreuy.png",
    type: "Telehealth",
    count: "03",
    lableUrl: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1759294285/nirveonx-pharmxplus-lable_mifkok.png",
  },
  {
    id: 4,
    name: "AmboRapid",
    description:
      "AI-optimized ambulance dispatch system for real-time emergency response and care.",
    path: "/AmboRapid",
    url: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1758816741/4_dprfyt.png",
    type: "Elder Care",
    count: "04",
    lableUrl: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1759294285/nirveonx-amborapid-lable_wligsw.png",
  },
];


const SwiperBox = ({ lableUrl = "", description = "", path = "" }) => {
  return (
    <Link href={path}>
      <div className="swiper-box min-w-[20rem] flex flex-col gap-4 p-6 border border-white/20 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/40 transition-all duration-300 cursor-pointer">
        <div className="w-32 h-auto">
          <img src={lableUrl} alt="service label" className="w-full h-full object-contain" />
        </div>
        <p className="text-sm leading-relaxed whitespace-normal text-gray-300">{description}</p>
      </div>
    </Link>
  );
};

const ServiceSwiperSection = () => {
  return (
    <div className="cursor-auto py-20">
      <div className="px-8 py-12 flex items-center gap-4 text-lg font-extralight">
        <div className="h-3 w-3 bg-[#23b8ab] rounded-full"></div>
        <h1>SERVICE DETAILS</h1>
      </div>
      <div className="swiper-container max-w-full overflow-x-auto scrollbar-hide flex gap-8 px-8 pb-4">
        {serviceData.map((service) => (
          <SwiperBox
            key={service.id}
            lableUrl={service.lableUrl}
            description={service.description}
            path={service.path}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceSwiperSection;
"use client";
import React, { useState } from "react";
import Link from "next/link";

const serviceData = [
  {
    id: 1,
    name: "CuraForgeX",
    description:
      "AI-driven fitness and wellness platform offering personalized workout plans and health tracking.",
    path: "/forum",
    url: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1755869157/CuraForgeX_tp52fg.jpg",
    type: "Fitness",
    count: "01",
    lableUrl: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1755869157/CuraForgeX_tp52fg.jpg",
  },
  {
    id: 2,
    name: "FastMediX",
    description:
      "Instant AI-powered medical support and emergency assistance for faster healthcare access.",
    path: "/FastMediX",
    url: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1757928362/ChatGPT_Image_Sep_15_2025_02_55_48_PM_lx0lga.png",
    type: "Wellness",
    count: "02",
    lableUrl: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1757928362/ChatGPT_Image_Sep_15_2025_02_55_48_PM_lx0lga.png",
  },
  {
    id: 3,
    name: "PharmXPlus",
    description:
      "Smart AI-driven pharmaceutical platform connecting patients with reliable medication access.",
    path: "/PharmXPlus",
    url: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1757928309/ChatGPT_Image_Sep_15_2025_02_54_32_PM_foo46v.png",
    type: "Telehealth",
    count: "03",
    lableUrl: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1757928309/ChatGPT_Image_Sep_15_2025_02_54_32_PM_foo46v.png",
  },
  {
    id: 4,
    name: "AmboRapid",
    description:
      "AI-optimized ambulance dispatch system for real-time emergency response and care.",
    path: "/AmboRapid",
    url: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1757928207/ChatGPT_Image_Sep_15_2025_02_53_07_PM_ntplxt.png",
    type: "Elder Care",
    count: "04",
    lableUrl: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1757928207/ChatGPT_Image_Sep_15_2025_02_53_07_PM_ntplxt.png",
  },
];


interface ServiceElementProps {
  name: string;
  count: string;
  type: string;
  url: string;
  path: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ServiceElement: React.FC<ServiceElementProps> = ({
  name,
  count,
  type,
  path,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <Link href={path}>
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="elem group overflow-hidden w-full h-28 border-b border-b-[#ffffff39] flex relative cursor-pointer transition-all duration-300"
      >
        <div className="overlay-div w-full h-full bg-[#d41caf] absolute top-[-100%] group-hover:top-0 transition-all duration-500 ease-out"></div>
        <div className="content-row w-full flex px-8 text-4xl font-medium items-center justify-between relative z-10">
          <h1 className="group-hover:text-white transition-colors duration-300">
            {name}
          </h1>
          <div className="right flex flex-col items-end">
            <h1 className="text-base font-normal p-0 m-0 group-hover:text-white transition-colors duration-300">
              {count}
            </h1>
            <h2 className="text-sm p-0 m-0 text-[#989898] group-hover:text-white font-light transition-colors duration-300">
              {type}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

interface ServiceImageProps {
  url: string;
  name: string;
}

const ServiceImage: React.FC<ServiceImageProps> = ({ url, name }) => {
  return (
    <div className="service-image absolute top-[20%] right-[25%] z-[200] h-[28rem] w-[24rem] rounded-[2rem] overflow-hidden shadow-2xl animate-fadeIn pointer-events-none">
      <img className="w-full h-full object-cover" src={url} alt={name} />
    </div>
  );
};

const MedhaCareService = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <div className="overflow-hidden relative cursor-auto hidden sm:flex flex-col py-12 w-full">
      <div className="px-8 py-12 flex items-center gap-4 text-lg font-extralight">
        <div className="h-3 w-3 bg-[#23b8ab] rounded-full"></div>
        <h1>MEDHACARE SERVICES</h1>
      </div>
      <div className="service-container w-full">
        {serviceData.map((service) => (
          <ServiceElement
            key={service.id}
            name={service.name}
            type={service.type}
            count={service.count}
            url={service.url}
            path={service.path}
            onMouseEnter={() => setHoveredService(service.id)}
            onMouseLeave={() => setHoveredService(null)}
          />
        ))}
      </div>

      {hoveredService && (
        <ServiceImage
          url={serviceData.find((s) => s.id === hoveredService)?.url || ""}
          name={serviceData.find((s) => s.id === hoveredService)?.name || ""}
        />
      )}

      <Link href="/MedhaCare">
        <div className="relative overflow-hidden group px-6 py-3 mt-16 ml-8 rounded-full border border-white/50 hover:text-black transition-all ease-in-out duration-200 w-fit h-fit text-sm font-normal">
          <span className="relative z-10">Explore MedhaCare</span>
          <div className="absolute left-0 right-0 h-full bg-white rounded-full bottom-[-100%] group-hover:bottom-0 transition-all duration-300 ease-in-out"></div>
        </div>
      </Link>
    </div>
  );
};

export default MedhaCareService;
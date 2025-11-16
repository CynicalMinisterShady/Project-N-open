"use client";
import React, { useState } from "react";
import Link from "next/link";

const serviceData = [
  {
    id: 1,
    name: "FitronX",
    description:
      "AI-driven fitness and wellness platform offering personalized workout plans and health tracking.",
    path: "/fitronx",
    url: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1758817264/fitronx_ea0teu.png",
    type: "Fitness",
    count: "01",
    lableUrl: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1759127632/nirveonx-firtronx-lable_h7sseq.png",
  },
  {
    id: 2,
    name: "Wellip",
    description:
      "Comprehensive wellness platform with AI-powered health monitoring and lifestyle optimization.",
    path: "/wellip",
    url: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1756118529/Wellip__kfqux2.png",
    type: "Wellness",
    count: "02",
    lableUrl: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1759127668/nirveonx-wellip-lable_maqvet.png",
  },
  {
    id: 3,
    name: "Health Mate",
    description:
      "Telehealth consultation platform connecting patients with healthcare professionals instantly.",
    path: "/HealthMateLanding",
    url: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1758816753/Gemini_Generated_Image_aj84e9aj84e9aj84_xuk2qk.png",
    type: "Healthcare",
    count: "03",
    lableUrl: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1759127661/nirveonx-healthmate-lable_tfgcxg.png",
  },
  {
    id: 4,
    name: "Golden Care",
    description:
      "Specialized healthcare solutions for elderly care with 24/7 monitoring and support.",
    path: "/goldencare",
    url: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1758816767/Gemini_Generated_Image_b5iypjb5iypjb5iy_mdwkgr.png",
    type: "Elder Care",
    count: "04",
    lableUrl: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1759127638/nirveonx-goldencare-lable_ielsxe.png",
  },
  {
    id: 5,
    name: "Mind Ease",
    description:
      "Mental health and meditation platform with AI-powered therapy and stress management.",
    path: "/mindease",
    url: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1758816767/Gemini_Generated_Image_ov3y83ov3y83ov3y_jiaylc.png",
    type: "Mental Health",
    count: "05",
    lableUrl: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1759127653/nirveonx-mindease-lable_pz2vts.png",
  },
  {
    id: 6,
    name: "Pet AI",
    description:
      "AI-powered pet Healthcare monitoring and veterinary consultation platform.",
    path: "/pet-ai",
    url: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1758816768/Gemini_Generated_Image_pj34eapj34eapj34_loybml.png",
    type: "Pet Care",
    count: "06",
    lableUrl: "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1759127654/nirveonx-petai-lable_edytrm.png",
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
        <div className="overlay-div w-full h-full bg-[#23b8ab] absolute top-[-100%] group-hover:top-0 transition-all duration-500 ease-out"></div>
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

const VirzeonxService = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <div className="overflow-hidden relative cursor-auto hidden sm:flex flex-col py-12 w-full">
      <div className="px-8 py-12 flex items-center gap-4 text-lg font-extralight">
        <div className="h-3 w-3 bg-[#23b8ab] rounded-full"></div>
        <h1>AROVIANX SERVICES</h1>
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
          <span className="relative z-10">Explore Medhacare</span>
          <div className="absolute left-0 right-0 h-full bg-white rounded-full bottom-[-100%] group-hover:bottom-0 transition-all duration-300 ease-in-out"></div>
        </div>
      </Link>
    </div>
  );
};

export default VirzeonxService;
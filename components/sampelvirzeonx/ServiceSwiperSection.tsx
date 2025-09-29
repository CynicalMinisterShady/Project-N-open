"use client";
import React from "react";
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
    lableUrl:
      "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1759127632/nirveonx-firtronx-lable_h7sseq.png",
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
    lableUrl:
      "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1759127668/nirveonx-wellip-lable_maqvet.png",
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
    lableUrl:
      "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1759127661/nirveonx-healthmate-lable_tfgcxg.png",
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
    lableUrl:
      "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1759127638/nirveonx-goldencare-lable_ielsxe.png",
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
    lableUrl:
      "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1759127653/nirveonx-mindease-lable_pz2vts.png",
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
    lableUrl:
      "https://res.cloudinary.com/dnfq7ty1x/image/upload/v1759127654/nirveonx-petai-lable_edytrm.png",
  },
];

const SwiperBox = ({ lableUrl = "", description = "", path = "" }) => {
  return (
    <Link href={path}>
      <div className="swiper-box min-w-[20rem] flex flex-col gap-4 p-6 border border-white/20 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/40 transition-all duration-300 cursor-pointer">
        <div className="w-32 h-auto">
          <img src={lableUrl} alt="service label" className="w-full h-full object-contain" />
        </div>
        <p className="text-sm leading-relaxed whitespace-normal text-gray-300">
          {description}
        </p>
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
        {serviceData.map((service) => {
          return (
            <SwiperBox
              key={service.id}
              lableUrl={service.lableUrl}
              description={service.description}
              path={service.path}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ServiceSwiperSection;
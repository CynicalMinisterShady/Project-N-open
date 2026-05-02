"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/upload-team");
  }, [router]); 

  return <div className="h-screen w-full flex justify-center items-center">Loading...</div>;
};

export default Page;

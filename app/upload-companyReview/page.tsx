"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ParticlesBackground from "@/components/shared/particle-background";

import BackButton from "@/components/Auth/BackButton";

export default function UploadCompanyReview() {
  const router = useRouter();
  const containerRef = useRef(null);

  const [form, setForm] = useState({
    memberId: "",
    review: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    
    if (name === "review") {
      setCharCount(value.length);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const base = process.env.NEXT_PUBLIC_API_URL;
      const res = await axios.post(`${base}/companyReview`, form);
      if (res.status === 200 ) {
        alert("Company review submitted successfully!");
        router.push("/team");
      }
    } catch (err) {
      console.log("Upload failed:", err);
      alert("Failed to submit company review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div suppressHydrationWarning className="cursor-auto min-h-screen">
      <ParticlesBackground />
      <BackButton />


      <div
        ref={containerRef}
        className="flex min-h-screen justify-center items-center px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col p-6 sm:p-8 lg:p-10 justify-center items-center bg-gradient-to-br from-gray-900/40 via-gray-800/30 to-gray-900/40 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 w-full max-w-2xl">
          {/* Title Section */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-2">
              Share Your Experience
            </h1>
            <p className="text-sm sm:text-base text-gray-400 max-w-md mx-auto">
              Help us improve by sharing your valuable feedback about NirveonX
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full space-y-5"
          >
            {/* Member ID */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Member ID <span className="text-red-400">*</span>
              </label>
              <input
                name="memberId"
                placeholder="Enter your member ID"
                onChange={handleChange}
                value={form.memberId}
                className="w-full py-3 px-4 border border-white/10 bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all text-white placeholder-gray-500 hover:bg-white/10"
                required
              />
              <p className="text-xs text-gray-500 mt-1.5">
                You can find your member ID in your profile settings
              </p>
            </div>

            {/* Review */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your Review <span className="text-red-400">*</span>
              </label>
              <textarea
                name="review"
                placeholder="Share your thoughts about working at NirveonX. What did you enjoy? What could be improved?"
                onChange={handleChange}
                value={form.review}
                rows={8}
                className="w-full py-3 px-4 border border-white/10 bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all text-white placeholder-gray-500 hover:bg-white/10 resize-none"
                required
              />
              <div className="flex justify-between items-center mt-1.5">
                <p className="text-xs text-gray-500">
                  Be honest and constructive in your feedback
                </p>
                <span className={`text-xs ${charCount > 500 ? 'text-green-400' : 'text-gray-500'}`}>
                  {charCount} characters
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer bg-gradient-to-r from-white to-gray-200 text-black font-semibold text-base rounded-lg py-3.5 mt-6 hover:from-gray-100 hover:to-gray-300 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Review"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-xs sm:text-sm text-gray-400 mt-6 text-center">
            Your feedback is confidential and helps us create a better workplace
          </p>
        </div>
      </div>
    </div>
  );
}
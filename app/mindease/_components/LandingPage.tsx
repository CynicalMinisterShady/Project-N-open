"use client";

export default function LandingPage() {
  return (
    <div className="w-full bg-black text-white">
      {/* First Section */}
      <div className="h-screen w-full flex items-center justify-center">
        <div className="flex flex-col md:flex-row w-11/12 md:w-10/12 h-[90%]">
          
          {/* Left Section */}
          <div className="flex flex-col justify-center md:justify-center items-start h-1/2 md:h-full w-full md:w-1/2 p-6">
            <div className="flex flex-col font-bebas text-[2.5rem] md:text-[5.5rem] leading-[1.2] font-semibold mb-6">
              <span>MINDEASE MENTAL</span>
              <span>WELLNESS</span>
            </div>
            
            <p className="text-[0.85rem] text-[#ffffffae] leading-relaxed space-y-1">
              <span>
                MindEase is a digital mental wellness platform designed to help individuals manage
                stress, anxiety, and low mood through evidence-based techniques and personalized
                support.
              </span>{" "}
              <span>
                It combines cognitive-behavioral therapy tools, mindfulness exercises, mood
                tracking, and guided relaxation sessions to promote emotional balance and resilience.
              </span>
            </p>
          </div>

          {/* Right Section */}
          <div className="relative flex justify-center items-center h-1/2 md:h-full w-full md:w-1/2">
            <div className="absolute z-[50] bg-gradient-to-br from-[#df4107] to-[#ff8e0d] w-[23rem] h-[23rem] rounded-[50%] shadow-[0_0_100px_#ff8e0d]"></div>
            
            <div className="absolute z-[100] px-[1rem] py-[0.6rem] bg-[#ffffff1a] rounded-3xl border-[0.1px] text-[0.7rem] backdrop-blur-3xl border-[#ffffff96] top-[35%] left-[15%]">Ease Your Mind, Elevate Your Life</div>
            <div className="absolute z-[100] px-[1rem] py-[0.6rem] bg-[#ffffff1a] rounded-3xl border-[0.1px] text-[0.7rem] backdrop-blur-3xl border-[#ffffff96] top-[55%] left-[58%]">Wellness Meets Peace</div>
            <div className="absolute z-[100] px-[1rem] py-[0.6rem] bg-[#ffffff1a] rounded-3xl border-[0.1px] text-[0.7rem] backdrop-blur-3xl border-[#ffffff96] top-[62%] left-[55%]">Your Daily Dose of Wellness</div>
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div className="h-screen w-full flex flex-col justify-center px-[2rem]">
        <h1 className="text-[1.5rem] font-[500]">Mind Ease Services</h1>
        <p className="text-[0.6rem] leading-[1.1] w-[80%] md:w-[60%] lg:w-[32%] text-[#ffffff7a]">MindEase is a digital mental wellness platform designed to help individuals manage stress, anxiety, and low mood through evidence-based techniques.</p>

        <div className="flex w-full relative p-[2rem] justify-center items-center">
          <div className="card-mindease absolute w-[10rem] z-[50]">
            <img src="https://res.cloudinary.com/dnfq7ty1x/image/upload/v1760844877/nirveonx-mindease_tkyhh2.png" alt="" />

            <div className="p-[2rem] bg-pink-300">
              <div className="overflow-hidden w-full rounded-2xl">
                <img
              className="w-full"
               src="https://res.cloudinary.com/dnfq7ty1x/image/upload/v1760846176/nirveonx-mindease-mediation_jqwg8k.jpg" alt="" />
              </div>
              <div>
                <span>MINDEASE</span>
                <span>SERVICE 01</span>
              </div>

              <h1>Guided Meditation</h1>

              <p>Guided meditation is a practice where a person is led through a series of calming instructions, often by a teacher or a recording</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
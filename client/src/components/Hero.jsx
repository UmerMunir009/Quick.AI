import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
    const navigate=useNavigate()

  return (
    <div className="px-10 pt-20 sm:px-20 relative inline-flex flex-col w-full sm:justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen">
      <div className="text-center mb-5 pt-25 sm:pt-0">
        <h1 className="text-2xl sm:text-5xl font-semibold lg:text-6xl">Create amazing content <br/> with <span className="text-purple-600">AI tools</span></h1>
        <p className="max-w-lg mt-2 text-sm text-gray-400 text-center m-auto">
         Transform your content creation with our suite of premium AI tools like write-articles, generate-images, resume-reviewer and many more...
        </p>
      </div>
      <div className="flex gap-3 justify-center">
        <button onClick={()=>navigate('/ai')} className="bg-purple-700 rounded py-2 px-3 cursor-pointer text-white text-sm sm:text-md">Start creating now</button>
        <button className="bg-white rounded py-2 px-3 cursor-pointer text-black text-sm sm:text-md" >Watch Demo</button>
      </div>
      <div className="flex justify-center mt-8 items-center gap-5">
        <img  className={'w-20 '} src={assets?.user_group} alt="" />
        <h3 className="text-gray-400 text-sm">2k+ subscribers</h3>
      </div>
    </div>
  );
};

export default Hero;

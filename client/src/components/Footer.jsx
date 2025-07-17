import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center w-full py-20 bg-gradient-to-b from-[#ae91e5] to-[#5b1c92] text-white/70">
    <img className=" w-25 sm:w-40" src={assets?.logo} alt="" />

      <p className="mt-4 text-center">
        Copyright © 2025 Quick.AI. All rights reserved.
      </p>

     
    </footer>
  );
};

export default Footer;

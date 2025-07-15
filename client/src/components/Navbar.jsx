import React from "react";
import { assets } from "../assets/assets";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  return (
    <div className="fixed z-10 backdrop-blur-2xl w-full  px-10 sm:px-20 py-3 flex justify-between items-center">
      <img className=" w-25 sm:w-40" src={assets?.logo} alt="" />

      {user ? (
        <UserButton />
      ) : (
        <button
          onClick={openSignIn}
          className="flex items-center bg-purple-700 rounded-2xl p-1 px-3 cursor-pointer text-white text-sm sm:text-md"
        >
          Get Started <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Navbar;

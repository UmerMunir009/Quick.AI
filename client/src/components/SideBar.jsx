import { useClerk, useUser } from "@clerk/clerk-react";
import React from "react";
import {
  House,
  SquarePen,
  Hash,
  Image,
  Eraser,
  Scissors,
  FileText,
  Users,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
const Sidebar = ({ sidebar, setSidebar }) => {
  const navItems = [
    { to: "/ai", label: "Dashboard", Icon: House },
    { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
    { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
    { to: "/ai/generate-images", label: "Generate Images", Icon: Image },
    { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
    { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
    { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
    { to: "/ai/community", label: "Community", Icon: Users },
  ];

  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <div
      className={` w-[85%] min-h-screen sm:w-80 z-10 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${
        sidebar ? "translate-x-0" : "max-sm:-translate-x-full"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="mt-7 w-full">
        <img onClick={()=>openUserProfile()}
          src={user?.imageUrl}
          alt="User avatar"
          className="w-17 rounded-full mx-auto cursor-pointer"
        />
        <h1 className="mt-1 text-center text-purple-800 font-semibold">
          {user?.fullName}
        </h1>
        <div className="my-5 px-3">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink key={to} to={to} end={to === "/ai"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-3.5 py-2.5 flex items-center gap-3 rounded ${
                  isActive && label=== 'Review Resume'? 'bg-red-600':isActive? "bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white":""
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : ""}`} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>

      </div>
        <div onClick={signOut} className="flex justify-between px-5 gap-3 w-full bg-red-600 py-2 cursor-pointer">
        <p className="text-white font-bold text-md">SignOut</p>
        <LogOut className="text-white w-5"/>
      </div>

      
    </div>
  );
};

export default Sidebar;

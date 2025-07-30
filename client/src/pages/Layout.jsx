import React, { useState } from "react";
import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import { assets } from "../assets/assets";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/SideBar";
import { SignIn, useUser } from "@clerk/clerk-react";

const Layout = () => {
  const { user } = useUser();
  const [sideBar, setSideBar] = useState(false);
  const navigate = useNavigate();
  return user ? (
    <div>
      <nav className="sticky top-0 z-50 bg-white pt-4 sm:pt-3 md:pt-2 px-3 flex justify-between items-center shadow-sm">
        <img
          onClick={() => navigate("/")}
          className="w-40 cursor-pointer sm:w-45"
          src={assets?.logo}
          alt=""
        />
        {sideBar ? (
          <X
            onClick={() => setSideBar(false)}
            className="sm:hidden text-blue-600 cursor-pointer"
          />
        ) : (
          <Menu
            onClick={() => setSideBar(true)}
            className="sm:hidden text-blue-600 cursor-pointer"
          />
        )}
      </nav>
      <hr className=" w-full h-[1.5px] border-none bg-gray-300 " />

     <div className="flex">
  <Sidebar sidebar={sideBar} setSidebar={setSideBar} />
  <div onClick={() => setSideBar(false)} className="flex-1 bg-[#F4F7FB] min-h-screen ml-0 sm:ml-80">
    <Outlet />
  </div>
</div>

    </div>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <SignIn />
    </div>
  );
};

export default Layout;

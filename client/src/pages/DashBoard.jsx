import React, { useEffect, useState } from "react";
import { dummyCreationData } from "../assets/assets";
import { Gem, Sparkles } from "lucide-react";
import { Protect } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";

const DashBoard = () => {
  const [creations, setCreations] = useState([]);
  const getUserCreations = () => {
    setCreations(dummyCreationData);
    console.log(creations)
  };

  useEffect(() => {
    getUserCreations();
  }, []);

  return (
    <div className="h-screen overflow-y-scroll p-8">
      <div className="flex flex-wrap gap-5 justify-start">
        {/* Total creation card */}
        <div className="flex px-10  gap-5 justify-around items-center rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex flex-col justify-center items-center">
            <p className="text-sm sm:text-md text-gray-600">Total Creations</p>
            <h1 className="text-md text-gray-800">{creations?.length}</h1>
          </div>
          <div className="w-10 h-10 rounded-lg text-center flex justify-center items-center bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white ">
            <Sparkles className="w-8 text-white" />
          </div>
        </div>
        {/* Plan card */}
        <div className="flex px-8  gap-5 justify-around items-center rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex flex-col justify-center items-center">
            <p className="text-sm sm:text-md text-gray-600">Subscription Plan</p>
            <Protect plan='premium' fallback='Free'>Premium</Protect>
          </div>
          <div className="w-10 h-10 rounded-lg text-center flex justify-center items-center bg-gradient-to-r from-[#FF61C5] to-[#9E53EE] text-white ">
            <Gem className="w-8 text-white" />
          </div>
        </div>
      </div>

      <div className="my-5">
        <h1 className="text-lg text-gray-600 font-semibold mb-5">Recent Creations</h1>
        {
          creations.map((item)=><CreationItem key={item?.id} item={item}/>)
        }
      </div>
    </div>
  );
};

export default DashBoard;

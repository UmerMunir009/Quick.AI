import React, { useEffect, useState } from "react";
import { dummyPublishedCreationData } from "../assets/assets";
import { useUser } from "@clerk/clerk-react";
import { Heart } from "lucide-react";

const Community = () => {
  const [creations, setCreations] = useState([]);

  const user = useUser();

  const fetchCreations = async () => {
    setCreations([]);
    setCreations(dummyPublishedCreationData);
  };
  useEffect(() => {
    fetchCreations();
  }, [user]);

  return (
    <div className="flex-1  flex flex-col gap-4 p-6 mb-10 h-screen overflow-y-scroll">
      <h2 className="text-lg">Creations</h2>
      <div className="bg-white h-full w-full rounded-xl ">
        {creations.map((creation, index) => (
          <div
            key={index}
            className="relative group inline-block pl-2 pr-2  pt-3 w-full sm:max-w-1/2 lg:max-w-1/3"
          >
            <img
              src={creation?.content}
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />
            <div
              className="absolute bottom-0 top-2 right-2 left-2 flex gap-2 items-end justify-end 
    group-hover:justify-between p-3 group-hover:bg-gradient-to-b 
    from-transparent to-black/80 text-white rounded-lg"
            >
              <p className="text-xs hidden group-hover:block">
                {creation.prompt}
              </p>

              <div className="flex gap-1 items-center">
                <p>{creation.likes.length}</p>
                <Heart
                  className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${
                    creation.likes.includes(user.id)
                      ? "fill-red-500 text-red-600"
                      : "text-white"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;

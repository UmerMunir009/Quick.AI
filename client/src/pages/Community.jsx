import React, { useEffect, useState } from "react";
import { dummyPublishedCreationData } from "../assets/assets";
import { useUser } from "@clerk/clerk-react";
import { Download, Heart } from "lucide-react";
import axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [liked, setLiked] = useState(false);
  const { getToken } = useAuth();

  const user = useUser();

  const fetchCreations = async () => {
    setCreations([]);
    try {
      setLoading(true);
      const response = await axios.get("/user/community-creations", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (response.data.statusCode === 200) {
        setCreations(response.data.data);
      } else {
        toast.error("Error in fetcing items,Please try again");
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
 const handleToggle = async (id) => {
  try {
    setLoading2(true)
    const response = await axios.post("/user/toggleLike",{ creationId: id },{
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );

    if (response.data.statusCode === 200) {
      const isNowLiked = response.data.liked;
      setCreations((prevCreations) =>prevCreations.map((creation) =>
          creation.id === id?{
                ...creation,
                liked: isNowLiked,
                likes: isNowLiked? creation.likes + 1: creation.likes - 1,
              }
            : creation
        )
      );
      toast.success(`${isNowLiked?'Post Liked':'Post Disliked'}`)
    } else {
      toast.error("Unexpected response from server.");
    }
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else if (error.request) {
      toast.error("No response from server.");
    } else {
      toast.error("Unexpected error occurred.");
    }
  }finally{
    setLoading2(false)
  }
};


  const downloadImage = async (img) => {
      try {
        const response = await fetch(img);
        const blob = await response.blob();
  
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "img.jpg";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } catch (err) {
        toast.error("Failed to download image.");
        console.error("Download error:", err);
      }
    };

  useEffect(() => {
    user && fetchCreations();
  }, []);

  return (
    <div className="flex-1  flex flex-col gap-4 p-6 mb-10 h-screen overflow-y-scroll">
      <h2 className="text-lg">Creations</h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <span className="w-10 h-10 mt-15 rounded-full border-2 border-t-transparent animate-spin text-purple-800"></span>
        </div>
      ) : (
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
                <p className="text-[8px] hidden group-hover:block">
                  {creation.prompt}
                </p>

                <div className="flex gap-1 items-center">
                  <p>{creation.likes}</p>
                  <button disabled={loading2} onClick={() => handleToggle(creation.id)}>
                    <Heart
                    
                    className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${
                      creation.liked
                        ? "fill-red-500 text-red-600"
                        : "text-white"
                    }`}
                  />
                  </button>
                  <Download onClick={()=>downloadImage(creation.content)}   className="min-w-5 h-5 hover:scale-110 cursor-pointer "/>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Community;

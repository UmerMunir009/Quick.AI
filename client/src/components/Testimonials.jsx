import React from "react";
import { dummyTestimonialData } from "../assets/assets";

const Star = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 22 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z"
      fill="#7060de"
    />
  </svg>
);

const Testimonials = () => {
  return (
    <div >
      <h2 className="text-2xl text-center font-bold text-purple-900  sm:text-3xl md:text-4xl">
        Loved By Creators
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-6 pt-16 px-4 mb-10">
        {dummyTestimonialData.map((user, index) => (
          <div
            key={index}
            className="text-sm w-full mt-10 max-w-[20rem] border border-gray-300/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 relative"
          >
            <div className="flex flex-col items-center px-5 py-4 relative">
              <img
                className="h-20 w-20 absolute -top-14 rounded-full border-4 border-white object-cover"
                src={user.image}
                alt={`userImage${index}`}
              />
              <div className="pt-12 text-center">
                <h1 className="text-lg font-medium text-gray-800">
                  {user.name}
                </h1>
                <p className="text-gray-700 text-xs">{user.title}</p>
              </div>
            </div>

            <p className="text-gray-500 px-6 text-center">{user.content}</p>

            <div className="flex justify-center pt-4">
              <div className="flex gap-0.5">
                {[...Array(user.rating)].map((_, i) => (
                  <Star key={i} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;

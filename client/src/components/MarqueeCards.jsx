import React, { useState } from 'react';

const cardData = [
  {
    title: "Content-Writing",
    image:'https://res.cloudinary.com/domzjq0by/image/upload/v1753945718/fs32vmrqbrhuxurlgzjq.png'
  },
  {
    title: "Resume-Reviewer",
    image:'https://res.cloudinary.com/domzjq0by/image/upload/v1753945850/pwk0svjfyhythiwyaka0.png'
  },
  {
    title: "Image Generator",
    image:"https://res.cloudinary.com/domzjq0by/image/upload/v1753691956/ro5xasn9jw3xqlostjwc.png"
  },
  {
    title: "Background-remover",
    image:'https://res.cloudinary.com/domzjq0by/image/upload/v1747311523/tnxgo8hyzoq5c6otrpw2.png'
  },
];

const MarqueeCards = () => {
  const [isPaused, setIsPaused] = useState(false);

  const animationDuration = `${cardData.length * 2.5}s`;

  return (
    <div className="relative overflow-hidden w-full max-w-6xl mx-auto mb-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Left Gradient */}
      <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />

      {/* Marquee Wrapper */}
      <div
        className="marquee-inner flex h-100  w-fit"
        style={{
          animation: `marqueeScroll linear infinite`,
          animationDuration,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        <div className="flex">
          {[...cardData, ...cardData].map((card, idx) => (
            <div key={idx} className="w-56 mx-4 h-[20rem] relative group hover:scale-90 transition-all duration-300">
              <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-lg font-semibold text-center">{card.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Gradient */}
      <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

      {/* Styles */}
      <style jsx>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default MarqueeCards;

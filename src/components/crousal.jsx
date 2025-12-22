import { useState, useEffect } from "react";
import Beau_beac1 from '../assets/Home_page/Beau_beac1.png';
import Beau_beac2 from '../assets/Home_page/Beau_beac2.png';
import Beau_beac3 from '../assets/Home_page/Beau_beac3.png';
import Beau_beac4 from '../assets/Home_page/Beau_beac4.png';
import Beau_beac5 from '../assets/Home_page/Beau_beac5.png';

const CrousalImages = [
    Beau_beac1,
    Beau_beac2,
    Beau_beac3,
    Beau_beac4,
    Beau_beac5,
];

export default function Crousal() {
    const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % CrousalImages.length);
  };

  const prev = () => {
    setCurrent((prev) =>
      prev === 0 ? CrousalImages.length - 1 : prev - 1
    );
  };

  // Get 5 visible slides (2 left, center, 2 right)
  const visibleSlides = [
    CrousalImages[(current - 2 + CrousalImages.length) % CrousalImages.length],
    CrousalImages[(current - 1 + CrousalImages.length) % CrousalImages.length],
    CrousalImages[current],
    CrousalImages[(current + 1) % CrousalImages.length],
    CrousalImages[(current + 2) % CrousalImages.length],
  ];

  useEffect(() => {
  const timer = setInterval(next, 3000);
  return () => clearInterval(timer);
}, []);


    return (
        <>
        <div className="text-white mt-[10rem] flex items-center justify-center relative overflow-hidden">
  {/* Left Arrow */}
  <button
    onClick={prev}
    className="absolute left-10 z-20 bg-black/60 p-3 rounded-full"
  >
    ❮
  </button>

  {/* Carousel */}
  <div className="relative w-[900px] h-[500px] flex items-center justify-center">
    {visibleSlides.map((img, index) => {
      const position = index - 2; // center = 0

      return (
        <div
          key={index}
          className="absolute transition-all duration-500 ease-in-out"
          style={{
            transform: `
              translateX(${position * 260}px)
              scale(${position === 0 ? 1 : 0.8})
            `,
            zIndex: position === 0 ? 10 : 5,
            opacity: position === 0 ? 1 : 0.6,
          }}
        >
          <img
            src={img}
            className="w-[300px] h-[420px] object-cover rounded-lg shadow-xl hover:scale-110 transition-all duration-300"
          />
        </div>
      );
    })}
  </div>

  {/* Right Arrow */}
  <button
    onClick={next}
    className="absolute right-10 z-20 bg-black/60 p-3 rounded-full"
  >
    ❯
  </button>
</div>
        </>
    )
}
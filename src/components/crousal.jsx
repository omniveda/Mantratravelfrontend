import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [beachesData, setBeachesData] = useState(CrousalImages.map(img => ({ image: img })));
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchBeaches = async () => {
      try {
        const res = await axios.get('https://mantratravelbackend.onrender.com/api/blogs?tag=beaches');
        if (res.data && res.data.length > 0) {
          setBeachesData(res.data.map(blog => ({
            image: blog.image,
            title: blog.heading,
            id: blog._id
          })));
        }
      } catch (err) {
        console.error("Error fetching beach blogs:", err);
      }
    };
    fetchBeaches();
  }, []);

  const next = () => {
    setCurrent((prev) => (prev + 1) % beachesData.length);
  };

  const prev = () => {
    setCurrent((prev) =>
      prev === 0 ? beachesData.length - 1 : prev - 1
    );
  };

  // Get 5 visible slides (2 left, center, 2 right)
  const visibleSlides = [
    beachesData[(current - 2 + beachesData.length) % beachesData.length],
    beachesData[(current - 1 + beachesData.length) % beachesData.length],
    beachesData[current],
    beachesData[(current + 1) % beachesData.length],
    beachesData[(current + 2) % beachesData.length],
  ];

  useEffect(() => {
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [beachesData.length]); // Added dependency to re-interval if data length changes



  return (
    <>
      <div className="text-white mt-[6rem] flex items-center justify-center relative overflow-hidden">
        {/* Left Arrow */}
        <button
          onClick={prev}
          className="absolute left-[0px] z-20 bg-black/60 p-3 rounded-full"
        >
          ❮
        </button>

        {/* Carousel */}
        <div className="relative w-[950px] h-[700px] flex items-center justify-center">
          {visibleSlides.map((slide, index) => {
            const position = index - 2; // center = 0

            return (
              <div
                key={index}
                className={`absolute transition-all duration-500 ease-in-out ${slide.id ? 'cursor-pointer' : ''} group`}
                onClick={() => slide.id && navigate(`/blog/${slide.id}`)}
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
                  src={slide.image}
                  className="w-[450px] h-[600px] object-cover rounded-lg shadow-xl hover:scale-110 transition-all duration-300"
                />
                {/* Heading overlay for the center slide only */}
                {position === 0 && slide.title && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 rounded-lg">
                    <h3 className="text-white text-2xl font-bold text-center drop-shadow-lg">
                      {slide.title}
                    </h3>
                  </div>
                )}
              </div>
            );
          })}
        </div>


        {/* Right Arrow */}
        <button
          onClick={next}
          className="absolute right-0 z-20 bg-black/60 p-3 rounded-full"
        >
          ❯
        </button>
      </div>
    </>
  )
}
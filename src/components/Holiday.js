import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { IoIosAirplane } from 'react-icons/io';
import nature from '../assets/images/nature1.png';
import Attractions from './Attractions';
import Asia1 from "../assets/Home_page/Asia1.png";
import Asia2 from "../assets/Home_page/Asia2.png";
import Asia3 from "../assets/Home_page/Asia3.png";
import Europe1 from "../assets/Home_page/Europe1.png";
import Europe2 from "../assets/Home_page/Europe2.png";
import Europe3 from "../assets/Home_page/Europe3.png";
import America1 from "../assets/Home_page/America1.png";
import America2 from "../assets/Home_page/America2.png";
import America3 from "../assets/Home_page/America3.png";
import Africa1 from "../assets/Home_page/Africa1.png";
import Africa2 from "../assets/Home_page/Africa2.png";
import Africa3 from "../assets/Home_page/Africa3.png";

export default function Holiday() {
  const navigate = useNavigate();
  const initialContinents = [
    {
      key: 'ASIA',
      title: 'ASIA',
      intro: "it's my holiday",
      description: 'Discover the soul of Asia — a tapestry of ancient cultures, epic landscapes, and unforgettable journeys.',
      countries: [],
      images: [Asia1, Asia2, Asia3],
    },
    {
      key: 'EUROPE',
      title: 'EUROPE',
      intro: "it's my holiday",
      description: "Wander through Europe's timeless charm — where every street tells a story and every journey feels like art.",
      countries: ['FRANCE', 'NETHERLANDS', 'IRELAND', 'BELGIUM', 'GERMANY', 'GREECE', 'SPAIN', 'SWEDEN', 'UK', 'ITALY'],
      images: [Europe1, Europe2, Europe3],
    },
    {
      key: 'AMERICA',
      title: 'AMERICA',
      intro: "it's my holiday",
      description: 'Discover the soul of America - tapestry of ancient cultures, epic landscapes, and unforgettable journeys.',
      countries: [],
      images: [America1, America2, America3],
    },
    {
      key: 'OCEANIA',
      title: 'OCEANIA',
      intro: "it's my holiday",
      description: 'Discover the soul of Oceania - tapestry of ancient cultures, epic landscapes, and unforgettable journeys.',
      countries: [],
      images: [Asia1, Asia2, Asia3], // Note: Using Asia images as placeholders if America/Oceania images are missing in imports
    },
    {
      key: 'AFRICA',
      title: 'AFRICA',
      intro: "it's my holiday",
      description: "Wander through Africa's timeless charm - where every street tells a story and every journey feels like art.",
      countries: [],
      images: [Africa1, Africa2, Africa3],
    },
  ];

  const [continentsData, setContinentsData] = useState(initialContinents);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('https://mantratravelbackend.onrender.com/api/blogs');
        const allBlogs = res.data;

        const updatedContinents = initialContinents.map(continent => {
          const filteredBlogs = allBlogs.filter(blog =>
            blog.tags?.some(tag => tag.toLowerCase() === continent.key.toLowerCase())
          );

          if (filteredBlogs.length > 0) {
            return {
              ...continent,
              images: filteredBlogs.map(blog => ({
                url: blog.image,
                heading: blog.heading,
                id: blog._id
              })).filter(img => img.url)
            };
          } else {
            return {
              ...continent,
              images: continent.images.map(img => ({ url: img }))
            };
          }
        });

        setContinentsData(updatedContinents);
      } catch (err) {
        console.error("Error fetching blogs in Holiday.js:", err);
      }
    };
    fetchBlogs();
  }, []);

  const [startIndices, setStartIndices] = useState(() =>
    initialContinents.reduce((acc, c) => {
      acc[c.key] = 0;
      return acc;
    }, {})
  );

  const handleNext = (key, totalImages) => {
    if (totalImages === 0) return;
    setStartIndices((prev) => ({
      ...prev,
      [key]: (prev[key] + 1) % totalImages,
    }));
  };

  const getVisibleImages = (images, startIndex) => {
    const len = images.length;
    if (len === 0) return [];

    return [0, 1, 2].map(offset => {
      const index = (startIndex + offset) % len;
      return images[index];
    });
  };

  const ContinentSection = ({ continent, index }) => {
    const isTextRight = [2, 4].includes(index); // America (2) and Africa (4) have text on right (images left)
    const startIndex = startIndices[continent.key] ?? 0;
    const imagesLen = continent.images?.length || 0;

    // Use modular arithmetic to allow infinite scrolling effect
    const visibleImages = getVisibleImages(continent.images, startIndex);

    return (
      <div className="w-full box-border rounded-xl">
        <div className={`flex flex-col ${isTextRight ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-14 items-center md:items-start mb-3 w-full p-0`}>

          {/* Text Column */}
          <div className="w-full md:w-[28%] text-center md:text-left pt-4">
            <div
              style={{ fontFamily: "'Brush Script MT', cursive" }}
              className={`text-6xl md:text-[5rem] mb-2 drop-shadow-sm ${continent.title === "ASIA" || continent.title === "AMERICA" ? 'text-[#1fb36b]' : 'text-[#e3176f]'}`}
            >
              {continent.intro}
            </div>

            <h2
              style={{ fontFamily: "'Pacifico', 'Brush Script MT', cursive", letterSpacing: 2 }}
              className={`text-5xl md:text-[3.8rem] m-0 mb-5 text-center md:text-left drop-shadow-md ${continent.title === "ASIA" || continent.title === "AMERICA" ? 'text-[#f3744a]' : 'text-[#1fb36b]'}`}
            >
              {continent.title}
            </h2>

            <p className="text-[#444] font-medium text-justify leading-relaxed text-lg md:text-[1.35rem] m-0 pr-2">
              {continent.description}
            </p>

            {continent.countries && continent.countries.length > 0 && (
              <div className="text-[#666] mt-4 text-sm md:text-[0.9rem] font-medium tracking-wide">
                {continent.countries.join(' • ')}
              </div>
            )}
          </div>

          {/* Images Area */}
          <div className="w-full md:w-[70%] h-auto flex gap-6 items-center pb-4 mt-2 relative perspective-1000">
            <div className="flex gap-6 w-full relative overflow-hidden px-1 py-4">
              {visibleImages.map((imgObj, i) => (
                <div
                  key={`${continent.key}-${i}-${imgObj.id || imgObj.url}`}
                  className={`min-w-[80vw] md:min-w-[30%] h-[320px] md:h-[420px] rounded-[24px] overflow-hidden flex-shrink-0 md:flex-[0_0_calc(33.333%_-_16px)] relative ${imgObj.id ? 'cursor-pointer' : ''} group shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2`}
                  onClick={() => imgObj.id && navigate(`/blog/${imgObj.id}`)}
                >
                  <img
                    src={imgObj.url}
                    alt={`${continent.title}-${i}`}
                    className="w-full h-full object-cover block transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Heading Overlay */}
                  {imgObj.heading && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-white text-xl md:text-2xl font-bold line-clamp-2 drop-shadow-lg transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
                        {imgObj.heading}
                      </h3>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Next Button - Glassmorphism Style */}
            {imagesLen > 3 && (
              <button
                onClick={() => handleNext(continent.key, imagesLen)}
                className="absolute right-[-24px] top-1/2 -translate-y-1/2 w-[56px] h-[56px] rounded-full bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center cursor-pointer z-20 hover:scale-110 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:bg-white transition-all duration-300 hidden md:flex border border-white/50 group"
                aria-label="Next image"
              >
                <span className="text-[#f08f5b] text-2xl font-bold group-hover:translate-x-0.5 transition-transform duration-200">{'>'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='flex flex-col gap-16 md:gap-32 px-4 md:px-8 py-12 max-w-[1920px] mx-auto'>
      {/* Top row: Asia, Europe */}
      <div className='flex flex-col gap-24 lg:px-[60px] xl:px-[100px] w-full'>
        {continentsData.slice(0, 2).map((continent, index) => (
          <ContinentSection key={continent.key} continent={continent} index={index} />
        ))}
      </div>

      {/* Center Attractions */}
      <Attractions />

      {/* Testimonials Section */}
      <div className='flex flex-col items-center py-16 md:py-24 bg-gradient-to-b from-[#fdfbf7] to-[#f4f4f4] border-b-[8px] border-[#ffb443]'>
        <h2
          style={{ fontFamily: "serif" }}
          className="text-4xl md:text-[3.5rem] tracking-[4px] mb-4 text-[#222] font-light text-center drop-shadow-sm"
        >
          WHAT TRAVELERS SAY
        </h2>

        <div className="flex items-center justify-center gap-4 mb-10 md:mb-16 opacity-80">
          <div className="w-[40px] md:w-[60px] h-[2px] bg-gradient-to-r from-transparent to-[#c9a961]"></div>
          <IoIosAirplane className="text-3xl md:text-[2.2rem] text-[#c9a961]" />
          <div className="w-[40px] md:w-[60px] h-[2px] bg-gradient-to-r from-[#c9a961] to-transparent"></div>
        </div>

        <div className="flex items-center gap-6 md:gap-12 max-w-[1100px] mx-auto px-6 relative">
          <div className="text-3xl md:text-[3rem] text-[#a89968] cursor-pointer absolute md:static left-0 top-1/2 -translate-y-1/2 z-10 hover:scale-110 transition-transform duration-200">{'<'}</div>

          <div className="text-center flex-1">
            <p
              style={{ fontFamily: "'Georgia', serif" }}
              className="text-xl md:text-[2rem] leading-[1.8] text-[#444] mb-8 px-4 italic"
            >
              "India is the cradle of the human race, the birthplace of human speech, the mother of history, the grandmother of legend, and the great grandmother of tradition."
            </p>

            <div className="flex justify-center mb-6">
              <div className="w-[70px] md:w-[90px] h-[70px] md:h-[90px] rounded-full bg-[#ddd] overflow-hidden border-[4px] border-[#c9a961] shadow-lg">
                <img src={nature} alt='avatar' className="w-full h-full object-cover" />
              </div>
            </div>

            <p style={{ fontFamily: 'serif' }} className="text-lg md:text-[1.4rem] text-[#c9a961] font-bold my-2 tracking-wide">— Mark Twain —</p>
            <p style={{ fontFamily: 'serif' }} className="text-base md:text-[1.25rem] text-[#8a7e58] my-1 font-medium">"The Father of American Literature"</p>
            <p style={{ fontFamily: 'serif' }} className="text-sm md:text-[1.1rem] text-[#999] m-0">American Humorist, Novelist, and Travel writer (America, USA)</p>
          </div>

          <div className="text-3xl md:text-[3rem] text-[#a89968] cursor-pointer absolute md:static right-0 top-1/2 -translate-y-1/2 z-10 hover:scale-110 transition-transform duration-200">{'>'}</div>
        </div>
      </div>

      {/* Bottom row: America, Oceania, Africa */}
      <div className='flex flex-col gap-24 lg:px-[60px] xl:px-[100px] w-full'>
        {continentsData.slice(2).map((continent, index) => (
          <ContinentSection key={continent.key} continent={continent} index={index + 2} />
        ))}
      </div>

    </div>
  );
}
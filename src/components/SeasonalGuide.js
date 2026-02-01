import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import nature from '../assets/images/nature1.png';

import Sea_tapes from '../assets/Home_page/Sea_tapes.png';
import hit_her from '../assets/Home_page/hit_her.png';
import cell_free from '../assets/Home_page/cell_free.png';
import met_wild1 from '../assets/Home_page/met_wild1.png';
import met_whild2 from '../assets/Home_page/met_wild2.png';
import met_whild3 from '../assets/Home_page/met_wild3.png';
import met_whild4 from '../assets/Home_page/met_wild4.png';
import met_whild5 from '../assets/Home_page/met_wild5.png';
import Dest1 from '../assets/Home_page/Dest1.png';
import Dest2 from '../assets/Home_page/Dest2.png';
import Dest3 from '../assets/Home_page/Dest3.png';
import Dest4 from '../assets/Home_page/Dest4.png';
import Dest5 from '../assets/Home_page/Dest5.png';
import Dest6 from '../assets/Home_page/Dest6.png';
import Crousal from './crousal';

const met_wild = [
  met_wild1,
  met_whild2,
  met_whild3,
  met_whild4,
  met_whild5,
];

const destinationPicks = [
  {
    title: "10 ROMANTIC LAKE SPOTS FOR COUPLES",
    image: Dest1,
  },
  {
    title: "THE ULTIMATE TRAVEL BUCKET LIST",
    image: Dest2,
  },
  {
    title: "AMAZING ROAD TRIPS AROUND THE WORLD",
    image: Dest3,
  },
  {
    title: "DISCOVER THE MOST MAGICAL SUNSETS OF THE WORLD",
    image: Dest4,
  },
  {
    title: "TOP 10 JUNGLE GETAWAYS",
    image: Dest5,
  },
  {
    title: "TOP 10 HOTTEST BEACHES OF THE WORLD",
    image: Dest6,
  }

];
export default function SeasonalGuide({ country = "India" }) {
  const navigate = useNavigate();
  const [dynamicPicks, setDynamicPicks] = useState(destinationPicks);
  const [historyBlogs, setHistoryBlogs] = useState([]);
  const [animalBlogs, setAnimalBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const countryParam = country ? `&country=${encodeURIComponent(country)}` : "";
        const fallbackParam = "&fallback=General";

        // Fetch destination picks
        const destRes = await axios.get(`https://mantratravelbackend.onrender.com/api/blogs?tag=destinations${countryParam}${fallbackParam}`);
        if (destRes.data && destRes.data.length > 0) {
          setDynamicPicks(destRes.data.map(blog => ({
            title: blog.heading,
            image: blog.image,
            id: blog._id
          })));
        }

        // Fetch history & heritage blogs
        const historyRes = await axios.get(`https://mantratravelbackend.onrender.com/api/blogs?tag=historyheritage${countryParam}${fallbackParam}`);
        if (historyRes.data && historyRes.data.length > 0) {
          setHistoryBlogs(historyRes.data.map(blog => ({
            title: blog.heading,
            image: blog.image,
            id: blog._id
          })));
        }

        // Fetch animal blogs
        const animalRes = await axios.get(`https://mantratravelbackend.onrender.com/api/blogs?tag=animals${countryParam}${fallbackParam}`);
        if (animalRes.data && animalRes.data.length > 0) {
          setAnimalBlogs(animalRes.data.map(blog => ({
            title: blog.heading,
            image: blog.image,
            id: blog._id
          })));
        }
      } catch (err) {
        console.error("Error fetching blogs in SeasonalGuide.js:", err);
      }
    };
    fetchBlogs();
  }, [country]);


  const scroll = (direction) => {
    const container = document.getElementById("carousel");
    const scrollAmount = 300;

    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="w-full px-4 md:px-0">
      <div className="text-white text-center md:text-left">
        <h1 className="font-bold text-4xl md:text-[3.6rem]">SEASONAL GUIDE</h1>
        <h3 className="font-semibold text-lg md:text-[1.3rem] mt-[10px] leading-snug">“Travel Smarter Every Season-- Your Guide to Weare. When & How to Go</h3>
      </div>

      <div className="flex flex-col md:flex-row justify-center text-white mt-12 md:mt-[6rem] gap-12 md:gap-[32px]">
        {/* Left Column: Destination Picks */}
        <div className="w-full md:w-[35%] font-bold text-left">
          <h2 className='text-3xl md:text-[2.2rem] mb-6 md:mb-0'>DESTINATIONS PICKS</h2>
          {dynamicPicks.map((pick, index) => (
            <div
              key={index}
              className="flex gap-4 md:gap-[20px] mt-[20px] md:mt-[30px] items-center md:items-start cursor-pointer group"
              onClick={() => pick.id && navigate(`/blog/${pick.id}`)}
            >
              <img
                src={pick.image}
                alt={pick.title}
                className="w-[100px] md:w-[120px] h-[80px] md:h-[100px] object-cover hover:scale-110 transition-all duration-300 rounded-md"
              />
              <div className="flex-1 text-lg md:text-[1.3rem] flex flex-col justify-between text-gray-300">
                <p className='text-sm md:text-base opacity-80 group-hover:text-white transition-colors'>EXPLORE</p>
                <p className="leading-tight group-hover:text-white transition-colors">{pick.title}</p>
              </div>
            </div>
          ))}


          <p className='underline mt-[30px] md:mt-[40px] text-xl md:text-[1.3rem] text-gray-300 cursor-pointer text-center md:text-left'>SEE MORE</p>
        </div>

        {/* Right Column: Image Grid */}
        <div className="w-full md:w-[65%] flex flex-col gap-6 md:gap-[5%]">
          {/* Top Large Image */}
          <div className='h-[300px] md:h-[50%] relative group overflow-hidden rounded-lg'>
            <img
              src={Sea_tapes}
              alt="Tapestry"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="absolute bottom-6 left-6 text-left">
              <h2 className="text-2xl md:text-[2.5rem] font-bold leading-tight uppercase max-w-[90%] md:max-w-[80%] drop-shadow-lg">
                A TAPESTRY WOVEN WITH COUNTLESS
              </h2>
              <button className="mt-4 text-sm font-bold tracking-widest uppercase hover:text-gray-300 transition-colors">
                Read
              </button>
            </div>
          </div>

          {/* Bottom Split Images */}
          <div className='flex flex-col md:flex-row h-auto md:h-[50%] gap-6 md:gap-[5%]'>
            <div
              className='w-full md:w-[50%] flex flex-col gap-4 md:gap-[5%] h-[400px] md:h-auto cursor-pointer group'
              onClick={() => historyBlogs[0]?.id && navigate(`/blog/${historyBlogs[0].id}`)}
            >
              <div className='h-[60%] overflow-hidden rounded-lg'>
                <img
                  src={historyBlogs[0]?.image || hit_her}
                  className='w-full h-full object-cover hover:scale-110 transition-all duration-300'
                  alt="History"
                />
              </div>
              <div className='flex-1 bg-white text-left p-4 md:px-[1.2rem] rounded-lg text-black'>
                <h2 className='text-gray-500 text-lg md:text-[1.3rem] font-bold'>HISTORY & HERITAGE</h2>
                <h2 className='text-black text-lg md:text-[1.3rem] font-bold leading-tight mt-1 group-hover:underline'>
                  {historyBlogs[0]?.title || "WORLD HERITAGE: OUR RETURN AND THE FUTURE’S TREASURE"}
                </h2>
                <p className='text-black font-semibold mt-2 hover:underline'>READ</p>
              </div>
            </div>

            <div
              className='w-full md:w-[50%] flex flex-col-reverse md:flex-col gap-4 md:gap-[5%] h-[400px] md:h-auto cursor-pointer group'
              onClick={() => historyBlogs[1]?.id && navigate(`/blog/${historyBlogs[1].id}`)}
            >
              <div className='flex-1 bg-white text-left p-4 md:px-[1.2rem] rounded-lg text-black'>
                <h2 className='text-gray-500 text-lg md:text-[1.3rem] font-bold'>HISTORY & HERITAGE</h2>
                <h2 className='text-black text-lg md:text-[1.3rem] font-bold leading-tight mt-1 group-hover:underline'>
                  {historyBlogs[1]?.title || "“KEEP THE WILD WILD!” – CELEBRATES FREEDOM"}
                </h2>
                <p className='text-black text-right font-semibold mt-2 hover:underline'>READ</p>
              </div>
              <div className='h-[60%] overflow-hidden rounded-lg'>
                <img
                  src={historyBlogs[1]?.image || cell_free}
                  className='w-full h-full object-cover hover:scale-110 transition-all duration-300'
                  alt="Freedom"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Carousel Section */}
      <div className="mt-16 md:mt-[10rem] text-white relative">
        <div className="flex justify-between items-center mb-6 px-2 md:px-6">
          <h2 className="text-xl md:text-[1.5rem] font-semibold uppercase">
            Meet the Wild: Close and Real
          </h2>
          <button className="text-xs md:text-sm tracking-widest hover:opacity-80">
            SEE MORE
          </button>
        </div>

        {/* Left Arrow (Hidden on mobile) */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 p-3 rounded-full hidden md:block hover:bg-black/80"
        >
          ❮
        </button>

        {/* Images Container */}
        <div
          id="carousel"
          className="flex gap-4 md:gap-6 overflow-x-scroll scroll-smooth px-0 md:px-16 scrollbar-hide pb-4"
        >
          {animalBlogs.length > 0
            ? [...animalBlogs, ...animalBlogs].map((blog, i) => (
              <div
                key={i}
                className="min-w-[200px] md:min-w-[240px] h-[300px] md:h-[360px] rounded-lg overflow-hidden flex-shrink-0 cursor-pointer group relative"
                onClick={() => navigate(`/blog/${blog.id}`)}
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white text-sm md:text-base font-bold line-clamp-2">{blog.title}</h3>
                </div>
              </div>
            ))
            : [...met_wild, ...met_wild].map((img, i) => (
              <div
                key={i}
                className="min-w-[200px] md:min-w-[240px] h-[300px] md:h-[360px] rounded-lg overflow-hidden flex-shrink-0"
              >
                <img
                  src={img}
                  alt="wildlife"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))
          }
        </div>


        {/* Right Arrow (Hidden on mobile) */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 p-3 rounded-full hidden md:block hover:bg-black/80"
        >
          ❯
        </button>
      </div>

      {/* Bottom Headlines */}
      <div className='text-white mt-16 md:mt-[10rem] flex flex-col md:flex-row gap-4 md:gap-[4rem] justify-center items-center text-center'>
        <h2 className='text-3xl md:text-[2.5rem] font-bold'>Explore the <span className='text-5xl md:text-[4rem] block md:inline'>World’s</span></h2>
        <h2 className='text-3xl md:text-[2.5rem] font-bold'>Most Beautiful <span className='text-5xl md:text-[4rem] text-blue-500 block md:inline'>Beaches</span></h2>
      </div>

      <div className='text-white md:mt-[6rem] flex justify-center'>
        <Crousal />
      </div>

    </div>
  );
}
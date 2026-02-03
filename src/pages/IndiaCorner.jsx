import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// Components
import SeasonalGuide from "../components/SeasonalGuide";
import Attractions from '../components/Attractions';
import { IoIosAirplane } from 'react-icons/io';
import ExploreReason from '../components/ExploreReason';
import Destination from '../components/Destination';
import TravelBook from '../components/TravelBook';
import TravellersStory from '../components/TravellersStory';
import Adventures from '../components/Adventures';
import IncredibleMoments from '../components/IncredibleMoments';
import Instagramhandles from '../components/Instagramhandles';

// Assets
import western_def from "../assets/Destinations/western.png"
import central_def from "../assets/Destinations/central.png"
import northern_def from "../assets/Destinations/northern.png"
import northeast_def from "../assets/Destinations/north-east.png"
import south_def from "../assets/Destinations/south.png"
import eastern_def from "../assets/Destinations/eastern.png"
import hero1_def from '../assets/Home_page/hero1.png';
import hero2_def from '../assets/Home_page/hero2.png';
import nature from '../assets/images/nature1.png';



export default function IndiaCorner() {
  const navigate = useNavigate();
  const [dynamicData, setDynamicData] = useState({});
  const [loading, setLoading] = useState(true);
  const [heroSections, setHeroSections] = useState({
    hero1: hero1_def,
    hero1Id: null,
    hero2: hero2_def,
    hero2Id: null
  });
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchIndiaData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://mantratravelbackend.onrender.com/api/blogs?category=Destination&country=India`);
        const blogs = res.data;

        // Group blogs by section
        const grouped = blogs.reduce((acc, blog) => {
          const section = (blog.section || "General").toUpperCase();
          if (!acc[section]) acc[section] = [];
          acc[section].push({
            title: blog.heading,
            img: blog.image,
            id: blog._id
          });
          return acc;
        }, {});

        // Hero and Testimonials
        const heroBlogs = blogs.filter(b => b.section?.toLowerCase() === "hero");
        if (heroBlogs.length > 0) {
          setHeroSections({
            hero1: heroBlogs[0].image || hero1_def,
            hero1Id: heroBlogs[0]._id,
            hero2: heroBlogs[heroBlogs.length - 1].image || hero2_def,
            hero2Id: heroBlogs[heroBlogs.length - 1]._id
          });
        }

        const testimonialBlogs = blogs.filter(b => b.section?.toLowerCase() === "testimonials");
        setTestimonials(testimonialBlogs);

        setDynamicData(grouped);
      } catch (err) {
        console.error("Error fetching India data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIndiaData();
  }, []);

  const categories = [
    "nature", "wildlife", "adventures", "heritage", "spirituality", "cities", "culture",
  ];

  const regionFallbacks = [
    { title: "WESTERN", img: western_def },
    { title: "CENTRAL", img: central_def },
    { title: "NORTHERN", img: northern_def },
    { title: "EASTERN", img: eastern_def },
    { title: "NORTH EAST", img: northeast_def },
    { title: "SOUTH", img: south_def },
  ];

  const displayRegions = dynamicData["STATES"] || dynamicData["REGIONS"] || regionFallbacks;

  const FALLBACK_IMAGE = "https://placehold.co/600x400?text=Image+Unavailable";

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = FALLBACK_IMAGE;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfbf9]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-orange-600 font-bold tracking-widest uppercase animate-pulse">Loading India Corner...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-[#fcfbf9] py-16 md:py-24 text-center min-h-screen max-w-[1440px] mx-auto px-4 md:px-12 lg:px-20">

      {/* INDIA HEADING - Premium Gradient & Animated Typography */}
      <div className="mb-20 relative animate-fade-in flex flex-col items-center">
        <h1 className="text-[100px] md:text-[180px] font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-orange-800 mb-2 opacity-90 drop-shadow-2xl select-none leading-none"
          style={{ fontFamily: "'Brush Script MT', cursive" }}>
          India
        </h1>
        <p className="text-slate-500 text-lg md:text-3xl font-serif tracking-[0.4em] uppercase mt-[-10px] md:mt-[-20px] font-light">
          The Land of Wonders
        </p>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent mx-auto mt-8 opacity-40"></div>
      </div>

      {/* CATEGORY NAV - Glassmorphism style */}
      <div className="sticky top-4 z-30 mb-24 max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 p-3 bg-white/70 backdrop-blur-xl rounded-full shadow-xl border border-white/50">
          <button
            className="px-6 py-2.5 rounded-full bg-orange-600 text-white font-bold shadow-lg hover:bg-orange-700 transition-all duration-300 uppercase text-xs tracking-wider"
          >
            Explore India
          </button>
          {categories.map((item, index) => (
            <button
              key={index}
              onClick={() => { (item === "States") ? navigate("/destinations/india-corner") : navigate(`/${item}`) }}
              className={`px-5 py-2.5 rounded-full font-bold transition-all duration-300 text-xs tracking-widest uppercase
                ${item === "States"
                  ? "bg-sky-100 text-sky-700 border border-sky-200"
                  : "text-slate-500 hover:text-orange-600 hover:bg-white/50"
                }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* REGIONS GRID - Premium Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-[1400px] mx-auto mb-32 px-4">
        {displayRegions.map((region, index) => (
          <div
            key={index}
            onClick={() => {
              if (region.id) {
                navigate(`/blog/${region.id}`);
              } else {
                navigate('/blog?tag=indiaexplorer');
              }
            }}
            className="group relative flex flex-col items-center p-8 rounded-[2.5rem] bg-white shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 cursor-pointer border border-slate-50 overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <div className="w-[130px] h-[130px] md:w-[150px] md:h-[150px] mb-8 overflow-hidden rounded-full p-3 bg-slate-50 border-2 border-dashed border-slate-200 group-hover:border-orange-400 group-hover:bg-white transition-all duration-500 relative z-10">
              <img
                src={region.img || FALLBACK_IMAGE}
                alt={region.title}
                onError={handleImageError}
                className="w-full h-full object-contain filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            <h3 className="text-xl font-black tracking-widest text-slate-800 group-hover:text-orange-600 transition-colors duration-500 font-serif uppercase text-center">
              {region.title}
            </h3>
            <span className="text-[10px] font-black tracking-[0.3em] text-orange-400 mt-3 bg-orange-50 px-3 py-1.5 rounded-full uppercase">
              Explore
            </span>
          </div>
        ))}
      </div>

      <section className="p-0 text-center rounded-t-[3rem] mb-10 overflow-hidden">
        <div className="flex flex-col h-auto md:min-h-[1200px]">
          {/* Top Half */}
          <div
            className={`w-full relative bg-cover bg-center h-[50vh] md:h-auto md:flex-1 group ${heroSections.hero1Id ? 'cursor-pointer' : ''}`}
            style={{ backgroundImage: `url(${heroSections.hero1})` }}
            onClick={() => {
              if (heroSections.hero1Id) navigate(`/blog/${heroSections.hero1Id}`);
            }}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
            <div className="absolute top-[5%] left-0 w-full flex flex-wrap justify-center md:justify-around items-center bg-black/40 backdrop-blur-md py-4 md:py-6 gap-4 md:gap-0 z-10 border-y border-white/10">
              {['nature', 'wildlife', 'adventures', 'heritage', 'spirituality', 'cities', 'culture'].map((item, idx, array) => (
                <div key={idx} className="flex items-center">
                  <button
                    onClick={() => navigate(`/${item}`)}
                    className="bg-transparent border-none text-white text-xs md:text-sm cursor-pointer px-4 md:px-6 py-2 hover:text-orange-400 transition-all duration-300 uppercase font-bold tracking-widest"
                  >
                    {item}
                  </button>
                  {idx < array.length - 1 && (
                    <div className="h-4 w-[1px] bg-white/30 hidden md:block"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Half */}
          <div
            className={`w-full relative bg-cover bg-center h-[60vh] md:h-auto md:flex-1 overflow-hidden ${heroSections.hero2Id ? 'cursor-pointer' : ''}`}
            style={{ backgroundImage: `url(${heroSections.hero2})` }}
            onClick={() => {
              if (heroSections.hero2Id) navigate(`/blog/${heroSections.hero2Id}`);
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>
            <div className="relative h-full flex flex-col items-center justify-center text-white text-center w-full px-6 z-10 py-20 text-center">
              <h1 className="text-5xl md:text-[8rem] font-black font-serif my-4 leading-tight tracking-tighter opacity-90 text-center">
                DESTINATIONS
              </h1>
              <h2 className="text-xl md:text-3xl mb-12 uppercase tracking-[0.5em] font-light text-orange-400 text-center">
                FOR EVERY BUCKET LIST
              </h2>

              <div className="flex items-center justify-center gap-8 mb-12 group cursor-default">
                <div className="w-12 h-[2px] bg-orange-500 group-hover:w-20 transition-all duration-500"></div>
                <span className="text-white font-black text-5xl md:text-8xl uppercase tracking-widest drop-shadow-2xl">
                  India
                </span>
                <div className="w-12 h-[2px] bg-orange-500 group-hover:w-20 transition-all duration-500"></div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => navigate('/blog')}
                  className="bg-white text-slate-900 border-none px-12 py-5 rounded-full font-black tracking-widest text-sm hover:bg-orange-500 hover:text-white transition-all duration-500 shadow-2xl hover:scale-110 active:scale-95 uppercase"
                >
                  Get Inspired
                </button>
              </div>
            </div>

            {/* Torn Paper Edge Effect - Improved */}
            <div className="absolute bottom-[-1px] left-0 w-full h-24 bg-[#fcfbf9] z-20"
              style={{
                clipPath: 'polygon(0% 100%, 2% 80%, 4% 95%, 6% 75%, 8% 90%, 10% 82%, 12% 95%, 14% 85%, 16% 92%, 18% 70%, 20% 88%, 22% 80%, 24% 94%, 26% 82%, 28% 90%, 30% 75%, 32% 88%, 34% 92%, 36% 80%, 38% 95%, 40% 82%, 42% 88%, 44% 75%, 46% 92%, 48% 85%, 50% 98%, 52% 80%, 54% 92%, 56% 82%, 58% 95%, 60% 78%, 62% 90%, 64% 85%, 66% 96%, 68% 82%, 70% 90%, 72% 75%, 74% 92%, 76% 88%, 78% 98%, 80% 82%, 82% 94%, 84% 88%, 86% 96%, 88% 80%, 90% 92%, 92% 85%, 94% 98%, 96% 82%, 98% 94%, 100% 100%)'
              }}
            ></div>
          </div>
        </div>
      </section>

      {/* SHARED COMPONENTS SECTION */}
      <div className="space-y-32 pb-40">
        <section className="bg-slate-950 px-6 py-24 md:py-32 rounded-[4rem] relative overflow-hidden">
          {/* Background light effect */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full"></div>
          <SeasonalGuide country="india" />
        </section>

        <div className="transform hover:scale-[1.01] transition-transform duration-700">
          <Attractions />
        </div>

        {/* Testimonials - More visual flair */}
        <div className='flex flex-col items-center py-24 bg-gradient-to-b from-white to-[#fcfbf9] relative group'>
          <div className="absolute top-10 left-10 opacity-5 group-hover:opacity-10 transition-opacity">
            <IoIosAirplane className="text-[200px] -rotate-45" />
          </div>

          <h2 style={{ fontFamily: "serif" }} className="text-4xl md:text-[4rem] tracking-[8px] mb-8 text-slate-800 font-black text-center uppercase">
            Voices of <span className="text-orange-500">Voyagers</span>
          </h2>


          <div className="flex items-center justify-center gap-6 mb-16">
            <div className="w-[100px] h-[3px] bg-gradient-to-r from-transparent to-slate-300"></div>
            <IoIosAirplane className="text-4xl text-orange-500 animate-pulse" />
            <div className="w-[100px] h-[3px] bg-gradient-to-l from-transparent to-slate-300"></div>
          </div>

          <div className="max-w-5xl mx-auto px-6 relative">
            <div className="bg-white p-12 md:p-20 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col items-center">
              {testimonials.length > 0 ? (
                <>
                  <p style={{ fontFamily: "'Georgia', serif" }} className="text-2xl md:text-[2.2rem] leading-relaxed text-slate-600 mb-12 italic text-center">
                    "{testimonials[0].description}"
                  </p>
                  <div
                    onClick={() => navigate(`/blog/${testimonials[0]._id}`)}
                    className="flex flex-col items-center cursor-pointer group"
                  >
                    <div className="w-24 h-24 rounded-full bg-slate-100 overflow-hidden border-4 border-orange-500 shadow-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      <img src={testimonials[0].image || nature} alt='avatar' className="w-full h-full object-cover" />
                    </div>
                    <p className="text-xl text-slate-900 font-black tracking-widest uppercase group-hover:text-orange-600 transition-colors">— {testimonials[0].author} —</p>
                  </div>
                </>
              ) : (
                <>
                  <p style={{ fontFamily: "'Georgia', serif" }} className="text-2xl md:text-[2.2rem] leading-relaxed text-slate-600 mb-12 italic text-center text-center">
                    "India was the motherland of our race and Sanskrit the mother of Europe's languages. India was the mother of our philosophy, of much of our mathematics, of the ideals embodied in Christianity, of self-government and democracy. In many ways, Mother India is the mother of us all."
                  </p>

                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-slate-100 overflow-hidden border-4 border-orange-500 shadow-2xl mb-6">
                      <img src={nature} alt='avatar' className="w-full h-full object-cover" />
                    </div>
                    <p className="text-xl text-slate-900 font-black tracking-widest uppercase">— Will Durant —</p>
                    <p className="text-orange-600 font-bold uppercase tracking-tighter mt-1">Historian & Philosopher</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[4rem] py-20 px-4 shadow-sm border border-gray-100">
          <Destination country="india" />
        </div>

        <div className="space-y-40">
          <TravellersStory countryName="India" />
          <Adventures />
          <IncredibleMoments />
          <Instagramhandles countryName="India" />
          <ExploreReason />
        </div>

        <div>
          <div className="shadow-2xl">
            <div className="bg-white/5  backdrop-blur-md rounded-[2.8rem] py-4">
              <TravelBook />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

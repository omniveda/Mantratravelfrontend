import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { getCountryData } from '../data/countryData'; // No longer needed for dynamic data

// Shared Components
import SeasonalGuide from "./SeasonalGuide";
import Attractions from './Attractions';
import ExploreReason from './ExploreReason';
import Destination from './Destination';
import TravelBook from './TravelBook';
import TravellersStory from './TravellersStory';
import Adventures from './Adventures';
import IncredibleMoments from './IncredibleMoments';
import Instagramhandles from './Instagramhandles';

// Icons & Assets
import { IoIosAirplane } from 'react-icons/io';
import nature from '../assets/images/nature1.png'; // Reused avatar
import hero1_default from '../assets/Home_page/hero1.png';
import hero2_default from '../assets/Home_page/hero2.png';

export default function CountryExplore({ countryName, onBack }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("EXPLORER");
  const [dynamicData, setDynamicData] = useState({});
  const [loading, setLoading] = useState(true);
  const [heroSections, setHeroSections] = useState({ hero1: hero1_default, hero2: hero2_default });
  const [testimonials, setTestimonials] = useState([]);

  // Using uppercase for display
  const displayName = countryName ? countryName.toUpperCase() : "COUNTRY";

  useEffect(() => {
    const fetchDestinationData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:4000/api/blogs?category=Destination&country=${encodeURIComponent(countryName || 'India')}`);
        const blogs = res.data;

        // Group blogs by section
        const grouped = blogs.reduce((acc, blog) => {
          const section = (blog.section || "General").toUpperCase();
          if (!acc[section]) acc[section] = [];
          acc[section].push({
            title: blog.heading,
            img: blog.image,
            tags: blog.tags,
            author: blog.author,
            id: blog._id
          });
          return acc;
        }, {});

        // Specific handling for Hero and Testimonials
        const heroBlogs = blogs.filter(b => b.section?.toLowerCase() === "hero");
        if (heroBlogs.length > 0) {
          setHeroSections({
            hero1: heroBlogs[0].image || hero1_default,
            hero2: heroBlogs[heroBlogs.length - 1].image || hero2_default
          });
        }

        const testimonialBlogs = blogs.filter(b => b.section?.toLowerCase() === "testimonials");
        setTestimonials(testimonialBlogs);

        setDynamicData(grouped);

        // Set first available tab as active if current one isn't in dynamic data
        const availableTabs = Object.keys(grouped).filter(t => !["HERO", "TESTIMONIALS", "INSTAGRAM"].includes(t));
        if (availableTabs.length > 0 && !availableTabs.includes(activeTab)) {
          setActiveTab(availableTabs[0]);
        } else if (availableTabs.length === 0) {
          setActiveTab("EXPLORER");
        }

      } catch (err) {
        console.error("Error fetching destination data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinationData();
  }, [countryName]);

  const currentItems = dynamicData[activeTab] || [];

  const handleItemClick = (item) => {
    // Generate tag: country + tab + item (e.g., "india" + "explorer" + "wildlife" -> "indiaexplorerwildlife")
    // Or if the blog has its own tags, we use those.
    const tag = item.tags && item.tags.length > 0 ? item.tags[0] : "";

    // Navigate to blog detail directly or blog list with tag
    if (item.id) {
      navigate(`/blog/${item.id}`);
    } else {
      navigate(`/blog?tag=${encodeURIComponent(tag)}&topic=${encodeURIComponent(item.title)}&country=${encodeURIComponent(countryName)}&category=${encodeURIComponent(activeTab)}`);
    }
  };

  const categories = [
    "nature", "wildlife", "adventures", "heritage", "spirituality", "cities", "culture",
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfbf9]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-orange-600 font-bold tracking-widest uppercase animate-pulse">Loading {countryName}...</p>
        </div>
      </div>
    );
  }

  const availableTabs = Object.keys(dynamicData).filter(t => !["HERO", "TESTIMONIALS", "INSTAGRAM", "GENERAL"].includes(t));

  return (
    <section className="bg-[#fcfbf9] py-10 px-4 text-center min-h-screen relative overflow-hidden">
      {/* Back Button - Glassmorphism style */}
      <div className="max-w-7xl mx-auto text-left mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-gray-200 text-gray-700 hover:text-black hover:bg-white hover:shadow-md transition-all duration-300 font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to World Corner
        </button>
      </div>

      {/* HEADING - Premium Gradient & Animated Typography */}
      <div className="mb-14 relative animate-fade-in text-center flex flex-col items-center">
        <h1 className="text-[70px] md:text-[130px] font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-orange-800 to-slate-900 mb-2 opacity-90 drop-shadow-xl select-none leading-tight"
          style={{ fontFamily: "'Times New Roman', serif" }}>
          {displayName}
        </h1>
        <p className="text-orange-600 text-lg md:text-2xl font-serif tracking-[0.3em] uppercase mt-[-15px] md:mt-[-30px] font-medium">
          Calling You To Explore
        </p>

        {/* Decorative element */}
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto mt-6 opacity-50"></div>
      </div>

      {/* CATEGORY NAV - Glassmorphism style */}
      <div className="sticky top-4 z-40 mb-12 max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 p-3 bg-white/70 backdrop-blur-xl rounded-full shadow-xl border border-white/50">
          <button
            onClick={() => setActiveTab("EXPLORER")}
            className={`px-6 py-2.5 rounded-full font-bold shadow-lg transition-all duration-300 uppercase text-xs tracking-wider
              ${activeTab === "EXPLORER" ? "bg-orange-600 text-white" : "bg-white text-orange-600 hover:bg-orange-50 border border-orange-100"}
            `}
          >
            Explore {countryName || 'Destinations'}
          </button>
          {categories.map((item, index) => {
            const tabName = item.toUpperCase();
            const isActive = activeTab === tabName;
            return (
              <button
                key={index}
                onClick={() => setActiveTab(tabName)}
                className={`px-5 py-2.5 rounded-full font-bold transition-all duration-300 text-xs tracking-widest uppercase border
                  ${isActive
                    ? "bg-slate-900 text-white border-slate-900 shadow-md"
                    : "text-slate-500 hover:text-orange-600 hover:bg-white/50 border-transparent hover:border-orange-100"
                  }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* NAV LINKS - Glassmorphism Tab Bar */}
      {availableTabs.length > 0 && (
        <div className="sticky top-4 z-30 mb-16 max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 p-2 bg-white/70 backdrop-blur-xl rounded-full shadow-lg border border-white/50">
            {availableTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs md:text-sm font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-500 
                  ${activeTab === tab
                    ? "bg-slate-900 text-white shadow-lg scale-105"
                    : "text-gray-500 hover:text-slate-900 hover:bg-white/50"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* GRID - Dynamic Items with Hover Effects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 max-w-7xl mx-auto mb-32">
        {currentItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(item)}
            className="group relative flex flex-col rounded-[2rem] overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2 border border-gray-100"
          >
            <div className="aspect-[4/5] overflow-hidden relative">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

              {/* Content on Image */}
              <div className="absolute bottom-6 left-0 w-full px-4 text-center">
                <h3 className="text-white font-bold uppercase text-sm md:text-base tracking-[0.2em] drop-shadow-md group-hover:tracking-[0.3em] transition-all">
                  {item.title}
                </h3>
              </div>
            </div>
          </div>
        ))}

        {/* View More Card - Unique Style */}
        <div
          onClick={() => navigate('/blog')}
          className="group flex flex-col items-center justify-center rounded-[2rem] overflow-hidden shadow-sm bg-gradient-to-br from-white to-gray-50 p-8 cursor-pointer hover:shadow-xl transition-all duration-500 h-full min-h-[300px] border-2 border-dashed border-gray-200 hover:border-orange-300"
        >
          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div className="text-slate-900 font-extrabold text-xl tracking-widest uppercase">
            View More
          </div>
          <p className="text-gray-400 text-xs mt-2 uppercase tracking-tighter">Explore all stories</p>
        </div>
      </div>

      {/* HERO PROMOTIONAL SECTIONS */}
      <div className="w-full space-y-24">
        <section className="p-0 text-center rounded-[3rem] overflow-hidden shadow-2xl mx-4">
          <div className="flex flex-col h-auto md:min-h-[1200px]">
            {/* Top Half */}
            <div
              className="w-full relative bg-cover bg-center h-[50vh] md:h-auto md:flex-1 group"
              style={{ backgroundImage: `url(${heroSections.hero1})` }}
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
              className="w-full relative bg-cover bg-center h-[60vh] md:h-auto md:flex-1 overflow-hidden"
              style={{ backgroundImage: `url(${heroSections.hero2})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>
              <div className="relative h-full flex flex-col items-center justify-center text-white text-center w-full px-6 z-10 py-20 text-center">
                <h1 className="text-5xl md:text-[8rem] font-black font-serif my-4 leading-tight tracking-tighter opacity-90 text-center uppercase">
                  DESTINATIONS
                </h1>
                <h2 className="text-xl md:text-3xl mb-12 uppercase tracking-[0.5em] font-light text-orange-400 text-center">
                  FOR EVERY BUCKET LIST
                </h2>

                <div className="flex items-center justify-center gap-8 mb-12 group cursor-default text-center">
                  <div className="w-12 h-[2px] bg-orange-500 group-hover:w-20 transition-all duration-500"></div>
                  <span className="text-white font-black text-5xl md:text-8xl uppercase tracking-widest drop-shadow-2xl">
                    {countryName || 'world'}
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
          <section className="bg-slate-950 px-6 py-24 md:py-32 rounded-[4rem] mx-4 relative overflow-hidden">
            {/* Background light effect */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full"></div>
            <SeasonalGuide />
          </section>

          <div className="transform hover:scale-[1.01] transition-transform duration-700">
            <Attractions />
          </div>

          {/* Testimonials - More visual flair */}
          <div className='flex flex-col items-center py-24 bg-gradient-to-b from-white to-[#fcfbf9] relative group'>
            <div className="absolute top-10 left-10 opacity-5 group-hover:opacity-10 transition-opacity">
              <IoIosAirplane className="text-[200px] -rotate-45" />
            </div>

            <h2 style={{ fontFamily: "serif" }} className="text-4xl md:text-[4rem] tracking-[8px] mb-8 text-slate-800 font-black text-center uppercase text-center">
              Voices of <span className="text-orange-500 text-center">Voyagers</span>
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

                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 rounded-full bg-slate-100 overflow-hidden border-4 border-orange-500 shadow-2xl mb-6">
                        <img src={testimonials[0].image || nature} alt='avatar' className="w-full h-full object-cover" />
                      </div>
                      <p className="text-xl text-slate-900 font-black tracking-widest uppercase text-center">— {testimonials[0].author} —</p>
                    </div>
                  </>
                ) : (
                  <>
                    <p style={{ fontFamily: "'Georgia', serif" }} className="text-2xl md:text-[2.2rem] leading-relaxed text-slate-600 mb-12 italic text-center">
                      "{countryName === "India"
                        ? "India was the motherland of our race and Sanskrit the mother of Europe's languages... Mother India is the mother of us all."
                        : `Exploring ${displayName} was a journey beyond my wildest expectations. The landscapes, the people, and the culture left an indelible mark on my soul.`}"
                    </p>

                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 rounded-full bg-slate-100 overflow-hidden border-4 border-orange-500 shadow-2xl mb-6">
                        <img src={nature} alt='avatar' className="w-full h-full object-cover" />
                      </div>
                      <p className="text-xl text-slate-900 font-black tracking-widest uppercase">— {countryName === "India" ? "Will Durant" : "Elena Rodriguez"} —</p>
                      <p className="text-orange-600 font-bold uppercase tracking-tighter mt-1">{countryName === "India" ? "Historian & Philosopher" : "World Traveler & Blogger"}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[4rem] py-20 px-4 shadow-sm border border-gray-100 mx-4">
            <Destination />
          </div>

          <div className="space-y-40">
            <TravellersStory />
            <Adventures />
            <IncredibleMoments />
            <Instagramhandles countryName={countryName} />
            <ExploreReason />
          </div>

          <div className="px-6">
            <div className="bg-slate-900 rounded-[3rem] p-1 shadow-2xl overflow-hidden">
              <div className="bg-white/5 backdrop-blur-md rounded-[2.8rem] py-12">
                <TravelBook />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

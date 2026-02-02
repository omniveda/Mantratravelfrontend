import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import hero1 from '../assets/Home_page/hero1.png';
import hero2 from '../assets/Home_page/hero2.png';
import Holiday from '../components/Holiday';
import Holiday2 from '../components/Holiday2';
import SeasonalGuide from '../components/SeasonalGuide';
import Destination from '../components/Destination';
import TravellersStory from '../components/TravellersStory';
import Adventures from '../components/Adventures';
import Stay_touch from '../assets/Home_page/Stay_touch.png';
import TravelBook from '../components/TravelBook';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [featuredList, setFeaturedList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExploreBlogs = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/blogs?tag=explore');
        const formattedBlogs = res.data.map(blog => ({
          id: blog._id,
          title: blog.heading,
          image: blog.image,
          description: blog.description
        }));
        setFeaturedList(formattedBlogs);
      } catch (err) {
        console.error("Error fetching explore blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExploreBlogs();
  }, []);

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", background: '#fafafa', minHeight: '100vh' }}>


      {/* Hero Section - Destinations for Every Bucket List */}
      <section className="p-0 text-center">
        <div className="flex flex-col h-auto md:h-[1400px]">
          {/* Top Half - Navigation & Hero Image 1 */}
          <div
            className="w-full relative bg-cover bg-center h-[50vh] md:h-auto md:flex-1"
            style={{ backgroundImage: `url(${hero1})` }}
          >
            <div className="absolute top-[3%] left-0 w-full flex flex-wrap justify-center md:justify-around items-center bg-black/50 py-2 md:py-3 rounded-md gap-2 md:gap-0">
              {['nature', 'wildlife', 'adventures', 'heritage', 'spirituality', 'cities', 'culture'].map((item, idx, array) => (
                <div key={idx} className="flex items-center">
                  <button
                    onClick={() => navigate(`/${item}`)}
                    className="bg-transparent border-none text-white text-sm md:text-base cursor-pointer px-3 md:px-4 py-1 hover:scale-105 transition-all duration-300 uppercase font-medium"
                  >
                    {item}
                  </button>
                  {idx < array.length - 1 && (
                    <div className="h-6 w-[2px] ml-[4rem] bg-red-600 mx-1"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Half - Main Text & Hero Image 2 */}
          <div
            className="w-full relative bg-cover bg-center h-[50vh] md:h-auto md:flex-1 overflow-hidden"
            style={{ backgroundImage: `url(${hero2})` }}
          >
            <div className=" flex flex-col items-center  justify-center text-white text-center w-full px-4">
              <h1 className="text-4xl md:text-[6rem] font-bold font-serif my-2 md:my-5 leading-[1.2]">
                DESTINATIONS
              </h1>
              <h2 className="text-lg md:text-2xl my-2 md:my-5 md:mb-[10%] uppercase tracking-widest">
                FOR EVERY BUCKET LIST
              </h2>
              <div className="text-2xl md:text-[3rem] mb-2 font-light flex items-center justify-center gap-6">
                <svg className="w-8 h-8 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-white font-bold text-6xl">india</span>
                <svg className="w-8 h-8 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 md:py-3 md:px-8 rounded-md shadow-lg transition-all duration-300 mt-4 hover:scale-105 transition-transform">
                MORE INFO
              </button>
            </div>
            {/* Torn Paper Edge Effect */}
            <div
              className="absolute bottom-0 left-0 w-full h-20 bg-white"
              style={{
                clipPath: 'polygon(0% 100%, 1.5% 85%, 3% 95%, 4.5% 80%, 6% 90%, 7.5% 75%, 9% 88%, 10.5% 82%, 12% 92%, 13.5% 78%, 15% 85%, 16.5% 90%, 18% 83%, 19.5% 88%, 21% 80%, 22.5% 92%, 24% 85%, 25.5% 78%, 27% 90%, 28.5% 82%, 30% 88%, 31.5% 75%, 33% 85%, 34.5% 90%, 36% 80%, 37.5% 88%, 39% 82%, 40.5% 92%, 42% 78%, 43.5% 85%, 45% 90%, 46.5% 83%, 48% 88%, 49.5% 80%, 51% 92%, 52.5% 85%, 54% 78%, 55.5% 90%, 57% 82%, 58.5% 88%, 60% 75%, 61.5% 85%, 63% 90%, 64.5% 80%, 66% 88%, 67.5% 82%, 69% 92%, 70.5% 78%, 72% 85%, 73.5% 90%, 75% 83%, 76.5% 88%, 78% 80%, 79.5% 92%, 81% 85%, 82.5% 78%, 84% 90%, 85.5% 82%, 87% 88%, 88.5% 75%, 90% 85%, 91.5% 90%, 93% 80%, 94.5% 88%, 96% 82%, 97.5% 92%, 99% 85%, 100% 100%)'
              }}
            ></div>
          </div>
        </div>
      </section>

      {/* Featured Content Cards */}
      <section className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-6 pt-10 lg:px-[100px] md:mx-auto max-w-[1400px]">
        {/* Left Side: Text Content */}
        <div>
          <h3 className='text-5xl md:text-[4rem] font-bold'>EXPLORE</h3>
          <p className="max-w-[700px] my-5 mx-0 text-lg md:text-[1.5rem] text-[#555] leading-relaxed">
            Explore everything—from wildlife and heritage to gastronomy, wellness, theme-escapes and hidden gems—blended with adventure, spiritual retreats, arts, rural tranquility, beaches, cities and even wedding-worthy locales, all on one discovery hub.
          </p>
        </div>

        {/* Right Side: Scrollable Cards */}
        <div>
          <div
            className="flex overflow-x-auto gap-6 pb-5 scrollbar-hide"
            ref={scrollRef}
            style={{ scrollBehavior: 'smooth' }}
          >
            {loading ? (
              <div className="flex items-center justify-center w-full h-[400px] md:h-[450px]">
                <p className="text-gray-500 text-xl font-medium animate-pulse">Loading Featured Stories...</p>
              </div>
            ) : featuredList.length > 0 ? (
              featuredList.map((item, idx) => (
                <div
                  key={idx}
                  className={`relative flex-shrink-0 flex flex-col justify-end items-start p-6 md:p-8 text-left transition-all duration-300 h-[400px] md:h-[450px] w-[85vw] md:w-[350px] bg-cover bg-center cursor-pointer group`}
                  style={{
                    backgroundImage: item.image ? `url(${item.image})` : 'none',
                    backgroundColor: item.image ? 'transparent' : '#e3e3e3',
                  }}
                  onClick={() => navigate(`/blog/${item.id}`)}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none group-hover:from-black/70 transition-all duration-300" />

                  <h3 className="relative z-10 text-2xl md:text-[1.8rem] text-white mb-2 font-bold uppercase line-clamp-2">
                    {item.title}
                  </h3>
                  <button className="relative z-10 bg-transparent text-white p-0 cursor-pointer font-bold text-xl md:text-[1.5rem] hover:underline">
                    READ
                  </button>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center w-full h-[400px] md:h-[450px]">
                <p className="text-gray-400 text-xl">No featured stories found.</p>
              </div>
            )}
          </div>

          {/* Scroll Buttons */}
          <div className="flex justify-start md:justify-end gap-3 mt-5">
            <button
              onClick={() => scrollRef.current.scrollLeft -= 300}
              className="bg-transparent text-black border-2 border-[#747474] rounded-lg w-10 h-10 cursor-pointer text-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              ←
            </button>
            <button
              onClick={() => scrollRef.current.scrollLeft += 300}
              className="bg-transparent text-black border-2 border-[#747474] rounded-lg w-10 h-10 cursor-pointer text-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* Continental Travel Cards */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '24px',
        paddingTop: '40px',
        margin: "0px 20px"
      }}>
        <Holiday />
      </section>

      {/* Attractions Section */}
      <section style={{
        background: 'black',
        textAlign: 'center',
        marginTop: '80px',
      }} className="lg:px-[180px] lg:py-20 py-10">
        <SeasonalGuide />
      </section>

      {/* Traveler Quote */}
      <section style={{
        margin: '10px auto'

      }} className='py-[10px] lg:p-[100px] '>
        <Holiday2 />
      </section>

      {/* Destination Picks Grid */}
      <section style={{ margin: '10px auto' }} className=' lg:p-[30px]'>
        <Destination />
      </section>

      {/* Additional Travel Categories */}
      <section style={{
        margin: '10px auto'
      }} className='lg:p-[100px]'>
        <TravellersStory />
      </section>

      <section style={{
        margin: '10px auto'
      }} className='lg:p-[100px]'>
        <Adventures />
      </section>

      <section style={{
        padding: '0px 30px',
        margin: '0px auto'
      }}>
        <img src={Stay_touch} alt="" />
      </section>

      <section style={{
        padding: '0px 30px',
        margin: '0px 0px 20px auto'
      }}>
        <TravelBook />
      </section>

    </div>
  );
};

export default Home;

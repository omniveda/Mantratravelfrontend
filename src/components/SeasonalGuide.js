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

const met_wild=[
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
export default function SeasonalGuide() {

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
        <>
            <div className="text-white">
                <h1 className="font-bold text-[3.6rem]" >SEASONAL GUIDE</h1>
                <h3 className="font-semibold text-[1.3rem] mt-[10px]">“Travel Smarter Every Season-- Your Guide to Weare. When & How to Go</h3>
            </div>
            <div className="flex justify-center text-white  mt-[6rem] gap-[32px]">
                <div className="w-[35%] font-bold text-left ">
                    <h2 className='text-[2.2rem]'>DESTINATIONS PICKS</h2>
                    {destinationPicks.map((pick, index) => (
                        <div key={index} className="flex gap-[20px] mt-[30px]">
                            <img src={pick.image} alt={pick.title} className="w-[120px] h-[100px] object-cover cursor-pointer hover:scale-110 transition-all duration-300" />
                            <div className="w-[70%] text-[1.3rem] flex flex-col justify-between text-gray-300">
                                <p className='cursor-pointer'>EXPLORE</p>
                                <p>{pick.title}</p>
                            </div>
                        </div>
                    ))}

                    <p className='underline mt-[40px] text-[1.3rem] text-gray-300 cursor-pointer'>SEE MORE</p>
                </div>
                <div className=" w-[65%] gap-[5%] flex flex-col">
                    <div className='h-[50%] relative group overflow-hidden'>
                        <img
                            src={Sea_tapes}
                            alt="Tapestry"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" /> {/* Dark overlay for readability */}
                        <div className="absolute bottom-6 left-6 text-left">
                            <h2 className="text-[2.5rem] font-bold leading-tight uppercase max-w-[80%] drop-shadow-lg">
                                A TAPESTRY WOVEN WITH COUNTLESS
                            </h2>
                            <button className="mt-4 text-sm font-bold tracking-widest uppercase hover:text-gray-300 transition-colors">
                                Read
                            </button>
                        </div>
                    </div>
                    <div className='h-[50%] flex gap-[5%]'>
                        <div className=' w-[50%] gap-[5%] flex flex-col'>
                            <div className='h-[60%] overflow-hidden'><img src={hit_her} className='hover:scale-110 transition-all duration-300 cursor-pointer'/></div>
                            <div className='h-[40%] bg-white text-left px-[1.2rem]'>
                                <h2 className='text-gray-500 text-[1.3rem] font-bold'>HITORY& HERITEGE</h2>
                                <h2 className='text-black text-[1.3rem] font-bold'>WORLD HERITAGE: OUR RETURN AND THE FUTURE’S TREASURE</h2>
                                <p className='text-black text-[1rem] font-semibold mt-[10px]'>READ</p>
                            </div>
                        </div>
                        <div className='w-[50%] gap-[5%] flex flex-col '>
                            <div className='h-[40%] bg-white text-left px-[1.2rem]'><h2 className='text-gray-500 text-[1.3rem] font-bold'>HITORY& HERITEGE</h2>
                                <h2 className='text-black text-[1.3rem] font-bold'>“KEEP THE WILD WILD!” – CELEBRATES FREEDOM & THE NATURAL STATE OF WILD LIFE.</h2>
                                <p className='text-black text-right text-[1rem] font-semibold mt-[10px]'>READ</p></div>
                            <div className='h-[60%] overflow-hidden'><img src={cell_free} className='hover:scale-110 transition-all duration-300 cursor-pointer'/></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-[10rem] text-white relative">
  {/* Header */}
  <div className="flex justify-between items-center mb-6 px-6">
    <h2 className="text-xl font-semibold uppercase">
      Meet the Wild: Close and Real
    </h2>
    <button className="text-sm tracking-widest hover:opacity-80">
      SEE MORE
    </button>
  </div>

  {/* Left Arrow */}
  <button
    onClick={() => scroll("left")}
    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 p-3 rounded-full"
  >
    ❮
  </button>

  {/* Images Container */}
  <div
    id="carousel"
    className="flex gap-6 overflow-x-scroll scroll-smooth px-16 scrollbar-hide"
  >
    {[...met_wild,...met_wild].map((img, i) => (
      <div
        key={i}
        className="min-w-[240px] h-[360px] rounded-lg overflow-hidden"
      >
        <img
          src={img}
          alt="wildlife"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
    ))}
  </div>

  {/* Right Arrow */}
  <button
    onClick={() => scroll("right")}
    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 p-3 rounded-full"
  >
    ❯
  </button>
</div>

<div className='text-white mt-[10rem] flex gap-[4rem] justify-center'>
    <h2 className='text-[2.5rem] font-bold'>Explore the <span className='text-[4rem]'>World’s</span></h2>
    <h2 className='text-[2.5rem] font-bold'>Most Beautiful <span className='text-[4rem] text-blue-500'>Beaches</span></h2>
</div>

<div className='text-white mt-[10rem] justify-center'>
    <Crousal/>
</div>

        </>
    );
}
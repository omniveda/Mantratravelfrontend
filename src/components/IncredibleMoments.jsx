import { useState } from "react";
import india1 from "../assets/Destinations/india_corner_1.png";
import india2 from "../assets/Destinations/india_corner_2.png";
import india3 from "../assets/Destinations/india_corner_3.png";
import india4 from "../assets/Destinations/india_corner_4.png";
import india5 from "../assets/Destinations/india_corner_5.png";
import nature from "../assets/images/nature1.png"; // Placeholder for Adventure
import western from "../assets/Destinations/western.png"; // Placeholder for Beaches
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const moments = [
    {
        img: india2,
        title: "INDIAN HERITAGE",
        description: "Explore everything—from wildlife and heritage to gastronomy, #wellness, theme-escapes and hidden gems—blended with adventure, spiritual retreats, arts, rural tranquility, beaches, cities and even wedding-worthy locales, all on one discovery hub. one tag line likho",
    },
    {
        img: india1,
        title: "VIBRANT CULTURE",
        description: "Experience the kaleidoscope of traditions, festivals, and daily life that make India truly unique. Discover the stories woven into every street corner and celebration.",
    },
    {
        img: india3,
        title: "CAPTIVATING NATURE",
        description: "Immerse yourself in the breathtaking landscapes, from the snow-capped Himalayas to the lush backwaters of Kerala, offering peace and rejuvenation.",
    },
    {
        img: india5,
        title: "SPIRITUAL JOURNEYS",
        description: "Find your inner peace at ancient temples, ashrams, and sacred sites. A journey that transcends the physical realm and touches the soul.",
    },
    {
        img: india4,
        title: "ANCIENT ARCHITECTURE",
        description: "Marvel at the intricate craftsmanship of centuries-old monuments, palaces, and forts that stand as testaments to India's glorious past.",
    },
];

const interests = [
    { title: "Beaches and islands", img: western },
    { title: "Adventure", img: nature },
    { title: "Arts and culture", img: india1 },
    { title: "Spiritual", img: india5 },
];

export default function IncredibleMoments() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % moments.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + moments.length) % moments.length);
    };

    // Determine the next index for the peek effect if needed, but for now simple carousel
    // The design shows one main card 
    // We can show 2 cards on desktop if needed, or just one large one. 
    // Based on image "TOP FIRST NATIONS EXPERIENCES" shows one and a half.

    // Let's implement a simple visible slider where we show 2 items on large screens

    return (
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 pb-16 space-y-20">
            {/* 1. TOP BANNER: Accessible Travel */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-[500px]">
                {/* Banner Image */}
                <img
                    src={india2}
                    alt="Accessible Travel"
                    className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"></div>

                {/* Content */}
                <div className="absolute bottom-10 left-8 md:bottom-16 md:left-16 max-w-2xl text-left">
                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-4 leading-tight">
                        Accessible travel around India
                    </h2>
                    <p className="text-gray-200 text-sm md:text-lg mb-6 max-w-lg">
                        Travellers of all abilities can enjoy Incredible India. Find resources and tips for your trip down under.
                    </p>
                    <button className="bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-bold py-3 px-8 rounded-md shadow-lg transition-transform hover:scale-105 flex items-center gap-2">
                        LEARN MORE
                        <span className="text-xl">👉</span>
                    </button>
                </div>

                {/* Navigation Arrows (Visual only for banner as it might be static or carousel) */}
                <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
                    <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/40 transition">
                        <FaChevronLeft />
                    </button>
                    <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/40 transition">
                        <FaChevronRight />
                    </button>
                </div>
            </div>


            {/* 2. EXPLORE OTHER INTERESTS */}
            <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#333] mb-8 text-left uppercase tracking-wide">
                    EXPLORE OTHER INTERESTS
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {interests.map((item, idx) => (
                        <div key={idx} className="relative rounded-2xl overflow-hidden h-[300px] md:h-[400px] group cursor-pointer shadow-lg">
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                                <h3 className="text-white text-xl md:text-2xl font-bold font-serif leading-tight">
                                    {item.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/* 3. EXISTING: TOP FIRST NATIONS EXPERIENCES (Incredible Moments) */}
            <div className="relative group pt-10 border-t border-gray-200">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#333] mb-10 text-left uppercase tracking-wide">
                    TOP FIRST NATIONS EXPERIENCES
                </h2>

                {/* Slider Container */}
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-in-out gap-6"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }} // Simple translation for now, or use index math
                    >
                        {/* Instead of shifting by 100%, we might want to shift by item width. 
                 For simplicity in this custom implementation without external library:
                 We will show 1 item on mobile, 2 items on desktop.
             */}
                        <div className="flex gap-6 w-full items-stretch transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                            {moments.map((moment, index) => (
                                <div key={index} className="min-w-full md:min-w-[calc(50%-12px)] flex-shrink-0">
                                    {/* Card */}
                                    <div className="flex flex-col h-full">
                                        {/* Image */}
                                        <div className="rounded-3xl overflow-hidden h-[300px] md:h-[400px] mb-6 relative group/image">
                                            <img
                                                src={moment.img}
                                                alt={moment.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105"
                                            />
                                        </div>

                                        {/* Text Content */}
                                        <div className="text-left pr-4">
                                            <h3 className="text-xl md:text-2xl font-black text-[#222] mb-3 uppercase tracking-wider">
                                                {moment.title}
                                            </h3>
                                            <p className="text-gray-600 text-xs md:text-sm font-medium leading-relaxed max-w-xl">
                                                {moment.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Navigation Button (Right Arrow Only strictly per image? Usually both logic nicely) */}
                {/* Image shows a right arrow circle overlaying the right side or to the right */}

                <button
                    onClick={prevSlide}
                    className="absolute left-0 top-[60%] -translate-y-1/2 bg-white/80 hover:bg-white text-black p-3 rounded-full shadow-lg z-10 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
                    disabled={currentIndex === 0}
                >
                    <FaChevronLeft className="text-xl" />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-[60%] -translate-y-1/2 bg-white/80 hover:bg-white text-black p-3 rounded-full shadow-lg z-10 transition-all opacity-100 md:opacity-0 group-hover:opacity-100"
                >
                    <FaChevronRight className="text-xl" />
                </button>

            </div>
        </div>
    );
}

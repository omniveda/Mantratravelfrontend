import { useState } from "react";
import central from "../assets/Destinations/central.png"; // Sanchi Stupa is in MP (Central)
import india4 from "../assets/Destinations/india_corner_4.png";
import india3 from "../assets/Destinations/india_corner_3.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const reasons = [
    {
        title: "3 UNESCO World Heritage Sites and 15 in the Tentative List",
        description: "Home to 3 UNESCO World Heritage Sites namely Sanchi, Bhimbetka & Khajuraho, Madhya Pradesh attracts tourists from across the globe. 15 more sites from the state have now been included in UNESCO's Tentative List of Heritage Sites, marking a significant step towards global recognition of its rich heritage.",
        img: central,
    },
    {
        title: "Architectural Marvels of the Ancient Era",
        description: "From the intricate carvings of Khajuraho to the majestic forts of Gwalior, witness the grandeur of India's architectural history maintained through centuries.",
        img: india4,
    },
    {
        title: "Breathtaking Natural Landscapes",
        description: "Immerse yourself in the lush greenery of national parks, cascading waterfalls, and serene lakes that offer a perfect escape into nature's lap.",
        img: india3,
    },
];

export default function ExploreReason() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % reasons.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + reasons.length) % reasons.length);
    };

    return (
        <div className="max-w-[1200px] mx-auto px-4 py-16">
            {/* SECTION TITLE */}
            <h2 className="text-center text-3xl md:text-5xl font-serif text-[#4a2c2c] mb-16 uppercase tracking-widest">
                REASONS TO EXPLORE INDIA
            </h2>

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">

                {/* LEFT: IMAGE WITH BRUSH EFFECT */}
                {/* Navigation Left Arrow (Mobile: adjust position, Desktop: absolute left or relative) */}
                <div className="relative w-full md:w-1/2 flex items-center justify-center">
                    {/* Desktop Left Nav Button */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 md:-left-12 z-10 w-12 h-12 flex items-center justify-center text-[#ddd] hover:text-[#d32f2f] transition-colors text-4xl"
                    >
                        <FaChevronLeft />
                    </button>

                    {/* Image Container with Mask/Clipping */}
                    {/* Simulating the brush stroke edge with a CSS mask or custom shape if strictly needed. 
                 For now using a jagged clip-path or simple styling to mimic the feel. 
                 The screenshot shows a "torn paper" or "brush" edge on the right side of the image.
             */}
                    <div className="relative w-full max-w-[500px] aspect-[4/3] group">
                        {/* Paint Brush Effect Wrapper */}
                        <div
                            className="w-full h-full overflow-hidden"
                            style={{
                                // Simple jagged edge clip-path approximation
                                clipPath: "polygon(0 0, 100% 5%, 95% 15%, 100% 25%, 98% 35%, 100% 45%, 96% 55%, 100% 65%, 98% 75%, 100% 85%, 95% 95%, 100% 100%, 0 100%)",
                                WebkitClipPath: "polygon(0 0, 100% 5%, 95% 15%, 100% 25%, 98% 35%, 100% 45%, 96% 55%, 100% 65%, 98% 75%, 100% 85%, 95% 95%, 100% 100%, 0 100%)"
                            }}
                        >
                            <img
                                src={reasons[currentIndex].img}
                                alt="Reason"
                                className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform group-hover:scale-110"
                            />
                        </div>
                        {/* Decorative background splatter (optional/abstract) */}
                        <div className="absolute -z-10 top-4 -left-4 w-full h-full bg-blue-100/50 rounded-full blur-3xl transform scale-110"></div>
                    </div>
                </div>

                {/* RIGHT: TEXT CONTENT */}
                <div className="w-full md:w-1/2 flex items-center gap-6">
                    <div className="flex-1 text-left">
                        <h3 className="text-2xl md:text-3xl font-serif text-[#4a2c2c] mb-6 leading-tight">
                            {reasons[currentIndex].title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-6">
                            {reasons[currentIndex].description}
                        </p>
                    </div>

                    {/* Right Nav Button Box */}
                    <button
                        onClick={nextSlide}
                        className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-[#d32f2f] hover:bg-[#b71c1c] text-white flex items-center justify-center rounded-sm shadow-lg transition-transform hover:scale-105"
                    >
                        <FaChevronRight className="text-lg md:text-xl" />
                    </button>
                </div>

            </div>
        </div>
    );
}
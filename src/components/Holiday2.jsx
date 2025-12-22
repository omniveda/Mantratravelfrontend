import { useRef } from "react";
import Plan_trip1 from "../assets/Home_page/Plan_trip1.png";
import Plan_trip2 from "../assets/Home_page/Plan_trip2.png";
import Plan_trip3 from "../assets/Home_page/Plan_trip3.png";
import Art_cult1 from "../assets/Home_page/Art_cult1.png";
import Art_cult2 from "../assets/Home_page/Art_cult2.png";
import Art_cult3 from "../assets/Home_page/Art_cult3.png";

const cards = [
    { img: Plan_trip1 },
    { img: Plan_trip2 },
    { img: Plan_trip3 },
];

const cards2 = [
    { img: Art_cult1 },
    { img: Art_cult2 },
    { img: Art_cult3 },
];


export default function Holiday2() {
    const sliderRef = useRef(null);

    const scroll = (dir) => {
        if (!sliderRef.current) return;

        sliderRef.current.scrollBy({
            left: dir === "right" ? 320 : -320,
            behavior: "smooth",
        });
    };

    return (
        <div className="w-full bg-white">
            <div className="max-w-9xl mx-auto flex gap-16 px-8">

                {/* LEFT CONTENT */}
                <div className="w-[35%] sticky top-24 h-fit">
                    <p className="text-green-600 font-script text-center text-5xl mb-2" style={{ fontFamily: "'Brush Script MT', cursive" }}>
                        it's my holiday
                    </p>

                    <h2 className="text-6xl font-semibold text-center mb-6" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
                        PLAN YOUR <br /> TRIP
                    </h2>

                    <p className="text-xl text-gray-900 ">
                        Plan your perfect Indian getaway with expert guides,
                        routes, tips, and travel hacks — all in one place.
                    </p>
                </div>

                {/* RIGHT SLIDER */}
                <div className="relative w-[65%]">
                    {/* Arrow */}
                    <button
                        onClick={() => scroll("right")}
                        className="absolute right-0 top-1/3 z-10 bg-white shadow-lg p-3 rounded-full"
                    >
                        ❯
                    </button>

                    <div
                        ref={sliderRef}
                        className="flex gap-8 overflow-x-scroll scrollbar-hide pb-10"
                    >
                        {cards.map((item, i) => (
                            <div key={i} className="min-w-[300px]">
                                <img
                                    src={item.img}
                                    className="w-full h-[420px] object-cover rounded-lg hover:scale-110 transition-all duration-300 cursor-pointer " 
                                />

                                <p className="mt-6 text-xl font-serif">
                                    Looking for more than just a job?
                                    <br />
                                    Begin your adventure with us.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <div className="max-w-9xl mx-auto flex gap-16 px-8">

                {/* LEFT CONTENT */}
                <div className="w-[35%] sticky top-24 h-fit">
                    <p className="text-pink-600 font-script text-center text-5xl mb-2" style={{ fontFamily: "'Brush Script MT', cursive" }}>
                        it's my holiday
                    </p>

                    <h2 className="text-6xl font-semibold text-center mb-6" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
                        ART & <br /> CULTURE
                    </h2>

                    <p className="text-xl font-[10px] text-black ">
                        Immerse yourself in the world’s rich art and culture —
                        where heritage breathes, and creativity knows no bounds.
                    </p>
                </div>

                {/* RIGHT SLIDER */}
                <div className="relative w-[65%]">
                    {/* Arrow */}
                    <button
                        onClick={() => scroll("right")}
                        className="absolute right-0 top-1/3 z-10 bg-white shadow-lg p-3 rounded-full"
                    >
                        ❯
                    </button>

                    <div
                        ref={sliderRef}
                        className="flex gap-8 overflow-x-scroll scrollbar-hide pb-10"
                    >
                        {cards2.map((item, i) => (
                            <div key={i} className="min-w-[300px]">
                                <img
                                    src={item.img}
                                    className="w-full h-[420px] object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                                />

                                <p className="mt-6 text-xl font-serif">
                                    Looking for more than just a job?
                                    <br />
                                    Begin your adventure with us.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

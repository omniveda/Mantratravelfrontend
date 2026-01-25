import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    const [planTripBlogs, setPlanTripBlogs] = useState([]);
    const [artCultureBlogs, setArtCultureBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                // Fetch Plan Your Trip blogs
                const planTripRes = await axios.get('http://localhost:4000/api/blogs?tag=plantrip');
                if (planTripRes.data && planTripRes.data.length > 0) {
                    setPlanTripBlogs(planTripRes.data.map(blog => ({
                        img: blog.image,
                        title: blog.heading,
                        id: blog._id
                    })));
                } else {
                    setPlanTripBlogs(cards);
                }

                // Fetch Art & Culture blogs
                const artCultureRes = await axios.get('http://localhost:4000/api/blogs?tag=artculture');
                if (artCultureRes.data && artCultureRes.data.length > 0) {
                    setArtCultureBlogs(artCultureRes.data.map(blog => ({
                        img: blog.image,
                        title: blog.heading,
                        id: blog._id
                    })));
                } else {
                    setArtCultureBlogs(cards2);
                }
            } catch (err) {
                console.error("Error fetching blogs in Holiday2.jsx:", err);
                setPlanTripBlogs(cards);
                setArtCultureBlogs(cards2);
            }
        };
        fetchBlogs();
    }, []);


    const scroll = (dir) => {
        if (!sliderRef.current) return;

        sliderRef.current.scrollBy({
            left: dir === "right" ? 320 : -320,
            behavior: "smooth",
        });
    };

    return (
        <div className="w-full flex flex-col gap-[100px] bg-white">
            <div className="max-w-9xl mx-auto lg:flex gap-16 px-8">

                {/* LEFT CONTENT */}
                <div className="lg:w-[35%] lg:sticky top-24 h-fit">
                    <p className="text-green-600 font-script text-center text-5xl mb-2" style={{ fontFamily: "'Brush Script MT', cursive" }}>
                        it's my holiday
                    </p>

                    <h2 className="text-2xl lg:text-6xl font-semibold text-center mb-6" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
                        PLAN YOUR <br /> TRIP
                    </h2>

                    <p className="text-lg lg:text-2xl text-gray-900 ">
                        Plan your perfect Indian getaway with expert guides,
                        routes, tips, and travel hacks — all in one place.
                    </p>
                </div>

                {/* RIGHT SLIDER */}
                <div className="relative lg:w-[65%]">
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
                        {planTripBlogs.map((item, i) => (
                            <div
                                key={i}
                                className="min-w-[300px] cursor-pointer group"
                                onClick={() => item.id && navigate(`/blog/${item.id}`)}
                            >
                                <img
                                    src={item.img}
                                    className="w-full h-[420px] object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                                />

                                <p className="mt-6 text-xl font-serif leading-tight">
                                    {item.title || (
                                        <>
                                            Looking for more than just a job?
                                            <br />
                                            Begin your adventure with us.
                                        </>
                                    )}
                                </p>

                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <div className="max-w-9xl mx-auto lg:flex gap-16 px-8">

                {/* LEFT CONTENT */}
                <div className="lg:w-[35%] lg:sticky lg:top-24 h-fit">
                    <p className="text-pink-600 font-script text-center text-5xl mb-2" style={{ fontFamily: "'Brush Script MT', cursive" }}>
                        it's my holiday
                    </p>

                    <h2 className="text-2xl lg:text-6xl font-semibold text-center mb-6" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
                        ART & <br /> CULTURE
                    </h2>

                    <p className="text-lg lg:text-2xl text-black ">
                        Immerse yourself in the world’s rich art and culture —
                        where heritage breathes, and creativity knows no bounds.
                    </p>
                </div>

                {/* RIGHT SLIDER */}
                <div className="relative lg:w-[65%]">
                    {/* Arrow */}
                    <button
                        onClick={() => scroll("right")}
                        className="absolute lg:right-0 lg:top-1/3 z-10 bg-white shadow-lg p-3 rounded-full"
                    >
                        ❯
                    </button>

                    <div
                        ref={sliderRef}
                        className="flex gap-8 overflow-x-scroll scrollbar-hide pb-10"
                    >
                        {artCultureBlogs.map((item, i) => (
                            <div
                                key={i}
                                className="min-w-[300px] cursor-pointer group"
                                onClick={() => item.id && navigate(`/blog/${item.id}`)}
                            >
                                <img
                                    src={item.img}
                                    className="w-full h-[420px] object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                                />

                                <p className="mt-6 text-xl font-serif leading-tight">
                                    {(
                                        <>
                                            Looking for more than just a job?
                                            <br />
                                            Begin your adventure with us.
                                        </>
                                    )}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </div>
    );
}


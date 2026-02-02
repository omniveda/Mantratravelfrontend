import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaInstagram } from "react-icons/fa";

// Fallback assets
import Trav_story1_def from "../assets/Home_page/Trav_stor1.png";
import Trav_story2_def from "../assets/Home_page/Trav_stor2.png";
import Trav_story3_def from "../assets/Home_page/Trav_stor3.png";
import Trav_story4_def from "../assets/Home_page/Trav_stor4.png";
import Trav_story5_def from "../assets/Home_page/Trav_stor5.png";

export default function TravellersStory({ countryName }) {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStories = async () => {
            setLoading(true);
            try {
                const countryParam = countryName ? `?country=${encodeURIComponent(countryName)}&fallback=General` : "?country=India&fallback=General";
                const res = await axios.get(`http://localhost:4000/api/instagram${countryParam}`);
                let data = res.data;

                if (data && data.length > 0) {
                    // Shuffle logic
                    const shuffled = [...data].sort(() => 0.5 - Math.random());
                    setStories(shuffled.slice(0, 5));
                }
            } catch (err) {
                console.error("Error fetching traveller stories:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStories();
    }, [countryName]);

    // Fallback data if no API data or loading
    const defaultStories = [
        { img: Trav_story1_def, link: "#" },
        { img: Trav_story2_def, link: "#" },
        { img: Trav_story3_def, link: "#" },
        { img: Trav_story4_def, link: "#" },
        { img: Trav_story5_def, link: "#" },
    ];

    // Priority: API Stories > Default Fallbacks
    const displayStories = stories.length > 0 ? stories : defaultStories;

    // Separate main story from the rest
    const mainStory = displayStories[0];
    const gridStories = displayStories.slice(1);

    if (loading && stories.length === 0) {
        return (
            <div className="max-w-8xl mx-auto py-10 lg:py-24 text-center">
                <div className="animate-pulse text-blue-800 font-bold">Loading Stories...</div>
            </div>
        );
    }

    return (
        <div className="max-w-8xl mx-auto py-10 lg:py-24">
            {/* Section Title */}
            <h2 className="text-blue-800 text-center font-bold text-3xl mb-12 uppercase tracking-widest">
                TRAVELLER'S STORIES
            </h2>

            {/* Grid - Conditional Rendering based on content length */}
            <div className={`grid px-6 gap-8 ${gridStories.length > 0 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2' : 'grid-cols-1 justify-items-center'}`}>

                {/* LEFT BIG CARD (Visible if at least 1 story exists) */}
                {mainStory && (
                    <div
                        className={`rounded-3xl overflow-hidden relative group cursor-pointer shadow-xl ${gridStories.length === 0 ? 'w-full max-w-2xl h-[400px] md:h-[600px]' : 'h-[300px] md:h-auto'}`}
                        onClick={() => mainStory.link && window.open(mainStory.link, '_blank')}
                    >
                        <img
                            src={mainStory.img || mainStory.image}
                            alt="main story"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300" />
                        <div className="absolute bottom-6 right-6 p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-2xl">
                            <FaInstagram className="text-white text-3xl lg:text-5xl" />
                        </div>
                    </div>
                )}

                {/* RIGHT GRID (Visible if more than 1 story exists) */}
                {gridStories.length > 0 && (
                    <div className="grid grid-cols-2 gap-6 content-start">
                        {gridStories.map((story, index) => (
                            <div
                                key={index}
                                className="aspect-square rounded-3xl overflow-hidden relative group cursor-pointer shadow-lg"
                                onClick={() => story.link && window.open(story.link, '_blank')}
                            >
                                <img
                                    src={story.img || story.image}
                                    alt={`story ${index}`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300" />
                                <div className="absolute bottom-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/30">
                                    <FaInstagram className="text-white text-xl lg:text-3xl" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

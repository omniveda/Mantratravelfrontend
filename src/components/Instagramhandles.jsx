import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaInstagram } from 'react-icons/fa';

// Importing existing assets to populate the grid
import india1 from "../assets/Destinations/india_corner_1.png";
import india2 from "../assets/Destinations/india_corner_2.png";
import india3 from "../assets/Destinations/india_corner_3.png";
import india4 from "../assets/Destinations/india_corner_4.png";
import india5 from "../assets/Destinations/india_corner_5.png";
import eastern from "../assets/Destinations/eastern.png";
import western from "../assets/Destinations/western.png";
import nature from "../assets/images/nature1.png";
import hero1 from '../assets/Home_page/hero1.png';
import hero2 from '../assets/Home_page/hero2.png';
import indiaMap from "../assets/Destinations/India.png";
import central from "../assets/Destinations/central.png"
import northern from "../assets/Destinations/northern.png"
import northeast from "../assets/Destinations/north-east.png"
import south from "../assets/Destinations/south.png"

export default function Instagramhandles({ countryName }) {
    const [photos, setPhotos] = useState([]);
    const [states, setStates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInstagramData = async () => {
            setLoading(true);
            try {
                const countryParam = countryName ? `?country=${encodeURIComponent(countryName)}&fallback=General` : "?country=India&fallback=General";

                // Fetch from specific instagram API
                const res = await axios.get(`https://mantratravelbackend.onrender.com/api/instagram${countryParam}`);
                const data = res.data;

                if (data && data.length > 0) {
                    const classNames = [
                        "md:col-span-2 md:row-span-2", "md:col-span-1 md:row-span-1", "md:col-span-1 md:row-span-1",
                        "md:col-span-1 md:row-span-1", "md:col-span-1 md:row-span-1", "md:col-span-1 md:row-span-1",
                        "md:col-span-1 md:row-span-1", "md:col-span-2 md:row-span-2", "md:col-span-1 md:row-span-1",
                        "md:col-span-1 md:row-span-1"
                    ];

                    const mappedPhotos = data.slice(0, 10).map((item, index) => ({
                        id: item._id,
                        img: item.image,
                        alt: item.name,
                        link: item.link,
                        className: classNames[index] || "md:col-span-1 md:row-span-1"
                    }));
                    setPhotos(mappedPhotos);
                }

                // Keep States fetching from blogs as it relates to geographical sections
                const statesRes = await axios.get(`https://mantratravelbackend.onrender.com/api/blogs?category=Destination&country=${encodeURIComponent(countryName || 'India')}&section=States&fallback=General`);
                const mappedStates = statesRes.data.map(item => ({
                    title: item.heading,
                    img: item.image,
                    link: item.externalLink
                }));

                if (mappedStates.length > 0) {
                    setStates(mappedStates);
                }

            } catch (err) {
                console.error("Error fetching instagram data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchInstagramData();
    }, [countryName]);

    // Fallbacks if no dynamic data
    const photoFallbacks = [
        { id: 1, img: india1, alt: "Gateway of India", className: "md:col-span-2 md:row-span-2" },
        { id: 2, img: hero1, alt: "Mountain Night", className: "md:col-span-1 md:row-span-1" },
        { id: 3, img: india5, alt: "Temple Night", className: "md:col-span-1 md:row-span-1" },
        { id: 4, img: india2, alt: "Culture Art", className: "md:col-span-1 md:row-span-1" },
        { id: 5, img: hero2, alt: "City Traffic", className: "md:col-span-1 md:row-span-1" },
        { id: 6, img: eastern, alt: "Camels", className: "md:col-span-1 md:row-span-1" },
        { id: 7, img: india3, alt: "Boats", className: "md:col-span-1 md:row-span-1" },
        { id: 8, img: nature, alt: "Tiger", className: "md:col-span-2 md:row-span-2" },
        { id: 9, img: western, alt: "Houseboat", className: "md:col-span-1 md:row-span-1" },
        { id: 10, img: india4, alt: "Taj Detail", className: "md:col-span-1 md:row-span-1" },
    ];

    const stateFallbacks = [
        { title: "Artful Andhra", img: india1 },
        { title: "Auburn Arunachal", img: northeast },
        { title: "Aromatic Assam", img: india3 },
        { title: "Benedictive Bihar", img: india5 },
        { title: "Cryptic Chhattisgarh", img: nature },
        { title: "Glorious Goa", img: western },
        { title: "Grandiose Gujarat", img: india2 },
        { title: "Heroic Haryana", img: india4 },
        { title: "Heavenly Himachal", img: northern },
        { title: "Kaleidoscopic Karnataka", img: south },
        { title: "Karmic Kerala", img: eastern },
        { title: "Mystical Madhya", img: central },
    ];

    const displayPhotos = photos.length > 0 ? photos : photoFallbacks;
    const displayStates = states.length > 0 ? states : stateFallbacks;
    return (
        <div className="w-full">
            {/* 1. WALL OF FRAME SECTION */}
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
                {/* HEADER */}
                <div className="text-center mb-12">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
                        <h2 className="text-6xl md:text-8xl font-serif font-black text-[#009e4f] tracking-tighter">
                            @INDIA
                        </h2>
                        <span
                            className="text-4xl md:text-6xl text-black mt-2 md:mt-4"
                            style={{ fontFamily: "'Brush Script MT', cursive" }}
                        >
                            Wall of Frame
                        </span>
                    </div>
                </div>

                {/* MASONRY GRID */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px] mb-20">
                    {displayPhotos.map((photo) => (
                        <div
                            key={photo.id}
                            className={`relative group rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 ${photo.className}`}
                        >
                            {/* Image */}
                            <img
                                src={photo.img}
                                alt={photo.alt}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Overlay & Icon */}
                            <div
                                className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-end justify-end p-4"
                                onClick={(e) => {
                                    if (photo.link) {
                                        e.stopPropagation();
                                        window.open(photo.link, '_blank');
                                    }
                                }}
                            >
                                <FaInstagram className="text-white text-2xl md:text-3xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. EXPLORE INDIA MAP SECTION */}
            <section className="bg-[#fdfbf7] pb-20">
                {/* Header with Map Background */}
                <div className="relative w-full h-[400px] md:h-[600px] bg-[#d1c7b7] mb-12 overflow-hidden">
                    <img
                        src={indiaMap}
                        alt="India Map"
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute top-10 right-4 md:right-20 text-right">
                        <h2
                            className="text-5xl md:text-8xl font-serif text-white drop-shadow-lg"
                            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
                        >
                            <span style={{ fontFamily: "'Brush Script MT', cursive" }} className="block text-4xl md:text-7xl mb-2 text-white">
                                EXPLORE
                            </span>
                            <span className="font-black text-[#ff671f] tracking-widest text-6xl md:text-9xl block -mt-4 uppercase">
                                {countryName || 'INDIA'}
                            </span>
                        </h2>
                    </div>
                </div>

                {/* States Grid */}
                <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {displayStates.map((state, index) => (
                            <div
                                key={index}
                                className="relative aspect-square rounded-3xl overflow-hidden group cursor-pointer shadow-xl"
                                onClick={() => {
                                    if (state.link) {
                                        window.open(state.link, '_blank');
                                    }
                                }}
                            >
                                <img
                                    src={state.img}
                                    alt={state.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-6">
                                    <h3 className="text-white font-bold text-lg md:text-xl drop-shadow-md">
                                        {state.title}
                                    </h3>
                                    <FaInstagram className="text-white text-2xl" />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </div>
    );
}
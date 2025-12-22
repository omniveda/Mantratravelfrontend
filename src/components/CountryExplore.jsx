import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCountryData } from '../data/countryData';

export default function CountryExplore({ countryName, onBack }) {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("EXPLORER");

    // Using uppercase for display
    const displayName = countryName ? countryName.toUpperCase() : "COUNTRY";

    // Get shared data
    const countryData = getCountryData(countryName);
    const currentItems = countryData[activeTab] || [];

    const handleItemClick = (itemTitle) => {
        // Generate tag: country + tab + item (e.g., "india" + "explorer" + "wildlife" -> "indiaexplorerwildlife")
        // Remove spaces and convert to lowercase
        const cleanCountry = (countryName || 'india').toLowerCase().replace(/\s+/g, '');
        const cleanTab = activeTab.toLowerCase().replace(/\s+/g, '').replace('&', ''); // handle "art & culture" -> "artculture"
        const cleanItem = itemTitle.toLowerCase().replace(/\s+/g, '');

        const tag = `${cleanCountry}${cleanTab}${cleanItem}`;

        // Navigate to blog page with the generated tag AND category for dynamic nav
        navigate(`/blog?tag=${encodeURIComponent(tag)}&topic=${encodeURIComponent(itemTitle)}&country=${encodeURIComponent(countryName)}&category=${encodeURIComponent(activeTab)}`);
    };

    return (
        <section className="bg-gray-100 py-10 px-6 text-center min-h-screen">
            {/* Back Button */}
            <div className="text-left mb-4">
                <button onClick={onBack} className="text-gray-600 hover:text-black flex items-center gap-2">
                    ← Back to World Corner
                </button>
            </div>

            {/* HEADING */}
            <h1 className="text-[50px] md:text-[80px] font-extrabold tracking-wide text-black mb-8 uppercase"
                style={{ fontFamily: "'Times New Roman', serif" }}>
                {displayName} CALLING
            </h1>

            {/* NAV LINKS */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12 border-b border-gray-300 pb-4">
                {Object.keys(countryData).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`text-sm md:text-base font-bold uppercase tracking-widest px-2 py-2 transition-all 
                            ${activeTab === tab
                                ? "text-gray-900 border-b-2 border-gray-900"
                                : "text-gray-400 hover:text-gray-600"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
                {currentItems.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleItemClick(item.title)}
                        className="flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition bg-white group cursor-pointer"
                    >
                        <div className="h-40 overflow-hidden relative">
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                        <div className="p-4 bg-white text-center flex items-center justify-center h-16">
                            <h3 className="text-sky-500 font-bold uppercase text-sm tracking-wider group-hover:text-sky-700">
                                {item.title}
                            </h3>
                        </div>
                    </div>
                ))}

                {/* View More Card */}
                {/* Fixed Route */}
                <div onClick={() => navigate('/blog')} className="flex flex-col items-center justify-center rounded-xl overflow-hidden shadow-sm bg-white p-6 cursor-pointer hover:shadow-md h-full min-h-[224px] border-2 border-dashed border-gray-200">
                    <div className="flex items-center gap-2 text-blue-900 font-bold text-lg">
                        <span>View</span>
                        <span>More</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}

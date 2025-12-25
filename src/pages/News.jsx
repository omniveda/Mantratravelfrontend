import React, { useState, useEffect } from 'react';
import axios from 'axios';
import voyabytelogo from "../assets/logo/1.png";

// Icons (Simple SVGs)
const ThumbsUp = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-400">
        <path d="M7 10v12" /><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
);

const Share = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-400">
        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
);

export default function News() {
    const [newsData, setNewsData] = useState({
        topStory: null,
        subStories: [],
        headlines: [],
        trending: []
    });
    const [loading, setLoading] = useState(true);
    const [activeLifeLineFilter, setActiveLifeLineFilter] = useState("All");
    const [activePoliticsFilter, setActivePoliticsFilter] = useState("All");
    const [activeBusinessFilter, setActiveBusinessFilter] = useState("All");
    const [activeReligionFilter, setActiveReligionFilter] = useState("All");
    const [activeAstrologyFilter, setActiveAstrologyFilter] = useState("All");
    const [activeEntertainmentFilter, setActiveEntertainmentFilter] = useState("All");
    const [activeStyleFilter, setActiveStyleFilter] = useState("All");

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await axios.get("/api/news");
                const allNews = res.data;

                // Segregate news based on category or fallback logic
                const topStories = allNews.filter(n => n.category === "Top Story");
                const headlines = allNews.filter(n => n.category === "Headline");
                const trending = allNews.filter(n => n.category === "Trending");
                const general = allNews.filter(n => !n.category || n.category === "General");

                // Featured Story (Top 1 from Top Story or General)
                const featured = topStories.length > 0 ? topStories[0] : (general[0] || null);

                // Sub Stories (Next 3 from Top Story or General)
                let subs = [];
                if (topStories.length > 1) subs = subs.concat(topStories.slice(2));
                if (subs.length < 3) subs = subs.concat(general.slice(featured ? 1 : 0)).slice(0, 3 - subs.length); // Fill up to 3

                // Headlines (from Headline category or fallbacks)
                let heads = headlines;
                if (heads.length < 5) heads = heads.concat(general.slice(subs.length + 1)).slice(0, 5); // Fallback

                // Region Filtering
                const worldNews = allNews.filter(n => n.tags && (n.tags.includes("World") || n.tags.includes("The Americas") || n.tags.includes("Asia") || n.tags.includes("Europe")));
                const americas = allNews.filter(n => n.tags && n.tags.includes("The Americas"));
                const asia = allNews.filter(n => n.tags && n.tags.includes("Asia"));
                const africa = allNews.filter(n => n.tags && n.tags.includes("Africa"));
                const europe = allNews.filter(n => n.tags && n.tags.includes("Europe"));

                // New Sections Filtering
                const lifeline = allNews.filter(n => n.tags && (n.tags.includes("LifeLine+") || n.tags.includes("Food") || n.tags.includes("Fitness") || n.tags.includes("Mind") || n.tags.includes("Body")));
                const politics = allNews.filter(n => n.tags && (n.tags.includes("Politics") || n.tags.includes("Elections") || n.tags.includes("Democracy")));
                const business = allNews.filter(n => n.tags && (n.tags.includes("Business") || n.tags.includes("Economy") || n.tags.includes("Tech")));
                const religion = allNews.filter(n => n.tags && (n.tags.includes("Religion") || n.tags.includes("Spirituality")));
                const astrology = allNews.filter(n => n.tags && n.tags.includes("Astrology"));
                const india = allNews.filter(n => n.tags && n.tags.includes("India"));
                const entertainaiment = allNews.filter(n => n.tags && n.tags.includes("Entertainment"));
                const theStyle = allNews.filter(n => n.tags && (
                    n.tags.includes("The Style") || n.tags.includes("style") || n.tags.includes("styletopheadline") ||
                    n.tags.includes("Fashion") || n.tags.includes("fashion") || n.tags.includes("fashiontopheadline") || n.tags.includes("fashiontrending") ||
                    n.tags.includes("Power") || n.tags.includes("power") || n.tags.includes("powertopheadline") || n.tags.includes("powertrending") ||
                    n.tags.includes("Trends") || n.tags.includes("trends") || n.tags.includes("trendstopheadline") || n.tags.includes("trendstrending")
                ));

                setNewsData({
                    topStory: featured,
                    subStories: subs,
                    headlines: heads,
                    trending: trending,
                    worldNews: worldNews, // General pool for left col
                    "The Americas": americas,
                    "Asia": asia,
                    "Europe": europe,
                    "Africa": africa,
                    "LifeLine+": lifeline,
                    politics: politics,
                    business: business,
                    religion: religion,
                    astrology: astrology,
                    india: india,
                    entertainaiment: entertainaiment,
                    theStyle: theStyle,
                    sports: allNews.filter(n => n.tags && n.tags.includes("Sports")),
                    technology: allNews.filter(n => n.tags && (n.tags.includes("Technology") || n.tags.includes("Tech"))),
                    science: allNews.filter(n => n.tags && n.tags.includes("Science"))
                });
            } catch (err) {
                console.error("Error fetching news:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    // Placeholder data for design stability if backend is empty
    const placeholderImg = "https://images.unsplash.com/photo-1504711434969-e33886168f5c";

    return (
        <div className="bg-[black] min-h-screen text-white font-sans selection:bg-red-600 selection:text-white pb-20">
            {/* ... Header and Nav (Static for now) ... */}
            <div className="bg-[black]  border-b border-gray-800">
                <div className="max-w-7xl mx-auto">
                    {/* LOGO AREA */}
                    <div className="flex flex-col items-center justify-center ">
                        <div className="flex items-center gap-1">
                            {/* Graphic imitation */}
                            <div className="relative h-[14rem] w-full mr-2 hidden md:block">
                                <img src={voyabytelogo} alt="voyabyte" className="object-cover h-full w-full rounded-sm opacity-80" />
                            </div>
                        </div>
                    </div>

                    {/* NAVIGATION */}
                    <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-gray-400 text-sm md:text-base border-t border-gray-800 pt-4 font-medium px-4">
                        <a href="#" className="hover:text-white transition">News</a> <span className="text-gray-700">|</span>
                        <a href="#" className="hover:text-white transition flex items-center gap-1">
                            <span className="bg-[#D10000] text-white rounded-full w-5 h-5 flex items-center justify-center font-bold text-xs font-serif">VB</span>
                            Travel
                        </a> <span className="text-gray-700">|</span>
                        <a href="#" className="hover:text-white transition">World</a> <span className="text-gray-700">|</span>
                        <a href="#" className="hover:text-white transition">Politics</a> <span className="text-gray-700">|</span>
                        <a href="#" className="hover:text-white transition">India</a> <span className="text-gray-700">|</span>
                        <a href="#" className="hover:text-white transition">Business</a> <span className="text-gray-700">|</span>
                        <a href="#" className="hover:text-white transition text-red-500">LifeLine+</a> <span className="text-gray-700">|</span>
                        <a href="#" className="hover:text-white transition">Entertainment</a> <span className="text-gray-700">|</span>
                        <a href="#" className="hover:text-white transition">Style</a> <span className="text-gray-700">|</span>
                        <a href="#" className="hover:text-white transition">Shopping</a> <span className="text-gray-700">|</span>
                        <a href="#" className="hover:text-white transition">Religion <span className="text-red-600">vs</span> Spirituality</a>
                    </nav>

                    {/* TRENDING BAR */}
                    <div className="mt-4 bg-[#1a1a1a] py-2 px-4 rounded flex flex-wrap items-center gap-4 text-sm mx-4">
                        <span className="text-[#D10000] font-bold uppercase tracking-wide">Trending</span>
                        <div className="flex gap-6 text-gray-300 overflow-x-auto whitespace-nowrap scrollbar-hide">
                            {newsData.trending.length > 0 ? (
                                newsData.trending.map((t, i) => (
                                    <span key={i} className="hover:text-white cursor-pointer">{t.heading}</span>
                                ))
                            ) : (
                                <>
                                    <span className="hover:text-white cursor-pointer">MAGA supporters</span>
                                    <span className="hover:text-white cursor-pointer">Anti-inflammatory diets</span>
                                    <span className="hover:text-white cursor-pointer">Terror plot halted</span>
                                    <span className="hover:text-white cursor-pointer">Nicki Minaj</span>
                                    <span className="hover:text-white cursor-pointer">Top 25 recipes</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT GRID */}
            <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT COLUMN: TOP STORY (Span 2) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Header */}
                    <div className="flex items-center gap-2 border-b border-gray-700 pb-2 mb-4">
                        <div className="bg-[#D10000] rounded-full w-8 h-8 flex items-center justify-center font-serif font-bold text-white text-sm">VB</div>
                        <h2 className="text-2xl font-bold text-teal-400">Top Story</h2>
                    </div>

                    {/* Featured Article */}
                    {loading ? <div className="text-gray-500">Loading top story...</div> : newsData.topStory ? (
                        <div className="bg-[#1c1c1c] rounded-lg overflow-hidden group hover:shadow-xl hover:shadow-red-900/10 transition duration-300">
                            <div className="grid md:grid-cols-2">
                                <div className="h-64 md:h-auto overflow-hidden">
                                    <img src={newsData.topStory.image || placeholderImg} alt={newsData.topStory.heading} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                                </div>
                                <div className="p-6 flex flex-col justify-center">
                                    <h3 className="text-2xl font-bold mb-3 leading-tight text-gray-100">
                                        {newsData.topStory.heading}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                        {newsData.topStory.description}
                                    </p>
                                    <div className="flex items-center justify-between mt-auto">
                                        <button className="bg-gradient-to-r from-teal-700 to-teal-500 text-white text-[10px] font-bold uppercase px-3 py-1 rounded hover:opacity-90 tracking-wider">
                                            Read More
                                        </button>
                                        <div className="flex gap-3">
                                            <ThumbsUp />
                                            <Share />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-[#1c1c1c] p-10 text-center text-gray-500">No top story available.</div>
                    )}

                    {/* Sub Stories Grid */}
                    <div className="grid md:grid-cols-3 gap-4">
                        {loading ? <div className="text-gray-500">Loading stories...</div> : newsData.subStories.map((item, i) => (
                            <div key={i} className="bg-[#1c1c1c] rounded-lg overflow-hidden flex flex-col group h-full">
                                <div className="h-40 overflow-hidden">
                                    <img src={item.image || placeholderImg} alt={item.heading} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                                </div>
                                <div className="p-4 flex flex-col flex-1">
                                    <h4 className="font-bold text-sm mb-2 text-gray-200 line-clamp-3">
                                        {item.heading}
                                    </h4>
                                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-3">By {item.author || "VOYABYTE TEAM"}</p>
                                    <div className="mt-auto flex justify-between items-center">
                                        <button className="bg-gradient-to-r from-teal-700 to-teal-500 text-white text-[9px] font-bold uppercase px-2 py-1 rounded">
                                            Read More
                                        </button>
                                        <div className="flex gap-2">
                                            <ThumbsUp />
                                            <Share />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT COLUMN: TOP HEADLINES (Span 1) */}
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-2 border-b border-gray-700 pb-2 mb-4">
                        <div className="bg-[#D10000] rounded-full w-8 h-8 flex items-center justify-center font-serif font-bold text-white text-sm">VB</div>
                        <h2 className="text-2xl font-bold text-teal-400">Top Headlines</h2>
                    </div>

                    <div className="space-y-4">
                        {loading ? <div className="text-gray-500">Loading headlines...</div> : newsData.headlines.map((item, i) => (
                            <div key={i} className="bg-[#1c1c1c] p-4 rounded-lg flex gap-4 group hover:bg-[#252525] transition">
                                <div className="flex-1 flex flex-col justify-between">
                                    <h4 className="font-bold text-sm text-gray-200 group-hover:text-white transition line-clamp-2">
                                        {item.heading}
                                    </h4>
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-2">By {item.author || "TEAM"}</p>
                                        <div className="flex justify-between items-center">
                                            <button className="bg-gradient-to-r from-teal-700 to-teal-500 text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded">
                                                Read More
                                            </button>
                                            <div className="flex gap-2">
                                                <ThumbsUp />
                                                <Share />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-24 h-24 shrink-0 rounded overflow-hidden">
                                    <img src={item.image || placeholderImg} alt={item.heading} className="w-full h-full object-cover" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* THE WORLD SECTION */}
            <div className="max-w-7xl mx-auto px-4 mt-16 mb-16">

                {/* Header */}
                <div className="border-t-[3px] border-[#D10000] pt-6 flex flex-col lg:flex-row items-center justify-between gap-6 mb-8 group">
                    <div className="flex items-center gap-2">
                        <div className="bg-[#D10000] rounded-full w-10 h-10 flex items-center justify-center font-serif font-bold text-white text-lg">VB</div>
                        <div className="leading-tight">
                            <span className="block text-[#D10000] font-bold text-sm tracking-widest uppercase">The</span>
                            <span className="block text-white font-bold text-2xl tracking-tighter">World</span>
                        </div>
                    </div>

                    {/* World Nav */}
                    <div className="flex flex-wrap justify-center gap-x-10 gap-y-2 text-gray-400 text-sm font-medium bg-[#1c1c1c] px-6 py-3 ">
                        {["The Americas", "Asia", "Europe", "Africa", "Middle East", "Oceania", "Antarctica"].map((region, idx) => (
                            <React.Fragment key={region}>
                                <a href="#" className="hover:text-white transition uppercase text-md tracking-wider">{region}</a>
                                {idx < 6 && <span className="text-gray-700">|</span>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* World Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Col (List) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Dynamic filter for The Americas or Generic "World" items */}
                        {loading ? <div className="text-gray-500">Loading world news...</div> : newsData.worldNews && newsData.worldNews.length > 0 ? (
                            newsData.worldNews.slice(0, 3).map((item, i) => (
                                <div key={i} className="bg-[#1c1c1c] rounded-lg p-6 group hover:bg-[#252525] transition border border-gray-800 hover:border-gray-700">
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div className="md:col-span-2 flex flex-col">
                                            <h3 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-teal-400 transition leading-snug">
                                                {item.heading}
                                            </h3>
                                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                                {item.description}
                                            </p>
                                            <div className="mt-auto">
                                                <p className="text-[10px] text-gray-500 uppercase font-bold mb-3">By {item.author || "VOYABYTE TEAM"}</p>
                                                <div className="flex items-center justify-between">
                                                    <button className="bg-gradient-to-r from-teal-700 to-teal-500 text-white text-[9px] font-bold uppercase px-2 py-1 rounded">
                                                        Read More
                                                    </button>
                                                    <div className="flex gap-3">
                                                        <ThumbsUp />
                                                        <Share />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-40 md:h-full rounded overflow-hidden">
                                            <img src={item.image || placeholderImg} alt={item.heading} className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-500 p-8 border border-dashed border-gray-800 rounded text-center">No world news available yet.</div>
                        )}
                    </div>

                    {/* Right Col (Sidebar Groups) */}
                    <div className="space-y-8">
                        {["The Americas", "Asia", "Europe", "Africa"].map(region => (
                            <div key={region} className="bg-[#1c1c1c] rounded-lg p-5 border border-gray-800">
                                <h4 className="text-teal-400 font-bold mb-4 uppercase tracking-wider text-sm border-b border-gray-700 pb-2">{region}</h4>
                                {newsData[region] && newsData[region].length > 0 ? (
                                    newsData[region].slice(0, 1).map((item, idx) => (
                                        <div key={idx} className="flex gap-4 group">
                                            <div className="flex-1">
                                                <h5 className="text-sm font-bold text-gray-200 mb-2 line-clamp-3 group-hover:text-white transition">
                                                    {item.heading}
                                                </h5>
                                                <p className="text-[9px] text-gray-500 uppercase font-bold mb-2">By {item.author || "TEAM"}</p>
                                                <div className="flex items-center justify-between">
                                                    <button className="bg-gradient-to-r from-teal-700 to-teal-500 text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded">
                                                        Read More
                                                    </button>
                                                    <div className="flex gap-2">
                                                        <ThumbsUp />
                                                        <Share />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-20 h-20 shrink-0 rounded overflow-hidden">
                                                <img src={item.image || placeholderImg} alt={item.heading} className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-600 text-xs italic">No updates.</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Red Separator */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="border-t-[3px] border-[#D10000] w-full my-8"></div>
            </div>

            {/* LIFELINE+ SECTION */}
            <div className=" py-16 mb-16">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-gray-800">
                        <div className="flex items-center gap-2">
                            <div className="bg-[#D10000] rounded-full w-12 h-12 flex items-center justify-center font-serif font-bold text-white text-xl">VB</div>
                            <div className="leading-tight">
                                <span className="block text-white font-bold text-3xl tracking-tighter">Life<span className="text-[#D10000]">Line+</span></span>
                            </div>
                        </div>
                        <div className="flex flex-wrap bg-[#121212] px-8 py-2 justify-center gap-12 text-gray-400 text-md font-medium uppercase tracking-wider">
                            {["All", "Food", "Fitness", "Mind", "Body", "Life", "Newsletter", "Ask a Doctor"].map(item => (
                                <button
                                    key={item}
                                    onClick={() => setActiveLifeLineFilter(item)}
                                    className={`hover:text-white transition border-b-2 pb-1 ${activeLifeLineFilter === item ? "text-white border-[#D10000]" : "border-transparent hover:border-[#D10000]"}`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Grid (4 cards) */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {loading ? <div className="text-gray-500">Loading LifeLine+...</div> :
                            ((newsData["LifeLine+"] || []).filter(item => activeLifeLineFilter === "All" || (item.tags && item.tags.includes(activeLifeLineFilter))).slice(0, 4)).length > 0 ?
                                (newsData["LifeLine+"] || []).filter(item => activeLifeLineFilter === "All" || (item.tags && item.tags.includes(activeLifeLineFilter))).slice(0, 4).map((item, i) => (
                                    <div key={i} className="bg-[#1c1c1c] rounded-lg overflow-hidden group hover:shadow-lg hover:shadow-red-900/10 transition">
                                        <div className="h-48 overflow-hidden">
                                            <img src={item.image || placeholderImg} alt={item.heading} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-bold text-gray-100 mb-3 line-clamp-2 min-h-[3rem] text-sm group-hover:text-white transition">
                                                {item.heading}
                                            </h3>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold mb-4">By {item.author || "VOYABYTE TEAM"}</p>
                                            <div className="flex items-center justify-between">
                                                <button className="bg-[#D10000] text-white text-[10px] font-bold uppercase px-3 py-1 rounded hover:bg-red-700 transition">
                                                    Read More
                                                </button>
                                                <div className="flex gap-2">
                                                    <ThumbsUp />
                                                    <Share />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="col-span-4 text-center text-gray-500 py-10 border border-dashed border-gray-800 rounded-lg">
                                        No articles found for '{activeLifeLineFilter}'.
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>

            {/* Red Separator */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="border-t-[3px] border-[#D10000] w-full my-8"></div>
            </div>

            {/* POLITICS SECTION */}
            <div className=" py-16 mb-16">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-gray-800">
                        <div className="flex items-center gap-2">
                            <div className="bg-[#D10000] rounded-full w-12 h-12 flex items-center justify-center font-serif font-bold text-white text-xl">VB</div>
                            <h2 className="text-3xl font-bold text-white tracking-tighter">Politics</h2>
                        </div>
                        <div className="flex bg-[#121212] px-12 py-4 justify-center gap-6 text-gray-400 text-md font-medium uppercase tracking-wider">
                            {["All", "Donald Trump", "Modi", "The Brief", "Polling", "Democracy", "Elections"].map(item => (
                                <button
                                    key={item}
                                    onClick={() => setActivePoliticsFilter(item)}
                                    className={`hover:text-white transition border-b-2 pb-1 ${activePoliticsFilter === item ? "text-white border-[#D10000]" : "border-transparent hover:border-[#D10000]"}`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Grid (4 cards) */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 bg-[#121212] gap-6">
                        {loading ? <div className="text-gray-500">Loading Politics...</div> :
                            ((newsData.politics || []).filter(item => activePoliticsFilter === "All" || (item.tags && item.tags.includes(activePoliticsFilter))).slice(0, 4)).length > 0 ?
                                (newsData.politics || []).filter(item => activePoliticsFilter === "All" || (item.tags && item.tags.includes(activePoliticsFilter))).slice(0, 4).map((item, i) => (
                                    <div key={i} className="bg-[#1c1c1c] rounded-lg overflow-hidden group hover:shadow-lg hover:shadow-red-900/10 transition">
                                        <div className="h-48 overflow-hidden">
                                            <img src={item.image || placeholderImg} alt={item.heading} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-bold text-gray-100 mb-3 line-clamp-2 min-h-[3rem] text-sm group-hover:text-white transition">
                                                {item.heading}
                                            </h3>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold mb-4">By {item.author || "VOYABYTE TEAM"}</p>
                                            <div className="flex items-center justify-between">
                                                <button className="bg-[#D10000] text-white text-[10px] font-bold uppercase px-3 py-1 rounded hover:bg-red-700 transition">
                                                    Read More
                                                </button>
                                                <div className="flex gap-2">
                                                    <ThumbsUp />
                                                    <Share />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="col-span-4 text-center text-gray-500 py-10 border border-dashed border-gray-800 rounded-lg">
                                        No political news available for '{activePoliticsFilter}'.
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>

            {/* Red Separator */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="border-t-[3px] border-[#D10000] w-full my-8"></div>
            </div>

            {/* BUSINESS SECTION */}
            <div className=" py-16 mb-16">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-gray-800">
                        <div className="flex items-center gap-2">
                            <div className="bg-[#D10000] rounded-full w-12 h-12 flex items-center justify-center font-serif font-bold text-white text-xl">VB</div>
                            <h2 className="text-3xl font-bold text-white tracking-tighter">Business</h2>
                        </div>
                        <div className="flex bg-[#121212] px-12 py-4 justify-center gap-6 text-gray-400 text-md font-medium uppercase tracking-wider">
                            {["All", "Economy", "Personal Finance", "Future of Work", "Technology", "Climate"].map(item => (
                                <button
                                    key={item}
                                    onClick={() => setActiveBusinessFilter(item)}
                                    className={`hover:text-white transition border-b-2 pb-1 ${activeBusinessFilter === item ? "text-white border-[#D10000]" : "border-transparent hover:border-[#D10000]"}`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Grid (4 cards) */}
                    <div className="grid md:grid-cols-2 bg-[#121212] lg:grid-cols-4 gap-6">
                        {loading ? <div className="text-gray-500">Loading Business...</div> :
                            ((newsData.business || []).filter(item => activeBusinessFilter === "All" || (item.tags && item.tags.includes(activeBusinessFilter))).slice(0, 4)).length > 0 ?
                                (newsData.business || []).filter(item => activeBusinessFilter === "All" || (item.tags && item.tags.includes(activeBusinessFilter))).slice(0, 4).map((item, i) => (
                                    <div key={i} className="bg-[#1c1c1c] rounded-lg overflow-hidden group hover:shadow-lg hover:shadow-red-900/10 transition">
                                        <div className="h-48 overflow-hidden">
                                            <img src={item.image || placeholderImg} alt={item.heading} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-bold text-gray-100 mb-3 line-clamp-2 min-h-[3rem] text-sm group-hover:text-white transition">
                                                {item.heading}
                                            </h3>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold mb-4">By {item.author || "VOYABYTE TEAM"}</p>
                                            <div className="flex items-center justify-between">
                                                <button className="bg-[#D10000] text-white text-[10px] font-bold uppercase px-3 py-1 rounded hover:bg-red-700 transition">
                                                    Read More
                                                </button>
                                                <div className="flex gap-2">
                                                    <ThumbsUp />
                                                    <Share />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="col-span-4 text-center text-gray-500 py-10 border border-dashed border-gray-800 rounded-lg">
                                        No business news available for '{activeBusinessFilter}'.
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>

            {/* Red Separator */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="border-t-[3px] border-[#D10000] w-full my-8"></div>
            </div>

            {/* RELIGION VS SPIRITUALITY */}
            <div className=" py-16 mb-16">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-gray-800">
                        <div className="flex items-center gap-2">
                            <div className="bg-[#D10000] rounded-full w-12 h-12 flex items-center justify-center font-serif font-bold text-white text-xl">VB</div>
                            <div className="leading-tight">
                                <span className="block text-white font-bold text-3xl tracking-tighter">Religion <span className="text-[#D10000]">vs</span> <span className="text-teal-500">Spirituality</span></span>
                            </div>
                        </div>
                        <div className="flex bg-[#121212] px-12 py-4 justify-center gap-6 text-gray-400 text-md font-medium uppercase tracking-wider">
                            {["All", "Religion", "Spirituality", "Faith", "Philosophy"].map(item => (
                                <button
                                    key={item}
                                    onClick={() => setActiveReligionFilter(item)}
                                    className={`hover:text-white transition border-b-2 pb-1 ${activeReligionFilter === item ? "text-white border-[#D10000]" : "border-transparent hover:border-[#D10000]"}`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Grid (4 cards) */}
                    <div className="grid md:grid-cols-2 bg-[#121212] lg:grid-cols-4 gap-6">
                        {loading ? <div className="text-gray-500">Loading Religion...</div> :
                            ((newsData.religion || []).filter(item => activeReligionFilter === "All" || (item.tags && item.tags.includes(activeReligionFilter))).slice(0, 4)).length > 0 ?
                                (newsData.religion || []).filter(item => activeReligionFilter === "All" || (item.tags && item.tags.includes(activeReligionFilter))).slice(0, 4).map((item, i) => (
                                    <div key={i} className="bg-[#1c1c1c] rounded-lg overflow-hidden group hover:shadow-lg hover:shadow-red-900/10 transition">
                                        <div className="h-48 overflow-hidden">
                                            <img src={item.image || placeholderImg} alt={item.heading} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-bold text-gray-100 mb-3 line-clamp-2 min-h-[3rem] text-sm group-hover:text-white transition">
                                                {item.heading}
                                            </h3>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold mb-4">By {item.author || "VOYABYTE TEAM"}</p>
                                            <div className="flex items-center justify-between">
                                                <button className="bg-[#D10000] text-white text-[10px] font-bold uppercase px-3 py-1 rounded hover:bg-red-700 transition">
                                                    Read More
                                                </button>
                                                <div className="flex gap-2">
                                                    <ThumbsUp />
                                                    <Share />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="col-span-4 text-center text-gray-500 py-10 border border-dashed border-gray-800 rounded-lg">
                                        No religion/spirituality news available for '{activeReligionFilter}'.
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>

            {/* Red Separator */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="border-t-[3px] border-[#D10000] w-full my-8"></div>
            </div>

            {/* SPORTS, TECH, SCIENCE SECTIONS */}
            <div className="max-w-7xl mx-auto px-4 mb-20">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Reusable Column Component Logic */}
                    {[
                        { title: "SPORTS", data: newsData.sports, color: "text-teal-400" },
                        { title: "TECHNOLOGY", data: newsData.technology, color: "text-teal-400" },
                        { title: "SCIENCE", data: newsData.science, color: "text-teal-400" }
                    ].map((section, idx) => (
                        <div key={idx} className="bg-[#1c1c1c] border border-red-900/50 rounded-2xl p-6 flex flex-col h-full shadow-[0_0_15px_rgba(209,0,0,0.1)]">
                            {/* Header */}
                            <div className="flex items-center gap-2 mb-6 border-b border-gray-800 pb-4">
                                <div className="bg-[#D10000] rounded-full w-8 h-8 flex items-center justify-center font-serif font-bold text-white text-sm">VB</div>
                                <h2 className={`text-xl font-bold ${section.color} uppercase tracking-wider`}>{section.title}<span className="text-[#D10000]">_</span></h2>
                            </div>

                            {/* Featured Image */}
                            <div className="h-48 rounded-lg overflow-hidden mb-6 relative group">
                                {section.data && section.data.length > 0 ? (
                                    <img src={section.data[0].image || placeholderImg} alt={section.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                                ) : (
                                    <div className="w-full h-full bg-[#252525] flex items-center justify-center text-gray-600 text-xs">No Image</div>
                                )}
                            </div>

                            {/* List of Articles (Pagination simulation) */}
                            <div className="flex-1 space-y-4 mb-6">
                                {section.data && section.data.length > 0 ? (
                                    section.data.slice(0, 3).map((item, i) => (
                                        <div key={i} className="group cursor-pointer">
                                            <h4 className="font-bold text-gray-200 text-sm leading-snug group-hover:text-white transition border-b border-gray-800 pb-2 mb-1">
                                                {item.heading}
                                            </h4>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-500 text-sm italic">No {section.title.toLowerCase()} news.</div>
                                )}
                            </div>

                            {/* Pagination Strip */}
                            <div className="flex justify-center mt-auto">
                                <div className="flex gap-1">
                                    <button className="w-6 h-6 flex items-center justify-center bg-[#252525] text-gray-400 text-[10px] rounded hover:bg-[#D10000] hover:text-white transition">1</button>
                                    <button className="w-6 h-6 flex items-center justify-center bg-transparent border border-gray-700 text-gray-400 text-[10px] rounded hover:bg-[#D10000] hover:text-white hover:border-[#D10000] transition">2</button>
                                    <button className="w-6 h-6 flex items-center justify-center bg-transparent border border-gray-700 text-gray-400 text-[10px] rounded hover:bg-[#D10000] hover:text-white hover:border-[#D10000] transition">3</button>
                                    <span className="text-gray-600 text-[10px] flex items-end">...</span>
                                    <button className="w-6 h-6 flex items-center justify-center bg-transparent border border-gray-700 text-gray-400 text-[10px] rounded hover:bg-[#D10000] hover:text-white hover:border-[#D10000] transition">{">"}</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Red Separator */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="border-t-[3px] border-[#D10000] w-full my-8"></div>
            </div>

            {/* ASTROLOGY SECTION */}
            <div className=" py-16 mb-16">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-gray-800">
                        <div className="flex items-center gap-2">
                            <div className="bg-[#D10000] rounded-full w-12 h-12 flex items-center justify-center font-serif font-bold text-white text-xl">VB</div>
                            <div className="leading-tight">
                                <span className="block text-teal-500 font-bold text-3xl tracking-tighter">Astrology</span>
                            </div>
                        </div>
                        <div className="flex bg-[#121212] px-12 py-4 justify-center gap-6 text-gray-400 text-md font-medium uppercase tracking-wider">
                            {["All", "Horoscope", "Zodiac"].map(item => (
                                <button
                                    key={item}
                                    onClick={() => setActiveAstrologyFilter(item)}
                                    className={`hover:text-white transition border-b-2 pb-1 ${activeAstrologyFilter === item ? "text-white border-[#D10000]" : "border-transparent hover:border-[#D10000]"}`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Grid (4 cards) */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 bg-[#121212] gap-6">
                        {loading ? <div className="text-gray-500">Loading Astrology...</div> :
                            ((newsData.astrology || []).filter(item => activeAstrologyFilter === "All" || (item.tags && item.tags.includes(activeAstrologyFilter))).slice(0, 4)).length > 0 ?
                                (newsData.astrology || []).filter(item => activeAstrologyFilter === "All" || (item.tags && item.tags.includes(activeAstrologyFilter))).slice(0, 4).map((item, i) => (
                                    <div key={i} className="bg-[#1c1c1c] rounded-lg overflow-hidden group hover:shadow-lg hover:shadow-red-900/10 transition">
                                        <div className="h-48 overflow-hidden">
                                            <img src={item.image || placeholderImg} alt={item.heading} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-bold text-gray-100 mb-3 line-clamp-2 min-h-[3rem] text-sm group-hover:text-white transition">
                                                {item.heading}
                                            </h3>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold mb-4">By {item.author || "VOYABYTE TEAM"}</p>
                                            <div className="flex items-center justify-between">
                                                <button className="bg-[#D10000] text-white text-[10px] font-bold uppercase px-3 py-1 rounded hover:bg-red-700 transition">
                                                    Read More
                                                </button>
                                                <div className="flex gap-2">
                                                    <ThumbsUp />
                                                    <Share />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="col-span-4 text-center text-gray-500 py-10 border border-dashed border-gray-800 rounded-lg">
                                        No astrology news available for '{activeAstrologyFilter}'.
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>

            {/* Red Separator */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="border-t-[3px] border-[#D10000] w-full my-8"></div>
            </div>

            {/**India */}
            <div className=" py-16 mb-16">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-gray-800">
                        <div className="flex items-center gap-2">
                            <div className="bg-[#D10000] rounded-full w-12 h-12 flex items-center justify-center font-serif font-bold text-white text-xl">VB</div>
                            <div className="leading-tight">
                                <span className="text-teal-500 font-bold text-[30px]">INDIA</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm font-medium uppercase tracking-wider">
                            {/* Optional nav if needed, user didn't specify but consistent layout allows it. leaving blank matches image better */}
                        </div>
                    </div>

                    {/* Content Grid (4 cards) */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 bg-[#121212] gap-6">
                        {loading ? <div className="text-gray-500">Loading India...</div> :
                            (newsData.india && newsData.india.length > 0 ? newsData.india.slice(0, 4) : []).length > 0 ?
                                (newsData.india || []).slice(0, 4).map((item, i) => (
                                    <div key={i} className="bg-[#1c1c1c] rounded-lg overflow-hidden group hover:shadow-lg hover:shadow-red-900/10 transition">
                                        <div className="h-48 overflow-hidden">
                                            <img src={item.image || placeholderImg} alt={item.heading} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-bold text-gray-100 mb-3 line-clamp-2 min-h-[3rem] text-sm group-hover:text-white transition">
                                                {item.heading}
                                            </h3>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold mb-4">By {item.author || "VOYABYTE TEAM"}</p>
                                            <div className="flex items-center justify-between">
                                                <button className="bg-[#D10000] text-white text-[10px] font-bold uppercase px-3 py-1 rounded hover:bg-red-700 transition">
                                                    Read More
                                                </button>
                                                <div className="flex gap-2">
                                                    <ThumbsUp />
                                                    <Share />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="col-span-4 text-center text-gray-500 py-10 border border-dashed border-gray-800 rounded-lg">
                                        No India news available. Tag news with 'India'.
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>

            {/* Red Separator */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="border-t-[3px] border-[#D10000] w-full my-8"></div>
            </div>

            {/* ENTERTAINMENT SECTION */}
            <div className=" py-16 mb-16">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-gray-800">
                        <div className="flex items-center gap-2">
                            <div className="bg-[#D10000] rounded-full w-12 h-12 flex items-center justify-center font-serif font-bold text-white text-xl">VB</div>
                            <h2 className="text-3xl font-bold text-teal-500 tracking-tighter">Entertainment</h2>
                        </div>
                        <div className="flex flex-wrap bg-[#121212] px-12 py-4 justify-center gap-6 text-gray-400 text-md font-medium uppercase tracking-wider">
                            {["All", "Art", "Music", "Movies", "Television", "Theatre", "Video Games"].map(item => (
                                <button
                                    key={item}
                                    onClick={() => setActiveEntertainmentFilter(item)}
                                    className={`hover:text-white transition border-b-2 pb-1 ${activeEntertainmentFilter === item ? "text-white border-[#D10000]" : "border-transparent hover:border-[#D10000]"}`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Grid (4 cards) */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 bg-[#121212] gap-6">
                        {loading ? <div className="text-gray-500">Loading Entertainment...</div> :
                            ((newsData.entertainaiment || []).filter(item => activeEntertainmentFilter === "All" || (item.tags && item.tags.includes(activeEntertainmentFilter))).slice(0, 4)).length > 0 ?
                                (newsData.entertainaiment || []).filter(item => activeEntertainmentFilter === "All" || (item.tags && item.tags.includes(activeEntertainmentFilter))).slice(0, 4).map((item, i) => (
                                    <div key={i} className="bg-[#1c1c1c] rounded-lg overflow-hidden group hover:shadow-lg hover:shadow-red-900/10 transition">
                                        <div className="h-48 overflow-hidden">
                                            <img src={item.image || placeholderImg} alt={item.heading} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-bold text-gray-100 mb-3 line-clamp-2 min-h-[3rem] text-sm group-hover:text-white transition">
                                                {item.heading}
                                            </h3>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold mb-4">By {item.author || "VOYABYTE TEAM"}</p>
                                            <div className="flex items-center justify-between">
                                                <button className="bg-[#D10000] text-white text-[10px] font-bold uppercase px-3 py-1 rounded hover:bg-red-700 transition">
                                                    Read More
                                                </button>
                                                <div className="flex gap-2">
                                                    <ThumbsUp />
                                                    <Share />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="col-span-4 text-center text-gray-500 py-10 border border-dashed border-gray-800 rounded-lg">
                                        No Entertainment news available for '{activeEntertainmentFilter}'.
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>

            {/* THE STYLE SECTION */}
            <div className="  mb-16">
                <div className=" ">
                    {/* Header */}
                    <div className="mb-10 pb-16 pt-10 bg-[#121212] border-b border-[#D10000]">
                        <div className='mx-auto px-4 max-w-7xl'>
                            <div className='flex items-center justify-center'>
                                <img src={voyabytelogo} className="h-60"></img></div>
                            <h2 className="text-6xl  font-bold text-white mb-2">The Style</h2>
                            <p className="text-white text-md border-b-2 border-[#D10000] pb-4 mb-6 font-medium">News from Defining How the World Moves</p>
                            <div className="flex gap-12 text-2xl font-bold">
                                {["All", "Fashion", "Power", "Trends"].map(item => (
                                    <button
                                        key={item}
                                        onClick={() => setActiveStyleFilter(item)}
                                        className={`hover:text-white transition pb-2 border-b-4 ${activeStyleFilter === item ? "text-white border-[#D10000]" : "text-gray-500 border-transparent hover:border-gray-700"}`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid mx-auto px-4 max-w-7xl lg:grid-cols-3 gap-12">
                        {/* Left Column: Top Headlines */}
                        <div className="lg:col-span-1">
                            <div className="flex items-center gap-2 mb-8">
                                <div className="bg-[#D10000] rounded-full w-10 h-10 flex items-center justify-center font-serif font-bold text-white text-lg shadow-lg shadow-red-900/40">VB</div>
                                <h3 className="text-xl font-bold text-teal-400 uppercase tracking-widest">Top Headlines</h3>
                            </div>
                            <div className="space-y-4">
                                {loading ? <div className="text-gray-500">Loading Headlines...</div> :
                                    ((newsData.theStyle || []).filter(item => {
                                        const tagMap = {
                                            "All": "styletopheadline",
                                            "Fashion": "fashiontopheadline",
                                            "Power": "powertopheadline",
                                            "Trends": "trendstopheadline"
                                        };
                                        return item.tags && item.tags.includes(tagMap[activeStyleFilter]);
                                    }).slice(0, 6)).length > 0 ?
                                        (newsData.theStyle || []).filter(item => {
                                            const tagMap = {
                                                "All": "styletopheadline",
                                                "Fashion": "fashiontopheadline",
                                                "Power": "powertopheadline",
                                                "Trends": "trendstopheadline"
                                            };
                                            return item.tags && item.tags.includes(tagMap[activeStyleFilter]);
                                        }).slice(0, 6).map((item, i) => (
                                            <div key={i} className="flex gap-4 p-2 rounded-xl bg-[#1c1c1c]/50 hover:bg-[#252525] border border-gray-800 transition group cursor-pointer">
                                                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-700">
                                                    <img src={item.image || placeholderImg} alt={item.heading} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                                                </div>
                                                <div className="flex flex-col justify-between py-1">
                                                    <h4 className="font-bold text-gray-200 text-xs leading-tight group-hover:text-white transition line-clamp-2">
                                                        {item.heading}
                                                    </h4>
                                                    <div className="flex gap-3">
                                                        <button className="flex items-center gap-1 hover:text-white transition">
                                                            <ThumbsUp />
                                                        </button>
                                                        <button className="flex items-center gap-1 hover:text-white transition">
                                                            <Share />
                                                        </button>
                                                        <span className="bg-teal-500 text-black text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter">Read More</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : <p className="text-gray-500 italic text-sm">No style headlines found.</p>
                                }
                            </div>
                        </div>

                        {/* Right Area: Main Feature & Grid */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Main Feature Story */}
                            {loading ? <div className="text-gray-500">Loading Feature...</div> :
                                (() => {
                                    const tagMap = {
                                        "All": "style",
                                        "Fashion": "fashion",
                                        "Power": "power",
                                        "Trends": "trends"
                                    };
                                    const filtered = (newsData.theStyle || []).filter(item => item.tags && item.tags.includes(tagMap[activeStyleFilter]));
                                    const feature = filtered[0];
                                    if (!feature) return <div className="h-64 bg-[#1c1c1c] rounded-2xl border border-dashed border-gray-800 flex items-center justify-center text-gray-500">No feature found.</div>;

                                    return (
                                        <div className="bg-[#1c1c1c] rounded-2xl overflow-hidden shadow-2xl shadow-black group">
                                            <div className="relative h-[450px] overflow-hidden">
                                                <img src={feature.image || placeholderImg} alt={feature.heading} className="w-full h-full object-cover group-hover:scale-105 transition duration-1000" />
                                                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                                                <div className="absolute top-4 left-4">
                                                    <span className="bg-[#D10000] text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-widest shadow-lg">New Arrival</span>
                                                </div>
                                            </div>
                                            <div className="p-8 -mt-24 relative z-10">
                                                <h3 className="text-4xl font-black text-white mb-4 leading-tight uppercase tracking-tighter decoration-[#D10000] decoration-4">
                                                    {feature.heading}
                                                </h3>
                                                <div className="flex items-center gap-2 mb-6 text-gray-400 text-xs font-bold uppercase tracking-widest">
                                                    <span>By {feature.author || "VOYABYTE TEAM"}</span>
                                                    <span className="text-[#D10000]">•</span>
                                                    <span>{feature.date ? new Date(feature.date).toLocaleDateString() : "TRENDING NOW"}</span>
                                                </div>
                                                <div className="flex items-center justify-between pt-6 border-t border-gray-800">
                                                    <button className="bg-white text-black font-black text-sm uppercase px-8 py-3 rounded-sm hover:bg-[#D10000] hover:text-white transition-all transform hover:-translate-y-1">
                                                        Read Story
                                                    </button>
                                                    <div className="flex gap-6">
                                                        <ThumbsUp size={24} />
                                                        <Share size={24} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })()
                            }

                            {/* Two Sub-feature Grid */}
                            <div className="grid md:grid-cols-2 gap-8">
                                {loading ? null :
                                    (() => {
                                        const tagMap = {
                                            "All": "style",
                                            "Fashion": "fashion",
                                            "Power": "power",
                                            "Trends": "trends"
                                        };
                                        const filtered = (newsData.theStyle || []).filter(item => item.tags && item.tags.includes(tagMap[activeStyleFilter]));
                                        const subItems = filtered.slice(1, 3);

                                        return subItems.length > 0 ? subItems.map((item, i) => (
                                            <div key={i} className="flex flex-col group border border-gray-800 rounded-xl overflow-hidden bg-[#1c1c1c]">
                                                <div className="h-56 relative overflow-hidden">
                                                    <img src={item.image || placeholderImg} alt={item.heading} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                                                    <div className="absolute top-0 right-0 p-3">
                                                        <div className="bg-teal-400 text-black text-[10px] font-black px-2 py-1 uppercase rounded-sm border-b-2 border-teal-600">
                                                            Heritage
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-5 flex flex-col flex-1 bg-white">
                                                    <h4 className="text-xl font-bold text-black mb-4 line-clamp-2 leading-tight group-hover:text-[#D10000] transition">
                                                        {item.heading}
                                                    </h4>
                                                    <p className="text-[10px] text-gray-500 font-bold mb-6 flex items-center gap-1">
                                                        <span className="w-4 h-px bg-gray-300"></span>
                                                        BY {item.author || "VOYABYTE TEAM"}
                                                    </p>
                                                    <div className="mt-auto flex justify-between items-center bg-gray-50 -mx-5 -mb-5 p-4 border-t border-gray-100">
                                                        <button className="text-black font-black text-xs uppercase border-b-2 border-black hover:text-[#D10000] hover:border-[#D10000] transition-colors">
                                                            Explore
                                                        </button>
                                                        <div className="flex gap-4 text-teal-600">
                                                            <ThumbsUp />
                                                            <Share />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : [1, 2].map(k => (
                                            <div key={k} className="h-48 bg-[#1c1c1c] rounded-xl border border-dashed border-gray-800 flex items-center justify-center text-gray-600 text-xs">Waiting for more items...</div>
                                        ));
                                    })()
                                }
                            </div>
                        </div>
                    </div>
                    <div className='mt-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12'>
                        {/* Left Col: More Main Content (Large Cards) */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="flex items-center gap-2 mb-6 bg-[#18181b] p-3 rounded-t-2xl border-b border-[#D10000]">
                                <div className="bg-[#D10000] rounded-full w-8 h-8 flex items-center justify-center font-serif font-bold text-white text-sm">VB</div>
                                <h3 className="text-2xl font-bold text-teal-400 uppercase tracking-tighter">
                                    {activeStyleFilter === "All" ? "The Style" : activeStyleFilter}
                                </h3>
                            </div>
                            {loading ? <div className="text-gray-500">Loading...</div> :
                                (() => {
                                    const tagMap = {
                                        "All": "style",
                                        "Fashion": "fashion",
                                        "Power": "power",
                                        "Trends": "trends"
                                    };
                                    // Skip the first 3 (used above) and take next 3
                                    const filtered = (newsData.theStyle || []).filter(item => item.tags && item.tags.includes(tagMap[activeStyleFilter]));
                                    const moreItems = filtered.slice(3, 6);

                                    return moreItems.length > 0 ? moreItems.map((item, i) => (
                                        <div key={i} className="bg-[#18181b] rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition group">
                                            <div className="p-6 pb-0">
                                                <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-white transition">
                                                    {item.heading}
                                                </h3>
                                                <p className="text-[10px] text-gray-500 uppercase font-bold mb-4">By {item.author || "VOYABYTE TEAM"}</p>
                                            </div>
                                            <div className="flex flex-col md:flex-row gap-6 p-6 pt-0">
                                                <div className="flex-1">
                                                    <p className="text-gray-400 text-sm mb-6 line-clamp-4 leading-relaxed">
                                                        {item.description}
                                                    </p>
                                                    <div className="flex items-center justify-between border-t border-gray-700 pt-4">
                                                        <button className="bg-teal-600 text-white text-[10px] font-black uppercase px-3 py-1.5 rounded hover:bg-teal-500 transition">
                                                            Read More
                                                        </button>
                                                        <div className="flex gap-4">
                                                            <div className="bg-[#2a2a2a] p-1.5 rounded-full hover:bg-[#333] transition cursor-pointer"><ThumbsUp /></div>
                                                            <div className="bg-[#2a2a2a] p-1.5 rounded-full hover:bg-[#333] transition cursor-pointer"><Share /></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full md:w-56 h-40 flex-shrink-0 rounded-xl overflow-hidden">
                                                    <img src={item.image || placeholderImg} alt={item.heading} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                                                </div>
                                            </div>
                                            <div className="h-1 w-full bg-gradient-to-r from-[#D10000] to-transparent"></div>
                                        </div>
                                    )) : (
                                        <div className="text-gray-500 italic p-6 border border-dashed border-gray-800 rounded-xl">
                                            No more articles in {activeStyleFilter}.
                                        </div>
                                    );
                                })()
                            }
                        </div>

                        {/* Right Col: Trending Sidebar */}
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="bg-[#D10000] text-white font-serif font-bold text-xl px-2 rounded-sm mr-1">VB</div>
                                <h3 className="text-3xl font-bold text-teal-500 tracking-tighter">Trending</h3>
                            </div>
                            <div className="space-y-4">
                                {loading ? <div className="text-gray-500">Loading Trending...</div> :
                                    (() => {
                                        const trendTagMap = {
                                            "All": "styletrending",
                                            "Fashion": "fashiontrending",
                                            "Power": "powertrending",
                                            "Trends": "trendstrending"
                                        };
                                        const trendItems = (newsData.theStyle || []).filter(item => item.tags && item.tags.includes(trendTagMap[activeStyleFilter])).slice(0, 5);

                                        return trendItems.length > 0 ? trendItems.map((item, i) => (
                                            <div key={i} className="bg-[#18181b] p-4 rounded-xl border border-gray-800 hover:border-gray-700 transition group cursor-pointer">
                                                <h4 className="font-bold text-gray-200 text-sm leading-snug mb-3 line-clamp-3 group-hover:text-white transition">
                                                    {item.heading}
                                                </h4>
                                                <div className="flex justify-between items-center">
                                                    <span className="bg-[#242424] text-teal-500 text-[9px] font-black uppercase px-2 py-1 rounded border border-gray-700">
                                                        Read More
                                                    </span>
                                                    <div className="flex gap-2 scale-90">
                                                        <div className="bg-[#2a2a2a] p-1 rounded-full text-teal-400 hover:text-white transition"><ThumbsUp /></div>
                                                        <div className="bg-[#2a2a2a] p-1 rounded-full text-teal-400 hover:text-white transition"><Share /></div>
                                                    </div>
                                                </div>
                                                <div className="mt-3 rounded-lg overflow-hidden h-32 relative">
                                                    <img src={item.image || placeholderImg} alt={item.heading} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-500" />
                                                </div>
                                            </div>
                                        )) : (
                                            <div className="text-gray-500 text-xs italic text-center py-4 bg-[#18181b] rounded-xl border border-dashed border-gray-800">
                                                No trending items found for {activeStyleFilter}.
                                            </div>
                                        );
                                    })()
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
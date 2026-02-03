import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [otherBlogs, setOtherBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [blogRes, allBlogsRes] = await Promise.all([
                    axios.get(`https://mantratravelbackend.onrender.com/api/blogs/${id}`),
                    axios.get(`https://mantratravelbackend.onrender.com/api/blogs`)
                ]);
                setBlog(blogRes.data);

                // Filter out current blog and take 2 for highlights
                const filtered = allBlogsRes.data.filter(b => b._id !== id).slice(0, 2);
                setOtherBlogs(filtered);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to load blog details.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return <div className="h-screen flex items-center justify-center text-xl">Loading...</div>;
    if (error) return <div className="h-screen flex items-center justify-center text-red-500 text-xl">{error}</div>;
    if (!blog) return <div className="h-screen flex items-center justify-center text-xl">Blog not found.</div>;

    // Helper for categories
    const allTags = ["Adventure", "Culture", "Heritage", "Nature"];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[70vh] w-full overflow-hidden">
                <img
                    src={blog.image || "https://via.placeholder.com/1600x900"}
                    alt={blog.heading}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-20 flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-[#E5C299] max-w-5xl mb-6 leading-tight drop-shadow-2xl uppercase tracking-wider font-serif">
                        {blog.heading}
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 uppercase tracking-[0.3em] font-medium drop-shadow-md">
                        {blog.author || "Guest Author"}
                    </p>
                </div>
            </div>

            {/* Main Layout Grid */}
            <div className="max-w-7xl mx-auto px-4 py-20 lg:grid lg:grid-cols-12 lg:gap-16">

                {/* Content Area */}
                <div className="lg:col-span-8">
                    <div className="prose prose-xl max-w-none text-[#2D2D2D] leading-relaxed space-y-12">
                        {blog.content && blog.content.length > 0 ? (
                            blog.content.map((section, idx) => {
                                switch (section.type) {
                                    case "paragraph":
                                        return (
                                            <div key={idx} className={`text-lg md:text-xl leading-8 blog-paragraph ${idx === 0 ? 'first-paragraph' : ''}`}>
                                                {section.value.split('\n').map((p, pIdx) => (
                                                    p.trim() && (
                                                        <p key={pIdx} className="mb-6">
                                                            {idx === 0 && pIdx === 0 ? (
                                                                <><span className="float-left text-7xl font-bold mr-3 mt-2 text-[#C4845C] font-serif leading-none">{p.charAt(0)}</span>{p.slice(1)}</>
                                                            ) : p}
                                                        </p>
                                                    )
                                                ))}
                                            </div>
                                        );
                                    case "subheading":
                                        return (
                                            <div key={idx} className="mt-16 mb-8">
                                                <span className="text-sm font-bold tracking-widest text-[#D4AF37] uppercase mb-2 block">PROLOGUE</span>
                                                <h2 className="text-3xl md:text-4xl font-bold text-black uppercase tracking-tight font-serif">
                                                    {section.value}
                                                </h2>
                                            </div>
                                        );
                                    case "image":
                                        return (
                                            <div key={idx} className="my-14 rounded-3xl overflow-hidden shadow-2xl">
                                                <img
                                                    src={section.value}
                                                    alt={`${blog.heading} - ${idx}`}
                                                    className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                                                />
                                            </div>
                                        );
                                    case "quote":
                                        return (
                                            <div key={idx} className="relative my-16 py-8 px-10 border-l-4 border-[#C4845C] bg-[#FDF8F4] rounded-r-2xl">
                                                <span className="absolute -top-4 -left-2 text-7xl text-[#C4845C]/20 font-serif">"</span>
                                                <p className="text-2xl italic font-serif text-[#4A4A4A]">
                                                    {section.value}
                                                </p>
                                            </div>
                                        );
                                    case "features":
                                        return (
                                            <div key={idx} className="my-12 p-8 border border-[#E5C299] rounded-[2rem] bg-white shadow-sm">
                                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C4845C] mb-4 block">WHERE AM I -</span>
                                                <ul className="space-y-4">
                                                    {Array.isArray(section.value) && section.value.map((feature, fIdx) => (
                                                        feature.trim() && (
                                                            <li key={fIdx} className="flex items-start gap-4">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-[#C4845C] mt-2.5 flex-shrink-0"></span>
                                                                <span className="text-gray-600 text-lg leading-relaxed">{feature}</span>
                                                            </li>
                                                        )
                                                    ))}
                                                </ul>
                                            </div>
                                        );
                                    default:
                                        return null;
                                }
                            })
                        ) : (
                            <p>No content available.</p>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="lg:col-span-4 mt-20 lg:mt-0 space-y-16">
                    {/* Highlight Section */}
                    <div className="border-t-2 border-black pt-8">
                        <h3 className="text-2xl font-bold uppercase tracking-[0.2em] mb-10 text-center">HIGHLIGHT</h3>
                        <div className="space-y-12">
                            {otherBlogs.map(item => (
                                <div key={item._id} className="group cursor-pointer" onClick={() => navigate(`/blog/${item._id}`)}>
                                    <div className="aspect-[4/3] overflow-hidden mb-4">
                                        <img
                                            src={item.image}
                                            alt={item.heading}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-black line-clamp-2 text-center group-hover:text-[#C4845C] transition-colors">
                                        {item.heading}
                                    </h4>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Categories Section */}
                    <div className="pt-8 text-center">
                        <h3 className="text-2xl font-bold uppercase tracking-[0.2em] mb-8">CATEGORIES</h3>
                        <ul className="space-y-4">
                            {allTags.map(tag => (
                                <li key={tag}>
                                    <button
                                        className="text-lg text-gray-600 hover:text-black transition-colors font-medium"
                                        onClick={() => navigate(`/blog?tag=${tag}`)}
                                    >
                                        {tag}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>

            {/* Back Button Footer */}
            <div className="max-w-7xl mx-auto px-4 py-12 border-t border-gray-100 flex justify-center">
                <button
                    onClick={() => navigate("/blog")}
                    className="flex items-center gap-3 text-black font-bold uppercase tracking-widest hover:text-[#C4845C] transition-colors group"
                >
                    <span className="text-xl transition-transform group-hover:-translate-x-2">←</span>
                    Back to Selection
                </button>
            </div>
        </div>
    );
};

export default BlogDetail;

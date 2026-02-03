import { useState, useEffect } from 'react';
import axios from 'axios';
import cities_hero from '../assets/images/cities_hero.png';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaBookmark, FaComment } from 'react-icons/fa';

export default function Cities() {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [exploreBlog, setExploreBlog] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get('https://mantratravelbackend.onrender.com/api/blogs?tag=cities');
                setBlogs(res.data);
            } catch (err) {
                console.error("Error fetching nature blogs", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    useEffect(() => {
        const fetchExploreBlogs = async () => {
            try {
                const res = await axios.get('https://mantratravelbackend.onrender.com/api/blogs?tag=explorecities');
                setExploreBlog(res.data);
            } catch (err) {
                console.error("Error fetching nature blogs", err);
            } finally {
                setLoading(false);
            }
        };
        fetchExploreBlogs();
    }, []);

    return (
        <>
            <div className="flex flex-col h-[50vh] md:h-[680px]">
                <div
                    className="flex-1 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${cities_hero})` }}
                >
                    <div className="absolute top-[3%] left-0 w-full flex flex-wrap justify-center md:justify-around items-center bg-black/50 py-2 md:py-[10px] rounded-md gap-2 md:gap-0 px-2">
                        {['nature', 'wildlife', 'adventures', 'heritage', 'spirituality', 'cities', 'culture'].map((item, idx) => (
                            <button
                                key={idx}
                                className='text-white text-xs md:text-base cursor-pointer px-2 md:px-[10px] py-[5px] hover:scale-105 transition-all duration-300 bg-transparent border-none'
                                onClick={() => {
                                    navigate(`/${item}`)
                                }}
                            >
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </button>
                        ))}
                    </div>
                    <p
                        className="nature-text absolute bottom-[10%] md:bottom-[3%] left-1/2 -translate-x-1/2 text-white font-bold text-4xl md:text-[6rem]"
                    >
                        CITIES
                    </p>

                </div>
            </div>

            {/* Blog Grid Section */}
            <div className="bg-[#0f172a] py-8 md:py-16 px-4 md:px-8 min-h-screen">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {loading ? (
                        <p className="text-white text-center col-span-1 md:col-span-2">Loading blogs...</p>
                    ) : blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <div key={blog._id} className="text-white">
                                {/* Image Container */}
                                <div className="relative rounded-lg overflow-hidden mb-6 group">
                                    <img
                                        src={blog.image || 'https://via.placeholder.com/600x400'}
                                        alt={blog.heading}
                                        className="w-full h-[250px] md:h-[350px] object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {/* Icons Overlay */}
                                    <div className="absolute bottom-4 left-4 flex gap-3">
                                        <div className="bg-white/20 backdrop-blur-sm p-2 md:p-3 rounded-full hover:bg-white/40 cursor-pointer transition">
                                            <FaHeart className="w-4 h-4 md:w-5 md:h-5" />
                                        </div>
                                        <div className="bg-white/20 backdrop-blur-sm p-2 md:p-3 rounded-full hover:bg-white/40 cursor-pointer transition">
                                            <FaBookmark className="w-4 h-4 md:w-5 md:h-5" />
                                        </div>
                                        <div className="bg-white/20 backdrop-blur-sm p-2 md:p-3 rounded-full hover:bg-white/40 cursor-pointer transition">
                                            <FaComment className="w-4 h-4 md:w-5 md:h-5" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl md:text-2xl font-bold mb-2 leading-tight">
                                    {blog.heading}
                                </h3>
                                <p className="text-gray-400 text-xs md:text-sm font-bold tracking-widest uppercase mb-4">
                                    NATURE REVIEW
                                </p>
                                <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 line-clamp-3">
                                    {blog.description}
                                </p>
                                <button
                                    onClick={() => navigate(`/blog/${blog._id}`)}
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded text-sm tracking-wider transition-colors uppercase"
                                >
                                    Read More
                                </button>
                                <div className="border-b border-gray-700 mt-10"></div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-center col-span-1 md:col-span-2">No nature blogs found.</p>
                    )}
                </div>
            </div>

            <div className='bg-white py-8 md:py-16 px-4 md:px-6 relative'>
                <h2 className="text-center text-2xl md:text-4xl font-bold tracking-widest mb-8 md:mb-12">
                    RELATED BLOGS
                </h2>

                {/* Arrows (Hidden on mobile) */}
                <button className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow rounded-full items-center justify-center hover:bg-gray-50 transition">
                    ←
                </button>

                <button className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow rounded-full items-center justify-center hover:bg-gray-50 transition">
                    →
                </button>

                {/* Blog Cards */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">

                    {exploreBlog.map((blog) => (
                        <div key={blog.id} className="relative">

                            {/* Image */}
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-[250px] md:h-[350px] object-cover rounded-md md:rounded-none"
                            />

                            {/* Overlay (only if exists) */}
                            {blog.overlayText && (
                                <div className="absolute inset-0 bg-black/40 flex items-center p-6 rounded-md md:rounded-none">
                                    <h3 className="text-white text-xl font-bold leading-snug">
                                        {blog.overlayText}
                                    </h3>
                                </div>
                            )}

                            {/* Content */}
                            <h3 className="text-lg md:text-xl font-bold mt-4">{blog.title}</h3>

                            <p className="text-gray-600 mt-2 md:mt-3 text-sm leading-relaxed">
                                {blog.description}
                            </p>

                            <button
                                onClick={() => navigate(`/blog/${blog._id}`)}
                                className="mt-4 px-4 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition"
                            >
                                READ MORE
                            </button>
                        </div>
                    ))}

                </div>

                {/* Pagination Lines */}
                <div className="flex justify-center mt-10 gap-2">
                    <span className="w-10 h-[2px] bg-black"></span>
                    <span className="w-10 h-[2px] bg-gray-300"></span>
                    <span className="w-10 h-[2px] bg-gray-300"></span>
                </div>
            </div>
        </>
    );
}

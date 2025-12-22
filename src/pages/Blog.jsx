import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { getCountryData } from "../data/countryData";

export default function Blog() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const tag = queryParams.get("tag");
    const topic = queryParams.get("topic");
    const country = queryParams.get("country");
    const category = queryParams.get("category"); // e.g., "EXPLORER", "STATES", "THINGS TO DO"

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get dynamic nav items based on the current category and country
    // Ensure we handle case insensitivity or spaces if needed, but getCountryData expects key match
    const countryData = getCountryData(country || "India");

    // Find the matching category data. 
    // category param is likely "EXPLORER" from CountryExplore, so it should match keys directly.
    const navItems = category && countryData[category] ? countryData[category] : [];

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                // Pass tag to backend for server-side filtering if available
                const endpoint = tag ? `/api/blogs?tag=${encodeURIComponent(tag)}` : "/api/blogs";
                const res = await axios.get(endpoint);
                setBlogs(res.data);
            } catch (err) {
                console.error("Error fetching blogs", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [tag]);

    const handleNavClick = (item) => {
        const cleanCountry = (country || 'india').toLowerCase().replace(/\s+/g, '');
        const cleanTab = (category || '').toLowerCase().replace(/\s+/g, '').replace('&', '');
        const cleanItem = item.title.toLowerCase().replace(/\s+/g, '');

        const newTag = `${cleanCountry}${cleanTab}${cleanItem}`;

        // Keep the category same, just change topic and tag
        navigate(`/blog?tag=${encodeURIComponent(newTag)}&topic=${encodeURIComponent(item.title)}&country=${encodeURIComponent(country)}&category=${encodeURIComponent(category)}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-10 px-4">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mb-2 uppercase">
                    {country || "Our"} {topic || "Blogs"}
                </h1>
                {tag && <p className="text-gray-500 text-sm">Tag: {tag}</p>}

                {/* Dynamic Navigation Bar */}
                {navItems.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm font-semibold text-gray-400 uppercase tracking-widest border-b pb-4 border-gray-200">
                        {navItems.map((item, index) => {
                            const isActive = topic === item.title;
                            return (
                                <button
                                    key={index}
                                    onClick={() => handleNavClick(item)}
                                    className={`transition-colors pb-1 ${isActive
                                            ? "text-blue-600 border-b-2 border-blue-600"
                                            : "hover:text-gray-600"
                                        }`}
                                >
                                    {item.title}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {loading ? (
                <div className="text-center text-xl text-gray-500">Loading stories...</div>
            ) : blogs.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-2xl text-gray-400">No blogs found for this topic yet.</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Go Back
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1 overflow-hidden cursor-pointer group">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={blog.image || "https://via.placeholder.com/400x250"}
                                    alt={blog.heading}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-4 text-center">
                                <h3 className="text-lg font-bold text-blue-500 group-hover:text-blue-700 uppercase tracking-wide">
                                    {blog.heading}
                                </h3>
                            </div>
                            <div className="bg-blue-500 py-2 text-center">
                                <span className="text-white font-bold uppercase tracking-widest text-sm">BLOGS</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
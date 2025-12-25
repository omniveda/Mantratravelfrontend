import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`https://mantratravelbackend.onrender.com/api/blogs/${id}`);
                setBlog(response.data);
            } catch (err) {
                console.error("Error fetching blog details:", err);
                setError("Failed to load blog details.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) return <div className="h-screen flex items-center justify-center text-xl">Loading...</div>;
    if (error) return <div className="h-screen flex items-center justify-center text-red-500 text-xl">{error}</div>;
    if (!blog) return <div className="h-screen flex items-center justify-center text-xl">Blog not found.</div>;

    return (
        <div className="min-h-screen relative">
            {/* Blurred Background Layer */}
            <div
                className="fixed inset-0 z-[-1]"
                style={{
                    backgroundImage: `url(${blog.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: "blur(8px)",
                    transform: "scale(1.1)" // Scale up slightly to avoid blur edges showing white
                }}
            />
            {/* Overlay to darken slightly if needed */}
            <div className="fixed inset-0 bg-black/30 z-[-1]" />

            <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden relative z-10">
                    {/* Hero Image */}
                    <div className="relative h-64 md:h-96 w-full">
                        <img
                            src={blog.image || "https://via.placeholder.com/800x400"}
                            alt={blog.heading}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white">
                            <div className="flex gap-2 mb-3">
                                {blog.tags && blog.tags.map((tag, index) => (
                                    <span key={index} className="bg-blue-600/80 px-2 py-1 text-xs rounded uppercase tracking-wider font-semibold">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold leading-tight font-serif">
                                {blog.heading}
                            </h1>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-10">
                        <div className="flex items-center justify-between text-gray-500 text-sm mb-8 pb-4 border-b">
                            <div>
                                By <span className="font-semibold text-gray-800">{blog.author || "Guest Author"}</span>
                            </div>
                            <div>
                                {new Date(blog.createdAt).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                        </div>

                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                            {blog.description.split('\n').map((paragraph, idx) => (
                                paragraph.trim() && <p key={idx}>{paragraph}</p>
                            ))}
                        </div>

                        <div className="mt-12 pt-6 border-t flex justify-between items-center">
                            <button
                                onClick={() => navigate(-1)}
                                className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors"
                            >
                                ← Back to Blogs
                            </button>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default BlogDetail;

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function NewsManagement() {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentNewsId, setCurrentNewsId] = useState(null);

    const [formData, setFormData] = useState({
        heading: "",
        subHeading: "",
        description: "",
        author: "",
        category: "General",
        tags: [],
        image: null,
    });

    // For handling image preview
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/news");
            setNewsList(res.data);
        } catch (err) {
            console.error(err);
            alert("Failed to fetch news");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        } else {
            setPreviewImage(null);
        }
    };

    const resetForm = () => {
        setFormData({
            heading: "",
            subHeading: "",
            description: "",
            author: "",
            category: "General",
            tags: [],
            image: null
        });
        setPreviewImage(null);
        setIsEditing(false);
        setCurrentNewsId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("heading", formData.heading);
        data.append("subHeading", formData.subHeading);
        data.append("description", formData.description);
        data.append("author", formData.author);
        data.append("category", formData.category);
        data.append("tags", JSON.stringify(formData.tags));

        if (formData.image instanceof File) {
            data.append("image", formData.image);
        }

        try {
            if (isEditing) {
                await axios.put(`/api/news/${currentNewsId}`, data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                alert("News updated successfully");
            } else {
                await axios.post("/api/news", data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                alert("News created successfully");
            }
            fetchNews();
            resetForm();
        } catch (err) {
            console.error(err);
            alert("Error saving news");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (news) => {
        setIsEditing(true);
        setCurrentNewsId(news._id);
        setFormData({
            heading: news.heading,
            subHeading: news.subHeading || "",
            description: news.description,
            author: news.author,
            category: news.category || "General",
            tags: news.tags || [],
            image: news.image // keep existing url string or overwrite if new file
        });
        // If image is a string (url), show it in preview
        if (typeof news.image === 'string') {
            setPreviewImage(news.image);
        } else {
            setPreviewImage(null);
        }
        // Scroll to top
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this news?")) return;
        setLoading(true);
        try {
            await axios.delete(`/api/news/${id}`);
            alert("News deleted");
            fetchNews();
        } catch (err) {
            console.error(err);
            alert("Error deleting news");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto dark:text-white">
            <h1 className="text-3xl font-bold mb-6">Manage News</h1>

            {/* Form */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow mb-10">
                <h2 className="text-xl font-semibold mb-4">{isEditing ? "Edit News" : "Create New News"}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Heading */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Heading</label>
                        <input
                            type="text"
                            name="heading"
                            value={formData.heading}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
                            required
                        />
                    </div>

                    {/* SubHeading */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Sub Heading (Optional)</label>
                        <input
                            type="text"
                            name="subHeading"
                            value={formData.subHeading}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                    </div>

                    {/* Author & Category */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Author</label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Category (Layout)</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                                <option value="General">General</option>
                                <option value="Top Story">Top Story (Main Feature)</option>
                                <option value="Headline">Headline (Sidebar)</option>
                                <option value="Trending">Trending (Ticker)</option>
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Description / Content</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="5"
                            className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
                            required
                        ></textarea>
                    </div>

                    {/* Suggested Tags */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Region Tags (Click to add)</label>
                        <div className="flex flex-wrap gap-2">
                            {["The Americas", "Asia", "Europe", "Africa", "Middle East", "Oceania", "Antarctica", "World",
                                "LifeLine+", "Food", "Fitness", "Mind", "Body", "Life", "Newsletter", "Ask a Doctor",
                                "Politics", "Donald Trump", "Modi", "Elections", "Democracy", "The Brief", "Polling",
                                "Business", "Economy", "Tech", "Climate", "Personal Finance", "Future of Work",
                                "Religion", "Spirituality", "Faith", "Philosophy",
                                "Astrology", "Horoscope", "Zodiac",
                                "Sports", "Cricket", "Football", "Tennis",
                                "Science", "Space", "Environment", "Health",
                                "Technology", "AI", "Gadgets", "Cybersecurity",
                                "India", "Entertainment", "Movies", "Music", "Art", "Television", "Theatre", "Video Games",
                                "The Style", "styletopheadline", "style", "styletrending",
                                "Fashion", "fashiontopheadline", "fashiontrending",
                                "Power", "powertopheadline", "powertrending",
                                "Trends", "trendstopheadline", "trendstrending"].map(tag => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => {
                                            if (!formData.tags.includes(tag)) {
                                                setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
                                            }
                                        }}
                                        className={`px-3 py-1 rounded text-xs font-medium border ${formData.tags.includes(tag)
                                            ? "bg-red-600 text-white border-red-600"
                                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
                                            }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                        </div>
                        <div className="mt-2 text-sm text-gray-400">
                            Current Tags: {formData.tags.join(", ") || "None"}
                            {formData.tags.length > 0 && (
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, tags: [] }))}
                                    className="ml-2 text-red-400 hover:underline text-xs"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Image</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        {previewImage && (
                            <div className="mt-2 w-40 h-24 border rounded overflow-hidden">
                                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? "Saving..." : (isEditing ? "Update News" : "Create News")}
                        </button>
                        {isEditing && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* List */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
                <h2 className="text-xl font-semibold mb-4">All News</h2>
                {newsList.length === 0 ? (
                    <p className="text-gray-500">No news found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b dark:border-gray-700 text-sm uppercase text-gray-400">
                                    <th className="py-2">Image</th>
                                    <th className="py-2">Heading</th>
                                    <th className="py-2">Category</th>
                                    <th className="py-2">Date</th>
                                    <th className="py-2 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {newsList.map((news) => (
                                    <tr key={news._id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="py-3">
                                            <div className="w-16 h-10 bg-gray-200 rounded overflow-hidden">
                                                {news.image && <img src={news.image} alt="" className="w-full h-full object-cover" />}
                                            </div>
                                        </td>
                                        <td className="py-3 font-medium max-w-xs truncate" title={news.heading}>{news.heading}</td>
                                        <td className="py-3 text-sm">
                                            <span className={`px-2 py-1 rounded text-xs ${news.category === 'Top Story' ? 'bg-red-100 text-red-800' :
                                                news.category === 'Headline' ? 'bg-blue-100 text-blue-800' :
                                                    news.category === 'Trending' ? 'bg-orange-100 text-orange-800' :
                                                        'bg-gray-100 text-gray-800'
                                                }`}>
                                                {news.category || 'General'}
                                            </span>
                                        </td>
                                        <td className="py-3 text-sm text-gray-500">{new Date(news.createdAt).toLocaleDateString()}</td>
                                        <td className="py-3 text-right space-x-2">
                                            <button
                                                onClick={() => handleEdit(news)}
                                                className="text-blue-600 hover:underline text-sm"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(news._id)}
                                                className="text-red-500 hover:underline text-sm"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

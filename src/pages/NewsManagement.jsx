import React, { useState, useEffect } from "react";
import axios from "axios";

export default function NewsManagement() {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentNewsId, setCurrentNewsId] = useState(null);

    const [formData, setFormData] = useState({
        heading: "",
        subHeading: "",
        description: "",
        author: "",
        category: "General",
        tags: [],
        sections: [{ type: "image", value: null, preview: "" }, { type: "paragraph", value: "" }], // Default layout
        supporter_opinion: "",
        opponent_opinion: "",
        neutral_opinion: "",
    });

    // For handling image preview (main image if any, but now we use sections)
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        setFetching(true);
        try {
            const res = await axios.get("https://mantratravelbackend.onrender.com/api/news");
            // Ensure we always set an array, even if API returns different format
            const newsData = res.data;
            if (Array.isArray(newsData)) {
                setNewsList(newsData);
            } else if (newsData && Array.isArray(newsData.news)) {
                setNewsList(newsData.news);
            } else if (newsData && Array.isArray(newsData.data)) {
                setNewsList(newsData.data);
            } else {
                console.warn("Unexpected API response format:", newsData);
                setNewsList([]);
            }
        } catch (err) {
            console.error("Error fetching news:", err);
            setNewsList([]); // Set empty array on error to prevent crash
            alert("Failed to fetch news");
        } finally {
            setFetching(false);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addSection = (type) => {
        let newSection;
        if (type === "image") {
            newSection = { type: "image", value: null, preview: "" };
        } else if (type === "features") {
            newSection = { type: "features", value: [""] };
        } else {
            newSection = { type, value: "" };
        }
        setFormData({ ...formData, sections: [...formData.sections, newSection] });
    };

    const removeSection = (index) => {
        const newSections = [...formData.sections];
        newSections.splice(index, 1);
        setFormData({ ...formData, sections: newSections });
    };

    const handleSectionChange = (index, value) => {
        const newSections = [...formData.sections];
        newSections[index].value = value;
        if (newSections[index].type === "image" && value instanceof File) {
            newSections[index].preview = URL.createObjectURL(value);
        }
        setFormData({ ...formData, sections: newSections });
    };

    const moveSection = (index, direction) => {
        if (direction === "up" && index === 0) return;
        if (direction === "down" && index === formData.sections.length - 1) return;
        const newSections = [...formData.sections];
        const newIndex = direction === "up" ? index - 1 : index + 1;
        [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
        setFormData({ ...formData, sections: newSections });
    };

    const resetForm = () => {
        setFormData({
            heading: "",
            subHeading: "",
            description: "",
            author: "",
            category: "General",
            tags: [],
            sections: [{ type: "subheading", value: "" }, { type: "paragraph", value: "" }],
            supporter_opinion: "",
            opponent_opinion: "",
            neutral_opinion: "",
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
        data.append("supporter_opinion", formData.supporter_opinion);
        data.append("opponent_opinion", formData.opponent_opinion);
        data.append("neutral_opinion", formData.neutral_opinion);

        const contentToSubmit = formData.sections.map((section, index) => {
            if (section.type === "image" && section.value instanceof File) {
                data.append(`image_${index}`, section.value);
                return { type: "image", value: null, isNewFile: true };
            }
            return { type: section.type, value: section.value };
        });

        data.append("content", JSON.stringify(contentToSubmit));

        try {
            const config = {
                headers: { "Content-Type": "multipart/form-data" },
            };
            if (isEditing) {
                await axios.put(`https://mantratravelbackend.onrender.com/api/news/${currentNewsId}`, data, config);
                alert("News updated successfully");
            } else {
                await axios.post("https://mantratravelbackend.onrender.com/api/news", data, config);
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
        let sections = [];
        if (news.content && news.content.length > 0) {
            sections = news.content.map(c => ({
                type: c.type,
                value: c.value,
                preview: c.type === 'image' ? c.value : ''
            }));
        } else {
            // Fallback
            if (news.image) sections.push({ type: "image", value: news.image, preview: news.image });
            if (news.description) sections.push({ type: "paragraph", value: news.description });
        }

        if (sections.length === 0) {
            sections.push({ type: "subheading", value: "" });
            sections.push({ type: "paragraph", value: "" });
        }

        setIsEditing(true);
        setCurrentNewsId(news._id);
        setFormData({
            heading: news.heading || "",
            subHeading: news.subHeading || "",
            description: news.description || "",
            author: news.author || "",
            category: news.category || "General",
            tags: Array.isArray(news.tags) ? news.tags : [],
            sections: sections,
            supporter_opinion: news.supporter_opinion || "",
            opponent_opinion: news.opponent_opinion || "",
            neutral_opinion: news.neutral_opinion || "",
        });
        // Scroll to top
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this news?")) return;
        setLoading(true);
        try {
            await axios.delete(`https://mantratravelbackend.onrender.com/api/news/${id}`);
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

                    {/* Dynamic Sections */}
                    <div className="space-y-4">
                        <label className="block font-medium dark:text-gray-300">News Content Sections</label>
                        {formData.sections.map((section, index) => (
                            <div key={index} className="p-4 border rounded relative bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <button type="button" onClick={() => moveSection(index, "up")} className="p-1 hover:text-blue-500" title="Move Up">↑</button>
                                    <button type="button" onClick={() => moveSection(index, "down")} className="p-1 hover:text-blue-500" title="Move Down">↓</button>
                                    <button type="button" onClick={() => removeSection(index)} className="p-1 text-red-500 hover:text-red-700" title="Remove">×</button>
                                </div>

                                {section.type === "paragraph" ? (
                                    <div>
                                        <span className="text-xs font-bold uppercase text-gray-500 mb-2 block">Paragraph</span>
                                        <textarea
                                            value={section.value}
                                            onChange={(e) => handleSectionChange(index, e.target.value)}
                                            rows="4"
                                            className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                            required
                                        />
                                    </div>
                                ) : section.type === "subheading" ? (
                                    <div>
                                        <span className="text-xs font-bold uppercase text-gray-500 mb-2 block">Subheading</span>
                                        <input
                                            type="text"
                                            value={section.value}
                                            onChange={(e) => handleSectionChange(index, e.target.value)}
                                            className="w-full px-4 py-2 border rounded font-bold text-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                            required
                                        />
                                    </div>
                                ) : section.type === "quote" ? (
                                    <div>
                                        <span className="text-xs font-bold uppercase text-gray-500 mb-2 block">Quote</span>
                                        <textarea
                                            value={section.value}
                                            onChange={(e) => handleSectionChange(index, e.target.value)}
                                            rows="2"
                                            className="w-full px-4 py-2 border rounded italic bg-blue-50 dark:bg-gray-900 dark:border-gray-600 dark:text-white"
                                            required
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <span className="text-xs font-bold uppercase text-gray-500 mb-2 block">Image</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleSectionChange(index, e.target.files[0])}
                                            className="w-full mb-2"
                                        />
                                        {section.preview && (
                                            <img src={section.preview} alt="Preview" className="h-32 w-auto object-cover rounded" />
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={() => addSection("subheading")}
                                className="px-3 py-1 text-sm border border-purple-600 text-purple-600 rounded hover:bg-purple-50"
                            >
                                + Subheading
                            </button>
                            <button
                                type="button"
                                onClick={() => addSection("paragraph")}
                                className="px-3 py-1 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
                            >
                                + Paragraph
                            </button>
                            <button
                                type="button"
                                onClick={() => addSection("image")}
                                className="px-3 py-1 text-sm border border-green-600 text-green-600 rounded hover:bg-green-50"
                            >
                                + Image
                            </button>
                            <button
                                type="button"
                                onClick={() => addSection("quote")}
                                className="px-3 py-1 text-sm border border-yellow-600 text-yellow-600 rounded hover:bg-yellow-50"
                            >
                                + Quote
                            </button>
                        </div>
                    </div>

                    {/* Opinion Sections */}
                    <div className="space-y-4 pt-4 border-t dark:border-gray-700">
                        <h3 className="text-lg font-bold dark:text-gray-200">Opinions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-green-600 underline">Supporter Opinion</label>
                                <textarea
                                    name="supporter_opinion"
                                    value={formData.supporter_opinion}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
                                    placeholder="Enter supporter opinion..."
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-red-600 underline">Opponent Opinion</label>
                                <textarea
                                    name="opponent_opinion"
                                    value={formData.opponent_opinion}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
                                    placeholder="Enter opponent opinion..."
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-orange-600 underline">Neutral Opinion</label>
                                <textarea
                                    name="neutral_opinion"
                                    value={formData.neutral_opinion}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
                                    placeholder="Enter neutral opinion..."
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Description - Still keeping as hidden or secondary if needed, but primary content is now sections */}
                    <div className="hidden">
                        <label className="block text-sm font-medium mb-1">Description / Content</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="1"
                            className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
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
                {fetching ? (
                    <p className="text-gray-500">Loading news...</p>
                ) : !Array.isArray(newsList) || newsList.length === 0 ? (
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

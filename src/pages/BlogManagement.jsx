
import React, { useState, useEffect } from "react";
import axios from "axios";

const BlogManagement = () => {
    const [blogs, setBlogs] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentBlogId, setCurrentBlogId] = useState(null);
    const [formData, setFormData] = useState({
        heading: "",
        author: "",
        tags: [],
        country: "General",
        category: "Blog",
        section: "General",
        externalLink: "",
        sections: [{ type: "image", value: null, preview: "" }, { type: "paragraph", value: "" }], // Default layout
    });
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [filterCategory, setFilterCategory] = useState("");
    const [filterCountry, setFilterCountry] = useState("");
    const [filterSection, setFilterSection] = useState("");

    // Fetch blogs
    const fetchBlogs = async () => {
        setFetching(true);
        try {
            let url = "https://mantratravelbackend.onrender.com/api/blogs";
            const params = new URLSearchParams();
            if (filterCategory) params.append("category", filterCategory);
            if (filterCountry) params.append("country", filterCountry);
            if (filterSection) params.append("section", filterSection);

            if (params.toString()) {
                url += `?${params.toString()}`;
            }

            const res = await axios.get(url);
            const blogsData = res.data;
            if (Array.isArray(blogsData)) {
                setBlogs(blogsData);
            } else if (blogsData && Array.isArray(blogsData.blogs)) {
                setBlogs(blogsData.blogs);
            } else if (blogsData && Array.isArray(blogsData.data)) {
                setBlogs(blogsData.data);
            } else {
                console.warn("Unexpected API response format:", blogsData);
                setBlogs([]);
            }
        } catch (err) {
            console.error("Error fetching blogs", err);
            setBlogs([]);
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [filterCategory, filterCountry, filterSection]);

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

    const handleFeatureListChange = (sIdx, fIdx, val) => {
        const newSections = [...formData.sections];
        newSections[sIdx].value[fIdx] = val;
        setFormData({ ...formData, sections: newSections });
    };

    const addFeatureItem = (sIdx) => {
        const newSections = [...formData.sections];
        newSections[sIdx].value.push("");
        setFormData({ ...formData, sections: newSections });
    };

    const removeFeatureItem = (sIdx, fIdx) => {
        const newSections = [...formData.sections];
        newSections[sIdx].value.splice(fIdx, 1);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        data.append("heading", formData.heading);
        data.append("author", formData.author);
        data.append("tags", JSON.stringify(formData.tags));
        data.append("country", formData.country);
        data.append("category", formData.category);
        data.append("section", formData.section);
        data.append("externalLink", formData.externalLink);

        const contentToSubmit = formData.sections.map((section, index) => {
            if (section.type === "image" && section.value instanceof File) {
                data.append(`image_${index}`, section.value);
                return { type: "image", value: null, isNewFile: true };
            }
            return { type: section.type, value: section.value };
        });

        data.append("content", JSON.stringify(contentToSubmit));

        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "x-auth-token": token,
                },
            };

            if (isEditing) {
                await axios.put(`https://mantratravelbackend.onrender.com/api/blogs/${currentBlogId}`, data, config);
            } else {
                await axios.post("https://mantratravelbackend.onrender.com/api/blogs", data, config);
            }

            resetForm();
            fetchBlogs();
            alert(isEditing ? "Blog updated!" : "Blog created!");
        } catch (err) {
            console.error(err);
            alert("Error saving blog");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`https://mantratravelbackend.onrender.com/api/blogs/${id}`, {
                headers: { "x-auth-token": token },
            });
            fetchBlogs();
        } catch (err) {
            console.error(err);
            alert("Error deleting blog");
        }
    };

    const handleEdit = (blog) => {
        let sections = [];
        if (blog.content && blog.content.length > 0) {
            sections = blog.content.map(c => ({
                type: c.type,
                value: c.value,
                preview: c.type === 'image' ? c.value : ''
            }));
        } else {
            // Fallback for previous multi-layout version
            const paragraphs = Array.isArray(blog.paragraphs) ? blog.paragraphs : [blog.description];
            const images = Array.isArray(blog.images) ? blog.images : [blog.image];
            const maxLen = Math.max(paragraphs.length, images.length);
            for (let i = 0; i < maxLen; i++) {
                if (i < images.length && images[i]) {
                    sections.push({ type: "image", value: images[i], preview: images[i] });
                }
                if (i < paragraphs.length && paragraphs[i]) {
                    sections.push({ type: "paragraph", value: paragraphs[i] });
                }
            }
        }

        if (sections.length === 0) {
            sections.push({ type: "subheading", value: "" });
            sections.push({ type: "paragraph", value: "" });
        }

        setFormData({
            heading: blog.heading || "",
            author: blog.author || "",
            tags: Array.isArray(blog.tags) ? blog.tags : [],
            country: blog.country || "General",
            category: blog.category || "Blog",
            section: blog.section || "General",
            externalLink: blog.externalLink || "",
            sections: sections,
        });
        setCurrentBlogId(blog._id);
        setIsEditing(true);
        setShowForm(true);
    };

    const resetForm = () => {
        setFormData({
            heading: "",
            author: "",
            tags: [],
            country: "General",
            category: "Blog",
            section: "General",
            externalLink: "",
            sections: [{ type: "subheading", value: "" }, { type: "paragraph", value: "" }],
        });
        setIsEditing(false);
        setCurrentBlogId(null);
        setShowForm(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold dark:text-white">Manage Blogs</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    {showForm ? "Close Form" : "Add New Blog"}
                </button>
            </div>

            {showForm && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md">
                    <h2 className="text-xl font-bold mb-4 dark:text-white">
                        {isEditing ? "Edit Blog" : "Create New Blog"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 font-medium dark:text-gray-300">Heading</label>
                                <input
                                    name="heading"
                                    value={formData.heading}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium dark:text-gray-300">Author</label>
                                <input
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block mb-1 font-medium dark:text-gray-300">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                                    <option value="Blog">General Blog</option>
                                    <option value="Destination">Destination Content</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 font-medium dark:text-gray-300">Country</label>
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                                    <option value="General">General/Global</option>
                                    <option value="India">India</option>
                                    <option value="USA">USA</option>
                                    <option value="UK">UK</option>
                                    <option value="France">France</option>
                                    <option value="Switzerland">Switzerland</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Bali">Bali</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 font-medium dark:text-gray-300">Section</label>
                                <select
                                    name="section"
                                    value={formData.section}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                                    <option value="General">General Blog Section</option>
                                    <option value="Explorer">Explorer (Grid)</option>
                                    <option value="States">States/Regions</option>
                                    <option value="Hero">Hero/Promotional</option>
                                    <option value="Instagram">Instagram Feed</option>
                                    <option value="Testimonials">Testimonials</option>
                                    <option value="DestinationPicks">Destination Picks</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1 font-medium dark:text-gray-300">External Link (Instagram/CTA)</label>
                            <input
                                name="externalLink"
                                value={formData.externalLink}
                                onChange={handleChange}
                                placeholder="https://instagram.com/..."
                                className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium dark:text-gray-300">
                                Tags
                            </label>

                            <div className="space-y-3">
                                {/* Manual Tag Input */}
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Type custom tag (e.g., indiaexplorerwildlife)" // Updated placeholder
                                        className="flex-1 px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                const val = e.target.value.trim().toLowerCase(); // Enforce lowercase
                                                if (val && !formData.tags.includes(val)) {
                                                    setFormData({ ...formData, tags: [...formData.tags, val] });
                                                    e.target.value = '';
                                                }
                                            }
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            const input = e.currentTarget.previousElementSibling;
                                            const val = input.value.trim().toLowerCase(); // Enforce lowercase
                                            if (val && !formData.tags.includes(val)) {
                                                setFormData({ ...formData, tags: [...formData.tags, val] });
                                                input.value = '';
                                            }
                                        }}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200"
                                    >
                                        Add
                                    </button>
                                </div>

                                {/* Selected Tags Display */}
                                <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                                    {formData.tags.length === 0 && (
                                        <span className="text-gray-400 text-sm">No tags selected</span>
                                    )}
                                    {formData.tags.map(tag => (
                                        <span key={tag} className="flex items-center gap-1 bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full dark:bg-blue-900 dark:text-blue-200">
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setFormData({
                                                        ...formData,
                                                        tags: formData.tags.filter(t => t !== tag)
                                                    });
                                                }}
                                                className="hover:text-blue-600 dark:hover:text-blue-400 font-bold ml-1"
                                            >
                                                &times;
                                            </button>
                                        </span>
                                    ))}
                                </div>

                                {/* Available Tags Selection */}
                                <div className="p-3 border rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-600">
                                    <p className="text-xs text-gray-500 mb-2 dark:text-gray-400">Suggested tags:</p>
                                    <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                                        {[
                                            "culture", "exploreculture", "wildlife", "explorewildlife",
                                            "heritage", "exploareheritage", "adventure", "exploreadventure",
                                            "cities", "explorecities", "spirituality", "explorespirituality",
                                            "nature", "explorenature", "firstexperience", "explore",
                                            "plantrip", "art&culture",
                                            // Explorer
                                            "indiaexplorerwildlife", "indiaexplorerheritage", "indiaexplorerspirituality",
                                            "indiaexploreradventure", "indiaexplorerarts", "indiaexplorernature",
                                            "indiaexplorerbeaches", "indiaexplorermajorcities",

                                            // States
                                            "indiastatesheavenlyhimachal", "indiastatesdazzlingdelhi", "indiastatesregalrajasthan",

                                            // Things To Do
                                            "indiathingstodoroadtrips", "indiathingstodoscenichighways", "indiathingstodobikinginindia",
                                            "indiathingstodohikinginindia", "indiathingstodotrainrides", "indiathingstodowalkingtrails",
                                            "indiathingstodorockclimbing", "indiathingstodotrekkinginindia", "indiathingstodoparagliding",
                                            "indiathingstodosafari(wildlife)", "indiathingstodojunglesafari", "indiathingstodosnowadventures",
                                            "indiathingstodoscubadiving", "indiathingstodokayaking",

                                            // Flavours
                                            "indiaflavoursofnorthindianfood", "indiaflavoursofnortheastfood", "indiaflavoursofeastindiafood",
                                            "indiaflavoursofwestindianfood", "indiaflavoursofsouthindianfood", "indiaflavoursofcentralindianfood",

                                            // Art & Culture
                                            "indiaartcultureartmuseums", "indiaartculturelocalcrafts", "indiaartcultureindianarchitecture",
                                            "indiaartcultureperformingarts", "indiaartculturelivingculture", "indiaartculturedailyheritage",
                                            "indiaartculturetheatre", "indiaartcultureartfestivals",

                                            // Packing Guides
                                            "indiapackingguidessummeressentials", "indiapackingguideswintergear", "indiapackingguidesmonsoonready",

                                            // Plan Your Trip
                                            "indiaplanyourtripdiscoverindia", "indiaplanyourtriptimingyourtrip", "indiaplanyourtriptransportguide",
                                            "indiaplanyourtripvisainfo", "indiaplanyourtripstay&dine", "indiaplanyourtripcultureguide"
                                        ].map(tag => {
                                            const isSelected = formData.tags.includes(tag);
                                            return (
                                                <button
                                                    key={tag}
                                                    type="button"
                                                    onClick={() => {
                                                        if (isSelected) {
                                                            setFormData({
                                                                ...formData,
                                                                tags: formData.tags.filter(t => t !== tag)
                                                            });
                                                        } else {
                                                            setFormData({
                                                                ...formData,
                                                                tags: [...formData.tags, tag]
                                                            });
                                                        }
                                                    }}
                                                    className={`text-xs px-3 py-1 rounded-full border transition-colors ${isSelected
                                                        ? "bg-blue-600 text-white border-blue-600"
                                                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-500 dark:hover:bg-gray-600"
                                                        }`}
                                                >
                                                    {tag}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="block font-medium dark:text-gray-300">Blog Content Sections</label>
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
                                    ) : section.type === "features" ? (
                                        <div>
                                            <span className="text-xs font-bold uppercase text-gray-500 mb-2 block">Features List</span>
                                            <div className="space-y-2">
                                                {Array.isArray(section.value) && section.value.map((feature, fIdx) => (
                                                    <div key={fIdx} className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            value={feature}
                                                            onChange={(e) => handleFeatureListChange(index, fIdx, e.target.value)}
                                                            className="flex-1 px-4 py-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                                            placeholder="Enter feature..."
                                                            required
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeFeatureItem(index, fIdx)}
                                                            className="px-2 text-red-500 font-bold"
                                                        >
                                                            -
                                                        </button>
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() => addFeatureItem(index)}
                                                    className="text-sm text-blue-600 font-semibold hover:underline"
                                                >
                                                    + Add Item
                                                </button>
                                            </div>
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
                                <button
                                    type="button"
                                    onClick={() => addSection("features")}
                                    className="px-3 py-1 text-sm border border-pink-600 text-pink-600 rounded hover:bg-pink-50"
                                >
                                    + Features
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                            >
                                {loading ? "Saving..." : isEditing ? "Update Blog" : "Create Blog"}
                            </button>
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium dark:text-gray-300 mb-1">Filter by Category</label>
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            <option value="">All Categories</option>
                            <option value="Blog">General Blog</option>
                            <option value="Destination">Destination Content</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium dark:text-gray-300 mb-1">Filter by Country</label>
                        <select
                            value={filterCountry}
                            onChange={(e) => setFilterCountry(e.target.value)}
                            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            <option value="">All Countries</option>
                            <option value="General">General/Global</option>
                            <option value="India">India</option>
                            <option value="USA">USA</option>
                            <option value="UK">UK</option>
                            <option value="France">France</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Australia">Australia</option>
                            <option value="Bali">Bali</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium dark:text-gray-300 mb-1">Filter by Section</label>
                        <select
                            value={filterSection}
                            onChange={(e) => setFilterSection(e.target.value)}
                            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            <option value="">All Sections</option>
                            <option value="General">General Blog</option>
                            <option value="Explorer">Explorer</option>
                            <option value="States">States/Regions</option>
                            <option value="Hero">Hero</option>
                            <option value="Instagram">Instagram</option>
                            <option value="Testimonials">Testimonials</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Blog List */}
            {fetching ? (
                <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-gray-400">Loading blogs...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.isArray(blogs) && blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <div key={blog._id} className="bg-white dark:bg-gray-800 rounded shadow overflow-hidden">
                                <img
                                    src={blog.image || "https://via.placeholder.com/300"}
                                    alt={blog.heading}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-bold dark:text-white mb-2 line-clamp-2">{blog.heading}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">By {blog.author}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {Array.isArray(blog.tags) && blog.tags.map((tag, idx) => (
                                            <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded dark:bg-blue-900 dark:text-blue-200">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => handleEdit(blog)}
                                            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(blog._id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-8">
                            <p className="text-gray-600 dark:text-gray-400">No blogs found. Create your first blog!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default BlogManagement;

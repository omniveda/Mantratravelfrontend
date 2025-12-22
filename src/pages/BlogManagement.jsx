
import React, { useState, useEffect } from "react";
import axios from "axios";

const BlogManagement = () => {
    const [blogs, setBlogs] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentBlogId, setCurrentBlogId] = useState(null);
    const [formData, setFormData] = useState({
        heading: "",
        description: "",
        author: "",
        tags: [],
        image: null,
    });
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fetch blogs
    const fetchBlogs = async () => {
        try {
            const res = await axios.get("/api/blogs");
            setBlogs(res.data);
        } catch (err) {
            console.error("Error fetching blogs", err);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleChange = (e) => {
        if (e.target.name === "image") {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        data.append("heading", formData.heading);
        data.append("description", formData.description);
        data.append("author", formData.author);
        data.append("tags", JSON.stringify(formData.tags));
        if (formData.image) {
            data.append("image", formData.image);
        }

        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "x-auth-token": token,
                },
            };

            if (isEditing) {
                await axios.put(`/api/blogs/${currentBlogId}`, data, config);
            } else {
                await axios.post("/api/blogs", data, config);
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
            await axios.delete(`/api/blogs/${id}`, {
                headers: { "x-auth-token": token },
            });
            fetchBlogs();
        } catch (err) {
            console.error(err);
            alert("Error deleting blog");
        }
    };

    const handleEdit = (blog) => {
        setFormData({
            heading: blog.heading,
            description: blog.description,
            author: blog.author,
            tags: blog.tags,
            image: null, // Reset image input on edit start
        });
        setCurrentBlogId(blog._id);
        setIsEditing(true);
        setShowForm(true);
    };

    const resetForm = () => {
        setFormData({
            heading: "",
            description: "",
            author: "",
            tags: [],
            image: null,
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

                        <div>
                            <label className="block mb-1 font-medium dark:text-gray-300">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="5"
                                className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium dark:text-gray-300">Image</label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                className="w-full"
                            />
                            {isEditing && !formData.image && (
                                <p className="text-sm text-gray-500 mt-1">Leave empty to keep current image</p>
                            )}
                        </div>
                        <div className="flex gap-4">
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

            {/* Blog List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
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
                                {blog.tags && blog.tags.map((tag, idx) => (
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
                ))}
            </div>
        </div>
    );
};

export default BlogManagement;

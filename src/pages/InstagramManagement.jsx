import React, { useState, useEffect } from "react";
import axios from "axios";

const InstagramManagement = () => {
    const [instagrams, setInstagrams] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        country: "General",
        link: "",
        image: null,
        preview: ""
    });
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const fetchInstagrams = async () => {
        setFetching(true);
        try {
            const res = await axios.get("https://mantratravelbackend.onrender.com/api/instagram");
            setInstagrams(res.data);
        } catch (err) {
            console.error("Error fetching instagram accounts", err);
            setInstagrams([]);
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchInstagrams();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            const file = files[0];
            setFormData({
                ...formData,
                image: file,
                preview: URL.createObjectURL(file)
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        data.append("name", formData.name);
        data.append("country", formData.country);
        data.append("link", formData.link);
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
                await axios.put(`https://mantratravelbackend.onrender.com/api/instagram/${currentId}`, data, config);
                alert("Instagram account updated!");
            } else {
                await axios.post("https://mantratravelbackend.onrender.com/api/instagram", data, config);
                alert("Instagram account added!");
            }

            resetForm();
            fetchInstagrams();
        } catch (err) {
            console.error(err);
            alert("Error saving instagram account");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`https://mantratravelbackend.onrender.com/api/instagram/${id}`, {
                headers: { "x-auth-token": token },
            });
            fetchInstagrams();
        } catch (err) {
            console.error(err);
            alert("Error deleting instagram account");
        }
    };

    const handleEdit = (item) => {
        setFormData({
            name: item.name,
            country: item.country,
            link: item.link,
            image: null,
            preview: item.image
        });
        setCurrentId(item._id);
        setIsEditing(true);
        setShowForm(true);
    };

    const resetForm = () => {
        setFormData({
            name: "",
            country: "General",
            link: "",
            image: null,
            preview: ""
        });
        setIsEditing(false);
        setCurrentId(null);
        setShowForm(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold dark:text-white">Manage Instagram</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
                >
                    {showForm ? "Close Form" : "Add Instagram Account"}
                </button>
            </div>

            {showForm && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md transition-all duration-300">
                    <h2 className="text-xl font-bold mb-4 dark:text-white">
                        {isEditing ? "Edit Instagram Account" : "Add New Instagram Account"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 font-medium dark:text-gray-300">Account Name</label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. @mantra_travel"
                                    className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium dark:text-gray-300">Country Tag</label>
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
                        </div>

                        <div>
                            <label className="block mb-1 font-medium dark:text-gray-300">Instagram Link</label>
                            <input
                                name="link"
                                value={formData.link}
                                onChange={handleChange}
                                placeholder="https://www.instagram.com/account_name"
                                className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium dark:text-gray-300">Profile Image</label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                className="w-full text-gray-400"
                                required={!isEditing}
                            />
                            {formData.preview && (
                                <div className="mt-2">
                                    <img src={formData.preview} alt="Preview" className="h-24 w-24 object-cover rounded-full border-2 border-pink-500" />
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 transition"
                            >
                                {loading ? "Saving..." : isEditing ? "Update Account" : "Add Account"}
                            </button>
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {fetching ? (
                <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-gray-400">Loading accounts...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {instagrams.length > 0 ? (
                        instagrams.map((item) => (
                            <div key={item._id} className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden group">
                                <div className="p-6 flex flex-col items-center text-center">
                                    <div className="relative mb-4">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity p-1"></div>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-24 h-24 object-cover rounded-full border-2 border-white dark:border-gray-700 relative z-10"
                                        />
                                    </div>
                                    <h3 className="text-lg font-bold dark:text-white mb-1">{item.name}</h3>
                                    <span className="text-sm px-2 py-0.5 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 rounded-full mb-4">
                                        {item.country}
                                    </span>
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-pink-500 hover:underline text-sm mb-6 truncate w-full"
                                    >
                                        Visit Instagram
                                    </a>
                                    <div className="flex gap-2 w-full">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="flex-1 px-3 py-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-sm transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="flex-1 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow">
                            <p className="text-gray-500 dark:text-gray-400 italic">No Instagram accounts found. Start by adding one!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default InstagramManagement;

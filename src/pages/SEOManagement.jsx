import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const SEOManagement = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        keywords: ""
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchSEO = async () => {
            try {
                const res = await axios.get("https://mantratravelbackend.onrender.com/api/seo");
                if (res.data) {
                    setFormData({
                        title: res.data.title || "",
                        description: res.data.description || "",
                        keywords: res.data.keywords || ""
                    });
                }
            } catch (err) {
                console.error("Error fetching SEO:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSEO();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = localStorage.getItem("token");
            await axios.put("https://mantratravelbackend.onrender.com/api/seo", formData, {
                headers: { "x-auth-token": token }
            });
            Swal.fire({
                icon: "success",
                title: "SEO Updated",
                text: "Your SEO settings have been saved successfully.",
                timer: 2000,
                showConfirmButton: false
            });
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.response?.data?.message || "Failed to update SEO"
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-white text-center py-10">Loading SEO settings...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold dark:text-white">SEO Management</h1>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Global Page Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-transparent dark:text-white"
                            placeholder="e.g. Mantra - Your Universal Travel Companion"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Meta Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-transparent dark:text-white"
                            placeholder="Briefly describe your website for search engines..."
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Keywords (comma separated)
                        </label>
                        <input
                            type="text"
                            name="keywords"
                            value={formData.keywords}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-transparent dark:text-white"
                            placeholder="e.g. travel, tours, india, adventures"
                            required
                        />
                    </div>

                    <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition disabled:opacity-50"
                        >
                            {saving ? "Saving Changes..." : "Save SEO Settings"}
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
                <h3 className="text-blue-800 dark:text-blue-300 font-bold mb-2">Why SEO matters?</h3>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                    Your page title, description, and keywords help search engines understand what your site is about.
                    Well-written SEO tags can improve your ranking on Google and increase your website traffic.
                </p>
            </div>
        </div>
    );
};

export default SEOManagement;

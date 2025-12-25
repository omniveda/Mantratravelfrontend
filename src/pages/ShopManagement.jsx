import React, { useState, useEffect } from "react";
import axios from "axios";

const ShopManagement = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        affiliateLink: "",
        image: null,
    });
    const [loading, setLoading] = useState(false);
    const [editId, setEditId] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("https://mantratravelbackend.onrender.com/api/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("affiliateLink", formData.affiliateLink);
        if (formData.image) {
            data.append("image", formData.image);
        }

        try {
            if (editId) {
                await axios.put(`https://mantratravelbackend.onrender.com/api/products/${editId}`, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "x-auth-token": token,
                    },
                });
                alert("Product updated successfully!");
                setEditId(null);
            } else {
                await axios.post("https://mantratravelbackend.onrender.com/api/products", data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "x-auth-token": token,
                    },
                });
                alert("Product added successfully!");
            }
            setFormData({ name: "", description: "", affiliateLink: "", image: null });
            fetchProducts();
        } catch (error) {
            console.error("Error saving product:", error);
            alert("Failed to save product");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product) => {
        setEditId(product._id);
        setFormData({
            name: product.name,
            description: product.description,
            affiliateLink: product.affiliateLink,
            image: null, // Reset image input as we might not want to change it
        });
        window.scrollTo(0, 0); // Scroll to form
    };

    const handleCancelEdit = () => {
        setEditId(null);
        setFormData({ name: "", description: "", affiliateLink: "", image: null });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await axios.delete(`https://mantratravelbackend.onrender.com/api/products/${id}`, {
                headers: { "x-auth-token": token },
            });
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">Shop Management</h1>

            {/* Add/Edit Product Form */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
                    {editId ? "Edit Product" : "Add New Product"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50 dark:bg-gray-700 dark:text-white"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Affiliate Link</label>
                        <input
                            type="url"
                            name="affiliateLink"
                            value={formData.affiliateLink}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Product Image {editId && "(Leave empty to keep existing)"}
                        </label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            required={!editId}
                            className="mt-1 block w-full text-gray-700 dark:text-gray-300"
                        />
                    </div>
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? "Saving..." : (editId ? "Update Product" : "Add Product")}
                        </button>
                        {editId && (
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Product List */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Existing Products</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img src={product.image} alt={product.name} className="h-12 w-12 object-cover rounded" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</div>
                                        <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                                            View Link
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ShopManagement;

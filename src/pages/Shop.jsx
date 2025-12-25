import React, { useState, useEffect } from "react";
import axios from "axios";
import bgImage from "../assets/bg-shop.jpg";

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-black text-white min-h-screen">
            {/* Header Section */}
            <div className="relative h-[60vh] w-full">
                {/* Placeholder for background image if specific one exists, else using a gradient or a generic one */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${bgImage})` }}
                >
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
                        <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4 tracking-wider">
                            CURATED SHOP
                        </h1>
                        <p className="text-lg md:text-xl font-light text-gray-200 tracking-wide max-w-2xl">
                            Discover our exclusive collection of travel essentials and recommended gear.
                        </p>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {products.map((product) => (
                            <div key={product._id} className="group flex flex-col bg-[#111] border border-gray-800 hover:border-white/30 transition duration-300">
                                {/* Image Container */}
                                <div className="relative h-96 overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500 ease-in-out"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition duration-300" />
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-serif mb-3 tracking-wide">{product.name}</h3>
                                    <p className="text-gray-400 mb-8 font-light leading-relaxed flex-grow">
                                        {product.description}
                                    </p>

                                    <a
                                        href={product.affiliateLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block text-center border border-white px-8 py-3 text-sm tracking-widest hover:bg-white hover:text-black transition duration-300 uppercase"
                                    >
                                        Purchase
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && products.length === 0 && (
                    <div className="text-center py-10 text-gray-400">
                        <p>No products available at the moment. Check back soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
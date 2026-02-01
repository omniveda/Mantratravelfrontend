import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("twk_token_687cce91d6919b1917ede331");
        localStorage.removeItem("visitor_id");
        localStorage.removeItem("twk_687cce91d6919b1917ede331");
        navigate("/login");
    };

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white flex flex-col h-screen sticky top-0">
                <div className="p-6 text-2xl font-bold border-b border-gray-700">
                    Admin Panel
                </div>
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
                    <Link
                        to="/admin/blogs"
                        className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                    >
                        Manage Blogs
                    </Link>
                    <Link
                        to="/admin/news"
                        className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                    >
                        Manage News
                    </Link>
                    <Link
                        to="/admin/shop"
                        className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                    >
                        Manage Shop
                    </Link>
                    <Link
                        to="/admin/instagram"
                        className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                    >
                        Manage Instagram
                    </Link>
                    <Link
                        to="/admin/analytics"
                        className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                    >
                        Analytics Dashboard
                    </Link>
                    <Link
                        to="/admin/seo"
                        className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                    >
                        Manage SEO
                    </Link>
                    {/* Add more links here if needed */}
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left hover:bg-gray-700 rounded transition text-red-400"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;

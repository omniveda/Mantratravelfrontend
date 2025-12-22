import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white flex flex-col">
                <div className="p-6 text-2xl font-bold border-b border-gray-700">
                    Admin Panel
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        to="/admin/blogs"
                        className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                    >
                        Manage Blogs
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

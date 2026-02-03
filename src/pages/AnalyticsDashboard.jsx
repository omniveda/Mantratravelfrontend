import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    PieChart,
    Pie
} from "recharts";

const AnalyticsDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("https://mantratravelbackend.onrender.com/api/analytics/stats", {
                headers: { "x-auth-token": token }
            });
            setStats(res.data);
        } catch (err) {
            console.error("Error fetching stats:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-64 text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-3">Loading analytics...</span>
        </div>
    );

    if (!stats) return <div className="text-white">Error loading analytics.</div>;

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

    return (
        <div className="space-y-8 animate-fadeIn">
            <h1 className="text-3xl font-bold dark:text-white">Analytics Dashboard</h1>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Visits (30d)</p>
                    <p className="text-3xl font-bold dark:text-white">{stats.totalVisits}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-green-500">
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Unique Visitors (30d)</p>
                    <p className="text-3xl font-bold dark:text-white">{stats.uniqueVisitors}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Top Page Views</p>
                    <p className="text-3xl font-bold dark:text-white">{stats.pageViews[0]?.count || 0}</p>
                    <p className="text-xs text-gray-400 mt-1 truncate">{stats.pageViews[0]?._id}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-orange-500">
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Tracking Status</p>
                    <p className="text-xl font-bold text-green-500">Active</p>
                </div>
            </div>

            {/* Traffic Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-6 dark:text-white text-gray-800">Traffic Trend (Last 30 Days)</h3>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={stats.dailyVisits}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis
                                dataKey="date"
                                stroke="#9CA3AF"
                                tick={{ fontSize: 12 }}
                                tickFormatter={(str) => str.split('-').slice(1).join('/')}
                            />
                            <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#F3F4F6' }}
                                itemStyle={{ color: '#60A5FA' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="visits"
                                stroke="#3B82F6"
                                strokeWidth={3}
                                dot={{ fill: '#3B82F6', r: 4 }}
                                activeDot={{ r: 6 }}
                                name="Total Visits"
                            />
                            <Line
                                type="monotone"
                                dataKey="unique"
                                stroke="#10B981"
                                strokeWidth={2}
                                dot={{ fill: '#10B981', r: 3 }}
                                name="Unique Visitors"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top Pages Bar Chart */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold mb-6 dark:text-white text-gray-800">Most Visited Pages</h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.pageViews} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="_id"
                                    type="category"
                                    stroke="#9CA3AF"
                                    width={120}
                                    tick={{ fontSize: 11 }}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#F3F4F6' }}
                                />
                                <Bar dataKey="count" fill="#3B82F6" radius={[0, 4, 4, 0]}>
                                    {stats.pageViews.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Popular Pages Table */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg overflow-hidden">
                    <h3 className="text-xl font-bold mb-6 dark:text-white text-gray-800">Page Popularity</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                                <tr>
                                    <th className="px-4 py-3">Page Path</th>
                                    <th className="px-4 py-3 text-right">Views</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {stats.pageViews.map((page, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <td className="px-4 py-3 text-sm font-medium dark:text-white truncate max-w-[200px]">{page._id}</td>
                                        <td className="px-4 py-3 text-sm text-right font-bold text-blue-500">{page.count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;

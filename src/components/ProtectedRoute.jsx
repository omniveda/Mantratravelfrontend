import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!token || !user.isAdmin) {
        // If no token or user is not an admin, redirect to home page
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;

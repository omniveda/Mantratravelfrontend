import ReactGA from "react-ga4";
import axios from "axios";

const TRACKING_ID = "G-XXXXXXXXXX"; // User should replace this in .env later
const API_URL = "https://mantratravelbackend.onrender.com/api/analytics";

// Simple persistent visitor ID
const getVisitorId = () => {
    let id = localStorage.getItem("visitor_id");
    if (!id) {
        id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        localStorage.setItem("visitor_id", id);
    }
    return id;
};

export const initGA = () => {
    ReactGA.initialize(TRACKING_ID);
};

export const trackPageView = (path) => {
    // 1. track with GA4
    ReactGA.send({ hitType: "pageview", page: path });

    // 2. track with Internal Analytics
    const visitorId = getVisitorId();
    axios.post(`${API_URL}/track`, {
        page: path,
        visitorId: visitorId,
        browser: navigator.userAgent,
        device: window.innerWidth < 768 ? "Mobile" : "Desktop",
    }).catch(err => console.error("Internal analytics error:", err));
};

export const trackEvent = (category, action, label) => {
    ReactGA.event({
        category,
        action,
        label,
    });
};

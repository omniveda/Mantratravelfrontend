import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/navbar";
import Login from "./pages/Login";
import AdminLayout from "./components/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import BlogManagement from "./pages/BlogManagement";
import NewsManagement from "./pages/NewsManagement";
import ShopManagement from "./pages/ShopManagement";
import InstagramManagement from "./pages/InstagramManagement";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import SEOManagement from "./pages/SEOManagement";
import SEOHelmet from "./components/SEOHelmet";
import { initGA, trackPageView } from "./utils/analytics";
import Footer from "./components/Footer";
import Nature from "./pages/Nature";
import Wildlife from "./pages/Wildlife";
import Adventures from "./pages/Adventures";
import Heritage from "./pages/Heritage";
import Spirituality from "./pages/Spirituality";
import Cities from "./pages/Cities";
import Culture from "./pages/Culture";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail"; // Import the new component
import ScrollToTop from "./components/ScrollToTop";
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Destinations = lazy(() => import("./pages/Destinations"));
const Shop = lazy(() => import("./pages/Shop"));
const News = lazy(() => import("./pages/News"));
const IndiaCorner = lazy(() => import("./pages/IndiaCorner"));
const WorldCorner = lazy(() => import("./pages/WorldCorner"));
const TermsAndCondition = lazy(() => import("./pages/TermsAndCondition"));
const PrivacyPolicy = lazy(() => import("./pages/privacyPolicy"));

const PublicLayout = () => (
    <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
);



function App() {
    const location = useLocation();

    useEffect(() => {
        initGA();
    }, []);

    useEffect(() => {
        trackPageView(location.pathname + location.search);
    }, [location]);

    return (
        <HelmetProvider>
            <SEOHelmet />
            <Suspense fallback={<div className="w-full h-screen bg-[#1e1e1e] flex justify-center items-center text-white text-2xl">Loading...</div>}>
                <ScrollToTop />
                <Routes>
                    {/* Public Routes */}
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/destinations" element={<Destinations />} />
                        <Route path="/destinations/india-corner" element={<IndiaCorner />} />
                        <Route path="/destinations/world-corner" element={<WorldCorner />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:id" element={<BlogDetail />} />
                        <Route path="/nature" element={<Nature />} />
                        <Route path="/wildlife" element={<Wildlife />} />
                        <Route path="/adventures" element={<Adventures />} />
                        <Route path="/heritage" element={<Heritage />} />
                        <Route path="/spirituality" element={<Spirituality />} />
                        <Route path="/cities" element={<Cities />} />
                        <Route path="/culture" element={<Culture />} />
                        <Route path="/terms" element={<TermsAndCondition />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    </Route>

                    <Route path="/login" element={<Login />} />

                    {/* Admin Routes */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <AdminLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<BlogManagement />} />
                        <Route path="blogs" element={<BlogManagement />} />
                        <Route path="news" element={<NewsManagement />} />
                        <Route path="shop" element={<ShopManagement />} />
                        <Route path="instagram" element={<InstagramManagement />} />
                        <Route path="analytics" element={<AnalyticsDashboard />} />
                        <Route path="seo" element={<SEOManagement />} />
                    </Route>
                </Routes>
            </Suspense>
        </HelmetProvider>
    );
}

export default App;

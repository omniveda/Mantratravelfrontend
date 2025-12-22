import React, { lazy, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import Login from "./pages/Login";
import AdminLayout from "./components/AdminLayout";
import BlogManagement from "./pages/BlogManagement";
import Footer from "./components/Footer";
import Nature from "./pages/Nature";
import Wildlife from "./pages/Wildlife";
import Adventures from "./pages/Adventures";
import Heritage from "./pages/Heritage";
import Spirituality from "./pages/Spirituality";
import Cities from "./pages/Cities";
import Culture from "./pages/Culture";
import Blog from "./pages/Blog";
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Destinations = lazy(() => import("./pages/Destinations"));
const Shop = lazy(() => import("./pages/Shop"));  
const News = lazy(() => import("./pages/News"));
const IndiaCorner = lazy(() => import("./pages/IndiaCorner"));
const WorldCorner = lazy(() => import("./pages/WorldCorner"));

const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

function App() {

  return (
    <Suspense fallback={<div className="w-full h-screen bg-[#1e1e1e] flex justify-center items-center text-white text-2xl">Loading...</div>}>
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
          <Route path="/nature" element={<Nature />} />
          <Route path="/wildlife" element={<Wildlife />} />
          <Route path="/adventures" element={<Adventures />} />
          <Route path="/heritage" element={<Heritage />} />
          <Route path="/spirituality" element={<Spirituality />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/culture" element={<Culture />} />
        </Route>

        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<BlogManagement />} />
          <Route path="blogs" element={<BlogManagement />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;

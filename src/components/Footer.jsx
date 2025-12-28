import Footerimg from "../assets/Home_page/Footer.png"
import logo from "../assets/logo/logo.png"
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

export default function Footer() {
    return (
        <footer className="relative text-white">

            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        `linear-gradient(to right, rgba(0,0,0,.85), rgba(0,0,0,.6)), url(${Footerimg})`,
                }}
            />

            {/* Content */}
            <div className="relative max-w-7xl mx-auto px-10 py-20">

                <div className="grid grid-cols-1 md:grid-cols-5 gap-12">

                    {/* Column 1 */}
                    <div>
                        <h4 className="font-bold mb-4 tracking-wide">INDIAN NEWS</h4>
                        <ul className="space-y-2 text-sm opacity-90 ">
                            <li className="cursor-pointer hover:scale-105 transition duration-300 ease-in-out" onClick={() => window.location.href = "/news"}>Global News</li>
                            <li className="cursor-pointer hover:scale-105 transition duration-300 ease-in-out" onClick={() => window.location.href = "/news"}>Trending News</li>
                            <li className="cursor-pointer hover:scale-105 transition duration-300 ease-in-out" onClick={() => window.location.href = "/news"}>Politics</li>
                            <li className="cursor-pointer hover:scale-105 transition duration-300 ease-in-out" onClick={() => window.location.href = "/news"}>Shopping</li>
                        </ul>

                        <h4 className="font-bold mt-8 mb-3">FOLLOW US</h4>
                        <div className="flex gap-3">
                            <span className="w-8 h-8 border rounded-full flex items-center justify-center">F</span>
                            <span className="w-8 h-8 border rounded-full flex items-center justify-center">T</span>
                            <span className="w-8 h-8 border rounded-full flex items-center justify-center">I</span>
                            <span className="w-8 h-8 border rounded-full flex items-center justify-center">Y</span>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h4 className="font-bold mb-4">HOME</h4>
                        <ul className="space-y-2 text-sm opacity-90">
                            <li className="cursor-pointer hover:scale-105 transition duration-300 ease-in-out" onClick={() => window.location.href = "/about"}>About</li>
                            <li className="cursor-pointer hover:scale-105 transition duration-300 ease-in-out" onClick={() => window.location.href = "/destination"}>Blog</li>
                            <li className="cursor-pointer hover:scale-105 transition duration-300 ease-in-out" onClick={() => window.location.href = "/destinations/india-corner"}>India Corner</li>
                            <li className="cursor-pointer hover:scale-105 transition duration-300 ease-in-out" onClick={() => window.location.href = "/destinations/world-corner"}>World Corners</li>
                        </ul>

                        <h4 className="font-bold mt-8 mb-2">BECOME A GUEST AUTHOR</h4>
                        <p className="text-sm opacity-80">Request a blog post</p>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h4 className="font-bold mb-4">QUICK LINKS</h4>
                        <ul className="space-y-2 text-sm opacity-90">
                            <li className="cursor-pointer hover:scale-105 transition duration-300 ease-in-out" onClick={() => window.location.href = "/nature"}>Nature</li>
                            <li className="cursor-pointer hover:scale-105 transition duration-300 ease-in-out" onClick={() => window.location.href = "/wildlife"}>Wildlife</li>
                            <li className="cursor-pointer hover:scale-105 transition duration-300 ease-in-out" onClick={() => window.location.href = "/adventures"}>Adventures</li>
                            <li className="cursor-pointer hover:scale-105 transition duration-300 ease-in-out" onClick={() => window.location.href = "/heritage"}>Heritage</li>
                            <li className="cursor-pointer hover:scale-105 transition duration-300 ease-in-out" onClick={() => window.location.href = "/spirituality"}>Spirituality</li>
                            <li className="cursor-pointer hover:scale-105 transition duration-300 ease-in-out" onClick={() => window.location.href = "/cities"}>Cities</li>
                            <li className="cursor-pointer hover:scale-105 transition duration-300 ease-in-out" onClick={() => window.location.href = "/culture"}>Culture</li>
                        </ul>
                    </div>

                    {/* Column 4 */}
                    <div>
                        <h4 className="font-bold mb-4">Newsletter</h4>
                        <p className="text-sm opacity-80 mb-4">
                            Sign up for exciting news, learn more about our events and get
                            great travel ideas.
                        </p>

                        <input
                            type="email"
                            placeholder="YOUR EMAIL ADDRESS"
                            className="w-full bg-transparent border border-white/40 px-4 py-2 mb-3 outline-none text-sm"
                        />

                        <button
                            onClick={() => {
                                Swal.fire({
                                    title: 'Subscribed!',
                                    text: 'Thank you for subscribing to our newsletter.',
                                    icon: 'success',
                                    confirmButtonText: 'Cool'
                                });
                            }}
                            className="w-full border border-white py-2 text-sm hover:bg-white hover:text-black transition"
                        >
                            SUBSCRIBE
                        </button>
                    </div>
                    <div className=" flex flex-col items-center justify-center text-center">
                        <img src={logo} alt="" className="w-24 h-22 rounded-full" />
                        <h2 className="text-4xl  mt-2" style={{ fontFamily: "'Brush Script MT', cursive" }}>Voyabyte</h2>
                    </div>
                </div>

                {/* Divider */}
                <div className="flex items-center justify-between">
                    <div className="border-t border-white/30 mt-16 pt-6 text-center text-xs opacity-70">
                        Part of MANTRA ©2025 BuzzFeed, Inc. All rights reserved.
                    </div>
                    <div className="border-t border-white/30 mt-16 pt-6 text-center text-xs opacity-70">
                        <Link to="/terms" className="hover:text-gray-300">Terms & Condition</Link> | <Link to="/privacy-policy" className="hover:text-gray-300">Privacy Policy</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}

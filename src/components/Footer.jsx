import Footerimg from "../assets/Home_page/Footer.png"
import logo from "../assets/logo/logo.png"

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
            <ul className="space-y-2 text-sm opacity-90">
              <li>Global News</li>
              <li>Trending News</li>
              <li>Politics</li>
              <li>Shopping</li>
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
              <li>About</li>
              <li>Blog</li>
              <li>India Corner</li>
              <li>World Corners</li>
            </ul>

            <h4 className="font-bold mt-8 mb-2">BECOME A GUEST AUTHOR</h4>
            <p className="text-sm opacity-80">Request a blog post</p>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-bold mb-4">QUICK LINKS</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>Attractions</li>
              <li>Explore Destinations</li>
              <li>Adventure</li>
              <li>Culture</li>
              <li>Budget</li>
              <li>Luxury</li>
              <li>Food</li>
              <li>FAQs</li>
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

            <button className="w-full border border-white py-2 text-sm hover:bg-white hover:text-black transition">
              SUBSCRIBE
            </button>
          </div>
          <div className=" flex flex-col items-center justify-center text-center">
            <img src={logo} alt="" className="w-24 h-24 rounded-full" />
            <h2 className="text-4xl  mt-2" style={{fontFamily: "'Brush Script MT', cursive"}}>The Mantra</h2>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/30 mt-16 pt-6 text-center text-xs opacity-70">
          Part of MANTRA ©2025 BuzzFeed, Inc. All rights reserved |
          Disclaimer | Privacy Policy
        </div>

      </div>
    </footer>
  );
}

import ult_trav_book from "../assets/Home_page/ult_trav_book.png";
import ult_trav_bag from "../assets/Home_page/ult_trav_icon1.png";
import ult_trav_locator from "../assets/Home_page/ult_trav_icon2.png";
import ult_trav_plane from "../assets/Home_page/ult_trav_icon3.png";
import ult_trav_tree from "../assets/Home_page/ult_trav_icon4.png";

export default function TravelBook() {
  return (
    <div className="w-full bg-[#1f6f5c] py-10 md:py-20 px-4 md:px-0 text-white relative overflow-hidden">

      {/* Decorative Icons: Hidden on mobile or smaller */}
      <img src={ult_trav_bag} className="absolute top-[1%] left-0 w-32 md:w-60 opacity-80 hidden md:block" />
      <img src={ult_trav_locator} className="absolute bottom-[0%] left-[40%] w-40 md:w-80 opacity-80 hidden md:block" />
      <img src={ult_trav_plane} className="absolute top-[1%] right-0 w-24 md:w-48 opacity-80 hidden md:block" />
      <img src={ult_trav_tree} className="absolute bottom-0 inline-block right-0 w-20 md:w-40 hidden md:block" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 relative z-10">

        {/* LEFT CONTENT */}
        <div className="w-full md:w-[55%] text-center md:text-left">
          <h2 className="text-3xl md:text-5xl md:ml-[12%] font-serif mb-2">
            The Ultimate Travel Book
          </h2>

          <p className="italic text-lg md:text-xl text-center md:text-right mb-6 opacity-90">
            Coming Soon…
          </p>

          <p className="text-sm md:text-base leading-relaxed opacity-90 mt-4 md:mt-[2rem] mb-8 md:mb-10 max-w-2xl mx-auto md:mx-0 text-justify md:text-left">
            “Travel is the greatest gift I’ve ever given myself — and now,
            I want you to feel that same magic. This isn’t just a website,
            it’s your passport to explore the world. Whether you’re stepping
            out for your first trip or you’re a seasoned traveler, you’ll
            find a complete and cohesive guide here — one that gives you
            actionable steps to break boundaries, see the world, and turn
            every journey into an unforgettable story. This is more than
            just travel tips; it’s experiences, stories, and moments that
            can change your life.”
          </p>

          {/* FORM */}
          <div className="space-y-6 max-w-md mx-auto md:mx-0">
            <input
              type="text"
              placeholder="NAME"
              className="w-full bg-transparent border-b border-white/60 py-2 outline-none placeholder-white/70"
            />

            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              className="w-full bg-transparent border-b border-white/60 py-2 outline-none placeholder-white/70"
            />

            <button className="bg-red-500 hover:bg-red-600 transition px-8 py-3 rounded-md font-semibold flex items-center justify-center md:justify-start gap-2 mx-auto md:mx-0">
              SIGN UP
              <span>👉</span>
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full md:w-[45%] flex justify-center md:justify-end mt-8 md:mt-0">
          <img
            src={ult_trav_book}
            alt="Travel Book"
            className="w-[80vw] md:w-[580px] md:rotate-6 shadow-2xl rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

import ult_trav_book from "../assets/Home_page/ult_trav_book.png";
import ult_trav_bag from "../assets/Home_page/ult_trav_icon1.png";
import ult_trav_locator from "../assets/Home_page/ult_trav_icon2.png";
import ult_trav_plane from "../assets/Home_page/ult_trav_icon3.png";
import ult_trav_tree from "../assets/Home_page/ult_trav_icon4.png";

export default function TravelBook() {
  return (
    <div className="w-full bg-[#1f6f5c] py-10 px-0 text-white relative overflow-hidden">

      {/* Decorative Icons */}
      <img src={ult_trav_bag} className="absolute top-[1%] left-0 w-60 opacity-80" />
      <img src={ult_trav_locator} className="absolute bottom-[0%] left-[40%] w-80 opacity-80" />
      <img src={ult_trav_plane} className="absolute top-[1%] right-0 w-48 opacity-80" />
      <img src={ult_trav_tree} className="absolute bottom-0 inline-block right-0 w-40" />

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-16">

        {/* LEFT CONTENT */}
        <div className="w-[55%]">
          <h2 className="text-5xl ml-[12%] font-serif mb-2">
            The Ultimate Travel Book
          </h2>

          <p className="italic text-xl text-right mb-6 opacity-90">
            Coming Soon…
          </p>

          <p className="text-md leading-relaxed opacity-90 mt-[2rem] mb-10 max-w-2xl">
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
          <div className="space-y-6 max-w-md">
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

            <button className="bg-red-500 hover:bg-red-600 transition px-8 py-3 rounded-md font-semibold flex items-center gap-2">
              SIGN UP
              <span>👉</span>
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-[45%] flex justify-end">
          <img
            src={ult_trav_book}
            alt="Travel Book"
            className="w-[580px] rotate-6 shadow-2xl rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

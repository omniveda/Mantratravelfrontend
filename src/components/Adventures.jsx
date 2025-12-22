import { useState } from "react";
import adventure1 from "../assets/Home_page/Real_auss.png";
import Look_adv1 from "../assets/Home_page/Look_adv1.png";
import Look_adv2 from "../assets/Home_page/Look_adv2.png";
import Look_adv3 from "../assets/Home_page/Look_adv3.png";

const slides = [
  {
    img: adventure1,
    text: "Real Aussies, real recommendations. Here are the adventures and awe-inspiring moments you just can’t miss in 2025.",
  },
//   {
//     img: "/images/adventure2.jpg",
//     text: "Discover unforgettable journeys crafted by real travelers across breathtaking destinations.",
//   },
//   {
//     img: "/images/adventure3.jpg",
//     text: "Adventure awaits where memories are made and stories begin.",
//   },
];

const cards = [
  {
    img: Look_adv1,
    tag: "WILD",
  },
  {
    img: Look_adv2,
    tag: "ADVENTURE",
  },
  {
    img: Look_adv3,
    tag: "SPIRITUAL",
  },
];

export default function Adventures() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prev = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <div className="max-w-8xl mx-auto pb-10 px-6">
      <div className="relative h-[420px] rounded-2xl overflow-hidden">

        {/* Image */}
        <img
          src={slides[current].img}
          alt="adventure"
          className="w-full h-full object-cover "
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Text */}
        <div className="absolute bottom-8 left-8 max-w-xl text-white">
          <p className="text-2xl leading-relaxed font-medium">
            {slides[current].text}
          </p>
        </div>

        {/* Left Arrow */}
        <button
          onClick={prev}
          className="absolute right-20 bottom-8 bg-white/80 text-black p-2 rounded-full hover:bg-white"
        >
          ❮
        </button>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="absolute right-8 bottom-8 bg-white/80 text-black p-2 rounded-full hover:bg-white"
        >
          ❯
        </button>

        {/* Dots */}
        <div className="absolute right-8 bottom-20 flex gap-2">
          {slides.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2.5 h-2.5 rounded-full cursor-pointer transition ${
                current === index
                  ? "bg-white"
                  : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="relative  mx-auto py-10">

      {/* Slider */}
      <div className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth">
        {cards.map((card, index) => (
          <div
            key={index}
            className="min-w-[300px] bg-white border rounded-lg overflow-hidden"
          >
            {/* Image */}
            <img
              src={card.img}
              alt=""
              className="w-full h-[220px] object-cover hover:scale-110 transition-all duration-300 cursor-pointer"
            />

            {/* Content */}
            <div className="p-6">
              <p className="text-lg font-serif leading-relaxed mb-6">
                Looking for more than just a job? Begin your adventure with us.
              </p>

              <div className="flex justify-between items-center text-sm text-gray-400 uppercase tracking-wide">
                <span>{card.tag}</span>
                <a
                  href="#"
                  className="hover:text-black transition"
                >
                  visit our website!
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-4 rounded-full">
        ❯
      </button>
    </div>
    </div>
  );
}

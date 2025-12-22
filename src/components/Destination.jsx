import { useState } from "react";
import Les_wond1 from "../assets/Home_page/Les_wond1.png";
import Les_wond2 from "../assets/Home_page/Les_wond2.png";
import Les_wond3 from "../assets/Home_page/Les_wond3.png";

const destinations = [
  {
    img: Les_wond1,
    title: "Kedarnath",
  },
  {
    img: Les_wond2,
    title: "Shiva",
  },
  {
    img: Les_wond3,
    title: "Ellora",
  },
];

export default function Destination() {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((prev) =>
      prev === 0 ? destinations.length - 1 : prev - 1
    );
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % destinations.length);
  };

  const left =
    destinations[(current - 1 + destinations.length) % destinations.length];
  const center = destinations[current];
  const right =
    destinations[(current + 1) % destinations.length];

  return (
    <div className="relative pt-14 bg-white overflow-hidden text-center">

      {/* Heading */}
      <p className="text-gray-400 text-xl tracking-widest mb-2">
        Uncover India’s
      </p>
      <h2 className="text-6xl font-extrabold text-gray-300 mb-16">
        LESSER KNOWN WONDERS
      </h2>

      {/* Slider */}
      <div className="relative flex items-center justify-center gap-8">

        {/* Left image */}
        <img
          src={left.img}
          className="w-[400px] h-[300px] object-cover rounded-xl opacity-70 hover:scale-110 transition-all duration-300 cursor-pointer"
        />

        {/* Center image */}
        <img
          src={center.img}
          className="w-[600px] h-[400px] object-cover rounded-3xl shadow-2xl z-10 hover:scale-110 transition-all duration-300 cursor-pointer"
        />

        {/* Right image */}
        <img
          src={right.img}
          className="w-[400px] h-[300px] object-cover rounded-xl opacity-70 hover:scale-110 transition-all duration-300 cursor-pointer"
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-8 mt-10">
        <button
          onClick={prev}
          className="text-4xl hover:scale-110 transition"
        >
          ←
        </button>

        <button className="bg-red-600 shadow-xl text-white px-8 py-3 rounded-full font-semibold tracking-wide hover:bg-red-700 hover:scale-110 transition">
          MORE INFO
        </button>

        <button
          onClick={next}
          className="text-3xl hover:scale-110 transition"
        >
          →
        </button>
      </div>

      {/* Background shape */}
      <div className="absolute bottom-0 left-0 w-full h-[180px] bg-gray-200 rounded-t-[100%] -z-10"></div>
    </div>
  );
}

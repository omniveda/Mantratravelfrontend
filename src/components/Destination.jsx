import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Les_wond1 from "../assets/Home_page/Les_wond1.png";
import Les_wond2 from "../assets/Home_page/Les_wond2.png";
import Les_wond3 from "../assets/Home_page/Les_wond3.png";
import down_mountain from "../assets/Home_page/down_mountain.png";

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
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [dynamicDestinations, setDynamicDestinations] = useState(destinations);

  useEffect(() => {
    const fetchWonders = async () => {
      try {
        const res = await axios.get('https://mantratravelbackend.onrender.com/api/blogs?tag=wonders');
        if (res.data && res.data.length > 0) {
          setDynamicDestinations(res.data.map(blog => ({
            img: blog.image,
            title: blog.heading,
            id: blog._id
          })));
        }
      } catch (err) {
        console.error("Error fetching wonders blogs:", err);
      }
    };
    fetchWonders();
  }, []);

  const prev = () => {
    setCurrent((prev) =>
      prev === 0 ? dynamicDestinations.length - 1 : prev - 1
    );
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % dynamicDestinations.length);
  };

  const left = dynamicDestinations[(current - 1 + dynamicDestinations.length) % dynamicDestinations.length];
  const center = dynamicDestinations[current];
  const right = dynamicDestinations[(current + 1) % dynamicDestinations.length];

  return (
    <div className="relative pt-6 mx-[10px] lg:mx-[0px] lg:pt-14 bg-white overflow-hidden text-center">

      {/* Heading */}
      <p className="text-gray-400 text-xl tracking-widest mb-2">
        Uncover The World
      </p>
      <h2 className="text-2xl lg:text-6xl font-extrabold text-gray-300 mb-6 lg:mb-16">
        LESSER KNOWN WONDERS
      </h2>

      {/* Slider */}
      <div className="relative flex items-center justify-center -space-x-4 lg:-space-x-12">

        {/* Left image */}
        <img
          src={left.img}
          alt={left.title}
          onClick={() => left.id && navigate(`/blog/${left.id}`)}
          className="w-[80px] h-[80px] lg:w-[350px] lg:h-[250px] object-cover rounded-xl opacity-40 hover:scale-110 transition-all duration-300 cursor-pointer"
        />

        {/* Center image */}
        <div
          className="relative group cursor-pointer z-10"
          onClick={() => center.id && navigate(`/blog/${center.id}`)}
        >
          <img
            src={center.img}
            alt={center.title}
            className="w-[85vw] h-[300px] lg:w-[950px] lg:h-[600px] object-cover rounded-3xl shadow-2xl hover:scale-105 transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 rounded-3xl">
            <h3 className="text-white text-xl lg:text-3xl font-bold">{center.title}</h3>
          </div>
        </div>

        {/* Right image */}
        <img
          src={right.img}
          alt={right.title}
          onClick={() => right.id && navigate(`/blog/${right.id}`)}
          className="w-[80px] h-[80px] lg:w-[350px] lg:h-[250px] object-cover rounded-xl opacity-40 hover:scale-110 transition-all duration-300 cursor-pointer"
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

        <button
          className="bg-red-600 shadow-xl text-white px-8 py-3 rounded-full font-semibold tracking-wide hover:bg-red-700 hover:scale-110 transition"
          onClick={() => center.id && navigate(`/blog/${center.id}`)}
        >
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
      <div className="absolute top-100 bottom-0 left-0 w-full h-[180px] bg-gray-200 rounded-t-[100%] -z-10">
        <img src={down_mountain} alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}


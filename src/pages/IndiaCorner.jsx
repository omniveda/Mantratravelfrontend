import western from "../assets/Destinations/western.png"
import central from "../assets/Destinations/central.png"
import northern from "../assets/Destinations/northern.png"
import northeast from "../assets/Destinations/north-east.png"
import south from "../assets/Destinations/south.png"
import eastern from "../assets/Destinations/eastern.png"
import { useNavigate } from "react-router-dom";

export default function IndiaCorner() {
    const navigate = useNavigate();
  const categories = [
    
    "States",
    "nature",
    "wildlife",
    "adventures",
    "heritage",
    "spirituality",
    "cities",
    "culture",
  ];

  const regions = [
    { title: "WESTERN", img: western },
    { title: "CENTRAL", img: central },
    { title: "NORTHERN", img: northern },
    { title: "EASTERN", img: eastern },
    { title: "NORTH EAST", img: northeast },
    { title: "SOUTH", img: south },
  ];

  return (
    <section className="bg-gray-100 py-20 px-6 text-center">

      {/* INDIA HEADING */}
      <h1 className="text-[120px] font-extrabold tracking-wide text-orange-500 mb-6"
          style={{ fontFamily: "cursive" }}>
        INDIA
      </h1>

      {/* CATEGORY NAV */}
      <div className="flex flex-wrap justify-center gap-6 mb-20 text-lg">
        <p className="cursor-pointer text-red-500 font-semibold">Explorer India</p>
        {categories.map((item, index) => (
          <span
            key={index}
            onClick={() => {(item==="States")?navigate("/destinations/india-corner"):navigate(`/${item}`)}}
            className={`cursor-pointer ${
              item === "Explorer India"
                ? "text-red-500 font-semibold"
                : item === "States"
                ? "bg-blue-100 px-3 py-1 rounded-full text-blue-600"
                : "text-gray-600 text-lg hover:text-black"
            }`}
          >
            {item}
          </span>
        ))}
      </div>

      {/* REGIONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
        {regions.map((region, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={region.img}
              alt={region.title}
              className="w-[150px] h-auto mb-4"
            />
            <h3 className="text-3xl font-bold tracking-wide text-orange-500">
              {region.title}
            </h3>
            <span className="text-xs bg-gray-200 px-2 py-0.5 mt-1">
              INDIA
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

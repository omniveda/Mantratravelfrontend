
import { useNavigate } from "react-router-dom";
import IndiaCorner1 from "../assets/Destinations/india_corner_1.png";
import IndiaCorner2 from "../assets/Destinations/india_corner_2.png";
import IndiaCorner3 from "../assets/Destinations/india_corner_3.png";
import IndiaCorner4 from "../assets/Destinations/india_corner_4.png";
import IndiaCorner5 from "../assets/Destinations/india_corner_5.png";

import WorldCorner1 from "../assets/Destinations/world_corner_1.png";
import WorldCorner2 from "../assets/Destinations/world_corner_2.png";
import WorldCorner3 from "../assets/Destinations/world_corner_3.png";
import WorldCorner4 from "../assets/Destinations/world_corner_4.png";
import WorldCorner5 from "../assets/Destinations/world_corner_5.png";

export default function Destinations() {
    const navigate = useNavigate();
    const indiaImages = [
        IndiaCorner1,
        IndiaCorner2,
        IndiaCorner3,
        IndiaCorner4,
        IndiaCorner5,
    ];

    const worldImages = [
        WorldCorner1,
        WorldCorner2,
        WorldCorner3,
        WorldCorner4,
        WorldCorner5,
    ];

    return (
        <section className="bg-gray-100 pb-20 pt-14 px-10">

            {/* Heading */}
            <div className="mb-14 lg:ml-52">
                <p className="text-green-600 italic text-lg ">exclusive</p>
                <h2 className="text-5xl font-serif">Destination</h2>
                <span className="inline-block mt-2 text-right px-2 text-lg font-bold bg-white text-blue-900">
                    READY TO PLAN A TRIP?
                </span>
            </div>

            {/* Two Columns */}
            <div className="flex flex-row justify-center  text-center gap-20">

                {/* INDIA CORNER */}
                <div>
                    <div className="flex gap-3 mb-6">
                        {indiaImages.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt=""
                                className="w-[90px] h-[260px] object-cover rounded"
                            />
                        ))}
                    </div>

                    <h3 className="text-4xl font-serif mt-6">INDIA CORNER</h3>

                    <button onClick={() => navigate('/destinations/india-corner')} className="mt-3 inline-flex items-center gap-2 bg-red-600 text-white text-xs px-3 py-1 rounded">
                        CLICK HERE
                    </button>

                    <p className="text-md text-left text-justify text-gray-600 mt-4 max-w-md">
                        “India is the cradle of the human race, the birthplace of human
                        speech, the mother of history, the grandmother of legend, and the
                        great grandmother of tradition.”
                        <br />— Mark Twain
                    </p>
                </div>

                {/* WORLD CORNER */}
                <div>
                    <div className="flex gap-3 mb-6">
                        {worldImages.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt=""
                                className="w-[90px] h-[260px] object-cover rounded"
                            />
                        ))}
                    </div>

                    <h3 className="text-4xl font-serif mt-6">WORLD CORNER</h3>

                    <button onClick={() => navigate('/destinations/world-corner')} className="mt-3 inline-flex items-center gap-2 bg-red-600 text-white text-xs px-3 py-1 rounded">
                        CLICK HERE
                    </button>

                    <p className="text-md text-left text-justify text-gray-600 mt-4 max-w-md">
                        “वसुधैव कुटुम्बकम्” — Vasudhaiva Kutumbakam <br />
                        The entire world is a single family.
                    </p>
                </div>

            </div>
        </section>
    );
}

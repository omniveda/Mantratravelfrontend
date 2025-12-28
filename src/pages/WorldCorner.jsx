import { useState } from "react";
import CountryExplore from "../components/CountryExplore";
import aisa from "../assets/Destinations/asia.png";
import america from "../assets/Destinations/north-america.png";
import southAmerica from "../assets/Destinations/south-america.png";
import africa from "../assets/Destinations/africa.png";
import europe from "../assets/Destinations/europe.png";
import china from "../assets/Destinations/china.png";
import dubai from "../assets/Destinations/dubai.png";
import singapore from "../assets/Destinations/singapore.png";
import japan from "../assets/Destinations/japan.png";
import malaysia from "../assets/Destinations/malaysia.png";
import india from "../assets/Destinations/India.png";
import saudiarabia from "../assets/Destinations/saudiarabia.png";
import indonesia from "../assets/Destinations/indonesia.png";
import thailand from "../assets/Destinations/Thailand.png";
import brazil from "../assets/Destinations/brazil.jpg";
import argentina from "../assets/Destinations/argentina.jpg";
import chile from "../assets/Destinations/chile.jpg";
import peru from "../assets/Destinations/peru.jpg";
import usa from "../assets/Destinations/usa.jpg";
import canada from "../assets/Destinations/canada.jpg";
import mexico from "../assets/Destinations/mexico.jpg";
import morocco from "../assets/Destinations/morocco.jpg";
import egypt from "../assets/Destinations/egypt.jpg";
import southAfrica from "../assets/Destinations/southAfrica.jpg";
import tunisia from "../assets/Destinations/tunisia.jpg";

import france from "../assets/Destinations/france.jpg";
import spain from "../assets/Destinations/spain.jpg";
import italy from "../assets/Destinations/italy.jpg";
import germany from "../assets/Destinations/germany.jpg";
import uk from "../assets/Destinations/uk.jpg";
import netherlands from "../assets/Destinations/netherlands.jpg";

export default function WorldCorner() {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [activeContinent, setActiveContinent] = useState("Asia");

    const continents = [
        { name: "Asia", img: aisa },
        { name: "America", img: america },
        { name: "South America", img: southAmerica },
        { name: "Africa", img: africa },
        { name: "Europe", img: europe },
    ];

    const asiaCountries = [
        { name: "china", img: china },
        { name: "dubai", img: dubai },
        { name: "singapore", img: singapore },
        { name: "japan", img: japan },
        { name: "malaysia", img: malaysia },
        { name: "india", img: india },
        { name: "saudi arabia", img: saudiarabia },
        { name: "indonesia", img: indonesia },
        { name: "thailand", img: thailand },
    ];

    const southAmericaCountries = [
        { name: "brazil", img: brazil },
        { name: "argentina", img: argentina },
        { name: "chile", img: chile },
        { name: "peru", img: peru },
    ];

    const americaCountries = [
        { name: "usa", img: usa },
        { name: "canada", img: canada },
        { name: "mexico", img: mexico },
    ];

    const africaCountries = [
        { name: "morocco", img: morocco },
        { name: "egypt", img: egypt },
        { name: "south africa", img: southAfrica },
        { name: "tunisia", img: tunisia },
    ];

    const europeCountries = [
        { name: "france", img: france },
        { name: "spain", img: spain },
        { name: "italy", img: italy },
        { name: "germany", img: germany },
        { name: "uk", img: uk },
        { name: "netherlands", img: netherlands },
    ];

    const countriesByContinent = {
        "Asia": asiaCountries,
        "America": americaCountries,
        "South America": southAmericaCountries,
        "Africa": africaCountries,
        "Europe": europeCountries,
    };

    const handleCountryClick = (countryName) => {
        setSelectedCountry(countryName);
        window.scrollTo(0, 0);
    };

    const handleBack = () => {
        setSelectedCountry(null);
    };

    if (selectedCountry) {
        return <CountryExplore countryName={selectedCountry} onBack={handleBack} />;
    }

    return (
        <section className="bg-gray-100 py-20 px-8">

            {/* WORLD CORNER TITLE */}
            <h1
                className="text-center text-[70px] font-bold text-orange-500 mb-10"
                style={{ fontFamily: "cursive" }}
            >
                WORLD CORNER
            </h1>

            {/* CONTINENT MAPS */}
            <div className="flex justify-center gap-10 mb-6">
                {continents.map((c, i) => (
                    <div
                        key={i}
                        onClick={() => setActiveContinent(c.name)}
                        className={`p-3 rounded-full cursor-pointer transition-all ${activeContinent === c.name ? "bg-white shadow w-[14%] flex justify-center scale-110" : "opacity-60 hover:opacity-100"
                            }`}
                    >
                        <img src={c.img} alt={c.name} className="w-28 h-28" />
                    </div>
                ))}
            </div>

            {/* CONTINENT LABEL */}
            <h2 className="text-center text-3xl text-sky-400 font-bold mb-12 uppercase">
                {activeContinent}
            </h2>

            {/* COUNTRY CARDS */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-16">
                {countriesByContinent[activeContinent]?.map((country, i) => (
                    <div
                        key={i}
                        onClick={() => handleCountryClick(country.name)}
                        className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer"
                    >
                        <img
                            src={country.img}
                            alt={country.name}
                            className="w-full h-28 object-cover rounded-t-xl"
                        />
                        <p className="text-center text-sm py-2 capitalize text-blue-500">
                            {country.name}
                        </p>
                    </div>
                ))}

            </div>

            {/* CONTINENT LISTS */}
            <div className="grid grid-cols-2 md:grid-cols-5 text-center gap-6 text-xs text-gray-700">
                <Continent
                    title="ASIA"
                    list={["India", "China", "Japan", "Thailand", "Malaysia", "Indonesia", "Singapore", "Turkey", "UAE", "Saudi Arabia"]}
                    onItemClick={handleCountryClick}
                />
                <Continent
                    title="AMERICA"
                    list={["USA", "Canada", "Mexico"]}
                    onItemClick={handleCountryClick}
                />
                <Continent
                    title="SOUTH AMERICA"
                    list={["Brazil", "Argentina", "Chile", "Peru"]}
                    onItemClick={handleCountryClick}
                />
                <Continent
                    title="AFRICA"
                    list={["Morocco", "Egypt", "South Africa", "Tunisia"]}
                    onItemClick={handleCountryClick}
                />
                <Continent
                    title="EUROPE"
                    list={["France", "Spain", "Italy", "Germany", "UK", "Netherlands"]}
                    onItemClick={handleCountryClick}
                />
            </div>
        </section>
    );
}

function Continent({ title, list, onItemClick }) {
    return (
        <div>
            <h4 className="font-bold mb-2">{title}</h4>
            <ul className="space-y-1">
                {list.map((item, i) => (
                    <li
                        key={i}
                        onClick={() => onItemClick(item)}
                        className="cursor-pointer hover:text-blue-500 hover:underline"
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

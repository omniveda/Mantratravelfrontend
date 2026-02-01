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
import oceania from "../assets/Destinations/oceania.png";

// Placeholder definitions for missing assets to fix compilation errors
const australia = null, newZealand = null, papuaNewGuinea = null, fiji = null, vanuatu = null, tonga = null, marshallIslands = null, tuvalu = null;
const southKorea = null, vietnam = null, maldives = null, philippines = null, mongolia = null, nepal = null;
const canada_placeholder = null, usa_placeholder = null, mexico_placeholder = null, cuba = null, jamaica = null, dominicanRepublic = null, bahamas = null, costaRica = null, panama = null;
const peru_placeholder = null, colombia = null, venezuela = null, guyana = null, brazil_placeholder = null, argentina_placeholder = null, chile_placeholder = null, bolivia = null, ecuador = null;
const morocco_placeholder = null, egypt_placeholder = null, tunisia_placeholder = null, ethiopia = null, seychelles = null, southAfrica_placeholder = null, botswana = null, namibia = null, madagascar = null, kenya = null, zimbabwe = null, zambia = null, uganda = null, rwanda = null, mozambique = null, nigeria = null, ghana = null;
const france_placeholder = null, spain_placeholder = null, italy_placeholder = null, germany_placeholder = null, uk_placeholder = null, austria = null, greece = null, portugal = null, croatia = null, switzerland = null, belgium = null, finland = null, poland = null, netherlands_placeholder = null, russia = null, hungary = null, czechia = null, denmark = null, ireland = null, albania = null, romania = null, norway = null, montenegro = null;


export default function WorldCorner() {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [activeContinent, setActiveContinent] = useState("Asia");

    const continents = [
        { name: "Asia", img: aisa },
        { name: "America", img: america },
        { name: "South America", img: southAmerica },
        { name: "Africa", img: africa },
        { name: "Europe", img: europe },
        { name: "Oceania", img: oceania },
    ];

    const oceaniaCountries = [
        { name: "australia", img: australia },
        { name: "new zealand", img: newZealand },
        { name: "papua new guinea", img: papuaNewGuinea },
        { name: "fiji", img: fiji },
        { name: "vanuatu", img: vanuatu },
        { name: "Tonga", img: tonga },
        { name: "Marshall Islands", img: marshallIslands },
        { name: "Tuvalu", img: tuvalu },
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
        { name: "south korea", img: southKorea },
        { name: "vietnam", img: vietnam },
        { name: "maldives", img: maldives },
        { name: "philippines", img: philippines },
        { name: "mongolia", img: mongolia },
        { name: "nepal", img: nepal },
    ];

    const americaCountries = [
        { name: "canada", img: canada },
        { name: "usa", img: usa },
        { name: "mexico", img: mexico },
        { name: "cuba", img: cuba },
        { name: "jamaica", img: jamaica },
        { name: "dominican republic", img: dominicanRepublic },
        { name: "bahamas", img: bahamas },
        { name: "costa rica", img: costaRica },
        { name: "panama", img: panama },
    ];


    const southAmericaCountries = [
        { name: "peru", img: peru },
        { name: "colombia", img: colombia },
        { name: "venezuela", img: venezuela },
        { name: "guyana", img: guyana },
        { name: "brazil", img: brazil },
        { name: "argentina", img: argentina },
        { name: "chile", img: chile },
        { name: "bolivia", img: bolivia },
        { name: "ecuador", img: ecuador },
    ];

    const africaCountries = [
        { name: "morocco", img: morocco },
        { name: "egypt", img: egypt },
        { name: "tunisia", img: tunisia },
        { name: "ethiopia", img: ethiopia },
        { name: "seychelles", img: seychelles },
        { name: "south africa", img: southAfrica },
        { name: "botswana", img: botswana },
        { name: "namibia", img: namibia },
        { name: "madagascar", img: madagascar },
        { name: "kenya", img: kenya },
        { name: "zimbabwe", img: zimbabwe },
        { name: "zambia", img: zambia },
        { name: "venezuela", img: venezuela },
        { name: "uganda", img: uganda },
        { name: "rwanda", img: rwanda },
        { name: "mozambique", img: mozambique },
        { name: "nigeria", img: nigeria },
        { name: "ghana", img: ghana },
        { name: "guyana", img: guyana },
    ];

    const europeCountries = [
        { name: "france", img: france },
        { name: "spain", img: spain },
        { name: "italy", img: italy },
        { name: "germany", img: germany },
        { name: "uk", img: uk },
        { name: "austria", img: austria },
        { name: "greece", img: greece },
        { name: "portugal", img: portugal },
        { name: "croatia", img: croatia },
        { name: "switzerland", img: switzerland },
        { name: "belgium", img: belgium },
        { name: "finland", img: finland },
        { name: "poland", img: poland },
        { name: "netherlands", img: netherlands },
        { name: "russia", img: russia },
        { name: "hungary", img: hungary },
        { name: "czechia", img: czechia },
        { name: "denmark", img: denmark },
        { name: "ireland", img: ireland },
        { name: "albania", img: albania },
        { name: "romania", img: romania },
        { name: "norway", img: norway },
        { name: "montenegro", img: montenegro },
        // {name:"iceland",img:iceland},
        // {name:"sweden",img:sweden},
        // {name:"serbia",img:serbia},
        // {name:"bosnia and herzegovina",img:bosniaAndHerzegovina},
    ];

    const countriesByContinent = {
        "Asia": asiaCountries,
        "America": americaCountries,
        "South America": southAmericaCountries,
        "Africa": africaCountries,
        "Europe": europeCountries,
        "Oceania": oceaniaCountries,
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
        <section className="bg-gray-100 py-20 px-4 md:px-12 lg:px-20 max-w-[1440px] mx-auto min-h-screen">


            {/* WORLD CORNER TITLE */}
            <h1
                className="text-center text-4xl md:text-[70px] font-bold text-orange-500 mb-10"
                style={{ fontFamily: "cursive" }}
            >
                WORLD CORNER
            </h1>

            {/* CONTINENT MAPS */}
            <div className="flex justify-start md:justify-center gap-6 md:gap-10 mb-6 overflow-x-auto pb-4 scrollbar-hide px-4 md:px-0">
                {continents.map((c, i) => (
                    <div
                        key={i}
                        onClick={() => setActiveContinent(c.name)}
                        className={`p-2 md:p-3 rounded-full cursor-pointer transition-all flex-shrink-0 ${activeContinent === c.name
                            ? "bg-white shadow w-[30%] md:w-[14%] flex justify-center scale-110"
                            : "opacity-60 hover:opacity-100"
                            }`}
                    >
                        <img src={c.img || ""} alt={c.name} className="w-20 h-20 md:w-28 md:h-28 object-contain" />
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
                            src={country.img || ""}
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

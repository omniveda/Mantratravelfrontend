// Explorer Images
import wildlife from "../assets/world_corner/74.png";
import heritage from "../assets/world_corner/75.png";
import spiritual from "../assets/world_corner/76.png";
import adventure from "../assets/world_corner/77.png";
import beaches from "../assets/world_corner/78.png";
import cities from "../assets/world_corner/79.png";
import art from "../assets/world_corner/80.png";
import nature from "../assets/world_corner/81.png";
// import weddings from "../assets/Home_page/82.png";
// import hiddenGems from "../assets/Home_page/bucket9.png";
// import wellness from "../assets/Destinations/Les_wond1.png";
// import weddings from "../assets/Home_page/bucket8.png";

// States Images
import state1 from "../assets/world_corner/82.png";
import state2 from "../assets/world_corner/83.png";
import state3 from "../assets/world_corner/84.png";

// Things to do
import roadTrip from "../assets/world_corner/91.png";
import hiking from "../assets/world_corner/93.png";
import kayaking from "../assets/world_corner/92.png";
import safari from "../assets/world_corner/97.png";
import snow from "../assets/world_corner/98.png";
import paragliding from "../assets/world_corner/99.png";
import biking from "../assets/world_corner/94.png";

// Flavours
import northFood from "../assets/world_corner/100.png";
import southFood from "../assets/world_corner/101.png";
import eastFood from "../assets/world_corner/102.png";
import westFood from "../assets/world_corner/103.png";
import northEastFood from "../assets/world_corner/104.png";
import centralFood from "../assets/world_corner/105.png";

// Art & Culture
import museum from "../assets/world_corner/106.png";
import crafts from "../assets/world_corner/107.png";

// Plan Trip
import plan1 from "../assets/world_corner/108.png";
import plan2 from "../assets/world_corner/109.png";
import plan3 from "../assets/world_corner/110.png";
import visa from "../assets/world_corner/111.png";

export const getCountryData = (countryName) => {
    return {
        "EXPLORER": [
            { title: "Wildlife", img: wildlife },
            { title: "Heritage", img: heritage },
            { title: "Spiritual", img: spiritual },
            { title: "Adventure", img: adventure },
            // { title: "Weddings", img: weddings },
            // { title: "Wellness", img: wellness },
            { title: "Arts", img: art },
            { title: "Nature", img: nature },
            { title: "Beaches", img: beaches },
            // { title: "Hidden Gems", img: hiddenGems }, 
            { title: "Major Cities", img: cities },
        ],
        "STATES": [
            { title: "Heavenly Himachal", img: state1 },
            { title: "Dazzling Delhi", img: state2 },
            { title: "Regal Rajasthan", img: state3 },
        ],
        "THINGS TO DO": [
            { title: "Road Trips", img: roadTrip },
            { title: "Scenic Highways", img: roadTrip },
            { title: "Biking in India", img: biking },
            { title: "Hiking in India", img: hiking },
            { title: "Train Rides", img: plan3 }, // Reused generic if needed
            { title: "Walking Trails", img: nature }, // Reused
            { title: "Rock Climbing", img: adventure }, // Reused
            { title: "Trekking in India", img: hiking },
            { title: "Paragliding", img: paragliding },
            { title: "Safari (Wildlife)", img: safari },
            { title: "Jungle Safari", img: safari },
            { title: "Snow Adventures", img: snow },
            { title: "Scuba Diving", img: beaches }, // Reused
            { title: "Kayaking", img: kayaking },
        ],
        "FLAVOURS OF": [
            { title: "North Indian Food", img: northFood },
            { title: "North East Food", img: northEastFood },
            { title: "East India Food", img: eastFood },
            { title: "West Indian Food", img: westFood },
            { title: "South Indian Food", img: southFood },
            { title: "Central Indian Food", img: centralFood },
        ],
        "ART & CULTURE": [
            { title: "Art Museums", img: museum },
            { title: "Local Crafts", img: crafts },
            { title: "Indian Architecture", img: heritage }, // Reused
            { title: "Performing Arts", img: art }, // Reused
            { title: "Living Culture", img: cities }, // Reused
            { title: "Daily Heritage", img: heritage }, // Reused
            { title: "Theatre", img: art }, // Reused
            { title: "Art Festivals", img: museum },
        ],
        "PACKING GUIDES": [
            // Placeholder data if none provided, reusing some nature ones
            { title: "Summer Essentials", img: beaches },
            { title: "Winter Gear", img: snow },
            { title: "Monsoon Ready", img: nature },
        ],
        "PLAN YOUR TRIP": [
            { title: `Discover ${countryName || 'India'}`, img: plan1 },
            { title: "Timing your Trip", img: plan2 },
            { title: "Transport Guide", img: plan3 },
            { title: "VISA info", img: visa },
            { title: "Stay & Dine", img: cities }, // Reused
            { title: "Culture Guide", img: heritage }, // Reused
        ]
    };
};

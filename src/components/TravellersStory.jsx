import Trav_story1 from "../assets/Home_page/Trav_stor1.png"
import Trav_story2 from "../assets/Home_page/Trav_stor2.png"
import Trav_story3 from "../assets/Home_page/Trav_stor3.png"
import Trav_story4 from "../assets/Home_page/Trav_stor4.png"
import Trav_story5 from "../assets/Home_page/Trav_stor5.png"

const stories = [
    Trav_story2,
    Trav_story3,
    Trav_story4,
    Trav_story5
];


export default function TravellersStory() {
    return (
        <div className="max-w-8xl mx-auto py-24 ">

            {/* Section Title */}
            <h2 className="text-blue-800 font-bold text-3xl mb-8">
                TRAVELLER'S STORIES
            </h2>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 px-6 lg:grid-cols-2 gap-6">

                {/* LEFT BIG CARD */}
                <div>
                    <div className="h-full rounded-2xl overflow-hidden">
                        <img
                            src={Trav_story1}
                            alt="story"
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"

                        />
                    </div>
                </div>

                {/* RIGHT GRID */}
                <div className="grid grid-cols-2 gap-6">
                    {stories.map((img, index) => (
                        <div
                            key={index}
                            className="rounded-2xl overflow-hidden"
                        >
                            <img
                                src={img}
                                alt="story"
                                className="w-[400px] h-[300px] object-cover transition-transform duration-500 hover:scale-105"

                            />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

// import bus from "../assets/attractions/bus.png";
import img1 from "../assets/Home_page/bucket1.png";
import img2 from "../assets/Home_page/bucket2.png";
import img3 from "../assets/Home_page/bucket3.png";
import img4 from "../assets/Home_page/bucket4.png";
import img5 from "../assets/Home_page/bucket5.png";
import img6 from "../assets/Home_page/bucket6.png";
import img7 from "../assets/Home_page/bucket7.png";
import img8 from "../assets/Home_page/bucket8.png";
import img9 from "../assets/Home_page/bucket9.png";
import img10 from "../assets/Home_page/bucket10.png";

const images = [
  img1, img2, img3, img4, img5,
  img6, img7, img8, img9, img10
];

export default function Attractions() {
  return (
    <section className="relative bg-[#FDBA4E] py-20 overflow-hidden">

      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-white text-5xl md:text-6xl font-extrabold tracking-widest">
          ATTRACTIONS
        </h2>
        <p className="text-white mt-2 tracking-widest text-sm">
          FOR EVERY BUCKET LIST
        </p>
      </div>

      {/* Image Strip */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "8px 0",
        }}
      >
        <div className="flex gap-2 overflow-hidden">
          {images.map((img, index) => (
            <div
              key={index}
              className="w-[90px] md:w-[110px] h-[300px] md:h-[360px] overflow-hidden"
            >
              <img
                src={img}
                alt="attraction"
                className="w-full h-full hover:scale-110 transition-all duration-300 object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bus Image */}
      {/* <img
        src={bus}
        alt="bus"
        className="absolute bottom-6 right-6 w-[220px] md:w-[320px]"
      /> */}
    </section>
  );
}

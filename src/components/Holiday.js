import { useState } from 'react';
import { IoIosAirplane } from 'react-icons/io';
import nature from '../assets/images/nature1.png';
import Attractions from './Attractions';
import Asia1 from "../assets/Home_page/Asia1.png";
import Asia2 from "../assets/Home_page/Asia2.png";
import Asia3 from "../assets/Home_page/Asia3.png";
import Europe1 from "../assets/Home_page/Europe1.png";
import Europe2 from "../assets/Home_page/Europe2.png";
import Europe3 from "../assets/Home_page/Europe3.png";
import America1 from "../assets/Home_page/America1.png";
import America2 from "../assets/Home_page/America2.png";
import America3 from "../assets/Home_page/America3.png";
import Africa1 from "../assets/Home_page/Africa1.png";
import Africa2 from "../assets/Home_page/Africa2.png";
import Africa3 from "../assets/Home_page/Africa3.png";
import centerImage from '../assets/images/image.png'; // <-- add this file or change the path

export default function Holiday() {
  // list with all content present (kept for content reuse)
  const conticnents = [
    {
      key: 'ASIA',
      title: 'ASIA',
      intro: "it's my holiday",
      description:
        'Discover the soul of Asia — a tapestry of ancient cultures, epic landscapes, and unforgettable journeys.',
      countries: [],
      images: [Asia1, Asia2, Asia3],
    },
    {
      key: 'EUROPE',
      title: 'EUROPE',
      intro: "it's my holiday",
      description:
        "Wander through Europe's timeless charm — where every street tells a story and every journey feels like art.",
      countries: [
        'FRANCE',
        'NETHERLANDS',
        'IRELAND',
        'BELGIUM',
        'GERMANY',
        'GREECE',
        'SPAIN',
        'SWEDEN',
        'UK',
        'ITALY',
      ],
      images: [Europe1, Europe2, Europe3],
    },
    {
      key: 'AMERICA',
      title: 'AMERICA',
      intro: "it's my holiday",
      description:
        'Discover the soul of America - tapestry of ancient cultures, epic landscapes, and unforgettable journeys.',
      countries: [],
      images: [America1, America2, America3],
    },
    {
      key: 'AFRICA',
      title: 'AFRICA',
      intro: "it's my holiday",
      description:
        "Wander through Africa's timeless charm - where every street tells a story and every journey feels like art.",
      countries: [],
      images: [Africa1, Africa2, Africa3],
    },
  ];

  // initialize start indices for each continent (for image paging)
  const [startIndices, setStartIndices] = useState(() =>
    conticnents.reduce((acc, c) => {
      acc[c.key] = 0;
      return acc;
    }, {})
  );

  // replaced renderCard implementation with vertical block + image paging UI
  const renderCard = (continent) => {
    const startIndex = startIndices[continent.key] ?? 0;
    const imagesLen = continent.images?.length || 0;
    const visibleImages = continent.images.slice(startIndex, startIndex + 3);

    const handleNext = () => {
      if (imagesLen === 0) return;
      setStartIndices((prev) => ({
        ...prev,
        [continent.key]: (prev[continent.key] + 3) % imagesLen,
      }));
    };

    return (
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          // padding: 16,
          borderRadius: 12,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 40,
            alignItems: 'flex-start',
            marginBottom: 12,
            width: '100%',
            boxSizing: 'border-box',
            padding: 0,
          }}
        >
          {/* left column (text) */}
          <div style={{ width: '28%', textAlign: 'left' }}>
            <div
              style={{
                color: continent.title==="ASIA"?'#1fb36b':'#e3176fff',
                fontSize: '5rem',
                marginBottom: 8,
                fontFamily: "'Brush Script MT', cursive",
              }}
            >
              {continent.intro}
            </div>

            <h2
              style={{
                color: continent.title==="ASIA"?'#f3744a':'#1fb36b',
                fontSize: '3.8rem',
                margin: '0 0 12px 0',
                fontFamily: "'Pacifico', 'Brush Script MT', cursive",
                letterSpacing: 1,
                textAlign: 'center',
              }}
            >
              {continent.title}
            </h2>

            <p style={{ color: '#333', lineHeight: 1.5, fontSize: '1.6rem', margin: 0 }} className='font-semibold text-justify'>
              {continent.description}
            </p>

            {continent.countries && continent.countries.length > 0 && (
              <div style={{ color: '#888', marginTop: 12, fontSize: '0.85rem' }}>
                {continent.countries.join(' • ')}
              </div>
            )}
          </div>

          {/* images area */}
          <div
            style={{
              width: '70%',
              height: '80%',
              display: 'flex',
              gap: 16,
              alignItems: 'center',
              paddingBottom: 8,
              marginTop: 8,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {visibleImages.map((img, i) => (
              <div
                key={i}
                style={{
                  minWidth: '30%',
                  height: '80%',
                  borderRadius: 20,
                  overflow: 'hidden',
                  // boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
                  // background: '#eee',
                  flex: '0 0 calc(33.333% - 11px)',
                  position: 'relative',
                }}
              >
                <img
                  src={img}
                  alt={`${continent.title}-${i}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  className='hover:scale-110 transition-all duration-300'
                />
                
                {/* Show next button only on last image */}
                {i === visibleImages.length - 1 && (
                  <div
                    onClick={handleNext}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.95)',
                      boxShadow: '0 6px 15px rgba(0,0,0,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'absolute',
                      right: 2,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      zIndex: 10,
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(-50%)';
                      e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.08)';
                    }}
                  >
                    <span style={{ color: '#f08f5b', fontSize: '2rem', fontWeight: 600 }}>{'>'}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderCard2 = (continent) => {
    const startIndex = startIndices[continent.key] ?? 0;
    const imagesLen = continent.images?.length || 0;
    const visibleImages = continent.images.slice(startIndex, startIndex + 3);

    const handleNext = () => {
      if (imagesLen === 0) return;
      setStartIndices((prev) => ({
        ...prev,
        [continent.key]: (prev[continent.key] + 3) % imagesLen,
      }));
    };

    return (
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          // padding: 16,
          borderRadius: 12,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 40,
            alignItems: 'flex-start',
            marginBottom: 12,
            width: '100%',
            boxSizing: 'border-box',
            padding: 0,
          }}
        >
          {/* images area */}
          <div
            style={{
              width: '70%',
              height: '80%',
              display: 'flex',
              gap: 16,
              alignItems: 'center',
              paddingBottom: 8,
              marginTop: 8,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {visibleImages.map((img, i) => (
              <div
                key={i}
                style={{
                  minWidth: '30%',
                  height: '80%',
                  borderRadius: 20,
                  overflow: 'hidden',
                  // boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
                  // background: '#eee',
                  flex: '0 0 calc(33.333% - 11px)',
                  position: 'relative',
                }}
              >
                <img
                  src={img}
                  alt={`${continent.title}-${i}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  className='hover:scale-110 transition-all duration-300'
                />
                
                {/* Show next button on the FIRST image (left side) */}
                {i === 0 && (
                  <div
                    onClick={handleNext}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.95)',
                      boxShadow: '0 6px 15px rgba(0,0,0,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'absolute',
                      left: 2,            // place the button on the left side
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      zIndex: 10,
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(-50%)';
                      e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.08)';
                    }}
                    aria-label="previous images"
                  >
                    <span style={{ color: '#f08f5b', fontSize: '2rem', fontWeight: 600 }}>{'<'}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* left column (text) */}
          <div style={{ width: '28%', textAlign: 'left' }}>
            <div
              style={{
                color: continent.title==="AMERICA"?'#1fb36b':'#e3176fff',
                fontSize: '5rem',
                marginBottom: 8,
                fontFamily: "'Brush Script MT', cursive",
              }}
            >
              {continent.intro}
            </div>

            <h2
              style={{
                color: continent.title==="AMERICA"?'#f3744a':'#1fb36b',
                fontSize: '3.8rem',
                margin: '0 0 12px 0',
                fontFamily: "'Pacifico', 'Brush Script MT', cursive",
                letterSpacing: 1,
                textAlign: 'center',
              }}
            >
              {continent.title}
            </h2>

            <p style={{ color: '#333', lineHeight: 1.5, fontSize: '1.6rem', margin: 0 }} className='font-semibold text-justify'>
              {continent.description}
            </p>

            {continent.countries && continent.countries.length > 0 && (
              <div style={{ color: '#888', marginTop: 12, fontSize: '0.85rem' }}>
                {continent.countries.join(' • ')}
              </div>
            )}
          </div>

          
        </div>
      </div>
    );
  };
  
  return (
    <div className='flex flex-col' style={{ gap: 24 }}>
      {/* Top row: two cards */}
      <div style={{ display: 'flex', gap: 16, width: '100%' }} className='flex-col'>
        {renderCard(conticnents[0])}
        {renderCard(conticnents[1])}
      </div>

      {/* Center image in its own div */}
      <Attractions/>

      {/* Testimonials Section */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 0', backgroundColor: '#f9f9f9'}}  className='border-b-[8px] border-[#ffb443] '>
        <h2 style={{ fontSize: '3.2rem', letterSpacing: 3, fontFamily:"serif" ,marginBottom: 12, color: '#333', fontWeight: 300 }}>
          WHAT TRAVELERS SAY
        </h2>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 48 }}>
          <div style={{ width: 50, height: 2, background: 'linear-gradient(90deg, transparent, #c9a961)' }}></div>
          <IoIosAirplane style={{ fontSize: '2rem', color: '#c9a961' }} />
          <div style={{ width: 50, height: 2, background: 'linear-gradient(90deg, #c9a961, transparent)' }}></div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 40, maxWidth: 990, margin: '0 auto', padding: '0 24px' }}>
          {/* Left Arrow */}
          <div style={{ fontSize: '2.4rem', color: '#a89968', cursor: 'pointer' }}>{'<'}</div>

          {/* Quote Content */}
          <div style={{ textAlign: 'center', flex: 1 }}>
            <p style={{ fontSize: '1.8rem', lineHeight: 1.8, fontFamily:"serif" , color: '#333', marginBottom: 24}}>
              "India is the cradle of the human race, the birthplace of human speech, the mother of history, the grandmother of legend, and the great grandmother of tradition."
            </p>

            {/* Avatar */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#ddd', overflow: 'hidden', border: '3px solid #c9a961' }}>
                <img src={nature} alt='avatar' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>

            {/* Author Info */}
            <p style={{ fontSize: '1.2rem', color: '#c9a961', fontFamily:'serif' , fontWeight: 600, margin: '8px 0' }}>— Mark Twain —</p>
            <p style={{ fontSize: '1.2rem', color: '#a89968', fontFamily:'serif' , margin: '4px 0' }}>"The Father of American Literature"</p>
            <p style={{ fontSize: '1.2rem', color: '#a89968', fontFamily:'serif', margin: 0 }}>American Humorist, Novelist, and Travel writer (America, USA)</p>
          </div>

          {/* Right Arrow */}
          <div style={{ fontSize: '2.4rem', color: '#a89968', cursor: 'pointer' }}>{'>'}</div>
        </div>
      </div>

      {/* Bottom row: two cards */}
      <div style={{ display: 'flex', gap: 16, width: '100%' }} className='flex-col'>
        {renderCard2(conticnents[2])}
        {renderCard2(conticnents[3])}
      </div>
    </div>
  );
}















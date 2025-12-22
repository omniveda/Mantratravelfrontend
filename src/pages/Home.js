import React, { useRef } from 'react';
import hero1 from '../assets/Home_page/hero1.png';
import hero2 from '../assets/Home_page/hero2.png';
import nature1 from '../assets/images/nature1.png';
import nature from '../assets/Home_page/Natur.png';
import Tapes from '../assets/Home_page/Tapes.png';
import Holiday from '../components/Holiday';
import Holiday2 from '../components/Holiday2';
import SeasonalGuide from '../components/SeasonalGuide';
import Destination from '../components/Destination';
import TravellersStory from '../components/TravellersStory';
import Adventures from '../components/Adventures';
import Stay_touch from '../assets/Home_page/Stay_touch.png';
import TravelBook from '../components/TravelBook';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const featuredList = [
    {
      title: "NATURE'S FASTEST HUNTER THE TRUE MARVEL OF THE WILD.",
      image: nature
    },
    {
      title: "A TAPESTRY WOVEN With countless truths and hidden realities.",
      image: Tapes
    },
    {
      title: "THE SPIRITUAL LANDSCAPE OF INDIA A JOURNEY THROUGH FAITH AND TRADITION.",
      image: nature1
    }
  ];
  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", background: '#fafafa', minHeight: '100vh' }}>
      

      {/* Hero Section - Destinations for Every Bucket List */}
      <section style={{
        padding: '0',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '1400px' }}>
          <div style={{
            flex: 1,
            backgroundImage: `url(${hero1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '3%',
              left: '0',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              background: 'rgba(0,0,0,0.5)',
              padding: '10px 0',
              borderRadius: '5px'
            }}>
              {['nature', 'wildlife', 'adventures', 'heritage', 'spirituality' ,'cities', 'culture'].map((item, idx) => (
                <button
  key={idx}
  style={{
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
    padding: '5px 10px'
  }}
  className='hover:scale-105 transition-all duration-300'
  onClick={()=>{
    navigate(`/${item}`)
  }}
>
  {item.charAt(0).toUpperCase() + item.slice(1)}
</button>

              ))}
            </div>
          </div>
          <div style={{
            flex: 1,
            backgroundImage: `url(${hero2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#fff',
              textAlign: 'center',
              // background: 'rgba(0,0,0,0.5)',
              padding: '20px',
              borderRadius: '5px'
            }}>
              <h1 style={{
                fontSize: '6rem',
                fontFamily: '"PT Serif", serif',
                fontWeight: 'Bold',
                margin: '20px 0',
                lineHeight: '1.2'
              }}>
                DESTINATIONS
              </h1>
              <h2 style={{
                fontSize: '2rem',
                margin: '20px 0',
                lineHeight: '0',
                marginBottom: '30%'
              }}>FOR EVERY BUCKET LIST</h2>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>
                 India 
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content Cards */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '40% 60%',
        gap: '18px',
        paddingTop: '40px',
        // maxWidth: 'full',
        // margin: 'auto'
        margin:"0px 20px"
      }}>
        <div>
          <h3 className='text-[4rem] font-bold'>EXPLORE</h3>
        <p style={{
          maxWidth: '700px',
          margin: '20px auto',
          fontSize: '1.5rem',
          color: '#555',
          lineHeight: '1.6'
        }}>
          Explore everything—from wildlife and heritage to gastronomy, wellness, theme-escapes and hidden gems—blended with adventure, spiritual retreats, arts, rural tranquility, beaches, cities and even wedding-worthy locales, all on one discovery hub.
        </p></div>
        <div>
        <div style={{ display: 'flex', overflowX: 'auto', gap: '24px', paddingBottom: '20px' }} ref={scrollRef}>
          {featuredList.map((item, idx) => (
            <div key={idx} style={{
              background: item.image ? `url(${item.image})` : '#e3e3e3',
              backgroundSize: item.image ? 'contain' : 'initial',
              backgroundPosition: item.image ? 'center' : 'initial',
              // border: '2px dashed #b0b0b0',
              padding: '30px 20px',
              paddingRight:"10rem",
              textAlign: 'left',
              height: idx === 0 ? '25rem' : 'auto',
              minWidth: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
              height: '500px'
            }}>
              <h3 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '10px', fontWeight: 'bold' }}>
                {item.title}
              </h3>
              <button style={{
                marginTop: '',
                background: 'transparent',
                color: 'white',
                padding: '0px 0px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1.5rem',
              }}>
                READ
              </button>
            </div>
          ))}
          </div>
        <div style={{display:"flex", justifyContent: 'right', gap: '10px', marginTop: '20px' }}>
          <button onClick={() => scrollRef.current.scrollLeft -= 300} style={{
            background: '',
            color: '#black',
            border: '2px solid #747474ff',
            borderRadius: '10px',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            fontSize: '1.2rem'
          }}>
            ←
          </button>
          <button onClick={() => scrollRef.current.scrollLeft += 300} style={{
            background: '',
            color: '#black',
            border: '2px solid #747474ff',
            borderRadius: '10px',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            fontSize: '1.2rem'
          }}>
            →
          </button>
        </div>
        </div>
      </section>

      {/* Continental Travel Cards */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '24px',
        paddingTop: '40px',
        margin:"0px 20px"
      }}>
        <Holiday />
      </section>

      {/* Attractions Section */}
      <section style={{
        background: 'black',
        padding: '60px 180px',
        textAlign: 'center',
        marginTop: '80px',
      }}>
        <SeasonalGuide />
      </section>

      {/* Traveler Quote */}
      <section style={{
        margin: '10px auto',
        padding: '30px',
        
      }}>
        <Holiday2 />
      </section>

      {/* Destination Picks Grid */}
      <section style={{ padding: '30px', margin: '10px auto' }}>
        <Destination/>
      </section>

      {/* Additional Travel Categories */}
      <section style={{
        padding: '30px',
        margin: '10px auto'
      }}>
        <TravellersStory/>
      </section>

      <section style={{
        padding: '30px',
        margin: '10px auto'
      }}>
        <Adventures/>
      </section>

      <section style={{
        padding: '0px 30px',
        margin: '0px auto'
      }}>
        <img src={Stay_touch} alt="" />
      </section>

      <section style={{
        padding: '0px 30px',
        margin: '0px 0px 20px auto'
      }}>
        <TravelBook/>
      </section>

    </div>
  );
};

export default Home;

import { useState, useEffect } from 'react';
import axios from 'axios';
import spirituality_hero from '../assets/images/sprituality_hero.png';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaBookmark, FaComment } from 'react-icons/fa';

export default function Spirituality() {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const[exploreBlog,setExploreBlog]=useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get('/api/blogs?tag=spirituality');
                setBlogs(res.data);
            } catch (err) {
                console.error("Error fetching nature blogs", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    useEffect(() => {
        const fetchExploreBlogs = async () => {
            try {
                const res = await axios.get('/api/blogs?tag=explorespirituality');
                setExploreBlog(res.data);
            } catch (err) {
                console.error("Error fetching nature blogs", err);
            } finally {
                setLoading(false);
            }
        };
        fetchExploreBlogs();
    }, []);

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', height: '680px' }}>
                <div style={{
                    flex: 1,
                    backgroundImage: `url(${spirituality_hero})`,
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
                        {['nature', 'wildlife', 'adventures', 'heritage', 'spirituality', 'cities', 'culture'].map((item, idx) => (
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
                                onClick={() => {
                                    navigate(`/${item}`)
                                }}
                            >
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </button>
                        ))}
                    </div>
                    <p
                        style={{
                            position: 'absolute',
                            bottom: '3%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                        }}
                        className="nature-text"
                    >
                        SPIRITUALITY
                    </p>

                </div>
            </div>

            {/* Blog Grid Section */}
            <div className="bg-[#0f172a] py-16 px-8 min-h-screen">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    {loading ? (
                        <p className="text-white text-center col-span-2">Loading blogs...</p>
                    ) : blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <div key={blog._id} className="text-white">
                                {/* Image Container */}
                                <div className="relative rounded-lg overflow-hidden mb-6 group">
                                    <img
                                        src={blog.image || 'https://via.placeholder.com/600x400'}
                                        alt={blog.heading}
                                        className="w-full h-[350px] object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {/* Icons Overlay */}
                                    <div className="absolute bottom-4 left-4 flex gap-3">
                                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/40 cursor-pointer transition">
                                            <FaHeart className="w-5 h-5" />
                                        </div>
                                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/40 cursor-pointer transition">
                                            <FaBookmark className="w-5 h-5" />
                                        </div>
                                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/40 cursor-pointer transition">
                                            <FaComment className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold mb-2 leading-tight">
                                    {blog.heading}
                                </h3>
                                <p className="text-gray-400 text-sm font-bold tracking-widest uppercase mb-4">
                                    NATURE REVIEW
                                </p>
                                <p className="text-gray-300 text-lg leading-relaxed mb-6 line-clamp-3">
                                    {blog.description}
                                </p>
                                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded text-sm tracking-wider transition-colors uppercase">
                                    Read More
                                </button>
                                <div className="border-b border-gray-700 mt-10"></div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-center col-span-2">No nature blogs found.</p>
                    )}
                </div>
            </div>

            <div className='bg-white py-16 px-6 relative'>
                 <h2 className="text-center text-4xl font-bold tracking-widest mb-12">
        RELATED BLOGS
      </h2>

      {/* Arrows */}
      <button className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow rounded-full flex items-center justify-center">
        ←
      </button>

      <button className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow rounded-full flex items-center justify-center">
        →
      </button>

      {/* Blog Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {exploreBlog.map((blog) => (
          <div key={blog.id} className="relative">

            {/* Image */}
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-[350px] object-cover"
            />

            {/* Overlay (only if exists) */}
            {blog.overlayText && (
              <div className="absolute inset-0 bg-black/40 flex items-center p-6">
                <h3 className="text-white text-xl font-bold leading-snug">
                  {blog.overlayText}
                </h3>
              </div>
            )}

            {/* Content */}
            <h3 className="text-xl font-bold mt-4">{blog.title}</h3>

            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              {blog.description}
            </p>

            <button className="mt-4 px-4 py-1 bg-red-600 text-white text-xs rounded">
              READ MORE
            </button>
          </div>
        ))}

      </div>

      {/* Pagination Lines */}
      <div className="flex justify-center mt-10 gap-2">
        <span className="w-10 h-[2px] bg-black"></span>
        <span className="w-10 h-[2px] bg-gray-300"></span>
        <span className="w-10 h-[2px] bg-gray-300"></span>
      </div>
            </div>
        </>
    );
}

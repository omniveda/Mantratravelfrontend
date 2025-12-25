import React from 'react';

export default function About() {
    return (
        <div className="bg-black text-white min-h-screen font-sans selection:bg-red-600 selection:text-white">

            {/* HER HERO SECTION */}
            <div className="relative pt-20 pb-16 border-b border-gray-800">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#D10000] mb-6">About Us</h1>
                    <p className="text-xl md:text-3xl font-light text-gray-200 leading-relaxed max-w-4xl mx-auto">
                        Welcome to <span className="font-bold text-white">VOYABYTE</span> — a global digital platform created for travelers, thinkers, readers, and conscious shoppers.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-20">

                {/* INTRO GRID */}
                <div className="grid md:grid-cols-1 gap-16 mb-24 items-center">
                    <div className="text-lg text-gray-400 leading-relaxed space-y-6">
                        <p>
                            We are not just a travel blog. We are a world-class content and lifestyle platform that brings together travel inspiration, global news, and curated shopping — all under one trusted space. Our work is rooted in thoughtful storytelling, responsible information, and meaningful curation – not noise, not trends.
                        </p>
                        <p className="text-2xl font-serif text-white italic border-l-4 border-[#D10000] pl-6">
                            VOYABYTE is not designed for scrolling. It’s designed for understanding.
                        </p>
                    </div>
                    {/* Placeholder for an image or graphic element */}
            
                </div>

                {/* 3 PILLARS */}
                <div className="grid lg:grid-cols-3 gap-8 mb-24">
                    {/* Pillar 1 */}
                    <div className="bg-[#1c1c1c] p-8 rounded-2xl border border-gray-800 hover:border-[#D10000] transition duration-500 group">
                        <div className="w-12 h-12 bg-[#D10000] rounded-full flex items-center justify-center text-2xl mb-6">✈</div>
                        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#D10000] transition">Travel Beyond Destinations</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            Travel is at the heart of our platform. At VOYABYTE we publish in-depth travel guides, destination stories, planning tips, and cultural insights from across the world.
                            Our travel content is designed for real travelers — people who seek experiences, meaning, and smart planning, not just trends.
                        </p>
                    </div>

                    {/* Pillar 2 */}
                    <div className="bg-[#1c1c1c] p-8 rounded-2xl border border-gray-800 hover:border-[#D10000] transition duration-500 group">
                        <div className="w-12 h-12 bg-[#D10000] rounded-full flex items-center justify-center text-2xl mb-6">🌍</div>
                        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#D10000] transition">World News That Matters</h3>
                        <p className="text-gray-400 leading-relaxed text-sm mb-4">
                            VOYABYTE cover global news and stories from around the world, including:
                            World & Politics, Cinema & Entertainment, Sports & Global Events, Food & Culture, Health, Wellness & Lifestyle, Society, Trends & Human Stories.
                        </p>
                        <p className="text-gray-500 text-xs italic">
                            Our approach to news is simple: clarity over chaos, context over clicks. We aim to inform - not inflame. To explain - not overwhelm.
                        </p>
                    </div>

                    {/* Pillar 3 */}
                    <div className="bg-[#1c1c1c] p-8 rounded-2xl border border-gray-800 hover:border-[#D10000] transition duration-500 group">
                        <div className="w-12 h-12 bg-[#D10000] rounded-full flex items-center justify-center text-2xl mb-6">🛍</div>
                        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#D10000] transition">Curated Shopping</h3>
                        <p className="text-gray-400 leading-relaxed text-sm mb-4">
                            Our shopping section is thoughtfully designed for people who value creativity, beauty, and conscious living.
                            Digital Paintings, Lifestyle Products, Cosmetics & Self-Care Essentials.
                        </p>
                        <p className="text-gray-500 text-xs italic">
                            Every product featured on our platform aligns with our values of quality, creativity, and usability — not mass promotion.
                        </p>
                    </div>
                </div>

                {/* EDITORIAL VALUES */}
                <div className="mb-24">
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white tracking-tighter">Our Editorial Values</h2>
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                        <ul className="space-y-4 text-gray-300">
                            {[
                                "Original Ideas and Independent research.",
                                "Global awareness with human perspective",
                                "Responsible information sharing.",
                                "Creativity, art, and conscious choices."
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="text-[#D10000] mt-1">✦</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <ul className="space-y-4 text-gray-300">
                            {[
                                "Creative direction guided by human perspective.",
                                "Ethical and transparent use of technology.",
                                "Respect for people, cultures and readers.",
                                "We do not chase noise — we create meaningful digital experiences."
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="text-[#D10000] mt-1">✦</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-[#121212] p-8 mt-12 rounded-xl text-center border border-gray-800">
                        <p className="text-gray-400 max-w-3xl mx-auto mb-4 text-sm">
                            Our content is conceptualized, researched, reviewed and curated by our editorial team, with the support of advance AI tools for drafting, editing, and optimization. All published content is reviewed for accuracy, clarity, relevance, and value before being shared with our audience.
                        </p>
                        <p className="text-[#D10000] font-bold tracking-widest text-sm uppercase">We follow Google’s E-E-A-T principles: Experience • Expertise • Authority • Trust</p>
                    </div>
                </div>

                {/* MISSION & VISION */}
                <div className="grid md:grid-cols-2 gap-8 mb-24">
                    <div className="bg-gradient-to-br from-[#D10000] to-red-900 p-10 rounded-2xl text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 text-9xl text-black opacity-10 font-black -mr-10 -mt-10">M</div>
                        <h3 className="text-2xl font-bold mb-4 uppercase tracking-wider border-b border-white/20 pb-4">Our Mission</h3>
                        <p className="text-white/90 text-lg font-light leading-relaxed">
                            To build a global platform that informs, inspires, and empowers people through travel, world awareness, creativity, and conscious shopping.
                        </p>
                    </div>
                    <div className="bg-[#1c1c1c] p-10 rounded-2xl border border-gray-700 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 text-9xl text-white opacity-5 font-black -mr-10 -mt-10">V</div>
                        <h3 className="text-2xl font-bold mb-4 uppercase tracking-wider text-teal-500 border-b border-gray-700 pb-4">Our Vision</h3>
                        <p className="text-gray-300 text-lg font-light leading-relaxed">
                            To grow into a trusted international digital brand where people come not just to read — but to understand, explore, and evolve.
                        </p>
                    </div>
                </div>

                {/* TEAM SECTION & SEPARATOR */}
                <div className="border-t border-gray-800 pt-20 mb-20">
                    <div className="text-center mb-16">
                        <span className="text-[#D10000] font-bold uppercase tracking-[0.3em] text-sm">The Minds Behind</span>
                        <h2 className="text-5xl md:text-6xl font-black text-white mt-2">OUR TEAM</h2>
                    </div>

                    <div className="space-y-24">

                        {/* MARSHLYN */}
                        <div className="grid md:grid-cols-12 gap-10 items-start">
                            <div className="md:col-span-4 lg:col-span-3">
                                <div className="aspect-[3/4] bg-gray-800 rounded-xl overflow-hidden grayscale hover:grayscale-0 transition duration-700 relative group">
                                    {/* Placeholder for Profile IMG */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-[#252525] text-gray-600">
                                        Marshlyn Image
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <h3 className="text-2xl font-bold text-white leading-none">MARSHLYN</h3>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-[#D10000] font-bold text-sm tracking-widest uppercase">Editor-in Chief</p>
                                    <p className="text-gray-500 text-xs uppercase">Voyabyte</p>
                                </div>
                            </div>
                            <div className="md:col-span-8 lg:col-span-9 text-gray-300 leading-relaxed text-sm space-y-4">
                                <p>
                                    Marshlyn Porter is the Editor-in-Chief and editorial architect of Voyabyte, overseeing the platform’s content vision, editorial standards, and research-driven storytelling. She leads content strategy, in-depth research, editorial planning, and final review—ensuring every published piece meets the highest standards of credibility, clarity, and global relevance.
                                </p>
                                <p>
                                    Marshlyn began her professional journey as a content writer in national and regional newspapers in 2009, an experience that laid the foundation for her writing discipline, editorial precision, and narrative depth. Over the years, she went on to serve in editorial roles for national magazines, further sharpening her ability to shape stories with clarity, responsibility, and purpose.
                                </p>
                                <p>
                                    While pursuing her Master’s degree, Marshlyn participated in a Global Understanding Program on Indian culture and the education system in collaboration with East Carolina University in 2010. This cross-cultural academic exposure became a defining moment in her life—deepening her understanding of people and cultures beyond borders, and igniting a lasting curiosity to explore the world and its diverse narratives.
                                </p>
                                <p>
                                    <strong>Graduating as a Gold Medalist in her Master’s in Literature</strong> further refined her analytical thinking, research depth, and command over language-skills that continue to define her editorial leadership. Her academic engagement is further reflected in her published research papers in the fields of Poetry and Drama in national journals.
                                </p>
                                <p>
                                    Extending her storytelling beyond the written word, Marshlyn has also worked as a voice-over artist with Akashwani and Doordarshan National Radio—an experience that refined her understanding of voice, tone, and audience connection.
                                </p>
                                <p>
                                    With a keen eye on evolving global trends and cultural shifts, Marshlyn believes impactful content is created where rigorous research meets lived experience. Under her editorial leadership, Voyabyte is committed to informing, inspiring, and connecting readers through thoughtful, trustworthy, and meaningful storytelling.
                                </p>
                            </div>
                        </div>

                        {/* SHAAN */}
                        <div className="grid md:grid-cols-12 gap-10 items-start">
                            <div className="md:col-span-4 lg:col-span-3">
                                <div className="aspect-[3/4] bg-gray-800 rounded-xl overflow-hidden grayscale hover:grayscale-0 transition duration-700 relative group">
                                    <div className="absolute inset-0 flex items-center justify-center bg-[#252525] text-gray-600">
                                        Shaan Image
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <h3 className="text-2xl font-bold text-white leading-none">SHAAN PATEL</h3>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-[#D10000] font-bold text-sm tracking-widest uppercase">Creative Head</p>
                                    <p className="text-gray-500 text-xs uppercase">Conceptual Architect</p>
                                </div>
                            </div>
                            <div className="md:col-span-8 lg:col-span-9 text-gray-300 leading-relaxed text-sm space-y-4">
                                <p>
                                    Shaan is the creative brain and conceptual pillar behind the platform. As Creative Head, he leads design, branding, marketing, and sales—shaping not just how the website looks, but how it thinks and feels.
                                </p>
                                <p>
                                    His research-driven mindset was evident early. At just 21.5, Shaan held a key managerial role at HDFC Standard Life, leading a team of 90+ agents. A playwright at heart, Shaan actively participated in stage plays, sharpening his ability to translate abstract ideas into compelling stories. Parallel to this, he proved his discipline as a national-level medalist in athletics.
                                </p>
                                <p>
                                    He simultaneously immersed himself in global philosophies, civilizations, and belief systems. Through his writing, especially poetry, he has left a distinct mark of philosophical inquiry—expressing themes of war, love, spirituality, humanity, and the universe. His words reflect a mind that does not merely observe life, but interrogates it.
                                </p>
                                <p>
                                    With a deep love for technology, Shaan constantly explores emerging tools and digital systems. This fluency allows him to bridge creativity with function—where aesthetics are supported by logic. It is this unique blend of research-driven thinking, creative sensitivity, leadership discipline, and technological fluency that enabled him to give Voyabyte its distinctive creative rendition.
                                </p>
                                <div className="bg-[#1c1c1c] p-4 rounded border-l-2 border-[#D10000] text-gray-400 italic">
                                    Athlete → Corporate Manager → Theatre Practitioner → Poet → Company Director → Philosopher → Spiritual Healer.
                                </div>
                            </div>
                        </div>

                        {/* RIYA */}
                        <div className="grid md:grid-cols-12 gap-10 items-start">
                            <div className="md:col-span-4 lg:col-span-3">
                                <div className="aspect-[3/4] bg-gray-800 rounded-xl overflow-hidden grayscale hover:grayscale-0 transition duration-700 relative group">
                                    <div className="absolute inset-0 flex items-center justify-center bg-[#252525] text-gray-600">
                                        Riya Image
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <h3 className="text-2xl font-bold text-white leading-none">RIYA JAIN</h3>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-[#D10000] font-bold text-sm tracking-widest uppercase">Travel & Lifestyle</p>
                                    <p className="text-gray-500 text-xs uppercase">HR & People Insight</p>
                                </div>
                            </div>
                            <div className="md:col-span-8 lg:col-span-9 text-gray-300 leading-relaxed text-sm space-y-4">
                                <p>
                                    Riya is an enthusiastic traveler and avid reader with a deep love for research, fashion, and styling. She brings fresh perspectives through her exploration-driven mindset, contributing insights that seamlessly blend travel experiences, cultural awareness, and style sensibility.
                                </p>
                                <p>
                                    From 2021 to 2025, Riya served as the HR Head at Mantra Financial & Services Pvt. Ltd. This leadership role gave her a deep understanding of people management and industry dynamics. Her experience strengthened her problem-solving abilities and sharpened her insight into human behavior—skills she now brings into Voyabyte to help the team better understand evolving audience needs.
                                </p>
                                <p>
                                    Drawing from this professional background, Riya contributes a reader-first perspective—understanding what audiences seek as travel stories, what they engage with as content consumers, and how they think as customers.
                                </p>
                                <p>
                                    A careful and mindful traveler, she views every journey as a story worth preserving. She ensures her travels become lifetime memories—captured not only through lived experiences but also through heartfelt journaling.
                                </p>
                                <p className="text-white font-bold italic">
                                    “Keep traveling, keep exploring, and enjoy life.”
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* FOOTER AREA INVITATION */}
                <div className="bg-[#1c1c1c] p-12 rounded-3xl text-center mb-20 border border-t-[6px] border-[#D10000]">
                    <h3 className="text-3xl font-bold text-white mb-6 uppercase tracking-wider">An Invitation</h3>
                    <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8 font-light">
                        Voyabyte is for readers who want more than headlines, more than itineraries, and more than products. If you believe that how we travel, what we consume, and what we read shapes who we become — you belong here.
                    </p>
                    <div className="text-[#D10000] font-bold text-lg tracking-widest uppercase mb-10">
                        Voyabyte — where travel, truth, and creative living converge.
                    </div>
                </div>

                {/* JOIN COMMUNITY */}
                <div className="text-center mb-24">
                    <h4 className="text-2xl font-bold text-teal-400 mb-4 uppercase">Join Our Global Community</h4>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                        Stay connected with VOYABYTE for travel stories, world updates, creative art, lifestyle products, and meaningful content that adds value to your life.
                    </p>
                    <p className="text-white font-serif italic text-2xl">Explore the world. Stay informed. Live consciously.</p>
                </div>

                {/* FOOTER LINKS STUB - Replicating the Bottom Part of Input */}
                <div className="border-t border-gray-800 pt-10 text-center text-xs text-gray-500 uppercase tracking-widest space-x-6 mb-10">
                    <span>About Us</span>
                    <span>Policy Page</span>
                    <span>Terms of Use</span>
                    <span>Contact</span>
                </div>
                <div className="text-center text-[10px] text-gray-600 max-w-4xl mx-auto leading-relaxed">
                    VOYABYTE contains affiliate links. This means if you purchase a product or service through one of these links, we may earn a small commission at no extra cost to you. We only recommend experiences, destinations and services that we genuinely believe add value to our readers. Your support helps us keep VOYABYTE running and continue creating high-quality travel content. Thank you for being part of our journey.
                </div>

            </div>
        </div>
    );
}
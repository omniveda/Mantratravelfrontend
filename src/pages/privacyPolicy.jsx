import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="bg-black text-white min-h-screen font-sans selection:bg-red-600 selection:text-white pt-20 pb-20">
            <div className="max-w-4xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16 border-b border-gray-800 pb-10">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#D10000] mb-4">Privacy Policy & Platform Disclosures</h1>
                    <p className="text-gray-400 text-sm uppercase tracking-widest">
                        Last Updated: December 22, 2025
                    </p>
                </div>

                {/* Intro */}
                <div className="text-gray-300 leading-relaxed mb-12">
                    <p className="text-lg mb-6">
                        At <span className="text-white font-bold">Voyabyte</span>, your privacy and trust matter to us.
                        This Privacy Policy explains how we collect, use, store, and protect information across our travel content, news section, digital products, and future e-commerce services.
                        By using Voyabyte, you agree to the practices described below.
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-12 text-gray-300">

                    {/* 1. Information We Collect */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 text-[#D10000]">1. Information We Collect</h2>

                        <div className="mb-6">
                            <h3 className="font-bold text-white mb-2">a) Personal Information</h3>
                            <p className="mb-2">We may collect personal information when you:</p>
                            <ul className="list-disc ml-6 space-y-1 text-gray-400 mb-2">
                                <li>Subscribe to newsletters</li>
                                <li>Contact us</li>
                                <li>Purchase digital products</li>
                                <li>Participate in surveys or forms</li>
                            </ul>
                            <p className="mb-2">This may include:</p>
                            <ul className="list-disc ml-6 space-y-1 text-gray-400">
                                <li>Name, Email address</li>
                                <li>Billing or transactional details (where applicable)</li>
                            </ul>
                            <p className="mt-2 text-sm italic">We do not collect sensitive personal data unless explicitly required for a service.</p>
                        </div>

                        <div>
                            <h3 className="font-bold text-white mb-2">b) Non-Personal & Technical Information</h3>
                            <p className="mb-2">Automatically collected data may include:</p>
                            <ul className="list-disc ml-6 space-y-1 text-gray-400">
                                <li>IP address</li>
                                <li>Browser type & Device information</li>
                                <li>Pages visited and interaction behavior</li>
                            </ul>
                            <p className="mt-2">This data helps us understand how visitors use our website and improve performance.</p>
                        </div>
                    </section>

                    {/* 2. Cookies */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 text-[#D10000]">2. Cookies & Tracking Technologies</h2>
                        <p className="mb-2">Voyabyte uses cookies and similar technologies to:</p>
                        <ul className="list-disc ml-6 space-y-1 text-gray-400 mb-4">
                            <li>Improve website functionality</li>
                            <li>Analyze traffic and user behavior</li>
                            <li>Remember user preferences</li>
                            <li>Support affiliate tracking</li>
                        </ul>
                        <p className="mb-2">Cookies may be:</p>
                        <ul className="list-disc ml-6 space-y-1 text-gray-400">
                            <li>Essential cookies (site functionality)</li>
                            <li>Analytics cookies</li>
                            <li>Third-party cookies</li>
                        </ul>
                        <p className="mt-4">You can control or disable cookies through your browser settings.</p>
                    </section>

                    {/* 3. Analytics */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 text-[#D10000]">3. Use of Analytics & Third-Party Tools</h2>
                        <p className="mb-2">We use tools such as Google Analytics to understand:</p>
                        <ul className="list-disc ml-6 space-y-1 text-gray-400">
                            <li>Visitor behavior</li>
                            <li>Content performance</li>
                            <li>Website traffic patterns</li>
                        </ul>
                        <p className="mt-4">These tools may collect anonymized data through cookies. Voyabyte does not control how third parties process data collected independently.</p>
                    </section>

                    {/* 4. Usage */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 text-[#D10000]">4. How We Use Your Information</h2>
                        <p className="mb-2">We use collected information to:</p>
                        <ul className="list-disc ml-6 space-y-1 text-gray-400">
                            <li>Provide and improve content and services.</li>
                            <li>Send newsletters or updates (only if you opt-in).</li>
                            <li>Process transactions and digital product delivery.</li>
                            <li>Improve website security and performance.</li>
                        </ul>
                        <p className="mt-4 font-bold text-teal-400">We never sell or rent personal data to third parties.</p>
                    </section>

                    {/* 5. News Disclaimer */}
                    <section className="bg-[#1c1c1c] p-6 rounded-xl border border-gray-800">
                        <h2 className="text-2xl font-bold text-white mb-4 text-[#D10000]">5. News Content Disclaimer</h2>
                        <p className="text-sm font-bold uppercase tracking-widest mb-2 text-gray-500">(IMPORTANT – MEDIA PROTECTION)</p>
                        <p>
                            Voyabyte publishes global news and informational content compiled from official news outlets, public statements, verified publications, and reputable sources. News content is for informational purposes only. Readers are encouraged to verify facts from original or official sources. Content is not intended to influence opinions, manipulate narratives, or misrepresent facts. We take care to avoid copyright infringement and present content in a transformative, summarized, or explanatory manner.
                        </p>
                    </section>

                    {/* 6. Content Creation */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 text-[#D10000]">6. Content Creation & Editorial Process</h2>
                        <div className="space-y-4">
                            <p>
                                At Voyabyte, content is built through a structured and responsible editorial process. All content is conceptualized, planned, and creatively directed by the Voyabyte team. Research is conducted using multiple credible sources, including official websites, public institutions, and verified publications.
                            </p>
                            <p>
                                Drafting, editing, and language optimization may be supported using licensed AI tools such as ChatGPT, Gemini, and Perplexity. AI tools are used strictly as assistive technology to enhance efficiency and clarity.
                            </p>
                            <p>
                                Final decisions related to content direction, structure, context, accuracy, and ethical presentation are made by the Voyabyte editorial team. Care is taken to ensure the ethical, legal, and justified use of AI tools, with full editorial responsibility remaining human-led.
                            </p>

                            <div className="mt-6">
                                <h3 className="font-bold text-white mb-2">A) Content Updates & Corrections</h3>
                                <p>Voyabyte reserves the right to update, correct, or revise published content to reflect new information, improved clarity, or editorial corrections.</p>
                            </div>
                            <div className="mt-4">
                                <h3 className="font-bold text-white mb-2">B) User Responsibility Clause</h3>
                                <p>Readers are encouraged to use their discretion and verify important information from official or primary sources before making decisions based on published content.</p>
                            </div>
                        </div>
                    </section>

                    {/* 7. Visual Content */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 text-[#D10000]">7. Visual Content & Media Usage</h2>
                        <p className="mb-4">
                            Voyabyte considers visual storytelling to be an integral part of content. Images, graphics, and videos are created, customized, or edited using licensed creative platforms such as Canva.
                        </p>
                        <p>
                            We make reasonable efforts to ensure that all visual assets used on the platform are either licensed, properly sourced, or originally designed. Content is visually adapted to align with Voyabyte’s editorial tone and brand identity. We do not knowingly use unauthorized or infringing media, and any concerns raised are addressed promptly and responsibly.
                        </p>
                    </section>

                    {/* 8. Affiliate */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 text-[#D10000]">8. Affiliate Links & Monetization</h2>
                        <p>
                            Voyabyte may earn revenue through affiliate links, sponsored mentions, or partnerships. These monetization methods help support the ongoing creation and maintenance of the platform. Affiliate relationships do not influence our editorial decisions. Product mentions, recommendations, or references are made based on relevance, usefulness, and alignment with our content values. Any earnings generated through affiliate links do not impact the price paid by the user.
                        </p>
                    </section>

                    {/* 9. Digital Products */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 text-[#D10000]">9. Digital Products, Transactions & Future Commerce</h2>
                        <p className="mb-4">
                            Voyabyte currently offers digital products such as downloadable artwork and may expand into physical products, dropshipping, or full e-commerce services in the future.
                        </p>
                        <p className="mb-4">
                            Transactional information is collected strictly for the purpose of completing purchases, delivering products, and maintaining basic transaction records. Payment processing is handled through secure third-party providers, and Voyabyte does not store complete payment details on its own servers.
                        </p>
                        <p>
                            Digital products are generally non-refundable unless explicitly stated at the time of purchase.
                        </p>
                    </section>

                    {/* 10. Data Protection */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 text-[#D10000]">10. Data Protection & Security</h2>
                        <p>
                            We take reasonable technical and organizational measures to protect personal information from unauthorized access, misuse, alteration, or disclosure. While we strive to safeguard user data, no digital transmission or storage system can be guaranteed to be completely secure. Users acknowledge and accept this inherent risk when interacting with online platforms.
                        </p>
                    </section>

                    {/* 11. Newsletters */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 text-[#D10000]">11. Newsletters & Email Communications</h2>
                        <p>
                            Voyabyte offers optional email newsletters for users who choose to stay connected with our content. Subscriptions are opt-in only, and users may unsubscribe at any time through links included in our emails. Email communication may include travel stories, news highlights, creative updates, or platform-related information. We do not send spam or misuse subscriber data.
                        </p>
                    </section>

                    {/* 12. External Links */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 text-[#D10000]">12. External Links & Third Party Websites</h2>
                        <p>
                            Voyabyte may include links to external websites or third-party services for reference, convenience, or additional information. We are not responsible for the content, privacy practices, or policies of external websites. Users are encouraged to review the terms and privacy policies of any third-party sites they choose to visit.
                        </p>
                    </section>

                    {/* 13. Updates */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 text-[#D10000]">13. Policy Updates & Revision</h2>
                        <p>
                            Voyabyte may update or revise this policy periodically to reflect changes in legal requirements, platform features, or editorial practices. Any updates will be published on this page with a revised effective date. Continued use of the website after changes are made constitutes acceptance of the updated policy.
                        </p>
                    </section>

                    {/* 14. Contact */}
                    <section className="bg-[#1c1c1c] p-6 rounded-lg border-l-4 border-[#D10000]">
                        <h2 className="text-2xl font-bold text-white mb-4 text-[#D10000]">14. Contact & Communication</h2>
                        <p>
                            For questions related to privacy, content accuracy, copyright concerns, or data usage, users may contact Voyabyte through the official contact details provided on the website. We aim to address genuine concerns responsibly and within a reasonable timeframe.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    )
}
import React from 'react';

export default function TermsAndCondition() {
    return (
        <div className="bg-black text-white min-h-screen font-sans selection:bg-red-600 selection:text-white pt-20 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16 border-b border-gray-800 pb-10">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#D10000] mb-4">Terms of Use</h1>
                    <p className="text-gray-400 text-sm uppercase tracking-widest">
                        Effective Date: [Add launch date] | Last Updated: [Auto update]
                    </p>
                </div>

                {/* Introduction */}
                <div className="text-gray-300 leading-relaxed mb-12">
                    <p className="text-lg mb-6">
                        Welcome to <span className="text-white font-bold">Voyabyte</span>. By accessing or using this website, you agree to comply with and be bound by the following Terms of Use. If you do not agree, please discontinue use of the site.
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-12 text-gray-300">

                    {/* 1. About Voyabyte */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-[#D10000]">1.</span> About Voyabyte
                        </h2>
                        <p>
                            Voyabyte is a global travel and lifestyle platform that publishes travel stories, destination guides, news content, visual art, and digital products. In the future, Voyabyte may also offer e-commerce, dropshipping, and other online services. All content published on Voyabyte is intended to inform, inspire, and educate readers.
                        </p>
                    </section>

                    {/* 2. Use of Website */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-[#D10000]">2.</span> Use of Website
                        </h2>
                        <p className="mb-4">You agree to use Voyabyte for lawful purposes only. You must not:</p>
                        <ul className="list-disc ml-6 space-y-2 text-gray-400">
                            <li>Engage in activities that violate laws or regulations.</li>
                            <li>Attempt to harm, disrupt, or misuse the website.</li>
                            <li>Copy, scrape, or misuse content without permission.</li>
                        </ul>
                        <p className="mt-4">We reserve the right to restrict or terminate access if misuse is detected.</p>
                    </section>

                    {/* 3. Content Disclaimer */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-[#D10000]">3.</span> Content Disclaimer
                        </h2>
                        <p>
                            Voyabyte does not provide professional travel, medical, legal, financial, or advisory services. All content is shared for general informational purposes only. Readers are advised to independently verify information and consult official authorities or qualified professionals before making decisions based on any content published on this website.
                        </p>
                    </section>

                    {/* 4. Accuracy */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-[#D10000]">4.</span> Accuracy, Timeliness & Updates
                        </h2>
                        <p className="mb-4">We make reasonable efforts to ensure content accuracy. However:</p>
                        <ul className="list-disc ml-6 space-y-2 text-gray-400">
                            <li>Information may become outdated over time.</li>
                            <li>Travel rules, prices, news, or regulations may change.</li>
                        </ul>
                        <p className="mt-4">Voyabyte does not guarantee completeness or real-time accuracy and shall not be held responsible for any errors or omissions.</p>
                    </section>

                    {/* 5. News Content Disclaimer */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-[#D10000]">5.</span> News Content Disclaimer
                        </h2>
                        <p>
                            Voyabyte may publish news summaries, features, or references sourced from official news websites, publications, and public records. Content is shared without intent to manipulate or misrepresent facts. Opinions expressed (if any) are editorial and not intended to influence public sentiment. Readers are encouraged to consult original sources for full context. Care is taken to avoid copyright infringement or misrepresentation.
                        </p>
                    </section>

                    {/* 6. AI Content */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-[#D10000]">6.</span> AI & Content Creation
                        </h2>
                        <p className="mb-4">
                            Content on Voyabyte is researched using multiple reliable sources, including official websites of governments, tourism boards, organizations, and publications. We may use licensed AI tools such as ChatGPT, Gemini, and Perplexity for drafting, structuring, editing, or research assistance.
                        </p>
                        <p className="mb-2">However:</p>
                        <ul className="list-disc ml-6 space-y-2 text-gray-400">
                            <li>Conceptualization, editorial judgment, design, storytelling, and final review are done by the Voyabyte editorial team.</li>
                            <li>Ethical, legal, and responsible use of AI tools is strictly followed.</li>
                        </ul>
                    </section>

                    {/* 7. IP Rights */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-[#D10000]">7.</span> Intellectual Property Rights
                        </h2>
                        <p>
                            Unless otherwise stated, all original content, including text, images, videos, designs, branding, and digital artwork, is the intellectual property of Voyabyte. No content may be reproduced, distributed, or reused without prior written permission.
                        </p>
                    </section>

                    {/* 8. Affiliate Disclosure */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-[#D10000]">8.</span> Affiliate & Monetization Disclosure
                        </h2>
                        <p>
                            Voyabyte may use affiliate links, sponsored content, advertisements, or partnerships. Purchases made through affiliate links may earn us a small commission. This does not affect the price paid by users. Editorial integrity and honest recommendations are always maintained.
                        </p>
                    </section>

                    {/* 9. Digital Products */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-[#D10000]">9.</span> Digital Products, Art & E-Commerce
                        </h2>
                        <p className="mb-2">Voyabyte may offer:</p>
                        <ul className="list-disc ml-6 space-y-2 text-gray-400">
                            <li>Digital paintings and downloadable content.</li>
                            <li>Physical or digital products via e-commerce or dropshipping.</li>
                        </ul>
                        <p className="mt-4">All purchases are subject to individual product terms, refund policies, and applicable laws.</p>
                    </section>

                    {/* 10. User Interaction */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-[#D10000]">10.</span> User Interaction & Submissions
                        </h2>
                        <p className="mb-2">If users submit comments, messages, feedback, or inquiries:</p>
                        <ul className="list-disc ml-6 space-y-2 text-gray-400">
                            <li>Content must not be abusive, unlawful, misleading, or infringing.</li>
                            <li>Voyabyte reserves the right to remove or moderate submissions.</li>
                        </ul>
                    </section>

                    {/* 11. Limitation of Liability */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-[#D10000]">11.</span> Limitation of Liability
                        </h2>
                        <p className="mb-4">Voyabyte shall not be liable for:</p>
                        <ul className="list-disc ml-6 space-y-2 text-gray-400">
                            <li>Direct or indirect losses arising from website use.</li>
                            <li>Travel disruptions, financial loss, or reliance on content.</li>
                            <li>Third-party websites or services linked from Voyabyte.</li>
                        </ul>
                        <p className="mt-4">Use of the site is at your own discretion and responsibility.</p>
                    </section>

                    {/* 12. Third-Party Links */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-[#D10000]">12.</span> Third-Party Links
                        </h2>
                        <p>
                            Voyabyte may link to third-party websites for reference or convenience. We do not control or endorse their content and are not responsible for their practices or policies.
                        </p>
                    </section>

                    {/* 13. Governing Law */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-[#D10000]">13.</span> Governing Law & Jurisdiction
                        </h2>
                        <p>
                            These Terms of Use shall be governed by applicable laws. Any disputes arising from use of this website shall be subject to appropriate legal jurisdiction.
                        </p>
                    </section>

                    {/* 14. Updates */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-[#D10000]">14.</span> Updates to Terms
                        </h2>
                        <p>
                            Voyabyte reserves the right to update or modify these Terms at any time. Continued use of the website constitutes acceptance of updated terms.
                        </p>
                    </section>

                    {/* 15. Contact */}
                    <section className="bg-[#1c1c1c] p-6 rounded-lg border-l-4 border-[#D10000]">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            <span className="text-[#D10000]">15.</span> Contact Information
                        </h2>
                        <p className="mb-2">For questions, concerns, or legal inquiries, please contact:</p>
                        <p className="text-teal-400 font-medium">[Add official email]</p>
                    </section>

                </div>
            </div>
        </div>
    );
}
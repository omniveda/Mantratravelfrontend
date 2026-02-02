import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const SEOHelmet = () => {
    const [seo, setSeo] = useState({
        title: "Mantra",
        description: "Your Travel Partner",
        keywords: "travel, adventure, india"
    });

    useEffect(() => {
        const fetchSEO = async () => {
            try {
                const res = await axios.get("http://localhost:4000/api/seo");
                if (res.data) {
                    setSeo(res.data);
                }
            } catch (err) {
                console.error("Error fetching SEO:", err);
            }
        };
        fetchSEO();
    }, []);

    return (
        <Helmet>
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />
            <meta name="keywords" content={seo.keywords} />
        </Helmet>
    );
};

export default SEOHelmet;

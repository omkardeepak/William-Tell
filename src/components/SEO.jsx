import { useEffect } from 'react';

const SEO = ({ title, description }) => {
    useEffect(() => {
        if (title) {
            document.title = title;
        }

        if (description) {
            // Find or create meta description tag
            let metaDescription = document.querySelector('meta[name="description"]');
            if (!metaDescription) {
                metaDescription = document.createElement('meta');
                metaDescription.setAttribute('name', 'description');
                document.head.appendChild(metaDescription);
            }
            metaDescription.setAttribute('content', description);

            // Update Open Graph and Twitter descriptions
            const ogDescription = document.querySelector('meta[property="og:description"]');
            if (ogDescription) ogDescription.setAttribute('content', description);

            const twitterDescription = document.querySelector('meta[property="twitter:description"]');
            if (twitterDescription) twitterDescription.setAttribute('content', description);
        }

        if (title) {
            const ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle) ogTitle.setAttribute('content', title);

            const twitterTitle = document.querySelector('meta[property="twitter:title"]');
            if (twitterTitle) twitterTitle.setAttribute('content', title);
        }
    }, [title, description]);

    return null;
};

export default SEO;

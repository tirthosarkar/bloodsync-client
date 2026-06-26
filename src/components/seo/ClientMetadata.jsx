// components/seo/ClientMetadata.jsx
'use client';

import { useEffect } from 'react';

export default function ClientMetadata({
  title,
  description,
  keywords = [],
  ogImage,
  ogType = 'website',
}) {
  useEffect(() => {
    // Update Document Title
    if (title) {
      document.title = title.includes('|') ? title : `${title} | BloodSync`;
    }

    // Helper function to update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const selector = isProperty
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      let metaTag = document.querySelector(selector);

      if (!metaTag) {
        metaTag = document.createElement('meta');
        if (isProperty) {
          metaTag.setAttribute('property', name);
        } else {
          metaTag.setAttribute('name', name);
        }
        document.head.appendChild(metaTag);
      }

      metaTag.setAttribute('content', content);
    };

    // Update Description
    if (description) {
      updateMetaTag('description', description);
      updateMetaTag('og:description', description, true);
    }

    // Update Keywords
    if (keywords.length > 0) {
      updateMetaTag('keywords', keywords.join(', '));
    }

    // Update OG Tags
    if (title) {
      updateMetaTag('og:title', title, true);
    }

    if (ogImage) {
      updateMetaTag('og:image', ogImage, true);
    }

    updateMetaTag('og:type', ogType, true);

    // Update Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    if (title) updateMetaTag('twitter:title', title);
    if (description) updateMetaTag('twitter:description', description);
    if (ogImage) updateMetaTag('twitter:image', ogImage);

    // Cleanup function
    return () => {
      // Optional: Reset to defaults when component unmounts
      // document.title = "BloodSync";
    };
  }, [title, description, keywords, ogImage, ogType]);

  return null;
}

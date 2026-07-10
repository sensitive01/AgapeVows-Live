import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEOHelmet Component
 * @param {string} title - The page title
 * @param {string} description - The meta description
 * @param {string} canonicalUrl - The canonical URL for the page
 * @param {boolean} noindex - Whether to block search engine indexing (for private pages)
 */
const SEOHelmet = ({ 
  title = "AgapeVows - India's Trusted Christian Matrimony", 
  description = "Find your God-given match on AgapeVows, the trusted Christian matrimony platform with verified profiles and secure matchmaking.", 
  canonicalUrl, 
  noindex = false,
  schemaData = [],
  preloadImage,
  ogTitle,
  ogDescription,
  ogImage = "https://agapevows.com/images/og-default.jpg"
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={`https://agapevows.com${canonicalUrl}`} />}

      {/* Preload Critical Hero Images for Core Web Vitals (LCP) */}
      {preloadImage && <link rel="preload" as="image" href={preloadImage} />}

      {/* Crawling Rules */}
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow" />
      )}

      {/* Open Graph Tags for Social Sharing */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      {canonicalUrl && <meta property="og:url" content={`https://agapevows.com${canonicalUrl}`} />}
      <meta property="og:site_name" content="AgapeVows" />
      
      {/* Structured Data (JSON-LD) */}
      {schemaData && schemaData.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHelmet;

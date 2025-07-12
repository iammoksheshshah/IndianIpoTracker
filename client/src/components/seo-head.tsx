import { useEffect } from 'react';
import { SEOMetadata } from '@/lib/seo';

interface SEOHeadProps {
  metadata: SEOMetadata;
}

export function SEOHead({ metadata }: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = metadata.title;
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`) || 
                   document.querySelector(`meta[property="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        if (name.startsWith('og:')) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Update canonical link
    const updateCanonical = (href: string) => {
      let element = document.querySelector('link[rel="canonical"]');
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', 'canonical');
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Update structured data
    const updateStructuredData = (data: any) => {
      let element = document.querySelector('script[type="application/ld+json"]');
      if (!element) {
        element = document.createElement('script');
        element.setAttribute('type', 'application/ld+json');
        document.head.appendChild(element);
      }
      element.textContent = JSON.stringify(data);
    };

    // Apply all metadata
    updateMetaTag('description', metadata.description);
    
    if (metadata.keywords) {
      updateMetaTag('keywords', metadata.keywords);
    }
    
    if (metadata.canonical) {
      updateCanonical(metadata.canonical);
    }
    
    if (metadata.ogTitle) {
      updateMetaTag('og:title', metadata.ogTitle);
    }
    
    if (metadata.ogDescription) {
      updateMetaTag('og:description', metadata.ogDescription);
    }
    
    if (metadata.ogType) {
      updateMetaTag('og:type', metadata.ogType);
    }
    
    if (metadata.ogUrl) {
      updateMetaTag('og:url', metadata.ogUrl);
    }
    
    if (metadata.structuredData) {
      updateStructuredData(metadata.structuredData);
    }

  }, [metadata]);

  return null;
}

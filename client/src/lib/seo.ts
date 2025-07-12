export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogUrl?: string;
  structuredData?: any;
}

export const DEFAULT_SEO: SEOMetadata = {
  title: "NextIPO - Indian Stock Market IPO Listings & Analysis",
  description: "Comprehensive IPO listings, premiums, and analysis for Indian stock market. Track upcoming, open, and closed IPOs with real-time data and expert insights.",
  keywords: "IPO, Indian stock market, IPO premium, stock listing, mainboard, SME, BSE, NSE",
  canonical: "https://nextipo.in/",
  ogTitle: "NextIPO - Indian Stock Market IPO Listings",
  ogDescription: "Track Indian IPOs with real-time premiums, analysis, and application status",
  ogType: "website",
  ogUrl: "https://nextipo.in/",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "NextIPO",
    "description": "Indian Stock Market IPO Listings and Analysis Platform",
    "url": "https://nextipo.in/",
    "serviceType": "Investment Information Service"
  }
};

export const PAGE_SEO: Record<string, SEOMetadata> = {
  home: DEFAULT_SEO,
  about: {
    title: "About Us - NextIPO | Indian Stock Market Analysis",
    description: "Learn about NextIPO, India's trusted platform for comprehensive IPO analysis, real-time premiums, and stock market insights.",
    keywords: "about NextIPO, Indian stock market analysis, IPO platform, financial services",
    canonical: "https://nextipo.in/about",
    ogTitle: "About NextIPO",
    ogDescription: "India's most trusted platform for IPO analysis and real-time premiums",
    ogUrl: "https://nextipo.in/about"
  },
  contact: {
    title: "Contact Us - NextIPO | Get in Touch",
    description: "Contact NextIPO team for support, queries, or feedback. We're here to help with your IPO investment decisions.",
    keywords: "contact NextIPO, support, customer service, IPO help",
    canonical: "https://nextipo.in/contact",
    ogTitle: "Contact NextIPO",
    ogDescription: "Get in touch with our team for IPO investment support",
    ogUrl: "https://nextipo.in/contact"
  },
  terms: {
    title: "Terms & Conditions - NextIPO",
    description: "Terms and conditions for using NextIPO platform. Read our usage policies and guidelines.",
    keywords: "terms conditions, usage policy, NextIPO terms",
    canonical: "https://nextipo.in/terms",
    ogTitle: "Terms & Conditions",
    ogUrl: "https://nextipo.in/terms"
  },
  privacy: {
    title: "Privacy Policy - NextIPO",
    description: "Privacy policy for NextIPO platform. Learn how we protect and handle your personal information.",
    keywords: "privacy policy, data protection, personal information",
    canonical: "https://nextipo.in/privacy",
    ogTitle: "Privacy Policy",
    ogUrl: "https://nextipo.in/privacy"
  },
  disclaimer: {
    title: "Disclaimer - NextIPO",
    description: "Investment disclaimer and risk disclosure for NextIPO platform. Important information for all users.",
    keywords: "disclaimer, investment risk, risk disclosure",
    canonical: "https://nextipo.in/disclaimer",
    ogTitle: "Investment Disclaimer",
    ogUrl: "https://nextipo.in/disclaimer"
  },
  sitemap: {
    title: "Sitemap - NextIPO",
    description: "Site navigation and all pages available on NextIPO platform.",
    keywords: "sitemap, site navigation, all pages",
    canonical: "https://nextipo.in/sitemap",
    ogTitle: "Sitemap",
    ogUrl: "https://nextipo.in/sitemap"
  }
};

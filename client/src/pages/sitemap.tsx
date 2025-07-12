import { Link } from "wouter";
import { SEOHead } from "@/components/seo-head";
import { PAGE_SEO } from "@/lib/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sitePages = [
  {
    category: "Main Pages",
    pages: [
      { name: "Home", path: "/", description: "IPO listings and market overview" },
      { name: "About Us", path: "/about", description: "Learn about our platform and mission" },
      // { name: "Contact", path: "/contact", description: "Get in touch with our team" },
    ]
  },
  {
    category: "Legal Pages",
    pages: [
      { name: "Terms & Conditions", path: "/terms", description: "Usage terms and conditions" },
      { name: "Privacy Policy", path: "/privacy", description: "How we handle your data" },
      { name: "Disclaimer", path: "/disclaimer", description: "Investment risks and legal disclaimers" },
    ]
  },
  {
    category: "Tools & Resources",
    pages: [
      { name: "Sitemap", path: "/sitemap", description: "Site navigation and page index" },
    ]
  }
];

export default function Sitemap() {
  return (
    <>
      <SEOHead metadata={PAGE_SEO.sitemap} />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Sitemap</h1>
            <p className="text-xl text-blue-100">Navigate through all pages and sections of our platform</p>
          </div>
        </section>

        {/* Sitemap Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {sitePages.map((section) => (
                <Card key={section.category}>
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">{section.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {section.pages.map((page) => (
                        <div key={page.path} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex-shrink-0 mt-1">
                            <i className="fas fa-file-alt text-blue-600"></i>
                          </div>
                          <div className="flex-1">
                            <Link href={page.path} className="text-blue-600 hover:text-blue-800 font-medium">
                              {page.name}
                            </Link>
                            <p className="text-sm text-gray-600 mt-1">{page.description}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {window.location.origin}{page.path}
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            <Link href={page.path}>
                              <i className="fas fa-external-link-alt text-gray-400 hover:text-blue-600 transition-colors"></i>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Information */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">XML Sitemap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <i className="fas fa-sitemap text-green-600 text-2xl"></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 mb-2">
                      For search engines and automated tools, we also provide an XML sitemap that contains 
                      all the URLs on our website with additional metadata.
                    </p>
                    <a 
                      href="/sitemap.xml" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <i className="fas fa-download mr-2"></i>
                      View XML Sitemap
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Search Tips */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Navigation Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      <i className="fas fa-search text-blue-600 mr-2"></i>
                      Search IPOs
                    </h4>
                    <p className="text-sm text-gray-600">
                      Use the search bar on the home page to quickly find specific IPO companies by name or script code.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      <i className="fas fa-filter text-blue-600 mr-2"></i>
                      Filter by Status
                    </h4>
                    <p className="text-sm text-gray-600">
                      Filter IPOs by their current status: All, Open, Upcoming, or Closed to find relevant opportunities.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      <i className="fas fa-mobile-alt text-blue-600 mr-2"></i>
                      Mobile Friendly
                    </h4>
                    <p className="text-sm text-gray-600">
                      Our website is fully responsive and works seamlessly on mobile devices, tablets, and desktops.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      <i className="fas fa-clock text-blue-600 mr-2"></i>
                      Real-time Updates
                    </h4>
                    <p className="text-sm text-gray-600">
                      IPO data is updated in real-time during market hours to provide the most current information.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}

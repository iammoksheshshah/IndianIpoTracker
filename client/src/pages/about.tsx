import { SEOHead } from "@/components/seo-head";
import { PAGE_SEO } from "@/lib/seo";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <>
      <SEOHead metadata={PAGE_SEO.about} />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">About NextIPO</h1>
            <p className="text-xl text-blue-100">Your trusted partner for Indian stock market IPO analysis and insights</p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg mx-auto text-gray-700 mb-12">
              <p className="text-lg leading-relaxed">
                NextIPO is India's leading platform for comprehensive IPO analysis, providing real-time data, 
                premium calculations, and expert insights to help investors make informed decisions in the stock market.
              </p>
              
              <p className="text-lg leading-relaxed">
                Our platform offers detailed information about mainboard and SME IPOs across BSE and NSE, 
                including opening and closing dates, price bands, lot sizes, and real-time premium calculations.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <div className="text-blue-600 mb-4">
                    <i className="fas fa-chart-bar text-3xl"></i>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Real-time Data</h4>
                  <p className="text-gray-600">
                    Get live IPO premiums, application status, and market updates as they happen.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="text-blue-600 mb-4">
                    <i className="fas fa-shield-alt text-3xl"></i>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Trusted Analysis</h4>
                  <p className="text-gray-600">
                    Expert analysis and insights backed by comprehensive market research.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-blue-600 mb-4">
                    <i className="fas fa-users text-3xl"></i>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Community Driven</h4>
                  <p className="text-gray-600">
                    Join thousands of investors who trust our platform for IPO insights and decisions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-blue-600 mb-4">
                    <i className="fas fa-mobile-alt text-3xl"></i>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Mobile Friendly</h4>
                  <p className="text-gray-600">
                    Access IPO data and insights on the go with our responsive design.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Mission & Vision */}
            <div className="mt-16 grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                  <p className="text-gray-600">
                    To democratize access to IPO information and provide retail investors with the same 
                    quality data and insights that institutional investors have, enabling better investment decisions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-gray-600">
                    To become India's most trusted and comprehensive platform for IPO analysis, 
                    helping millions of investors participate confidently in the primary market.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Key Features */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Key Features</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-blue-600 mb-4">
                    <i className="fas fa-clock text-2xl"></i>
                  </div>
                  <h4 className="font-semibold mb-2">Real-time Updates</h4>
                  <p className="text-sm text-gray-600">Live premium calculations and status updates</p>
                </div>
                <div className="text-center">
                  <div className="text-blue-600 mb-4">
                    <i className="fas fa-filter text-2xl"></i>
                  </div>
                  <h4 className="font-semibold mb-2">Advanced Filtering</h4>
                  <p className="text-sm text-gray-600">Filter by status, exchange, and company type</p>
                </div>
                <div className="text-center">
                  <div className="text-blue-600 mb-4">
                    <i className="fas fa-search text-2xl"></i>
                  </div>
                  <h4 className="font-semibold mb-2">Smart Search</h4>
                  <p className="text-sm text-gray-600">Quick search across all IPO listings</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

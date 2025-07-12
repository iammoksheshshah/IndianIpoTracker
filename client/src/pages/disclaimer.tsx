import { SEOHead } from "@/components/seo-head";
import { PAGE_SEO } from "@/lib/seo";

export default function Disclaimer() {
  return (
    <>
      <SEOHead metadata={PAGE_SEO.disclaimer} />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Investment Disclaimer</h1>
            <p className="text-xl text-red-100">Important risk disclosure and legal information</p>
          </div>
        </section>

        {/* Disclaimer Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="prose prose-lg max-w-none">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <i className="fas fa-exclamation-triangle text-red-500 text-xl"></i>
                    </div>
                    <div className="ml-3">
                      <p className="text-red-800 font-semibold">
                        IMPORTANT: Please read this disclaimer carefully before using our services or making any investment decisions.
                      </p>
                    </div>
                  </div>
                </div>

                <h2>1. General Investment Risk Warning</h2>
                <p>
                  <strong>Investments in securities market are subject to market risks. Read all the related documents carefully before investing.</strong>
                </p>
                <p>
                  IPO Premium is an information service only and does not provide investment advice, recommendations, 
                  or guarantee any returns. All information provided is for educational and informational purposes only.
                </p>

                <h2>2. No Investment Advice</h2>
                <p>
                  The content provided on IPO Premium should not be construed as:
                </p>
                <ul>
                  <li>Investment advice or recommendations</li>
                  <li>An offer to buy or sell any securities</li>
                  <li>Financial planning advice</li>
                  <li>Tax or legal advice</li>
                  <li>A guarantee of future performance</li>
                </ul>

                <h2>3. Market Risks</h2>
                <p>
                  IPO investments carry significant risks, including but not limited to:
                </p>
                <ul>
                  <li><strong>Price Volatility:</strong> IPO prices can be highly volatile and may fluctuate significantly</li>
                  <li><strong>Liquidity Risk:</strong> There may be limited liquidity in newly listed securities</li>
                  <li><strong>Market Risk:</strong> Overall market conditions can adversely affect IPO performance</li>
                  <li><strong>Company-Specific Risk:</strong> Individual company performance may not meet expectations</li>
                  <li><strong>Regulatory Risk:</strong> Changes in regulations may impact investment outcomes</li>
                  <li><strong>Currency Risk:</strong> For investors in different currencies</li>
                </ul>

                <h2>4. Data Accuracy Disclaimer</h2>
                <p>
                  While we strive to provide accurate and timely information:
                </p>
                <ul>
                  <li>Information may contain errors or omissions</li>
                  <li>Data may not be real-time or may have delays</li>
                  <li>Premium calculations are estimates and may not reflect actual market conditions</li>
                  <li>We do not guarantee the accuracy, completeness, or timeliness of any information</li>
                </ul>

                <h2>5. Third-Party Information</h2>
                <p>
                  Our platform may include information from third-party sources. We do not verify or endorse 
                  third-party information and are not responsible for its accuracy or reliability.
                </p>

                <h2>6. Past Performance</h2>
                <p>
                  Past performance of IPOs or securities is not indicative of future results. Historical data 
                  should not be used as the sole basis for investment decisions.
                </p>

                <h2>7. Professional Advice</h2>
                <p>
                  Before making any investment decisions, you should:
                </p>
                <ul>
                  <li>Consult with qualified financial advisors</li>
                  <li>Conduct your own research and due diligence</li>
                  <li>Read all offer documents and prospectuses</li>
                  <li>Consider your risk tolerance and investment objectives</li>
                  <li>Understand the terms and conditions of any investment</li>
                </ul>

                <h2>8. Limitation of Liability</h2>
                <p>
                  IPO Premium, its owners, employees, and affiliates shall not be liable for any losses, damages, 
                  or expenses arising from:
                </p>
                <ul>
                  <li>Use of information provided on our platform</li>
                  <li>Investment decisions made based on our content</li>
                  <li>Technical issues or service interruptions</li>
                  <li>Errors or omissions in data or content</li>
                  <li>Third-party actions or omissions</li>
                </ul>

                <h2>9. Regulatory Compliance</h2>
                <p>
                  IPO Premium is not a registered investment advisor, broker-dealer, or financial institution. 
                  We do not provide regulated financial services and are not subject to investment service regulations.
                </p>

                <h2>10. Geographic Restrictions</h2>
                <p>
                  Our service is primarily intended for users in India. Information may not be suitable for 
                  users in other jurisdictions due to local laws and regulations.
                </p>

                <h2>11. Age Restriction</h2>
                <p>
                  Our service is intended for users who are 18 years of age or older and legally capable of 
                  entering into binding contracts.
                </p>

                <h2>12. Updates to Disclaimer</h2>
                <p>
                  This disclaimer may be updated from time to time. Your continued use of our service constitutes 
                  acceptance of any changes.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Remember:</strong> Never invest more than you can afford to lose. All investments 
                      carry risk, and you may lose some or all of your investment.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>SEBI Disclaimer:</strong> Investment in securities market are subject to market risks, 
                      read all the related documents carefully before investing. SEBI Registration numbers of 
                      applicable intermediaries should be verified before transacting.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

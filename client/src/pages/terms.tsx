import { SEOHead } from "@/components/seo-head";
import { PAGE_SEO } from "@/lib/seo";

export default function Terms() {
  return (
    <>
      <SEOHead metadata={PAGE_SEO.terms} />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-xl text-blue-100">Please read these terms carefully before using our services</p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-sm text-gray-600 mb-8">
                  <strong>Last updated:</strong> January 1, 2025
                </p>

                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing and using NextIPO ("the Service"), you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by these Terms and Conditions, 
                  you are not authorized to use or access this service.
                </p>

                <h2>2. Description of Service</h2>
                <p>
                  NextIPO provides information and analysis related to Initial Public Offerings (IPOs) in the 
                  Indian stock market. Our service includes:
                </p>
                <ul>
                  <li>Real-time IPO listings and premium calculations</li>
                  <li>IPO status tracking (open, upcoming, closed)</li>
                  <li>Company information and analysis</li>
                  <li>Links to official IPO application portals</li>
                  <li>Market insights and statistics</li>
                </ul>

                <h2>3. Information Accuracy</h2>
                <p>
                  While we strive to provide accurate and up-to-date information, IPO Premium does not guarantee 
                  the accuracy, completeness, or timeliness of any information displayed on the platform. 
                  Premium calculations and market data are provided for informational purposes only.
                </p>

                <h2>4. Investment Disclaimer</h2>
                <p>
                  NextIPO is an information service only. We do not:
                </p>
                <ul>
                  <li>Provide investment advice or recommendations</li>
                  <li>Process IPO applications</li>
                  <li>Handle any financial transactions</li>
                  <li>Guarantee investment returns or outcomes</li>
                </ul>
                <p>
                  All investment decisions are made at your own risk. Please consult with qualified financial 
                  advisors before making any investment decisions.
                </p>

                <h2>5. User Responsibilities</h2>
                <p>
                  Users of NextIPO agree to:
                </p>
                <ul>
                  <li>Use the service for lawful purposes only</li>
                  <li>Not attempt to manipulate or interfere with the service</li>
                  <li>Not reproduce or redistribute our content without permission</li>
                  <li>Verify all information independently before making investment decisions</li>
                </ul>

                <h2>6. Intellectual Property</h2>
                <p>
                  All content, features, and functionality of NextIPO, including but not limited to text, 
                  graphics, logos, and software, are owned by NextIPO and are protected by copyright, 
                  trademark, and other intellectual property laws.
                </p>

                <h2>7. Limitation of Liability</h2>
                <p>
                  NextIPO shall not be liable for any direct, indirect, incidental, special, or consequential 
                  damages resulting from the use or inability to use our service, including but not limited to 
                  investment losses, data loss, or business interruption.
                </p>

                <h2>8. Third-Party Links</h2>
                <p>
                  Our service may contain links to third-party websites or services. IPO Premium is not responsible 
                  for the content, privacy policies, or practices of any third-party sites or services.
                </p>

                <h2>9. Modifications to Terms</h2>
                <p>
                  NextIPO reserves the right to modify these terms and conditions at any time. Changes will be 
                  effective immediately upon posting on our website. Your continued use of the service after any 
                  changes constitutes acceptance of the new terms.
                </p>

                <h2>10. Termination</h2>
                <p>
                  We reserve the right to terminate or suspend access to our service immediately, without prior 
                  notice or liability, for any reason, including without limitation if you breach the Terms.
                </p>

                <h2>11. Governing Law</h2>
                <p>
                  These Terms shall be interpreted and governed in accordance with the laws of India, without 
                  regard to its conflict of law provisions. Any disputes shall be subject to the exclusive 
                  jurisdiction of the courts in Mumbai, Maharashtra.
                </p>

                <h2>12. Contact Information</h2>
                <p>
                  If you have any questions about these Terms and Conditions, please contact us at:
                </p>
                <ul>
                  <li>Email: mintushah94@gmail.com</li>
                  {/* <li>Address: Mumbai, Maharashtra, India</li> */}
                </ul>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Important:</strong> By using NextIPO, you acknowledge that you have read, 
                    understood, and agree to be bound by these Terms and Conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

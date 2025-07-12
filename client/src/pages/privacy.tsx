import { SEOHead } from "@/components/seo-head";
import { PAGE_SEO } from "@/lib/seo";

export default function Privacy() {
  return (
    <>
      <SEOHead metadata={PAGE_SEO.privacy} />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-blue-100">How we collect, use, and protect your personal information</p>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-sm text-gray-600 mb-8">
                  <strong>Last updated:</strong> January 1, 2025
                </p>

                <h2>1. Introduction</h2>
                <p>
                  NextIPO ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                  explains how we collect, use, disclose, and safeguard your information when you visit our website 
                  and use our services.
                </p>

                <h2>2. Information We Collect</h2>
                
                <h3>2.1 Information You Provide to Us</h3>
                <p>We may collect information you provide directly to us, such as:</p>
                <ul>
                  <li>Contact information (name, email address, phone number)</li>
                  <li>Messages or inquiries submitted through our contact form</li>
                  <li>Feedback and survey responses</li>
                </ul>

                <h3>2.2 Information Automatically Collected</h3>
                <p>When you visit our website, we may automatically collect:</p>
                <ul>
                  <li>IP address and location information</li>
                  <li>Browser type and version</li>
                  <li>Device information and operating system</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referring website or source</li>
                </ul>

                <h3>2.3 Cookies and Tracking Technologies</h3>
                <p>
                  We use cookies and similar tracking technologies to improve your experience on our website. 
                  Cookies help us remember your preferences and analyze website traffic.
                </p>

                <h2>3. How We Use Your Information</h2>
                <p>We may use the information we collect for various purposes, including:</p>
                <ul>
                  <li>Providing and maintaining our service</li>
                  <li>Responding to your inquiries and customer service requests</li>
                  <li>Improving our website and services</li>
                  <li>Analyzing usage patterns and trends</li>
                  <li>Sending administrative information and updates</li>
                  <li>Detecting and preventing fraud or security issues</li>
                </ul>

                <h2>4. Information Sharing and Disclosure</h2>
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties, except:</p>
                <ul>
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and prevent fraud</li>
                  <li>In connection with a business transfer or merger</li>
                  <li>To service providers who assist in our operations (under strict confidentiality agreements)</li>
                </ul>

                <h2>5. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction. However, no method 
                  of transmission over the internet is 100% secure.
                </p>

                <h2>6. Data Retention</h2>
                <p>
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined 
                  in this Privacy Policy, unless a longer retention period is required or permitted by law.
                </p>

                <h2>7. Your Rights and Choices</h2>
                <p>You have the right to:</p>
                <ul>
                  <li>Access and receive a copy of your personal information</li>
                  <li>Request correction of inaccurate or incomplete information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to or restrict processing of your information</li>
                  <li>Withdraw consent where processing is based on consent</li>
                </ul>

                <h2>8. Third-Party Services</h2>
                <p>
                  Our website may contain links to third-party websites or services. We are not responsible for 
                  the privacy practices of these third parties. We encourage you to read their privacy policies.
                </p>

                <h2>9. Children's Privacy</h2>
                <p>
                  Our service is not intended for children under 18 years of age. We do not knowingly collect 
                  personal information from children under 18. If we become aware that we have collected such 
                  information, we will take steps to delete it.
                </p>

                <h2>10. International Data Transfers</h2>
                <p>
                  Your information may be transferred to and processed in countries other than your own. We ensure 
                  appropriate safeguards are in place to protect your information during such transfers.
                </p>

                <h2>11. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                  the new Privacy Policy on this page and updating the "Last updated" date.
                </p>

                <h2>12. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
                </p>
                <ul>
                  <li>Email: mintushah94@gmail.com</li>
                  {/* <li>Address: Mumbai, Maharashtra, India</li> */}
                </ul>

                <div className="mt-8 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Your Privacy Matters:</strong> We are committed to protecting your personal information 
                    and being transparent about our data practices. This policy reflects our dedication to your privacy rights.
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

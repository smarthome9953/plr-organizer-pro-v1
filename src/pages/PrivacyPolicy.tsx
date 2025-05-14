
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const PrivacyPolicy = () => {
  const lastUpdated = "May 10, 2025";
  
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Privacy Policy | PLR Organizer Pro</title>
        <meta name="description" content="Read PLR Organizer Pro's Privacy Policy to understand how we collect, use, and protect your personal information when you use our PLR management service." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Privacy Policy",
            "description": "PLR Organizer Pro's Privacy Policy explains how we collect, use, and protect your personal information.",
            "publisher": {
              "@type": "Organization",
              "name": "PLR Organizer Pro",
              "logo": {
                "@type": "ImageObject",
                "url": "https://plrorganizerpro.com/logo.png"
              }
            }
          })}
        </script>
      </Helmet>

      <Header showAuthButtons={true} />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-6">Last Updated: {lastUpdated}</p>
        
        <Separator className="mb-8" />
        
        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Welcome to PLR Organizer Pro. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website plrorganizerpro.com and use our PLR content management platform ("Service").
            </p>
            <p>
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access our Service. By using our Service, you consent to the collection, use, and disclosure of information in accordance with this policy.
            </p>
            <p>
              We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of this Privacy Policy. Any changes or modifications will be effective immediately upon posting the updated Privacy Policy on the Service. You are encouraged to periodically review this Privacy Policy to stay informed of updates.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-medium mb-2">2.1 Personal Information</h3>
            <p>
              We may collect personal information that you voluntarily provide to us when you register for an account, express interest in obtaining information about us or our products, participate in activities on the Service, or otherwise contact us. The personal information we collect may include:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Name and contact information (email address, phone number)</li>
              <li>Billing information and payment details</li>
              <li>Account credentials (username, password)</li>
              <li>User preferences and settings</li>
              <li>Communications and correspondence with us</li>
            </ul>
            
            <h3 className="text-xl font-medium mb-2">2.2 Derivative Data</h3>
            <p>
              Our servers automatically collect information when you access the Service, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the Service. This information is primarily needed to maintain the security and operation of our Service, and for internal analytics and reporting purposes.
            </p>
            
            <h3 className="text-xl font-medium mb-2">2.3 PLR Content Data</h3>
            <p>
              To provide our Service, we may scan, index, and store information about your PLR content. This can include metadata about your files, organizational structures, and other information necessary for the functioning of our Service. We do not claim ownership of your PLR content or use it for any purpose beyond providing our Service to you.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p>
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>To provide, operate, and maintain our Service</li>
              <li>To process transactions and manage your account</li>
              <li>To improve, personalize, and expand our Service</li>
              <li>To understand how users access and use our Service</li>
              <li>To respond to user inquiries and offer support</li>
              <li>To develop new products, services, features, and functionality</li>
              <li>To send you updates, security alerts, and administrative messages</li>
              <li>To communicate with you about new features, products, and services</li>
              <li>To prevent fraudulent transactions and monitor against theft</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Cookies and Web Beacons</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our Service and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier.
            </p>
            <p>
              We use different types of cookies for different purposes:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Essential cookies:</strong> Necessary for the operation of our website and Service</li>
              <li><strong>Analytical/performance cookies:</strong> Allow us to recognize and count the number of visitors and see how visitors move around our website</li>
              <li><strong>Functional cookies:</strong> Used to recognize you when you return to our website</li>
              <li><strong>Targeting cookies:</strong> Record your visit to our website, the pages you have visited, and the links you have followed</li>
            </ul>
            <p>
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
            </p>
            <p>
              For detailed information about our use of cookies, please refer to our <Link to="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link>.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Third-Party Services</h2>
            <p>
              We may use third-party service providers to help us operate our business and administer activities on our behalf, such as sending emails, processing payments, and analyzing website usage. These third parties may have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>
            <p>
              Key third-party services we use include:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Payment processors:</strong> We use secure payment processors such as Stripe and PayPal to process subscription payments</li>
              <li><strong>Analytics providers:</strong> We use Google Analytics to understand user behavior on our site</li>
              <li><strong>Email service providers:</strong> We use services such as SendGrid or Mailchimp to communicate with users</li>
              <li><strong>Cloud storage services:</strong> We use secure cloud storage for application data</li>
              <li><strong>Customer support tools:</strong> We use services like Intercom or Zendesk to provide customer support</li>
            </ul>
            <p>
              These third parties have their own privacy policies addressing how they use and process personal information. We encourage you to read their privacy policies to understand how they handle your information.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
            <p>
              We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
            </p>
            <p>
              Our security measures include:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Encryption of sensitive data both in transit and at rest</li>
              <li>Regular security assessments and audits</li>
              <li>Access controls and authentication requirements</li>
              <li>Secure data backups and disaster recovery procedures</li>
              <li>Staff training on security practices and data protection</li>
            </ul>
            <p>
              We regularly review and update our security practices to enhance the protection of your information. If you ever suspect a security issue with your account, please contact us immediately at support@plrorganizerpro.com.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Your Data Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Right to Access:</strong> You may request copies of your personal information that we hold.</li>
              <li><strong>Right to Rectification:</strong> You may request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
              <li><strong>Right to Erasure:</strong> You may request that we erase your personal data under certain conditions.</li>
              <li><strong>Right to Restrict Processing:</strong> You may request that we restrict the processing of your personal data under certain circumstances.</li>
              <li><strong>Right to Data Portability:</strong> You may request that we transfer the data we have collected to another organization or directly to you under certain conditions.</li>
              <li><strong>Right to Object:</strong> You may object to our processing of your personal data under certain circumstances.</li>
            </ul>
            <p>
              If you wish to exercise any of these rights, please contact us at support@plrorganizerpro.com. We will respond to your request within 30 days.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. GDPR Compliance</h2>
            <p>
              We are committed to complying with the General Data Protection Regulation (GDPR) for users in the European Economic Area (EEA). Our legal basis for collecting and using personal information depends on the specific information and the context in which we collect it:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Contractual Necessity:</strong> We need to process your information to provide the Service you have signed up for</li>
              <li><strong>Legal Obligation:</strong> We need to process your information to comply with certain legal requirements</li>
              <li><strong>Legitimate Interests:</strong> Processing is in our legitimate business interests, provided those interests are not overridden by your rights and interests</li>
              <li><strong>Consent:</strong> You have given us consent to process your personal information for specific purposes</li>
            </ul>
            <p>
              For more details about our GDPR compliance measures, please visit our <Link to="/gdpr-compliance" className="text-primary hover:underline">GDPR Compliance</Link> page.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Data Retention</h2>
            <p>
              We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
            </p>
            <p>
              If you request that your account be deleted, we will delete your information as soon as practicable, but may retain certain information to prevent fraud, troubleshoot problems, assist with investigations, enforce our Terms of Service, and comply with legal requirements.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. International Data Transfers</h2>
            <p>
              Our operations are primarily located in the United States. If you access our Service from outside the United States, be aware that your information may be transferred to, stored, and processed by us and our affiliated third parties in the United States or other countries.
            </p>
            <p>
              When we transfer personal data from the EEA to other countries, we use a variety of legal mechanisms to ensure that applicable data protection laws are respected. This may include obtaining your consent, executing data transfer agreements, or working with vendors certified under the EU-US Privacy Shield.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Children's Privacy</h2>
            <p>
              Our Service is not intended for individuals under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from Children. If you are a parent or guardian and you are aware that your Child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from Children without verification of parental consent, we take steps to remove that information from our servers.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
            <p>
              If we make material changes to this policy, we may notify you either through the email address you have provided us or by placing a prominent notice on our website.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-disc pl-6">
              <li>By email: support@plrorganizerpro.com</li>
              <li>By visiting the contact page on our website: <Link to="/contact" className="text-primary hover:underline">Contact Us</Link></li>
            </ul>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

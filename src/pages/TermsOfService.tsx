
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const TermsOfService = () => {
  const lastUpdated = "May 10, 2025";
  
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Terms of Service | PLR Organizer Pro</title>
        <meta name="description" content="Review PLR Organizer Pro's Terms of Service to understand the rules, restrictions, and requirements when using our PLR content management platform." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Terms of Service",
            "description": "PLR Organizer Pro's Terms of Service outlines the rules and restrictions for using our PLR content management platform.",
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
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-6">Last Updated: {lastUpdated}</p>
        
        <Separator className="mb-8" />
        
        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction and Acceptance</h2>
            <p>
              These Terms of Service ("Terms") govern your access to and use of the PLR Organizer Pro website, application, and services (collectively, the "Service"), operated by PLR Organizer Pro ("we," "us," or "our").
            </p>
            <p>
              Please read these Terms carefully before using our Service. By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Service.
            </p>
            <p>
              These Terms constitute a legally binding agreement between you and PLR Organizer Pro. You must be at least 18 years old or have the legal capacity to enter into a binding agreement to use our Service.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Definitions</h2>
            <p>
              For clarity and consistency throughout these Terms, the following terms shall have these specific meanings:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>"Account"</strong> refers to your registration with PLR Organizer Pro that allows you to access and use our Service.</li>
              <li><strong>"Content"</strong> refers to all information, data, text, software, music, audio, photographs, graphics, videos, messages, or other materials that users upload, post, publish, or display on the Service.</li>
              <li><strong>"PLR"</strong> refers to Private Label Rights content, which is content that users have purchased with specific rights to modify, rebrand, and use according to the license terms provided by the original PLR creator.</li>
              <li><strong>"Service"</strong> refers to the PLR Organizer Pro website, application, APIs, and all services provided by PLR Organizer Pro.</li>
              <li><strong>"User"</strong> refers to any individual or entity that accesses or uses the Service.</li>
              <li><strong>"Subscription"</strong> refers to the paid access to the Service for a specified period.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts and Registration</h2>
            
            <h3 className="text-xl font-medium mb-2">3.1 Account Creation</h3>
            <p>
              To access certain features of the Service, you must create an account. When you create an account, you must provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
            
            <h3 className="text-xl font-medium mb-2">3.2 Account Security</h3>
            <p>
              You agree to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Create a strong password and keep it confidential</li>
              <li>Notify us immediately of any unauthorized access to or use of your account</li>
              <li>Ensure that you log out of your account at the end of each session</li>
              <li>Take responsibility for all activities that occur under your account</li>
            </ul>
            
            <h3 className="text-xl font-medium mb-2">3.3 Account Restrictions</h3>
            <p>
              You may not:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Create multiple accounts for the same person</li>
              <li>Share your account credentials with any third party</li>
              <li>Transfer your account to another person without our prior written consent</li>
              <li>Use the account of another user without permission</li>
              <li>Provide false or misleading information when creating an account</li>
            </ul>
            
            <p>
              We reserve the right to suspend or terminate your account if we believe that you have violated these Terms or that your account is being used fraudulently or in an unauthorized manner.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Subscription and Payment Terms</h2>
            
            <h3 className="text-xl font-medium mb-2">4.1 Subscription Options</h3>
            <p>
              PLR Organizer Pro offers various subscription plans with different features and pricing. The specific features, limitations, and prices of each subscription plan are detailed on our website.
            </p>
            
            <h3 className="text-xl font-medium mb-2">4.2 Payment and Billing</h3>
            <p>
              By subscribing to our Service, you agree to pay all fees and charges associated with your subscription plan. We use third-party payment processors and do not store your payment information directly. Your payment information will be processed and stored according to the payment processor's terms and privacy policies.
            </p>
            <p>
              All payments are due in advance. For monthly subscriptions, you will be billed on the same day each month. For annual subscriptions, you will be billed once per year on the anniversary of your subscription start date.
            </p>
            
            <h3 className="text-xl font-medium mb-2">4.3 Automatic Renewal</h3>
            <p>
              All subscriptions automatically renew unless you cancel them before the renewal date. By subscribing, you authorize us to charge your payment method for the subscription fee at the then-current rate on each renewal date.
            </p>
            
            <h3 className="text-xl font-medium mb-2">4.4 Price Changes</h3>
            <p>
              We reserve the right to change our subscription prices at any time. If we change the pricing for your subscription, we will provide notice of the change on our website or by email at least 14 days before the change takes effect. Your continued use of the Service after the price change becomes effective constitutes your agreement to pay the updated price.
            </p>
            
            <h3 className="text-xl font-medium mb-2">4.5 Refund Policy</h3>
            <p>
              We offer a 14-day money-back guarantee for new subscriptions. If you are not satisfied with our Service, you may request a refund within 14 days of your initial subscription purchase by contacting support@plrorganizerpro.com.
            </p>
            <p>
              After the 14-day period, subscriptions are non-refundable, and we do not provide refunds or credits for partial subscription periods or unused portions of the Service.
            </p>
            
            <h3 className="text-xl font-medium mb-2">4.6 Taxes</h3>
            <p>
              Subscription fees do not include taxes. You are responsible for paying all taxes associated with your subscription, including but not limited to sales tax, value-added tax (VAT), or goods and services tax (GST). If we are obligated to collect or pay taxes on your behalf, these amounts will be invoiced to you.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. License and Permitted Use</h2>
            
            <h3 className="text-xl font-medium mb-2">5.1 License to Use the Service</h3>
            <p>
              Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, and revocable license to access and use the Service for your personal or internal business purposes.
            </p>
            
            <h3 className="text-xl font-medium mb-2">5.2 Restrictions on Use</h3>
            <p>
              You may not:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Use the Service in any way that violates any applicable local, state, national, or international law or regulation</li>
              <li>Use the Service to transmit any material that is defamatory, obscene, invasive of another's privacy, or offensive</li>
              <li>Use the Service to send unsolicited commercial communications (spam)</li>
              <li>Attempt to interfere with, compromise the system integrity or security, or decipher any transmissions to or from the servers running the Service</li>
              <li>Use the Service in a way that could damage, disable, overburden, or impair it or interfere with any other party's use of the Service</li>
              <li>Attempt to gain unauthorized access to the Service, other accounts, computer systems, or networks connected to the Service</li>
              <li>Use any robot, spider, crawler, scraper, or other automated means to access the Service</li>
              <li>Bypass or circumvent measures we may use to prevent or restrict access to the Service</li>
              <li>Reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code for the Service</li>
            </ul>
            
            <h3 className="text-xl font-medium mb-2">5.3 Content Ownership and Responsibility</h3>
            <p>
              Our Service allows you to upload, organize, and manage PLR content. You retain all ownership rights in your PLR content, subject to the licenses you grant to us below.
            </p>
            <p>
              You are solely responsible for all PLR content that you upload or use within our Service. You represent and warrant that:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>You own or have obtained all necessary rights, licenses, consents, and permissions to use and authorize us to use your PLR content in the manner contemplated by the Service and these Terms</li>
              <li>Your PLR content complies with all applicable laws and regulations</li>
              <li>Your use of PLR content does not violate any third-party rights, including intellectual property rights and privacy rights</li>
            </ul>
            
            <h3 className="text-xl font-medium mb-2">5.4 Limited License to PLR Organizer Pro</h3>
            <p>
              By uploading content to our Service, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and store your content solely for the purpose of providing the Service to you. This license is limited to the purpose of operating, developing, and improving the Service.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property Rights</h2>
            
            <h3 className="text-xl font-medium mb-2">6.1 Our Intellectual Property</h3>
            <p>
              The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of PLR Organizer Pro and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
            </p>
            <p>
              Our trademarks, service marks, logos, and trade names may not be used in any manner that is likely to cause confusion among customers, or in any manner that disparages or discredits PLR Organizer Pro.
            </p>
            
            <h3 className="text-xl font-medium mb-2">6.2 Third-Party Intellectual Property</h3>
            <p>
              The Service may display content that belongs to third parties. We respect the intellectual property rights of others and expect users of our Service to do the same. We will respond to notices of alleged copyright infringement that comply with applicable law.
            </p>
            
            <h3 className="text-xl font-medium mb-2">6.3 DMCA Compliance</h3>
            <p>
              If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, please submit a notification pursuant to the Digital Millennium Copyright Act (DMCA) by providing our copyright agent with the following information in writing:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright interest</li>
              <li>A description of the copyrighted work that you claim has been infringed</li>
              <li>A description of where the material that you claim is infringing is located on the Service</li>
              <li>Your contact information, including your address, telephone number, and email address</li>
              <li>A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law</li>
              <li>A statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf</li>
            </ul>
            <p>
              Our copyright agent can be reached at: copyright@plrorganizerpro.com
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Data Protection and Privacy</h2>
            <p>
              We take your privacy seriously and are committed to protecting your personal data. Our <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> explains how we collect, use, and protect your personal information when you use our Service. By using our Service, you agree to the collection and use of information in accordance with our Privacy Policy.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, in no event shall PLR Organizer Pro, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Your access to or use of or inability to access or use the Service</li>
              <li>Any conduct or content of any third party on the Service</li>
              <li>Any content obtained from the Service</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ul>
            <p>
              In no event shall our total liability to you for all claims, damages, losses, and causes of action exceed the amount you have paid to PLR Organizer Pro in the twelve (12) month period preceding the event giving rise to the claim.
            </p>
            <p>
              Some jurisdictions do not allow the exclusion or limitation of certain warranties or liabilities, so the above limitations may not apply to you.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Disclaimer of Warranties</h2>
            <p>
              Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. PLR Organizer Pro expressly disclaims all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
            </p>
            <p>
              PLR Organizer Pro makes no warranty that:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>The Service will meet your requirements</li>
              <li>The Service will be uninterrupted, timely, secure, or error-free</li>
              <li>The results that may be obtained from the use of the Service will be accurate or reliable</li>
              <li>The quality of any products, services, information, or other material purchased or obtained by you through the Service will meet your expectations</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless PLR Organizer Pro, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Your violation of these Terms</li>
              <li>Your use of the Service</li>
              <li>Your content, including any PLR content you upload, organize, or manage through the Service</li>
              <li>Your violation of any third-party rights</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Governing Law and Jurisdiction</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions. You agree to submit to the personal and exclusive jurisdiction of the courts located within Delaware for the resolution of any disputes.
            </p>
            <p>
              Any dispute, controversy, or claim arising out of or relating to these Terms, or the breach, termination, or validity thereof, shall first be subject to an attempt at resolution through good-faith negotiation between the parties. If the dispute cannot be resolved through negotiation within 30 days, either party may pursue legal action.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Modifications to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            <p>
              By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised Terms. If you do not agree to the new Terms, you must stop using the Service.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. Termination</h2>
            
            <h3 className="text-xl font-medium mb-2">13.1 Termination by You</h3>
            <p>
              You may terminate your account and subscription at any time through your account settings or by contacting us at support@plrorganizerpro.com. Upon termination, your access to the Service will be immediately revoked.
            </p>
            
            <h3 className="text-xl font-medium mb-2">13.2 Termination by PLR Organizer Pro</h3>
            <p>
              We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
            </p>
            <p>
              Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.
            </p>
            
            <h3 className="text-xl font-medium mb-2">13.3 Effects of Termination</h3>
            <p>
              Upon termination of your account for any reason:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Your subscription will end</li>
              <li>Your access to the Service will be revoked</li>
              <li>We may delete your content and account information after a reasonable period</li>
              <li>You will not be entitled to any refund of prepaid fees unless otherwise specified in these Terms</li>
            </ul>
            <p>
              All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">14. General Provisions</h2>
            
            <h3 className="text-xl font-medium mb-2">14.1 Entire Agreement</h3>
            <p>
              These Terms, together with the Privacy Policy and any other legal notices or additional terms and conditions or documents that may be published from time to time on the Service, shall constitute the entire agreement between you and PLR Organizer Pro concerning the Service.
            </p>
            
            <h3 className="text-xl font-medium mb-2">14.2 Waiver and Severability</h3>
            <p>
              No waiver of any term of these Terms shall be deemed a further or continuing waiver of such term or any other term, and our failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision.
            </p>
            <p>
              If any provision of these Terms is held by a court or other tribunal of competent jurisdiction to be invalid, illegal, or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of the Terms will continue in full force and effect.
            </p>
            
            <h3 className="text-xl font-medium mb-2">14.3 Assignment</h3>
            <p>
              You may not assign or transfer these Terms, by operation of law or otherwise, without our prior written consent. Any attempt by you to assign or transfer these Terms without such consent will be null and void.
            </p>
            <p>
              We may assign or transfer these Terms, at our sole discretion, without restriction. Subject to the foregoing, these Terms will bind and inure to the benefit of the parties, their successors, and permitted assigns.
            </p>
            
            <h3 className="text-xl font-medium mb-2">14.4 Notices</h3>
            <p>
              Any notices or other communications provided by us under these Terms, including those regarding modifications to these Terms, will be given by posting to the Service or by email to the email address associated with your account.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">15. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us:
            </p>
            <ul className="list-disc pl-6">
              <li>By email: support@plrorganizerpro.com</li>
              <li>By visiting our contact page: <Link to="/contact" className="text-primary hover:underline">Contact Us</Link></li>
            </ul>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;

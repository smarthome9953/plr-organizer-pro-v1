
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const CookiePolicy = () => {
  const lastUpdated = "May 10, 2025";
  
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Cookie Policy | PLR Organizer Pro</title>
        <meta name="description" content="Learn about how PLR Organizer Pro uses cookies to enhance your experience, track site performance, and provide personalized services on our platform." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Cookie Policy",
            "description": "Learn about how PLR Organizer Pro uses cookies to enhance your experience and provide personalized services.",
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
        <h1 className="text-4xl font-bold mb-2">Cookie Policy</h1>
        <p className="text-muted-foreground mb-6">Last Updated: {lastUpdated}</p>
        
        <Separator className="mb-8" />
        
        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              This Cookie Policy explains how PLR Organizer Pro ("we", "us", or "our") uses cookies and similar technologies on our website plrorganizerpro.com and our PLR content management platform (collectively, the "Service"). This policy provides you with information about what cookies are, which ones we use, and how you can control them.
            </p>
            <p>
              By using our Service, you consent to the use of cookies in accordance with this Cookie Policy. If you do not accept the use of cookies, please disable them following the instructions in this Cookie Policy so that cookies from our website are not stored in your device.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners. Cookies allow a website to recognize your device and remember your preferences and actions for a period of time.
            </p>
            <p>
              Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device after you have closed your browser and help the website remember you as a returning visitor. Session cookies are deleted as soon as you close your browser.
            </p>
            <p>
              In addition to cookies, we may use other similar technologies on our Service, such as:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Web beacons:</strong> Small graphic images that allow us to monitor the use of our websites</li>
              <li><strong>Pixel tags:</strong> Tiny graphics with a unique identifier that track user engagement</li>
              <li><strong>Local storage objects:</strong> Enhanced features that store data locally in your browser</li>
            </ul>
            <p>
              For simplicity, we refer to all these technologies collectively as "cookies" in this policy.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
            <p>
              We use the following types of cookies on our Service:
            </p>
            
            <h3 className="text-xl font-medium mb-2">3.1 Necessary Cookies</h3>
            <p>
              These cookies are essential for the operation of our Service. They enable basic functions such as security, network management, and account access. You cannot opt out of necessary cookies as the Service would not function properly without them.
            </p>
            <div className="bg-muted p-4 rounded-md mb-4">
              <h4 className="font-semibold">Examples:</h4>
              <ul className="list-disc pl-6">
                <li><strong>Authentication cookies:</strong> These help us recognize you and remember that you are logged in</li>
                <li><strong>Security cookies:</strong> These help protect user accounts and prevent fraudulent login activities</li>
                <li><strong>Session cookies:</strong> These maintain your session while you use our Service</li>
              </ul>
            </div>
            
            <h3 className="text-xl font-medium mb-2">3.2 Performance/Analytics Cookies</h3>
            <p>
              These cookies collect information about how visitors use our Service. They help us understand which pages are visited most frequently, how users navigate the site, and if users encounter any errors. All information collected by these cookies is aggregated and anonymous.
            </p>
            <div className="bg-muted p-4 rounded-md mb-4">
              <h4 className="font-semibold">Examples:</h4>
              <ul className="list-disc pl-6">
                <li><strong>Google Analytics:</strong> These cookies help us analyze how users interact with our Service</li>
                <li><strong>Hotjar:</strong> These help us understand user behavior through heatmaps and session recordings</li>
                <li><strong>Page performance cookies:</strong> These measure page load times and other performance metrics</li>
              </ul>
            </div>
            
            <h3 className="text-xl font-medium mb-2">3.3 Functional Cookies</h3>
            <p>
              These cookies allow the Service to remember choices you make and provide enhanced, personalized features. They may be set by us or by third-party providers whose services we have added to our pages.
            </p>
            <div className="bg-muted p-4 rounded-md mb-4">
              <h4 className="font-semibold">Examples:</h4>
              <ul className="list-disc pl-6">
                <li><strong>Language preference cookies:</strong> These remember your preferred language</li>
                <li><strong>Region cookies:</strong> These remember your location preferences</li>
                <li><strong>Customization cookies:</strong> These remember your interface customization preferences</li>
              </ul>
            </div>
            
            <h3 className="text-xl font-medium mb-2">3.4 Targeting/Advertising Cookies</h3>
            <p>
              These cookies are used to deliver advertisements more relevant to you and your interests. They are also used to limit the number of times you see an advertisement and to help measure the effectiveness of advertising campaigns. They remember that you have visited a website and this information may be shared with other organizations such as advertisers.
            </p>
            <div className="bg-muted p-4 rounded-md mb-4">
              <h4 className="font-semibold">Examples:</h4>
              <ul className="list-disc pl-6">
                <li><strong>Marketing cookies:</strong> These track your browsing habits to deliver targeted advertising</li>
                <li><strong>Social media cookies:</strong> These enable sharing functionality with social media platforms</li>
                <li><strong>Retargeting cookies:</strong> These remember your visits to our website to show relevant ads on other websites</li>
              </ul>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. How We Use Cookies</h2>
            <p>
              We use cookies for several purposes, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Authentication and security:</strong> To recognize you when you log in and to provide a secure experience</li>
              <li><strong>User preferences:</strong> To remember information about your browser and preferences</li>
              <li><strong>Analytics and research:</strong> To understand how visitors interact with our Service</li>
              <li><strong>Service improvement:</strong> To test new features and monitor the performance of our Service</li>
              <li><strong>Personalized content:</strong> To deliver content tailored to your interests</li>
              <li><strong>Marketing:</strong> To deliver relevant advertisements and measure their effectiveness</li>
            </ul>
            <p>
              The specific cookies we use may change from time to time, but they will generally fall into one of the above categories.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Third-Party Cookies</h2>
            <p>
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and so on. These cookies may be placed when you interact with services provided by third parties that appear on our Service.
            </p>
            <p>
              Some of the third-party services we use on our Service include:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Google Analytics:</strong> For website analytics and usage tracking</li>
              <li><strong>Google Ads:</strong> For advertising and remarketing</li>
              <li><strong>Facebook Pixel:</strong> For advertising and conversion tracking</li>
              <li><strong>Intercom/Zendesk:</strong> For customer support chat functionality</li>
              <li><strong>Stripe/PayPal:</strong> For payment processing</li>
            </ul>
            <p>
              Each third-party service provider has its own privacy and cookie policies. We encourage you to review these policies on their respective websites.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Managing and Disabling Cookies</h2>
            <p>
              You have the right to choose whether to accept cookies. You can control and manage cookies in various ways:
            </p>
            
            <h3 className="text-xl font-medium mb-2">6.1 Browser Settings</h3>
            <p>
              Most web browsers allow you to control cookies through their settings preferences. The method for disabling cookies varies from browser to browser. Below are links to instructions for some common browsers:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Internet Explorer</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
            </ul>
            <p>
              Please note that limiting or blocking cookies may impact the functionality of our Service. Many of the interactive features and services on our website will not function properly if you disable cookies.
            </p>
            
            <h3 className="text-xl font-medium mb-2">6.2 Third-Party Opt-Out Tools</h3>
            <p>
              In addition to browser controls, you can manage third-party cookies through various opt-out tools:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Analytics Opt-out Browser Add-on</a></li>
              <li><a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Your Online Choices</a> (EU)</li>
              <li><a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Digital Advertising Alliance Opt-Out Tool</a> (US)</li>
              <li><a href="https://youradchoices.ca/en/tools" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Canadian Digital Advertising Alliance Opt-Out Tool</a> (Canada)</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Cookie Consent</h2>
            <p>
              When you first visit our Service, you will be shown a cookie banner that allows you to accept or decline non-essential cookies. You can change your cookie preferences at any time through our cookie settings interface accessible via the footer of our website.
            </p>
            <p>
              By clicking "Accept All Cookies" on our cookie banner, you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts. If you choose to click "Only Necessary Cookies," only cookies that are essential to the functioning of the website will be set.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Changes to the Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will be posted on this page with an updated revision date. If we make significant changes to this policy, we may notify you through a banner on our website or by email.
            </p>
            <p>
              We encourage you to periodically review this page to stay informed about our use of cookies. Your continued use of our Service after any changes to this Cookie Policy constitutes your acceptance of the new policy.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
            <p>
              If you have any questions or concerns about our use of cookies or this Cookie Policy, please contact us:
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

export default CookiePolicy;


import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const GdprCompliance = () => {
  const lastUpdated = "May 10, 2025";
  
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>GDPR Compliance | PLR Organizer Pro</title>
        <meta name="description" content="Understand how PLR Organizer Pro complies with GDPR regulations and protects the privacy rights of EU citizens using our PLR management platform." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "GDPR Compliance Statement",
            "description": "PLR Organizer Pro's GDPR Compliance explains how we protect the privacy rights of EU citizens.",
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
        <h1 className="text-4xl font-bold mb-2">GDPR Compliance Statement</h1>
        <p className="text-muted-foreground mb-6">Last Updated: {lastUpdated}</p>
        
        <Separator className="mb-8" />
        
        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction to GDPR</h2>
            <p>
              The General Data Protection Regulation (GDPR) is a comprehensive data protection law that came into effect on May 25, 2018, in the European Union (EU) and European Economic Area (EEA). It provides enhanced privacy rights for individuals and places stricter obligations on organizations that collect and process personal data.
            </p>
            <p>
              At PLR Organizer Pro, we are committed to ensuring the privacy and protection of your personal data in compliance with GDPR and other applicable data protection laws. This GDPR Compliance Statement explains how we adhere to these regulations and outlines your rights as a data subject.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Our Commitment to GDPR Compliance</h2>
            <p>
              PLR Organizer Pro is committed to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Processing personal data lawfully, fairly, and transparently</li>
              <li>Collecting personal data only for specified, explicit, and legitimate purposes</li>
              <li>Limiting data collection to what is necessary for the purposes for which it is processed</li>
              <li>Ensuring personal data is accurate and kept up to date</li>
              <li>Storing personal data only as long as necessary for the specified purposes</li>
              <li>Processing personal data securely using appropriate technical and organizational measures</li>
              <li>Demonstrating compliance with GDPR principles</li>
            </ul>
            <p>
              We continuously review our data protection practices to ensure ongoing compliance with GDPR requirements and to implement best practices for data privacy and security.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Data Protection Principles</h2>
            <p>
              In accordance with GDPR Article 5, PLR Organizer Pro processes personal data based on the following principles:
            </p>
            
            <h3 className="text-xl font-medium mb-2">3.1 Lawfulness, Fairness, and Transparency</h3>
            <p>
              We process personal data lawfully, fairly, and in a transparent manner. We provide clear information about how we collect, use, and share personal data through our <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>
            
            <h3 className="text-xl font-medium mb-2">3.2 Purpose Limitation</h3>
            <p>
              We collect personal data only for specified, explicit, and legitimate purposes related to the provision of our PLR content management platform and do not process it in a manner incompatible with those purposes.
            </p>
            
            <h3 className="text-xl font-medium mb-2">3.3 Data Minimization</h3>
            <p>
              We limit our collection and processing of personal data to what is necessary in relation to the purposes for which it is processed.
            </p>
            
            <h3 className="text-xl font-medium mb-2">3.4 Accuracy</h3>
            <p>
              We take reasonable steps to ensure that personal data is accurate and, where necessary, kept up to date. We provide users with tools to access, correct, and update their personal information.
            </p>
            
            <h3 className="text-xl font-medium mb-2">3.5 Storage Limitation</h3>
            <p>
              We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, including legal, accounting, or reporting requirements.
            </p>
            
            <h3 className="text-xl font-medium mb-2">3.6 Integrity and Confidentiality</h3>
            <p>
              We implement appropriate technical and organizational measures to protect personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage.
            </p>
            
            <h3 className="text-xl font-medium mb-2">3.7 Accountability</h3>
            <p>
              We take responsibility for complying with GDPR principles and maintain documentation of our data processing activities.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Legal Basis for Processing</h2>
            <p>
              We process personal data in accordance with GDPR Article 6, which requires a lawful basis for processing. Depending on the specific context in which we collect and use your data, we rely on one or more of the following legal bases:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Consent:</strong> When you have given clear consent for us to process your personal data for a specific purpose. For example, when you opt in to receive marketing communications.</li>
              <li><strong>Contractual Necessity:</strong> When processing is necessary for the performance of a contract to which you are a party or to take steps at your request before entering into a contract. This applies when you subscribe to our Service.</li>
              <li><strong>Legal Obligation:</strong> When processing is necessary for compliance with a legal obligation to which we are subject, such as tax regulations or law enforcement requests.</li>
              <li><strong>Legitimate Interests:</strong> When processing is necessary for the purposes of the legitimate interests pursued by us or a third party, except where those interests are overridden by your interests, rights, or freedoms. We rely on legitimate interests for activities such as ensuring network security, preventing fraud, and improving our Service.</li>
            </ul>
            <p>
              We clearly identify the legal basis for each processing activity in our internal records and, where applicable, in our Privacy Policy.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Data Subject Rights</h2>
            <p>
              GDPR provides data subjects with enhanced rights regarding their personal data. PLR Organizer Pro respects and facilitates the exercise of these rights, which include:
            </p>
            
            <h3 className="text-xl font-medium mb-2">5.1 Right to Access</h3>
            <p>
              You have the right to request a copy of the personal data we hold about you and information about how we process it.
            </p>
            
            <h3 className="text-xl font-medium mb-2">5.2 Right to Rectification</h3>
            <p>
              You have the right to request correction of any inaccurate personal data we hold about you and to complete any incomplete personal data.
            </p>
            
            <h3 className="text-xl font-medium mb-2">5.3 Right to Erasure ("Right to be Forgotten")</h3>
            <p>
              You have the right to request the deletion of your personal data in certain circumstances, such as when the data is no longer necessary for the purposes for which it was collected.
            </p>
            
            <h3 className="text-xl font-medium mb-2">5.4 Right to Restriction of Processing</h3>
            <p>
              You have the right to request restriction of processing of your personal data in certain circumstances, such as when you contest the accuracy of the data.
            </p>
            
            <h3 className="text-xl font-medium mb-2">5.5 Right to Data Portability</h3>
            <p>
              You have the right to receive your personal data in a structured, commonly used, machine-readable format and to transmit that data to another controller without hindrance, where technically feasible.
            </p>
            
            <h3 className="text-xl font-medium mb-2">5.6 Right to Object</h3>
            <p>
              You have the right to object to the processing of your personal data in certain circumstances, including for direct marketing purposes or when processing is based on legitimate interests.
            </p>
            
            <h3 className="text-xl font-medium mb-2">5.7 Rights Related to Automated Decision Making</h3>
            <p>
              You have the right not to be subject to a decision based solely on automated processing, including profiling, which produces legal or similarly significant effects.
            </p>
            
            <h3 className="text-xl font-medium mb-2">5.8 Right to Withdraw Consent</h3>
            <p>
              Where we process personal data based on consent, you have the right to withdraw that consent at any time.
            </p>
            
            <div className="bg-muted p-4 rounded-md mb-4">
              <h4 className="font-semibold">How to Exercise Your Rights</h4>
              <p>
                To exercise any of these rights, please contact us at support@plrorganizerpro.com. We will respond to your request within one month. This period may be extended by two further months where necessary, taking into account the complexity and number of requests.
              </p>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Data Protection Measures</h2>
            <p>
              PLR Organizer Pro implements appropriate technical and organizational measures to ensure a level of security appropriate to the risk associated with the processing of personal data. These measures include:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Encryption:</strong> We encrypt personal data both in transit and at rest using industry-standard encryption protocols.</li>
              <li><strong>Access Controls:</strong> We restrict access to personal data to authorized personnel only, based on the principle of least privilege.</li>
              <li><strong>Security Testing:</strong> We conduct regular vulnerability scans and penetration tests to identify and address security weaknesses.</li>
              <li><strong>Employee Training:</strong> We provide data protection training to our employees and contractors who have access to personal data.</li>
              <li><strong>Security Monitoring:</strong> We monitor our systems for suspicious activities and potential data breaches.</li>
              <li><strong>Risk Assessments:</strong> We conduct regular data protection impact assessments for high-risk processing activities.</li>
              <li><strong>Data Backup and Recovery:</strong> We maintain secure backups of data and have procedures for rapid recovery in case of physical or technical incidents.</li>
            </ul>
            <p>
              We regularly review and update our security measures to ensure they remain appropriate and effective.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
            <p>
              We have established data retention periods for different categories of personal data based on the purpose for which the data was collected and legal requirements. Our data retention policy ensures that we do not keep personal data for longer than necessary.
            </p>
            <p>
              General retention periods include:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Account Information:</strong> Retained while your account is active and for a period after account closure to comply with legal obligations</li>
              <li><strong>Transaction Information:</strong> Retained for the period required by applicable tax and financial regulations</li>
              <li><strong>Communications:</strong> Retained as long as necessary to fulfill the purpose of the communication</li>
              <li><strong>Technical Information:</strong> Retained for a limited period to improve our Service and address technical issues</li>
            </ul>
            <p>
              When personal data is no longer needed, we securely delete or anonymize it.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. International Data Transfers</h2>
            <p>
              PLR Organizer Pro primarily processes personal data within the European Economic Area (EEA). However, in some cases, we may transfer personal data to countries outside the EEA. When we do so, we ensure that appropriate safeguards are in place to protect your personal data, such as:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Standard Contractual Clauses (SCCs):</strong> We use European Commission-approved SCCs for data transfers to third countries</li>
              <li><strong>Adequacy Decisions:</strong> We transfer data to countries that the European Commission has determined offer an adequate level of data protection</li>
              <li><strong>Data Processing Agreements:</strong> We have agreements with third-party processors that include specific provisions for international data transfers</li>
            </ul>
            <p>
              We ensure that any recipient of personal data provides appropriate safeguards and that enforceable data subject rights and effective legal remedies are available.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Data Breach Procedures</h2>
            <p>
              We have implemented procedures to detect, report, and investigate personal data breaches. In case of a breach that may result in a risk to the rights and freedoms of individuals, we will:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Notify the relevant supervisory authority without undue delay and, where feasible, not later than 72 hours after becoming aware of the breach</li>
              <li>Notify affected data subjects without undue delay when a breach is likely to result in a high risk to their rights and freedoms</li>
              <li>Document all breaches, including the facts, effects, and remedial actions taken</li>
            </ul>
            <p>
              Our notification will include the nature of the breach, categories and approximate number of data subjects affected, likely consequences of the breach, and measures taken or proposed to address the breach.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Data Protection Impact Assessments</h2>
            <p>
              For processing activities that are likely to result in a high risk to the rights and freedoms of individuals, we conduct Data Protection Impact Assessments (DPIAs) in accordance with GDPR Article 35. DPIAs help us identify and minimize data protection risks.
            </p>
            <p>
              Our DPIA process includes:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>A systematic description of the processing operations and their purposes</li>
              <li>An assessment of the necessity and proportionality of the processing</li>
              <li>An assessment of the risks to the rights and freedoms of data subjects</li>
              <li>The measures envisaged to address the risks and demonstrate compliance</li>
            </ul>
            <p>
              We consult with the relevant supervisory authority when a DPIA indicates that processing would result in a high risk in the absence of measures taken to mitigate the risk.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Data Protection Officer (DPO)</h2>
            <p>
              PLR Organizer Pro has appointed a Data Protection Officer who is responsible for overseeing our data protection strategy and implementation to ensure compliance with GDPR requirements. Our DPO is independent and reports directly to our company's highest level of management.
            </p>
            <p>
              The responsibilities of our DPO include:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Informing and advising our company and employees about their obligations under GDPR and other data protection laws</li>
              <li>Monitoring compliance with GDPR and other data protection laws</li>
              <li>Providing advice regarding Data Protection Impact Assessments</li>
              <li>Cooperating with supervisory authorities</li>
              <li>Acting as a point of contact for data subjects and supervisory authorities</li>
            </ul>
            <p>
              You can contact our DPO by email at privacy@plrorganizerpro.com.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Records of Processing Activities</h2>
            <p>
              In accordance with GDPR Article 30, we maintain records of our processing activities that include:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>The name and contact details of PLR Organizer Pro and, where applicable, the Data Protection Officer</li>
              <li>The purposes of the processing</li>
              <li>A description of the categories of data subjects and categories of personal data</li>
              <li>The categories of recipients to whom the personal data is or will be disclosed</li>
              <li>Transfers of personal data to third countries and the safeguards in place</li>
              <li>The envisaged time limits for erasure of different categories of data</li>
              <li>A general description of the technical and organizational security measures</li>
            </ul>
            <p>
              These records are maintained in written form, including in electronic form, and are available to supervisory authorities upon request.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. Training and Awareness</h2>
            <p>
              We provide regular training to our employees on data protection principles, GDPR requirements, and our internal data protection policies and procedures. This ensures that our team members are aware of their responsibilities and can handle personal data appropriately.
            </p>
            <p>
              Our training program includes:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Data protection fundamentals and GDPR principles</li>
              <li>Recognition and handling of data subject rights requests</li>
              <li>Data breach prevention, detection, and response</li>
              <li>Security best practices and procedures</li>
              <li>Role-specific training based on access to and processing of personal data</li>
            </ul>
            <p>
              We maintain records of training completion and regularly update our training materials to reflect changes in regulations and best practices.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">14. How to Exercise Your GDPR Rights</h2>
            <p>
              We aim to make it as easy as possible for you to exercise your GDPR rights. You can exercise any of your rights by contacting us at support@plrorganizerpro.com or through the following methods:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Account Settings:</strong> Many of your rights can be exercised directly through your PLR Organizer Pro account settings, where you can access, correct, and delete certain personal information.</li>
              <li><strong>Email Request:</strong> Send an email to support@plrorganizerpro.com with the subject "GDPR Rights Request" and specify which right you wish to exercise.</li>
              <li><strong>Contact Form:</strong> Use our <Link to="/contact" className="text-primary hover:underline">Contact Form</Link> and select "GDPR Rights Request" as the subject.</li>
            </ul>
            <p>
              We will respond to your request without undue delay and at the latest within one month. This period may be extended by two further months where necessary, taking into account the complexity and number of the requests. If we extend the response period, we will inform you of the extension within one month of receiving your request, explaining the reasons for the delay.
            </p>
            <p>
              If we decide not to take action on your request, we will inform you without delay and at the latest within one month of receipt of the request, explaining the reasons for not taking action and informing you about your right to lodge a complaint with a supervisory authority.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">15. Contact Information</h2>
            <p>
              If you have any questions about our GDPR compliance, would like to exercise your data protection rights, or have concerns about our data processing practices, please contact us using the details below:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Data Protection Officer:</strong> privacy@plrorganizerpro.com</li>
              <li><strong>General Support:</strong> support@plrorganizerpro.com</li>
              <li><strong>Contact Form:</strong> <Link to="/contact" className="text-primary hover:underline">Contact Us</Link></li>
            </ul>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GdprCompliance;

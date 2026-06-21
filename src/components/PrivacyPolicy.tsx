import { useEffect } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen text-foreground bg-background antialiased pt-24 pb-12 flex flex-col">
      <Navigation />
      <main className="max-w-4xl mx-auto px-5 flex-grow mb-24">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none text-muted-foreground prose-h2:text-foreground prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-p:leading-relaxed prose-li:leading-relaxed">
          <p className="text-lg"><strong>Last Updated: June 21, 2026</strong></p>
          <p>Welcome to webadda.in. This Privacy Policy explains how we collect, use, and protect your information when you visit our website or use our services.</p>
          
          <h2>1. Data Collection</h2>
          <p>When you use our contact form or interact with our site, we may collect the following information:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4 mb-8">
            <li>Name</li>
            <li>Phone Number</li>
            <li>Email Address</li>
            <li>Business Name and Type</li>
            <li>Message details and project requirements</li>
          </ul>

          <h2>2. How We Use Data</h2>
          <p>We use this data exclusively to respond to your inquiries, provide accurate project estimates, communicate during project development, and deliver our services effectively.</p>

          <h2>3. Data Sharing and WhatsApp</h2>
          <p>By submitting the contact form, you consent to sharing your submitted data with us via email or WhatsApp. We do not sell, rent, or trade your personal information to any third parties for marketing purposes.</p>

          <h2>4. Data Retention</h2>
          <p>We retain your contact information only as long as necessary to fulfill the purposes outlined in this policy, complete your project, provide ongoing support, or as required by law.</p>

          <h2>5. Cookies and Local Storage</h2>
          <p>Our website uses local storage purely to remember your theme preference (light/dark mode). We do not use tracking cookies or third-party advertising cookies.</p>

          <h2>6. User Rights</h2>
          <p>You have the right to request the review, update, or deletion of your personal data by contacting us via our official email or phone number.</p>

          <h2>7. Contact Information</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p className="mt-4">
            Email: <a href="mailto:shivekansh@gmail.com" className="text-blue-400 hover:text-blue-300">shivekansh@gmail.com</a><br/>
            Phone: <a href="https://wa.me/919997954148" className="text-blue-400 hover:text-blue-300">+91 99979 54148</a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

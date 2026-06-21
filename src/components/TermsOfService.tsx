import { useEffect } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen text-foreground bg-background antialiased pt-24 pb-12 flex flex-col">
      <Navigation />
      <main className="max-w-4xl mx-auto px-5 flex-grow mb-24">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight">Terms of Service</h1>
        <div className="prose prose-invert max-w-none text-muted-foreground prose-h2:text-foreground prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-p:leading-relaxed prose-li:leading-relaxed">
          <p className="text-lg"><strong>Last Updated: June 21, 2026</strong></p>
          <p>Please read these terms carefully before using our services.</p>
          
          <h2>1. Service Description</h2>
          <p>webadda.in provides custom website design, web development, maintenance, and related digital services for local businesses in India.</p>

          <h2>2. Payment Terms</h2>
          <p>Projects require an initial advance payment (typically 50%) before development begins. The final balance is due upon project completion and before final handover or deployment to production. For ongoing maintenance plans, payments are billed as agreed (monthly or yearly).</p>

          <h2>3. Delivery Timeline Estimates</h2>
          <p>Standard websites are typically delivered within 3 to 7 days, depending on the promptness of content delivery by the client and the complexity of the requirements. Complex custom requirements may require additional time, which will be mutually agreed upon before the project starts.</p>

          <h2>4. Intellectual Property</h2>
          <p>Upon full and final payment, the client owns the final design, content, and code of the website as per the agreement. webadda.in retains the right to display the completed project in our portfolio, marketing materials, and case studies unless a non-disclosure agreement (NDA) is signed.</p>

          <h2>5. Client Responsibilities</h2>
          <p>The client is responsible for providing all necessary text content, images, brand assets, and feedback in a timely manner. Delays in providing these assets may extend the delivery timeline.</p>

          <h2>6. Limitation of Liability</h2>
          <p>webadda.in shall not be held liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services, loss of data, or business interruption related to websites built by us.</p>

          <h2>7. Dispute Resolution and Governing Law</h2>
          <p>These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in India.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

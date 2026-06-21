import { useEffect, useMemo } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

// -----------------------------------------------------------------------------
// Types & Configuration
// -----------------------------------------------------------------------------

interface TermsSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface ContactLinkProps {
  href: string;
  label: string;
  value: string;
  icon: React.ReactNode;
}

const LAST_UPDATED = '2026-06-21';

const CONTACT = {
  email: 'shivekansh@gmail.com',
  phone: '+91 99979 54148',
  whatsapp: 'https://wa.me/919997954148',
  domain: 'https://webadda.in',
} as const;

// -----------------------------------------------------------------------------
// Content
// -----------------------------------------------------------------------------

function BrandLink() {
  return (
    <a
      href={CONTACT.domain}
      className="text-primary hover:text-primary/80 underline decoration-2 underline-offset-4 transition-colors"
    >
      webadda.in
    </a>
  );
}

const TERMS_SECTIONS: TermsSection[] = [
  {
    id: 'service-description',
    title: '1. Service Description',
    content: (
      <p>
        <BrandLink /> provides custom website design, web development, maintenance,
        and related digital services for local businesses in India.
      </p>
    ),
  },
  {
    id: 'payment-terms',
    title: '2. Payment Terms',
    content: (
      <p>
        Projects require an initial advance payment (typically 50%) before development
        begins. The final balance is due upon project completion and before final
        handover or deployment to production. For ongoing maintenance plans, payments
        are billed as agreed (monthly or yearly).
      </p>
    ),
  },
  {
    id: 'delivery-timeline',
    title: '3. Delivery Timeline Estimates',
    content: (
      <p>
        Standard websites are typically delivered within 3 to 7 days, depending on the
        promptness of content delivery by the client and the complexity of the
        requirements. Complex custom requirements may require additional time, which will
        be mutually agreed upon before the project starts.
      </p>
    ),
  },
  {
    id: 'intellectual-property',
    title: '4. Intellectual Property',
    content: (
      <p>
        Upon full and final payment, the client owns the final design, content, and
        code of the website as per the agreement. <BrandLink /> retains the right to
        display the completed project in our portfolio, marketing materials, and case
        studies unless a non-disclosure agreement (NDA) is signed.
      </p>
    ),
  },
  {
    id: 'client-responsibilities',
    title: '5. Client Responsibilities',
    content: (
      <p>
        The client is responsible for providing all necessary text content, images,
        brand assets, and feedback in a timely manner. Delays in providing these assets
        may extend the delivery timeline.
      </p>
    ),
  },
  {
    id: 'limitation-of-liability',
    title: '6. Limitation of Liability',
    content: (
      <p>
        <BrandLink /> shall not be held liable for any direct, indirect, incidental,
        special, or consequential damages resulting from the use or inability to use
        our services, loss of data, or business interruption related to websites built
        by us.
      </p>
    ),
  },
  {
    id: 'dispute-resolution',
    title: '7. Dispute Resolution and Governing Law',
    content: (
      <p>
        These terms shall be governed by and construed in accordance with the laws of
        India. Any disputes arising under these terms shall be subject to the exclusive
        jurisdiction of the courts located in India.
      </p>
    ),
  },
];

// -----------------------------------------------------------------------------
// Icons
// -----------------------------------------------------------------------------

function LinkIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function MailIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.13-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

// -----------------------------------------------------------------------------
// Sub-components
// -----------------------------------------------------------------------------

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="group text-2xl md:text-3xl font-bold mt-12 mb-4 scroll-mt-28 flex items-center gap-3 text-foreground"
    >
      <span>{children}</span>
      <a
        href={`#${id}`}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-muted-foreground hover:text-primary focus:opacity-100 focus:outline-none"
        aria-label={`Link to ${children} section`}
      >
        <LinkIcon className="w-5 h-5" />
      </a>
    </h2>
  );
}

function ContactLink({ href, label, value, icon }: ContactLinkProps) {
  return (
    <a
      href={href}
      className="group flex items-center gap-4 p-4 rounded-2xl border border-border bg-card/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
    >
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary shrink-0">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </p>
        <p className="font-medium text-foreground truncate">{value}</p>
      </div>
    </a>
  );
}

function ContactSupport() {
  return (
    <section id="contact" className="scroll-mt-28 not-prose mt-16">
      <SectionHeading id="contact">8. Questions About These Terms?</SectionHeading>
      <p className="text-muted-foreground leading-7 mb-6">
        If you have any questions about these Terms of Service, please contact us and we
        will be happy to clarify.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <ContactLink
          href={`mailto:${CONTACT.email}`}
          label="Email"
          value={CONTACT.email}
          icon={<MailIcon className="w-5 h-5" />}
        />
        <ContactLink
          href={CONTACT.whatsapp}
          label="WhatsApp"
          value={CONTACT.phone}
          icon={<PhoneIcon className="w-5 h-5" />}
        />
      </div>
    </section>
  );
}

function TableOfContents() {
  return (
    <nav aria-label="Table of contents" className="mb-12 p-6 rounded-2xl border border-border bg-muted/30">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
        On this page
      </h2>
      <ol className="grid gap-2 sm:grid-cols-2">
        {TERMS_SECTIONS.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="text-sm text-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              <span className="text-muted-foreground">#</span>
              {section.title}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#contact"
            className="text-sm text-foreground hover:text-primary transition-colors flex items-center gap-2"
          >
            <span className="text-muted-foreground">#</span>
            8. Questions About These Terms?
          </a>
        </li>
      </ol>
    </nav>
  );
}

function LastUpdatedBadge({ date }: { date: string }) {
  const formatted = useMemo(() => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [date]);

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground mb-6">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
      </span>
      Last Updated: <time dateTime={date}>{formatted}</time>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Print Styles Hook
// -----------------------------------------------------------------------------

function usePrintStyles() {
  useEffect(() => {
    const style = document.createElement('style');
    style.setAttribute('data-terms-print', 'true');
    style.textContent = `
      @media print {
        .terms-page { background: #ffffff !important; color: #000000 !important; }
        .terms-page * { color: #000000 !important; border-color: #cccccc !important; background: transparent !important; box-shadow: none !important; text-shadow: none !important; }
        .terms-page a { color: #000000 !important; text-decoration: underline !important; }
        .terms-page .print-hidden { display: none !important; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, []);
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export default function TermsOfService() {
  usePrintStyles();

  useEffect(() => {
    document.title = 'Terms of Service | webadda.in';
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const element = document.querySelector(hash);
    if (!element) return;

    const offset = 120;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }, []);

  return (
    <div className="terms-page min-h-screen text-foreground bg-background antialiased flex flex-col">
      <div className="print:hidden">
        <Navigation />
      </div>

      <main className="flex-grow px-5 pt-24 pb-12">
        <article className="max-w-4xl mx-auto mb-24" aria-labelledby="terms-heading">
          {/* Header */}
          <header className="mb-10 md:mb-14">
            <LastUpdatedBadge date={LAST_UPDATED} />
            <h1
              id="terms-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6"
            >
              Terms of Service
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Please read these terms carefully before using our services. By using{' '}
              <BrandLink />, you agree to be bound by the following terms and conditions.
            </p>
          </header>

          {/* Table of Contents */}
          <TableOfContents />

          {/* Terms Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:text-foreground prose-headings:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-2xl md:prose-h2:text-3xl prose-p:leading-7 prose-p:text-muted-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-a:font-medium prose-a:underline-offset-4 prose-strong:text-foreground prose-li:leading-7 prose-ul:my-6 prose-li:marker:text-muted-foreground">
            {TERMS_SECTIONS.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28"
              >
                <SectionHeading id={section.id}>{section.title}</SectionHeading>
                {section.content}
              </section>
            ))}
            <ContactSupport />
          </div>
        </article>
      </main>

      <div className="print:hidden mt-auto">
        <Footer />
      </div>
    </div>
  );
}

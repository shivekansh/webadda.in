import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: 'How much does a website cost?',
    a: 'Our packages start at ₹3,500 for a simple 5-page website and go up to ₹50,000+ for complex systems with booking, ordering, and dashboards. We always give you a clear quote before you commit — no hidden fees or surprises. The price depends on what you need, and we\'ll help you figure out the right fit.',
  },
  {
    q: 'Do you provide hosting?',
    a: 'Yes! We can set up and manage hosting for you, or deploy to your existing hosting if you already have one. Our monthly care plans include hosting management. For new clients, we typically recommend a reliable hosting setup that fits your traffic and budget.',
  },
  {
    q: 'How long does a website usually take?',
    a: 'A Starter website is usually ready in 3–5 days. A Growth website takes 7–10 days. Premium custom systems typically take 15–30 days depending on complexity. We give you a clear timeline in the quote, and we stick to it.',
  },
  {
    q: 'Can you help with logo, photos, or copy?',
    a: 'Yes! We can help with basic logo design, sourcing or editing photos, and writing copy for your website. If you already have content, we\'ll use that. If not, we\'ll work with what you have and help you put it together in a way that looks great.',
  },
  {
    q: 'What is included in the monthly care plans?',
    a: 'The Basic plan (₹999/month) covers hosting, security, backups, and minor updates. The Growth plan (₹2,999/month) adds SEO work, Google Business Profile updates, content updates, and analytics reports. The Premium plan (₹4,999+/month) includes everything plus unlimited content updates and a monthly strategy call.',
  },
  {
    q: 'Do you work with businesses outside your city?',
    a: 'Absolutely! We are a 100% remote service. We work with businesses all across India — from Delhi to Chennai, Mumbai to Kolkata, and everywhere in between. All communication happens via WhatsApp, email, and video calls.',
  },
  {
    q: 'Do I need to pay upfront?',
    a: 'No upfront payment required to get a quote. Once you\'re happy with the proposal, we typically take a 50% advance to start work and the remaining 50% when the site is ready to launch. We\'ll be clear about this in the quote.',
  },
  {
    q: 'Will I be able to update the website myself?',
    a: 'If you choose WordPress, yes — you can update text, images, and products yourself through a simple dashboard. For custom-built sites, we can add a content management panel, or you can use our monthly care plans for updates. We\'ll always make sure you\'re not stuck.',
  },
  {
    q: 'What happens after the website is live?',
    a: 'Every project includes a free support period after launch (30–60 days depending on plan). After that, you can choose a monthly care plan or reach out whenever you need changes. We\'re always available on WhatsApp.',
  },
  {
    q: 'Can you integrate WhatsApp, Google Maps, and other tools?',
    a: 'Yes — WhatsApp button, click-to-call, Google Maps, Instagram feed, payment gateways, and many other integrations are part of what we do. Just tell us what you need and we\'ll include it in your quote.',
  },
];

function FAQItem({ item, index }: { item: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: (index % 5) * 0.06 }}
      className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
        open ? 'border-blue-500/30' : 'border-white/8'
      }`}
      style={{ background: 'var(--color-bg-glass)' }}
    >
      <motion.button
        whileHover={{ x: 4, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left group"
        aria-expanded={open}
      >
        <span className={`font-semibold text-[15px] leading-snug transition-colors duration-200 ${
          open ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
        }`}>
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-200 ${
            open ? 'bg-blue-500/20 text-blue-400' : 'bg-transparent border border-border text-muted-foreground'
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0">
              <div className="h-px bg-white/6 mb-4" />
              <p className="text-muted-foreground text-sm leading-relaxed">{item.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const half = Math.ceil(faqs.length / 2);
  const left = faqs.slice(0, half);
  const right = faqs.slice(half);

  return (
    <section id="faq" className="section-padding section-mesh relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/15 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
          whileInView={{ opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="flex justify-center mb-4"
          >
            <span className="tag tag-amber">Common Questions</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tighter"
          >
            Everything you need
            <br />
            <span className="text-gradient-blue">to know before you start</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-xl mx-auto"
          >
            Clear answers. No jargon. Just what you need to make a confident decision.
          </motion.p>
        </motion.div>

        {/* Two column FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            {left.map((item, i) => (
              <FAQItem key={i} item={item} index={i} />
            ))}
          </div>
          <div className="space-y-3">
            {right.map((item, i) => (
              <FAQItem key={i} item={item} index={i + half} />
            ))}
          </div>
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 glass rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="text-xl font-bold text-foreground mb-1">
              Still have questions?
            </p>
            <p className="text-muted-foreground text-sm">Ask us anything — we reply within a few hours on WhatsApp.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <motion.a
              href="https://wa.me/919997954148?text=Hi!%20I%20have%20a%20question%20about%20your%20website%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp px-6 py-3 text-sm flex items-center gap-2 group"
              whileHover="hover"
              whileTap={{ scale: 0.97, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
              variants={{ hover: { scale: 1.03 } }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Ask on WhatsApp
            </motion.a>
            <motion.a
              href="mailto:shivekansh@gmail.com"
              className="btn-ghost px-6 py-3 text-sm flex items-center gap-2 group"
              whileHover="hover"
              whileTap={{ scale: 0.97, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
              variants={{ hover: { scale: 1.03 } }}
            >
              Send an Email
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

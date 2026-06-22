import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUp, ArrowRight } from 'lucide-react';
import { lenis, navigate } from '../App';
import { SplitText } from '../utils/textSplitter';

const footerLinks = {
  Services: [
    { label: 'Starter Package', href: '#packages' },
    { label: 'Growth Package', href: '#packages' },
    { label: 'Premium Package', href: '#packages' },
    { label: 'Monthly Care Plans', href: '#care-plans' },
  ],
  'What We Build': [
    { label: 'Static Websites', href: '#capabilities' },
    { label: 'WordPress Sites', href: '#capabilities' },
    { label: 'Booking Systems', href: '#capabilities' },
    { label: 'Online Ordering', href: '#capabilities' },
    { label: 'Admin Dashboards', href: '#capabilities' },
  ],
  Industries: [
    { label: 'Restaurants', href: '#industries' },
    { label: 'Clinics & Salons', href: '#industries' },
    { label: 'Gyms & Coaching', href: '#industries' },
    { label: 'Retail & Kirana', href: '#industries' },
    { label: 'Real Estate', href: '#industries' },
  ],
  Company: [
    { label: 'How We Work', href: '#process' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Get a Quote', href: '#contact' },
    { label: 'Contact Us', href: '#contact' },
  ],
};

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, href: string) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const p = params.get('p');
    
    if (p && href.startsWith('#')) {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) {
          if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -80 });
          else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      if (lenis) {
        lenis.scrollTo(el as HTMLElement, { offset: -80 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <footer className="relative overflow-hidden bg-secondary text-muted-foreground">
      {/* CTA banner */}
      <div className="relative border-b border-border">
        <div className="absolute inset-0 mesh-bg" />
        <div className="relative max-w-7xl mx-auto px-5 py-16 md:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-2"
              >
                <span className="tag tag-cyan">Free Consultation</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-extrabold text-foreground mb-3 tracking-tighter"
              >
                <SplitText text="Ready to grow your" type="words" delay={0.1} />
                <br />
                <SplitText className="text-gradient-mixed" text="business online?" type="words" delay={0.4} />
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground max-w-lg"
              >
                Get a free quote within 24 hours. No commitment, no upfront payment. Just a conversation 
                about what you need and how we can help.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="flex flex-col sm:flex-row gap-3 flex-shrink-0"
            >
              <motion.a
                href="https://wa.me/919997954148?text=Hi!%20I%27m%20interested%20in%20getting%20a%20website%20for%20my%20business.%20Can%20you%20give%20me%20a%20free%20quote%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp px-8 py-4 text-[15px] flex items-center gap-2.5 group"
                whileHover="hover"
                whileTap={{ scale: 0.97, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
                variants={{ hover: { scale: 1.03 } }}
              >
                <WhatsAppIcon />
                Start on WhatsApp
              </motion.a>
              <motion.button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleNavClick(e, '#contact')}
                className="btn-ghost px-8 py-4 text-[15px] group"
                whileHover="hover"
                whileTap={{ scale: 0.97, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
                variants={{ hover: { scale: 1.03 } }}
              >
                Send an Email
              </motion.button>
            </motion.div>
          </div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="mt-10 flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-slate-500"
          >
            {[
              '✅ Quote within 24 hrs',
              '✅ No upfront payment',
              '✅ Pan-India remote delivery',
              '✅ WhatsApp & email support',
              '✅ Flexible timelines',
            ].map((t, i) => <span key={i}>{t}</span>)}
          </motion.div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-5 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <img src="/favicon.png" alt="webadda.in logo" className="w-9 h-9 object-contain rounded-xl" />
              <div>
                <span className="font-bold text-foreground text-lg">webadda.in</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              Premium websites for local businesses across India. We help small businesses 
              grow online with modern, affordable, results-driven web solutions.
            </p>

            <div className="space-y-3">
              <a href="tel:+919997954148" className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-4 h-4 text-cyan-400" />
                +91 99979 54148
              </a>
              <a href="mailto:shivekansh@gmail.com" className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4 text-blue-400" />
                shivekansh@gmail.com
              </a>
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-blue-400" />
                100% Remote · Pan-India
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-foreground font-semibold text-sm mb-4">
                {category}
              </h4>
              <motion.ul 
                className="space-y-2.5"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
              >
                {links.map((link) => (
                  <motion.li 
                    key={link.label}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      show: { opacity: 1, x: 0 }
                    }}
                  >
                    <button
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleNavClick(e, link.href)}
                      className="group flex items-center text-muted-foreground hover:text-foreground text-sm transition-all duration-300"
                    >
                      <span className="relative pb-0.5 overflow-hidden">
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} webadda.in. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-4 text-sm text-slate-600">
              <a href="?p=privacy-policy" onClick={(e) => { e.preventDefault(); navigate('/privacy-policy'); }} className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="?p=terms-of-service" onClick={(e) => { e.preventDefault(); navigate('/terms-of-service'); }} className="hover:text-foreground transition-colors">Terms of Service</a>
            </div>
            <span className="text-slate-600 text-sm">Made with ❤️ for Indian businesses</span>
            <motion.button
              onClick={() => {
                if (lenis) {
                  lenis.scrollTo(0, { duration: 1.5 });
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-white/20 transition-all duration-200"
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}

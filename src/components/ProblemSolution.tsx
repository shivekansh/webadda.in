import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  WifiOff, SearchX, UserX, ThumbsDown, PhoneCall,
  Globe, MapPin, Users, Star, MessageSquare
} from 'lucide-react';

const problems = [
  {
    icon: WifiOff,
    title: 'No Online Presence',
    desc: 'Customers search online before visiting. Without a website, you\'re invisible to them.',
    color: 'text-red-400',
    bg: 'bg-red-500/8 border-red-500/15',
  },
  {
    icon: SearchX,
    title: 'Lost on Google',
    desc: 'Competitors with websites show up first. Your business never makes it to page one.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/8 border-orange-500/15',
  },
  {
    icon: UserX,
    title: 'Losing Leads Every Day',
    desc: 'People who could be your customers are calling someone else because they found them first.',
    color: 'text-rose-400',
    bg: 'bg-rose-500/8 border-rose-500/15',
  },
  {
    icon: ThumbsDown,
    title: 'Weak First Impression',
    desc: 'Your business looks less credible than competitors. Trust is lost before they even visit.',
    color: 'text-red-300',
    bg: 'bg-red-400/8 border-red-400/15',
  },
  {
    icon: PhoneCall,
    title: 'Manual Everything',
    desc: 'Answering the same questions repeatedly, taking bookings by phone, managing everything manually.',
    color: 'text-orange-300',
    bg: 'bg-orange-400/8 border-orange-400/15',
  },
];

const solutions = [
  {
    icon: Globe,
    title: 'A Website That Sells',
    desc: 'A fast, professional website that turns visitors into customers. Optimized for mobile and easy to find.',
    color: 'text-blue-400',
    bg: 'from-blue-500/10 to-blue-600/5 border-blue-500/15',
    tag: 'Starter & Growth Plans',
    tagColor: 'tag-blue',
  },
  {
    icon: MapPin,
    title: 'Rank Locally on Google',
    desc: 'SEO setup and Google Business Profile so your business appears when nearby customers are searching.',
    color: 'text-emerald-400',
    bg: 'from-emerald-500/10 to-emerald-600/5 border-emerald-500/15',
    tag: 'All Plans',
    tagColor: 'tag-emerald',
  },
  {
    icon: Users,
    title: 'Automated Lead Capture',
    desc: 'WhatsApp integration, contact forms, and booking systems that capture leads even when you\'re busy.',
    color: 'text-violet-400',
    bg: 'from-violet-500/10 to-violet-600/5 border-violet-500/15',
    tag: 'Growth & Premium',
    tagColor: 'tag-violet',
  },
  {
    icon: Star,
    title: 'Instant Credibility',
    desc: 'A polished, modern website that makes your business look as good as it really is, or better.',
    color: 'text-amber-400',
    bg: 'from-amber-500/10 to-amber-600/5 border-amber-500/15',
    tag: 'All Plans',
    tagColor: 'tag-amber',
  },
  {
    icon: MessageSquare,
    title: 'Easy Customer Management',
    desc: 'Online orders, appointment booking, and customer enquiries handled through a simple admin dashboard.',
    color: 'text-blue-300',
    bg: 'from-blue-400/10 to-blue-500/5 border-blue-400/15',
    tag: 'Premium Plan',
    tagColor: 'tag-blue',
  },
];

function ProblemCard({ item, index }: { item: typeof problems[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-start gap-4 p-4 rounded-2xl border ${item.bg} group hover:border-opacity-40 transition-all duration-300`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${item.bg}`}>
        <item.icon className={`w-5 h-5 ${item.color}`} />
      </div>
      <div>
        <h4 className="text-foreground font-semibold text-sm mb-1">
          {item.title}
        </h4>
        <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  );
}

function SolutionCard({ item, index }: { item: typeof solutions[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-start gap-4 p-4 rounded-2xl border bg-gradient-to-br ${item.bg} hover-lift group cursor-default`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${item.bg}`}>
        <item.icon className={`w-5 h-5 ${item.color}`} />
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h4 className="text-foreground font-semibold text-sm">
            {item.title}
          </h4>
          <span className={`tag ${item.tagColor} text-[10px] px-2 py-0.5`}>{item.tag}</span>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  );
}

export default function ProblemSolution() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="problem" className="section-padding section-mesh relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div ref={sectionRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-4"
          >
            <span className="tag tag-blue">The Reality</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tighter"
          >
            Every day without a website
            <br />
            <span className="text-gradient-blue">costs you customers</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            These are the real challenges local businesses face, and exactly what we fix.
          </motion.p>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Problems Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-red-500/15 border border-red-500/20 flex items-center justify-center">
                <span className="text-red-400 text-sm font-bold">✕</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">
                The Problems You Face
              </h3>
            </div>
            <div className="flex flex-col gap-3">
              {problems.map((item, i) => (
                <ProblemCard key={i} item={item} index={i} />
              ))}
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
                <span className="text-emerald-400 text-sm font-bold">✓</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">
                What We Solve For You
              </h3>
            </div>
            <div className="flex flex-col gap-3">
              {solutions.map((item, i) => (
                <SolutionCard key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto border-gradient">
            <p className="text-2xl font-bold text-foreground mb-2">
              Ready to fix this?
            </p>
            <p className="text-muted-foreground mb-6">Get a free consultation. No commitment, no pressure. Just clarity.</p>
            <motion.a
              href="https://wa.me/919997954148?text=Hi!%20I%27m%20interested%20in%20getting%20a%20website%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp px-8 py-4 text-[15px] inline-flex items-center gap-2.5"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Get a Free Consultation
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

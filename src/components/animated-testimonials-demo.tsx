import { StaggerTestimonials } from "./ui/stagger-testimonials";
import { motion } from 'framer-motion';

export default function AnimatedTestimonialsDemo() {
  return (
    <div className="py-20 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-4"
          >
            <span className="tag tag-emerald">Client Love</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-white mb-6"
          >
            Trusted by founders
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            Don't just take our word for it. Here's what business owners are saying about webadda.in.
          </motion.p>
        </div>
        
        {/* Render the Stagger Testimonials */}
        <StaggerTestimonials />
      </div>
    </div>
  );
}

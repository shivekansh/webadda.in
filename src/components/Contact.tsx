import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, AlertCircle, Phone, Mail, Clock, MapPin, ChevronDown } from 'lucide-react';
import { useConfetti } from '../hooks/useConfetti';
import { SplitText } from '../utils/textSplitter';
import { MagneticButton } from './MagneticButton';

interface FormData {
  name: string;
  business: string;
  businessType: string;
  phone: string;
  email: string;
  message: string;
}

interface Errors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

const initialForm: FormData = {
  name: '',
  business: '',
  businessType: '',
  phone: '',
  email: '',
  message: '',
};

const businessTypes = [
  'Restaurant / Cafe', 'Clinic / Hospital', 'Salon / Spa', 'Gym / Fitness',
  'Coaching Center', 'Retail Store', 'Real Estate', 'Other',
];

function validate(form: FormData): Errors {
  const errors: Errors = {};
  if (!form.name.trim()) errors.name = 'Name is required';
  if (!form.phone.trim()) errors.phone = 'Phone number is required';
  else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) errors.phone = 'Enter a valid 10-digit Indian mobile number';
  if (form.email && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(form.email.trim())) errors.email = 'Enter a valid email address';
  if (!form.message.trim()) errors.message = 'Please tell us briefly about your project';
  else if (form.message.trim().length < 10) errors.message = 'Message is too short';
  return errors;
}

function CustomSelect({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full bg-transparent border border-border border rounded-xl px-4 pt-6 pb-2 text-sm text-left transition-all duration-200 outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] flex justify-between items-center ${open ? 'border-blue-500/50 ring-2 ring-blue-500/15' : 'border-border hover:border-white/20'}`}
      >
        <span className={value ? 'text-foreground' : 'text-transparent'}>{value || 'Select industry...'}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }}><ChevronDown className="w-4 h-4 text-muted-foreground" /></motion.div>
      </button>
      <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${value || open ? 'top-2 text-[10px] uppercase tracking-wider text-muted-foreground' : 'top-4 text-sm text-muted-foreground'}`}>
        Business Type
      </label>
      
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-20 top-full left-0 right-0 mt-2 bg-slate-900 border border-border rounded-xl shadow-xl overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto">
              {options.map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className="w-full text-left px-4 py-3 text-sm text-muted-foreground hover:bg-blue-500/20 hover:text-foreground transition-colors"
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const { particles, fire } = useConfetti();
  const isMounted = useRef(true);

  useEffect(() => {
    return () => { isMounted.current = false; };
  }, []);

  const update = (key: keyof FormData, value: string) => {
    setForm(f => ({ ...f, [key]: value }));
    if (touched[key]) {
      const newErrors = validate({ ...form, [key]: value });
      setErrors(e => ({ ...e, [key]: newErrors[key as keyof Errors] }));
    }
  };

  const blur = (key: keyof FormData) => {
    setTouched(t => ({ ...t, [key]: true }));
    const newErrors = validate(form);
    setErrors(e => ({ ...e, [key]: newErrors[key as keyof Errors] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched as Record<keyof FormData, boolean>);
    const newErrors = validate(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setStatus('submitting');

    // Simulate form submission - in production, route to backend
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (!isMounted.current) return;
      
      // Build a WhatsApp message from the form
      const msg = encodeURIComponent(
        `Hi! I submitted the contact form on your website.\n\nName: ${form.name.trim()}\nBusiness: ${form.business.trim() || 'N/A'} (${form.businessType || 'Not specified'})\nPhone: ${form.phone.trim()}\nEmail: ${form.email.trim() || 'N/A'}\n\nMessage: ${form.message.trim()}`
      );
      setStatus('success');
      fire(40);
      setTimeout(() => {
        if (isMounted.current) {
          window.open(`https://wa.me/919997954148?text=${msg}`, '_blank');
        }
      }, 1000);
    } catch {
      if (isMounted.current) setStatus('error');
    }
  };

  const inputClass = (field: keyof Errors) =>
    `peer w-full bg-transparent border border-border border rounded-xl px-4 pt-6 pb-2 text-sm text-foreground placeholder-transparent transition-all duration-200 outline-none focus:ring-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] form-input-focus ${
      errors[field] && touched[field as keyof typeof touched]
        ? 'border-red-500/50 focus:ring-red-500/20 animate-shake'
        : 'border-border focus:border-blue-500/50 focus:ring-blue-500/15'
    }`;

  const labelClass = "absolute left-4 top-2 text-[10px] uppercase tracking-wider text-muted-foreground transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-blue-400 pointer-events-none";

  const ErrorMsg = ({ field }: { field: keyof Errors }) =>
    errors[field] && touched[field as keyof typeof touched] ? (
      <motion.p
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-400 text-xs mt-1.5 flex items-center gap-1"
      >
        <AlertCircle className="w-3 h-3" />
        {errors[field]}
      </motion.p>
    ) : null;

  return (
    <section id="contact" className="section-padding section-mesh relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
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
            <span className="tag tag-blue">Get in Touch</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tighter"
          >
            <SplitText text="Let's build something" type="words" delay={0.1} />
            <br />
            <SplitText className="text-gradient-blue" text="great together" type="words" delay={0.4} />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            No commitment required. We'll get back to you within a few hours with a free consultation.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Contact info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Quick contact cards */}
            {[
              {
                icon: Phone,
                label: 'Call or WhatsApp',
                value: '+91 99979 54148',
                sub: 'Mon–Sun, 9am–9pm IST',
                href: 'tel:+919997954148',
                color: 'text-emerald-400',
                border: 'border-emerald-500/20',
              },
              {
                icon: Mail,
                label: 'Email us',
                value: 'shivekansh@gmail.com',
                sub: 'Usually reply within 4 hours',
                href: 'mailto:shivekansh@gmail.com',
                color: 'text-blue-400',
                border: 'border-blue-500/20',
              },
              {
                icon: Clock,
                label: 'Working Hours',
                value: 'Mon–Sun: 9am–9pm',
                sub: 'Available all 7 days',
                href: null,
                color: 'text-amber-400',
                border: 'border-amber-500/20',
              },
              {
                icon: MapPin,
                label: 'Service Area',
                value: 'Pan-India, 100% Remote',
                sub: 'All communication via WhatsApp / email',
                href: null,
                color: 'text-violet-400',
                border: 'border-violet-500/20',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`p-5 rounded-2xl border ${item.border} hover-lift`}
                style={{ background: 'var(--color-bg-glass)' }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl border ${item.border} flex items-center justify-center`}
                    style={{ background: 'var(--color-border)' }}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs mb-0.5">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className={`font-semibold text-sm text-foreground hover:${item.color} transition-colors`}>
                        {item.value}
                      </a>
                    ) : (
                      <div className="font-semibold text-sm text-foreground">{item.value}</div>
                    )}
                    <div className="text-slate-500 text-xs mt-0.5">{item.sub}</div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* WhatsApp quick button */}
            <MagneticButton
              as="a"
              href="https://wa.me/919997954148?text=Hi!%20I%27m%20interested%20in%20getting%20a%20website%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp px-6 py-4 text-sm flex items-center justify-center gap-2.5 w-full group"
              whileHover="hover"
              whileTap={{ scale: 0.98, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
              variants={{ hover: { scale: 1.02 } }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp Now
            </MagneticButton>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-3xl p-7 md:p-9">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-12 relative"
                  >
                    {particles.map(p => (
                      <motion.div
                        key={p.id}
                        className="absolute left-1/2 top-1/2 pointer-events-none z-50"
                        initial={{ x: 0, y: 0, scale: 0, rotate: 0 }}
                        animate={{ x: p.x, y: p.y, scale: p.scale, rotate: p.rotation }}
                        transition={{ duration: p.duration, delay: p.delay, ease: 'easeOut' }}
                      >
                        {p.shape === 'circle' && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />}
                        {p.shape === 'square' && <div className="w-2 h-2" style={{ backgroundColor: p.color }} />}
                        {p.shape === 'triangle' && <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[8px] border-l-transparent border-r-transparent" style={{ borderBottomColor: p.color }} />}
                        {p.shape === 'star' && <div className="text-[10px]" style={{ color: p.color }}>★</div>}
                      </motion.div>
                    ))}
                    <div className="relative w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [1, 1.5, 1], opacity: [0, 0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                        className="absolute inset-0 bg-emerald-500/20 rounded-full"
                      />
                      <motion.svg
                        viewBox="0 0 24 24"
                        className="w-16 h-16 text-emerald-400 relative z-10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <motion.circle cx="12" cy="12" r="10" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} />
                        <motion.path d="M9 12l2 2 4-4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }} />
                      </motion.svg>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Message received! 🎉
                    </h3>
                    <p className="text-muted-foreground mb-2">We're opening WhatsApp so you can connect with us directly.</p>
                    <p className="text-slate-500 text-sm">We'll be in touch within a few hours.</p>
                    <button
                      onClick={() => { setStatus('idle'); setForm(initialForm); setTouched({}); }}
                      className="mt-6 btn-ghost px-6 py-2.5 text-sm"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <h3 className="text-xl font-bold text-foreground mb-6">
                      Tell us about your project
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="relative">
                        <input type="text" id="name" placeholder="Your Name *" value={form.name}
                          onChange={e => update('name', e.target.value)} onBlur={() => blur('name')}
                          className={inputClass('name')} />
                        <label htmlFor="name" className={labelClass}>Your Name *</label>
                        <ErrorMsg field="name" />
                      </div>
                      <div className="relative">
                        <input type="text" id="business" placeholder="Business Name" value={form.business}
                          onChange={e => update('business', e.target.value)}
                          className="peer w-full bg-transparent border border-border rounded-xl px-4 pt-6 pb-2 text-sm text-foreground placeholder-transparent transition-all duration-200 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/15 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] form-input-focus" />
                        <label htmlFor="business" className={labelClass}>Business Name</label>
                      </div>
                    </div>

                    <div className="mb-4">
                      <CustomSelect value={form.businessType} onChange={(v) => update('businessType', v)} options={businessTypes} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="relative">
                        <input type="tel" id="phone" placeholder="Phone Number *" value={form.phone}
                          onChange={e => update('phone', e.target.value)} onBlur={() => blur('phone')}
                          className={inputClass('phone')} />
                        <label htmlFor="phone" className={labelClass}>Phone Number *</label>
                        <ErrorMsg field="phone" />
                      </div>
                      <div className="relative">
                        <input type="email" id="email" placeholder="Email Address" value={form.email}
                          onChange={e => update('email', e.target.value)} onBlur={() => blur('email')}
                          className={inputClass('email')} />
                        <label htmlFor="email" className={labelClass}>Email Address</label>
                        <ErrorMsg field="email" />
                      </div>
                    </div>

                    <div className="mb-6 relative">
                      <textarea
                        id="message"
                        rows={4}
                        placeholder="Tell us about your project *"
                        value={form.message}
                        onChange={e => update('message', e.target.value)}
                        onBlur={() => blur('message')}
                        className={`${inputClass('message')} resize-none min-h-[120px]`}
                      />
                      <label htmlFor="message" className={labelClass}>Tell us about your project *</label>
                      <div className="absolute right-4 top-2 text-[10px] text-slate-500 pointer-events-none">
                        {form.message.length}/500
                      </div>
                      <ErrorMsg field="message" />
                    </div>

                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-red-400 text-sm"
                      >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        Something went wrong. Please try WhatsApp or email us directly.
                      </motion.div>
                    )}

                    <MagneticButton
                      type="submit"
                      disabled={status === 'submitting'}
                      className="btn-primary w-full py-4 text-[15px] flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden group"
                      whileHover={status !== 'submitting' ? "hover" : {}}
                      whileTap={status !== 'submitting' ? { scale: 0.98, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' } : {}}
                      variants={{ hover: { scale: 1.02 } }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    >
                      {status === 'submitting' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Opening WhatsApp...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message & Get a Free Quote
                        </>
                      )}
                    </MagneticButton>

                    <p className="text-slate-600 text-xs text-center mt-3">
                      We reply within a few hours · No spam · No pressure
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

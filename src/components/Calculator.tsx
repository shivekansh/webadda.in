import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ArrowRight, Zap, Sparkles, Crown } from 'lucide-react';

interface FormState {
  businessType: string;
  pages: string;
  needsBooking: boolean;
  needsOrdering: boolean;
  needsPayment: boolean;
  needsSEO: boolean;
  needsGBP: boolean;
  needsMonthly: boolean;
  needsDashboard: boolean;
}

const initialForm: FormState = {
  businessType: '',
  pages: '5',
  needsBooking: false,
  needsOrdering: false,
  needsPayment: false,
  needsSEO: false,
  needsGBP: false,
  needsMonthly: false,
  needsDashboard: false,
};

function getRecommendation(form: FormState) {
  const score = [
    form.needsBooking,
    form.needsOrdering,
    form.needsPayment,
    form.needsDashboard,
    parseInt(form.pages) > 5,
    form.needsSEO && form.needsGBP,
  ].filter(Boolean).length;

  const hasAdvanced = form.needsPayment || form.needsDashboard || form.needsOrdering;
  const hasMedium = form.needsBooking || form.needsSEO || parseInt(form.pages) > 5;

  if (hasAdvanced || score >= 4) {
    return {
      tier: 'Premium',
      icon: Crown,
      color: 'text-violet-400',
      border: 'border-violet-500/30',
      bg: 'from-violet-500/10 to-violet-600/5',
      range: '₹25,000 – ₹50,000+',
      monthly: form.needsMonthly ? '₹4,999+/month' : null,
      reason: 'Your requirements include advanced features like payment processing, admin dashboards, or complex ordering systems. These need a custom-built solution.',
      msg: "Hi! I used your website calculator and got a Premium recommendation. I'd love a custom quote.",
    };
  } else if (hasMedium || score >= 2) {
    return {
      tier: 'Growth',
      icon: Sparkles,
      color: 'text-emerald-400',
      border: 'border-emerald-500/30',
      bg: 'from-emerald-500/10 to-emerald-600/5',
      range: '₹10,000 – ₹20,000',
      monthly: form.needsMonthly ? '₹2,999/month' : null,
      reason: 'Your business needs a solid website with booking, SEO, and local visibility tools. The Growth plan is designed exactly for this.',
      msg: "Hi! I used your website calculator and got a Growth package recommendation. Can you share more details?",
    };
  } else {
    return {
      tier: 'Starter',
      icon: Zap,
      color: 'text-blue-400',
      border: 'border-blue-500/30',
      bg: 'from-blue-500/10 to-blue-600/5',
      range: '₹3,500 – ₹7,000',
      monthly: form.needsMonthly ? '₹999/month' : null,
      reason: 'A clean, professional website is all you need to get started. The Starter plan gets you online quickly and affordably.',
      msg: "Hi! I used your website calculator and got a Starter package recommendation. Can you tell me more?",
    };
  }
}

const businessTypes = [
  'Restaurant / Cafe', 'Clinic / Hospital', 'Salon / Spa', 'Gym / Fitness',
  'Coaching Center', 'Kirana / Retail', 'Hardware Store', 'Interior Designer',
  'Real Estate', 'Lawyer / CA Firm', 'Manufacturer', 'Other',
];

export default function CalculatorSection() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [result, setResult] = useState<ReturnType<typeof getRecommendation> | null>(null);
  const [step, setStep] = useState<'form' | 'result'>('form');

  const toggle = (key: keyof FormState) => {
    setForm(f => ({ ...f, [key]: !f[key as keyof typeof f] }));
  };

  const calculate = () => {
    if (!form.businessType) return;
    setResult(getRecommendation(form));
    setStep('result');
  };

  const reset = () => {
    setForm(initialForm);
    setResult(null);
    setStep('form');
  };

  const CheckToggle = ({
    label,
    checked,
    onChange,
    emoji
  }: { label: string; checked: boolean; onChange: () => void; emoji: string }) => (
    <motion.button
      type="button"
      onClick={onChange}
      whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
      className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-colors duration-200 ${
        checked
          ? 'border-blue-500/40 bg-blue-500/10 text-foreground'
          : 'border-border text-muted-foreground hover:border-blue-500/30 hover:bg-secondary hover:text-muted-foreground'
      }`}
    >
      <div className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
        checked ? 'bg-blue-500 border-blue-500' : 'border-slate-600'
      }`}>
        {checked && <svg viewBox="0 0 12 12" className="w-3 h-3 fill-white"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </div>
      <span className="text-sm font-medium">{emoji} {label}</span>
    </motion.button>
  );

  return (
    <section id="calculator" className="section-padding mesh-bg relative overflow-hidden">
      <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: 3px solid #3b82f6;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.4);
          transition: transform 0.1s;
        }
        input[type=range]::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        input[type=range]::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: 3px solid #3b82f6;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.4);
          transition: transform 0.1s;
        }
        input[type=range]::-moz-range-thumb:hover {
          transform: scale(1.15);
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      </div>

      <div className="max-w-3xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-4"
          >
            <span className="tag tag-blue flex items-center gap-1.5">
              <Calculator className="w-3 h-3" />
              Free Calculator
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tighter"
          >
            Find the right package
            <br />
            <span className="text-gradient-blue">for your business</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground"
          >
            Answer a few quick questions and we'll recommend the best plan for you.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="glass rounded-3xl p-7 md:p-10"
        >
          <AnimatePresence mode="wait">
            {step === 'form' ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Business type */}
                <div className="mb-7">
                  <label className="block text-foreground font-semibold mb-3">
                    What kind of business do you have?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {businessTypes.map((type) => (
                      <motion.button
                        key={type}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, businessType: type }))}
                        whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                        className={`py-2.5 px-3 rounded-xl text-sm font-medium border transition-colors duration-200 text-left ${
                          form.businessType === type
                            ? 'border-blue-500/50 bg-blue-500/15 text-foreground'
                            : 'border-border text-muted-foreground hover:border-blue-500/30 hover:bg-secondary hover:text-muted-foreground'
                        }`}
                      >
                        {type}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Pages */}
                <div className="mb-7">
                  <label className="block text-foreground font-semibold mb-3">
                    How many pages do you need? <span className="text-blue-400">{form.pages} pages</span>
                  </label>
                  <div className="relative pt-6 pb-2">
                    {/* Tooltip */}
                    <div 
                      className="absolute top-0 -ml-4 w-8 text-center bg-blue-500 text-white text-xs font-bold py-1 rounded shadow-lg transition-all duration-200 pointer-events-none"
                      style={{ left: `calc(${(parseInt(form.pages) - 1) / 19 * 100}% + ${11 - ((parseInt(form.pages) - 1) / 19 * 22)}px)` }}
                    >
                      {form.pages}
                      <div className="absolute top-full left-1/2 -mt-0.5 -ml-1 border-4 border-transparent border-t-blue-500"></div>
                    </div>
                    <input
                      type="range"
                      min="1" max="20" step="1"
                      value={form.pages}
                      onChange={e => setForm(f => ({ ...f, pages: e.target.value }))}
                      className="w-full h-2 bg-secondary border border-border rounded-lg appearance-none cursor-pointer outline-none"
                      style={{
                        background: `linear-gradient(to right, #3b82f6 ${(parseInt(form.pages) - 1) / 19 * 100}%, rgba(255,255,255,0.1) ${(parseInt(form.pages) - 1) / 19 * 100}%)`
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>1 page</span>
                    <span>10 pages</span>
                    <span>20+ pages</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <label className="block text-foreground font-semibold mb-3">
                    What features do you need?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <CheckToggle label="Appointment booking" checked={form.needsBooking} onChange={() => toggle('needsBooking')} emoji="📅" />
                    <CheckToggle label="Online ordering" checked={form.needsOrdering} onChange={() => toggle('needsOrdering')} emoji="🛒" />
                    <CheckToggle label="Payment integration" checked={form.needsPayment} onChange={() => toggle('needsPayment')} emoji="💳" />
                    <CheckToggle label="Admin dashboard" checked={form.needsDashboard} onChange={() => toggle('needsDashboard')} emoji="📊" />
                    <CheckToggle label="SEO optimization" checked={form.needsSEO} onChange={() => toggle('needsSEO')} emoji="🔍" />
                    <CheckToggle label="Google Business Profile" checked={form.needsGBP} onChange={() => toggle('needsGBP')} emoji="📍" />
                    <CheckToggle label="Monthly maintenance" checked={form.needsMonthly} onChange={() => toggle('needsMonthly')} emoji="🔄" />
                  </div>
                </div>

                <motion.button
                  onClick={calculate}
                  disabled={!form.businessType}
                  className={`w-full py-4 rounded-xl font-semibold text-[15px] flex items-center justify-center gap-2 transition-all duration-300 group ${
                    form.businessType
                      ? 'btn-primary cursor-pointer'
                      : 'bg-transparent border border-border text-slate-500 cursor-not-allowed border border-border'
                  }`}
                  whileHover={form.businessType ? "hover" : {}}
                  whileTap={form.businessType ? { scale: 0.98, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' } : {}}
                  variants={{ hover: { scale: 1.02 } }}
                >
                  Get My Recommendation
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {result && (
                  <div>
                    <div className="text-center mb-8">
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                        className={`inline-flex w-16 h-16 rounded-2xl border ${result.border} items-center justify-center bg-gradient-to-br ${result.bg} mb-4`}
                      >
                        <result.icon className={`w-8 h-8 ${result.color}`} />
                      </motion.div>
                      <p className="text-muted-foreground text-sm mb-2">Recommended for {form.businessType}</p>
                      <h3 className="text-3xl font-extrabold text-foreground mb-1">
                        {result.tier} Plan
                      </h3>
                      <div className={`text-2xl font-bold ${result.color} mb-4`}>{result.range}</div>
                      {result.monthly && (
                        <div className="tag tag-emerald mx-auto inline-flex">+ {result.monthly} care plan recommended</div>
                      )}
                    </div>

                    <div className={`p-5 rounded-2xl border ${result.border} bg-gradient-to-br ${result.bg} mb-6`}>
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Why we recommend this</div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{result.reason}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <motion.a
                        href={`https://wa.me/919997954148?text=${encodeURIComponent(result.msg)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-whatsapp py-3.5 text-sm flex items-center justify-center gap-2 flex-1 group"
                        whileHover="hover"
                        whileTap={{ scale: 0.98, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
                        variants={{ hover: { scale: 1.02 } }}
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Get This Quote on WhatsApp
                      </motion.a>
                      <motion.button
                        onClick={reset}
                        className="btn-ghost py-3.5 text-sm flex-shrink-0 px-6"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Recalculate
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

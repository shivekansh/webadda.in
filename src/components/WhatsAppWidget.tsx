import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const quickMessages = [
  "I need a website for my business 🏢",
  "I want a quote for a restaurant website 🍽️",
  "How long does it take to build a site? ⏱️",
  "What are your pricing plans? 💰",
];

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    const pulseTimer = setTimeout(() => setShowPulse(false), 8000);
    return () => { clearTimeout(timer); clearTimeout(pulseTimer); };
  }, []);

  useEffect(() => {
    if (open) {
      const typingTimer = setTimeout(() => setIsTyping(false), 1500);
      return () => clearTimeout(typingTimer);
    } else {
      setIsTyping(true);
    }
  }, [open]);

  if (!visible) return null;

  const sendMessage = (msg: string) => {
    window.open(`https://wa.me/919997954148?text=${encodeURIComponent(msg)}`, '_blank');
    setOpen(false);
  };

  const getTimeAwareGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Popup panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="w-72 rounded-2xl overflow-hidden shadow-2xl shadow-black/40 origin-bottom-right"
            style={{ background: 'var(--color-bg-glass)', border: '1px solid rgba(34, 197, 94, 0.2)' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-500 px-4 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <span className="text-foreground text-lg">👋</span>
              </div>
              <div className="flex-1">
                <div className="text-foreground font-semibold text-sm">webadda.in</div>
                <div className="flex items-center gap-1.5 text-green-100 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                  Typically replies in minutes
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-foreground/60 hover:text-foreground transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat bubble */}
            <div className="px-4 py-4">
              <div className="bg-white/8 rounded-2xl rounded-tl-sm px-3.5 py-3 mb-4 min-h-[52px] flex items-center">
                {isTyping ? (
                  <div className="flex items-center gap-1.5 h-5 px-1">
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-slate-400" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-slate-400" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-slate-400" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                  </div>
                ) : (
                  <motion.p 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
                    className="text-muted-foreground text-sm leading-relaxed"
                  >
                    {getTimeAwareGreeting()}! 👋 How can we help you today? Send us a quick message and we'll get back to you right away.
                  </motion.p>
                )}
              </div>

              {/* Quick messages */}
              <div className="space-y-2">
                <p className="text-slate-500 text-xs uppercase tracking-wider font-medium">Quick messages</p>
                {quickMessages.map((msg, i) => (
                  <motion.button
                    key={i}
                    onClick={() => sendMessage(msg)}
                    className="relative w-full text-left px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground transition-all duration-300 border border-border hover:border-green-500/30 overflow-hidden group block"
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 block transition-transform duration-300 group-hover:translate-x-1">{msg}</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input area */}
            <div className="px-4 pb-4">
              <motion.a
                href="https://wa.me/919997954148?text=Hi!%20I%27m%20interested%20in%20learning%20about%20your%20website%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-green-600 to-green-500 text-foreground py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Open WhatsApp
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <div className="relative">
        {/* Pulse rings */}
        {showPulse && !open && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full bg-green-500/25"
              animate={{ scale: [1, 1.6, 1.6], opacity: [0.6, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-green-500/15"
              animate={{ scale: [1, 1.9, 1.9], opacity: [0.4, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
            />
          </>
        )}

        {/* Notification badge */}
        {!open && visible && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-background z-20"
          />
        )}

        <motion.button
          onClick={() => setOpen(!open)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-2xl shadow-green-500/40 text-foreground"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label={open ? 'Close WhatsApp chat' : 'Open WhatsApp chat'}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}

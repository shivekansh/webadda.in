import { Code2, PenTool, LayoutTemplate, Database, MonitorPlay, Smartphone, Cloud, Box, Compass, Cpu, CreditCard } from 'lucide-react';

const technologies = [
  { name: 'Next.js', icon: MonitorPlay },
  { name: 'React', icon: Code2 },
  { name: 'WordPress', icon: LayoutTemplate },
  { name: 'Tailwind CSS', icon: PenTool },
  { name: 'Razorpay', icon: CreditCard },
  { name: 'Vercel', icon: Cloud },
  { name: 'WhatsApp API', icon: Smartphone },
  { name: 'Google Maps', icon: Compass },
  { name: 'MongoDB', icon: Database },
  { name: 'Prisma', icon: Box },
  { name: 'Stripe', icon: CreditCard },
  { name: 'TypeScript', icon: Cpu },
];

const doubled = [...technologies, ...technologies];

export default function TrustBar() {
  return (
    <div className="relative py-8 overflow-hidden border-y border-white/5"
      style={{ background: 'var(--color-bg-glass)' }}>
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, var(--color-bg-primary) 0%, transparent 100%)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(-90deg, var(--color-bg-primary) 0%, transparent 100%)' }} />

      <style>{`
        .marquee-track {
          display: flex;
          gap: 1.5rem;
          width: fit-content;
          animation: marquee 35s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          to {
            transform: translateX(calc(-50% - 0.75rem));
          }
        }
      `}</style>
      <div className="marquee-track">
        {doubled.map((tech, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex items-center gap-2.5 px-5 py-2.5 rounded-xl border border-border bg-white/3 transition-colors hover:bg-white/10 hover:border-border"
          >
            <tech.icon className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground text-sm font-medium whitespace-nowrap">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

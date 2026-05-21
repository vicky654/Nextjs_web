'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Users, TrendingUp, Award, Calendar } from 'lucide-react';

const STATS = [
  { icon: Users, value: 500, suffix: '+', label: 'Clients Served', desc: 'Organizations protected' },
  { icon: TrendingUp, value: 98, suffix: '%', label: 'Success Rate', desc: 'Compliance achieved' },
  { icon: Award, value: 50, suffix: '+', label: 'Expert Consultants', desc: 'Dedicated specialists' },
  { icon: Calendar, value: 10, suffix: '+', label: 'Years Experience', desc: 'Industry expertise' },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.5 });

  useEffect(() => {
    if (!inView) { setCount(0); return; }
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); } else { setCount(Math.floor(current)); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatsSection() {
  return (
    <section style={{ background: 'var(--hp-dark-surface)', padding: '5rem 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {STATS.map(({ icon: Icon, value, suffix, label, desc }, i) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              style={{ background: 'var(--hp-glass)', border: '1px solid var(--hp-border)', borderRadius: 'var(--hp-radius)', padding: '2rem', textAlign: 'center', transition: 'all 0.3s' }}
              whileHover={{ y: -4, borderColor: 'var(--hp-border-accent)' }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                <Icon size={22} style={{ color: '#60a5fa' }} />
              </div>
              <div style={{ fontSize: '2.75rem', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 6, letterSpacing: '-0.02em' }}>
                <CountUp target={value} suffix={suffix} />
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#e2e8f0', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--hp-text-muted)' }}>{desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

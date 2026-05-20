'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  { q: 'What is the Digital Personal Data Protection (DPDP) Act?', a: 'The DPDP Act is India\'s comprehensive data protection legislation that governs how organizations collect, process, and store personal data of Indian citizens. It establishes rights for data principals and obligations for data fiduciaries.' },
  { q: 'Does GDPR apply to Indian companies?', a: 'Yes. If your company processes personal data of EU/EEA residents — even if your company is based in India — you must comply with GDPR. This applies to companies offering goods/services to EU residents or monitoring their behavior.' },
  { q: 'How long does DPDP compliance implementation take?', a: 'For most mid-sized organizations, full DPDP compliance takes 60–120 days. Our accelerated programs can achieve core compliance in as little as 45 days, depending on your current data maturity level.' },
  { q: 'What are the penalties for non-compliance with DPDP?', a: 'The DPDP Act prescribes penalties up to ₹250 crore for significant data breaches and up to ₹500 crore for systemic non-compliance. Beyond fines, companies risk reputational damage and loss of customer trust.' },
  { q: 'What is a Data Protection Officer (DPO) and do we need one?', a: 'A DPO is a designated expert responsible for overseeing data protection strategy and compliance. Under DPDP, Significant Data Fiduciaries are required to appoint a DPO. We offer both interim DPO services and help identify and train permanent DPOs.' },
  { q: 'Can you help with both GDPR and DPDP compliance simultaneously?', a: 'Absolutely. We specialize in harmonized compliance programs that address both GDPR and DPDP requirements simultaneously, minimizing duplication of effort and ensuring consistent data protection standards across your organization.' },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section style={{ background: 'var(--hp-dark-surface)', padding: 'var(--hp-section-gap) 0' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="hp-section-badge">FAQ</div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: 'var(--hp-text-muted)', marginTop: '0.75rem' }}>
            Everything you need to know about DPDP Act and GDPR compliance.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {FAQS.map((faq, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              style={{ border: `1px solid ${open === i ? 'rgba(59,130,246,0.4)' : 'var(--hp-border)'}`, borderRadius: 'var(--hp-radius-sm)', overflow: 'hidden', background: open === i ? 'rgba(59,130,246,0.05)' : 'var(--hp-glass)', transition: 'border-color 0.2s, background 0.2s' }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 12 }}>
                <span style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.95rem', flex: 1 }}>{faq.q}</span>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: open === i ? '#3b82f6' : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s' }}>
                  {open === i ? <Minus size={14} style={{ color: '#fff' }} /> : <Plus size={14} style={{ color: '#94a3b8' }} />}
                </div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}>
                    <div style={{ padding: '0 1.5rem 1.25rem', color: 'var(--hp-text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

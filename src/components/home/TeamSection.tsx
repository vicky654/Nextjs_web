'use client';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import { useState } from 'react';

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  image: string;
  bio: string;
  social_links: { linkedin?: string; twitter?: string; email?: string };
  expertise: string[];
}

interface TeamSectionProps {
  members: TeamMember[];
}

export default function TeamSection({ members }: TeamSectionProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  if (members.length === 0) return null;

  return (
    <section style={{ background: 'var(--hp-dark)', padding: 'var(--hp-section-gap) 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="hp-section-badge">Our Team</div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#fff', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Meet the <span className="hp-gradient-text">Experts</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--hp-text-muted)', maxWidth: 520, margin: '0 auto' }}>
            Our team of certified privacy professionals brings decades of combined experience to every engagement.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {members.map((member, i) => {
            const hasSocial = Boolean(member.social_links.linkedin || member.social_links.twitter || member.social_links.email);
            return (
              <motion.div key={member.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{
                  opacity: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
                  y: { type: 'spring', stiffness: 350, damping: 22 },
                  scale: { type: 'spring', stiffness: 350, damping: 22 },
                }}
                onMouseEnter={() => setHovered(member.id)}
                onMouseLeave={() => setHovered(null)}
                className="hp-glass-card"
                style={{ padding: '1.75rem', textAlign: 'center', cursor: 'default' }}>

                {/* Avatar */}
                <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
                  {member.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={member.image} alt={member.name}
                      style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(59,130,246,0.3)', margin: '0 auto', display: 'block' }} />
                  ) : (
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #1e3a5f, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: '1.75rem', fontWeight: 700, color: '#fff' }}>
                      {member.name.charAt(0)}
                    </div>
                  )}

                  {/* Social icons overlay */}
                  <motion.div animate={{ opacity: hovered === member.id ? 1 : 0, y: hovered === member.id ? 0 : 8 }}
                    transition={{ duration: 0.2 }}
                    style={{ position: 'absolute', bottom: -16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
                    {member.social_links.linkedin && (
                      <a href={member.social_links.linkedin} target="_blank" rel="noopener noreferrer"
                        style={{ width: 28, height: 28, borderRadius: 8, background: '#0a66c2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Linkedin size={14} style={{ color: '#fff' }} />
                      </a>
                    )}
                    {member.social_links.twitter && (
                      <a href={member.social_links.twitter} target="_blank" rel="noopener noreferrer"
                        style={{ width: 28, height: 28, borderRadius: 8, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Twitter size={14} style={{ color: '#fff' }} />
                      </a>
                    )}
                    {member.social_links.email && (
                      <a href={`mailto:${member.social_links.email}`}
                        style={{ width: 28, height: 28, borderRadius: 8, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Mail size={14} style={{ color: '#fff' }} />
                      </a>
                    )}
                  </motion.div>
                </div>

                <div style={{ marginTop: hovered === member.id && hasSocial ? 24 : 0, transition: 'margin 0.2s' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#e2e8f0', marginBottom: 4 }}>{member.name}</h3>
                  <p style={{ fontSize: '0.8rem', color: '#60a5fa', marginBottom: '0.875rem', fontWeight: 500 }}>{member.designation}</p>
                  {member.bio && <p style={{ fontSize: '0.78rem', color: 'var(--hp-text-muted)', lineHeight: 1.55, marginBottom: '0.875rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{member.bio}</p>}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
                    {member.expertise.slice(0, 3).map((tag) => (
                      <span key={tag} style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 100, padding: '2px 8px', fontSize: '0.7rem', color: '#94a3b8' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

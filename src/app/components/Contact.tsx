import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Mail, Linkedin, Github, Heart, Copy, Check } from 'lucide-react';
import { ContactBg } from './SectionBackgrounds';
import { useState } from 'react';
import { useSound } from './SoundProvider';

export function Contact() {
  const { playSound } = useSound();
  const [copied, setCopied] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const copyEmail = async () => {
    const email = 'bhatnagar018@gmail.com';

    try {
      await navigator.clipboard.writeText(email);
      playSound('success');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.cssText = 'position:fixed;left:-999999px;top:-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.body.removeChild(textArea);
        playSound('success');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        alert(`Copy this email: ${email}`);
      }
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden pt-20 pb-48 px-6"
      style={{ background: 'var(--bg-surface)' }}
    >
      <ContactBg />
      <div className="resume-container max-w-4xl xl:max-w-5xl 2xl:max-w-6xl 3xl:max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <h2
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            className="fluid-section-h2 font-bold tracking-wide mb-3"
          >
            <span style={{ color: 'var(--accent-amber)' }}>08.</span> LET'S CONNECT
          </h2>

          <div className="flex items-center gap-2 mb-4">
            <span
              className="relative flex h-2.5 w-2.5"
              aria-hidden="true"
            >
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: 'var(--success-green)' }}
              />
              <span
                className="relative inline-flex rounded-full h-2.5 w-2.5"
                style={{ background: 'var(--success-green)' }}
              />
            </span>
            <span
              className="tracking-wider"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--success-green)',
                fontSize: '0.8125rem',
                letterSpacing: '0.08em',
              }}
            >
              AVAILABLE FOR NEW ENGAGEMENTS
            </span>
          </div>

          <p
            style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)' }}
            className="text-base md:text-lg max-w-2xl leading-relaxed"
          >
            Open to full-time architect roles, fractional / consulting engagements, and technical advisory work — especially for teams scaling frontend delivery with AI in the loop.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <ContactLink icon={<Mail size={18} />} label="Email Me" href="mailto:bhatnagar018@gmail.com" />
          <ContactLink icon={<Linkedin size={18} />} label="LinkedIn" href="https://www.linkedin.com/in/bhatnagar-ankur" />
          <ContactLink icon={<Github size={18} />} label="GitHub" href="https://github.com/bhatnagar-ankur" />

          <button
            onClick={copyEmail}
            className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all hover:scale-105"
            style={{
              borderColor: 'var(--accent-cyan)',
              background: 'rgba(0, 200, 255, 0.08)',
              color: 'var(--accent-cyan)',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.875rem'
            }}
          >
            {copied ? (
              <>
                <Check size={16} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copy Email</span>
              </>
            )}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="pt-8 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderColor: 'var(--bg-border)' }}
        >
          <div>
            <p
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
              className="text-lg font-bold tracking-wider"
            >
              ANKUR BHATNAGAR
            </p>
            <p
              style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)' }}
              className="text-sm"
            >
              Technical Architect & UI/UX Practice Head
            </p>
          </div>
          <div className="text-right">
            <p
              style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontSize: '0.8125rem' }}
              className="flex items-center gap-1.5"
            >
              Made with <Heart size={14} style={{ color: 'var(--accent-amber)' }} fill="var(--accent-amber)" /> · Open to opportunities
            </p>
            <p
              style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-muted)', fontSize: '0.75rem', opacity: 0.5 }}
              className="mt-1"
            >
              © 2026 Ankur Bhatnagar
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactLink({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  const { playSound } = useSound();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => playSound('click')}
      onMouseEnter={() => playSound('hover')}
      className="group flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all hover:scale-105"
      style={{
        borderColor: 'var(--bg-border)',
        background: 'var(--bg-deep)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-ui)',
        fontSize: '0.875rem'
      }}
    >
      <span style={{ color: 'var(--accent-cyan)' }} className="group-hover:drop-shadow-[0_0_8px_rgba(0,200,255,0.8)] transition-all">
        {icon}
      </span>
      <span>{label}</span>
    </a>
  );
}

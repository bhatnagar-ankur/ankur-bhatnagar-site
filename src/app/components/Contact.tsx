import { motion } from 'motion/react';
import { Mail, Linkedin, Github, Phone, Heart, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('bhatnagar018@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 min-h-screen flex flex-col justify-center"
      style={{ background: 'var(--bg-deep)' }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--text-primary)'
            }}
            className="text-4xl md:text-5xl font-bold mb-6 tracking-wide"
          >
            <span style={{ color: 'var(--accent-amber)' }}>07.</span> LET'S CONNECT
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--text-muted)'
            }}
            className="text-lg mb-12 max-w-2xl mx-auto"
          >
            Open to new opportunities and collaborations. Feel free to reach out for technical discussions, consulting, or full-time roles.
          </p>

          {/* Contact Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <ContactLink
              icon={<Mail size={20} />}
              label="Email Me"
              href="mailto:bhatnagar018@gmail.com"
            />
            <ContactLink
              icon={<Phone size={20} />}
              label="Call Me"
              href="tel:+917259901002"
            />
            <ContactLink
              icon={<Linkedin size={20} />}
              label="LinkedIn"
              href="https://www.linkedin.com/in/bhatnagar-ankur"
            />
            <ContactLink
              icon={<Github size={20} />}
              label="GitHub"
              href="https://github.com/bhatnagar-ankur"
            />
          </div>

          {/* Copy Email Button */}
          <button
            onClick={copyEmail}
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-lg border transition-all hover:scale-105"
            style={{
              borderColor: 'var(--accent-cyan)',
              background: 'rgba(0, 200, 255, 0.1)',
              color: 'var(--accent-cyan)',
              fontFamily: 'var(--font-mono)'
            }}
          >
            {copied ? (
              <>
                <Check size={20} />
                <span>Email Copied!</span>
              </>
            ) : (
              <>
                <Copy size={20} />
                <span>Copy Email Address</span>
              </>
            )}
          </button>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-24 pt-12 border-t text-center"
        style={{ borderColor: 'var(--bg-border)' }}
      >
        <p
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--text-primary)'
          }}
          className="text-2xl font-bold mb-2"
        >
          ANKUR BHATNAGAR
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--text-muted)'
          }}
          className="text-sm mb-6"
        >
          Technical Architect & UI/UX Practice Head
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--text-muted)',
            fontSize: '0.875rem'
          }}
          className="flex items-center justify-center gap-2"
        >
          Made with <Heart size={16} style={{ color: 'var(--accent-amber)' }} fill="var(--accent-amber)" /> — Open to opportunities
        </p>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--bg-border)',
            fontSize: '0.75rem'
          }}
          className="mt-4"
        >
          © 2026 Ankur Bhatnagar. All rights reserved.
        </p>
      </motion.div>
    </section>
  );
}

function ContactLink({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 px-6 py-3 rounded-lg border transition-all hover:scale-105"
      style={{
        borderColor: 'var(--bg-border)',
        background: 'var(--bg-surface)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-body)'
      }}
    >
      <span style={{ color: 'var(--accent-cyan)' }} className="transition-colors group-hover:drop-shadow-[0_0_8px_rgba(0,200,255,0.8)]">
        {icon}
      </span>
      <span>{label}</span>
    </a>
  );
}
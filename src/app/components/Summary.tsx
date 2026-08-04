import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { yearsOfExperience } from "../lib/constants";
import { SummaryBg } from './SectionBackgrounds';
import {
  Triangle,
  Atom,
  Zap,
  Cloud,
  FileCode,
  Code,
  Sparkles,
  Radio,
  Server,
  FileText,
  Palette,
  Brush,
  Users,
  Layout,
  Building,
} from "lucide-react";

export function Summary() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section
      id="summary"
      ref={ref}
      className="relative overflow-hidden py-24 px-6"
      style={{ background: "var(--bg-deep)" }}
    >
      <SummaryBg />
      <div className="resume-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Section Header */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
            }}
            className="fluid-section-h2 font-bold mb-12 tracking-wide"
          >
            <span style={{ color: "var(--accent-amber)" }}>
              01.
            </span>{" "}
            PROFESSIONAL SUMMARY
          </h2>

          {/* Summary Quote */}
          <blockquote
            className="relative pl-8 py-8 mb-12 rounded-2xl border-l-4"
            style={{
              borderColor: "var(--accent-cyan)",
              background: "var(--glass-bg)",
              backdropFilter: "var(--glass-filter)",
              WebkitBackdropFilter: "var(--glass-filter)",
              boxShadow: "var(--glass-shadow)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--text-primary)",
              }}
              className="text-xl md:text-2xl leading-relaxed"
            >
              Technical Architect and UI/UX Practice Head. {yearsOfExperience}+ years shipping enterprise-scale frontend systems on Angular, React &amp; Azure — leading a 20+ engineer team and embedding AI into every stage of the design-to-code pipeline. Award-recognized for technical excellence and craft.
            </p>
          </blockquote>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12 mb-12">
            <StatCard
              number={yearsOfExperience}
              suffix="+"
              label="Years Experience"
              inView={inView}
              delay={0}
            />
            <StatCard
              number={20}
              suffix="+"
              label="Designers & Developers Led"
              inView={inView}
              delay={0.2}
            />
            <StatCard
              number={10}
              suffix="+"
              label="Enterprise Apps"
              inView={inView}
              delay={0.4}
            />
          </div>

          {/* Tech Tag Cloud */}
          <div className="flex flex-wrap gap-3">
            {[
              { name: "Angular", icon: Triangle },
              { name: "React", icon: Atom },
              { name: "NextJS", icon: Zap },
              { name: "Azure", icon: Cloud },
              { name: "TypeScript", icon: FileCode },
              { name: "JavaScript", icon: Code },
              { name: "AI/GenAI", icon: Sparkles },
              { name: "SignalR", icon: Radio },
              { name: "ASP.Net", icon: Server },
              { name: "HTML5", icon: FileText },
              { name: "CSS3", icon: Palette },
              { name: "SCSS", icon: Brush },
              { name: "Team Leadership", icon: Users },
              { name: "UI/UX Design", icon: Layout },
              { name: "Architecture", icon: Building },
            ].map((tech, index) => {
              const Icon = tech.icon;
              const highlightDelay = 2 + index * 0.15;
              return (
                <motion.span
                  key={tech.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.6 + index * 0.05,
                    ease: "easeOut",
                  }}
                  className="px-4 py-2 rounded-full border flex items-center gap-2 relative overflow-hidden"
                  style={{
                    borderColor: "var(--glass-border)",
                    background: "var(--glass-bg)",
                    backdropFilter: "var(--glass-filter)",
                    WebkitBackdropFilter: "var(--glass-filter)",
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.875rem",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 0.15, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: highlightDelay,
                      repeat: Infinity,
                      repeatDelay: 8,
                      ease: "easeInOut",
                    }}
                    style={{
                      background:
                        "radial-gradient(circle, rgba(var(--accent-cyan-rgb), 0.3) 0%, transparent 70%)",
                    }}
                  />
                  <motion.div
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      delay: highlightDelay,
                      repeat: Infinity,
                      repeatDelay: 8,
                      ease: "easeInOut",
                    }}
                  >
                    <Icon size={16} style={{ color: "var(--accent-cyan)" }} />
                  </motion.div>
                  {tech.name}
                </motion.span>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatCard({
  number,
  suffix,
  label,
  inView,
  delay,
}: {
  number: number;
  suffix: string;
  label: string;
  inView: boolean;
  delay: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let current = 0;
    const increment = number / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= number) {
        setCount(number);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [inView, number]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="p-8 rounded-2xl border text-center"
      style={{
        borderColor: "var(--glass-border)",
        background: "var(--glass-bg)",
        backdropFilter: "var(--glass-filter)",
        WebkitBackdropFilter: "var(--glass-filter)",
        boxShadow: "var(--glass-shadow)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--accent-cyan)",
        }}
        className="text-5xl font-bold mb-2"
      >
        <span className="screen-counter">{count}</span>
        <span className="print-counter">{number}</span>
        {suffix}
      </div>
      <div
        style={{
          fontFamily: "var(--font-ui)",
          color: "var(--text-muted)",
        }}
        className="text-sm uppercase tracking-wider"
      >
        {label}
      </div>
    </motion.div>
  );
}

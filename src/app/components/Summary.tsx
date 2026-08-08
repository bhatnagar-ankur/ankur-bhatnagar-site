import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
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
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

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

          {/* Tech Tag Cloud — grouped by domain */}
          <div className="flex flex-col gap-5">
            {[
              {
                label: "Frontend",
                color: "cyan" as const,
                tags: [
                  { name: "Angular", icon: Triangle },
                  { name: "React", icon: Atom },
                  { name: "NextJS", icon: Zap },
                  { name: "TypeScript", icon: FileCode },
                  { name: "JavaScript", icon: Code },
                  { name: "HTML5", icon: FileText },
                  { name: "CSS3", icon: Palette },
                  { name: "SCSS", icon: Brush },
                ],
              },
              {
                label: "Backend & Cloud",
                color: "amber" as const,
                tags: [
                  { name: "Azure", icon: Cloud },
                  { name: "ASP.Net", icon: Server },
                  { name: "SignalR", icon: Radio },
                  { name: "AI/GenAI", icon: Sparkles },
                ],
              },
              {
                label: "Practice",
                color: "green" as const,
                tags: [
                  { name: "Team Leadership", icon: Users },
                  { name: "UI/UX Design", icon: Layout },
                  { name: "Architecture", icon: Building },
                ],
              },
            ].map((group, gi) => {
              const accentVar =
                group.color === "cyan"
                  ? "var(--accent-cyan)"
                  : group.color === "amber"
                    ? "var(--accent-amber)"
                    : "var(--success-green)";
              const accentRgbVar =
                group.color === "cyan"
                  ? "var(--accent-cyan-rgb)"
                  : group.color === "amber"
                    ? "var(--accent-amber-rgb)"
                    : "var(--success-green-rgb)";

              return (
                <div key={group.label}>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + gi * 0.15 }}
                    className="mb-2.5 tracking-widest uppercase"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      color: accentVar,
                      letterSpacing: "0.12em",
                    }}
                  >
                    {group.label}
                  </motion.p>
                  <div className="flex flex-wrap gap-2.5">
                    {group.tags.map((tech, index) => {
                      const globalIndex = gi * 8 + index;
                      const Icon = tech.icon;
                      const highlightDelay = 2 + globalIndex * 0.15;
                      return (
                        <motion.span
                          key={tech.name}
                          initial={{ opacity: 0, y: 8 }}
                          animate={inView ? { opacity: 1, y: 0 } : {}}
                          whileHover={{ scale: 1.07, y: -2, boxShadow: `0 0 14px rgba(${accentRgbVar}, 0.4)` }}
                          transition={{
                            duration: 0.45,
                            delay: 0.65 + globalIndex * 0.04,
                            ease: "easeOut",
                          }}
                          className="px-3.5 py-1.5 rounded-full border flex items-center gap-1.5 relative overflow-hidden"
                          style={{
                            borderColor: `rgba(${accentRgbVar}, 0.2)`,
                            background: `rgba(${accentRgbVar}, 0.06)`,
                            color: "var(--text-primary)",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.8125rem",
                            cursor: "pointer",
                          }}
                        >
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.15, 0] }}
                            transition={{
                              duration: 1.5,
                              delay: highlightDelay,
                              repeat: Infinity,
                              repeatDelay: 8,
                              ease: "easeInOut",
                            }}
                            style={{
                              background: `radial-gradient(circle, rgba(${accentRgbVar}, 0.3) 0%, transparent 70%)`,
                            }}
                          />
                          <motion.div
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{
                              duration: 2,
                              delay: highlightDelay,
                              repeat: Infinity,
                              repeatDelay: 8,
                              ease: "easeInOut",
                            }}
                          >
                            <Icon size={14} style={{ color: accentVar }} />
                          </motion.div>
                          {tech.name}
                        </motion.span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


import { motion } from 'motion/react';
import { useTheme } from './ThemeProvider';

const W = 1440;
const H = 900;
const CX = 720;
const CY = 450;

type Pt = [number, number];

// Peripheral constellation nodes — intentionally clustered in the wings,
// away from the centered hero content
const NODES: Pt[] = [
  // Left wing
  [58,  172], [125, 305], [76,  475], [198, 608],
  [305, 195], [355, 425], [246, 725], [86,  782],
  // Right wing
  [1382, 196], [1338, 378], [1202, 498], [1142, 212],
  [1088, 422], [1322, 702], [1108, 762], [1438, 585],
  // Top band
  [566,  56], [872,  48], [484, 136], [968, 126], [720,  26],
  // Bottom band
  [525, 838], [730, 872], [942, 852], [380, 878], [1082, 870],
];

type Edge = [number, number];
const EDGES: Edge[] = [
  // Left wing
  [0,1],[1,2],[2,3],[0,4],[1,4],[4,5],[2,5],[3,5],[2,6],[3,6],[6,7],[1,7],
  // Right wing
  [8,9],[9,10],[10,11],[8,11],[11,12],[9,12],[10,13],[13,14],[14,15],[9,15],
  // Top band
  [16,18],[17,19],[16,20],[17,20],[18,20],
  // Bottom band
  [21,22],[22,23],[21,24],[23,25],
];

// PCB-style L-path circuit traces from each corner inward
const CIRCUITS = [
  'M 0 92 L 152 92 L 152 52 L 242 52 L 242 148 L 188 148 L 188 232 L 288 232 L 288 188 L 378 188',
  'M 1440 92 L 1288 92 L 1288 52 L 1198 52 L 1198 148 L 1252 148 L 1252 228 L 1152 228 L 1152 188 L 1062 188',
  'M 0 808 L 172 808 L 172 862 L 268 862 L 268 772 L 348 772 L 348 838 L 428 838',
  'M 1440 808 L 1268 808 L 1268 862 L 1172 862 L 1172 772 L 1092 772 L 1092 838 L 1012 838',
] as const;

// Junction dots at each bend in the circuit paths
const JUNCTIONS: Pt[][] = [
  [[152,92],[152,52],[242,52],[242,148],[188,148],[188,232],[288,232],[288,188]],
  [[1288,92],[1288,52],[1198,52],[1198,148],[1252,148],[1252,228],[1152,228],[1152,188]],
  [[172,808],[172,862],[268,862],[268,772],[348,772],[348,838]],
  [[1268,808],[1268,862],[1172,862],[1172,772],[1092,772],[1092,838]],
];

const PULSE_DELAYS = [0, 1.4, 2.8] as const;

// Scale factor: expand from r=158 to fill ~530px radius
const PULSE_SCALE = 3.35;

export function HeroBackground() {
  const { theme, displayMode } = useTheme();
  const isDark = theme === 'dark';
  const isSunlight = displayMode === 'sunlight';

  // Master opacity gate — sunlight mode reduces distraction
  const masterOpacity = isSunlight ? 0.18 : isDark ? 0.72 : 0.5;

  const centerGlowOpacity0 = isDark ? 0.2 : 0.1;
  const centerGlowOpacity50 = isDark ? 0.07 : 0.03;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ opacity: masterOpacity }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Central cyan bloom — large, soft, behind profile */}
          <radialGradient id="hbg-cyan-bloom" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="var(--accent-cyan)"  stopOpacity={centerGlowOpacity0} />
            <stop offset="50%"  stopColor="var(--accent-cyan)"  stopOpacity={centerGlowOpacity50} />
            <stop offset="100%" stopColor="var(--accent-cyan)"  stopOpacity="0" />
          </radialGradient>

          {/* Amber accent blobs — create asymmetric warmth */}
          <radialGradient id="hbg-amber-bloom" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="var(--accent-amber)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--accent-amber)" stopOpacity="0" />
          </radialGradient>

          {/* Glow filter for constellation nodes */}
          <filter id="hbg-dot-glow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Glow filter for animated data-flow trace */}
          <filter id="hbg-trace-glow" x="-30%" y="-150%" width="160%" height="400%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Ambient glows ──────────────────────────────────────────── */}
        {/* Central bloom — warm, breathing light behind the profile */}
        <ellipse cx={CX}   cy={CY}  rx={390} ry={310} fill="url(#hbg-cyan-bloom)" />
        {/* Amber accent — upper-right, editorial asymmetry */}
        <ellipse cx={1065} cy={200} rx={202} ry={162} fill="url(#hbg-amber-bloom)" />
        {/* Amber accent — lower-left, balancing the composition */}
        <ellipse cx={388}  cy={708} rx={182} ry={144} fill="url(#hbg-amber-bloom)" />

        {/* ── Static depth rings ─────────────────────────────────────── */}
        {/* Inner ring — solid, clear */}
        <circle cx={CX} cy={CY} r={218} fill="none"
          stroke="var(--accent-cyan)" strokeWidth={0.8} strokeOpacity={0.22} />
        {/* Mid ring — dashed, subtler */}
        <circle cx={CX} cy={CY} r={360} fill="none"
          stroke="var(--accent-cyan)" strokeWidth={0.55} strokeOpacity={0.13}
          strokeDasharray="6 18" />
        {/* Outer ring — barely visible, gives depth */}
        <circle cx={CX} cy={CY} r={508} fill="none"
          stroke="var(--accent-cyan)" strokeWidth={0.4} strokeOpacity={0.07}
          strokeDasharray="2 14" />

        {/* ── Breathing pulse rings — expand from center & fade out ── */}
        {PULSE_DELAYS.map((delay, i) => (
          <motion.circle
            key={i}
            cx={CX}
            cy={CY}
            r={158}
            fill="none"
            stroke="var(--accent-cyan)"
            strokeWidth={1.2}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: PULSE_SCALE, opacity: 0 }}
            transition={{
              duration: 4.2,
              delay,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* ── Constellation edges — thin connecting lines ────────────── */}
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a][0]} y1={NODES[a][1]}
            x2={NODES[b][0]} y2={NODES[b][1]}
            stroke="var(--accent-cyan)"
            strokeWidth={0.65}
            strokeOpacity={0.28}
          />
        ))}

        {/* ── Constellation nodes — dual-layer for glow effect ──────── */}
        {NODES.map(([x, y], i) => (
          <g key={i} filter="url(#hbg-dot-glow)">
            {/* Outer bloom */}
            <circle cx={x} cy={y} r={3}   fill="var(--accent-cyan)" opacity={0.42} />
            {/* Bright core */}
            <circle cx={x} cy={y} r={1.2} fill="var(--accent-cyan)" opacity={1} />
          </g>
        ))}

        {/* ── PCB circuit traces ─────────────────────────────────────── */}
        {CIRCUITS.map((d, i) => (
          <g key={i}>
            {/* Ghost trace — always visible at low opacity */}
            <path
              d={d}
              fill="none"
              stroke="var(--accent-cyan)"
              strokeWidth={0.9}
              strokeOpacity={0.32}
              strokeLinecap="square"
            />

            {/* Animated data-flow highlight — travels the path */}
            <motion.path
              d={d}
              fill="none"
              stroke="var(--accent-cyan)"
              strokeWidth={1.8}
              strokeLinecap="square"
              filter="url(#hbg-trace-glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1],
                opacity: [0, 0.9, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 0.85 + 0.5,
                repeat: Infinity,
                repeatDelay: 3.5,
                ease: 'easeInOut',
                times: [0, 0.72, 1],
              }}
            />

            {/* Junction solder dots at each path bend */}
            {JUNCTIONS[i].map(([jx, jy], ji) => (
              <circle
                key={ji}
                cx={jx} cy={jy} r={2.2}
                fill="var(--accent-cyan)"
                opacity={0.55}
              />
            ))}
          </g>
        ))}

        {/* ── Axis whiskers — very subtle cross through center ───────── */}
        <line x1={0} y1={CY} x2={W} y2={CY}
          stroke="var(--accent-cyan)" strokeWidth={0.35} strokeOpacity={0.05} />
        <line x1={CX} y1={0} x2={CX} y2={H}
          stroke="var(--accent-cyan)" strokeWidth={0.35} strokeOpacity={0.05} />

        {/* ── Corner bracket accents — large, architectural ─────────── */}
        <path d="M 0 64 L 0 0 L 64 0" fill="none"
          stroke="var(--accent-cyan)" strokeWidth={1.8} strokeOpacity={0.45} strokeLinecap="square" />
        <path d="M 1376 0 L 1440 0 L 1440 64" fill="none"
          stroke="var(--accent-cyan)" strokeWidth={1.8} strokeOpacity={0.45} strokeLinecap="square" />
        <path d="M 0 836 L 0 900 L 64 900" fill="none"
          stroke="var(--accent-cyan)" strokeWidth={1.8} strokeOpacity={0.45} strokeLinecap="square" />
        <path d="M 1376 900 L 1440 900 L 1440 836" fill="none"
          stroke="var(--accent-cyan)" strokeWidth={1.8} strokeOpacity={0.45} strokeLinecap="square" />

        {/* ── Amber tick marks — color-pop offset on each bracket ─────── */}
        <path d="M 0 90 L 0 64"      fill="none" stroke="var(--accent-amber)" strokeWidth={3} strokeOpacity={0.65} strokeLinecap="square" />
        <path d="M 64 0 L 90 0"      fill="none" stroke="var(--accent-amber)" strokeWidth={3} strokeOpacity={0.65} strokeLinecap="square" />
        <path d="M 1350 0 L 1376 0"  fill="none" stroke="var(--accent-amber)" strokeWidth={3} strokeOpacity={0.65} strokeLinecap="square" />
        <path d="M 1440 64 L 1440 90" fill="none" stroke="var(--accent-amber)" strokeWidth={3} strokeOpacity={0.65} strokeLinecap="square" />
        <path d="M 0 810 L 0 836"    fill="none" stroke="var(--accent-amber)" strokeWidth={3} strokeOpacity={0.65} strokeLinecap="square" />
        <path d="M 64 900 L 90 900"  fill="none" stroke="var(--accent-amber)" strokeWidth={3} strokeOpacity={0.65} strokeLinecap="square" />
        <path d="M 1350 900 L 1376 900" fill="none" stroke="var(--accent-amber)" strokeWidth={3} strokeOpacity={0.65} strokeLinecap="square" />
        <path d="M 1440 810 L 1440 836" fill="none" stroke="var(--accent-amber)" strokeWidth={3} strokeOpacity={0.65} strokeLinecap="square" />
      </svg>
    </div>
  );
}

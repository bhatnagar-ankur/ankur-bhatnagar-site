import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../providers/ThemeProvider';

function Bg({
  children,
  opacity = 0.85,
  viewBox = '0 0 1440 700',
}: {
  children: ReactNode;
  opacity?: number;
  viewBox?: string;
}) {
  const { theme, displayMode } = useTheme();
  const isDark = theme === 'dark';
  const isSunlight = displayMode === 'sunlight';
  const themeMultiplier = isSunlight ? 0.55 : isDark ? 1.0 : 0.75;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ opacity: opacity * themeMultiplier }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid slice"
      >
        {children}
      </svg>
    </div>
  );
}

// ── 01. SUMMARY — "Data Cartography" ─────────────────────────────────────────

type Pt = [number, number];

const SCATTER: Pt[] = [
  [812,115],[892,75],[956,155],[1046,90],[1096,170],
  [844,215],[1016,234],[1146,124],[1196,204],[1276,86],
  [1316,164],[1376,140],[1246,274],[1146,314],[1046,294],
  [946,344],[864,374],[994,394],[1094,444],[1196,354],
  [1296,394],[1374,324],[814,444],[894,494],[1044,514],
  [1344,494],[1208,554],
];

const SCATTER_EDGES: [number, number][] = [
  [0,1],[1,2],[2,4],[3,4],[3,0],[4,7],[7,9],[12,13],[13,14],
  [14,16],[18,19],[19,15],[15,11],[5,6],[6,8],[8,11],[20,21],[22,23],
];

// Left-side mirror cluster — balances the composition
const SCATTER_LEFT: Pt[] = [
  [128, 218], [72, 288], [188, 340], [96, 402], [232, 456],
  [56, 486], [172, 542], [86, 590], [252, 604], [138, 642],
];
const SCATTER_LEFT_EDGES: [number, number][] = [
  [0,1],[1,2],[2,4],[3,5],[5,7],[4,6],[6,8],[7,9],
];

const BARS = [
  { y: 130, w: 152, o: 0.70 },
  { y: 210, w: 268, o: 1.00 },
  { y: 290, w: 116, o: 0.55 },
  { y: 370, w: 198, o: 0.80 },
  { y: 450, w:  85, o: 0.45 },
  { y: 530, w: 232, o: 0.90 },
];

export function SummaryBg() {
  return (
    <Bg opacity={0.75}>
      {[100, 220, 340, 460, 580].map(y => (
        <line key={y} x1={0} y1={y} x2={1440} y2={y}
          stroke="var(--accent-cyan)" strokeWidth={0.4} strokeOpacity={0.12} />
      ))}

      <line x1={42} y1={88} x2={42} y2={578}
        stroke="var(--accent-amber)" strokeWidth={0.8} strokeOpacity={0.38} />

      {BARS.map(({ y, w, o }) => (
        <g key={y}>
          <rect x={42} y={y - 5} width={w} height={8} rx={1}
            fill="var(--accent-amber)" fillOpacity={o * 0.16} />
          <line x1={42} y1={y} x2={42 + w} y2={y}
            stroke="var(--accent-amber)" strokeWidth={1.4} strokeOpacity={o * 0.45}
            strokeLinecap="round" />
          <circle cx={42 + w} cy={y} r={2.5}
            fill="var(--accent-amber)" opacity={o * 0.65} />
          <line x1={36} y1={y} x2={48} y2={y}
            stroke="var(--accent-amber)" strokeWidth={0.8} strokeOpacity={0.42} />
        </g>
      ))}

      {/* Left-side cluster — balances the right-heavy scatter */}
      {SCATTER_LEFT_EDGES.map(([a, b], i) => (
        <line key={`le-${i}`}
          x1={SCATTER_LEFT[a][0]} y1={SCATTER_LEFT[a][1]}
          x2={SCATTER_LEFT[b][0]} y2={SCATTER_LEFT[b][1]}
          stroke="var(--accent-cyan)" strokeWidth={0.5} strokeOpacity={0.20} />
      ))}
      {SCATTER_LEFT.map(([x, y], i) => (
        <motion.circle key={`ln-${i}`} cx={x} cy={y}
          r={i % 3 === 0 ? 2 : 1.4}
          fill="var(--accent-cyan)"
          initial={{ opacity: 0.25 }}
          animate={{ opacity: [0.25, 0.65, 0.25] }}
          transition={{ duration: 3.5, delay: i * 0.25, repeat: Infinity, ease: 'easeInOut' }} />
      ))}

      {SCATTER_EDGES.map(([a, b], i) => (
        <line key={i}
          x1={SCATTER[a][0]} y1={SCATTER[a][1]}
          x2={SCATTER[b][0]} y2={SCATTER[b][1]}
          stroke="var(--accent-cyan)" strokeWidth={0.5} strokeOpacity={0.22} />
      ))}

      {SCATTER.map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y}
          r={i < 5 ? 2.2 : 1.5}
          fill="var(--accent-cyan)"
          initial={{ opacity: i < 5 ? 0.65 : 0.45 }}
          animate={{ opacity: i < 5 ? [0.65, 0.90, 0.65] : [0.45, 0.75, 0.45] }}
          transition={{ duration: 3.5, delay: i * 0.15, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
    </Bg>
  );
}

// ── 02. SKILLS — "Knowledge Matrix" ──────────────────────────────────────────

export function SkillsBg() {
  const anchors: Pt[] = [
    [28, 28], [1412, 28], [28, 672], [1412, 672],
    [720, 28], [720, 672],
  ];
  return (
    <Bg opacity={0.70}>
      <defs>
        <pattern id="skbg-dots" x="0" y="0" width="28" height="28"
          patternUnits="userSpaceOnUse">
          <circle cx="14" cy="14" r="1.2"
            fill="var(--accent-cyan)" fillOpacity="0.38" />
        </pattern>
        <linearGradient id="skbg-radar" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity="0" />
          <stop offset="80%" stopColor="var(--accent-cyan)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--accent-cyan)" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <rect width="1440" height="700" fill="url(#skbg-dots)" />

      {/* Radar sweep — slow rotation from center */}
      <motion.g
        style={{ transformOrigin: '720px 350px' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        <line x1={720} y1={350} x2={720 + 380} y2={350}
          stroke="url(#skbg-radar)" strokeWidth={1.2} strokeLinecap="round" />
      </motion.g>

      {/* Radar concentric rings */}
      {[120, 240, 360].map((r, i) => (
        <circle key={r} cx={720} cy={350} r={r} fill="none"
          stroke="var(--accent-cyan)" strokeWidth={0.5}
          strokeOpacity={0.10 - i * 0.02}
          strokeDasharray="4 12" />
      ))}

      {anchors.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3.5}
          fill="var(--accent-cyan)" opacity={0.45} />
      ))}
    </Bg>
  );
}

// ── 03. AI PRACTICE — "Neural Mesh" ──────────────────────────────────────────

const AI_NODES: Pt[] = [
  [682,118],[786,196],[706,316],[824,150],[904,256],
  [1004,176],[1104,290],[964,388],[1058,450],[1158,380],
  [1204,196],[1284,300],[1354,180],[1404,380],[1308,462],
  [844,478],[764,556],[964,536],[1104,540],[1264,518],
];
const AI_HUB_IDX = 5;

const AI_EDGES: [number, number][] = [
  [0,1],[0,3],[1,3],[1,4],[2,1],[2,4],
  [3,AI_HUB_IDX],[4,AI_HUB_IDX],[4,6],
  [AI_HUB_IDX,10],[AI_HUB_IDX,6],
  [6,7],[6,9],[7,8],[7,15],[8,9],[8,18],
  [9,13],[10,11],[10,12],[11,13],[12,13],[13,14],[14,19],
  [15,16],[15,17],[17,18],[18,19],[16,2],
];

// A few edges carry animated signal packets — pick edges connected to hub
const AI_PACKET_EDGES = [
  [3, AI_HUB_IDX], [AI_HUB_IDX, 10], [4, AI_HUB_IDX], [AI_HUB_IDX, 6],
  [6, 9], [10, 11], [7, 15],
] as const;

export function AIBg() {
  const [hx, hy] = AI_NODES[AI_HUB_IDX];
  return (
    <Bg opacity={0.72}>
      <defs>
        <filter id="ainbg-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {AI_EDGES.map(([a, b], i) => (
        <line key={i}
          x1={AI_NODES[a][0]} y1={AI_NODES[a][1]}
          x2={AI_NODES[b][0]} y2={AI_NODES[b][1]}
          stroke="var(--accent-cyan)" strokeWidth={0.7} strokeOpacity={0.32} />
      ))}

      {/* Signal packets — travel along selected edges */}
      {AI_PACKET_EDGES.map(([a, b], i) => {
        const [x1, y1] = AI_NODES[a];
        const [x2, y2] = AI_NODES[b];
        return (
          <motion.circle
            key={`pkt-${i}`}
            r={2.4}
            fill="var(--accent-cyan)"
            filter="url(#ainbg-glow)"
            initial={{ cx: x1, cy: y1, opacity: 0 }}
            animate={{
              cx: [x1, x2],
              cy: [y1, y2],
              opacity: [0, 0.9, 0],
            }}
            transition={{
              duration: 1.8,
              delay: i * 0.35,
              repeat: Infinity,
              repeatDelay: 2.4,
              ease: 'easeInOut',
              times: [0, 0.5, 1],
            }}
          />
        );
      })}

      {AI_NODES.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y}
          r={i === AI_HUB_IDX ? 4 : 2}
          fill="var(--accent-cyan)"
          opacity={i === AI_HUB_IDX ? 0.80 : 0.50} />
      ))}

      <motion.circle
        cx={hx} cy={hy} r={14}
        fill="none"
        stroke="var(--accent-cyan)"
        strokeWidth={1}
        style={{ transformOrigin: `${hx}px ${hy}px` }}
        initial={{ scale: 1, opacity: 0.50 }}
        animate={{ scale: 2.8, opacity: 0 }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeOut', repeatDelay: 1 }}
      />
      <circle cx={hx} cy={hy} r={6}
        fill="var(--accent-cyan)" opacity={0.65} filter="url(#ainbg-glow)" />
    </Bg>
  );
}

// ── 04. EXPERIENCE — "Chronicle Grid" ─────────────────────────────────────────

const EXP_YS = [80, 165, 250, 335, 420, 505, 590, 675];

export function ExperienceBg() {
  return (
    <Bg opacity={0.80}>
      <defs>
        <filter id="expbg-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {EXP_YS.map((y, idx) => {
        const isCurrent = idx === 0;
        return (
          <g key={y}>
            <line x1={0} y1={y} x2={1440} y2={y}
              stroke={isCurrent ? 'var(--accent-cyan)' : 'var(--accent-cyan)'}
              strokeWidth={isCurrent ? 0.9 : 0.6}
              strokeOpacity={isCurrent ? 0.55 : 0.35} />
            <line x1={0} y1={y - 8} x2={0} y2={y + 8}
              stroke={isCurrent ? 'var(--accent-cyan)' : 'var(--accent-amber)'}
              strokeWidth={isCurrent ? 2.5 : 2}
              strokeOpacity={isCurrent ? 0.85 : 0.65}
              strokeLinecap="round" />
            <line x1={1440} y1={y - 6} x2={1440} y2={y + 6}
              stroke="var(--accent-amber)" strokeWidth={1.5} strokeOpacity={0.45}
              strokeLinecap="round" />
            {isCurrent && (
              <motion.circle
                cx={26} cy={y}
                fill="var(--accent-cyan)"
                filter="url(#expbg-glow)"
                initial={{ opacity: 0.4, r: 4 }}
                animate={{ opacity: [0.4, 1, 0.4], r: [4, 6, 4] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </g>
        );
      })}

      {[288, 576, 864, 1152].map(x => (
        <line key={x} x1={x} y1={0} x2={x} y2={700}
          stroke="var(--accent-cyan)" strokeWidth={0.4} strokeOpacity={0.18}
          strokeDasharray="4 8" />
      ))}
    </Bg>
  );
}

// ── 05. PROJECTS — "Blueprint Grid" ──────────────────────────────────────────

const PRJ_DIVIDERS = [320, 760, 1200, 1640, 2080, 2520];
const PRJ_CROSSHAIRS: Pt[] = [
  [210, 180], [1260, 460], [780, 900], [1100, 1360],
  [320, 1700], [960, 2060], [1300, 2380], [180, 2700],
];
const PRJ_DOTS: Pt[] = [
  [480, 280], [1050, 640], [160, 1080], [900, 1520],
  [620, 1980], [1380, 2260], [380, 2660], [750, 2840],
];

export function ProjectsBg() {
  return (
    <Bg opacity={0.80} viewBox="0 0 1440 2900">
      <defs>
        <pattern id="prjbg-dots" x="0" y="0" width="36" height="36"
          patternUnits="userSpaceOnUse">
          <circle cx="18" cy="18" r="1.0"
            fill="var(--accent-cyan)" fillOpacity="0.28" />
        </pattern>
        <marker id="prjbg-arr" markerWidth="6" markerHeight="4"
          refX="6" refY="2" orient="auto">
          <polygon points="0,0 6,2 0,4"
            fill="var(--accent-cyan)" fillOpacity="0.60" />
        </marker>
      </defs>

      <rect width="1440" height="2900" fill="url(#prjbg-dots)" />

      <line x1={54} y1={0} x2={54} y2={2900}
        stroke="var(--accent-amber)" strokeWidth={0.9} strokeOpacity={0.42} />

      <line x1={1386} y1={0} x2={1386} y2={2900}
        stroke="var(--accent-amber)" strokeWidth={0.7} strokeOpacity={0.26} />

      {PRJ_DIVIDERS.map(y => (
        <g key={y}>
          <line x1={54} y1={y} x2={1386} y2={y}
            stroke="var(--accent-cyan)" strokeWidth={0.5} strokeOpacity={0.22} />
          <line x1={44} y1={y - 8} x2={44} y2={y + 8}
            stroke="var(--accent-amber)" strokeWidth={2} strokeOpacity={0.58}
            strokeLinecap="round" />
          <line x1={1386} y1={y - 6} x2={1386} y2={y + 6}
            stroke="var(--accent-amber)" strokeWidth={1.5} strokeOpacity={0.38}
            strokeLinecap="round" />
        </g>
      ))}

      <line x1={780} y1={100} x2={1386} y2={100}
        stroke="var(--accent-cyan)" strokeWidth={0.9} strokeOpacity={0.42}
        markerStart="url(#prjbg-arr)" markerEnd="url(#prjbg-arr)" />
      <line x1={780} y1={82} x2={780} y2={120}
        stroke="var(--accent-cyan)" strokeWidth={0.7} strokeOpacity={0.36} />
      <line x1={1386} y1={82} x2={1386} y2={120}
        stroke="var(--accent-cyan)" strokeWidth={0.7} strokeOpacity={0.36} />

      <line x1={54} y1={1440} x2={520} y2={1440}
        stroke="var(--accent-cyan)" strokeWidth={0.8} strokeOpacity={0.38}
        markerEnd="url(#prjbg-arr)" />

      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
        <rect key={i} x={54 + i * 30} y={2860} width={26} height={12} rx={1}
          fill={i % 2 === 0 ? 'var(--accent-cyan)' : 'none'}
          stroke="var(--accent-cyan)" strokeWidth={0.7}
          fillOpacity={0.28} strokeOpacity={0.42} />
      ))}

      {/* Crosshairs — subtle drift + opacity breathing */}
      {PRJ_CROSSHAIRS.map(([x, y], i) => {
        const s = i % 2 === 0 ? 11 : 7;
        return (
          <motion.g
            key={i}
            initial={{ opacity: 0.75 }}
            animate={{
              opacity: [0.6, 1, 0.6],
              x: [0, i % 2 === 0 ? 4 : -4, 0],
            }}
            transition={{
              duration: 5 + (i % 3),
              delay: i * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <line x1={x - s} y1={y} x2={x + s} y2={y}
              stroke="var(--accent-amber)" strokeWidth={0.8} strokeOpacity={0.42} />
            <line x1={x} y1={y - s} x2={x} y2={y + s}
              stroke="var(--accent-amber)" strokeWidth={0.8} strokeOpacity={0.42} />
            <circle cx={x} cy={y} r={4} fill="none"
              stroke="var(--accent-amber)" strokeWidth={0.6} strokeOpacity={0.28} />
          </motion.g>
        );
      })}

      {PRJ_DOTS.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y}
          r={i % 3 === 0 ? 2.8 : 1.6}
          fill="var(--accent-cyan)"
          opacity={i % 3 === 0 ? 0.48 : 0.30} />
      ))}

      <circle cx={1180} cy={2620} r={26} fill="none"
        stroke="var(--accent-cyan)" strokeWidth={0.8} strokeOpacity={0.42} />
      <line x1={1198} y1={2600} x2={1260} y2={2568}
        stroke="var(--accent-cyan)" strokeWidth={0.7} strokeOpacity={0.36} />
      <circle cx={1260} cy={2568} r={2.5}
        fill="var(--accent-cyan)" opacity={0.48} />
    </Bg>
  );
}

// ── 06. ACHIEVEMENTS — "Award Radial" ─────────────────────────────────────────

const ACH_CX = 1372;
const ACH_CY = 58;
const ACH_N = 12;
const ACH_INNER = 42;

const ach_rays = Array.from({ length: ACH_N }, (_, i) => {
  const a = (i * 360 / ACH_N) * (Math.PI / 180);
  const rOuter = ACH_INNER + 108 + (i % 3 === 0 ? 30 : i % 3 === 1 ? 0 : -20);
  return {
    x1: ACH_CX + ACH_INNER * Math.cos(a),
    y1: ACH_CY + ACH_INNER * Math.sin(a),
    x2: ACH_CX + rOuter * Math.cos(a),
    y2: ACH_CY + rOuter * Math.sin(a),
  };
});

const SPARKLES: Pt[] = [
  [340, 180], [580, 122], [820, 200], [200, 380],
  [1100, 380], [480, 558], [700, 580],
];

export function AchievementsBg() {
  return (
    <Bg opacity={0.80}>
      {/* Rays rotate slowly around the corner medallion */}
      <motion.g
        style={{ transformOrigin: `${ACH_CX}px ${ACH_CY}px` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      >
        {ach_rays.map(({ x1, y1, x2, y2 }, i) => (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="var(--accent-amber)" strokeWidth={0.9}
              strokeOpacity={i % 3 === 0 ? 0.60 : 0.38}
              strokeLinecap="round" />
            <circle cx={x2} cy={y2} r={2}
              fill="var(--accent-amber)" opacity={0.50} />
          </g>
        ))}
      </motion.g>

      <circle cx={ACH_CX} cy={ACH_CY} r={ACH_INNER}
        fill="none" stroke="var(--accent-amber)"
        strokeWidth={0.7} strokeOpacity={0.48} />

      {/* Sparkle twinkle */}
      {SPARKLES.map(([x, y], i) => {
        const s = i % 2 === 0 ? 6 : 4;
        return (
          <motion.g
            key={i}
            style={{ transformOrigin: `${x}px ${y}px` }}
            initial={{ opacity: 0.4, scale: 1 }}
            animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.85, 1.15, 0.85] }}
            transition={{
              duration: 2.5,
              delay: i * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <line x1={x} y1={y - s} x2={x} y2={y + s}
              stroke="var(--accent-amber)" strokeWidth={0.8} strokeOpacity={0.45} />
            <line x1={x - s} y1={y} x2={x + s} y2={y}
              stroke="var(--accent-amber)" strokeWidth={0.8} strokeOpacity={0.45} />
          </motion.g>
        );
      })}
    </Bg>
  );
}

// ── 07. EDUCATION — "Academic Lines" ──────────────────────────────────────────

export function EducationBg() {
  const holes = [110, 245, 380, 515]; // notebook binder holes
  return (
    <Bg opacity={0.75}>
      {/* Left red margin line — classic ruled notebook */}
      <line x1={92} y1={30} x2={92} y2={670}
        stroke="var(--accent-amber)" strokeWidth={1.0} strokeOpacity={0.50} />
      {/* Vestigial thin secondary rule */}
      <line x1={96} y1={30} x2={96} y2={670}
        stroke="var(--accent-amber)" strokeWidth={0.5} strokeOpacity={0.28} />

      {/* Notebook binder holes */}
      {holes.map(y => (
        <g key={y}>
          <circle cx={42} cy={y} r={9} fill="none"
            stroke="var(--accent-cyan)" strokeWidth={0.8} strokeOpacity={0.35} />
          <circle cx={42} cy={y} r={5}
            fill="var(--accent-cyan)" opacity={0.10} />
        </g>
      ))}

      {/* Horizontal rules */}
      {[80, 170, 255, 340, 425, 510, 595].map(y => (
        <line key={y} x1={110} y1={y} x2={1380} y2={y}
          stroke="var(--accent-cyan)" strokeWidth={0.6} strokeOpacity={0.35} />
      ))}
    </Bg>
  );
}

// ── 08. CONTACT — "Signal Broadcast" ──────────────────────────────────────────

const CTX = 720;
const CTY = 580;

export function ContactBg() {
  return (
    <Bg opacity={0.75} viewBox="0 0 1440 520">
      {[110, 220, 350].map((r, i) => (
        <circle key={r} cx={CTX} cy={CTY} r={r}
          fill="none"
          stroke="var(--accent-cyan)"
          strokeWidth={0.7}
          strokeOpacity={[0.40, 0.25, 0.12][i]}
          strokeDasharray={i === 2 ? '4 12' : undefined} />
      ))}

      <motion.circle
        cx={CTX} cy={CTY} r={80}
        fill="none"
        stroke="var(--accent-cyan)"
        strokeWidth={1.2}
        style={{ transformOrigin: `${CTX}px ${CTY}px` }}
        initial={{ scale: 1, opacity: 0.55 }}
        animate={{ scale: 5.5, opacity: 0 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeOut', repeatDelay: 2 }}
      />

      <line x1={CTX - 18} y1={CTY} x2={CTX + 18} y2={CTY}
        stroke="var(--accent-cyan)" strokeWidth={1} strokeOpacity={0.50} />
      <line x1={CTX} y1={CTY - 18} x2={CTX} y2={CTY + 18}
        stroke="var(--accent-cyan)" strokeWidth={1} strokeOpacity={0.50} />
      <circle cx={CTX} cy={CTY} r={4}
        fill="var(--accent-cyan)" opacity={0.60} />

      {[0, 90, 180, 270].map(deg => {
        const rad = deg * (Math.PI / 180);
        const r = 220;
        return (
          <circle key={deg}
            cx={CTX + r * Math.cos(rad)}
            cy={CTY + r * Math.sin(rad)}
            r={2.5}
            fill="var(--accent-cyan)" opacity={0.45} />
        );
      })}
    </Bg>
  );
}

import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import hujiLogoDark from "./assets/huji-logo-horizontal-dark.png";
import hujiLogoLight from "./assets/huji-logo-horizontal-white.png";
import styles from "./lab.module.css";

export type LabSection = "home" | "research" | "people" | "about" | "join";

const navigation = [
  { href: "/research", label: "Research", section: "research" },
  { href: "/people", label: "People", section: "people" },
  { href: "/about", label: "About", section: "about" },
  { href: "/join", label: "Join us", section: "join" },
] as const;

export function LabHeader({ active, inverse = false }: { active: LabSection; inverse?: boolean }) {
  return (
    <header className={`${styles.header} ${inverse ? styles.headerInverse : ""}`}>
      <Link className={styles.wordmark} href="/" aria-label="Agentic Markets Lab home">
        <span className={styles.wordmarkSymbol} aria-hidden="true">
          <svg viewBox="0 0 32 32" focusable="false">
            <path className={styles.markOrbit} d="M7.1 5.9A13.2 13.2 0 0 1 28.7 13.2" />
            <path className={styles.markOrbit} d="M29.2 18.5A13.2 13.2 0 1 1 4.9 9.3" />
            <circle className={styles.markNode} cx="29" cy="15.8" r="1.45" />
            <path className={styles.markLetter} d="M10.4 23.2L15.8 8.5L21.7 23.2" />
            <path className={styles.markCrossbar} d="M12.7 17.8Q16.1 19.2 19.7 16.9" />
          </svg>
        </span>
        <span>Agentic Markets Lab</span>
      </Link>
      <nav className={styles.primaryNav} aria-label="Main navigation">
        {navigation.map((item) => (
          <Link
            className={[
              active === item.section ? styles.activeNav : "",
              item.section === "join" ? styles.joinNav : "",
            ].filter(Boolean).join(" ") || undefined}
            href={item.href}
            key={item.href}
            aria-current={active === item.section ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <Link
        className={styles.institutionNav}
        href="/about"
        aria-label="The Hebrew University of Jerusalem"
      >
        <Image
          className={`${styles.hujiLogo} ${styles.hujiLogoDark}`}
          src={hujiLogoDark}
          alt=""
        />
        <Image
          className={`${styles.hujiLogo} ${styles.hujiLogoLight}`}
          src={hujiLogoLight}
          alt=""
        />
      </Link>
    </header>
  );
}

export function PageFrame({
  active,
  tone,
  children,
}: {
  active: LabSection;
  tone: "paper" | "blue";
  children: ReactNode;
}) {
  return (
    <div className={`${styles.page} ${styles[`tone${tone[0].toUpperCase()}${tone.slice(1)}`]}`}>
      <a className={styles.skipLink} href="#main-content">Skip to content</a>
      <LabHeader active={active} inverse={tone !== "paper"} />
      <main id="main-content">{children}</main>
      <footer className={styles.footer}>
        <Link href="/about">Department of Data Science · Hebrew University Business School</Link>
        <span>The Hebrew University of Jerusalem</span>
      </footer>
    </div>
  );
}

export function BackLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link className={styles.backLink} href={href}>
      <ArrowLeft size={17} /> {children}
    </Link>
  );
}

type GridPoint = { i: number; j: number; x: number; y: number };
type UnitEdge = { from: GridPoint; to: GridPoint; family: number };

const gridSize = 13;
const gridStep = 40;
const gridOrigin = { x: 184, y: 56 };
const unitOffsets = [
  [1, 8],
  [1, -8],
  [8, 1],
  [8, -1],
  [4, 7],
  [4, -7],
  [7, 4],
  [7, -4],
] as const;

const gridPoints: GridPoint[] = Array.from({ length: gridSize * gridSize }, (_, index) => {
  const i = index % gridSize;
  const j = Math.floor(index / gridSize);
  return { i, j, x: gridOrigin.x + i * gridStep, y: gridOrigin.y + j * gridStep };
});

const gridPointMap = new Map(gridPoints.map((point) => [`${point.i},${point.j}`, point]));
const unitEdges: UnitEdge[] = gridPoints.flatMap((from) =>
  unitOffsets.flatMap(([di, dj], family) => {
    const to = gridPointMap.get(`${from.i + di},${from.j + dj}`);
    return to ? [{ from, to, family }] : [];
  }),
);

type ProjectedPoint = { x: number; y: number };
const saddleRange = Array.from({ length: 14 }, (_, index) => -1.7 + index * (3.4 / 13));
const saddleSamples = Array.from({ length: 55 }, (_, index) => -1.7 + index * (3.4 / 54));

function projectPoint(x: number, y: number, z: number): ProjectedPoint {
  const diagonalX = (x - y) * Math.SQRT1_2;
  const diagonalY = (x + y) * Math.SQRT1_2;
  const perspective = 1 + diagonalY * 0.045;
  return { x: 800 + diagonalX * 365 * perspective, y: 455 + diagonalY * 132 - z * 210 };
}

function saddleHeight(x: number, y: number) {
  return 0.42 * (x * x - y * y);
}

function pathFrom(points: ProjectedPoint[]) {
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(" ");
}

const saddleLinesX = saddleRange.map((x) =>
  pathFrom(saddleSamples.map((y) => projectPoint(x, y, saddleHeight(x, y)))),
);
const saddleLinesY = saddleRange.map((y) =>
  pathFrom(saddleSamples.map((x) => projectPoint(x, y, saddleHeight(x, y)))),
);
const saddleBands = saddleRange.slice(0, -1).map((x, index) => {
  const nextX = saddleRange[index + 1];
  const forward = saddleSamples.map((y) => projectPoint(x, y, saddleHeight(x, y)));
  const backward = [...saddleSamples]
    .reverse()
    .map((y) => projectPoint(nextX, y, saddleHeight(nextX, y)));
  return `${pathFrom([...forward, ...backward])} Z`;
});
const agentTrajectories = [
  { offset: -0.72, phase: 0.15, duration: 7.2, delay: -1.1 },
  { offset: -0.36, phase: 1.05, duration: 8.6, delay: -4.4 },
  { offset: 0, phase: 1.95, duration: 6.8, delay: -2.6 },
  { offset: 0.36, phase: 2.85, duration: 9.4, delay: -6.2 },
  { offset: 0.72, phase: 3.75, duration: 7.9, delay: -3.5 },
].map(({ offset, phase, duration, delay }) => {
  const points = Array.from({ length: 72 }, (_, index) => {
    const x = -1.54 + index * (3.08 / 71);
    const center = 0.46 * Math.sin(x * 1.82);
    const convergence = 0.14 + 0.86 * (1 - Math.exp(-Math.pow(x / 0.56, 2)));
    const interaction = 0.12 * Math.sin(x * 3.1 + phase) * Math.exp(-Math.pow(x / 1.12, 2));
    const y = center + offset * convergence + interaction;
    return projectPoint(x, y, saddleHeight(x, y) + 0.045);
  });

  return { points, duration, delay };
});

export function ObservatoryBackdrop() {
  return (
    <div className={styles.observatoryBackdrop} aria-hidden="true">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" focusable="false">
        <defs>
          <radialGradient id="observatory-fade">
            <stop offset="0" stopColor="white" />
            <stop offset="0.76" stopColor="white" stopOpacity=".84" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="saddle-surface" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#315cff" stopOpacity=".12" />
            <stop offset=".42" stopColor="#88a7ff" stopOpacity=".2" />
            <stop offset=".7" stopColor="#d5ff8d" stopOpacity=".07" />
            <stop offset="1" stopColor="#ff7055" stopOpacity=".12" />
          </linearGradient>
          <mask id="observatory-mask">
            <rect width="1600" height="900" fill="url(#observatory-fade)" />
          </mask>
        </defs>
        <g className={styles.saddle} mask="url(#observatory-mask)">
          <g className={styles.saddleBands}>
            {saddleBands.map((path, index) => (
              <path d={path} key={`band-${index}`} style={{ fill: "url(#saddle-surface)" }} />
            ))}
          </g>
          <g className={styles.saddleBlue}>
            {saddleLinesX.map((path, index) => <path d={path} key={`x-${index}`} />)}
          </g>
          <g className={styles.saddleWhite}>
            {saddleLinesY.map((path, index) => <path d={path} key={`y-${index}`} />)}
          </g>
          <g className={styles.agentDynamics}>
            {agentTrajectories.map(({ points, duration, delay }, index) => (
              <g
                className={styles.agentTrack}
                key={`agent-${index}`}
                style={{
                  "--agent-duration": `${duration}s`,
                  "--agent-delay": `${delay}s`,
                } as CSSProperties}
              >
                <path className={styles.agentTrace} d={pathFrom(points)} />
                <path className={styles.agentSignal} d={pathFrom(points)} pathLength={1} />
              </g>
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}

export function UnitDistanceArtwork() {
  return (
    <figure className={styles.unitArtwork} aria-hidden="true">
      <svg viewBox="0 0 860 650" focusable="false">
        <g className={styles.unitEdges}>
          {unitEdges.map(({ from, to, family }) => (
            <line
              key={`${from.i}-${from.j}-${to.i}-${to.j}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              pathLength={1}
              style={{ "--family": family } as CSSProperties}
            />
          ))}
        </g>
        <g className={styles.unitPoints}>
          {gridPoints.map((point) => (
            <circle key={`${point.i}-${point.j}`} cx={point.x} cy={point.y} r="2.65" />
          ))}
        </g>
      </svg>
    </figure>
  );
}

export function ResearchGlyph({ index, large = false }: { index: string; large?: boolean }) {
  const common = { viewBox: "0 0 420 240", focusable: false } as const;
  return (
    <figure className={`${styles.researchGlyph} ${large ? styles.researchGlyphLarge : ""}`} aria-hidden="true">
      {index === "01" && (
        <svg {...common}>
          <path className={styles.glyphAxis} d="M28 24V210H397" />
          <path className={styles.glyphBlue} d="M29 188C90 186 120 165 163 131S261 65 397 34" />
          <path className={styles.glyphCoral} d="M29 45C102 51 124 77 172 108S291 169 397 190" />
          <path className={styles.glyphInk} d="M29 143C84 123 139 130 191 141S305 118 397 97" />
          <line className={styles.glyphGuide} x1="185" y1="26" x2="185" y2="210" />
        </svg>
      )}
      {index === "02" && (
        <svg {...common}>
          {Array.from({ length: 9 }, (_, i) => {
            const angle = (i / 9) * Math.PI * 2;
            const x = 210 + Math.cos(angle) * 150;
            const y = 120 + Math.sin(angle) * 82;
            return <line className={styles.glyphThread} key={`l-${i}`} x1="210" y1="120" x2={x} y2={y} />;
          })}
          {Array.from({ length: 9 }, (_, i) => {
            const angle = (i / 9) * Math.PI * 2;
            const x = 210 + Math.cos(angle) * 150;
            const y = 120 + Math.sin(angle) * 82;
            return <circle className={i === 0 ? styles.glyphNodeHot : styles.glyphNode} key={`n-${i}`} cx={x} cy={y} r="4.5" />;
          })}
          <circle className={styles.glyphCore} cx="210" cy="120" r="7" />
        </svg>
      )}
      {index === "03" && (
        <svg {...common}>
          <path className={styles.glyphBlue} d="M26 189C79 191 88 147 128 148S181 171 217 128 290 83 397 67" />
          <path className={styles.glyphCoral} d="M26 65C83 65 101 99 145 102S221 71 261 108 328 157 397 153" />
          {[77, 145, 217, 284, 351].map((x, i) => <circle className={i === 2 ? styles.glyphNodeHot : styles.glyphNode} key={x} cx={x} cy={i % 2 ? 102 : 148} r="4.5" />)}
          <path className={styles.glyphBracket} d="M66 35H352M66 35V53M352 35V53" />
        </svg>
      )}
      {index === "04" && (
        <svg {...common}>
          <circle className={styles.glyphOrbit} cx="210" cy="120" r="83" />
          <path className={styles.glyphBlue} d="M68 121C107 65 144 66 210 120S320 178 355 104" />
          <path className={styles.glyphCoral} d="M70 158C136 176 165 161 210 120S290 59 350 77" />
          <circle className={styles.glyphCore} cx="210" cy="120" r="7" />
          <circle className={styles.glyphNodeHot} cx="350" cy="77" r="4.5" />
        </svg>
      )}
    </figure>
  );
}

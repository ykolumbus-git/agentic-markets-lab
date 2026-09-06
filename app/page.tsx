import Link from "next/link";
import { LabHeader, ObservatoryBackdrop, UnitDistanceArtwork } from "./lab-shell";
import styles from "./lab.module.css";

const portals = [
  { index: "01", href: "/research", label: "Research" },
  { index: "02", href: "/about", label: "About" },
  { index: "03", href: "/join", label: "Join the lab", status: "Now recruiting PhD students and postdocs.", note: "Take part in establishing the new lab" },
] as const;

export default function Home() {
  return (
    <div className={styles.home} data-spatial-home>
      <ObservatoryBackdrop />
      <div className={styles.glassPlane} aria-hidden="true" />
      <a className={styles.skipLink} href="#main-content">Skip to content</a>
      <LabHeader active="home" inverse />
      <main className={styles.homeStage} id="main-content" aria-labelledby="lab-title">
        <div className={styles.homeTitle}>
          <h1 id="lab-title" aria-label="Agentic Markets Lab">
            <span>Agentic</span>
            <span className={styles.marketLine}>Markets <em>Lab</em></span>
          </h1>
          <p className={styles.homeTagline}>Learning agents, markets, and collective systems.</p>
          <p className={styles.homeDescription}>
            We study how human and algorithmic agents learn and interact, and how their interactions shape economic systems.
          </p>
          <Link className={styles.homeInstitution} href="/about">
            A new interdisciplinary lab at The Hebrew University of Jerusalem
            <span>Department of Data Science · Hebrew University Business School →</span>
          </Link>
          <Link className={styles.homeLead} href="/people">Led by Yoav Kolumbus.</Link>
        </div>
        <UnitDistanceArtwork />
        <nav className={styles.homeIndex} aria-label="Explore the lab">
          {portals.map((portal) => (
            <Link className={`${styles.homePortal} ${portal.href === "/join" ? styles.homeJoin : ""}`} href={portal.href} key={portal.href}>
              <span className={styles.portalNumber}>{portal.index}</span>
              <span className={styles.portalCopy}>
                <strong className={styles.portalLabel}>{portal.label}</strong>
                {"status" in portal && <small className={styles.portalStatus}>{portal.status}</small>}
                {"note" in portal && portal.note && <small className={styles.portalNote}>{portal.note}</small>}
              </span>
              <span className={styles.portalArrow} aria-hidden="true">→</span>
            </Link>
          ))}
        </nav>
      </main>
    </div>
  );
}

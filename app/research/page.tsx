import type { Metadata } from "next";
import Link from "next/link";
import { ResearchGlyph, PageFrame } from "../lab-shell";
import { themes } from "../content";
import styles from "../lab.module.css";

export const metadata: Metadata = {
  title: "Research | Agentic Markets Lab",
  description: "Research on learning in markets, emergent collective behavior, incentives for adaptive agents, and human learning with AI.",
};

export default function ResearchPage() {
  return (
    <PageFrame active="research" tone="paper">
      <section className={styles.indexPage} aria-labelledby="research-title">
        <header className={styles.indexLead}>
          <div>
            <p className={styles.eyebrow}>Research agenda</p>
            <h1 id="research-title">Research</h1>
          </div>
          <p className={styles.indexStatement}>When agents learn, systems change.</p>
        </header>
        <div className={styles.methodRail} aria-label="Methods">
          <span>Mathematical theory</span><i /><span>Computation</span><i /><span>Behavioral experiments</span>
        </div>
        <div className={styles.ruledIndex}>
          {themes.map((theme) => (
            <Link className={styles.researchRow} href={`/research/${theme.slug}`} key={theme.slug}>
              <span className={styles.rowNumber}>{theme.index}</span>
              <h2>{theme.title}</h2>
              <ResearchGlyph index={theme.index} />
              <span className={styles.rowArrow} aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>
    </PageFrame>
  );
}

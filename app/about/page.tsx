import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageFrame } from "../lab-shell";
import { departmentUrl, disciplines } from "../content";
import styles from "../lab.module.css";

export const metadata: Metadata = {
  title: "About | Agentic Markets Lab",
  description: "A new interdisciplinary research lab in the Department of Data Science at the Hebrew University Business School, The Hebrew University of Jerusalem.",
};

export default function AboutPage() {
  return (
    <PageFrame active="about" tone="paper">
      <section className={styles.aboutPage} aria-labelledby="about-title">
        <header className={styles.aboutMast}>
          <div>
            <p className={styles.eyebrow}>About the lab</p>
            <h1 id="about-title">Learning agents and the systems they shape.</h1>
          </div>
          <div className={styles.aboutInstitution}>
            <p>
              Agentic Markets Lab is a new interdisciplinary research lab being established at The
              Hebrew University of Jerusalem. It will be based in the Department of Data Science at
              the Hebrew University Business School.
            </p>
            <a href={departmentUrl} target="_blank" rel="noreferrer">
              Department of Data Science <ArrowUpRight size={19} />
            </a>
          </div>
        </header>

        <div className={styles.aboutBody}>
          <article className={styles.aboutStatement}>
            <span>Research focus</span>
            <p>
              We study systems in which human and algorithmic agents learn, adapt, compete, and
              cooperate—and how these interactions shape markets, institutions, and collective outcomes.
            </p>
          </article>
          <aside className={styles.aboutDisciplines} aria-label="Disciplines">
            {disciplines.map((discipline, index) => (
              <span style={{ "--discipline-index": index } as CSSProperties} key={discipline}>
                {discipline}
              </span>
            ))}
          </aside>
        </div>

        <div className={styles.aboutRail}>
          <div><span>Approach</span><strong>Mathematical theory · Computation · Behavioral experiments</strong></div>
          <Link href="/join">Take part in establishing the new lab <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </PageFrame>
  );
}

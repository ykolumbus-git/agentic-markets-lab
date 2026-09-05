import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageFrame } from "../lab-shell";
import { disciplines, recruitmentHref } from "../content";
import styles from "../lab.module.css";

export const metadata: Metadata = {
  title: "Join the Lab | Agentic Markets Lab",
  description: "Agentic Markets Lab is recruiting PhD students and postdoctoral researchers. Funding will be available for suitable candidates.",
};

export default function JoinPage() {
  return (
    <PageFrame active="join" tone="blue">
      <section className={styles.joinPage} aria-labelledby="join-title">
        <header className={styles.joinHeader}>
          <div className={styles.joinTitleBlock}>
            <h1 id="join-title">Join <em>the lab</em></h1>
            <p className={styles.joinFounding}>Take part in establishing a new interdisciplinary lab.</p>
          </div>
          <p className={styles.joinStatus}>Now recruiting PhD students and postdoctoral researchers.</p>
        </header>
        <div className={styles.joinBody}>
          <div className={styles.joinCopy}>
            <h2>Who should apply</h2>
            <p>
              We welcome candidates with technical or mathematical backgrounds from these or related
              fields. Please send your CV and a brief note about the research questions you would like to pursue.
            </p>
            <div className={styles.disciplineList} aria-label="Relevant backgrounds">
              {disciplines.map((discipline) => <span key={discipline}>{discipline}</span>)}
              <span>Related fields</span>
            </div>
            <a className={styles.joinAction} href={recruitmentHref}>
              Send your CV <ArrowUpRight size={19} />
            </a>
          </div>
          <aside className={styles.joinFacts} aria-label="Position details">
            <div className={styles.joinFact}><span>Positions</span><strong>PhD students<br />Postdoctoral researchers</strong></div>
            <div className={styles.joinFact}><span>Background</span><strong>Technical or mathematical</strong></div>
            <div className={styles.joinFact}><span>Place</span><strong>The Hebrew University of Jerusalem</strong></div>
            <div className={styles.joinFact}><span>Funding</span><strong>Funding will be available for suitable candidates</strong></div>
          </aside>
        </div>
      </section>
    </PageFrame>
  );
}

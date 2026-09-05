import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { principalInvestigatorUrl } from "../content";
import { PageFrame } from "../lab-shell";
import styles from "../lab.module.css";

export const metadata: Metadata = {
  title: "People | Agentic Markets Lab",
  description: "People at Agentic Markets Lab and an invitation to help establish the new lab.",
};

export default function PeoplePage() {
  return (
    <PageFrame active="people" tone="paper">
      <section className={styles.peoplePage} aria-labelledby="people-title">
        <div className={styles.peopleMain}>
          <p className={styles.eyebrow}>People</p>
          <Link className={styles.peopleJoin} href="/join">
            <h1 id="people-title">Join in establishing the <em>new lab.</em></h1>
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.peoplePiLine}>
          <span>Principal Investigator:</span>
          <a href={principalInvestigatorUrl} target="_blank" rel="noreferrer">
            Yoav Kolumbus <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </section>
    </PageFrame>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { principalInvestigatorUrl } from "../content";
import { PageFrame } from "../lab-shell";
import portrait from "../assets/yoav-kolumbus.jpg";
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
          <h1 id="people-title" className={styles.eyebrow}>People</h1>
          <div className={styles.peopleIdentity}>
            <span className={styles.peoplePortrait}>
              <Image src={portrait} alt="Yoav Kolumbus" sizes="72px" />
            </span>
            <div className={styles.peopleIdentityCopy}>
              <a href={principalInvestigatorUrl} target="_blank" rel="noreferrer">
                Yoav Kolumbus <ArrowUpRight aria-hidden="true" />
              </a>
              <span>Principal Investigator</span>
            </div>
          </div>
          <Link className={styles.peopleJoin} href="/join">
            <h2>Join in establishing the <em>new lab.</em></h2>
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </PageFrame>
  );
}

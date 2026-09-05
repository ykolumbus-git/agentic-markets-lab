import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackLink, PageFrame, ResearchGlyph } from "../../lab-shell";
import { themes } from "../../content";
import styles from "../../lab.module.css";

export function generateStaticParams() {
  return themes.map((theme) => ({ slug: theme.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const theme = themes.find((item) => item.slug === slug);
  return { title: theme ? `${theme.title} | Agentic Markets Lab` : "Research | Agentic Markets Lab" };
}

export default async function ResearchDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theme = themes.find((item) => item.slug === slug);
  if (!theme) notFound();

  return (
    <PageFrame active="research" tone="paper">
      <article className={styles.detailPage}>
        <BackLink href="/research">All research</BackLink>
        <div className={styles.detailGrid}>
          <div>
            <span className={styles.detailNumber}>{theme.index} / Research area</span>
            <h1 className={styles.detailTitle}>{theme.title}</h1>
          </div>
          <aside className={styles.detailAside}>
            <ResearchGlyph index={theme.index} large />
          </aside>
        </div>
        <div className={styles.readingPanel}>
          <p className={styles.readingLabel}>Research question</p>
          <div className={styles.readingCopy}>
            <h2>{theme.question}</h2>
            <p>{theme.body}</p>
            <div className={styles.readingTags} aria-label="Topics and methods">
              {theme.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </div>
        </div>
      </article>
    </PageFrame>
  );
}

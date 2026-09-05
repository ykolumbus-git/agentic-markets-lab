export const siteUrl = "https://ykolumbus-git.github.io/agentic-markets-lab";
export const principalInvestigatorUrl = "https://sites.google.com/view/yoavkolumbus";
export const departmentUrl = "https://bschool-en.huji.ac.il/academic-unit/data-science";
export const recruitmentEmail = "yoav.kolumbus@cornell.edu";

export const recruitmentHref =
  `mailto:${recruitmentEmail}?subject=Prospective%20PhD%20or%20postdoc%20%E2%80%94%20Agentic%20Markets%20Lab`;

export const themes = [
  {
    index: "01",
    slug: "learning-in-markets",
    title: "Learning in markets",
    question: "Who thrives when market participants learn differently?",
    body: "We study how heterogeneous beliefs, information, and learning rules shape prices, wealth, competition, and long-run survival.",
    tags: ["Markets", "Online learning", "Economic theory"],
  },
  {
    index: "02",
    slug: "collective-behavior",
    title: "Emergent collective behavior",
    question: "When can effective individual learning lead to poor collective outcomes?",
    body: "We study how simple adaptive rules generate coordination, inefficiency, collusion, or instability, and how individual learning maps to collective outcomes.",
    tags: ["Multi-agent learning", "Game theory", "Computation"],
  },
  {
    index: "03",
    slug: "adaptive-incentives",
    title: "Incentives for adaptive agents",
    question: "How should institutions be designed when agents continue to adapt?",
    body: "We study contracts, auctions, and allocation rules for adaptive and delegated decision-makers, including settings in which the designer is learning as well.",
    tags: ["Mechanism design", "Contracts", "Online learning"],
  },
  {
    index: "04",
    slug: "humans-and-ai",
    title: "Human learning with AI",
    question: "How does AI assistance change both decisions and learning?",
    body: "We study how different forms of AI assistance affect immediate performance, conceptual learning, confidence, and later independent problem-solving.",
    tags: ["Behavioral experiments", "Decision-making", "Human–AI interaction"],
  },
] as const;

export const disciplines = [
  "Computer science",
  "Economics",
  "Mathematics",
  "Engineering",
  "Physics",
  "Cognitive science",
] as const;

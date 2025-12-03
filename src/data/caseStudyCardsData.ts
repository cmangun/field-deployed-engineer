// ═══════════════════════════════════════════════════════════════════════════════
// CASE STUDY CARDS — Canonical 1-12 Order for Portfolio Showcase
// Updated: December 2024
// ═══════════════════════════════════════════════════════════════════════════════

export type CaseStudyCard = {
  id: string;
  slug: string;
  title: string;
  client: string;
  subtitle: string;
  domain: string;
  services: string[];
  year: string;
  heroImage: string;
  delay: number;
  isPlaceholder?: boolean;
};

// ═══════════════════════════════════════════════════════════════════════════════
// CANONICAL ORDER (1-12)
// ═══════════════════════════════════════════════════════════════════════════════
// Pfizer / Colab (End-to-End Transformation Arc) — 1-4
// Abbott (Evaluation → Platform Enablement) — 5-6
// Major Enterprise Architecture Work — 7-9
// Technical Program Leadership — 10
// Cross-Sector Analytics & Harmonization — 11
// Mission-Driven / Humanitarian — 12
// ═══════════════════════════════════════════════════════════════════════════════

export const caseStudyCardsData: CaseStudyCard[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // 0. INTRO CARD — Christopher Mangun
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "intro",
    slug: "career-details-light",
    title: "Christopher Mangun",
    client: "AI/ML Field Deployed Engineer",
    subtitle: "15 Years Hardened Enablement for purpose market fit.",
    domain: "Healthcare · Life Sciences · Enterprise AI",
    services: ["RAG Systems", "ML Governance", "Technical Program Leadership"],
    year: "",
    heroImage: "",
    delay: 0,
    isPlaceholder: true,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. PFIZER — DIAGNOSTICS (Field-Embedded Engineer)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "pfizer",
    slug: "pfizer",
    title: "Field-Embedded Engineering",
    client: "Pfizer",
    subtitle: "Governed AI content engine that cut MLR cycles 42→14 days, tripled AI-assisted throughput, and saved $2M+ annually.",
    domain: "Data Strategy Enterprise Platform Planning",
    services: ["RAG Architecture", "MLR Workflow", "Azure OpenAI"],
    year: "2024",
    heroImage: "/assets/img/case-studies/_showcase/1Embedded_Pfizer.png",
    delay: 0.08,
    isPlaceholder: false,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. PFIZER — RAG SOLUTION ARCHITECT
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "colab",
    slug: "colab",
    title: "RAG Solution Architect",
    client: "Pfizer",
    subtitle: "Designed a cross-cloud knowledge engine using vector search, auto-labeling, and semantic pipelines for enterprise research teams.",
    domain: "RAG, embeddings, ontology, search infra",
    services: ["Vector Search", "Auto-labeling", "Semantic Pipelines"],
    year: "2024",
    heroImage: "/assets/img/case-studies/_showcase/Knowledge_Retreval.jpg",
    delay: 0.08,
    isPlaceholder: false,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. PFIZER — RAG CO-PILOT ENGINEER (Pipeline)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "pfizer-pipeline",
    slug: "pfizer-pipeline",
    title: "RAG Co-Pilot Engineer",
    client: "Pfizer",
    subtitle: "Production pipeline architecture for RAG systems with quality gates, evaluation harnesses, and continuous model improvement loops.",
    domain: "ML pipelines, evaluation, production systems",
    services: ["Pipeline Architecture", "Model Evaluation", "MLOps"],
    year: "2024",
    heroImage: "/assets/img/case-studies/_showcase/Technical_Program.jpg",
    delay: 0.16,
    isPlaceholder: false,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. PFIZER — COCO COMPANY COMPANION (Assistant)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "coco",
    slug: "coco",
    title: "CoCo Company Companion",
    client: "Pfizer",
    subtitle: "Enterprise AI assistant productization — from proof-of-concept to governed, scalable deployment across business units.",
    domain: "AI assistants, productization, enterprise deployment",
    services: ["AI Assistant", "Enterprise Scale", "Product Launch"],
    year: "2024",
    heroImage: "/assets/img/case-studies/_showcase/hero1.png",
    delay: 0.24,
    isPlaceholder: true,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. ABBOTT — BINAXNOW EVALUATION DATASET
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "binaxnow",
    slug: "binaxnow",
    title: "BinaxNOW Evaluation Dataset",
    client: "Abbott",
    subtitle: "Developed a controlled-quality evaluation dataset for low-cost diagnostics — ensuring consistency for FDA submissions.",
    domain: "Data QA, test kit evaluation, regulatory reproducibility",
    services: ["Data QA", "FDA Compliance", "Evaluation Design"],
    year: "2022",
    heroImage: "/assets/img/case-studies/_showcase/BInaxNow.jpg",
    delay: 0.32,
    isPlaceholder: false,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 6. ABBOTT — ALINITY PLATFORM
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "alinity",
    slug: "alinity",
    title: "Alinity Platform",
    client: "Abbott",
    subtitle: "Created a reliability and alerting engine for global diagnostic devices running in resource-constrained hospital environments.",
    domain: "Edge + cloud hybrid, clinical devices, uptime SLAs",
    services: ["Edge Computing", "Alerting Systems", "Reliability Engineering"],
    year: "2023",
    heroImage: "/assets/img/home-06/project/alinity.jpg",
    delay: 0.40,
    isPlaceholder: false,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 8. PUBLICIS HEALTH — ENTERPRISE ARCHITECTURE AT SCALE
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "publicis",
    slug: "publicis",
    title: "Enterprise Architecture at Scale",
    client: "Publicis Health",
    subtitle: "Unified 14 agency systems into a governed content supply-chain with identity, routing, and creative-to-MLR workflow alignment.",
    domain: "Multi-tenant architecture, SSO, workflow systems",
    services: ["System Unification", "Identity Management", "Workflow Design"],
    year: "2023",
    heroImage: "/assets/img/case-studies/_showcase/EnterpriseScale.jpg",
    delay: 0.56,
    isPlaceholder: false,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 9. NAKED HEART FOUNDATION — GLOBAL PLAYGROUND PROGRAM
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "nakedheart",
    slug: "nakedheart",
    title: "Global Playground Program",
    client: "Naked Heart Foundation",
    subtitle: "Built a data and recommendations platform supporting early-childhood programs & donor transparency.",
    domain: "Non-profit digital transformation, analytics, donor ops",
    services: ["Data Platform", "Analytics", "Donor Operations"],
    year: "2022",
    heroImage: "/assets/img/case-studies/_showcase/nakedheart.jpg",
    delay: 0.64,
    isPlaceholder: false,
  },
];

// Export count for UI purposes
export const caseStudyCount = caseStudyCardsData.length;

// Helper to get only live (non-placeholder) studies
export const liveCaseStudies = caseStudyCardsData.filter(c => !c.isPlaceholder);

// Canonical slug order for navigation
export const caseStudyOrder = caseStudyCardsData.map(c => c.slug);

// Get next case study in sequence
export function getNextCaseStudy(currentSlug: string): { slug: string; title: string } | undefined {
  const currentIndex = caseStudyOrder.indexOf(currentSlug);
  if (currentIndex === -1 || currentIndex === caseStudyOrder.length - 1) {
    // Loop back to first
    const first = caseStudyCardsData[0];
    return { slug: first.slug, title: first.title };
  }
  const next = caseStudyCardsData[currentIndex + 1];
  return { slug: next.slug, title: next.title };
}

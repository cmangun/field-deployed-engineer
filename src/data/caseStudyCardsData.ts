// ═══════════════════════════════════════════════════════════════════════════════
// CASE STUDY CARDS — Presentation layer for horizontal showcase
// All 12 case studies with placeholder data until individual studies are built
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

// All 12 case studies in display order
export const caseStudyCardsData: CaseStudyCard[] = [
  {
    id: "pfizer",
    slug: "pfizer",
    title: "Field-Embedded Engineering",
    client: "Pfizer",
    subtitle: "Governed AI content engine that cut MLR cycles 42→14 days, tripled AI-assisted throughput, and saved $2M+ annually.",
    domain: "Regulated pharma, MLR, RAG, CLM/CRM integration",
    services: ["RAG Architecture", "MLR Workflow", "Azure OpenAI"],
    year: "2024",
    heroImage: "/assets/img/case-studies/pfizer/hero.jpg",
    delay: 0,
    isPlaceholder: false,
  },
  {
    id: "colab",
    slug: "colab",
    title: "Retrieval & Knowledge Engineering",
    client: "Colab",
    subtitle: "Designed a cross-cloud knowledge engine using vector search, auto-labeling, and semantic pipelines for enterprise research teams.",
    domain: "RAG, embeddings, ontology, search infra",
    services: ["Vector Search", "Auto-labeling", "Semantic Pipelines"],
    year: "2024",
    heroImage: "/assets/img/case-studies/_showcase/Knowledge_Retreval.jpg",
    delay: 0.08,
    isPlaceholder: false,
  },
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
    delay: 0.16,
    isPlaceholder: false,
  },
  {
    id: "medtronic",
    slug: "medtronic",
    title: "LLM-Centered Architecture",
    client: "Medtronic",
    subtitle: "Built a surgical AI platform foundation—including spec-to-model traceability, model cards, and latency-bound inference pipelines.",
    domain: "Medical devices, real-time constraints, safety SLAs",
    services: ["Model Cards", "Inference Pipelines", "Safety SLAs"],
    year: "2024",
    heroImage: "/assets/img/home-06/project/medtronic.jpg",
    delay: 0.24,
    isPlaceholder: false,
  },
  {
    id: "abbott",
    slug: "abbott",
    title: "Responsible AI & Governance",
    client: "Abbott Labs",
    subtitle: "Implemented a compliance-by-design AI framework: bias testing, audit trails, drift detection, and regulated model lifecycle.",
    domain: "AI governance, safety, FDA compliance",
    services: ["Bias Testing", "Audit Trails", "Drift Detection"],
    year: "2024",
    heroImage: "/assets/img/home-06/project/abbott.jpg",
    delay: 0.32,
    isPlaceholder: false,
  },
  {
    id: "amgen",
    slug: "amgen",
    title: "Technical Program Leadership",
    client: "Amgen",
    subtitle: "Directed a multi-team, multi-cloud rollout of a scientific data platform with harmonized taxonomies and shared embedding stores.",
    domain: "Program leadership, data platforms, harmonized schemas",
    services: ["Program Leadership", "Data Platforms", "Taxonomy Design"],
    year: "2023",
    heroImage: "/assets/img/case-studies/_showcase/Technical_Program.jpg",
    delay: 0.40,
    isPlaceholder: false,
  },
  {
    id: "sanofi",
    slug: "sanofi",
    title: "Cross-Sector Communication",
    client: "Sanofi Global Vaccines",
    subtitle: "Built a global dashboard aligning R&D, supply, commercial, and safety signals into a unified decision center.",
    domain: "Multi-sector dashboards, KPIs, data harmonization",
    services: ["Dashboard Design", "KPI Framework", "Data Harmonization"],
    year: "2023",
    heroImage: "/assets/img/case-studies/_showcase/Sanofi.jpg",
    delay: 0.48,
    isPlaceholder: false,
  },
  {
    id: "alinity",
    slug: "alinity",
    title: "Systems for Mission Outcomes",
    client: "Abbott Alinity",
    subtitle: "Created a reliability and alerting engine for global diagnostic devices running in resource-constrained hospital environments.",
    domain: "Edge + cloud hybrid, clinical devices, uptime SLAs",
    services: ["Edge Computing", "Alerting Systems", "Reliability Engineering"],
    year: "2023",
    heroImage: "/assets/img/home-06/project/alinity.jpg",
    delay: 0.56,
    isPlaceholder: false,
  },
  {
    id: "binaxnow",
    slug: "binaxnow",
    title: "Eval Quality-Controlled Asset",
    client: "Abbott BinaxNOW",
    subtitle: "Developed a controlled-quality evaluation dataset for low-cost diagnostics — ensuring consistency for FDA submissions.",
    domain: "Data QA, test kit evaluation, regulatory reproducibility",
    services: ["Data QA", "FDA Compliance", "Evaluation Design"],
    year: "2022",
    heroImage: "/assets/img/case-studies/_showcase/BInaxNow.jpg",
    delay: 0.64,
    isPlaceholder: false,
  },
  {
    id: "lilly",
    slug: "lilly",
    title: "Regulated Portfolio Deployment",
    client: "Eli Lilly",
    subtitle: "Launched 20+ AI proof-of-concepts via an MLR-compliant sandbox that enabled faster approvals and safer experimentation.",
    domain: "Portfolio deployment, sandbox governance, rapid pilots",
    services: ["Sandbox Design", "Portfolio Management", "Rapid Prototyping"],
    year: "2023",
    heroImage: "/assets/img/case-studies/_showcase/lily.jpg",
    delay: 0.72,
    isPlaceholder: false,
  },
  {
    id: "ipg",
    slug: "ipg",
    title: "Sub-Portfolio Planning",
    client: "IPG Global Intranets",
    subtitle: "Designed an intranet-as-platform with modular features, shared UI components, and cross-client content governance.",
    domain: "Enterprise intranet, modular platforms, design systems",
    services: ["Platform Design", "Design Systems", "Content Governance"],
    year: "2022",
    heroImage: "/assets/img/home-06/project/publicis.jpg",
    delay: 0.80,
    isPlaceholder: false,
  },
  {
    id: "nakedheart",
    slug: "nakedheart",
    title: "Mission-Embedded Non-Profit",
    client: "Naked Heart Foundation",
    subtitle: "Built a data and recommendations platform supporting early-childhood programs & donor transparency.",
    domain: "Non-profit digital transformation, analytics, donor ops",
    services: ["Data Platform", "Analytics", "Donor Operations"],
    year: "2022",
    heroImage: "/assets/img/case-studies/_showcase/nakedheart.jpg",
    delay: 0.88,
    isPlaceholder: false,
  },
];

// Export count for UI purposes
export const caseStudyCount = caseStudyCardsData.length;

// Helper to get only live (non-placeholder) studies
export const liveCaseStudies = caseStudyCardsData.filter(c => !c.isPlaceholder);

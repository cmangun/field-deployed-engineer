// src/data/caseStudies/pfizer.normalized.ts
// ═══════════════════════════════════════════════════════════════════════════════
// PFIZER CASE STUDY — NORMALIZED (GOLD REFERENCE)
// CoCo – Pfizer Enterprise Copilot RAG
// ═══════════════════════════════════════════════════════════════════════════════

import type { NormalizedCaseStudy } from "./types";

export const pfizerNormalized: NormalizedCaseStudy = {
  slug: "pfizer",
  client: "Pfizer Vaccines Franchise (Paxlovid, Abrysvo, Comirnaty)",
  title: "CoCo – Pfizer Enterprise Copilot RAG",
  subtitle:
    "Reduced MLR review cycles by 65% (42 → 14 days), tripled throughput, and unlocked $2.08M annual savings by deploying a governed RAG platform over 20+ systems across Pfizer, IPG, and Publicis.",
  category: "Pharma · RAG · MLR Compliance · Enterprise AI",
  heroImage: "/assets/img/case-studies/_showcase/Sanofi 2.png",
  brandLogo: "/assets/img/logo/Pfizer_(2021).png",

  heroStats: [
    {
      id: "cycle-time",
      label: "MLR Cycle Time",
      value: "42 → 14 days",
      annotation: "-65%",
    },
    {
      id: "throughput",
      label: "Throughput",
      value: "272 → 816 assets/mo",
      annotation: "3×",
    },
    {
      id: "savings",
      label: "Annual Savings",
      value: "$2.08M",
      annotation: "annualized",
    },
    {
      id: "latency",
      label: "p95 Latency",
      value: "850 → 280 ms",
      annotation: "-67%",
    },
  ],

  sections: [
    {
      id: "diagnose",
      title: "Diagnose – Find the Real Constraint",
      eyebrow: "Phase 1 · 2 weeks",
      kpiFocus: "Review cycle time, revision rate, search time",
      decisionOwner: "Commercial Operations",
      summary:
        "A two-week diagnostic showed that 75% of delays occurred in search, retrieval, and version collisions, not reviewer headcount. Over 20 fragmented systems, regional content drift, and duplicated work created a structurally slow MLR pipeline and blocked any realistic AI deployment.",
      bullets: [
        "Mapped end-to-end vaccines content flow across three organizations.",
        "Measured search time, queue delays, and revision loops at each stage.",
        "Found that ~75% of delay clustered in Search & Retrieval and early MLR triage.",
        "Documented ~40% revision rate driven by version collisions and hard-to-find references.",
        "Established that 20+ disconnected systems blocked realistic AI/RAG enablement.",
      ],
      deliverables: [
        "MLR Cycle-Time Baseline",
        "Content Funnel & Bottleneck Analysis",
        "RACI Accountability Map (Pfizer/IPG/Publicis)",
        "AI/ML Risk Register",
      ],
      metrics: [
        { label: "Baseline Cycle Time", baseline: "42 days", outcome: "—", delta: "—" },
        { label: "Revision Rate", baseline: "40%", outcome: "—", delta: "—" },
        { label: "Avg Search Time", baseline: "25 min", outcome: "—", delta: "—" },
      ],
      chartKeys: ["FunnelChart", "RACIMatrix"],
    },
    {
      id: "architect",
      title: "Architect – Design a Governed RAG Platform",
      eyebrow: "Phase 2 · 2 weeks",
      kpiFocus: "Architecture sign-off, SLO definitions",
      decisionOwner: "Enterprise Architecture",
      summary:
        "CoCo was architected as a governed RAG engine sitting over Veeva Vault, SharePoint, Workfront, CLM, and Teams. Systems of record remained authoritative; CoCo provided a stateless orchestration layer for retrieval and drafting, with medical–promo separation, region-aware filters, and SLOs for accuracy, latency, and uptime.",
      bullets: [
        "Defined CoCo as a governed datasphere over Veeva, SharePoint, Workfront, CLM, and Teams.",
        "Separated systems of record from AI behavior via a stateless RAG layer.",
        "Embedded medical–promo separation and regional filters into retrieval and generation steps.",
        "Set SLOs for retrieval accuracy (>85%), p95 latency (<350 ms), and uptime (>99.7%).",
        "Produced C4 system-context diagrams and integration contracts across 5 core systems.",
      ],
      deliverables: [
        "C4 System Context Diagram",
        "RAG Pipeline Blueprint",
        "Integration & Data-Flow Contracts",
        "Architecture Decision Records (ADRs)",
      ],
      metrics: [
        { label: "Systems Integrated", baseline: "0", outcome: "5", delta: "+5" },
        { label: "Retrieval Accuracy SLO", baseline: "—", outcome: ">85%", delta: "—" },
        { label: "p95 Latency SLO", baseline: "—", outcome: "<350ms", delta: "—" },
      ],
      chartKeys: ["SystemContextDiagram", "RAGPipeline", "GanttChart"],
    },
    {
      id: "engineer",
      title: "Engineer – Build a Tier-1 AI Service",
      eyebrow: "Phase 3 · 3 weeks",
      kpiFocus: "p95 latency, uptime, error rate",
      decisionOwner: "Platform Engineering",
      summary:
        "The team implemented hybrid semantic + keyword search, hot-path caching, a single AI Content API, and full observability (latency, uptime, error rates). CoCo enforced MLR guardrails and recorded sentence-level lineage for every suggestion, reducing p95 latency from ~850 ms to ~280 ms with 99.7% uptime.",
      bullets: [
        "Implemented hybrid semantic + keyword retrieval tuned for vaccines content.",
        "Deployed caching to reduce p95 latency from ~850 ms to ~280 ms.",
        "Exposed a single AI Content API with role-aware and region-aware access.",
        "Logged full lineage (source → prompt → output) for every AI suggestion.",
        "Created service health dashboards and on-call runbooks for SLO breaches.",
      ],
      deliverables: [
        "Production RAG Pipeline",
        "AI Content API",
        "Service Health & Latency Dashboards",
        "Incident & On-Call Runbooks",
      ],
      metrics: [
        { label: "p95 Latency", baseline: "850 ms", outcome: "280 ms", delta: "-67%" },
        { label: "Uptime", baseline: "—", outcome: "99.7%", delta: "—" },
        { label: "Daily Requests", baseline: "0", outcome: "4,200", delta: "+4,200" },
      ],
      chartKeys: ["ServiceHealthDashboard", "LatencyPercentiles", "DataQualityScorecard", "ModelCard"],
    },
    {
      id: "enable",
      title: "Enable – Drive Adoption Across Pfizer, IPG, and Publicis",
      eyebrow: "Phase 4 · 3 weeks",
      kpiFocus: "User activation, satisfaction, training completion",
      decisionOwner: "Learning & Development",
      summary:
        "CoCo was embedded into existing tools (Teams, CLM) and re-framed as a companion rather than a separate app. Producer and MLR journeys were redesigned, 200+ users were trained with 94% completion, and satisfaction reached 4.2/5, making CoCo the default entry point for vaccines content work.",
      bullets: [
        "Embedded CoCo into Teams and CLM/CRM surfaces already used by vaccines teams.",
        "Redesigned the producer journey to include AI-assisted search and pre-review steps.",
        "Trained >200 users across Pfizer, IPG, and Publicis with 94% completion.",
        "Created power-user and MLR champion tracks to seed expertise.",
        "Monitored adoption and friction via org health dashboards and user telemetry.",
      ],
      deliverables: [
        "Producer Journey & UX Flows",
        "Training & Governance Playbook",
        "Org-Adoption & Health Dashboard",
      ],
      metrics: [
        { label: "Users Trained", baseline: "0", outcome: "200+", delta: "+200" },
        { label: "Training Completion", baseline: "—", outcome: "94%", delta: "—" },
        { label: "Satisfaction Score", baseline: "3.1/5", outcome: "4.2/5", delta: "+1.1" },
      ],
      chartKeys: ["CustomerJourneyMap", "OrgHealthDashboard"],
    },
    {
      id: "impact",
      title: "Impact – Platform, Not Project",
      eyebrow: "Phase 5 · 2 weeks",
      kpiFocus: "Cycle time, throughput, savings, expansion readiness",
      decisionOwner: "Product / Finance",
      summary:
        "CoCo reduced MLR cycle time from 42 to 14 days, tripled asset throughput, and unlocked $2.08M in annual savings. Data completeness rose to 96%, and the same architecture is now ready to scale into additional therapeutic areas, establishing CoCo as Pfizer's enterprise vaccines content backbone.",
      bullets: [
        "Reduced MLR review cycles from 42 → 14 days (-65%).",
        "Increased approved assets from 272 → 816 per month (3×).",
        "Realized $2.08M in annualized savings.",
        "Improved data completeness from ~72% → 96% with automated quality gates.",
        "Defined an expansion roadmap for 5+ additional therapeutic areas.",
      ],
      deliverables: [
        "ROI Waterfall & Savings Model",
        "Unit Economics Model",
        "Usage Seasonality & Capacity Planning",
        "Executive KPI Grid & Expansion Roadmap",
      ],
      metrics: [
        { label: "Cycle Time Reduction", baseline: "42 days", outcome: "14 days", delta: "-65%" },
        { label: "Throughput Increase", baseline: "272/mo", outcome: "816/mo", delta: "3×" },
        { label: "Annual Savings", baseline: "$0", outcome: "$2.08M", delta: "+$2.08M" },
      ],
      chartKeys: ["WaterfallChart", "UnitEconomics", "CalendarHeatmap", "SparklineGrid"],
    },
  ],

  nextCaseStudy: {
    slug: "abbott",
    title: "Abbott BinaxNOW Diagnostic Platform",
  },
};

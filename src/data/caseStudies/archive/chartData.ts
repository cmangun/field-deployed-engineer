/**
 * Case Study Chart Data - D3 Visualizations
 * 
 * Data organized by case study with chart-specific datasets
 * that tell the story of each engagement.
 */

// ============================================================
// TYPES
// ============================================================

export interface ChartCard {
  chart_id: number;
  name: string;
  stakeholder: string;
  description: string;
  data: any;
  insight: string;
  next_step: string;
  owner: string;
  impact: string;
  status: 'Approved' | 'Draft' | 'In Review';
}

export interface CaseStudyCharts {
  case_study: string;
  charts: ChartCard[];
}

export interface ArchitectureNode {
  id: string;
  label: string;
  layer: 'Edge' | 'Experience' | 'Integration' | 'Services' | 'Data' | 'ML' | 'Infra';
  domain: string;
  type: string;
  vendor?: string;
}

export interface ArchitectureEdge {
  source: string;
  target: string;
  protocol?: string;
  direction?: 'request' | 'event' | 'batch' | 'replication';
  description?: string;
}

export interface ArchitectureMap {
  case_study: string;
  architecture: {
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
  };
}

// ============================================================
// PFIZER - Field-Embedded Engineering
// ============================================================

export const pfizerChartData: CaseStudyCharts = {
  case_study: "Pfizer — Field-Embedded Engineering",
  charts: [
    {
      chart_id: 46,
      name: "Incident Timeline",
      stakeholder: "SRE",
      description: "War room chronology & metrics across CLM → CRM → Field devices.",
      data: [
        { timestamp: "2024-09-03T09:05Z", system: "CLM", event: "Asset delivery latency spike", severity: 3 },
        { timestamp: "2024-09-03T09:17Z", system: "Salesforce", event: "Sync backlog > 15k records", severity: 4 },
        { timestamp: "2024-09-03T09:32Z", system: "Field iPad", event: "Rep app offline mode triggered", severity: 4 },
        { timestamp: "2024-09-03T10:06Z", system: "Integration Hub", event: "Rollback to last known good config", severity: 2 },
        { timestamp: "2024-09-03T10:41Z", system: "All", event: "Error rate returns to baseline", severity: 1 }
      ],
      insight: "Single integration change at the hub drove downstream failure across CLM, CRM, and field devices.",
      next_step: "Require change tickets and rollback plans for all integration-hub config updates.",
      owner: "@Pfizer SRE Lead",
      impact: "Reduced incident frequency and MTTR",
      status: "Approved"
    },
    {
      chart_id: 31,
      name: "Service Health Dashboard",
      stakeholder: "CTO",
      description: "End-to-end health for CLM, CRM, and Integration Hub before/after FDE engagement.",
      data: [
        { week: "2024-W32", service: "CLM", p95_ms: 820, error_rate: 0.018, uptime: 0.982 },
        { week: "2024-W32", service: "Salesforce", p95_ms: 610, error_rate: 0.011, uptime: 0.987 },
        { week: "2024-W38", service: "CLM", p95_ms: 410, error_rate: 0.006, uptime: 0.997 },
        { week: "2024-W38", service: "Salesforce", p95_ms: 330, error_rate: 0.003, uptime: 0.999 },
        { week: "2024-W38", service: "Integration Hub", p95_ms: 280, error_rate: 0.002, uptime: 0.999 }
      ],
      insight: "FDE refactor cut p95 latency ~50% and error rates by two-thirds across the end-to-end field stack.",
      next_step: "Lock revised SLOs into Pfizer's CLM/CRM operations runbook.",
      owner: "@Pfizer Digital Engineering",
      impact: "Stable field rep experience in live HCP visits",
      status: "Approved"
    },
    {
      chart_id: 26,
      name: "Data Lineage DAG",
      stakeholder: "DataEng",
      description: "End-to-end lineage from CLM content to Salesforce activity to reporting warehouse.",
      data: [
        { source: "CLM_Asset", target: "CLM_Player", value: 1 },
        { source: "CLM_Player", target: "Integration_Hub", value: 1 },
        { source: "Integration_Hub", target: "Salesforce_Activity", value: 1 },
        { source: "Salesforce_Activity", target: "Data_Lake_Bronze", value: 1 },
        { source: "Data_Lake_Bronze", target: "Data_Lake_Silver", value: 1 },
        { source: "Data_Lake_Silver", target: "Field_Insights_Mart", value: 1 }
      ],
      insight: "Previously undocumented hops between CLM and CRM explain gaps in field analytics.",
      next_step: "Register the Pfizer CLM→CRM lineage in the enterprise catalog and enforce schema contracts.",
      owner: "@Pfizer Data Governance",
      impact: "Trustworthy HCP engagement analytics",
      status: "Approved"
    },
    {
      chart_id: 29,
      name: "ML Pipeline",
      stakeholder: "CTO",
      description: "Pipeline for next-best-action models using CLM+CRM engagement history.",
      data: [
        { stage: "Ingestion", latency_min: 45, failure_rate: 0.02 },
        { stage: "Feature_Engineering", latency_min: 15, failure_rate: 0.005 },
        { stage: "Training", latency_min: 120, failure_rate: 0.01 },
        { stage: "Validation", latency_min: 25, failure_rate: 0.003 },
        { stage: "Deployment", latency_min: 10, failure_rate: 0.0 }
      ],
      insight: "Training and ingestion are the critical-path stages for model iteration throughput.",
      next_step: "Introduce incremental feature refresh and scheduled overnight training windows.",
      owner: "@Pfizer AI Platform",
      impact: "Faster iteration on field-rep recommendation models",
      status: "In Review"
    },
    {
      chart_id: 49,
      name: "Opportunity Cost",
      stakeholder: "Product",
      description: "Trade-off between incremental FDE investment vs status quo on field systems.",
      data: [
        { option: "Status Quo", three_year_cost_usd: 0, lost_revenue_usd: 18500000 },
        { option: "FDE Remediation + Platform Upgrade", three_year_cost_usd: 2600000, lost_revenue_usd: 3500000 }
      ],
      insight: "Not funding field-system remediation effectively 'spends' ~18.5M in lost opportunity.",
      next_step: "Frame the FDE engagement as a 3-year option value with explicit avoided-loss scenarios.",
      owner: "@Pfizer Commercial Finance",
      impact: "Capital-efficient decision to fund modernization",
      status: "Approved"
    }
  ]
};

// ============================================================
// COLAB - Retrieval & Knowledge Engineering
// ============================================================

export const colabChartData: CaseStudyCharts = {
  case_study: "Colab — Retrieval & Knowledge Engineering",
  charts: [
    {
      chart_id: 30,
      name: "RAG Pipeline",
      stakeholder: "CTO",
      description: "Latency decomposition for Colab's knowledge assistant across pipeline stages.",
      data: [
        { stage: "QueryParsing", avg_ms: 9, p95_ms: 14 },
        { stage: "VectorSearch", avg_ms: 32, p95_ms: 55 },
        { stage: "Rerank", avg_ms: 18, p95_ms: 31 },
        { stage: "LLM_Generation", avg_ms: 210, p95_ms: 340 }
      ],
      insight: "LLM generation dominates latency; retrieval stack is already sub-60ms p95.",
      next_step: "Experiment with smaller instruction-tuned models and caching for frequent intents.",
      owner: "@Colab AI Platform",
      impact: "Sub-second responses for knowledge queries",
      status: "Approved"
    },
    {
      chart_id: 84,
      name: "Embedding Projector",
      stakeholder: "MLEng",
      description: "SOP, Policy, and FAQ documents projected into 2D clusters.",
      data: [
        { id: "SOP_Clinical_001", x: -2.3, y: 4.1, cluster: "SOP" },
        { id: "SOP_Quality_014", x: -2.0, y: 4.4, cluster: "SOP" },
        { id: "Policy_Privacy_003", x: 3.9, y: -1.8, cluster: "Policy" },
        { id: "FAQ_Colab_UI", x: 0.4, y: -3.2, cluster: "FAQ" },
        { id: "FAQ_Governance", x: 0.8, y: -2.7, cluster: "FAQ" }
      ],
      insight: "Pre-FDE, SOPs and policies overlapped significantly; retriever often pulled wrong doc type.",
      next_step: "Segment vectors by doc_type and index into separate namespaces with routing logic.",
      owner: "@Knowledge Engineering",
      impact: "Higher precision in regulated document retrieval",
      status: "Approved"
    },
    {
      chart_id: 50,
      name: "Latency Percentiles",
      stakeholder: "SRE",
      description: "End-user request latency before and after RAG pipeline optimization.",
      data: [
        { date: "2024-10-01", scenario: "Before", p50_ms: 920, p95_ms: 1780, p99_ms: 2450 },
        { date: "2024-11-01", scenario: "After", p50_ms: 460, p95_ms: 880, p99_ms: 1310 }
      ],
      insight: "Pipeline changes halved median and tail latencies for complex queries.",
      next_step: "Lock SLOs at p95 < 1s and add regression alerts on p99 latency.",
      owner: "@Colab SRE",
      impact: "Consistent UX for knowledge workers under load",
      status: "Approved"
    },
    {
      chart_id: 61,
      name: "LLM Evaluation",
      stakeholder: "CTO",
      description: "Comparison of candidate LLMs for Colab assistant on pharma knowledge tasks.",
      data: [
        { model: "LLM_A", exact_match: 0.71, hallucination_rate: 0.09, latency_ms: 310, usd_per_1k: 0.0042 },
        { model: "LLM_B", exact_match: 0.76, hallucination_rate: 0.06, latency_ms: 390, usd_per_1k: 0.0075 },
        { model: "LLM_C", exact_match: 0.69, hallucination_rate: 0.04, latency_ms: 210, usd_per_1k: 0.0031 }
      ],
      insight: "Model B is most accurate but significantly more expensive; Model C is cheapest and fastest but less precise.",
      next_step: "Adopt tiered routing: default to Model C with fallback to Model B on high-risk queries.",
      owner: "@Colab AI Lead",
      impact: "Balanced cost, accuracy, and latency for enterprise search",
      status: "In Review"
    },
    {
      chart_id: 87,
      name: "Confusion Matrix",
      stakeholder: "MLEng",
      description: "Classification of user intent into 'Policy', 'SOP', 'FAQ', and 'Other'.",
      data: {
        labels: ["Policy", "SOP", "FAQ", "Other"],
        matrix: [
          [182, 7, 8, 3],
          [11, 201, 9, 5],
          [4, 5, 176, 6],
          [6, 3, 5, 149]
        ]
      },
      insight: "Most confusion occurs between Policy and SOP, matching what SMEs reported in interviews.",
      next_step: "Refine intent prompts with explicit regulatory vs procedural cues.",
      owner: "@Intent Modelling Team",
      impact: "Higher recall for the correct knowledge type",
      status: "Approved"
    }
  ]
};

// ============================================================
// PUBLICIS HEALTH - Enterprise Architecture at Scale
// ============================================================

export const publicisChartData: CaseStudyCharts = {
  case_study: "Publicis Health — Enterprise Architecture at Scale",
  charts: [
    {
      chart_id: 57,
      name: "System Context (C4)",
      stakeholder: "Architect",
      description: "Context diagram for the global intranet and content services across agencies.",
      data: [
        { source: "Agency_User", target: "Global_Intranet", value: 1 },
        { source: "Global_Intranet", target: "Identity_Provider", value: 1 },
        { source: "Global_Intranet", target: "Content_CMS", value: 1 },
        { source: "Global_Intranet", target: "Analytics_Platform", value: 1 }
      ],
      insight: "The intranet acts as the single front door into identity, content, and analytics for all agencies.",
      next_step: "Codify C4 context and container diagrams as the canonical architecture reference.",
      owner: "@Publicis Architecture Office",
      impact: "Shared mental model across engineering and business",
      status: "Approved"
    },
    {
      chart_id: 34,
      name: "Event-Driven Architecture",
      stakeholder: "Architect",
      description: "Kafka topics bridging CMS events into downstream personalization and reporting.",
      data: [
        { source: "Content_CMS", target: "kafka.content.published", value: 1 },
        { source: "Global_Intranet", target: "kafka.user.activity", value: 1 },
        { source: "kafka.content.published", target: "Personalization_Service", value: 1 },
        { source: "kafka.user.activity", target: "Analytics_Platform", value: 1 }
      ],
      insight: "Moving from cron-based polling to event streams removes hours of latency from content rollouts.",
      next_step: "Standardize event schemas and retention policies for all intranet topics.",
      owner: "@Platform Engineering",
      impact: "Near-real-time content activation across brands",
      status: "In Review"
    },
    {
      chart_id: 36,
      name: "Microservices Communication",
      stakeholder: "Architect",
      description: "Synchronous vs asynchronous calls between intranet microservices.",
      data: [
        { source: "Intranet_Gateway", target: "Profile_Service", pattern: "sync" },
        { source: "Intranet_Gateway", target: "Search_Service", pattern: "sync" },
        { source: "Profile_Service", target: "Notification_Service", pattern: "async" },
        { source: "Search_Service", target: "Analytics_Platform", pattern: "async" }
      ],
      insight: "Search and analytics workloads are well-decoupled; profile updates remain on synchronous paths.",
      next_step: "Introduce async patterns for non-critical profile updates to harden availability.",
      owner: "@Publicis Platform Team",
      impact: "Better resilience under high traffic",
      status: "Draft"
    },
    {
      chart_id: 28,
      name: "Technology Radar",
      stakeholder: "CTO",
      description: "Adoption posture for key technologies across the Publicis intranet program.",
      data: [
        { tech: "Next.js", quadrant: "Web Frameworks", ring: "Adopt" },
        { tech: "Kafka", quadrant: "Data & Messaging", ring: "Adopt" },
        { tech: "GraphQL", quadrant: "APIs", ring: "Trial" },
        { tech: "Service Mesh", quadrant: "Platform", ring: "Assess" }
      ],
      insight: "Core technologies for the intranet are firmly in 'Adopt', with a clear runway for GraphQL and service mesh.",
      next_step: "Commit to deprecating legacy CMS frameworks within 18 months.",
      owner: "@Publicis CTO Office",
      impact: "Reduced fragmentation and tech sprawl",
      status: "Approved"
    },
    {
      chart_id: 54,
      name: "Business Model Canvas",
      stakeholder: "CEO",
      description: "Canvas linking the unified intranet to revenue, cost, and client experience.",
      data: {
        value_props: ["One login across agencies", "Faster campaign execution", "Consistent compliance"],
        customer_segments: ["Agency leadership", "Creative teams", "Account teams"],
        channels: ["Intranet web", "Mobile access"],
        revenue_streams: ["Retainer uplift", "Operational efficiency"],
        cost_structure: ["Platform engineering", "Cloud infrastructure"]
      },
      insight: "The intranet is not just an IT asset; it directly supports billable campaign speed and compliance.",
      next_step: "Tie intranet KPIs to client delivery SLAs and account renewals.",
      owner: "@Publicis Business Operations",
      impact: "Clear ROI narrative for platform investment",
      status: "Approved"
    }
  ]
};

// ============================================================
// MEDTRONIC - LLM-Centered Architecture
// ============================================================

export const medtronicChartData: CaseStudyCharts = {
  case_study: "Medtronic — LLM-Centered Architecture",
  charts: [
    {
      chart_id: 56,
      name: "ML Model Card",
      stakeholder: "CTO",
      description: "Clinical summarization LLM used by Medtronic nurses for device logs.",
      data: {
        model_name: "Med-LLM-v3",
        task: "Device log summarization for triage",
        accuracy_macro_f1: 0.94,
        latency_p95_ms: 260,
        usd_per_1k_tokens: 0.004,
        limitations: [
          "Not validated for diagnostic decisions",
          "Under-represented training data for pediatrics"
        ]
      },
      insight: "Model is strong for adult triage summaries but must be explicitly constrained away from diagnostics.",
      next_step: "Publish the model card in the Medtronic model registry and reference it in SOPs.",
      owner: "@Medtronic Clinical AI",
      impact: "Regulator-ready documentation",
      status: "Approved"
    },
    {
      chart_id: 62,
      name: "Security Posture",
      stakeholder: "CISO",
      description: "Security scorecard for LLM deployment in the device support environment.",
      data: [
        { dimension: "Authentication", score: 95 },
        { dimension: "Encryption in Transit", score: 92 },
        { dimension: "Encryption at Rest", score: 89 },
        { dimension: "PHI Data Minimization", score: 83 }
      ],
      insight: "Data minimization controls lag behind other security dimensions.",
      next_step: "Implement PHI redaction and structured logging before prompts reach the LLM.",
      owner: "@Medtronic Security",
      impact: "Lower regulatory and breach risk",
      status: "In Review"
    },
    {
      chart_id: 94,
      name: "Fairness Metrics",
      stakeholder: "CTO",
      description: "Group-wise performance of triage summarization across demographics.",
      data: [
        { group: "Adult_Male", precision: 0.93, recall: 0.95 },
        { group: "Adult_Female", precision: 0.92, recall: 0.94 },
        { group: "65_plus", precision: 0.90, recall: 0.93 }
      ],
      insight: "No major disparity across adult cohorts, with a mild dip in the 65+ group.",
      next_step: "Collect targeted samples for 65+ devices and re-tune with bias constraints.",
      owner: "@Medtronic Clinical Analytics",
      impact: "Safer performance across populations",
      status: "Draft"
    },
    {
      chart_id: 93,
      name: "Model Registry",
      stakeholder: "MLEng",
      description: "Versioned history of Med-LLM deployments into clinical operations.",
      data: [
        { version: "Med-LLM-v1", deployed_at: "2024-05-01", status: "Retired" },
        { version: "Med-LLM-v2", deployed_at: "2024-08-15", status: "Shadow" },
        { version: "Med-LLM-v3", deployed_at: "2024-11-05", status: "Production" }
      ],
      insight: "Shadow deployment of v2 allowed safe A/B against v1 before promoting v3.",
      next_step: "Formalize 'shadow → canary → full' promotion policy for all clinical models.",
      owner: "@Medtronic MLOps",
      impact: "Controlled evolution of clinical ML",
      status: "Approved"
    }
  ]
};

// ============================================================
// ABBOTT LABS - Responsible AI & Governance
// ============================================================

export const abbottChartData: CaseStudyCharts = {
  case_study: "Abbott Labs — Responsible AI & Governance",
  charts: [
    {
      chart_id: 65,
      name: "Risk Register",
      stakeholder: "CEO",
      description: "Key AI risks in diagnostic workflows, with likelihood and impact.",
      data: [
        { risk: "Incorrect triage suggestion", probability: 0.25, impact: 0.9 },
        { risk: "PHI leakage via logs", probability: 0.15, impact: 0.95 },
        { risk: "Model drift on new test kits", probability: 0.35, impact: 0.8 }
      ],
      insight: "Clinical mis-triage and PHI leakage dominate the risk surface.",
      next_step: "Tie each high-risk item to specific controls in SOPs and system design.",
      owner: "@Abbott AI Governance",
      impact: "Auditable AI risk posture",
      status: "Approved"
    },
    {
      chart_id: 62,
      name: "Security Posture",
      stakeholder: "CISO",
      description: "Security scoring focused on AI-powered diagnostic services.",
      data: [
        { dimension: "Access Control", score: 90 },
        { dimension: "Data Retention", score: 78 },
        { dimension: "Third-party Integrations", score: 82 }
      ],
      insight: "Data retention policies are weaker than access controls and integrations.",
      next_step: "Shorten retention for raw prompts and enforce tokenization for identifiers.",
      owner: "@Abbott Security",
      impact: "Compliance with HIPAA and internal policies",
      status: "In Review"
    },
    {
      chart_id: 67,
      name: "RACI Matrix",
      stakeholder: "Product",
      description: "Role clarity for AI feature lifecycle across Abbott diagnostics.",
      data: [
        { task: "Model design", R: "Data Science", A: "AI Lead", C: "Clinical SMEs", I: "Quality" },
        { task: "Deployment to devices", R: "DevOps", A: "Platform Owner", C: "Security", I: "Regulatory" },
        { task: "Post-market surveillance", R: "Quality", A: "Regulatory Affairs", C: "Support", I: "Exec Sponsor" }
      ],
      insight: "Before RACI, responsibilities for surveillance were split across three teams with gaps.",
      next_step: "Embed the AI RACI in Abbott's QMS documentation.",
      owner: "@Abbott Quality",
      impact: "No orphaned responsibilities for AI in production",
      status: "Approved"
    },
    {
      chart_id: 58,
      name: "OKR Tracker",
      stakeholder: "CEO",
      description: "Governance OKRs for AI in diagnostics.",
      data: [
        { objective: "Zero critical PHI incidents", key_result: "Number of PHI leak incidents", progress: 0.85 },
        { objective: "Auditable AI decisions", key_result: "Coverage of decision logging for AI features", progress: 0.73 }
      ],
      insight: "Incident-free performance is strong; logging coverage still has room to improve.",
      next_step: "Target 95%+ decision logging coverage in the next governance cycle.",
      owner: "@Abbott Governance PMO",
      impact: "Continuous improvement in AI oversight",
      status: "Draft"
    }
  ]
};

// ============================================================
// AMGEN - Technical Program Leadership
// ============================================================

export const amgenChartData: CaseStudyCharts = {
  case_study: "Amgen — Technical Program Leadership",
  charts: [
    {
      chart_id: 15,
      name: "Gantt Chart",
      stakeholder: "Product",
      description: "Program phases for rolling out an AI-enabled medical content platform.",
      data: [
        { task: "Requirements & Risk Assessment", start: "2024-04-01", end: "2024-04-30", progress: 1.0 },
        { task: "Architecture & Design", start: "2024-05-01", end: "2024-05-31", progress: 1.0 },
        { task: "Build & Integrations", start: "2024-06-01", end: "2024-08-15", progress: 0.6 },
        { task: "Pilot with Medical Affairs", start: "2024-08-16", end: "2024-09-30", progress: 0.15 }
      ],
      insight: "Critical path runs through integrations into existing Amgen approval workflows.",
      next_step: "Front-load integration risk via early test environments and mock services.",
      owner: "@Amgen Program PMO",
      impact: "On-time go-live for medical content AI",
      status: "In Review"
    },
    {
      chart_id: 37,
      name: "Drug Launch Roadmap",
      stakeholder: "Pharma",
      description: "Mapping Amgen AI program milestones to drug launch phases.",
      data: [
        { phase: "Phase II Readout", start: "2024-03-01", end: "2024-09-30" },
        { phase: "Phase III Trials", start: "2024-10-01", end: "2025-12-31" },
        { phase: "NDA Submission", start: "2026-01-01", end: "2026-03-31" }
      ],
      insight: "Content and AI systems must be ready ahead of Phase III communication demands.",
      next_step: "Align AI-enabled content workflows with Phase III data disclosure timelines.",
      owner: "@Amgen Medical Affairs",
      impact: "Coordinated AI and clinical timelines",
      status: "Draft"
    },
    {
      chart_id: 64,
      name: "Runway Calculator",
      stakeholder: "CFO",
      description: "Budget runway for Amgen AI platform under different cost scenarios.",
      data: [
        { month: "2024-04", cash_on_hand_usd: 1500000, monthly_burn_usd: 210000 },
        { month: "2024-05", cash_on_hand_usd: 1290000, monthly_burn_usd: 210000 },
        { month: "2024-06", cash_on_hand_usd: 1080000, monthly_burn_usd: 210000 }
      ],
      insight: "At current burn, AI platform budget runs ~7 months without incremental funding.",
      next_step: "Secure extension funding tied to Phase III milestones or scope down non-critical features.",
      owner: "@Amgen Finance Lead",
      impact: "Financially sustainable delivery plan",
      status: "Approved"
    }
  ]
};

// ============================================================
// SANOFI - Cross-Sector Communication
// ============================================================

export const sanofiChartData: CaseStudyCharts = {
  case_study: "Sanofi Global Vaccines — Cross-Sector Communication",
  charts: [
    {
      chart_id: 55,
      name: "Customer Journey Map",
      stakeholder: "Product",
      description: "Global journey from awareness to advocacy for HCPs in vaccine programs.",
      data: [
        { stage: "Awareness", touchpoints: ["Medical email", "Rep visit"], avg_emotion: 0.62 },
        { stage: "Education", touchpoints: ["Webinar", "Clinical brief"], avg_emotion: 0.71 },
        { stage: "Adoption", touchpoints: ["EHR prompts", "Order portal"], avg_emotion: 0.78 },
        { stage: "Advocacy", touchpoints: ["Peer talks", "Advisory boards"], avg_emotion: 0.84 }
      ],
      insight: "Emotion and engagement rise steadily once HCPs reach structured education.",
      next_step: "Invest in earlier, clearer education paths to move HCPs out of 'Awareness' faster.",
      owner: "@Sanofi Global Marketing",
      impact: "Higher and faster vaccine adoption",
      status: "Approved"
    },
    {
      chart_id: 27,
      name: "Cohort Heatmap",
      stakeholder: "Product",
      description: "HCP retention by cohort across quarters after AI-assisted engagement rollout.",
      data: [
        { cohort: "2024-Q1-rollout", month1: 0.81, month2: 0.73, month3: 0.69 },
        { cohort: "2024-Q2-rollout", month1: 0.86, month2: 0.78, month3: 0.74 }
      ],
      insight: "Later cohorts retain better, reflecting improved onboarding and messaging.",
      next_step: "Backport successful Q2 playbooks to Q1 regions.",
      owner: "@Sanofi Engagement Ops",
      impact: "Sustained HCP engagement across markets",
      status: "In Review"
    },
    {
      chart_id: 28,
      name: "Technology Radar",
      stakeholder: "CTO",
      description: "Sanofi's adoption stance for AI communication tools.",
      data: [
        { tech: "AI Email Personalization", quadrant: "Engagement", ring: "Adopt" },
        { tech: "Voice-based HCP Assistants", quadrant: "Field Tools", ring: "Trial" },
        { tech: "In-EHR Agents", quadrant: "Clinical Integration", ring: "Assess" }
      ],
      insight: "Core personalization is mature; in-EHR AI is at the exploration stage.",
      next_step: "Pilot in-EHR assistants in a single region with strong HCP partnership.",
      owner: "@Sanofi Digital Health",
      impact: "Embedded AI in clinical workflows",
      status: "Draft"
    }
  ]
};

// ============================================================
// ABBOTT ALINITY - Systems for Mission Outcomes
// ============================================================

export const abbottAlinityChartData: CaseStudyCharts = {
  case_study: "Abbott Alinity — Systems for Mission Outcomes",
  charts: [
    {
      chart_id: 45,
      name: "Error Budget Tracker",
      stakeholder: "SRE",
      description: "Alinity instrument availability vs SLO over a quarter.",
      data: [
        { week: "2024-W20", slo: 0.995, achieved: 0.988, burned_budget_pct: 40 },
        { week: "2024-W21", slo: 0.995, achieved: 0.991, burned_budget_pct: 60 },
        { week: "2024-W22", slo: 0.995, achieved: 0.997, burned_budget_pct: 55 }
      ],
      insight: "Early-week incidents nearly exhausted the error budget before FDE stability work.",
      next_step: "Tie deployment windows to error-budget status, pausing risky changes when budget is tight.",
      owner: "@Abbott Alinity SRE",
      impact: "Higher diagnostic system uptime",
      status: "Approved"
    },
    {
      chart_id: 51,
      name: "Queue Depth Monitor",
      stakeholder: "SRE",
      description: "Sample backlog for Alinity analyzers during peak mornings.",
      data: [
        { timestamp: "2024-06-10T07:00Z", queue_depth: 930 },
        { timestamp: "2024-06-10T07:30Z", queue_depth: 640 },
        { timestamp: "2024-06-10T08:00Z", queue_depth: 280 },
        { timestamp: "2024-06-10T08:30Z", queue_depth: 140 }
      ],
      insight: "Pre-FDE, early-morning spikes created multi-hour sample delays.",
      next_step: "Introduce priority scheduling and capacity planning for peak lab windows.",
      owner: "@Abbott Lab Ops",
      impact: "Faster turnaround for critical tests",
      status: "In Review"
    },
    {
      chart_id: 47,
      name: "Deployment Heatmap",
      stakeholder: "DevOps",
      description: "Alinity instrument software versions across regions.",
      data: [
        { region: "US", version: "v3.4.1", status: "green" },
        { region: "EU", version: "v3.3.8", status: "yellow" },
        { region: "LATAM", version: "v3.2.5", status: "red" }
      ],
      insight: "LATAM is two versions behind and experiences most of the incidents.",
      next_step: "Accelerate rollout of v3.4.x to lagging regions with extra validation.",
      owner: "@Abbott Alinity Release Mgmt",
      impact: "Global parity in diagnostic reliability",
      status: "Draft"
    }
  ]
};

// ============================================================
// ABBOTT BINAXNOW - QC & Evaluations
// ============================================================

export const abbottBinaxChartData: CaseStudyCharts = {
  case_study: "Abbott BinaxNOW — Evaluation & Quality-Controlled Asset Pipeline",
  charts: [
    {
      chart_id: 71,
      name: "Pipeline Waterfall",
      stakeholder: "Sales",
      description: "BinaxNOW digital asset pipeline from concept to approved field materials.",
      data: [
        { stage: "Concept", count: 112 },
        { stage: "Medical Review", count: 89 },
        { stage: "Regulatory Review", count: 67 },
        { stage: "Localized", count: 52 },
        { stage: "Approved for Field", count: 38 }
      ],
      insight: "Greatest drop-off occurs between concept and medical review.",
      next_step: "Codify high-yield patterns in concepts that pass medical review and use templates.",
      owner: "@Abbott Medical Comms",
      impact: "Higher throughput of field-ready assets",
      status: "Approved"
    },
    {
      chart_id: 70,
      name: "Hypercare Dashboard",
      stakeholder: "Product",
      description: "Post-launch issues for BinaxNOW digital support tools.",
      data: [
        { day: "2024-09-01", total_bugs: 18, sev1: 2, sev2: 5, sev3: 11 },
        { day: "2024-09-07", total_bugs: 9, sev1: 0, sev2: 2, sev3: 7 },
        { day: "2024-09-14", total_bugs: 4, sev1: 0, sev2: 1, sev3: 3 }
      ],
      insight: "Sev1/Sev2 issues trend down rapidly within two weeks after launch.",
      next_step: "Shorten formal hypercare window from 6 weeks to 4 for similar launches.",
      owner: "@Abbott Product Ops",
      impact: "Predictable, safe post-launch lifecycle",
      status: "Approved"
    }
  ]
};

// ============================================================
// ELI LILLY - Regulated Portfolio Deployment
// ============================================================

export const lillyChartData: CaseStudyCharts = {
  case_study: "Eli Lilly — Regulated Portfolio Deployment",
  charts: [
    {
      chart_id: 38,
      name: "Label Day Readiness",
      stakeholder: "Pharma",
      description: "Workstream checklist readiness ahead of label day.",
      data: [
        { workstream: "Regulatory Docs", percent_complete: 84 },
        { workstream: "EHR Order Sets", percent_complete: 63 },
        { workstream: "Field Training", percent_complete: 72 },
        { workstream: "Digital Assets", percent_complete: 69 }
      ],
      insight: "EHR order sets and digital assets lag behind regulatory documentation.",
      next_step: "Apply FDE capacity to unblock EHR and digital workstreams first.",
      owner: "@Lilly Launch PMO",
      impact: "On-time, coherent label-day launch",
      status: "In Review"
    },
    {
      chart_id: 42,
      name: "Competitive Launch Timeline",
      stakeholder: "Pharma",
      description: "Lilly launch schedule vs competitor molecules in the same class.",
      data: [
        { drug: "Lilly-XXX", phase: "Phase III Complete", date: "2025-06-01" },
        { drug: "Competitor-A", phase: "Phase III Complete", date: "2025-10-01" },
        { drug: "Competitor-B", phase: "Phase II", date: "2025-12-01" }
      ],
      insight: "Lilly is first to complete Phase III, with a ~4-month lead.",
      next_step: "Use AI-enabled launch infrastructure to fully exploit first-mover advantage.",
      owner: "@Lilly Commercial Strategy",
      impact: "Maximized window of market leadership",
      status: "Approved"
    }
  ]
};

// ============================================================
// IPG GLOBAL INTRANETS - Sub-Portfolio Planning
// ============================================================

export const ipgChartData: CaseStudyCharts = {
  case_study: "IPG Global Intranets — Sub-Portfolio Planning",
  charts: [
    {
      chart_id: 54,
      name: "Business Model Canvas",
      stakeholder: "CEO",
      description: "Canvas comparing current fragmented intranets vs unified global platform.",
      data: {
        current_pain_points: ["Multiple logins", "Duplicated content", "Inconsistent compliance"],
        value_props: ["Single front door", "Consistent governance", "Shared components"],
        customer_segments: ["Agency leaders", "Project managers"],
        channels: ["Global intranet", "SSO"],
        revenue_streams: ["Reduced IT cost", "Faster launches"]
      },
      insight: "The unified intranet clearly shifts value from siloed IT teams to reusable capabilities.",
      next_step: "Align each agency's roadmap to the global platform value props.",
      owner: "@IPG Transformation Office",
      impact: "Reduced cost and launch friction",
      status: "Approved"
    },
    {
      chart_id: 49,
      name: "Opportunity Cost",
      stakeholder: "Product",
      description: "Comparison of continuing multi-intranet support vs consolidating.",
      data: [
        { option: "Maintain 12 intranets", three_year_cost_usd: 9600000, expected_benefit_index: 0.4 },
        { option: "Consolidate to 1 platform", three_year_cost_usd: 5600000, expected_benefit_index: 0.8 }
      ],
      insight: "Consolidation saves ~4M over three years while doubling benefit index.",
      next_step: "Use these numbers as the baseline business case for consolidation.",
      owner: "@IPG Finance & IT",
      impact: "Capex and opex savings",
      status: "Approved"
    }
  ]
};

// ============================================================
// NAKED HEART FOUNDATION - Mission-Embedded Non-Profit
// ============================================================

export const nakedHeartChartData: CaseStudyCharts = {
  case_study: "Naked Heart Foundation — Mission-Embedded Non-Profit",
  charts: [
    {
      chart_id: 55,
      name: "Customer Journey Map",
      stakeholder: "Product",
      description: "Donor and volunteer journey from first contact to long-term advocacy.",
      data: [
        { stage: "Discover", touchpoints: ["Instagram", "Press article"], avg_emotion: 0.7 },
        { stage: "Donate Once", touchpoints: ["Donation form", "Thank-you email"], avg_emotion: 0.82 },
        { stage: "Recurring Supporter", touchpoints: ["Impact updates", "Community events"], avg_emotion: 0.88 },
        { stage: "Advocate", touchpoints: ["Peer campaigns", "Speaking events"], avg_emotion: 0.93 }
      ],
      insight: "Emotion and connection rise sharply once recurring support begins.",
      next_step: "Design onboarding that nudges one-time donors toward recurring support within 30 days.",
      owner: "@NakedHeart Community",
      impact: "More stable mission funding",
      status: "Approved"
    },
    {
      chart_id: 14,
      name: "Funnel Chart",
      stakeholder: "Product",
      description: "Awareness-to-program funnel for a flagship initiative.",
      data: [
        { stage: "Reached", value: 48000 },
        { stage: "Site Visits", value: 21000 },
        { stage: "Donations", value: 6200 },
        { stage: "Program Participants", value: 3100 }
      ],
      insight: "Conversion from visit to donation is strong; reach to visit remains the biggest gap.",
      next_step: "Improve social and referral campaigns that move people from awareness to site visits.",
      owner: "@NakedHeart Growth",
      impact: "Higher impact per campaign",
      status: "In Review"
    },
    {
      chart_id: 77,
      name: "Org Health Dashboard",
      stakeholder: "HR",
      description: "Team and volunteer health metrics.",
      data: [
        { metric: "Staff eNPS", value: 52 },
        { metric: "Volunteer Retention %", value: 78 },
        { metric: "Annual Churn %", value: 14 }
      ],
      insight: "Volunteer retention is strong while staff engagement has room to improve.",
      next_step: "Introduce regular reflection sessions linking staff work to visible mission outcomes.",
      owner: "@NakedHeart HR",
      impact: "More resilient mission team",
      status: "Draft"
    },
    {
      chart_id: 58,
      name: "OKR Tracker",
      stakeholder: "CEO",
      description: "Mission OKRs for the current year.",
      data: [
        { objective: "Expand access to therapy services", key_result: "Children reached", target: 5000, current: 3100 },
        { objective: "Grow recurring donor base", key_result: "Active recurring donors", target: 2500, current: 1650 }
      ],
      insight: "Both mission reach and recurring donor growth are tracking positively but behind stretch goals.",
      next_step: "Plan a mid-year campaign specifically targeted at recurring donor conversion.",
      owner: "@NakedHeart Executive Director",
      impact: "Alignment of funding with mission delivery",
      status: "In Review"
    },
    {
      chart_id: 65,
      name: "Risk Register",
      stakeholder: "CEO",
      description: "Key operational and funding risks for the foundation.",
      data: [
        { risk: "Single large-donor dependency", probability: 0.3, impact: 0.9 },
        { risk: "Program interruption due to regulatory changes", probability: 0.2, impact: 0.8 },
        { risk: "Volunteer burnout", probability: 0.4, impact: 0.6 }
      ],
      insight: "Over-reliance on a single donor is the highest-impact risk.",
      next_step: "Diversify the donor base and set a target share for top-3 donors.",
      owner: "@NakedHeart Board",
      impact: "Long-term mission stability",
      status: "Approved"
    }
  ]
};

// ============================================================
// ARCHITECTURE MAPS
// ============================================================

export const architectureMaps: ArchitectureMap[] = [
  {
    case_study: "Pfizer — Field-Embedded Engineering",
    architecture: {
      nodes: [
        { id: "field_ipad", label: "Field iPad App", layer: "Edge", domain: "Field Engagement", type: "device" },
        { id: "veeva_clm", label: "Veeva CLM Player", layer: "Experience", domain: "Field Engagement", type: "service", vendor: "Veeva" },
        { id: "integration_hub", label: "Integration Hub", layer: "Integration", domain: "Middleware", type: "service" },
        { id: "salesforce_crm", label: "Salesforce CRM", layer: "Services", domain: "CRM", type: "service", vendor: "Salesforce" },
        { id: "activity_stream", label: "Activity Event Stream", layer: "Integration", domain: "Events", type: "queue", vendor: "Kafka" },
        { id: "datalake_bronze", label: "Data Lake – Bronze", layer: "Data", domain: "Analytics", type: "db", vendor: "S3" },
        { id: "datalake_silver", label: "Data Lake – Silver", layer: "Data", domain: "Analytics", type: "db", vendor: "Delta Lake" },
        { id: "field_mart", label: "Field Insights Mart", layer: "Data", domain: "Analytics", type: "db" },
        { id: "nba_service", label: "Next-Best-Action Service", layer: "ML", domain: "AI Services", type: "service" }
      ],
      edges: [
        { source: "field_ipad", target: "veeva_clm", protocol: "HTTPS", direction: "request", description: "Rep launches approved content in CLM player" },
        { source: "veeva_clm", target: "integration_hub", protocol: "HTTPS", direction: "request", description: "CLM call-backs with HCP engagement events" },
        { source: "integration_hub", target: "salesforce_crm", protocol: "HTTPS", direction: "request", description: "Create / update CRM activity records" },
        { source: "integration_hub", target: "activity_stream", protocol: "Kafka", direction: "event", description: "Emit normalized engagement events" },
        { source: "salesforce_crm", target: "activity_stream", protocol: "Kafka", direction: "event", description: "Emit CRM events (tasks, calls, emails)" },
        { source: "activity_stream", target: "datalake_bronze", protocol: "Kafka", direction: "batch", description: "Stream ingestion into raw zone" },
        { source: "datalake_bronze", target: "datalake_silver", protocol: "ETL", direction: "batch", description: "Cleansed + conformed engagement tables" },
        { source: "datalake_silver", target: "field_mart", protocol: "ETL", direction: "batch", description: "Aggregated field-rep performance views" },
        { source: "field_mart", target: "nba_service", protocol: "JDBC", direction: "request", description: "Feature reads for NBA model scoring" },
        { source: "nba_service", target: "field_ipad", protocol: "HTTPS", direction: "request", description: "Next-best-action recommendations to rep app" }
      ]
    }
  },
  {
    case_study: "Publicis / IPG — Global Intranet & Content Platform",
    architecture: {
      nodes: [
        { id: "agency_user", label: "Agency User", layer: "Edge", domain: "Agencies", type: "user" },
        { id: "global_intranet_ui", label: "Global Intranet UI", layer: "Experience", domain: "Intranet", type: "service" },
        { id: "api_gateway", label: "API Gateway", layer: "Integration", domain: "Platform", type: "service" },
        { id: "identity_provider", label: "Identity Provider (SSO)", layer: "Services", domain: "Security", type: "service" },
        { id: "content_cms", label: "Headless CMS", layer: "Services", domain: "Content", type: "service" },
        { id: "search_service", label: "Search Service", layer: "Services", domain: "Search", type: "service" },
        { id: "personalization_service", label: "Personalization Service", layer: "Services", domain: "Experience", type: "service" },
        { id: "kafka_content", label: "kafka.content.published", layer: "Integration", domain: "Events", type: "queue", vendor: "Kafka" },
        { id: "kafka_activity", label: "kafka.user.activity", layer: "Integration", domain: "Events", type: "queue", vendor: "Kafka" },
        { id: "analytics_dw", label: "Analytics Warehouse", layer: "Data", domain: "Analytics", type: "db" }
      ],
      edges: [
        { source: "agency_user", target: "global_intranet_ui", protocol: "HTTPS", direction: "request", description: "User logs in to global intranet" },
        { source: "global_intranet_ui", target: "api_gateway", protocol: "HTTPS", direction: "request", description: "All UI calls via unified gateway" },
        { source: "api_gateway", target: "identity_provider", protocol: "OIDC", direction: "request", description: "SSO and token issuance" },
        { source: "api_gateway", target: "content_cms", protocol: "HTTPS", direction: "request", description: "Fetch structured page + asset data" },
        { source: "api_gateway", target: "search_service", protocol: "HTTPS", direction: "request", description: "Federated search queries" },
        { source: "api_gateway", target: "personalization_service", protocol: "HTTPS", direction: "request", description: "Contextual content recommendations" },
        { source: "content_cms", target: "kafka_content", protocol: "Kafka", direction: "event", description: "Content published/updated events" },
        { source: "global_intranet_ui", target: "kafka_activity", protocol: "Kafka", direction: "event", description: "User activity events (search, nav, clicks)" },
        { source: "kafka_content", target: "analytics_dw", protocol: "ETL", direction: "batch", description: "Content lifecycle facts" },
        { source: "kafka_activity", target: "analytics_dw", protocol: "ETL", direction: "batch", description: "User behaviour facts" },
        { source: "analytics_dw", target: "personalization_service", protocol: "JDBC", direction: "request", description: "Feature store for personalization models" }
      ]
    }
  },
  {
    case_study: "Clinical AI Platform — Medtronic / Abbott / Lilly Pattern",
    architecture: {
      nodes: [
        { id: "nurse_portal", label: "Nurse Portal", layer: "Experience", domain: "Clinical Ops", type: "service" },
        { id: "device_console", label: "Device Console UI", layer: "Experience", domain: "Devices", type: "service" },
        { id: "api_orchestrator", label: "API Orchestrator", layer: "Integration", domain: "Platform", type: "service" },
        { id: "auth_service", label: "Auth / RBAC Service", layer: "Services", domain: "Security", type: "service" },
        { id: "triage_llm", label: "Triage LLM API", layer: "ML", domain: "AI Services", type: "service" },
        { id: "rules_engine", label: "Clinical Rules Engine", layer: "Services", domain: "Decision", type: "service" },
        { id: "event_bus", label: "Clinical Event Bus", layer: "Integration", domain: "Events", type: "queue" },
        { id: "ehr_adapter", label: "EHR Adapter", layer: "Integration", domain: "EHR", type: "service" },
        { id: "logs_lake_bronze", label: "Logs Lake – Bronze", layer: "Data", domain: "Observability", type: "db" },
        { id: "clinical_dw", label: "Clinical Data Warehouse", layer: "Data", domain: "Analytics", type: "db" },
        { id: "model_registry", label: "Model Registry", layer: "ML", domain: "MLOps", type: "service" }
      ],
      edges: [
        { source: "nurse_portal", target: "api_orchestrator", protocol: "HTTPS", direction: "request", description: "Nurse submits device logs / symptoms" },
        { source: "device_console", target: "api_orchestrator", protocol: "HTTPS", direction: "request", description: "Device events forwarded to AI platform" },
        { source: "api_orchestrator", target: "auth_service", protocol: "HTTPS", direction: "request", description: "Check clinical role and permissions" },
        { source: "api_orchestrator", target: "triage_llm", protocol: "HTTPS", direction: "request", description: "Call LLM for natural-language triage summary" },
        { source: "api_orchestrator", target: "rules_engine", protocol: "HTTPS", direction: "request", description: "Apply deterministic clinical rules on LLM output" },
        { source: "rules_engine", target: "event_bus", protocol: "Kafka", direction: "event", description: "Emit triage_decision events" },
        { source: "event_bus", target: "ehr_adapter", protocol: "Kafka", direction: "event", description: "Push decisions into EHR system" },
        { source: "event_bus", target: "logs_lake_bronze", protocol: "ETL", direction: "batch", description: "Raw decision and prompt logs" },
        { source: "logs_lake_bronze", target: "clinical_dw", protocol: "ETL", direction: "batch", description: "Cleaned clinical AI telemetry" },
        { source: "model_registry", target: "triage_llm", protocol: "gRPC", direction: "request", description: "Load correct version of triage model" }
      ]
    }
  },
  {
    case_study: "Colab — RAG / Knowledge Assistant",
    architecture: {
      nodes: [
        { id: "knowledge_worker", label: "Knowledge Worker UI", layer: "Experience", domain: "Colab", type: "service" },
        { id: "assistant_gateway", label: "Assistant Gateway", layer: "Integration", domain: "Platform", type: "service" },
        { id: "intent_classifier", label: "Intent Classifier", layer: "ML", domain: "NLP", type: "service" },
        { id: "retriever", label: "Vector Retriever", layer: "ML", domain: "Search", type: "service" },
        { id: "reranker", label: "Reranker", layer: "ML", domain: "Search", type: "service" },
        { id: "llm_backend", label: "LLM Backend", layer: "ML", domain: "Generation", type: "service" },
        { id: "policy_guard", label: "Policy Guardrail Service", layer: "Services", domain: "Governance", type: "service" },
        { id: "doc_store", label: "Document Store", layer: "Data", domain: "Content", type: "db" },
        { id: "vector_index", label: "Vector Index", layer: "Data", domain: "Content", type: "db" },
        { id: "feedback_store", label: "User Feedback Store", layer: "Data", domain: "Quality", type: "db" }
      ],
      edges: [
        { source: "knowledge_worker", target: "assistant_gateway", protocol: "HTTPS", direction: "request", description: "User query sent to assistant" },
        { source: "assistant_gateway", target: "intent_classifier", protocol: "HTTPS", direction: "request", description: "Classify query as SOP / Policy / FAQ / Other" },
        { source: "assistant_gateway", target: "retriever", protocol: "HTTPS", direction: "request", description: "Retrieve top-K docs from vector index" },
        { source: "retriever", target: "vector_index", protocol: "gRPC", direction: "request", description: "ANN search on embeddings" },
        { source: "retriever", target: "reranker", protocol: "HTTPS", direction: "request", description: "Pass candidate docs for reranking" },
        { source: "reranker", target: "llm_backend", protocol: "HTTPS", direction: "request", description: "Send compact context + query for answer generation" },
        { source: "llm_backend", target: "policy_guard", protocol: "HTTPS", direction: "request", description: "Run answer through safety / compliance checks" },
        { source: "policy_guard", target: "assistant_gateway", protocol: "HTTPS", direction: "request", description: "Return permitted answer + redaction flags" },
        { source: "knowledge_worker", target: "feedback_store", protocol: "HTTPS", direction: "request", description: "Thumbs up/down + corrections" },
        { source: "feedback_store", target: "intent_classifier", protocol: "ETL", direction: "batch", description: "Offline retraining dataset for intents" },
        { source: "feedback_store", target: "retriever", protocol: "ETL", direction: "batch", description: "Signal for re-weighting docs and embeddings" }
      ]
    }
  }
];

// ============================================================
// ALL CASE STUDIES COMBINED
// ============================================================

export const allCaseStudyCharts: CaseStudyCharts[] = [
  pfizerChartData,
  colabChartData,
  publicisChartData,
  medtronicChartData,
  abbottChartData,
  amgenChartData,
  sanofiChartData,
  abbottAlinityChartData,
  abbottBinaxChartData,
  lillyChartData,
  ipgChartData,
  nakedHeartChartData
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

export const getCaseStudyCharts = (caseStudyName: string): CaseStudyCharts | undefined => {
  return allCaseStudyCharts.find(cs => 
    cs.case_study.toLowerCase().includes(caseStudyName.toLowerCase())
  );
};

export const getChartById = (chartId: number): ChartCard | undefined => {
  for (const cs of allCaseStudyCharts) {
    const chart = cs.charts.find(c => c.chart_id === chartId);
    if (chart) return chart;
  }
  return undefined;
};

export const getArchitectureMap = (caseStudyName: string): ArchitectureMap | undefined => {
  return architectureMaps.find(am => 
    am.case_study.toLowerCase().includes(caseStudyName.toLowerCase())
  );
};

export default {
  allCaseStudyCharts,
  architectureMaps,
  getCaseStudyCharts,
  getChartById,
  getArchitectureMap
};

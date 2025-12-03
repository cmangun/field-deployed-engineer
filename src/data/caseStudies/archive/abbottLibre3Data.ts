// src/data/caseStudies/abbottLibre3Data.ts
// ═══════════════════════════════════════════════════════════════════════════════
// Abbott Libre CASE STUDY — NARRATIVE + CHART DATA
// ═══════════════════════════════════════════════════════════════════════════════

import type { 
  CaseStudyData, 
  CaseStudyCharts,
  SystemContextData,
  JourneyMapData,
  DataQualityData 
} from '@/types/caseStudy';
import { chartColors } from '@/charts_D3/colors';

// ═══════════════════════════════════════════════════════════════════════════════
// NARRATIVE DATA (CaseStudyData)
// ═══════════════════════════════════════════════════════════════════════════════
export const abbottLibre3Data = {
  slug: "abbott-libre3",
  title: "Abbott FreeStyle Libre 3 — Real-Time Sensor Failure Detection & Trust Architecture",
  subtitle: "Medical Device AI Under FDA, Clinical, and Global Trust Constraints",
  heroImage: "/images/case-studies/abbott-libre3.png",

  overview: {
    client: "Abbott Diabetes Care",
    industry: "Medical Devices • Continuous Glucose Monitoring (CGM)",
    duration: "6 Months",
    fdeRole:
      "Forward-Deployed Engineer embedding AI trust architecture into a globally distributed CGM platform with life-critical implications.",

    problemStatement:
      "Libre 3 sensors operate in life-critical contexts where AI predictions influence insulin dosing decisions. Patients experience anxiety from false alarms, clinicians require transparent override protocols, and regulators mandate explainable AI with full traceability.",

    mission:
      "Design, deploy, and validate a multi-stakeholder trust framework across patients, clinicians, and regulators to ensure safe, transparent, globally compliant sensor failure detection."
  },

  phases: [
    // -----------------------------
    // PHASE 1 — DISCOVER
    // -----------------------------
    {
      phase: "PHASE I — DISCOVER",
      heading: "Root-Cause Mapping Across Patients, Providers & Global Regulators",
      content: [
        "The discovery process surfaced that trust—not prediction accuracy alone—was the limiting factor in clinical adoption. Patients feared false positives. Providers needed clinical context. Regulators required transparent, explainable AI across 47 countries.",
        "Analysis revealed the three dominant failure drivers: glucose signal anomalies, communication instability, and temperature irregularities—all needing patient-friendly context."
      ],
      bullets: [
        "Mapped patient anxiety responses and behavioral trust patterns",
        "Analyzed global regulatory differences in AI/ML explainability",
        "Reverse-engineered sensor failure pathways across telemetry & glucose patterns",
        "Identified bottlenecks in clinical override workflows",
        "Validated need for a multi-layer trust trajectory model"
      ]
    },

    // -----------------------------
    // PHASE 2 — DEFINE
    // -----------------------------
    {
      phase: "PHASE II — DEFINE",
      heading: "Life-Critical Trust Requirements for a CGM AI System",
      content: [
        "Abbott required a trust framework that could scale across patient experience levels, clinical workflows, and FDA expectations.",
        "The team defined trust specifications in four dimensions: patient clarity, clinician oversight, regulatory transparency, and operational traceability."
      ],
      bullets: [
        "Explainability model: patient-friendly + clinician-grade + FDA-compliant",
        "Confidence calibration tuned by patient anxiety level",
        "Human-in-the-loop escalation rules based on risk profile",
        "Clinical context injection (HbA1c, hypoglycemia risk, recent accuracy)",
        "Audit trail structure linking model version → prediction → outcome"
      ]
    },

    // -----------------------------
    // PHASE 3 — DESIGN / ARCHITECT
    // -----------------------------
    {
      phase: "PHASE III — ARCHITECT",
      heading: "Multi-Stakeholder Trust Architecture & Explainable AI Layer",
      content: [
        "Designed the unified Trust Engine powering patient alerts, clinician dashboards, and regulatory audit trails. Each signal passing through the system produced three parallel explanations: plain English for patients, clinical rationale for providers, and structured evidence for the FDA.",
        "Personalized alerting thresholds reduced anxiety-driven false positives without compromising safety."
      ],
      bullets: [
        "Patient-Facing Trust Interface (plain-language causal factors + confidence)",
        "Clinician Decision Support Dashboard (risk implications, override options)",
        "Regulatory Explainability Engine (feature importance, decision boundary, confidence intervals)",
        "Risk-tiered intervention protocols for pregnancy, hypoglycemia history, gastroparesis",
        "Global trust adaptation profiles across 47 national markets"
      ]
    },

    // -----------------------------
    // PHASE 4 — ACTIVATE
    // -----------------------------
    {
      phase: "PHASE IV — ACTIVATE",
      heading: "Real-World Deployment With Human-in-the-Loop Oversight",
      content: [
        "The trust architecture activated across live patients, clinicians, and Abbott operational teams. The AI system produced hybrid alerts—automated where confidence was high, escalated to specialists where uncertainty required human review.",
        "High-risk cohorts (e.g., pregnancy) triggered stricter thresholds and mandatory clinician involvement."
      ],
      bullets: [
        "Launched confidence-calibrated patient alerts across global markets",
        "Integrated clinician override protocols and evidence packs",
        "Activated FDA-compliant model traceability and bias monitoring",
        "Implemented patient feedback loops for continuous trust scoring",
        "Established 2-hour clinician escalation SLA for high-risk cases"
      ]
    },

    // -----------------------------
    // PHASE 5 — OUTCOMES
    // -----------------------------
    {
      phase: "PHASE V — OUTCOMES",
      heading: "Validated Trust, Safety, Clinical Adoption & Regulatory Compliance",
      content: [
        "End-to-end trust framework improved patient comprehension, reduced unnecessary replacements, and increased clinician confidence. Regulators accepted the explainability packet globally.",
        "Trust building accelerated from 30 days to 14 days on average."
      ],
      bullets: [
        "94.2% prediction accuracy in real-world validation",
        "87% patient trust satisfaction in alert clarity",
        "8% false positive rate after confidence calibration",
        "Zero missed emergencies across monitored cohorts",
        "12% clinician override rate signaled stable acceptance",
        "47-country approval of explainable AI architecture"
      ]
    }
  ],

  metrics: {
    highlights: [
      { label: "Prediction Accuracy", value: "94.2%" },
      { label: "Patient Satisfaction", value: "87%" },
      { label: "False Positives", value: "8%" },
      { label: "Trust Adoption Time", value: "14 days" },
      { label: "Clinician Override Rate", value: "12%" },
      { label: "Global Regulatory Approvals", value: "47" }
    ]
  },

  charts: [
    {
      id: "trustTrajectory",
      title: "Patient Trust Trajectory (0→90 Days)",
      type: "line",
      description: "Tracks trust evolution across early skepticism, learning phase, and steady state.",
      dataKey: "trust",
      data: [
        { day: 0, trust: 0.12 },
        { day: 14, trust: 0.62 },
        { day: 30, trust: 0.78 },
        { day: 60, trust: 0.88 },
        { day: 90, trust: 0.91 }
      ]
    },
    {
      id: "falseAlarmReduction",
      title: "False Positive Reduction After Personalization",
      type: "bar",
      dataKey: "rate",
      description:
        "Impact of anxiety-sensitive thresholding on false alerts.",
      data: [
        { cohort: "Before", rate: 0.21 },
        { cohort: "After", rate: 0.08 }
      ]
    },
    {
      id: "globalAdoption",
      title: "Clinical & Regulatory Adoption",
      type: "bar",
      dataKey: "value",
      description: "Global rollout of explainable AI across markets.",
      data: [
        { category: "Countries", value: 47 },
        { category: "Clinics", value: 3100 },
        { category: "Patients", value: 180000 }
      ]
    }
  ]
};

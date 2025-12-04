// ═══════════════════════════════════════════════════════════════════════════════
// MENU ITEMS — Canonical Case Study Order
// Updated: December 2024
// ═══════════════════════════════════════════════════════════════════════════════

interface CaseStudyItem {
    brand: string;
    role: string;
    description: string;
    href: string;
}

interface MenuItem {
    title: string;
    href: string;
    subItems?: MenuItem[];
    caseStudies?: CaseStudyItem[];
    static?: boolean;
}

const menuItemsTwo: MenuItem[] = [
    {
        title: "Case Studies",
        href: "#",
        static: true,
        caseStudies: [
            // ─────────────────────────────────────────────────────────────
            // PFIZER / COLAB (End-to-End Transformation Arc) — 1-4
            // ─────────────────────────────────────────────────────────────
            {
                brand: "Pfizer",
                role: "Field-Embedded Engineering",
                description: "Governed AI content engine that cut MLR cycles 42→14 days, tripled AI-assisted throughput.",
                href: "/case-study/pfizer"
            },
            {
                brand: "Pfizer",
                role: "RAG Solution Architect",
                description: "Cross-cloud knowledge engine using vector search, auto-labeling, and semantic pipelines.",
                href: "/case-study/colab"
            },
            {
                brand: "Pfizer",
                role: "RAG Co-Pilot Engineer",
                description: "Production pipeline architecture for RAG systems with quality gates and evaluation harnesses.",
                href: "/case-study/pfizer-pipeline"
            },
            {
                brand: "Pfizer",
                role: "CoCo Company Companion",
                description: "Enterprise AI assistant productization — from POC to governed, scalable deployment.",
                href: "/case-study/coco"
            },

            // ─────────────────────────────────────────────────────────────
            // ABBOTT (Evaluation → Platform Enablement) — 5-6
            // ─────────────────────────────────────────────────────────────
            {
                brand: "Abbott",
                role: "BinaxNOW Evaluation Dataset",
                description: "Controlled-quality evaluation dataset for low-cost diagnostics ensuring FDA submission consistency.",
                href: "/case-study/binaxnow"
            },
            {
                brand: "Abbott",
                role: "Alinity Platform",
                description: "Reliability and alerting engine for global diagnostic devices in resource-constrained environments.",
                href: "/case-study/alinity"
            },

            // ─────────────────────────────────────────────────────────────
            // ENTERPRISE ARCHITECTURE — 7
            // ─────────────────────────────────────────────────────────────
            {
                brand: "Publicis Health",
                role: "Enterprise Architecture at Scale",
                description: "Unified 14 agency systems into governed content supply-chain with identity and workflow alignment.",
                href: "/case-study/publicis"
            },

            // ─────────────────────────────────────────────────────────────
            // MISSION-DRIVEN / HUMANITARIAN — 8
            // ─────────────────────────────────────────────────────────────
            {
                brand: "Naked Heart Foundation",
                role: "Global Playground Program",
                description: "Data and recommendations platform supporting early-childhood programs & donor transparency.",
                href: "/case-study/nakedheart"
            },
        ],
    },
];

export default menuItemsTwo;

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
            // PFIZER — Field-Embedded Engineering
            // ─────────────────────────────────────────────────────────────
            {
                brand: "Pfizer",
                role: "Field-Embedded Engineering",
                description: "Governed AI content engine that cut MLR cycles 42→14 days, tripled AI-assisted throughput.",
                href: "/case-study/pfizer"
            },

            // ─────────────────────────────────────────────────────────────
            // ABBOTT (Evaluation → Platform Enablement)
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
            // ENTERPRISE ARCHITECTURE
            // ─────────────────────────────────────────────────────────────
            {
                brand: "Publicis Health",
                role: "Enterprise Architecture at Scale",
                description: "Unified 14 agency systems into governed content supply-chain with identity and workflow alignment.",
                href: "/case-study/publicis"
            },

            // ─────────────────────────────────────────────────────────────
            // MISSION-DRIVEN / HUMANITARIAN
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

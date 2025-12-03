// Define menu data
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
            {
                brand: "Pfizer",
                role: "Field-Embedded Engineering",
                description: "Engineering AI workflows that accelerated content supply operations and integrated OpenAI systems into high-stakes brand pipelines.",
                href: "/case-study/pfizer"
            },
            {
                brand: "Colab",
                role: "Retrieval & Knowledge Engineering",
                description: "Designed and deployed an internal AI search assistant using OpenAI + SharePoint with Glean-style semantic indexing.",
                href: "/case-study/colab"
            },
            {
                brand: "Publicis",
                role: "Enterprise Architecture at Scale",
                description: "Architected a multi-brand RAG ecosystem across SharePoint/Teams and Azure ML, reducing review cycles by 35%.",
                href: "/case-study/publicis"
            },
            {
                brand: "Medtronic",
                role: "LLM-Centered Architecture",
                description: "Led architecture for an LLM-driven decision-support system within regulated workflows with clinical-grade reliability.",
                href: "/case-study/medtronic"
            },
            {
                brand: "Abbott",
                role: "Responsible AI & Governance",
                description: "Engineered HIPAA-compliant data planes and audit-ready ML pipelines for global diagnostics with zero audit findings.",
                href: "/case-study/abbott"
            },
            {
                brand: "Amgen",
                role: "Technical Program Leadership",
                description: "Directed AI-enabled product launches and cross-functional engineering streams for Biosimilars and Repatha.",
                href: "/case-study/amgen"
            },
            {
                brand: "Sanofi",
                role: "Cross-Sector Communication",
                description: "Unified technical, medical, and commercial stakeholders across seven global vaccine brands.",
                href: "/case-study/sanofi"
            },
            {
                brand: "Alinity",
                role: "Systems for Mission Outcomes",
                description: "Deployed real-time data ingestion and ML-readiness pipelines across 30,000+ diagnostic systems.",
                href: "/case-study/alinity"
            },
            {
                brand: "BinaxNOW",
                role: "Eval-Controlled LLM Asset",
                description: "Built evaluation-driven NLP/LLM pipelines establishing continuous validation loops and boosting retrieval efficiency by 65%.",
                href: "/case-study/binaxnow"
            },
            {
                brand: "Eli Lilly",
                role: "Regulated Portfolio Deployment",
                description: "Managed large-scale technical deployments and Veeva/Salesforce governance ensuring compliant data flows.",
                href: "/case-study/lilly"
            },
            {
                brand: "IPG Global",
                role: "Sub-Portfolio Planning",
                description: "Architected global intranet and knowledge systems creating single-source-of-truth environments.",
                href: "/case-study/ipg"
            },
            {
                brand: "NHF",
                role: "Mission-Embedded Non-Profit",
                description: "Built the foundation's first global digital platform with multi-currency, tax-compliant donation infrastructure.",
                href: "/case-study/nakedheart"
            },
        ],
    },
];

export default menuItemsTwo;

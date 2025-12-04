import { MenuItem } from "@/types/menu-d-t";

const portfolioMenuData: MenuItem[] = [
  {
    id: 1,
    hasDropdown: true,
    active: true,
    megaMenu: true,
    children: true,
    title: "Case Studies",
    pluseIncon: true,
    link: "#",
    submenus: [
      {
        title: "Diagnose",
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Pfizer", role: "CEO Strike Force Discovery", link: "/case-study/pfizer#diagnose", description: "Embedded with CEO special projects team to map content workflows and identify AI automation opportunities.", image: "/assets/img/home-06/project/Embedded.jpg" },
          { title: "Colab", role: "Knowledge Landscape Discovery", link: "/case-study/colab#diagnose", description: "Mapped 12+ knowledge repositories across enterprise to identify search friction and source-of-truth gaps.", image: "/assets/img/home-06/project/colab.jpg" },
          { title: "Abbott", role: "Diagnostic Workflow Mapping", link: "/case-study/abbott#diagnose", description: "Mapped diagnostic device data flows across 30,000+ systems to identify ML-readiness gaps.", image: "/assets/img/home-06/project/abbott.jpg" },
          { title: "Publicis", role: "Enterprise Systems Audit", link: "/case-study/publicis#diagnose", description: "Audited 14 agency systems to identify integration gaps and content supply chain bottlenecks.", image: "/assets/img/home-06/project/publicishealth.jpg" },
          { title: "Naked Heart", role: "Foundation Needs Assessment", link: "/case-study/nakedheart#diagnose", description: "Mapped early-childhood program data flows and donor transparency requirements.", image: "/assets/img/home-06/project/nakedheart.jpg" },
        ]
      },
      {
        title: "Architect",
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Pfizer", role: "AI Content Pipeline Design", link: "/case-study/pfizer#architect", description: "Designed OpenAI + SharePoint architecture with MLR-compliant guardrails for content operations.", image: "/assets/img/home-06/project/Embedded.jpg" },
          { title: "Colab", role: "RAG Knowledge Engine Design", link: "/case-study/colab#architect", description: "Designed governed RAG layer over SharePoint, Confluence, and S3 with ontology-based auto-labeling.", image: "/assets/img/home-06/project/colab.jpg" },
          { title: "Abbott", role: "30K Device Architecture", link: "/case-study/abbott#architect", description: "Architected real-time data ingestion and ML pipelines across global diagnostic device network.", image: "/assets/img/home-06/project/abbott.jpg" },
          { title: "Publicis", role: "Unified Content Supply Chain", link: "/case-study/publicis#architect", description: "Designed multi-tenant architecture with SSO, routing, and creative-to-MLR workflow alignment.", image: "/assets/img/home-06/project/publicishealth.jpg" },
          { title: "Naked Heart", role: "Donation Platform Design", link: "/case-study/nakedheart#architect", description: "Designed multi-currency, tax-compliant donation infrastructure with analytics layer.", image: "/assets/img/home-06/project/nakedheart.jpg" },
        ]
      },
      {
        title: "Engineer",
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Pfizer", role: "RAG + SharePoint Build", link: "/case-study/pfizer#engineer", description: "Built RAG pipeline with SharePoint integration, reducing content review cycles by 65%.", image: "/assets/img/home-06/project/Embedded.jpg" },
          { title: "Colab", role: "Hybrid Search Pipeline", link: "/case-study/colab#engineer", description: "Built production RAG pipeline with hybrid search, 480ms p95 latency, and 95%+ citation coverage.", image: "/assets/img/home-06/project/colab.jpg" },
          { title: "Abbott", role: "BinaxNOW NLP Pipeline", link: "/case-study/abbott#engineer", description: "Engineered evaluation-driven NLP/LLM pipelines with continuous validation loops.", image: "/assets/img/home-06/project/abbott.jpg" },
          { title: "Publicis", role: "Identity & Workflow Platform", link: "/case-study/publicis#engineer", description: "Built unified identity management and workflow routing across 14 agency systems.", image: "/assets/img/home-06/project/publicishealth.jpg" },
          { title: "Naked Heart", role: "Global Platform Build", link: "/case-study/nakedheart#engineer", description: "Built first global digital platform with multi-currency donation processing.", image: "/assets/img/home-06/project/nakedheart.jpg" },
        ]
      },
      {
        title: "Enable",
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Pfizer", role: "Team Playbooks & Training", link: "/case-study/pfizer#enable", description: "Created governance playbooks and trained 200+ users on AI-powered content workflows.", image: "/assets/img/home-06/project/Embedded.jpg" },
          { title: "Colab", role: "Champion Network & Adoption", link: "/case-study/colab#enable", description: "Embedded CoCo in Teams and intranet, trained 180+ pilot users with 4.4/5 satisfaction.", image: "/assets/img/home-06/project/colab.jpg" },
          { title: "Abbott", role: "HIPAA-Compliant Handoff", link: "/case-study/abbott#enable", description: "Delivered audit-ready ML pipelines with comprehensive documentation for sustained operations.", image: "/assets/img/home-06/project/abbott.jpg" },
          { title: "Publicis", role: "Agency Team Training", link: "/case-study/publicis#enable", description: "Trained teams across 14 agencies on unified content supply chain and governance.", image: "/assets/img/home-06/project/publicishealth.jpg" },
          { title: "Naked Heart", role: "Local Team Training", link: "/case-study/nakedheart#enable", description: "Trained local teams in Russia, India, and Frankfurt on platform operations.", image: "/assets/img/home-06/project/nakedheart.jpg" },
        ]
      },
      {
        title: "Impact",
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Pfizer", role: "200+ Users Enabled", link: "/case-study/pfizer#impact", description: "65% reduction in review cycles, $2M+ annual savings, multi-brand adoption.", image: "/assets/img/home-06/project/Embedded.jpg" },
          { title: "Colab", role: "97% Search Time Reduction", link: "/case-study/colab#impact", description: "15 min → 30 sec search time, 3× doc discovery, 1,200+ hours saved monthly.", image: "/assets/img/home-06/project/colab.jpg" },
          { title: "Abbott", role: "Global Diagnostics Scale", link: "/case-study/abbott#impact", description: "30,000+ devices connected, zero audit findings, global diagnostics transformation.", image: "/assets/img/home-06/project/abbott.jpg" },
          { title: "Publicis", role: "14 Agencies Unified", link: "/case-study/publicis#impact", description: "35% reduction in review cycles, 2.3× asset reuse, MLR governance alignment.", image: "/assets/img/home-06/project/publicishealth.jpg" },
          { title: "Naked Heart", role: "Global Fundraising Enabled", link: "/case-study/nakedheart#impact", description: "First global digital platform, multi-currency donations, donor transparency achieved.", image: "/assets/img/home-06/project/nakedheart.jpg" },
        ]
      },
    ]
  },
  {
    id: 2,
    active: true,
    children: false,
    title: "Resume",
    pluseIncon: false,
    link: "/career-details-light",
  },
];

export default portfolioMenuData;

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
          { title: "IPG", role: "Enterprise Knowledge Audit", link: "/case-study/ipg#diagnose", description: "Audited knowledge management systems across global agency network to define consolidation strategy.", image: "/assets/img/home-06/project/publicishealth.jpg" },
          { title: "Syneos", role: "Clinical Trial Process Mapping", link: "/case-study/syneos#diagnose", description: "Mapped clinical trial workflows to identify data platform requirements and automation opportunities.", image: "/assets/img/home-06/project/syneos.jpg" },
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
          { title: "IPG", role: "Knowledge Graph Design", link: "/case-study/ipg#architect", description: "Designed enterprise knowledge graph architecture for single-source-of-truth across agencies.", image: "/assets/img/home-06/project/publicishealth.jpg" },
          { title: "Syneos", role: "Data Platform Architecture", link: "/case-study/syneos#architect", description: "Architected clinical trial data platform with regulatory-compliant data flows.", image: "/assets/img/home-06/project/syneos.jpg" },
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
          { title: "IPG", role: "Intranet Platform Build", link: "/case-study/ipg#engineer", description: "Built global intranet platform unifying knowledge across agency network.", image: "/assets/img/home-06/project/publicishealth.jpg" },
          { title: "Syneos", role: "Trial Analytics Engine", link: "/case-study/syneos#engineer", description: "Built clinical trial analytics engine with real-time reporting and compliance tracking.", image: "/assets/img/home-06/project/syneos.jpg" },
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
          { title: "IPG", role: "Self-Service Tooling", link: "/case-study/ipg#enable", description: "Established self-service tooling and trained internal teams on knowledge platform.", image: "/assets/img/home-06/project/publicishealth.jpg" },
          { title: "Syneos", role: "Ops Team Enablement", link: "/case-study/syneos#enable", description: "Trained operations teams on analytics platform with runbooks and governance frameworks.", image: "/assets/img/home-06/project/syneos.jpg" },
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
          { title: "IPG", role: "Agency Network Unified", link: "/case-study/ipg#impact", description: "Single-source-of-truth across global agency network, knowledge silos eliminated.", image: "/assets/img/home-06/project/publicishealth.jpg" },
          { title: "Syneos", role: "Trial Efficiency Gains", link: "/case-study/syneos#impact", description: "Clinical trial efficiency improved, real-time visibility across trial operations.", image: "/assets/img/home-06/project/syneos.jpg" },
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

import { projectsDT } from '@/types/project-d-t';

// All images use string paths (served from /public)
// home-01
const project1 = "/assets/img/home-01/project/project-1.jpg";
const project2 = "/assets/img/home-01/project/project-2.jpg";
const project3 = "/assets/img/home-01/project/project-3.jpg";
const project4 = "/assets/img/home-01/project/project-4.jpg";
const project5 = "/assets/img/home-01/project/project-5.jpg";
const project6 = "/assets/img/home-01/project/project-6.jpg";

// home-03
const project7 = "/assets/img/home-03/project/project-1.jpg";
const project8 = "/assets/img/home-03/project/project-2.jpg";
const project9 = "/assets/img/home-03/project/project-3.jpg";

// home-04
const project10 = "/assets/img/home-04/project/project-4.jpg";
const project11 = "/assets/img/home-04/project/project-1.jpg";
const project12 = "/assets/img/home-04/project/project-3.jpg";
const project13 = "/assets/img/home-04/project/project-2.jpg";

// home-05
const project14 = "/assets/img/home-05/project/project-1.jpg";
const project15 = "/assets/img/home-05/project/project-2.jpg";
const project16 = "/assets/img/home-05/project/project-3.jpg";

// home-06 project images
const imgPfizer = "/assets/img/home-06/project/Embedded.jpg";
const imgPublicis = "/assets/img/home-06/project/publicishealth.jpg";
const imgColab = "/assets/img/home-06/project/colab.jpg";
const imgMedtronic = "/assets/img/home-06/project/medtronic.jpg";
const imgAbbott = "/assets/img/home-06/project/abbott.jpg";
const imgAmgen = "/assets/img/home-06/project/amgen.jpg";
const imgSanofi = "/assets/img/home-06/project/sanofi.jpg";
const imgAlinity = "/assets/img/home-06/project/alinity.jpg";
const imgBinaxNOW = "/assets/img/home-06/project/binaxnow.jpg";
const imgEliLilly = "/assets/img/home-06/project/elililly.jpg";
const imgNakedHeart = "/assets/img/home-06/project/nakedheart.jpg";

// home-08
const project21 = "/assets/img/home-08/project/project-1.jpg";
const project22 = "/assets/img/home-08/project/project-2.jpg";
const project23 = "/assets/img/home-08/project/project-3.jpg";
const project24 = "/assets/img/home-08/project/project-4.jpg";

// home-07
const project25 = "/assets/img/home-07/project/project-1.jpg";
const project26 = "/assets/img/home-07/project/project-2.jpg";
const project27 = "/assets/img/home-07/project/project-3.jpg";
const project28 = "/assets/img/home-07/project/project-4.jpg";
const project29 = "/assets/img/home-07/project/project-5.jpg";
const project30 = "/assets/img/home-07/project/project-6.jpg";

// home-09
const project31 = "/assets/img/home-09/project/project-1.png";
const project32 = "/assets/img/home-09/project/project-2.png";
const project33 = "/assets/img/home-09/project/project-3.png";
const project34 = "/assets/img/home-09/project/project-4.png";

// home-11
const project35 = "/assets/img/home-11/project/project-1.jpg";
const project36 = "/assets/img/home-11/project/project-2.jpg";
const project37 = "/assets/img/home-11/project/project-3.jpg";
const project38 = "/assets/img/home-11/project/project-4.jpg";

// home-04 additional
const project40 = "/assets/img/home-04/project/project-5.jpg";
const project41 = "/assets/img/home-04/project/project-6.jpg";
const project42 = "/assets/img/home-04/project/project-7.jpg";

// portfolio metro
const portfolioThumb21 = "/assets/img/home-05/project/project-1.jpg";
const portfolioThumb22 = "/assets/img/home-05/project/project-2.jpg";
const portfolioThumb23 = "/assets/img/home-05/project/project-3.jpg";
const portfolioThumb24 = "/assets/img/home-05/project/project-4.jpg";
const portfolioThumb25 = "/assets/img/home-05/project/project-5.jpg";

export const projectsData: projectsDT[] = [
    {
        id: 1,
        title: "Acme Studio",
        image: project1,
        categories: ["Product Design", "Branding", "Creative"],
        link: "/portfolio-details-gallery-light",
    },
    {
        id: 2,
        title: "Digital Farming",
        image: project4,
        categories: ["Product Design", "Branding", "Creative"],
        link: "/portfolio-details-gallery-light",

    },
    {
        id: 3,
        title: "Grace Clinic",
        image: project2,
        categories: ["Creative", "Branding", "Development"],
        link: "/portfolio-details-gallery-light",
    },
    {
        id: 4,
        title: "Virtual Reality",
        image: project5,
        categories: ["Product Design", "Branding", "Creative"],
        link: "/portfolio-details-gallery-light",
    },
    {
        id: 5,
        title: "Smart Cities",
        image: project3,
        categories: ["Product Design", "Branding", "Creative"],
        link: "/portfolio-details-gallery-light",
    },
    {
        id: 6,
        title: "Cloud Computing",
        image: project6,
        categories: ["Product Design", "Branding", "Creative"],
        link: "/portfolio-details-gallery-light",
    },
    //home three project data start
    {
        id: 7,
        image: project7,
        title: "Avocado Cutter",
        description: "Digital marketing",
        link: "/portfolio-details-classic-stack-light"
    },
    {
        id: 8,
        image: project8,
        title: "Slice. Pit. Scoop.",
        description: "Digital marketing",
        link: "/portfolio-details-classic-stack-light"
    },
    {
        id: 9,
        image: project9,
        title: "Your guac's best friend.",
        description: "Digital marketing",
        link: "/portfolio-details-classic-stack-light"
    },
    {
        id: 10,
        image: project7,
        title: "Perfect halves, every time.",
        description: "Digital marketing",
        link: "/portfolio-details-classic-stack-light"
    },
    {
        id: 11,
        image: project8,
        title: "Three tools. One cutter.",
        description: "Digital marketing",
        link: "/portfolio-details-classic-stack-light"
    },
    {
        id: 12,
        image: project9,
        title: "Avocado Cutter",
        description: "Digital marketing",
        link: "/portfolio-details-classic-stack-light"
    },
    //home four project data start
    // projectLeft data
    {
        id: 13,
        image: project12,
        categories: ["Website", "SEO", "Business"],
        year: "2025",
        client: "Agntix",
        title: "Urban Green Spaces",
        link: "/portfolio-details-classic-stack-light",
    },
    {
        id: 14,
        image: project10,
        categories: ["Website", "SEO", "Business"],
        year: "2025",
        client: "Agntix",
        title: "Logistics Made Simple",
        link: "/portfolio-details-classic-stack-light",

    },
    {
        id: 15,
        image: project11,
        categories: ["Website", "SEO", "Business-light"],
        year: "2025",
        client: "Agntix",
        title: "AI in Healthcare",
        link: "/portfolio-details-classic-stack-light",
    },
    {
        id: 16,
        image: project13,
        categories: ["Website", "SEO", "Business"],
        year: "2025",
        client: "Agntix",
        title: "Social Media Impact",
        link: "/portfolio-details-classic-stack-light",
    },
    //home four project data end

    //home five light project data start
    {
        id: 17,
        title: "imusic",
        services: "Research, UX, UI Design",
        image: project14,
        layout: "left",
        hasLineBreak: false,
        link: "/portfolio-details-modern-light",
    },
    {
        id: 18,
        title: "simple logistics",
        services: "Research, UX, UI Design",
        image: project15,
        hasLineBreak: true,
        contentClass: "pl-200",
        link: "/portfolio-details-modern-light"
    },
    {
        id: 19,
        title: "genesis",
        services: "Research, UX, UI Design",
        image: project16,
        layout: "left",
        hasLineBreak: false,
        link: "/portfolio-details-modern-light",
    },
    //home five light project data end
    //home Six light project data Start
    {
        id: 20,
        number: '01',
        title: 'Pfizer',
        services: 'Field-Embedded Engineering',
        description: 'Embedded with Pfizer Global Production as an onsite FDE, engineering AI workflows that accelerated content supply operations and integrated OpenAI systems into high-stakes brand pipelines.',
        image: imgPfizer,
        link: '/case-study/pfizer',
    },
    {
        id: 21,
        number: '02',
        title: 'Colab',
        services: 'Retrieval & Knowledge Engineering',
        description: 'Designed and deployed an internal AI search assistant using OpenAI + SharePoint with Glean-style semantic indexing, enabling secure enterprise RAG capabilities for air-gapped environments.',
        image: imgColab,
        link: '/case-study/colab',
    },
    {
        id: 22,
        number: '03',
        title: 'Publicis Health',
        services: 'Enterprise Architecture at Scale',
        description: 'Architected a multi-brand RAG ecosystem across SharePoint/Teams and Azure ML, reducing review cycles by 35% and increasing asset reuse 2.3× while aligning with MLR governance requirements.',
        image: imgPublicis,
        link: '/case-study/publicis',
    },
    {
        id: 23,
        number: '04',
        title: 'Medtronic',
        services: 'LLM-Centered Architecture',
        description: "Led architecture for an LLM-driven decision-support system within Medtronic's regulated workflows, integrating secure context windows and evaluation layers to support clinical-grade reliability.",
        image: imgMedtronic,
        link: '/case-study/medtronic',
    },
    {
        id: 24,
        number: '05',
        title: 'Abbott Labs',
        services: 'Responsible AI & Governance',
        description: 'Engineered HIPAA-compliant data planes and audit-ready ML pipelines for global diagnostics, achieving zero audit findings and establishing governance frameworks for LLM readiness.',
        image: imgAbbott,
        link: '/case-study/abbott',
    },
    {
        id: 25,
        number: '06',
        title: 'Amgen',
        services: 'Technical Program Leadership',
        description: 'Directed AI-enabled product launches and cross-functional engineering streams for Amgen Biosimilars and Repatha, coordinating technical, medical, and regulatory teams under tight release gates.',
        image: imgAmgen,
        link: '/case-study/amgen',
    },
    {
        id: 26,
        number: '07',
        title: 'Sanofi Global Vaccines',
        services: 'Cross-Sector Communication',
        description: 'Unified technical, medical, and commercial stakeholders across seven global vaccine brands, translating complex data and system constraints into actionable AI-enabled pathways.',
        image: imgSanofi,
        link: '/case-study/sanofi',
    },
    {
        id: 27,
        number: '08',
        title: 'Abbott Labs Alinity',
        services: 'Systems for Mission Outcomes',
        description: 'Deployed real-time data ingestion and ML-readiness pipelines across 30,000+ Alinity diagnostic systems, enabling faster decision cycles and downstream LLM integration for global operations.',
        image: imgAlinity,
        link: '/case-study/alinity',
    },
    {
        id: 28,
        number: '09',
        title: 'Abbott BinaxNOW',
        services: 'Eval-Controlled LLM Asset',
        description: "Built evaluation-driven NLP/LLM pipelines to support BinaxNOW's data ecosystem, establishing continuous validation loops and boosting retrieval efficiency by 65%.",
        image: imgBinaxNOW,
        link: '/case-study/binaxnow',
    },
    {
        id: 29,
        number: '10',
        title: 'Eli Lilly',
        services: 'Regulated Portfolio Deployment',
        description: 'Managed large-scale technical deployments and Veeva/Salesforce governance for Eli Lilly, ensuring compliant data flows and system integrity across a deeply regulated portfolio.',
        image: imgEliLilly,
        link: '/case-study/lilly',
    },
    {
        id: 30,
        number: '11',
        title: 'IPG Global Intranets',
        services: 'Sub-Portfolio Planning',
        description: 'Architected global intranet and knowledge systems for AREA23 and ProHealth, creating single-source-of-truth environments that reduced operational friction and improved cross-team alignment.',
        image: imgPublicis,
        link: '/case-study/ipg',
    },
    {
        id: 31,
        number: '12',
        title: 'Naked Heart Foundation',
        services: 'Mission-Embedded Non-Profit',
        description: "Built the foundation's first global digital platform with multi-currency, tax-compliant donation infrastructure, advancing global fundraising capacity for a mission-driven organization.",
        image: imgNakedHeart,
        link: '/case-study/nakedheart',
    },
    //home Six light project data end

    //home Seven light project data start
    {
        id: 32,
        title: 'Interior design',
        year: '2025',
        image: project21,
        altText: 'Interior design project',
        link: '/portfolio-details-classic-stack-light',
    },
    {
        id: 33,
        title: 'Stylish Interior',
        year: '2025',
        image: project22,
        altText: 'Stylish Interior project',
        link: '/portfolio-details-classic-stack-light',
    },
    {
        id: 34,
        title: 'Interior Transformation',
        year: '2025',
        image: project23,
        altText: 'Interior Transformation project',
        link: '/portfolio-details-classic-stack-light',
    },
    {
        id: 35,
        title: 'Interior Spaces',
        year: '2025',
        image: project24,
        altText: 'Interior Spaces project',
        link: '/portfolio-details-classic-stack-light',
    },
    //home Seven light project data end

    //home eight light project data start
    {
        id: 36,
        image: project25,
        subtitle: "Creative",
        title: "DT ASSOCIATION",
        link: "/portfolio-details-gallery-light",

    },
    {
        id: 37,
        image: project26,
        subtitle: "Creative",
        title: "DT COLLABORATION",
        link: "/portfolio-details-gallery-light",
    },
    {
        id: 38,
        image: project27,
        subtitle: "Creative",
        title: "DT NETWORK",
        link: "/portfolio-details-gallery-light",
    },
    {
        id: 39,
        image: project28,
        subtitle: "Creative",
        title: "DT COALITION",
        link: "/portfolio-details-gallery-light",
    },
    {
        id: 40,
        image: project29,
        subtitle: "Creative",
        title: "DT SYNDICATE",
        link: "/portfolio-details-gallery-light",
    },
    {
        id: 41,
        image: project30,
        subtitle: "Creative",
        title: "DT CONGLOMERATE",
        link: "/portfolio-details-gallery-light",
    },
    //home eight light project data end
    {
        id: 42,
        number: '01',
        year: '2025',
        image: project31,
        title: 'A clean and minimal website design template.',
        categories: ['Website', 'Business'],
        link: '/portfolio-details-gallery-light',
    },
    {
        id: 43,
        number: '02',
        year: '2025',
        image: project32,
        title: 'Sleek and Simple Website Template',
        categories: ['Website', 'Business'],
        link: '/portfolio-details-gallery-light',
    },
    {
        id: 44,
        number: '03',
        year: '2025',
        image: project33,
        title: 'Minimalist Web Design Framework',
        categories: ['Website', 'Business'],
        link: '/portfolio-details-gallery-light',
    },
    {
        id: 45,
        number: '04',
        year: '2025',
        image: project34,
        title: 'Modern Minimal Web Design Template',
        categories: ['Website', 'Business'],
        link: '/portfolio-details-gallery-light',
    },
    // IT Solution IT Project data start
    {
        id: 46,
        title: "The Professional Theft",
        category: "Digital Art",
        image: project35,
        link: "/portfolio-details-gallery-light",
    },
    {
        id: 47,
        title: "The Mastermind Heist",
        category: "Digital Art",
        image: project36,
        link: "/portfolio-details-gallery-light",
    },
    {
        id: 48,
        title: "The Shadow Larcenist",
        category: "Digital Art",
        image: project37,
        link: "/portfolio-details-gallery-light",
    },
    {
        id: 49,
        title: "The Elite Burglar",
        category: "Digital Art",
        image: project38,
        link: "/portfolio-details-gallery-light",
    },
    {
        id: 50,
        title: "The Mastermind Heist",
        category: "Digital Art",
        image: project36,
        link: "/portfolio-details-gallery-light",
    },
    {
        id: 51,
        title: "The Shadow Larcenist",
        category: "Digital Art",
        image: project37,
        link: "/portfolio-details-gallery-light",
    },
    //Home-11 IT Solution IT Project data end

    //Home Personal Portfolio Project data start
    {
        id: 52,
        image: project10,
        title: 'Corporate Branding',
        category: 'Branding',
        year: '2025',
        delay: '.3',
        fadeDirection: 'left',
        link: "/portfolio-details-modern-light",
    },
    {
        id: 53,
        image: project40,
        title: 'AI in Healthcare',
        category: 'Branding',
        year: '2025',
        delay: '.5',
        fadeDirection: 'right',
        link: "/portfolio-details-modern-light",
    },
    {
        id: 54,
        image: project41,
        title: 'Urban Green Spaces',
        category: 'Branding',
        year: '2025',
        delay: '.3',
        fadeDirection: 'left',
        link: "/portfolio-details-modern-light",
    },
    {
        id: 55,
        image: project42,
        title: 'Logistics Made Simple',
        category: 'Branding',
        year: '2025',
        delay: '.5',
        fadeDirection: 'right',
        link: "/portfolio-details-modern-light",
    },
    //Home Personal Portfolio Project data end

    //portfolio metro data start
    {
        id: 56,
        title: "imusic",
        services: "Research, UX, UI Design",
        image: portfolioThumb21,
        layout: "left",
        hasLineBreak: false,
        link: "/portfolio-details-modern-light",
    },
    {
        id: 57,
        title: "simple logistics",
        services: "Research, UX, UI Design",
        image: portfolioThumb22,
        hasLineBreak: true,
        contentClass: "pl-200",
        link: "/portfolio-details-modern-light"
    },
    {
        id: 58,
        title: "genesis",
        services: "Research, UX, UI Design",
        image: portfolioThumb23,
        layout: "left",
        hasLineBreak: false,
        link: "/portfolio-details-modern-light",
    },

    {
        id: 59,
        title: "simple logistics",
        services: "Research, UX, UI Design",
        image: portfolioThumb24,
        hasLineBreak: true,
        contentClass: "pl-200",
        link: "/portfolio-details-modern-light"
    },
    {
        id: 60,
        title: "genesis",
        services: "Research, UX, UI Design",
        image: portfolioThumb25,
        layout: "left",
        hasLineBreak: false,
        link: "/portfolio-details-modern-light",
    },
    //portfolio metro data  end

];

export default projectsData;

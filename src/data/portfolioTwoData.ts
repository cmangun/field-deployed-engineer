import image1 from '../../public/assets/img/project-slider-img/cr-slider-6.jpg';
import image2 from '../../public/assets/img/project-slider-img/cr-slider-7.jpg';
import image3 from '../../public/assets/img/project-slider-img/cr-slider-8.jpg';
import image4 from '../../public/assets/img/project-slider-img/cr-slider-9.jpg';
import image5 from '../../public/assets/img/project-slider-img/cr-slider-10.jpg';
import image6 from '../../public/assets/img/project-slider-img/cr-slider-1.jpg';

import smallImage1 from '../../public/assets/img/project-slider-img/cr-slider-small-6.jpg';
import smallImage2 from '../../public/assets/img/project-slider-img/cr-slider-small-7.jpg';
import smallImage3 from '../../public/assets/img/project-slider-img/cr-slider-small-8.jpg';
import smallImage4 from '../../public/assets/img/project-slider-img/cr-slider-small-9.jpg';
import smallImage5 from '../../public/assets/img/project-slider-img/cr-slider-small-10.jpg';
import smallImage6 from '../../public/assets/img/project-slider-img/cr-slider-small-1.jpg';
import { StaticImageData } from 'next/image';

// WebGL showcase images
import showcase_water from '../../public/assets/img/water.gif';
import imgPfizer from '../../public/assets/img/home-06/project/Embedded.jpg';
import imgColab from '../../public/assets/img/home-06/project/colab.jpg';
import imgPublicis from '../../public/assets/img/home-06/project/publicishealth.jpg';
import imgMedtronic from '../../public/assets/img/home-06/project/medtronic.jpg';
import imgAbbott from '../../public/assets/img/home-06/project/abbott.jpg';
import imgAmgen from '../../public/assets/img/home-06/project/amgen.jpg';
import imgSanofi from '../../public/assets/img/home-06/project/sanofi.jpg';
import imgAlinity from '../../public/assets/img/home-06/project/alinity.jpg';
import imgBinaxNOW from '../../public/assets/img/home-06/project/binaxnow.jpg';
import imgEliLilly from '../../public/assets/img/home-06/project/elililly.jpg';
import imgNakedHeart from '../../public/assets/img/home-06/project/nakedheart.jpg';

// Skew slider images
import skewImage1 from '../../public/assets/img/slider-img/skew-1.jpg';
import skewImage2 from '../../public/assets/img/slider-img/skew-2.jpg';
import skewImage3 from '../../public/assets/img/slider-img/skew-3.jpg';
import skewImage4 from '../../public/assets/img/slider-img/skew-4.jpg';
import skewImage5 from '../../public/assets/img/slider-img/skew-5.jpg';
import skewImage6 from '../../public/assets/img/slider-img/skew-6.jpg';

// portfolio wrapper slider images
import port_sm_1 from "../../public/assets/img/portfolio/wrapper-slider/wrapper-sm-1.jpg";
import port_sm_2 from "../../public/assets/img/portfolio/wrapper-slider/wrapper-sm-2.jpg";
import port_sm_3 from "../../public/assets/img/portfolio/wrapper-slider/wrapper-sm-3.jpg";
import port_sm_4 from "../../public/assets/img/portfolio/wrapper-slider/wrapper-sm-4.jpg";
import port_sm_5 from "../../public/assets/img/portfolio/wrapper-slider/wrapper-sm-5.jpg";

//portfolio details image comparison
import thumb1 from "../../public/assets/img/portfolio/portfolio-details-6/portfolio-details-thumb-1.jpg";
import thumb2 from "../../public/assets/img/portfolio/portfolio-details-6/portfolio-details-thumb-2.jpg";
import thumb3 from "../../public/assets/img/portfolio/portfolio-details-6/portfolio-details-thumb-3.jpg";
import thumb4 from "../../public/assets/img/portfolio/portfolio-details-6/portfolio-details-thumb-4.jpg";
import thumb5 from "../../public/assets/img/portfolio/portfolio-details-6/portfolio-details-thumb-5.jpg";

//portfolio details image comparison
import bgImg1 from "../../public/assets/img/project-slider-img/cr-slider-7.jpg";
import bgImg2 from "../../public/assets/img/project-slider-img/cr-slider-1.jpg";
import bgImg3 from "../../public/assets/img/project-slider-img/cr-slider-6.jpg";
import bgImg4 from "../../public/assets/img/project-slider-img/cr-slider-8.jpg";
import bgImg5 from "../../public/assets/img/project-slider-img/cr-slider-9.jpg";

//portfolio details image comparison
import smallbgImg1 from "../../public/assets/img/project-slider-img/cr-slider-1.jpg";
import smallbgImg2 from "../../public/assets/img/project-slider-img/cr-slider-7.jpg";
import smallbgImg3 from "../../public/assets/img/project-slider-img/cr-slider-8.jpg";
import smallbgImg4 from "../../public/assets/img/project-slider-img/cr-slider-9.jpg";
import smallbgImg5 from "../../public/assets/img/project-slider-img/cr-slider-10.jpg";

// portfolio slider elegant image
import port1 from "../../public/assets/img/project-slider-img/portfolio-slider-5/port-7.jpg";
import port2 from "../../public/assets/img/project-slider-img/portfolio-slider-5/port-6.jpg";
import port3 from "../../public/assets/img/project-slider-img/portfolio-slider-5/port-5.jpg";
import port4 from "../../public/assets/img/project-slider-img/portfolio-slider-5/port-4.jpg";

interface PortfolioItem {
    id: number;
    image: StaticImageData;
    smallImage: StaticImageData;
    name: string;
    link: string;
}


export const portfolioThumbSliderItems: PortfolioItem[] = [
    {
        id: 1,
        image: image1,
        smallImage: smallImage1,
        name: 'Jon Piterson',
        link: '/portfolio-details-image-comparison'
    },
    {
        id: 2,
        image: image2,
        smallImage: smallImage2,
        name: 'Jean Gomez',
        link: '/portfolio-details-image-comparison'
    },
    {
        id: 3,
        image: image3,
        smallImage: smallImage3,
        name: 'Katia Ivanova',
        link: '/portfolio-details-image-comparison'
    },
    {
        id: 4,
        image: image4,
        smallImage: smallImage4,
        name: 'Adaora Musa',
        link: '/portfolio-details-image-comparison'
    },
    {
        id: 5,
        image: image5,
        smallImage: smallImage5,
        name: 'Mia Tobez',
        link: '/portfolio-details-image-comparison'
    },
    {
        id: 6,
        image: image6,
        smallImage: smallImage6,
        name: 'Anni Marire',
        link: '/portfolio-details-image-comparison'
    }
];

// Portfolio WebGL slides data - Case Studies
export const portfolioWebglSlides = [
    { id: 0, active: true, title: "Christopher Mangun", categories: ["Forward Deployed Engineer"], description: "", link: "/portfolio-horizontal-showcase-light" },
    { id: 1, active: false, title: "Pfizer", categories: ["Field-Embedded Engineering"], description: "Embedded with Pfizer Global Production as an onsite FDE, engineering AI workflows that accelerated content supply operations and integrated OpenAI systems into high-stakes brand pipelines.", link: "/portfolio-horizontal-showcase-light" },
    { id: 2, active: false, title: "Colab", categories: ["Retrieval & Knowledge Engineering"], description: "Designed and deployed an internal AI search assistant using OpenAI + SharePoint with Glean-style semantic indexing, enabling secure enterprise RAG capabilities for air-gapped environments.", link: "/portfolio-horizontal-showcase-light" },
    { id: 3, active: false, title: "Publicis Health", categories: ["Enterprise Architecture at Scale"], description: "Architected a multi-brand RAG ecosystem across SharePoint/Teams and Azure ML, reducing review cycles by 35% and increasing asset reuse 2.3× while aligning with MLR governance requirements.", link: "/portfolio-horizontal-showcase-light" },
    { id: 4, active: false, title: "Abbott Labs", categories: ["Responsible AI & Governance"], description: "Engineered HIPAA-compliant data planes and audit-ready ML pipelines for global diagnostics, achieving zero audit findings and establishing governance frameworks for LLM readiness.", link: "/portfolio-horizontal-showcase-light" },
    { id: 5, active: false, title: "Abbott Labs Alinity", categories: ["Systems for Mission Outcomes"], description: "Deployed real-time data ingestion and ML-readiness pipelines across 30,000+ Alinity diagnostic systems, enabling faster decision cycles and downstream LLM integration for global operations.", link: "/portfolio-horizontal-showcase-light" },
    { id: 6, active: false, title: "Abbott BinaxNOW", categories: ["Eval-Controlled LLM Asset"], description: "Built evaluation-driven NLP/LLM pipelines to support BinaxNOW's data ecosystem, establishing continuous validation loops and boosting retrieval efficiency by 65%.", link: "/portfolio-horizontal-showcase-light" },
    { id: 7, active: false, title: "Naked Heart Foundation", categories: ["Mission-Embedded Non-Profit"], description: "Built the foundation's first global digital platform with multi-currency, tax-compliant donation infrastructure, advancing global fundraising capacity for a mission-driven organization.", link: "/portfolio-horizontal-showcase-light" },
];

// slider images
export const sliderImages = [
    showcase_water,  // Christopher Mangun
    imgPfizer,       // Pfizer
    imgColab,        // Colab
    imgPublicis,     // Publicis Health
    imgAbbott,       // Abbott Labs
    imgAlinity,      // Abbott Labs Alinity
    imgBinaxNOW,     // Abbott BinaxNOW
    imgNakedHeart,   // Naked Heart Foundation
];

// Portfolio WebGL slides data end


export const skewSliderData = [
    {
        image: skewImage1,
        category: 'Digital platform',
        title: ['simple', 'logistics'],
        isSpanInTitle: true
    },
    {
        image: skewImage2,
        category: 'Digital platform',
        title: ['Smart', 'platform']
    },
    {
        image: skewImage3,
        category: 'Digital platform',
        title: ['Royal', 'Benz']
    },
    {
        image: skewImage4,
        category: 'Digital platform',
        title: ['World\'s', 'Relays']
    },
    {
        image: skewImage5,
        category: 'Digital platform',
        title: ['Bright', 'Captive']
    },
    {
        image: skewImage6,
        category: 'Interactive Mind',
        title: ['Bright', 'Mind']
    }
];


// Data for portfolio creative text slider items 
export const textSliderItems = [
    { bgImage: bgImg1 },
    { bgImage: bgImg2 },
    { bgImage: bgImg3 },
    { bgImage: bgImg4 },
    { bgImage: bgImg5 }
];

export const textSmallSliderItems = [
    { bgImage: smallbgImg1 },
    { bgImage: smallbgImg2 },
    { bgImage: smallbgImg3 },
    { bgImage: smallbgImg4 },
    { bgImage: smallbgImg5 }
];

export const textPortfolioItems = [
    { name: 'Sagor Mahmud', link: '/portfolio-details-classic-stack-light' },
    { name: 'Jean Gomez', link: '/portfolio-details-classic-stack-light' },
    { name: 'Katia Ivanova', link: '/portfolio-details-classic-stack-light' },
    { name: 'Adaora Musa', link: '/portfolio-details-classic-stack-light' },
    { name: 'Mia Petković', link: '/portfolio-details-classic-stack-light' }
];
// Data for portfolio creative text slider items end

export const parallaxSlideItems = [
    {
        backgroundImage: "assets/img/project-slider-img/portfolio-slider-3/portfolio-2.jpg",
        subtitle: "Brain Lara",
        title: "Retouch Photo",
        filterId: "buttonFilter3"
    },
    {
        backgroundImage: "assets/img/project-slider-img/portfolio-slider-3/portfolio-1.jpg",
        subtitle: "Pfizer | AI & ML Strategy",
        title: "",
        filterId: "buttonFilter4"
    },
    {
        backgroundImage: "assets/img/project-slider-img/portfolio-slider-3/portfolio-3.jpg",
        subtitle: "Farhan Firoz",
        title: "Lifestyle App",
        filterId: "buttonFilter5"
    },
    {
        backgroundImage: "assets/img/project-slider-img/portfolio-slider-3/portfolio-4.jpg",
        subtitle: "Thomas Alvi",
        title: "World's Relays",
        filterId: "buttonFilter9"
    },
    {
        backgroundImage: "assets/img/project-slider-img/portfolio-slider-3/portfolio-5.jpg",
        subtitle: "Benzama Khalil",
        title: "Stickers Pack",
        filterId: "buttonFilter6"
    },
    {
        backgroundImage: "assets/img/project-slider-img/portfolio-slider-3/portfolio-6.jpg",
        subtitle: "Orpa Tomez",
        title: "Diseño Gráfico",
        filterId: "buttonFilter7"
    }
];



//portfolio wrapper slider
// slider data
export const sliderData = [
    {
        id: 1,
        bg: "/assets/img/portfolio/wrapper-slider/wrapper-big-1.jpg",
        subtitle: "Digital Design",
        year: "2024",
        title: "Fashion <br> Sentence",
        link: "/portfolio-details-creative-slider-light"
    },
    {
        id: 2,
        bg: "/assets/img/portfolio/wrapper-slider/wrapper-big-2.jpg",
        subtitle: "Digital Design",
        year: "2022",
        title: "Chania <br> Tourism",
        link: "/portfolio-details-creative-slider-light"
    },
    {
        id: 3,
        bg: "/assets/img/portfolio/wrapper-slider/wrapper-big-3.jpg",
        subtitle: "Digital Design",
        year: "2021",
        title: "Kiteboard <br> action",
        link: "/portfolio-details-creative-slider-light"
    },
    {
        id: 4,
        bg: "/assets/img/portfolio/wrapper-slider/wrapper-big-4.jpg",
        subtitle: "Digital Design",
        year: "2021",
        title: "Headphones <br> Cheap",
        link: "/portfolio-details-creative-slider-light"
    },
    {
        id: 5,
        bg: "/assets/img/portfolio/wrapper-slider/wrapper-big-5.jpg",
        subtitle: "Digital Design",
        year: "2021",
        title: "Zon <br> Robinson",
        link: "/portfolio-details-creative-slider-light"
    },
];
// slider thumbs
export const sliderThumbs = [
    {
        id: 1,
        img: port_sm_1,
        subtitle: "Digital Design",
        year: "2024",
        title: "Fashion Sentence",
        link: "/portfolio-details-creative-slider-light"
    },
    {
        id: 2,
        img: port_sm_2,
        subtitle: "Digital Design",
        year: "2022",
        title: "Chania Tourism",
        link: "/portfolio-details-creative-slider-light"
    },
    {
        id: 3,
        img: port_sm_3,
        subtitle: "Digital Design",
        year: "2021",
        title: "Kiteboard action",
        link: "/portfolio-details-creative-slider-light"
    },
    {
        id: 4,
        img: port_sm_4,
        subtitle: "Digital Design",
        year: "2021",
        title: "Headphones Cheap",
        link: "/portfolio-details-creative-slider-light"
    },
    {
        id: 5,
        img: port_sm_5,
        subtitle: "Digital Design",
        year: "2021",
        title: "Zon Robinson",
        link: "/portfolio-details-creative-slider-light"
    },
];
// portfolio slider elegant data
export const portfolioSliderElegantData = [
    {
        img: port1,
        title: "Brand promotion",
        href: "/portfolio-details-gallery-light",
    },
    {
        img: port2,
        title: "Commercial",
        href: "/portfolio-details-gallery-light",
    },
    {
        img: port3,
        title: "Wedding",
        href: "/portfolio-details-gallery-light",
    },
    {
        img: port4,
        title: "Portrait",
        href: "/portfolio-details-gallery-light",
    },
];

export const portfolioDetailsImgSlider = [thumb1, thumb2, thumb3, thumb4, thumb5];
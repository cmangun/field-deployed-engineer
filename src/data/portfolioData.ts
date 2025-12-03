
import { StaticImageData } from "next/image";
import portfolio1 from "../../public/assets/img/home-02/portfolio/portfolio-1.jpg";
import portfolio2 from "../../public/assets/img/home-02/portfolio/portfolio-2.jpg";
import portfolio3 from "../../public/assets/img/home-02/portfolio/portfolio-3.jpg";
import portfolio4 from "../../public/assets/img/home-02/portfolio/portfolio-4.jpg";
//startup agency portfolio image
import portfolio5 from '../../public/assets/img/home-12/portfolio/portfolio-thumb-1.jpg';
import portfolio6 from '../../public/assets/img/home-12/portfolio/portfolio-thumb-2.jpg';
import portfolio7 from '../../public/assets/img/home-12/portfolio/portfolio-thumb-3.jpg';
import portfolio8 from '../../public/assets/img/home-12/portfolio/portfolio-thumb-4.jpg';
import portfolio9 from '../../public/assets/img/home-12/portfolio/portfolio-thumb-5.jpg';
import portfolio10 from '../../public/assets/img/home-12/portfolio/portfolio-thumb-6.jpg';
//Fashion studio portfolio image
import project1 from '../../public/assets/img/home-15/project-2/project-1.jpg';
import project2 from '../../public/assets/img/home-15/project-2/project-2.jpg';
import project3 from '../../public/assets/img/home-15/project-2/project-3.jpg';
import project4 from '../../public/assets/img/home-15/project-2/project-4.jpg';
import project5 from '../../public/assets/img/home-15/project-2/project-5.jpg';
import project6 from '../../public/assets/img/home-15/project-2/project-6.jpg';

// Portfolio data for coverflow slider images
import portfolio11 from '../../public/assets/img/project-slider-img/portfolio-slider-4/portfolio-1.jpg';
import portfolio12 from '../../public/assets/img/project-slider-img/portfolio-slider-4/portfolio-2.jpg';
import portfolio13 from '../../public/assets/img/project-slider-img/portfolio-slider-4/portfolio-3.jpg';
import portfolio14 from '../../public/assets/img/project-slider-img/portfolio-slider-4/portfolio-4.jpg';
import portfolio15 from '../../public/assets/img/project-slider-img/portfolio-slider-4/portfolio-5.jpg';
import portfolio16 from '../../public/assets/img/project-slider-img/portfolio-slider-4/portfolio-6.jpg';
import portfolio17 from '../../public/assets/img/project-slider-img/portfolio-slider-4/portfolio-7.jpg';

//porttfolio col-2 images
import portfolioThumb1 from '../../public/assets/img/portfolio/portfolio-col-2/portfolio-thumb-1.jpg';
import portfolioThumb2 from '../../public/assets/img/portfolio/portfolio-col-2/portfolio-thumb-2.jpg';
import portfolioThumb3 from '../../public/assets/img/portfolio/portfolio-col-2/portfolio-thumb-3.jpg';
import portfolioThumb4 from '../../public/assets/img/portfolio/portfolio-col-2/portfolio-thumb-4.jpg';
import portfolioThumb5 from '../../public/assets/img/portfolio/portfolio-col-2/portfolio-thumb-5.jpg';
import portfolioThumb6 from '../../public/assets/img/portfolio/portfolio-col-2/portfolio-thumb-6.jpg';

//portfolio col-3 images
import portfolioThumb7 from '../../public/assets/img/portfolio/portfolio-col-3/portfolio-thumb-1.jpg';
import portfolioThumb8 from '../../public/assets/img/portfolio/portfolio-col-3/portfolio-thumb-2.jpg';
import portfolioThumb9 from '../../public/assets/img/portfolio/portfolio-col-3/portfolio-thumb-3.jpg';
import portfolioThumb10 from '../../public/assets/img/portfolio/portfolio-col-3/portfolio-thumb-4.jpg';
import portfolioThumb11 from '../../public/assets/img/portfolio/portfolio-col-3/portfolio-thumb-5.jpg';
import portfolioThumb12 from '../../public/assets/img/portfolio/portfolio-col-3/portfolio-thumb-6.jpg';
import portfolioThumb13 from '../../public/assets/img/portfolio/portfolio-col-3/portfolio-thumb-7.jpg';
import portfolioThumb14 from '../../public/assets/img/portfolio/portfolio-col-3/portfolio-thumb-8.jpg';
import portfolioThumb15 from '../../public/assets/img/portfolio/portfolio-col-3/portfolio-thumb-9.jpg';

//portfolio masonry images
import portfolioThumb16 from '../../public/assets/img/portfolio/portfolio-masonry/portfolio-masonry-1.jpg';
import portfolioThumb17 from '../../public/assets/img/portfolio/portfolio-masonry/portfolio-masonry-2.jpg';
import portfolioThumb18 from '../../public/assets/img/portfolio/portfolio-masonry/portfolio-masonry-3.jpg';
import portfolioThumb19 from '../../public/assets/img/portfolio/portfolio-masonry/portfolio-masonry-4.jpg';
import portfolioThumb20 from '../../public/assets/img/portfolio/portfolio-masonry/portfolio-masonry-5.jpg';

// portfolio-horizontal-showcase image
import sliderImg1 from '../../public/assets/img/project-slider-img/portfolio-slider-5/port-1.jpg';
import sliderImg2 from '../../public/assets/img/project-slider-img/portfolio-slider-5/port-2.jpg';
import sliderImg3 from '../../public/assets/img/project-slider-img/portfolio-slider-5/port-5.jpg';
import sliderImg4 from '../../public/assets/img/project-slider-img/portfolio-slider-5/port-6.jpg';
import sliderImg5 from '../../public/assets/img/project-slider-img/portfolio-slider-5/port-3.jpg';
import sliderImg6 from '../../public/assets/img/project-slider-img/portfolio-slider-5/port-4.jpg';
import sliderImg7 from '../../public/assets/img/project-slider-img/portfolio-slider-5/port-7.jpg';
//portfolio perspective slider images
import perspectiveImg1 from '../../public/assets/img/perspective-slider/slider-3.jpg';
import perspectiveImg2 from '../../public/assets/img/perspective-slider/slider-2.jpg';
import perspectiveImg3 from '../../public/assets/img/perspective-slider/slider-4.jpg';
import perspectiveImg4 from '../../public/assets/img/perspective-slider/slider-5.jpg';
import perspectiveImg5 from '../../public/assets/img/perspective-slider/slider-1.jpg';
import perspectiveImg6 from '../../public/assets/img/perspective-slider/slider-6.jpg';


// Define the portfolio item type
export interface PortfolioDT {
  id: number;
  image: StaticImageData;
  categories?: string[];
  year?: string;
  title: string;
  colClass?: string;
  itemClass?: string;
  category?: string;
  hasSpaceLeft?: boolean;
  link: string;
};

// Portfolio data array
const portfolioData: PortfolioDT[] = [
  {
    id: 1,
    image: portfolio1,
    categories: ["Web Design", "Web Development"],
    year: "2025",
    title: "Electro Hub",
    link: "/portfolio-details-creative-slider-light",
  },
  {
    id: 2,
    image: portfolio2,
    categories: ["Web Design", "Web Development"],
    year: "2025",
    title: "Creative Vision",
    link: "/portfolio-details-creative-slider-light",
  },
  {
    id: 3,
    image: portfolio3,
    categories: ["Web Design", "Web Development"],
    year: "2025",
    title: "Design Essence",
    link: "/portfolio-details-creative-slider-light",
  },
  {
    id: 4,
    image: portfolio4,
    categories: ["Web Design", "Web Development"],
    year: "2025",
    title: "Innovative Works",
    link: "/portfolio-details-creative-slider-light",
  },

  //startup agency portfolio data start
  {
    id: 5,
    title: 'Findrs',
    image: portfolio5,
    colClass: 'col-xl-4 col-md-6',
    itemClass: 'st-portfolio-item-1',
    link: "/portfolio-details-creative-slider-light",
  },
  {
    id: 6,
    title: 'Ciphr',
    image: portfolio6,
    colClass: 'offset-xl-5 col-xl-3 col-md-6',
    itemClass: 'st-portfolio-item-2',
    link: "/portfolio-details-creative-slider-light",
  },
  {
    id: 7,
    title: 'Akash',
    image: portfolio7,
    colClass: 'offset-xxl-4 col-xxl-2 col-xl-3 col-md-6',
    itemClass: 'st-portfolio-item-3',
    link: "/portfolio-details-creative-slider-light",
  },
  {
    id: 8,
    title: 'FTA',
    image: portfolio8,
    colClass: 'offset-xl-3 col-xl-3 col-md-6',
    itemClass: 'st-portfolio-item-5',
    link: "/portfolio-details-creative-slider-light",
  },
  {
    id: 9,
    title: 'ContentCal',
    image: portfolio9,
    colClass: 'col-xl-3 col-md-6',
    itemClass: 'st-portfolio-item-4',
    link: "/portfolio-details-creative-slider-light",
  },
  {
    id: 10,
    title: 'Propstore',
    image: portfolio10,
    colClass: 'offset-xl-2 col-xl-7 col-md-6',
    itemClass: 'st-portfolio-item-6',
    link: "/portfolio-details-creative-slider-light",
  },
  //startup agency portfolio data end

  //Home Fashion studio portfolio data start
  {
    id: 11,
    image: project1,
    category: 'Modelling - 2025',
    title: 'Hannah & John',
    colClass: 'col-xxl-3 col-xl-4 col-lg-6 col-md-6',
    link: "/portfolio-details-modern-light"
  },
  {
    id: 12,
    image: project2,
    category: 'Modelling - 2025',
    title: 'Siyantika Glory',
    colClass: 'col-xxl-6 col-xl-6 col-lg-6 col-md-6',
    link: "/portfolio-details-modern-light"
  },
  {
    id: 13,
    image: project3,
    category: 'Modelling - 2025',
    title: 'Out of this world',
    colClass: 'col-xxl-6 col-xl-6 col-lg-6 col-md-6',
    hasSpaceLeft: true,
    link: "/portfolio-details-modern-light"
  },
  {
    id: 14,
    image: project4,
    category: 'Modelling - 2025',
    title: 'Album cover',
    colClass: 'col-xxl-3 col-xl-4 col-lg-5 col-md-6',
    link: "/portfolio-details-modern-light"
  },
  {
    id: 15,
    image: project5,
    category: 'Modelling - 2025',
    title: 'The Smiths',
    colClass: 'col-xxl-3 col-xl-4 col-lg-6 col-md-6',
    link: "/portfolio-details-modern-light"
  },
  {
    id: 16,
    image: project6,
    category: 'Modelling - 2025',
    title: 'Digital Paintings',
    colClass: 'col-xxl-6 col-xl-6 col-lg-6 col-md-6',
    link: "/portfolio-details-modern-light"
  },
  //Home Fashion studio portfolio data end

  //Portfolio data for coverflow slider
  {
    id: 17,
    image: portfolio11,
    title: "AvoSculpt",
    link: "/portfolio-details-classic-stack-light",
  },
  {
    id: 18,
    image: portfolio12,
    title: "SliceMaster",
    link: "/portfolio-details-classic-stack-light",
  },
  {
    id: 19,
    image: portfolio13,
    title: "AvoEdge",
    link: "/portfolio-details-classic-stack-light",
  },
  {
    id: 20,
    image: portfolio14,
    title: "GreenGrip Cutter",
    link: "/portfolio-details-classic-stack-light",
  },
  {
    id: 21,
    image: portfolio15,
    title: "AvoSlice Pro",
    link: "/portfolio-details-classic-stack-light",
  },
  {
    id: 22,
    image: portfolio16,
    title: "AvoSculpt",
    link: "/portfolio-details-classic-stack-light",
  },
  {
    id: 23,
    image: portfolio17,
    title: "SliceMaster",
    link: "/portfolio-details-classic-stack-light",
  },
  {
    id: 24,
    image: portfolio14,
    title: "AvoEdge",
    link: "/portfolio-details-classic-stack-light",
  },
  {
    id: 25,
    image: portfolio15,
    title: "GreenGrip Cutter",
    link: "/portfolio-details-classic-stack-light",
  },
  {
    id: 26,
    image: portfolio17,
    title: "AvoSlice Pro",
    link: "/portfolio-details-classic-stack-light",
  },
  {
    id: 27,
    image: portfolio13,
    title: "AvoSculpt",
    link: "/portfolio-details-classic-stack-light",
  },
  //Portfolio data for coverflow slider end
  //portfolio col-1 data start
  {
    id: 28,
    image: portfolioThumb1,
    title: "Olivia Rivers",
    category: "Branding - 2025",
    link: "/portfolio-details-gallery-light",
  },
  {
    id: 29,
    image: portfolioThumb2,
    title: "Corporate Branding",
    category: "Branding - 2025",
    link: "/portfolio-details-gallery-light",
  },
  {
    id: 30,
    image: portfolioThumb3,
    title: "Pastel Ladies",
    category: "Branding - 2025",
    link: "/portfolio-details-gallery-light",
  },
  {
    id: 31,
    image: portfolioThumb4,
    title: "Taller Alvarado",
    category: "Branding - 2025",
    link: "/portfolio-details-gallery-light",
  },
  {
    id: 32,
    image: portfolioThumb5,
    title: "Simple Logistics",
    category: "Branding - 2025",
    link: "/portfolio-details-gallery-light",
  },
  {
    id: 33,
    image: portfolioThumb6,
    title: "Electro Hub",
    category: "Branding - 2025",
    link: "/portfolio-details-gallery-light",
  },
  //portfolio col-1 data end

  //portfolio col-3 data start
  {
    id: 34,
    image: portfolioThumb7,
    title: "Olivia Rivers",
    category: "Branding - 2025",
    link: "/portfolio-details-gallery-light",
  },
  {
    id: 35,
    image: portfolioThumb8,
    title: "Corporate Branding",
    category: "Agency - 2025",
    link: "/portfolio-details-gallery-light",
  },
  {
    id: 36,
    image: portfolioThumb9,
    title: "Mobile app",
    category: "Agency - 2025",
    link: "/portfolio-details-gallery-light",
  },
  {
    id: 37,
    image: portfolioThumb10,
    title: "Simple Logistics",
    category: "Agency - 2025",
    link: "/portfolio-details-gallery-light",
  },
  {
    id: 38,
    image: portfolioThumb11,
    title: "Electro Hub",
    category: "Agency - 2025",
    link: "/portfolio-details-gallery-light",
  },
  {
    id: 39,
    image: portfolioThumb12,
    title: "Soko Project",
    category: "Agency - 2025",
    link: "/portfolio-details-gallery-light",
  },
  {
    id: 40,
    image: portfolioThumb13,
    title: "Pastel Ladies",
    category: "Branding - 2025",
    link: "/portfolio-details-gallery-light",
  },
  {
    id: 41,
    image: portfolioThumb14,
    title: "Venus Rebrand",
    category: "Branding - 2025",
    link: "/portfolio-details-gallery-light",
  },
  {
    id: 42,
    image: portfolioThumb15,
    title: "Taller Alvarado",
    category: "Branding - 2025",
    link: "/portfolio-details-gallery-light",
  },
  //portfolio col-3 data end

  //portfolio masonry data start
  {
    id: 43,
    image: portfolioThumb16,
    title: "Olivia Rivers",
    categories: ["Website", "Services"],
    colClass: "col-lg-6",
    link: "/portfolio-details-gallery-light",
  },
  {
    id: 44,
    image: portfolioThumb17,
    title: "Isla Monroe",
    categories: ["Website", "Services"],
    colClass: "col-lg-6",
    link: "/portfolio-details-gallery-light",
  },
  {
    id: 45,
    image: portfolioThumb18,
    title: "Ella Whitmore",
    categories: ["Website", "Services"],
    colClass: "col-lg-12",
    link: "/portfolio-details-gallery-light",
  },
  {
    id: 46,
    image: portfolioThumb19,
    title: "Nora Sinclair",
    categories: ["Website", "Services"],
    colClass: "col-lg-6",
    link: "/portfolio-details-gallery-light",
  },
  {
    id: 47,
    image: portfolioThumb20,
    title: "Hazel Quinn",
    categories: ["Website", "Services"],
    colClass: "col-lg-6",
    link: "/portfolio-details-gallery-light",
  },
  //portfolio masonry data end

  // portfolio-horizontal-showcase start
  {
    id: 48,
    image: sliderImg1,
    title: "Brand some",
    category: "branding",
    link: "/portfolio-details-creative-slider-light",
  },
  {
    id: 49,
    image: sliderImg2,
    title: "Digital Thinker",
    category: "Digital",
    link: "/portfolio-details-creative-slider-light",
  },
  {
    id: 50,
    image: sliderImg3,
    title: "Markus Erickson",
    category: "Markus",
    link: "/portfolio-details-creative-slider-light",
  },
  {
    id: 51,
    image: sliderImg4,
    title: "Emko Furniture",
    category: "Emko",
    link: "/portfolio-details-creative-slider-light",
  },
  {
    id: 52,
    image: sliderImg5,
    title: "Brand some",
    category: "branding",
    link: "/portfolio-details-creative-slider-light",
  },
  {
    id: 53,
    image: sliderImg6,
    title: "Craig Parker",
    category: "Craig",
    link: "/portfolio-details-creative-slider-light",
  },
  {
    id: 54,
    image: sliderImg7,
    title: "Brand some",
    category: "branding",
    link: "/portfolio-details-creative-slider-light",
  },
  // portfolio-horizontal-showcase end
  //portfolio perspective slider data start
  {
    id: 55,
    image: perspectiveImg1,
    category: "Branding",
    title: "Keepgrading",
    link: "/portfolio-details-gallery-light"
  },
  {
    id: 56,
    image: perspectiveImg2,
    category: "Branding",
    title: "Gráfico",
    link: "/portfolio-details-gallery-light"
  },
  {
    id: 57,
    image: perspectiveImg3,
    category: "Branding",
    title: "Diseño",
    link: "/portfolio-details-gallery-light"
  },
  {
    id: 58,
    image: perspectiveImg4,
    category: "Branding",
    title: "Keepgrading",
    link: "/portfolio-details-gallery-light"
  },
  {
    id: 59,
    image: perspectiveImg5,
    category: "Branding",
    title: "Stickers Pack",
    link: "/portfolio-details-gallery-light"
  },
  {
    id: 60,
    image: perspectiveImg6,
    category: "Branding",
    title: "Dinámica",
    link: "/portfolio-details-gallery-light"
  }
  //portfolio perspective slider data end


];

export default portfolioData;
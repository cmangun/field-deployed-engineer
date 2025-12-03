import { StaticImageData } from "next/image";

export interface AppContextType {
  openOffcanvas: boolean;
  setOpenOffcanvas: React.Dispatch<React.SetStateAction<boolean>>;
  openCartOffcanvas: boolean;
  setOpenCartOffcanvas: React.Dispatch<React.SetStateAction<boolean>>;
  toggleCartOffcanvas: () => void;
  toggleOffcanvas: () => void;
  toggleSearch: () => void;
  toggleModal: () => void;
  openModal: boolean;
  openSearch: boolean;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

//define interface for PageParams props
export interface PageParamsProps {
  params: Promise<{ id: number }>;
}

// Type definitions
interface FunFactImage {
  src: StaticImageData;
  delay?: number;
}

export interface Panel {
  id: number;
  style: string;
  subtitle: string;
  title: string;
  images: FunFactImage[];
  secondaryImages?: FunFactImage[];
  bigImage?: FunFactImage;
  number: string;
  customCls?:string;
  funfactNumber?:string;
  spacingCls?:string
}

export interface FunFactImageProps {
  src: StaticImageData;
  alt?: string;
  delay?: number;
  className?: string;
}

export interface FunFactPanelProps {
  panel: Panel;
}

// Represents each step item in the Step section of Home-7 page
export interface StepItemDT {
  id: number;
  number?: string;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  empty?: boolean;
}

// Represents each Choose Item in the Choose section of Home-8 page
export interface ChooseItem {
  id: number;
  icon: React.ReactNode;
  text: string;
  delay: string;
}
//defiend data type slider image home 8 banner
export interface SliderImage {
  id: number;
  src: StaticImageData;
  alt: string;
}
//defiend data for price plan home 8
export interface PricePlanDT {
  id: number;
  name: string;
  description?: string;
  price: string;
  isPopular?: boolean;
  features: string[];
  buttonVariant?: 'black-border' | 'gradient';
  tab?: 'desktop' | 'mobile';
}

//defiend data for Faq home 8
export interface Artifact {
  id: string;
  title: string;
  description: string;
}

export interface Step {
  id: string;
  stepNum: string;
  title: string;
  isExpanded?: boolean;
  artifacts: Artifact[];
}

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
  isExpanded?: boolean;
  steps?: Step[]; // Added for ML Production Playbook FAQ
}

export interface UserStat {
  backgroundColor: string;
  title: string;
  value: string;
  description: string;
  animationDelay: string;
}

// common svg props
export interface SvgProps {
  width?: string;
  height?: string;
  viewBox?: string;
  pathValue?: string;
  pathValueTwo?: string;
  strokeWidth?: number
  color?: string;

}
//service DT
interface ServiceImage {
  src: StaticImageData;
  alt: string;
  offset: number;
  className: string;
}
//type defination for service stack type
export interface ServiceItem {
  id: number;
  subtitle: string;
  number: string;
  title: string;
  description: string;
  link: string;
  linkText: string;
  bgColor?: string;
  bgBlackColor?: string;
  stackColorClass?: string;
  images: ServiceImage[];
}
//service DT end

//common image DT
export interface ImageDT {
  id: number,
  imgSrc: StaticImageData
}
//common image DT end

//Faq accordion DT
export type AccordionId = 'collapseOne' | 'collapseTwo' | 'collapseThree' | 'collapseFour';

export interface AccordionItemDT {
  id: AccordionId;
  step: string;
  title: string;
  content: string;
}
//Faq accordion DT end


// Define TypeScript interface for benefit items
export interface BenefitItemDT {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

// Define TypeScript interface for FAQ items
export interface FAQItemDT {
  id: string;
  question: string;
  answer: string;
  isOpen?: boolean;
}

//fashion Studio ProjectDT
export interface fashionStudioProjectDT {
  id: number;
  title: string;
  subtitle: string;
  images: {
    left: StaticImageData;
    right: StaticImageData;
  };
  isActive?: boolean;
  link:string;
};


// personal portfolio skill data type
export interface SkillCategoryDT {
  title: string;
  items: string[];
  delay: string;
}

export interface SkillToolDT {
  name: string;
  icon: StaticImageData;
  proficiency: string;
  delay: string;
}
//end
//define TypeScript interface for product category
export interface productCategoryDT {
  id: number;
  image: StaticImageData;
  alt: string;
  title: string;
  productCount: string;
  size?: 'sm' | 'lg';
  link: string,
}

//define TypeScript interface for personal portfolio 
export interface SocialItemDT {
  id: number;
  title: string;
  description: string;
  position: string;
  isActive?: boolean;
  thumbs: StaticImageData[];
}
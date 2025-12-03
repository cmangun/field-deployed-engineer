import skilIcon1 from "../../public/assets/img/home-14/skill/skill-icon-1.png";
import skilIcon2 from "../../public/assets/img/home-14/skill/skill-icon-2.png";
import skilIcon3 from "../../public/assets/img/home-14/skill/skill-icon-3.png";
import skilIcon4 from "../../public/assets/img/home-14/skill/skill-icon-4.png";
import { SkillCategoryDT, SkillToolDT } from "@/types/custom-d-t";

// Data for skill categories
export const skillCategories: SkillCategoryDT[] = [
    {
        title: 'Product Design',
        items: ['UX/UI Design', 'Prototyping', 'Design System', 'Developer Handoff'],
        delay: '.3'
    },
    {
        title: 'Brand Design',
        items: ['Logo Design', 'Brand Guidelines', 'Presentations', 'Digital & Print assets'],
        delay: '.5'
    },
    {
        title: 'Motion Design',
        items: ['UI Animations', 'Logo Animations', 'Illustration Animations', 'Explainer Videos'],
        delay: '.3'
    },
    {
        title: 'Web Development',
        items: ['Front-End Development', 'WordPress Theme', 'SEO'],
        delay: '.5'
    }
];

// Data for skill tools
export const skillTools: SkillToolDT[] = [
    {
        name: 'Figma',
        icon: skilIcon1,
        proficiency: '98%',
        delay: '.3'
    },
    {
        name: 'Photoshop',
        icon: skilIcon2,
        proficiency: '98%',
        delay: '.5'
    },
    {
        name: 'Framer',
        icon: skilIcon3,
        proficiency: '65%',
        delay: '.7'
    },
    {
        name: 'HTML',
        icon: skilIcon4,
        proficiency: '98%',
        delay: '.9'
    }
];

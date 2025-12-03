import { StaticImageData } from "next/image";

export interface projectsDT {
    id: number;
    title: string;
    image: StaticImageData | string;
    categories?: string[];
    description?: string
    year?: string;
    client?: string;
    services?: string;
    hasLineBreak?: boolean;
    layout?: string;
    contentClass?: string;
    number?: string
    altText?: string;
    subtitle?: string;
    category?: string;
    delay?: string;
    fadeDirection?: 'left' | 'right';
    link: string;
}
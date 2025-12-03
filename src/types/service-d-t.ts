import { StaticImageData } from "next/image";

export interface servicesDT {
    id: number;
    title: string;
    image?: StaticImageData;
    description?: string;
    categories?: string[];
    isExpanded?: boolean;
    slug?: string;
    number?: string,
    icon?: StaticImageData;
    svgIcon?: React.ElementType;
    delay?: string
    colorClass?: string;
    link:string;
    images?:StaticImageData[],
    text?:string[];
    titleBr?:string[];
    spacingCls?:string;
}
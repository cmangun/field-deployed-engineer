import { StaticImageData } from "next/image";

//Testimonial data type
export interface TestimonialDT {
    id: number,
    quote: string;
    name: string,
    position?: string,
    avatar?: StaticImageData,
    style?: string
    rating?:number;
    role?:string;
    brandLogo?:StaticImageData
    reviewedOn?:string;
    logo?:StaticImageData;
}

export interface TestimonialItem {
    id: number;
    content: string;
}
import { StaticImageData } from "next/image";

//defiend award data type
export interface awardDT {
    id: number,
    year?: string,
    title?: string,
    position?: string,
    image?: StaticImageData;
    date?: string;
    recognition?: string,
    platform?: string,
    project?: string,
    category?: string;
    delay?: string;
}
import { StaticImageData } from "next/image";
import slideImg1 from "../../public/assets/img/shop-home/slider-1.png";
import slideImg2 from "../../public/assets/img/shop-home/slider-2.png";
import slideImg3 from "../../public/assets/img/shop-home/slider-3.png";

interface heroDT {
    title: string;
    subtitle: string;
    image: StaticImageData;
    alt: string;
}

export const shopModernHeroSlideData: heroDT[] = [
    {
        title: "Form dining <br /> chairs",
        subtitle: "Shop Collection",
        image: slideImg1,
        alt: "Form dining chairs"
    },
    {
        title: "Elegant Dining <br /> Seats",
        subtitle: "Shop Collection",
        image: slideImg2,
        alt: "Elegant Dining Seats"
    },
    {
        title: "Stylish Dinner<br /> Chairs",
        subtitle: "Shop Collection",
        image: slideImg3,
        alt: "Stylish Dinner Chairs"
    },
    {
        title: "Modern Dining <br /> Chairs",
        subtitle: "Shop Collection",
        image: slideImg2,
        alt: "Modern Dining Chairs"
    }
];
import { StaticImageData } from "next/image";

export interface ProductDT {
  id: number;
  title: string;
  price: number;
  image: StaticImageData;
  alt: string;
  delay?: string;
  quantity: number;
  link:string;
}

// product modal image data type
export interface ProductImage {
  id: string;
  main: StaticImageData;
  thumbnail: StaticImageData;
  alt: string;
}
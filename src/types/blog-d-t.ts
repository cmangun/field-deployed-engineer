import { StaticImageData } from "next/image";

export interface blogDT {
    id: number,
    author?: string,
    date: string,
    category?: string,
    title: string,
    image: StaticImageData,
    delay?: string;
    excerpt?: string;
    commentCount?: number,
    categories?: string[],
    link:string;
    authorImg?:StaticImageData;
    videoUrl?:string
}


// Define TypeScript interfaces
interface Author {
  name: string;
  role: string;
  image: StaticImageData;
}

interface BaseBlogPost {
  id: number;
  type: string;
  category: string;
}

interface StandardBlogPost extends BaseBlogPost {
  type: "standard";
  author: Author;
  date: string;
  image: StaticImageData;
  title: string;
  excerpt: string;
  videoId?: null;
}

interface TextOnlyBlogPost extends BaseBlogPost {
  type: "text-only";
  author: Author;
  date: string;
  title: string;
  excerpt: string;
}

interface VideoBlogPost extends BaseBlogPost {
  type: "video";
  author: Author;
  date: string;
  image: StaticImageData;
  title: string;
  excerpt: string;
  videoId: string;
}

interface QuoteBlogPost extends BaseBlogPost {
  type: "quote";
  content: string;
  authorName: string;
}

interface LinkBlogPost extends BaseBlogPost {
  type: "link";
  content: string;
  authorName: string;
}

export type BlogPost = StandardBlogPost | TextOnlyBlogPost | VideoBlogPost | QuoteBlogPost | LinkBlogPost;
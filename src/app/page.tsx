import CaseStudyShowcase from "@/components/portfolio/CaseStudyShowcase";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Christopher Mangun | Forward Deployed AI Engineer",
  description: "AI/ML Case Studies - Enterprise AI solutions for regulated industries",
};

export default function HomePage() {
  return <CaseStudyShowcase />;
}

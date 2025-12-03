import Wrapper from "@/layouts/wrapper";
import CaseStudyTemplate from "@/components/caseStudy/CaseStudyTemplate";
import { getCaseStudyBySlug, getCaseStudySlugs } from "@/data/caseStudies";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Generate static params for all case studies
export async function generateStaticParams() {
    return getCaseStudySlugs().map((slug) => ({
        slug: slug,
    }));
}

// Generate metadata for each case study
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const config = getCaseStudyBySlug(slug);
    
    if (!config) {
        return {
            title: "Case Study Not Found",
        };
    }
    
    return {
        title: `${config.study.title} | Christopher Mangun`,
        description: config.study.overview.substring(0, 160),
    };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const config = getCaseStudyBySlug(slug);
    
    if (!config) {
        notFound();
    }
    
    return (
        <Wrapper>
            <CaseStudyTemplate study={config.study} charts={config.charts} />
        </Wrapper>
    );
}

import Wrapper from "@/layouts/wrapper";
import CaseStudyTemplate from "@/components/caseStudy/CaseStudyTemplate";
import { getCaseStudy, getCaseStudyCharts, getCaseStudySlugs } from "@/data/caseStudies";
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
    const study = getCaseStudy(slug);
    
    if (!study) {
        return {
            title: "Case Study Not Found",
        };
    }
    
    return {
        title: `${study.title} | Christopher Mangun`,
        description: study.subtitle?.substring(0, 160) || study.title,
    };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const study = getCaseStudy(slug);
    const charts = getCaseStudyCharts(slug);
    
    if (!study) {
        notFound();
    }
    
    return (
        <Wrapper>
            <CaseStudyTemplate study={study} charts={charts} />
        </Wrapper>
    );
}

import CaseStudyShowcase from '@/components/portfolio/CaseStudyShowcase';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Case Studies | Christopher Mangun",
    description: "Forward Deployed AI Engineer - Enterprise AI solutions for regulated industries",
};

const page = () => {
    return (
        <CaseStudyShowcase />
    );
};

export default page;

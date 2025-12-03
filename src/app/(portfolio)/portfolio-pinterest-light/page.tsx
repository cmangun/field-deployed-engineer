
import PortfolioPinterestMain from '@/pages/portfolios/portfolio-pinterest/PortfolioPinterestMain';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Forward Deployed Engineer | Christopher Mangun",
};

const page = () => {
    return (
        <PortfolioPinterestMain />
    );
};

export default page;
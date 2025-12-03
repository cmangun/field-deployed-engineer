import CareerDetailsMain from '@/pages/career-details/CareerDetailsMain';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Resume | Christopher Mangun - Forward Deployed AI Engineer",
};

const page = () => {
    return (
        <CareerDetailsMain />
    );
};

export default page;
import { PortfolioDT } from '@/data/portfolioData';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface portfolioCardPropsDT {
    item: PortfolioDT;
}
const PortfolioShowcaseCard = ({ item }: portfolioCardPropsDT) => {

    return (
        <div
            key={item.id}
            className="des-portfolio-item showcase-portfolio-panel p-relative not-hide-cursor mb-30" data-cursor="View<br>Demo">
            <Link className="cursor-hide" href={item.link}>
                <div className="des-portfolio-thumb p-relative">
                    <Image
                        src={item.image}
                        alt="portfolio-image"
                        style={{ width: '100%', height: 'auto' }}
                    />
                </div>
                <div className="des-portfolio-category">
                    {item.categories?.map((category, index) => (
                        <span key={index}>{category}</span>
                    ))}
                </div>
                <div className="des-portfolio-category portfolio-meta">
                    <span>{item.year}</span>
                </div>
            </Link>
            <div className="des-portfolio-content">
                <h2 className="des-portfolio-title">
                    <Link href={item.link}>{item.title}</Link>
                </h2>
            </div>
        </div>
    );
};

export default PortfolioShowcaseCard;
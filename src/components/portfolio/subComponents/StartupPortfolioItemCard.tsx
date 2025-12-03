import { PortfolioDT } from '@/data/portfolioData';
import { ArrowThirteen } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface itemsPropsDt {
    item: PortfolioDT;
}

const StartupPortfolioItemCard = ({ item }: itemsPropsDt) => {
    return (
        <div className={`st-portfolio-item ${item.itemClass} z-index-1 mb-30`}>
            <div className="st-portfolio-item-thumb">
                <Link href={item.link}>
                    <Image src={item.image} alt={item.title} />
                </Link>
            </div>
            <div className="st-portfolio-item-content">
                <h4 className="st-portfolio-item-title">
                    <Link href={item.link}>{item.title}</Link>
                </h4>
                <div className="st-portfolio-item-btn">
                    <Link className="tp-line-black" href={item.link}>
                        View case study <span><ArrowThirteen /></span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StartupPortfolioItemCard;



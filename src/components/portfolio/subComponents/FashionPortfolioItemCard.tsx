import { PortfolioDT } from '@/data/portfolioData';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface portfolioPropsDT {
    item: PortfolioDT;

}
const FashionPortfolioItemCard = ({ item }: portfolioPropsDT) => {

    return (
        <Link href={item.link} className="cursor-hide">
            <div
                className={`tp-project-5-2-item not-hide-cursor ${item.hasSpaceLeft ? 'space-left' : ''}`}
                data-cursor="View<br>Demo"
            >
                <div className="tp-project-5-2-thumb">
                    <Image src={item.image} alt={item.title} />
                </div>
                <div className="tp-project-5-2-content">
                    <span>{item.category}</span>
                    <h4 className="tp-project-5-2-title-sm">{item.title}</h4>
                </div>
            </div>
        </Link>
    );
};

export default FashionPortfolioItemCard;
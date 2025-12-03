import { PortfolioDT } from '@/data/portfolioData';
import Link from 'next/link';
import React from 'react';

interface PerspectiveSlideCardProps {
    item: PortfolioDT;
}

const PerspectiveSlideCard: React.FC<PerspectiveSlideCardProps> = ({ item }) => {
    return (
        <div className="tp-perspective-main">
            <div className="tp-perspective-inner">
                <div
                    className="tp-perspective-image"
                    style={{ backgroundImage: `url(${item.image.src})` }}
                >
                    <div className="tp-perspective-content">
                        <span className="tp-perspective-category tp_reveal_anim">
                            {item.category}
                        </span>
                        <h1
                            className="tp-perspective-title tp_reveal_anim not-hide-cursor" data-cursor="View<br>Demo">
                            <Link className="cursor-hide" href={item.link}>
                                {item.title}
                            </Link>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerspectiveSlideCard;
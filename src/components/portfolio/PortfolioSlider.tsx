import portfolioData from '@/data/portfolioData';
import Link from 'next/link';
import React from 'react';

const PortfolioSlider = () => {
    // Display portfolio items from index 47 to 53 (7 items)
    const displayPortfolioItems = portfolioData.slice(47, 54);

    return (
        <div className="parallax-slider-wrapper">
            <div className="parallax-sliders">
                <div className="parallax-slider-inner">
                    {
                        displayPortfolioItems.map((item) => (
                            <div key={item.id} className="parallax-item not-hide-cursor" data-cursor="View<br>Demo">
                                <Link className="cursor-hide" href={item.link}>
                                    <div className="parallax-content">
                                        <span>{item.category}</span>
                                        <h4>{item.title}</h4>
                                    </div>
                                    <div className="parallax-img"></div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default PortfolioSlider;
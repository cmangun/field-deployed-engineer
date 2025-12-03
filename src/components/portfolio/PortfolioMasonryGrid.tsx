import portfolioData from '@/data/portfolioData';
import { useHoverEffect } from '@/hooks/useHoverEffect';
import { ArrowTwentyFour } from '@/svg/ArrowIcons';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PortfolioMasonryGrid = () => {
    const { addToRefs } = useHoverEffect();

    // Display only the last 5 items from the portfolioData array
    const displayPortfolioItems = portfolioData.slice(42, 47);

    const RenderedItems = displayPortfolioItems.map(item => (
        <div key={item.id} className={item.colClass}>
            <div className="tp-portfolio-masonry-grid-item mb-70">
                <div ref={addToRefs} className="tp-portfolio-masonry-grid-thumb tp--hover-item">
                    <Link href={item.link}>
                        <div className="tp--hover-img" data-displacement="assets/img/webgl/1.jpg" data-intensity="0.6" data-speedin="1" data-speedout="1">
                            <Image style={{ width: "100%", height: "auto" }} src={item.image} alt="portfolio image" />
                        </div>
                    </Link>
                </div>
                <div className="tp-portfolio-masonry-grid-content d-flex align-items-center justify-content-between">
                    <div className="tp-portfolio-masonry-grid-left">
                        <h4 className="tp-portfolio-masonry-grid-title"><Link className="tp-line-white" href={item.link}>{item.title}</Link></h4>
                    </div>
                    <div className="tp-portfolio-masonry-grid-categories">
                        {item.categories?.map((category, index) => (
                            <span key={index}>{category}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    ));
    return (
        <div className="tp-portfolio-masonry-grid-ptb pt-55 pb-140">
            <div className="container container-1830">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="tp-portfolio-masonry-grid-heading pb-40">
                            <span>Featured Project:</span>
                        </div>
                    </div>
                    {/* Rendered Items  */}
                    {RenderedItems}
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="tp-portfolio-masonry-grid-bottom">
                            <Link className="tp-btn-animation" href="#">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <span key={index}>
                                        Load more Projects <ArrowTwentyFour />
                                    </span>
                                ))}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioMasonryGrid;
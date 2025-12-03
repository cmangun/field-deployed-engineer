import portfolioData from '@/data/portfolioData';
import { useHoverEffect } from '@/hooks/useHoverEffect';
import { ArrowTwentyFour } from '@/svg/ArrowIcons';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PortfolioColTwo = () => {
    const { addToRefs } = useHoverEffect();
    // Display only the last 6 items from the portfolioData array
    const displayPortfolioItems = portfolioData.slice(27, 33);

    return (
        <div className="tp-portfolio-inner-ptb pb-120">
            <div className="container container-1430">
                <div className="tp-portfolio-tab-content-wrap">
                    <div className="row">
                        {
                            displayPortfolioItems.map(item => (
                                <div key={item.id} className="col-md-6">
                                    <div className="tp-portfolio-inner-item mb-65">
                                        <div ref={addToRefs} className="tp-portfolio-inner-thumb tp--hover-item">
                                            <Link href={item.link}>
                                                <div className=" tp--hover-img"
                                                    data-displacement="assets/img/webgl/1.jpg"
                                                    data-intensity="0.6" data-speedin="1" data-speedout="1">
                                                    <Image style={{ width: "100%", height: "auto" }} src={item.image} alt="portfolio image" />
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="tp-portfolio-inner-content">
                                            <h4 className="tp-portfolio-inner-title"><Link className="tp-line-white" href={item.link}>{item.title}</Link></h4>
                                            <span>{item.category}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
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
        </div>
    );
};

export default PortfolioColTwo;
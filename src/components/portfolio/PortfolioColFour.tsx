

import portfolioData from '@/data/portfolioData';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PortfolioColFour = () => {
    // Simulate different rows by slicing the data array
    const displayPortfolioItems = portfolioData.slice(33, 41);

    // Function to render portfolio items
    const renderPortfolioItems = (items: typeof portfolioData) => {
        return items.map(item => (
            <div className="col-xl-3 col-lg-4 col-md-6" key={item.id}>
                <div className="tp-portfolio-inner-item mb-65">
                    <div className="tp-portfolio-inner-thumb">
                        <Link href={item.link}><Image style={{ width: "100%", height: "auto" }} src={item.image} alt={item.title} /></Link>
                    </div>
                    <div className="tp-portfolio-inner-content">
                        <h4 className="tp-portfolio-inner-title fs-30"><Link className="tp-line-white" href={item.link}>{item.title}</Link></h4>
                        <span>{item.category}</span>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className="tp-portfolio-inner-ptb pb-70">
            <div className="container container-1830">
                <div className="tp-portfolio-tab-content-wrap">
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex={0}>
                            <div className="row">
                                {renderPortfolioItems(displayPortfolioItems)}
                            </div>
                        </div>
                        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex={0}>
                            <div className="row">
                                {renderPortfolioItems(displayPortfolioItems)}
                            </div>
                        </div>
                        <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex={0}>
                            <div className="row">
                                {renderPortfolioItems(displayPortfolioItems)}
                            </div>
                        </div>
                        <div className="tab-pane fade" id="nav-four" role="tabpanel" aria-labelledby="nav-four-tab" tabIndex={0}>
                            <div className="row">
                                {renderPortfolioItems(displayPortfolioItems)}
                            </div>
                        </div>
                        <div className="tab-pane fade" id="nav-five" role="tabpanel" aria-labelledby="nav-five-tab" tabIndex={0}>
                            <div className="row">
                                {renderPortfolioItems(displayPortfolioItems)}
                            </div>
                        </div>
                        <div className="tab-pane fade" id="nav-six" role="tabpanel" aria-labelledby="nav-six-tab" tabIndex={0}>
                            <div className="row">
                                {renderPortfolioItems(displayPortfolioItems)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioColFour;
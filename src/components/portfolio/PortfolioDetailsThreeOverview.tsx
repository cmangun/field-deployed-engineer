import { ArrowTwentyEight } from '@/svg/ArrowIcons';
import Link from 'next/link';
import React from 'react';

const PortfolioDetailsThreeOverview = () => {
    return (
        <div className="tp-pd-3-overview-area pt-120 pb-95">
            <div className="container container-1230">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="tp-pd-3-overview-left tp_fade_anim" data-delay=".3">
                            <span className="tp-pd-3-subtitle">Digital platform</span>
                            <h4 className="tp-pd-3-title">Project Overview</h4>
                            <Link className="tp-btn-border" href="/portfolio-details-creative-slider-light">
                                Visit Site{" "}
                                <span><ArrowTwentyEight /></span>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="tp-pd-3-overview-right">
                            <div className="tp-pd-3-overview-text">
                                <p> ElectroHub, a prominent retailer in the electronics
                                    market, needed a refreshed visual identity to stand out among competitors and appeal to a tech-savvy audience.
                                    Thegoal was to create a cohesive and modern
                                </p>
                            </div>
                            <div className="row">
                                <div className="col-xl-6">
                                    <div className="tp-pd-3-overview-info mb-40">
                                        <span>Client</span>
                                        <h4>Envato Market</h4>
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <div className="tp-pd-3-overview-info mb-40">
                                        <span>Service</span>
                                        <h4>Visual Identity</h4>
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <div className="tp-pd-3-overview-info mb-40">
                                        <span>Service</span>
                                        <h4>Visual Identity</h4>
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <div className="tp-pd-3-overview-info mb-40">
                                        <span>Date</span>
                                        <h4>8 June 2020</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioDetailsThreeOverview;
import port1 from '../../../public/assets/img/portfolio/portfolio-details-3/port-5.jpg';
import port2 from '../../../public/assets/img/portfolio/portfolio-details-3/port-6.jpg';
import Image from 'next/image';
import React from 'react';

const PortfolioDetailsThreePortfolio = () => {
    return (
        <div className="tp-pd-3-portfolio-area pt-200 pb-60">
            <div className="container container-1200">
                <div className="tp-pd-3-portfolio-item-wrap">
                    <div className="tp-pd-3-portfolio-item mb-120">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="tp-pd-3-portfolio-thumb">
                                    <Image style={{ width: "100%", height: "auto" }} className="w-100" src={port1} alt="port 1" />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="tp-pd-3-portfolio-content tp-pd-3-content-pin mt-20 ml-40">
                                    <span className="tp-pd-3-subtitle">Digital platform</span>
                                    <h4 className="tp-pd-3-title">The Challenge</h4>
                                    <div className="tp-pd-3-overview-text">
                                        <p> ElectroHub, a prominent retailer in the electronics <br />
                                            market, needed a refreshed visual identity to stand <br />
                                            out among competitors .
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tp-pd-3-portfolio-item-wrap pt-120">
                    <div className="tp-pd-3-portfolio-item mb-120">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="tp-pd-3-portfolio-content tp-pd-3-content-pin mt-20 mr-40">
                                    <span className="tp-pd-3-subtitle">Digital platform</span>
                                    <h4 className="tp-pd-3-title">The Solution</h4>
                                    <div className="tp-pd-3-overview-text">
                                        <p> ElectroHub, a prominent retailer in the electronics <br />
                                            market, needed a refreshed visual identity to stand <br />
                                            out among competitors .
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="tp-pd-3-portfolio-thumb">
                                    <Image style={{ width: "100%", height: "auto" }} className="w-100" src={port2} alt="port 2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioDetailsThreePortfolio;
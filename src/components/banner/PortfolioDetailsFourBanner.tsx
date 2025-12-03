import thumb from '../../../public/assets/img/portfolio/portfolio-details-4/portfolio-details-thumb-1.jpg';
import Image from 'next/image';
import React from 'react';

const PortfolioDetailsFourBanner = () => {
    return (
        <div className="tp-pd-4-banner-ptb img-box fix pt-120" style={{ backgroundColor: "#FFF669" }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="tp-pd-4-banner-thumb tp-top-bottom-scroll">
                            <Image style={{ width: "100%", height: "auto" }} src={thumb} alt="thumb" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioDetailsFourBanner;
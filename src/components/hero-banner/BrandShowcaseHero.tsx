import { ArrowTwenty } from '@/svg/ArrowIcons';
import { CareerShapeTwo } from '@/svg/HeroShape';
import React from 'react';

const BrandShowcaseHero = () => {
    return (
        <div className="tp-contact-us-ptb p-relative">
            <div className="tp-career-shape-1">
                <span><CareerShapeTwo /></span>
            </div>
            <div className="container container-1230">
                <div className="ar-about-us-4-hero-ptb">
                    <div className="row justify-content-center">
                        <div className="col-xl-12">
                            <div className="ar-hero-title-box tp_fade_anim" data-delay=".3">
                                <div className="ar-about-us-4-title-box d-flex align-items-center mb-20">
                                    <span className="tp-section-subtitle pre tp_fade_anim">Brand</span>
                                    <div className="ar-about-us-4-icon">
                                        <ArrowTwenty />
                                    </div>
                                </div>
                                <h3 className="tp-career-title pb-30">Our Sponsors</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4"></div>
                        <div className="col-lg-8">
                            <div className="tp-faq-text tp_fade_anim" data-delay=".5">
                                <p className="m-0">
                                    Agntix is a beacon of best innovation and the <br /> dynamic parent a company of wealcoder and many <br />
                                    other subsidiaries.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandShowcaseHero;
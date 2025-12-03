import aboutShape from '../../../public/assets/img/about-us/about-us-4/about-us-4-shape-1.png';
import teambg from '../../../public/assets/img/team/team-bg.png';
import { CareerShape } from '@/svg/HeroShape';
import { ArrowTwenty } from '@/svg/ArrowIcons';
import Image from 'next/image';
import React from 'react';

const PriceHero = () => {
    return (
        <div className="ar-hero-area p-relative" style={{ backgroundImage: `url(${teambg.src})` }}>
            <div className="tp-career-shape-1">
                <span>
                    <CareerShape />
                </span>
            </div>
            <div className="container container-1230">
                <div className="ar-about-us-4-hero-ptb">
                    <div className="row justify-content-center">
                        <div className="col-xl-12">
                            <div className="ar-hero-title-box tp_fade_anim" data-delay=".3">
                                <div className="ar-about-us-4-title-box d-flex align-items-center mb-20">
                                    <span className="tp-section-subtitle pre tp_fade_anim">pricing plans</span>
                                    <div className="ar-about-us-4-icon">
                                        <ArrowTwenty />
                                    </div>
                                </div>
                                <h3 className="tp-career-title pb-30">Start with <span className="shape-1">
                                    <Image src={aboutShape} alt="about shape" />
                                </span> <br />affordable price</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4"></div>
                        <div className="col-lg-8">
                            <div className="tp-faq-text tp_fade_anim">
                                <p>Agntix is a beacon of best innovation and the dynamic <br /> parent a company of wealcoder and many other subsidiaries.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceHero;
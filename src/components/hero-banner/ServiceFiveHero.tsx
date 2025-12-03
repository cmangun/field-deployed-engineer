import shape from '../../../public/assets/img/about-us/about-us-4/about-us-4-shape-1.png';
import teamBgImg from '../../../public/assets/img/team/team-bg.png';
import { ArrowTwenty } from '@/svg/ArrowIcons';
import { CareerShape } from '@/svg/HeroShape';
import Image from 'next/image';
import React from 'react';

const ServiceFiveHero = () => {
    return (
        <div className="ar-hero-area p-relative pt-190 pb-100" style={{ backgroundImage: `url(${teamBgImg.src})` }}>
            <div className="career-shape-style">
                <span><CareerShape /></span>
            </div>
            <div className="container container-1230">
                <div className="row justify-content-center">
                    <div className="col-xl-12">
                        <div className="ar-hero-title-box service-5-heading tp_fade_anim mb-80" data-delay=".3">
                            <div className="ar-about-us-4-title-box d-flex align-items-center mb-20">
                                <span className="tp-section-subtitle pre tp_fade_anim">Web Design</span>
                                <div className="ar-about-us-4-icon">
                                    <ArrowTwenty />
                                </div>
                            </div>
                            <h3 className="tp-career-title">Web and mobile <span className="shape-1"><Image src={shape} alt="shape" /></span> <br />development</h3>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-8">
                        <div className="tp-service-5-text tp_fade_anim" data-delay=".5">
                            <p>This section explores a common challenge developer with face <br />
                                such as cross platform compatibility make within performance <br />
                                optimization and user experience</p>
                        </div>
                        <div className="tp-service-5-list tp_fade_anim " data-delay=".7">
                            <ul>
                                <li>+ API Development</li>
                                <li>+ Cloud Migration</li>
                                <li>+ JavaScript</li>
                                <li>+ WordPress</li>
                                <li>+ Front End Development</li>
                                <li>+ Flutter Framework</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceFiveHero;
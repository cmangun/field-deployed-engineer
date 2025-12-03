import aboutUsBg from '../../../public/assets/img/about-us/about-us-4/about-us-4-bg.png';
import shape from '../../../public/assets/img/about-us/about-us-4/about-us-4-shape-1.png';
import user from '../../../public/assets/img/about-us/about-us-4/career-user.png';
import { ArrowFourteen, ArrowTwenty } from '@/svg/ArrowIcons';
import { CareerShape } from '@/svg/HeroShape';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CareerHero = () => {
    return (
        <div className="ar-hero-area p-relative" style={{ backgroundImage: `url(${aboutUsBg.src})` }}>
            <div className="career-shape-style">
                <span><CareerShape /></span>
            </div>
            <div className="container container-1230">
                <div className="ar-about-us-4-hero-ptb">
                    <div className="row justify-content-center">
                        <div className="col-xl-12">
                            <div className="ar-hero-title-box tp_fade_anim" data-delay=".3">
                                <div className="ar-about-us-4-title-box d-flex align-items-center mb-20">
                                    <span className="tp-section-subtitle pre tp_fade_anim">Career</span>
                                    <div className="ar-about-us-4-icon">
                                        <ArrowTwenty />
                                    </div>
                                </div>
                                <h3 className="tp-career-title">Join us & make <span className="shape-1"><Image src={shape} alt="Shape" /></span> <br />
                                    an impact through <br />
                                    <span className="shape-2"><Image src={user} alt="career user" /></span> design.
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tp-career-btn">
                <div className="st-hero-btn tp_fade_anim" data-delay=".3" data-fade-from="top" data-ease="bounce">
                    <Link href="/team-light">
                        <span className="st-hero-btn-svg">
                            <ArrowFourteen />
                        </span>
                        <span className="st-hero-btn-text">Meet with <br /> the team</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CareerHero;
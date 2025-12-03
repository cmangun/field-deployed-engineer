import aboutShape from '../../../public/assets/img/about-us/about-us-4/about-us-4-shape-1.png';
import aboutBg from '../../../public/assets/img/about-us/about-us-4/about-us-4-bg.png';
import Image from 'next/image';
import React from 'react';

const AboutUsHero = () => {
    return (
        <div className="ar-hero-area p-relative" style={{ backgroundImage: `url(${aboutBg.src})` }}>
            <div className="ar-about-us-4-shape">
                <Image src={aboutShape} alt="about shape" />
            </div>
            <div className="container container-1230">
                <div className="ar-about-us-4-hero-ptb">
                    <div className="row justify-content-center">
                        <div className="col-xl-12">
                            <div className="ar-hero-title-box tp_fade_anim" data-delay=".3">
                                <h3 className="ar-about-us-4-title">Fueling Minds <br />
                                    Inspiring Designs..</h3>
                                <div className="ar-about-us-4-title-box d-flex justify-content-end">
                                    <span className="tp-section-subtitle pre">About Us</span>
                                    <div className="ar-about-us-4-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="81" height="9" viewBox="0 0 81 9" fill="none">
                                            <rect y="4" width="80" height="1" fill="#111013" />
                                            <path d="M77 7.96366L80.5 4.48183L77 1" stroke="#111013" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <p>An independent web design and branding agency <br />
                                        in Manchester set up in 2012 who care, build relationships, <br /> have industry experience, and win awards.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsHero;
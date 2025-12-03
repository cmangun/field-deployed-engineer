import teamBg from '../../../public/assets/img/team/team-bg.png';
import { ArrowTwenty } from '@/svg/ArrowIcons';
import { CareerShape } from '@/svg/HeroShape';
import React from 'react';

const TeamDetailsHero = () => {
    return (
        <div className="ar-hero-area p-relative" style={{ backgroundImage: `url(${teamBg.src})` }}>
            <div className="tp-career-shape-1">
                <span><CareerShape /></span>
            </div>
            <div className="container container-1230">
                <div className="ar-about-us-4-hero-ptb pb-70">
                    <div className="row justify-content-center">
                        <div className="col-xl-12">
                            <div className="ar-hero-title-box tp_fade_anim" data-delay=".3">
                                <div className="ar-about-us-4-title-box d-flex align-items-center mb-15">
                                    <span className="tp-section-subtitle pre tp_fade_anim">Team Details</span>
                                    <div className="ar-about-us-4-icon">
                                        <ArrowTwenty />
                                    </div>
                                </div>
                                <h3 className="tp-career-title fs-70">Team Details</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamDetailsHero;
import careerUser from '../../../public/assets/img/about-us/about-us-4/career-user.png';
import shape from '../../../public/assets/img/about-us/about-us-4/about-us-4-shape-1.png';
import teamBg from '../../../public/assets/img/team/team-bg.png';
import { ArrowFourteen, ArrowTwenty } from '@/svg/ArrowIcons';
import { CareerShape } from '@/svg/HeroShape';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const TeamHero = () => {
    return (
        <div className="tp-team-inner-ptb p-relative pb-70" style={{ backgroundImage: `url(${teamBg.src})` }}>
            <div className="tp-career-shape-1">
                <span> <CareerShape /></span>
            </div>
            <div className="container container-1230">
                <div className="ar-about-us-4-hero-ptb">
                    <div className="row justify-content-center">
                        <div className="col-xl-12">
                            <div className="ar-hero-title-box tp_fade_anim" data-delay=".3">
                                <div className="ar-about-us-4-title-box d-flex align-items-center mb-20">
                                    <span className="tp-section-subtitle pre tp_fade_anim">Team</span>
                                    <div className="ar-about-us-4-icon">
                                        <ArrowTwenty />
                                    </div>
                                </div>
                                <h3 className="tp-career-title">Meet the mins <span className="shape-1"><Image src={shape} alt="shape" /></span> <br />
                                    <span className="shape-2"><Image src={careerUser} alt="career user" /></span>behind the magic
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="tp-team-hero-subtitle tp_fade_anim" data-delay=".3">
                            <span>Good people <br /> Big projects</span>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="tp-team-hero-text">
                            <div className="tp_fade_anim" data-delay=".5">
                                <p>At Agntix, our team is our greatest asset. Comprised <br />
                                    of creative thinkers, technical wizards, and strategic <br />
                                    visionaries, we work in harmony to bring your digital <br />
                                    dreams to life. <br />
                                </p>
                            </div>
                            <div className="tp_fade_anim" data-delay=".7">
                                <p>Get to know the passionate professionals dedicated <br />
                                    to pushing the boundaries of design and innovation. <br />
                                    Join us on a tour of talent and discover how our <br />
                                    people make all the difference.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tp-career-btn">
                <div className="st-hero-btn tp-bounce">
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

export default TeamHero;
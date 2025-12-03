import heroShape from '../../../public/assets/img/home-12/hero/hero-shape.png';
import heroPlain from '../../../public/assets/img/home-12/hero/hero-plain.svg';
import userImg from '../../../public/assets/img/home-12/hero/user.png';
import { ArrowFourteen } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const StartupAgencyHero = () => {
    return (
        <div className="st-hero-area st-hero-ptb tp-bounce-trigger p-relative">
            <div className="st-hero-border">
                <div className="tp-border-line-wrap">
                    <div className="tp-border-line"></div>
                    <div className="tp-border-line line-2"></div>
                    <div className="tp-border-line line-3"></div>
                    <div className="tp-border-line line-4"></div>
                </div>
            </div>
            <div className="st-hero-shape">
                <Image data-speed="1.1" src={heroShape} alt="hero shape" />
            </div>
            <div className="container container-1320">
                <div className="row justify-content-center">
                    <div className="col-xl-12">
                        <div className="st-hero-heading-box mb-50 z-index-1">
                            <span className="st-hero-plain" data-speed="1.1"><span></span> <Image src={heroPlain} alt="hero plain" /></span>
                            <h3 className="st-hero-title tp-text-revel-anim">MAGICAL
                                <i>STARTUP</i>
                            </h3>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="st-hero-bottom-left pb-20">
                            <div className="st-hero-btn tp-bounce">
                                <Link href="/contact">
                                    <span className="st-hero-btn-text">LET’S TALK </span>
                                    <span className="st-hero-btn-svg">
                                        <ArrowFourteen />
                                    </span>
                                </Link>
                            </div>
                            <div className="st-hero-user">
                                <div className="st-hero-user-content d-flex align-items-center">
                                    <div className="st-hero-user-img mr-15">
                                        <Image src={userImg} alt="user image" />
                                    </div>
                                    <span>Connect <br />
                                        More People</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="st-hero-bottom-right pb-20">
                            <div className="tp_text_anim">
                                <p>Creative startup solutions <br />
                                    for business looking to <br />
                                    stand out. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartupAgencyHero;
import heroThumbBg from '../../../public/assets/img/home-14/hero/hero-thumb-bg.jpg';
import heroThumb from '../../../public/assets/img/home-14/hero/hero-thumb-1.png';
import { ArrowSvg } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PersonalPortfolioHero = () => {
    return (
        <div className="pp-hero-area pp-hero-hight pp-hero-ptb z-index-1 d-flex align-items-end" style={{ backgroundImage: `url(${heroThumbBg.src})` }}>
            <div className="pp-hero-bg">
                <Image style={{ width: "auto", height: "auto" }} data-speed=".8" src={heroThumb} alt="hero thumb" />
            </div>
            <div className="container container-1800">
                <div className="row">
                    <div className="col-xl-9 col-lg-8 col-md-6">
                        <div className="pp-hero-left z-index-1 pb-100">
                            <span className="pp-hero-text tp-split-text tp-split-right">Freelance 3D <br />designer Based <br />in London</span>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6">
                        <div className="pp-hero-right z-index-2 pb-100">
                            <div className="tp_text_anim">
                                <p>
                                    I’m dedicated to crafting websites <br />
                                    that bring your ideas to life, combining <br />
                                    design and development
                                </p>
                            </div>
                            <div className="pp-hero-btn">
                                <div className="tp-btn-red-circle-box tp-pp-btn-style tp_fade_anim" data-delay=".7" data-fade-from="top" data-ease="bounce">
                                    <Link className="tp-btn-red-circle-icon" href="/contact-me-light">
                                        <span>
                                            <ArrowSvg width={12} height={12} />
                                        </span>
                                    </Link>
                                    <Link className="tp-btn-red-circle-text" href="/contact-me-light">Contact Me</Link>
                                    <Link className="tp-btn-red-circle-icon" href="/contact-me-light">
                                        <span>
                                            <ArrowSvg width={12} height={12} />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="pp-hero-heading text-center z-index-1">
                            <h4 className="pp-hero-title tp-text-revel-anim" data-ease="bounce">Joris Brianti</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalPortfolioHero;
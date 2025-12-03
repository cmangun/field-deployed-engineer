import heroShapeThree from '../../../public/assets/img/home-11/hero/hero-shape-2.png';
import heroShapeFour from '../../../public/assets/img/home-11/hero/hero-shape-3.png';
import heroShapeTwo from '../../../public/assets/img/home-11/hero/hero-shape-4.png';
import heroShape from '../../../public/assets/img/home-11/hero/hero-shape-1.png';
import heroThumb from '../../../public/assets/img/home-11/hero/hero-thumb.png';
import { EmailIconThree, HeroShape } from '@/svg';
import { ArrowNine } from '@/svg/ArrowIcons';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ITSolutionHero = () => {
    return (
        <div className="it-hero-area p-relative fix">
            <div className="it-hero-shape-wrap">
                <span className="it-hero-shape-1">
                    <HeroShape />
                </span>
                <Image style={{ width: "auto", height: "auto" }} priority className="it-hero-shape-2" src={heroShapeTwo} alt="hero-shape" />
            </div>
            <div className="container container-1630">
                <div className="row align-items-end">
                    <div className="col-xl-6">
                        <div className="it-hero-content it-hero-ptb">
                            <span className="it-hero-subtitle tp_fade_anim" data-delay=".3">Get Solid Solution</span>
                            <h4 className="it-hero-title tp_fade_anim" data-delay=".5">
                                Reliable &
                                <span>{" "}<Image className="img-1" src={heroShape} alt="hero-shape" /></span><br />
                                Secure Managed <br />
                                <span><Image className="img-2" src={heroShapeThree} alt="hero-shape" /></span>{" "}
                                IT Services.
                            </h4>
                            <div className="tp_fade_anim" data-delay=".7">
                                <p>Best solutions for big data & Technology services</p>
                            </div>
                            <div className="it-hero-btn-box d-flex align-items-center flex-wrap">
                                <div className="tp_fade_anim" data-delay=".5" data-fade-from="top" data-ease="bounce">
                                    <Link className="tp-btn-black-radius btn-blue-bg  d-inline-flex align-items-center justify-content-between mr-15" href="/service-2-light">
                                        <span>
                                            <span className="text-1">Our all Services</span>
                                            <span className="text-2">Our all Services</span>
                                        </span>
                                        <i>
                                            <span>
                                                <ArrowNine />
                                                <ArrowNine />
                                            </span>
                                        </i>
                                    </Link>
                                </div>
                                <div className="tp_fade_anim" data-delay=".7" data-fade-from="top" data-ease="bounce">
                                    <Link className="tp-btn-black-radius btn-blue-bg btn-border d-inline-flex align-items-center justify-content-between" href="/contact">
                                        <span>
                                            <span className="text-1">Contact us</span>
                                            <span className="text-2">Contact us</span>
                                        </span>
                                        <i>
                                            <span>
                                                <EmailIconThree />
                                                <EmailIconThree />
                                            </span>
                                        </i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="it-hero-thumb p-relative mb-35">
                            <div className="tp_fade_anim" data-delay=".5" data-fade-from="right">
                                <Image style={{ width: "auto", height: "auto" }} data-speed=".9" src={heroThumb} alt="hero-thumb" />
                            </div>
                            <Image data-speed="1.1" className="inner-img tp_fade_anim" data-delay=".7" data-fade-from="top" src={heroShapeFour} alt="hero-shape" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ITSolutionHero;
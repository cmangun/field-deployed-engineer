import heroBg from '../../../public/assets/img/home-02/hero/hero-bg.jpg';
import avaterImg from '../../../public/assets/img/home-02/hero/avater.png';
import { useTextAnimation } from '@/hooks/useTextAnimations';
import { ArrowTwentyEight } from '@/svg/ArrowIcons';
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AboutModernHero = ({ heroTitle = "Our Studio" }) => {
    const headingRef = useRef<HTMLHeadingElement>(null);
    useTextAnimation(headingRef);

    return (
        <div className="tp-hero-2-wrapper">
            <div className="tp-about-us-area include-bg pt-180 pb-150" style={{ backgroundImage: `url(${heroBg.src})` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="tp-hero-2-content text-center mb-25">
                                <span className="tp-hero-2-subtitle tp_fade_anim" data-delay=".3">
                                    Best-in-class local <br /> benefits for everyone, everywhere
                                </span>
                                <h1 ref={headingRef} className="tp-hero-2-title about-us tp_fade_anim text-scale-anim" data-delay=".5">{heroTitle}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="tp-hero-2-avater-box d-flex align-items-center justify-content-center justify-content-md-start tp_fade_anim" data-delay=".7">
                                <div className="tp-hero-2-avater">
                                    <Image src={avaterImg} alt="avater image" />
                                </div>
                                <div className="tp-hero-2-avater-content">
                                    <h4>2500+</h4>
                                    <span>Engaged and counting</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="tp-hero-2-btn-box tp-light-bg-btn text-center text-md-end tp_fade_anim" data-delay=".7">
                                <Link className="tp-btn-border" href="/portfolio-details-creative-slider-light">
                                    Explore Our Projects {" "}
                                    <span>
                                        <ArrowTwentyEight />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutModernHero;
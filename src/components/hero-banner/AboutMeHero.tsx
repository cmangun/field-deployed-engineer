import aboutThumb from "../../../public/assets/img/about-me/about-me-thumb-1.png";
import { DribbleTwo, InstagramTwo, TwitterTwo } from "@/svg";
import { DownArrow } from "@/svg/ArrowIcons";
import Image from "next/image";
import Link from 'next/link';
import React from 'react';

const AboutMeHero: React.FC = () => {
    return (
        <div className="pp-about-me-area pp-about-me-ptb z-index-1" style={{ backgroundColor: "#2F1F19" }}>
            <div className="container-fluid">
                <div className="pp-about-me-heading text-center z-index-1 d-none d-md-block">
                    <h4 className="pp-about-me-title tp-char-animation">Hello, {`I'm`} Joris Brian</h4>
                </div>
                <div className="pp-about-me-heading-slider text-center z-index-1 d-block d-md-none">
                    <div className="swiper-container tp-brand-active">
                        <div className="swiper-wrapper slide-transtion">
                            {[...Array(5)].map((_, index) => (
                                <div className="swiper-slide" key={index}>
                                    <h4 className="pp-about-me-title">Hello, {`I'm`} Joris Brian</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="container container-1350">
                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-12">
                        <div className="pp-hero-left z-index-1">
                            <div className="pp-about-me-hero-left pt-90 pb-100 z-index-1">
                                <div className="pp-about-me-btn">
                                    <Link href="#">
                                        <DownArrow width="16" height="16" path="M1 1L15 15" pathTwo="M15 1V15H1" />
                                    </Link>
                                </div>
                                <span className="pp-hero-text tp-split-text tp-split-right">Freelance 3D <br />designer based <br />in London</span>
                                <p>Open to work</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-7 col-lg-7 order-lg-2 order-3">
                        <div className="pp-about-me-thumb z-index-1 text-center">
                            <Image src={aboutThumb} alt="about thumb" priority />
                        </div>
                    </div>
                    <div className="col-xl-1 col-lg-1 col-md-12 order-lg-3 order-2">
                        <div className="pp-about-me-social text-start text-lg-end pt-160 z-index-2">
                            <div className="tp-footer-widget-social">
                                <Link href="#">
                                    <span><DribbleTwo /></span>
                                </Link>
                                <Link href="#">
                                    <span><TwitterTwo /></span>
                                </Link>
                                <Link href="#">
                                    <span><InstagramTwo /></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutMeHero;
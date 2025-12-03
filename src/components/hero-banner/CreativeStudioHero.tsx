import heroShape from "../../../public/assets/img/home-04/hero/hero-shape-1.png";
import VideoPlayer from "../shared/VideoPlayer/VideoPlayer";
import { ArrowSvg, ButtonBlurFilter } from "@/svg";
import { ArrowTwelve } from "@/svg/ArrowIcons";
import Image from "next/image";
import Link from 'next/link';
import React from 'react';

const CreativeStudioHero = () => {
    return (
        <div className="creative-2-hero-wrap pt-180">
            <div className="container container-1610">
                <div className="creative-2-hero-top-wrap mb-60">
                    <div className="row align-items-end">
                        <div className="col-xl-6">
                            <div className="creative-2-hero-title-box">
                                <h2 className="creative-2-hero-title">
                                    Scale y<Image className="d-none d-md-inline-block" src={heroShape} alt="hero-shape" />ur
                                    Business
                                </h2>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="creative-2-hero-btn-wrap">
                                <div className="row">
                                    <div className="col-xl-4">
                                        <div className="creative-2-hero-text p-relative">
                                            <p>
                                                An independent web design & <br />
                                                branding agency
                                            </p>
                                            <span className="creative-2-hero-icon">
                                                <ArrowTwelve />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-xl-8">
                                        <div className="creative-2-hero-btn-wrap text-xl-end">
                                            <div className="creative-2-hero-btn">
                                                <Link href="/portfolio-details-classic-stack-light" className="tp-btn-black btn-green-light-bg pb-10 pr-15">
                                                    <span className="tp-btn-black-filter-blur">
                                                        <ButtonBlurFilter filterId="buttonFilter3" />
                                                    </span>
                                                    <span className="tp-btn-black-filter d-inline-flex align-items-center" style={{ filter: 'url(#buttonFilter3)' }}>
                                                        <span className="tp-btn-black-text">View our work</span>
                                                        <span className="tp-btn-black-circle">
                                                            <ArrowSvg />
                                                        </span>
                                                    </span>
                                                </Link>
                                                <Link href="/team-light" className="tp-btn-black btn-transparent-bg pb-10">
                                                    <span className="tp-btn-black-filter-blur">
                                                        <ButtonBlurFilter filterId="buttonFilter11" />
                                                    </span>
                                                    <span className="tp-btn-black-filter d-inline-flex align-items-center" style={{ filter: 'url(#buttonFilter11)' }}>
                                                        <span className="tp-btn-black-text">Meet the team</span>
                                                        <span className="tp-btn-black-circle">
                                                            <ArrowSvg />
                                                        </span>
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="creative-2-hero-banner-area">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="creative-hero-banner-wrap">
                                <div className="creative-hero-banner">
                                    <VideoPlayer videoUrl="https://html.aqlova.com/videos/liko/liko.mp4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreativeStudioHero;
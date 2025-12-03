import heroBottomBg from '../../../public/assets/img/home-10/hero/app-hero-bottom-bg.png';
import heroBottomBgTwo from '../../../public/assets/img/home-10/hero/app-hero-bg.png';
import heroHandShape from '../../../public/assets/img/home-10/hero/hero-hand-shape.png';
import heroSecureImg from '../../../public/assets/img/home-10/hero/hero-secure.png';
import heroToolsImg from '../../../public/assets/img/home-10/hero/hero-tools.png';
import shape from '../../../public/assets/img/home-10/hero/hero-round-shape.png';
import heroOneApp from '../../../public/assets/img/home-10/hero/hero-one-app.png';
import heroUser from '../../../public/assets/img/home-10/hero/hero-user.png';
import shape1 from '../../../public/assets/img/home-10/hero/hero-shape.png';
import appStore from '../../../public/assets/img/home-10/hero/app-store.png';
import { ArrowSvg, StarIconSeven } from '@/svg';
import DownloadAppIcon from '@/svg/DownloadApp';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const MobileApplicationHero = () => {

    return (
        <div className="app-hero-area app-hero-ptb p-relative include-bg z-index-1" style={{ backgroundImage: `url(${heroBottomBgTwo.src})` }}>
            <div className="container container-1430">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="app-hero-wrap z-index-2 pb-65 pl-55">
                            <div className="app-hero-heading mb-40">
                                <span className="tp-section-subtitle border-bg tp_fade_anim" data-delay=".3">Heyo !
                                    We launched our Alpha!</span>
                                <h4 className="tp-section-title-phudu tp_fade_anim" data-delay=".5">One global
                                    <br />plan. No hassle.
                                </h4>
                            </div>
                            <div className="app-hero-btn-box d-flex align-item-center">
                                <div className="app-hero-btn mr-35 tp_fade_anim" data-delay=".7" data-fade-from="top" data-ease="bounce">
                                    <div className="animated-border-box border-icon">
                                        <Link className="tp-btn-gradient p-relative" href="/contact">
                                            <span>
                                                <DownloadAppIcon />
                                            </span>{" "}Download App
                                        </Link>
                                    </div>
                                </div>
                                <div className="app-hero-btn-text tp_text_anim">
                                    <p>
                                        Your ultimate travel partner. <br />
                                        Carries the information you need <br />
                                        while travelling.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="app-hero-round-shape">
                            <Image src={shape} alt="shape" />
                        </div>
                    </div>
                </div>
                <div className="app-hero-bottom-thumb-main z-index-1 tp_fade_anim" data-delay=".5">
                    <Image style={{ width: "100%", height: "auto" }} src={heroHandShape} alt="shape" />
                    <Image className="shape-1" src={shape1} alt="shape-1" />
                    <Image className="shape-2" data-speed="1.1" src={heroUser} alt="hero-user" />
                    <Image className="shape-3" data-speed="1.1" src={heroOneApp} alt="" />
                    <Image className="shape-4" src={heroToolsImg} alt="hero-tools" />
                    <Image className="shape-5" data-speed=".8" src={heroSecureImg} alt="hero-secure" />
                </div>
                <div className="app-hero-bottom-wrapper include-bg p-relative" style={{ backgroundImage: `url(${heroBottomBg.src})` }}>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="app-hero-bottom-wrap pt-100 pb-65 pl-60">
                                <div className="app-hero-bottom-icon mb-20">
                                    <Image src={appStore} alt="app-store" />
                                </div>
                                <div className="app-hero-bottom-content">
                                    <span className="app-hero-bottom-subtitle">App Store rating</span>
                                    <div className="app-hero-bottom-rating z-index-1">
                                        <div className="app-hero-bottom-rating-point">
                                            <span>4.8</span>
                                        </div>
                                        <div className="app-hero-bottom-rating-star">
                                            <div className="app-hero-bottom-rating-stars">
                                                <span><StarIconSeven /></span>
                                                <span><StarIconSeven /></span>
                                                <span><StarIconSeven /></span>
                                                <span><StarIconSeven /></span>
                                                <span><StarIconSeven /></span>
                                            </div>
                                            <Link href="#">Based on 204 Reviews
                                                <ArrowSvg pathValue='M1 1L9 9M9 9V1M9 9H1' />
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
    );
};

export default MobileApplicationHero;
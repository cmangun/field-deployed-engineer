import Image from 'next/image';
import heroThumb from '../../../public/assets/img/home-13/hero/hero-thumb-1.png';
import heroThumbTwo from '../../../public/assets/img/home-13/hero/hero-thumb-3.png';
import shape1 from '../../../public/assets/img/home-13/hero/hero-shape-1.png';
import shape2 from '../../../public/assets/img/home-13/hero/hero-shape-2.png';
import shape3 from '../../../public/assets/img/home-13/hero/hero-shape-3.png';
import shape4 from '../../../public/assets/img/home-13/hero/hero-shape-4.png';
import { ArrowEleven } from '@/svg';
import Link from 'next/link';
import React from 'react';

const CryptoCurrencyHero = () => {
    return (
        <div className="cr-hero-area fix cr-hero-ptb p-relative pt-170" style={{ backgroundColor: "#0E0F11" }}>
            <div className="cr-hero-bg"><Image style={{ width: "100%", height: "auto" }} src={heroThumbTwo} alt="hero-thumb" /></div>
            <div className="cr-hero-thumb">
                <Image style={{ width: "100%", height: "auto" }} src={heroThumb} alt="hero-thumb" />
            </div>
            <div className="cr-hero-left">
                <div className="shape-1 tp_fade_anim" data-fade-from="left" data-delay=".5"><Image src={shape1} alt="hero-shape" /></div>
                <div className="shape-2 tp_fade_anim" data-fade-from="left" data-delay=".5"><Image src={shape2} alt="hero-shape" /></div>
            </div>
            <div className="cr-hero-right">
                <div className="shape-1 tp_fade_anim" data-fade-from="right" data-delay=".5"><Image src={shape3} alt="hero-shape" /></div>
                <div className="shape-2 tp_fade_anim" data-fade-from="right" data-delay=".5"><Image src={shape4} alt="hero-shape" /></div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="cr-hero-heading text-center z-index-1">
                            <div className="tp-section-subtitle-gradient ct mb-20 tp_fade_anim" data-delay=".3">
                                Empowering your crypto journey
                            </div>
                            <h4 className="tp-section-title-onest fs-72 tp-text-revel-anim" data-delay=".5">Crypto Charge <br />
                                Insights and Innovations</h4>
                        </div>
                        <div className="cr-hero-content text-center z-index-2">
                            <div className="tp_text_anim">
                                <p>Try our hosting to alive it with industry <br />
                                    outstanding performance.</p>
                            </div>
                            <div className="cr-hero-btn">
                                <Link href="/contact" className="tp-btn-white-border tp-btn-light-bg">Start Trading <span>
                                    <ArrowEleven />
                                </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container container-1230">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="cr-hero-bottom-wrap text-center z-index-1">
                            <span className="cr-hero-bottom-big bg-b"></span>
                            <span className="cr-hero-bottom-small bg-l"></span>
                            <span className="cr-hero-bottom-small bg-r"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CryptoCurrencyHero;
import circleShape from '../../../public/assets/img/home-09/hero/funfact-circle-shape.png';
import funfactBg from '../../../public/assets/img/home-09/hero/funfact-bg-shape.png';
import bgShape from '../../../public/assets/img/home-09/hero/hero-bg-shape.png';
import AnimatedCounter from '../counter/AnimatedCounter';
import { ArrowSix } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AboutStartupHero = () => {
    const funFacts = [
        {
            count: 98,
            suffix: "+",
            description: "Task Completion <br> Achieved",
            link: "#",
        },
        {
            count: 99,
            suffix: "%",
            description: "Genuine repeated happy customers.",
            link: "#",
        },
    ];
    return (
        <div className="crp-about-3-hero-ptb crp-hero-bg" style={{ backgroundImage: `url(${bgShape.src})`, backgroundColor: "#2A4C3A" }}>
            <div className="container container-1750">
                <div className="row">
                    <div className="col-xl-2">
                        <div className="crp-hero-subtitle">
                            <span className="tp-section-subtitle-teko mb-50 tp_fade_anim" data-delay=".3">About Us</span>
                        </div>
                    </div>
                    <div className="col-xl-7 col-lg-8 col-md-6">
                        <div className="crp-hero-ptb-3">
                            <div className="crp-hero-title-box mb-35">
                                <h2 className="crp-hero-title fs-100 tp_fade_anim">
                                    We make strategies, <br /> design and development <br /> <i className="box d-none d-sm-inline-flex">
                                        <span className="eye"></span>
                                        <span className="eye"></span>
                                    </i> to create valuable <br /> products.
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6">
                        <div className="crp-about-3-funfact">
                            <div className="crp-hero-funfact-wrap crp-hero-funfact-bg z-index-1 p-relative tp_fade_anim" data-delay=".5" style={{ backgroundImage: `url(${funfactBg.src})` }}>
                                <div className="crp-hero-funfact-line d-none d-xl-inline-block"></div>
                                <div className="crp-hero-funfact-img">
                                    <Image src={circleShape} alt="circle shape" />
                                </div>
                                <div className="crp-hero-funfact-top-content">
                                    <h4>Modern Moves</h4>
                                    <p>Building outstanding design, development and strategy</p>
                                </div>

                                {funFacts.map((item, index) => (
                                    <div className="crp-hero-funfact-item" key={index}>
                                        <h4>
                                            <span><AnimatedCounter min={0} max={item.count} /></span>
                                            {item.suffix}
                                        </h4>
                                        <div className="crp-hero-funfact-more-details d-flex justify-content-between">
                                            <p dangerouslySetInnerHTML={{ __html: item.description.replace("\n", "<br />") }} />
                                            <Link href={item.link}>
                                                <ArrowSix />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutStartupHero;
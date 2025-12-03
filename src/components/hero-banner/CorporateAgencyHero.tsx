import circleAvater from '../../../public/assets/img/home-09/hero/funfact-circle-shape.png';
import funfactBg from '../../../public/assets/img/home-09/hero/funfact-bg-shape.png';
import bgShape from '../../../public/assets/img/home-09/hero/hero-bg-shape.png';
import avater from '../../../public/assets/img/home-09/avater/avater-1.png';
import AnimatedCounter from '../counter/AnimatedCounter';
import { ArrowSix, ArrowSvg } from '@/svg/ArrowIcons';
import { StarIcon } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CorporateAgencyHero = () => {

    const funFacts = [
        {
            count: 98,
            suffix: "+",
            description: "Task Completion <br> Achieved",
            link: "#",
        },
        {
            count: 95,
            suffix: "%",
            description: "Genuine repeated happy customers.",
            link: "#",
        },
    ];
    return (
        <div className="crp-hero-area crp-hero-bg" style={{ backgroundImage: `url(${bgShape.src})`, backgroundColor: "#2A4C3A" }}>
            <div className="container container-1550">
                <div className="row align-items-end">
                    <div className="col-xl-9 col-lg-8">
                        <div className="crp-hero-ptb">
                            <div className="crp-hero-title-box mb-35">
                                <h2 className="crp-hero-title tp_fade_anim">
                                    Grow your{" "}
                                    <i className="box d-none d-sm-inline-flex">
                                        <span className="eye"></span>
                                        <span className="eye"></span>
                                    </i>
                                    company with our{" "}
                                    <span>corporate</span> agency
                                </h2>
                            </div>
                            <div className="crp-hero-review-box d-flex align-items-center">
                                <div className="crp-hero-avater tp_fade_anim" data-delay=".3">
                                    <Image src={avater} alt="avater" />
                                </div>
                                <div className="crp-hero-ratting d-flex align-items-center tp_fade_anim" data-delay=".5">
                                    <div className="crp-hero-ratting-text">
                                        <span>4.8</span>
                                    </div>
                                    <div className="crp-hero-ratting">
                                        <div className="crp-hero-ratting-icon">
                                            {[...Array(5)].map((_, i) => (
                                                <span style={{ marginRight: "4px" }} key={i}>
                                                    <StarIcon width={13} height={12} color="#E9FF48" />
                                                </span>
                                            ))}
                                        </div>
                                        <div className="crp-hero-ratting-details">
                                            <Link href="#">
                                                Based on 204 Reviews{" "}
                                                <span>
                                                    <ArrowSvg pathValue='M1 1L9 9M9 9V1M9 9H1' />
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4">
                        <div className="crp-hero-funfact-wrap crp-hero-funfact-bg z-index-1 p-relative tp_fade_anim" data-delay=".5" style={{ backgroundImage: `url(${funfactBg.src})` }}>
                            <div className="crp-hero-funfact-line d-none d-xl-inline-block"></div>
                            <div className="crp-hero-funfact-img">
                                <Image src={circleAvater} alt="circle-avater" />
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
    );
};

export default CorporateAgencyHero;
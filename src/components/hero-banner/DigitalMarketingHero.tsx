"use client"
import heroBgShape from "../../../public/assets/img/home-03/hero/hero-bg-shape.png";
import heroTextShape from "../../../public/assets/img/home-03/hero/hero-text-shape.png";
import heroImage from "../../../public/assets/img/home-03/hero/hero-img.png";
import heroMike from "../../../public/assets/img/home-03/hero/mike.png";
import hiShape from "../../../public/assets/img/home-03/hero/hi-shape.png";
import AnimatedCounterTwo from "../counter/AnimatedCounterTwo";
import { InstagramFour } from "@/svg/social-icons/Instagram";
import { FacebookThree } from "@/svg/social-icons/Facebook";
import { TwitterThree } from "@/svg/social-icons/Twitter";
import { ArrowNineteen } from "@/svg/ArrowIcons";
import { ArrowFour, DribbleTwo } from "@/svg";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const DigitalMarketingHero = () => {

    const funFacts = [
        {
            id: 1,
            end: 98,
            suffix: '%',
            text: (<> Clients Satisfied and <br /> Repeating</>),
            delay: '.7',
        },
        {
            id: 2,
            end: 125,
            suffix: '+',
            text: (<> Projects Completed <br /> in 24 Countries</>),
            delay: '.9',
        },
    ];

    return (
        <>
            <div className="dgm-hero-top pt-20">
                <div className="dgm-hero-ptb grey-bg-2 fix z-index-1 p-relative">
                    <div className="dgm-hero-bg" style={{ backgroundImage: `url(${heroBgShape.src})` }}></div>
                    <div className="dgm-hero-rotate-text">
                        <span>Award winning agency</span>
                    </div>
                    <div className="dgm-hero-social-box">
                        <div className="dgm-hero-social-text">
                            <span>Follow</span>
                        </div>
                        <div className="dgm-hero-social">
                            <Link href="#">
                                <span><FacebookThree /></span>
                            </Link>
                            <Link href="#">
                                <span><TwitterThree /></span>
                            </Link>
                            <Link href="#">
                                <span><InstagramFour /></span>
                            </Link>
                            <Link href="#">
                                <span> <DribbleTwo /></span>
                            </Link>
                        </div>
                    </div>
                    <div className="container container-1430">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="dgm-hero-content mb-120">
                                    <span className="dgm-hero-subtitle tp_fade_anim" data-delay=".3">🔥 BEST MARKETING AGENCY</span>
                                    <h4 className="dgm-hero-title tp_fade_anim" data-delay=".5">
                                        Digital <Image className="dgm-hero-title-mike d-none d-md-inline-block" src={heroMike} alt="hero-image" />
                                        marketing agency
                                    </h4>
                                    <div className="tp_fade_anim" data-delay=".7">
                                        <Link className="tp-btn-black-square" href="/contact">
                                            <span>
                                                <span className="text-1">Get in Touch</span>
                                                <span className="text-2">Get in Touch</span>
                                            </span>{" "}
                                            <i>
                                                <ArrowFour />
                                                <ArrowFour />
                                            </i>
                                        </Link>
                                    </div>
                                </div>
                                <div className="dgm-hero-funfact-wrap">
                                    <div className="row">
                                        {funFacts.map((item) => (
                                            <div key={item.id} className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                                                <div
                                                    className="dgm-hero-funfact tp_fade_anim mb-40"
                                                    data-delay={item.delay}
                                                    data-fade-from="top"
                                                    data-ease="bounce"
                                                >
                                                    <span>
                                                        <AnimatedCounterTwo min={0} max={item.end} />{item.suffix}
                                                    </span>
                                                    <p>{item.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dgm-hero-thumb anim-zoomin-wrap">
                        <div className='anim-zoomin-wrap'>
                            <div className="anim-zoomin">
                                <Image src={heroImage} alt="hero-image" />
                            </div>
                        </div>
                        <div className="dgm-hero-text-box" style={{ backgroundImage: `url(${heroTextShape.src})` }}>
                            <Image src={hiShape} alt="hero-shape" />
                            <p>World-class digital media agency.</p>
                            <Link className="dgm-hero-arrow" href="/contact">
                                <span><ArrowNineteen /></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DigitalMarketingHero;
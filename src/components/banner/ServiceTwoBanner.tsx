import serviceThumb from '../../../public/assets/img/service/service-2/service-2-thumb.jpg';
import { getCurrentYear } from '@/utils/getCurrentYear';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ArrowThirteen } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import gsap from 'gsap';

gsap.registerPlugin(ScrollToPlugin);

const ServiceTwoBanner = () => {
    return (
        <div className="pp-service-2-banner-area p-relative">
            <div className="pp-service-2-banner-top">
                <div className="container container-1830">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="pp-service-2-banner-text">
                                <p>10 years of experience</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="pp-service-2-banner-text text-lg-center">
                                <p>(©2021 — {getCurrentYear()})</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="pp-service-2-banner-text smooth text-lg-end">
                                <Link href="#" onClick={(e) => {
                                    e.preventDefault();
                                    gsap.to(window, { duration: 1, scrollTo: "#down" });
                                }}>
                                    Scroll Down
                                    <span><ArrowThirteen pathValue='M7 1V13' pathValueTwo="M13 7L7 13L1 7" /></span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ar-banner-wrap pp-service-2-hight">
                <Image style={{ width: "100%", height: "auto" }} className="w-100" src={serviceThumb} alt="" data-speed=".8" />
            </div>
        </div>
    );
};

export default ServiceTwoBanner;
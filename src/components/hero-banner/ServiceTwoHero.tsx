import about1 from '../../../public/assets/img/about-us/about-us-4/about-us-4-shape-1.png';
import aboutBg from '../../../public/assets/img/about-us/about-us-4/about-us-4-bg.png';
import { CareerShape } from '@/svg/HeroShape';
import Image from 'next/image';
import React from 'react';

const ServiceTwoHero = () => {
    return (
        <div className="ar-hero-area pp-service-2 p-relative pb-45" style={{ backgroundImage: `url(${aboutBg.src})` }}>
            <div className="tp-career-shape-1">
                <span><CareerShape /></span>
            </div>
            <div className="ar-about-us-4-shape">
                <Image src={about1} alt="about" />
            </div>
            <div className="container container-1830">
                <div className="row justify-content-center">
                    <div className="col-xl-12">
                        <div className="pp-service-2-title-box">
                            <h3 className="ar-about-us-4-title tp-char-animation">Services & <br />
                                Capabilities</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceTwoHero;
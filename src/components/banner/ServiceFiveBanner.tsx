import bannerImg from '../../../public/assets/img/service/service-5/service-5-banner.jpg';
import Image from 'next/image';
import React from 'react';

const ServiceFiveBanner = () => {
    return (
        <div className="tp-service-4-banner-area p-relative">
            <div className="ar-banner-wrap ar-about-us-4">
                <Image style={{ width: "100%", height: "auto" }} className="w-100" src={bannerImg} alt="banner image" data-speed=".8" />
            </div>
        </div>
    );
};

export default ServiceFiveBanner;
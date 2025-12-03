import ServiceBanner from '../../../public/assets/img/service/service-details/service-details-banner.jpg';
import Image from 'next/image';
import React from 'react';

const ServiceDetailsTwoBanner = () => {
    return (
        <div className="tp-service-4-banner-area p-relative">
            <div className="ar-banner-wrap ar-about-us-4">
                <Image style={{ width: "100%", height: "auto" }} className="w-100" src={ServiceBanner} alt="service banner" data-speed=".8" />
            </div>
        </div>
    );
};

export default ServiceDetailsTwoBanner;
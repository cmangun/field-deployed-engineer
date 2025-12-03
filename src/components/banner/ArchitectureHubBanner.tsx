import bannerShape from '../../../public/assets/img/home-08/banner/banner-shape.png';
import banner from '../../../public/assets/img/home-08/banner/banner.jpg';
import Image from 'next/image';
import React from 'react';

const ArchitectureHubBanner = () => {
    return (
        <div className="ar-banner-area">
            <div className="ar-banner-wrap">
                <Image style={{ width: "100%", height: "auto" }} className="w-100" src={banner} alt="banner" data-speed=".8" />
            </div>
            <div className="ar-scroll-image">
                <div className="ar-banner-shape d-flex align-items-center">
                    <Image src={bannerShape} alt="banner-shape" />
                    <Image src={bannerShape} alt="banner-shape" />
                </div>
            </div>
        </div>
    );
};

export default ArchitectureHubBanner;
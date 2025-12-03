import aboutThumb from '../../../public/assets/img/about-us/about-us-4/about-us-4-thumb-1.jpg';
import Image from 'next/image';
import React from 'react';

const CareerBanner = () => {
    return (
        <div className="ar-banner-area">
            <div className="ar-banner-wrap ar-about-us-4">
                <Image style={{ width: "100%", height: "auto" }} className="w-100" src={aboutThumb} alt="about thumb" data-speed=".8" />
            </div>
        </div>
    );
};

export default CareerBanner;
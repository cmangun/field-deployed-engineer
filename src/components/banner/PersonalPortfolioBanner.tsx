import bannerThumb from '../../../public/assets/img/home-14/banner/pp-banner-thumb.jpg';
import Image from 'next/image';
import React from 'react';

const PersonalPortfolioBanner = () => {
    return (
        <div className="pp-banner-area pp-banner-style">
            <div className="pp-banner-wrap">
                <Image style={{ width: "100%", height: "auto" }} className="w-100" data-speed=".8" src={bannerThumb} alt="banner thumb" />
            </div>
        </div>
    );
};

export default PersonalPortfolioBanner;
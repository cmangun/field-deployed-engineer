import bannerImg from '../../../public/assets/img/home-09/banner/banner-2.jpg';
import Image from 'next/image';
import React from 'react';

const CorporateAgencyBanner = () => {
    return (
        <div className="crp-banner-area crp-banner-style">
            <div className="crp-banner-wrap">
                <Image style={{ width: "100%", height: "auto" }} className="w-100" data-speed=".8" src={bannerImg} alt="banner" />
            </div>
        </div>
    );
};

export default CorporateAgencyBanner;
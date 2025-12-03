import bannerImg from '../../../public/assets/img/home-09/banner/banner-1.jpg';
import Image from 'next/image';
import React from 'react';

const CorporateAgencyBannerTwo = () => {
    return (
        <div className="crp-banner-area">
            <div className="crp-banner-wrap">
                <Image style={{ width: "100%", height: "auto" }} className="w-100" data-speed=".8" src={bannerImg} alt="banner-image" data-lag="0" />
            </div>
        </div>
    );
};

export default CorporateAgencyBannerTwo;
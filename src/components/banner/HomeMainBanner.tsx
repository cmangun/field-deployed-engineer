import bannerImg from "../../../public/assets/img/home-01/banner/banner-1.jpg";
import Image from 'next/image';
import React from 'react';

const HomeMainBanner = ({ ColorStyleCls }: { ColorStyleCls?: string }) => {
    return (
        <div className="tp-banner-area">
            <div className={`tp-banner-img ${ColorStyleCls}`}>
                <Image style={{ width: "100%", height: "auto" }} className="w-100" data-speed=".7" src={bannerImg} alt="banner-image" />
            </div>
        </div>
    );
};

export default HomeMainBanner;
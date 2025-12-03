import bannerImg from "../../../public/assets/img/home-12/banner/banner.jpg";
import bgShapeImg from "../../../public/assets/img/home-12/banner/circle-bg.png";
import circleManImg from "../../../public/assets/img/home-12/banner/circle-man.png";
import circleTextImg from "../../../public/assets/img/home-12/banner/circle-text.png";
import Image from 'next/image';
import React from 'react';

const StartupAgencyBanner = () => {
    return (
        <div className="st-banner-area p-relative">
            <div className="st-banner-wrap">
                <Image style={{ width: "100%", height: "auto" }} className="w-100" src={bannerImg} alt="banner" data-speed=".8" />
            </div>
            <div className="st-banner-text-shape">
                <div className="st-banner-text-bg z-index-1">
                    <Image className="bg-shape" src={bgShapeImg} alt="shape" />
                    <div className="crp-text-shape-wrap">
                        <Image className="crp-text-shape-1" src={circleManImg} alt="shape" />
                        <Image className="crp-text-shape-2" src={circleTextImg} alt="shape" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartupAgencyBanner;
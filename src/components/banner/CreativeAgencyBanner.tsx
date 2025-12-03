import bannerImg from '../../../public/assets/img/home-06/banner.jpg';
import Image from 'next/image';
import React from 'react';

const CreativeAgencyBanner = () => {
    return (
        <div className="studio-hero-banner-area">
            <div className="studio-hero-banner mb-20">
                <Image style={{ width: "100%", height: "auto" }} className="w-100" data-speed=".8" src={bannerImg} alt="banner-image" />
            </div>
            <div className="container container-1830">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="studio-hero-banner-text d-flex justify-content-start justify-content-md-between align-items-center">
                            <span>A</span>
                            <span>collective</span>
                            <span>of</span>
                            <span>the</span>
                            <span>best</span>
                            <span>independent</span>
                            <span>premium</span>
                            <span>publishers</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreativeAgencyBanner;
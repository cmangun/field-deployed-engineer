import videoImg from "../../../public/assets/img/home-05/video-img.jpg";
import Image from 'next/image';
import React from 'react';

const DesignAgencyBanner = () => {
    return (
        <div className="design-video-area">
            <div className="design-video-thumb">
                <Image style={{ width: "100%", height: "auto" }} className="w-100" data-speed=".7" src={videoImg} alt="video-image" />
            </div>
        </div>
    );
};

export default DesignAgencyBanner;
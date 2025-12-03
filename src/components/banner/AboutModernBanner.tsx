import Project1 from '../../../public/assets/img/home-02/project/project-1.jpg';
import Image from 'next/image';
import React from 'react';

const AboutModernBanner = () => {
    return (
        <div className="des-project-area pb-200">
            <div className="des-project-banner">
                <Image style={{ width: "100%", height: "auto" }} className="w-100" data-speed=".7" src={Project1} alt="banner image" />
            </div>
        </div>
    );
};

export default AboutModernBanner;
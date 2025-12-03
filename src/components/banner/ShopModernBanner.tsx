import banner1 from '../../../public/assets/img/shop-home/banner/banner-1.jpg';
import banner2 from '../../../public/assets/img/shop-home/banner/banner-2.jpg';
import Image from 'next/image';
import React from 'react';

const ShopModernBanner = () => {
    return (
        <div className="tp-shop-banner-area mt-90">
            <div className="tp-shop-banner-wrap">
                <Image className="tp-shop-banner-img" data-speed=".8" src={banner1} alt="banner" />
                <div className="tp-shop-banner-sm-img">
                    <Image data-speed=".8" src={banner2} alt="banner" />
                </div>
            </div>
        </div>
    );
};

export default ShopModernBanner;
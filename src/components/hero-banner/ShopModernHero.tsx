
import image1 from "../../../public/assets/img/shop-home/slider-nav-1.png";
import image2 from "../../../public/assets/img/shop-home/slider-nav-2.png";
import image3 from "../../../public/assets/img/shop-home/slider-nav-3.png";
import { useSlider } from "@/constants/slick-slider/sliderSettings";
import { shopModernHeroSlideData } from "@/data/heroData";
import Slider from 'react-slick';
import Image from "next/image";
import Link from 'next/link';
import React from 'react';

const ShopModernHero = () => {
    const { setNav1, setNav2, MAIN_SLIDER_SETTINGS, THUMB_SLIDER_SETTINGS } = useSlider();

    return (
        <div className="tp-hero-shop-area pt-120 p-relative fix" style={{ backgroundColor: "#E8E0D4" }}>
            <h1 className="tp-hero-shop-title tp-char-animation">zonspace</h1>
            <div className="container container-1830">
                <div className="tp-hero-shop-slider-main">

                    {/* Main Slider */}
                    <Slider
                        {...MAIN_SLIDER_SETTINGS}
                        ref={(slider) => setNav1(slider)}
                        className="tp-hero-shop-slider-wrap slider-for-1"
                    >
                        {shopModernHeroSlideData.map((slide, index) => (
                            <div key={`slide-${index}`} className="tp-hero-shop-slider-item">
                                <div className="row align-items-end">
                                    <div className="offset-xl-1 col-xl-4">
                                        <div className="tp-hero-shop-slider-content">
                                            <span className="tp-hero-shop-slider-subtitle">{slide.subtitle}</span>
                                            <h4
                                                className="tp-hero-shop-slider-title"
                                                dangerouslySetInnerHTML={{ __html: slide.title }}
                                            />
                                            <div className="tp-hero-shop-btn">
                                                <Link className="tp-btn-white-border coffee-bg" href="/shop">
                                                    Shop Now
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-5">
                                        <div className="tp-hero-shop-slider-thumb">
                                            <Image style={{ width: "100%", height: "auto" }} src={slide.image} alt={slide.alt} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>

                    {/* Thumbnail Slider */}
                    <div className="tp-hero-shop-slider-nav-wrap">
                        <div className='tp-hero-shop-slider-nav slider-nav-1'>
                            <Slider
                                className="tp-hero-shop-slider-nav-thumb"
                                {...THUMB_SLIDER_SETTINGS}
                                ref={(slider) => setNav2(slider)}
                            >
                                {[image1, image2, image3, image2].map((item, index) => (
                                    <div key={`thumb-${index}`} className="active-border">
                                        <Image style={{ width: "100%", height: "auto" }} src={item} alt={`Thumbnail ${index + 1}`} />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ShopModernHero;
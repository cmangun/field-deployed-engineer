
import sliderBg1 from "../../../public/assets/img/shop-home/slider/shop-slider-1.jpg";
import sliderBg2 from "../../../public/assets/img/shop-home/slider/shop-slider-2.jpg";
import sliderBg3 from "../../../public/assets/img/shop-home/slider/shop-slider-3.jpg";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import { ArrowHeroIcon } from "@/svg/ArrowIcons";
import Link from "next/link";
import React from "react";

const ShopWithSliderHero = () => {
    const slides = [
        {
            subtitle: "[ Shop Smart, Shop Sorted ]",
            title: (<> Discover Living <br /> <span>Room Chair</span></>),
            link: "/shop",
            bg: sliderBg1,
        },
        {
            subtitle: "[ Shop Smart, Shop Sorted ]",
            title: (<>Modern Room <br /> <span>Tables Await</span></>),
            link: "/shop",
            bg: sliderBg2,
        },
        {
            subtitle: "[ Shop Smart, Shop Sorted ]",
            title: (<>Find Your Perfect <br /> <span>Room Bed</span></>),
            link: "/shop",
            bg: sliderBg3,
        },
    ];

    return (
        <div className="tp-hero-shop-2-slider-area p-relative fix">
            <div className="swiper tp-hero-shop-2-active p-relative fix">
                <div className="swiper-wrapper">
                    <Swiper
                        modules={[Navigation, Pagination, EffectFade]}
                        slidesPerView={1}
                        effect='fade'
                        loop={true}
                        pagination={{
                            el: ".tp-hero-shop-dot",
                            clickable: true,
                        }}
                        navigation={{
                            prevEl: '.tp-hero-shop-prev',
                            nextEl: '.tp-hero-shop-next',
                        }}
                    >
                        {slides.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <div className="tp-hero-shop-2-slider-item">
                                    <div className="container container-1230">
                                        <div className="row justify-content-center">
                                            <div className="col-lg-8">
                                                <div className="tp-hero-shop-2-slider-wrapper text-center">
                                                    <span className="tp-hero-shop-2-slider-sub">
                                                        {slide.subtitle}
                                                    </span>
                                                    <h3 className="tp-hero-shop-2-slider-title">
                                                        {slide.title}
                                                    </h3>
                                                    <div className="tp-hero-shop-2-slider-btn">
                                                        <Link href={slide.link}>Discover</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* bg image */}
                                    <div
                                        className="tp-hero-shop-2-slider-bg"
                                        style={{ backgroundImage: `url(${slide.bg.src})` }}
                                    ></div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                {/* arrows */}
                <div className="tp-hero-shop-arrow d-none d-sm-block">
                    <button className="tp-hero-shop-prev">
                        <span>
                            <ArrowHeroIcon direction="left" />
                        </span>
                    </button>
                    <button className="tp-hero-shop-next">
                        <span>
                            <ArrowHeroIcon direction="right" />
                        </span>
                    </button>
                </div>

                {/* dots */}
                <div className="tp-hero-shop-dot text-center z-index-3"></div>
            </div>
        </div>
    );
};

export default ShopWithSliderHero;

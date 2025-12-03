import Link from 'next/link';
import React from 'react';

// Import Swiper components module
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import ImageTrail from '@/utils/ImageTrail';

const DesignAgencyHero = () => {
    const heroImages = [
        { id: 1, src: "/assets/img/home-06/hero/1.png" },
        { id: 2, src: "/assets/img/home-06/hero/2.png" },
        { id: 3, src: "/assets/img/home-06/hero/3.png" },
        { id: 4, src: "/assets/img/home-06/hero/4.png" },
        { id: 5, src: "/assets/img/home-06/hero/5.png" },
        { id: 6, src: "/assets/img/home-06/hero/6.png" },
        { id: 7, src: "/assets/img/home-06/hero/7.png" },
        { id: 8, src: "/assets/img/home-06/hero/8.png" },
        { id: 9, src: "/assets/img/home-06/hero/9.png" },
        { id: 10, src: "/assets/img/home-06/hero/10.png" },
        { id: 11, src: "/assets/img/home-06/hero/11.png" },
        { id: 12, src: "/assets/img/home-06/hero/12.png" },
        { id: 13, src: "/assets/img/home-06/hero/13.png" },
        { id: 14, src: "/assets/img/home-06/hero/14.png" },
        { id: 15, src: "/assets/img/home-06/hero/15.png" },
        { id: 16, src: "/assets/img/home-06/hero/16.png" },
        { id: 17, src: "/assets/img/home-06/hero/17.png" }
    ];

    const slides = [
        { id: 1, firstName: "Christopher", lastName: "Mangun" },
        { id: 2, firstName: "Christopher", lastName: "Mangun" },
        { id: 3, firstName: "Christopher", lastName: "Mangun" }
    ];
    return (
        <div id="top" className="design-hero-area p-relative fix white-bg">
            <ImageTrail images={heroImages} />
            <div className="design-hero-circle-wrap">
                <span className="design-hero-circle-1 "></span>
                <span className="design-hero-circle-2 d-none d-md-block"></span>
            </div>
            <div className="design-hero-ptb">
                <div className="design-hero-wrap z-index-5 tp_fade_anim" data-delay=".3">
                    <Swiper
                        modules={[Autoplay, FreeMode]}
                        loop={true}
                        freeMode={true}
                        spaceBetween={40}
                        slidesPerView='auto'
                        centeredSlides={true}
                        allowTouchMove={false}
                        speed={14000}
                        autoplay={{
                            delay: 1,
                            disableOnInteraction: true,
                        }}
                        className='design-hero-slide-active slide-transtion'
                    >
                        {slides.map((slide) => (
                            <SwiperSlide key={slide.id}>
                                <div className="design-hero-slide-text">
                                    <span><span style={{ fontSize: '0.6em' }}>{slide.firstName}</span> {slide.lastName}<i>.</i></span>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="design-hero-content-wrap mb-110 z-index-5">
                    <div className="container container-1230">
                        <div className="row">
                            <div className="offset-xl-7 offset-lg-6 col-xl-5 col-lg-6">
                                <div className="design-hero-content tp_text_anim">
                                    <p>
                                        Studio focusing on designing <br />
                                        and developing advanced & intuitive <br />
                                        mobile ecosystems.
                                    </p>
                                    <div className="tp_fade_anim" data-delay=".7" data-fade-from="top" data-ease="bounce">
                                        <Link className="tp-btn-sky-border solid-bg" href="/portfolio-metro-light">Explore work</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="design-hero-info-wrap z-index-5">
                    <div className="container container-1680">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 tp_fade_anim" data-delay=".3" data-on-scroll="3">
                                <div className="design-hero-social">
                                    <Link href="#">Instagram</Link>
                                    <Link href="#">behance</Link>
                                    <Link href="#">twitter</Link>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 tp_fade_anim" data-delay=".5" data-on-scroll="3">
                                <div className="design-hero-social text-md-end">
                                    <Link className="tp-line-black" href="mailto:info@example.com">info@example.com</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesignAgencyHero;
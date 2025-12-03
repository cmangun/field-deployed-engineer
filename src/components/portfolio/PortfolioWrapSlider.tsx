import { sliderData, sliderThumbs } from '@/data/portfolioTwoData';
import { SlickNextArrow, SlickPrevArrow } from '../work/SlickArrow';
import React, { useRef, useState } from 'react';
import { DownArrow } from '@/svg/ArrowIcons';
import Slider from "react-slick";
import Image from 'next/image';
import Link from 'next/link';

// slider setting one
const slider_setting_one = {
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    speed: 1000,
    arrows: false,
    nextArrow: <SlickNextArrow />,
    prevArrow: <SlickPrevArrow />,
};
// slider setting two
const slider_setting_two = {
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    focusOnSelect: true,
    centerPadding: "0",
    speed: 600,
    nextArrow: <SlickNextArrow />,
    prevArrow: <SlickPrevArrow />,
    responsive: [
        {
            breakpoint: 1600,
            settings: {
                slidesToShow: 3,
            },
        },
        {
            breakpoint: 1400,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 992,
            settings: {
                arrows: false,
                slidesToShow: 4,
            },
        },
        {
            breakpoint: 768,
            settings: {
                arrows: false,
                slidesToShow: 4,
            },
        },
        {
            breakpoint: 768,
            settings: {
                arrows: false,
                slidesToShow: 4,
            },
        },
        {
            breakpoint: 480,
            settings: {
                arrows: false,
                slidesToShow: 4,
            },
        },
    ],
};

const PortfolioWrapSlider = () => {
    const [slider1, setSlider1] = useState<Slider | null>(null);
    const [slider2, setSlider2] = useState<Slider | null>(null);
    const [sliderIndex, setSliderIndex] = useState<number>(1);
    const sliderRef = useRef<Slider | null>(null);

    // Add zeros function like in jQuery
    const addZeros = (n: number) => {
        return (n < 10) ? '0' + n : '' + n;
    };

    return (
        <div className="tp-portfolio-11-area fix">
            <div className="tp-portfolio-11-slider-wrap p-relative">
                <Slider
                    {...slider_setting_one}
                    asNavFor={slider2 as Slider}
                    ref={(slider) => {
                        setSlider1(slider);
                        sliderRef.current = slider;
                    }}
                    className="tp-portfolio-11-slider-active"
                >
                    {sliderData.map((item) => (
                        <div key={item.id}>
                            <div
                                className="tp-portfolio-11-slider-bg pt-170 pb-150 d-flex align-items-end"
                                style={{ backgroundImage: `url(${item.bg})` }}
                            >
                                <div className="tp-portfolio-11-slider-content" >
                                    <div className="tp-portfolio-11-slider-link" style={{ opacity: 1 }}>
                                        <Link href={item.link}>
                                            <DownArrow />
                                        </Link>
                                    </div>
                                    <span className="tp-portfolio-11-slider-subtitle" style={{ opacity: 1 }}>
                                        {item.year} <br /> {item.subtitle}
                                    </span>
                                    <h3 className="tp-portfolio-11-slider-title" style={{ opacity: 1 }}>
                                        <Link
                                            href={item.link}
                                            dangerouslySetInnerHTML={{ __html: item.title }}
                                        ></Link>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>

                <div className="tp-portfolio-11-slider-nav-wrap z-index-5">
                    <div className="slides-number d-none d-lg-flex d-flex align-items-center" style={{ display: 'inline-block' }}>
                        <div className="slider-line"></div>
                        <span className="active">{addZeros(sliderIndex)}</span>
                    </div>
                    <Slider
                        {...slider_setting_two}
                        asNavFor={slider1 as Slider}
                        ref={(slider) => setSlider2(slider)}
                        beforeChange={(next) => setSliderIndex(next + 1)}
                        className="tp-portfolio-11-slider-nav-active d-none d-lg-block"
                    >
                        {sliderThumbs.map((item) => (
                            <div key={item.id} className="tp-portfolio-11-slider-nav-item p-relative">
                                <div className="tp-portfolio-11-slider-nav-thumb">
                                    <Image
                                        src={item.img}
                                        alt="thumb-img"
                                        style={{ height: "auto" }}
                                    />
                                </div>
                                <div className="tp-portfolio-11-slider-nav-content-wrap">
                                    <div className="tp-portfolio-11-slider-nav-content d-flex flex-column justify-content-between">
                                        <div className="tp-portfolio-11-slider-nav-year">
                                            <span>{item.year}</span>
                                        </div>
                                        <div className="tp-portfolio-11-slider-nav-tittle-box">
                                            <span className="tp-portfolio-11-slider-nav-subtittle">
                                                {item.subtitle}
                                            </span>
                                            <h4 className="tp-portfolio-11-slider-nav-tittle">
                                                <Link href={item.link}>{item.title}</Link>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default PortfolioWrapSlider;
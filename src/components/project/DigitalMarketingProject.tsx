"use client"
import { Navigation, Keyboard, Controller } from "swiper/modules";
import { LeftArrowIcon, RightArrowIcon } from "@/svg";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from 'swiper';
import React, { useRef, useState } from 'react';
import projectsData from '@/data/projectData';
import { TitleShape } from "@/svg/TitleShape";
import Image from 'next/image';
import Link from 'next/link';

const DigitalMarketingProject = () => {
    const [controlledSwiper, setControlledSwiper] = useState<SwiperType | null>(null);
    const imageSwiperRef = useRef<SwiperType | null>(null);
    const textSwiperRef = useRef<SwiperType | null>(null);
    const isProgrammaticChange = useRef(false);

    const handleImageSwiperInit = (swiper: SwiperType) => {
        imageSwiperRef.current = swiper;
    };

    const handleTextSwiperInit = (swiper: SwiperType) => {
        textSwiperRef.current = swiper;
        setControlledSwiper(swiper);
    };

    // Handle image swiper changes
    const handleImageSlideChange = (swiper: SwiperType) => {
        if (!isProgrammaticChange.current && textSwiperRef.current) {
            isProgrammaticChange.current = true;
            textSwiperRef.current.slideTo(swiper.realIndex);
            setTimeout(() => {
                isProgrammaticChange.current = false;
            }, 100);
        }
    };

    // Handle text swiper changes
    const handleTextSlideChange = (swiper: SwiperType) => {
        if (!isProgrammaticChange.current && imageSwiperRef.current) {
            isProgrammaticChange.current = true;
            imageSwiperRef.current.slideTo(swiper.realIndex);
            setTimeout(() => {
                isProgrammaticChange.current = false;
            }, 100);
        }
    };

    return (
        <div className="dgm-project-area pb-120 fix black-bg-5">
            <div className="container container-1330">
                <div className="dgm-project-top-wrap">
                    <div className="row align-items-end">
                        <div className="col-xl-4 col-lg-6">
                            <div className="dgm-project-title-box z-index-1 mb-30">
                                <h4 className="tp-section-title-grotesk text-white mb-0 tp_fade_anim">
                                    Our exclusive
                                    <span className="p-relative">
                                        Case
                                        <span className="tp-section-title-shape">
                                            <TitleShape />
                                        </span>
                                    </span>{" "}
                                    studies
                                </h4>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6">
                            <div className="dgm-project-top-text mb-30 tp_fade_anim">
                                <p>
                                    Our design services starts and ends with a best-in
                                    class experience strategy that builds to provide you with
                                    an informed response.
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-6">
                            <div className="dgm-project-arrow text-start text-xl-end z-index-1 mb-30 tp_fade_anim">
                                <button className="dgm-project-prev">
                                    <span><LeftArrowIcon width="16" height="16" /></span>
                                </button>
                                <button className="dgm-project-next">
                                    <span><RightArrowIcon width="16" height="16" /></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dgm-project-slider-wrap">
                {/* Image Slider (Horizontal) */}
                <div className="dgm-project-active">
                    <Swiper
                        spaceBetween={40}
                        centeredSlides={true}
                        loop={true}
                        speed={1500}
                        navigation={{
                            nextEl: '.dgm-project-next',
                            prevEl: '.dgm-project-prev',
                        }}
                        keyboard={{ enabled: true }}
                        breakpoints={{
                            '1600': { slidesPerView: 3 },
                            '1400': { slidesPerView: 3 },
                            '1200': { slidesPerView: 3 },
                            '992': { slidesPerView: 2 },
                            '768': { slidesPerView: 2 },
                            '576': { slidesPerView: 1 },
                            '0': { slidesPerView: 1 }
                        }}
                        modules={[Navigation, Keyboard, Controller]}
                        onSwiper={handleImageSwiperInit}
                        onSlideChange={handleImageSlideChange}
                        controller={{ control: controlledSwiper }}
                    >
                        {projectsData.slice(6, 12).map((project) => (
                            <SwiperSlide key={`img-${project.id}`}>
                                <div className="dgm-project-item">
                                    <div className="dgm-project-thumb">
                                        <Image
                                            style={{ width: "100%", height: "auto" }}
                                            src={project.image}
                                            alt={project.title}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Text Slider (Vertical) */}
                <div className="dgm-project-text-active fix mt-55">
                    <Swiper
                        direction="vertical"
                        spaceBetween={30}
                        slidesPerView={1}
                        loop={true}
                        speed={1500}
                        modules={[Controller]}
                        onSwiper={handleTextSwiperInit}
                        onSlideChange={handleTextSlideChange}
                        controller={{ control: imageSwiperRef.current }}
                        style={{ height: '100px' }}
                    >
                        {projectsData.slice(6, 12).map((project) => (
                            <SwiperSlide key={`text-${project.id}`}>
                                <div className="dgm-project-item">
                                    <div className="dgm-project-content text-center">
                                        <h4 className="dgm-project-title-sm">
                                            <Link className="tp-line-white" href={project.link}>
                                                {project.title}
                                            </Link>
                                        </h4>
                                        <h5><span>{project.description}</span></h5>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default DigitalMarketingProject;
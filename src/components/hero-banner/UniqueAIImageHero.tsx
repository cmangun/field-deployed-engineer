import heroTextImg from '../../../public/assets/img/home-07/hero/hero-text-img.png';
import { StarIconFive } from '@/svg/StarIcons';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
// Import slider images
import slider1 from '../../../public/assets/img/home-07/hero/slider/slider-1.jpg';
import slider2 from '../../../public/assets/img/home-07/hero/slider/slider-2.jpg';
import slider3 from '../../../public/assets/img/home-07/hero/slider/slider-3.jpg';
import slider4 from '../../../public/assets/img/home-07/hero/slider/slider-4.jpg';
import slider5 from '../../../public/assets/img/home-07/hero/slider/slider-5.jpg';
import slider6 from '../../../public/assets/img/home-07/hero/slider/slider-6.jpg';
import slider7 from '../../../public/assets/img/home-07/hero/slider/slider-7.jpg';
import VerticalSliderTwo from './subComponents/VerticalSliderTwo';
import VerticalSlider from './subComponents/VerticalSlider';
import VideoPlayer from '../shared/VideoPlayer/VideoPlayer';
import { SliderImage } from '@/types/custom-d-t';

const UniqueAIImageHero = () => {
    // Slider images data
    const sliderImages: SliderImage[] = [
        { id: 1, src: slider1, alt: "AI Image 1" },
        { id: 2, src: slider2, alt: "AI Image 2" },
        { id: 3, src: slider3, alt: "AI Image 3" },
        { id: 4, src: slider4, alt: "AI Image 4" },
        { id: 5, src: slider5, alt: "AI Image 5" },
        { id: 6, src: slider6, alt: "AI Image 6" },
        { id: 7, src: slider7, alt: "AI Image 7" },
        { id: 8, src: slider3, alt: "AI Image 3" },
        { id: 9, src: slider4, alt: "AI Image 4" },
        { id: 10, src: slider5, alt: "AI Image 5" },
    ];
    return (
        <div className="ai-hero-area p-relative z-index-1">
            <div className="ai-hero-video">
                <VideoPlayer videoUrl="https://html.aqlova.com/videos/agntix/agntix-video.mov" />
            </div>
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-xl-7 col-lg-6 col-md-6">
                        <div className="ai-hero-ptb">
                            <div className="ai-hero-title-box">
                                <span className="ai-hero-subtitle tp_fade_anim" data-delay=".3">Driving AI Excellence</span>
                                <h4 className="ai-hero-title tp_fade_anim" data-delay=".5">
                                    Generate <br /> <span className="d-none d-md-inline-block"><Image src={heroTextImg} alt="image" /></span> unique AI Images.
                                </h4>
                                <div className="tp_fade_anim" data-delay=".7">
                                    <div className="animated-border-box">
                                        <Link className="tp-btn-gradient p-relative" href="/portfolio-col-3-light">
                                            <span><StarIconFive /></span>
                                            Explore project
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-5 col-lg-6 col-md-6">
                        <div className="ai-hero-slider-main fix p-relative">
                            <div className="row gx-12">
                                <div className="col-6">
                                    <div className="ai-hero-slider-wrap ai-hero-slider-1">
                                        <VerticalSliderTwo images={sliderImages} />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <VerticalSlider images={sliderImages} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UniqueAIImageHero;
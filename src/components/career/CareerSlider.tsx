import slideImg1 from '../../../public/assets/img/career/career-slide-1.jpg';
import slideImg2 from '../../../public/assets/img/career/career-slide-2.jpg';
import slideImg3 from '../../../public/assets/img/career/career-slide-3.jpg';
import slideImg4 from '../../../public/assets/img/career/career-slide-4.jpg';
import slideImg5 from '../../../public/assets/img/career/career-slide-5.jpg';
import { careerSwiperParams } from '@/constants/swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import React from 'react';

const CareerSlider = () => {
    const images = [
        { id: 1, image: slideImg1 },
        { id: 2, image: slideImg2 },
        { id: 3, image: slideImg3 },
        { id: 4, image: slideImg4 },
        { id: 5, image: slideImg5 },
        { id: 6, image: slideImg1 },
        { id: 7, image: slideImg2 },
    ]
    return (
        <div className="tp-career-slider-ptb pb-180">
            <div className="tp-career-slider-wrapper">
                <div className="align-items-center slide-transtion">
                    <Swiper
                        className='tp-career-slider-active'
                        {...careerSwiperParams}
                    >
                        {
                            images.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <div className="tp-career-slider-thumb">
                                        <Image src={item.image} alt="image" />
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>

                </div>
            </div>
        </div >
    );
};

export default CareerSlider;
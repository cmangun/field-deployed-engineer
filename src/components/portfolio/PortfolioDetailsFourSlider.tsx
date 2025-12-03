import React from 'react';
import Image from 'next/image';

// Import images
import thumb6 from '../../../public/assets/img/portfolio/portfolio-details-4/portfolio-details-thumb-6.jpg';
import thumb7 from '../../../public/assets/img/portfolio/portfolio-details-4/portfolio-details-thumb-7.jpg';
import thumb8 from '../../../public/assets/img/portfolio/portfolio-details-4/portfolio-details-thumb-8.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';

const PortfolioDetailsFourSlider = () => {
    const sliderImages = [thumb6, thumb7, thumb8,thumb7];

    return (
        <div className="tp-pd-4-slider-ptb pb-110">
            {/* Heading */}
            <div className="container container-1230">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="tp-pd-4-slider-heading design-social-title-box title-box text-center mb-150">
                            <h4 className="tp-section-title-dirtyline fs-140">
                                <span className="tp-text-right-scroll tp_text_invert_2">stay</span><br />
                                <span className="tp-text-left-scroll tp_text_invert_2">longer</span><br />
                                <span className="tp-text-right-scroll tp_text_invert_2">with smart</span><br />
                                <span className="tp-text-left-scroll tp_text_invert_2">ux.</span>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slider */}
            <div className="tp-pd-4-slider-wrapper">
                <Swiper
                    className='tp-pd-4-slider-active swiper'
                    loop={true}
                    autoplay={false}
                    spaceBetween={30}
                    speed={1000}
                    breakpoints={{
                        '1600': { slidesPerView: 3 },
                        '1400': { slidesPerView: 3 },
                        '1200': { slidesPerView: 3 },
                        '992': { slidesPerView: 2 },
                        '768': { slidesPerView: 2 },
                        '576': { slidesPerView: 1 },
                        '0': { slidesPerView: 1 },
                    }}
                >
                    {sliderImages.map((img, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="tp-pd-4-slider-thumb">
                                <Image style={{width:"100%", height:"auto"}} src={img} alt={`Slide ${idx + 1}`} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div >
    );
};

export default PortfolioDetailsFourSlider;

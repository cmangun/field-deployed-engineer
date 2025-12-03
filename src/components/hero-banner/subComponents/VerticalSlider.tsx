import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image, { StaticImageData } from 'next/image';

interface SliderImage {
  id: number;
  src: StaticImageData;
  alt: string;
}

interface SliderSettings {
  speed: number;
  autoplay: boolean;
  autoplaySpeed: number;
  cssEase: string;
  slidesPerRow: number;
  slidesToShow: number;
  arrows: boolean;
  vertical: boolean;
  verticalSwiping: boolean;
  responsive: Array<{
    breakpoint: number;
    settings: Partial<SliderSettings>;
  }>;
}

const VerticalSlider = ({ images }: { images: SliderImage[] }) => {
   const settings: SliderSettings = {
    speed: 10000,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    slidesPerRow: 1,
    slidesToShow: 4,
    arrows: false,
    vertical: true,
    verticalSwiping: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {}
      },
      {
        breakpoint: 992,
        settings: {}
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
        }
      }
    ]
  };

  return (
    <div className="ai-hero-slider-wrap ai-hero-slider-2">
      <Slider {...settings}>
        {images.map((image) => (
          <div className="ai-hero-slider-item" key={`slider2-${image.id}`}>
            <Image 
              style={{ width: "100%", height: "auto" }} 
              src={image.src} 
              alt={image.alt} 
              className="w-100"
              priority={image.id <= 4}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VerticalSlider;
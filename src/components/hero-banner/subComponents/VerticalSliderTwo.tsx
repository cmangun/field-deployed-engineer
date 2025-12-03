import Image, { StaticImageData } from 'next/image';
import Slider from 'react-slick';
import React from 'react';

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

const VerticalSliderTwo = ({ images }: { images: SliderImage[] }) => {
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
    <div className="ai-hero-slider-wrap ai-hero-slider-1">
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

export default VerticalSliderTwo;
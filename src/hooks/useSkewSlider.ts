import { preloadImages } from '@/utils/animationUtils';
import { useEffect, useRef } from 'react';
import { Observer } from 'gsap/Observer';
import { gsap } from 'gsap';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Observer);
}

const NEXT = 1;
const PREV = -1;

export const useSkewSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const currentSlideRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const slidesTotalRef = useRef(0);
  const slideNumberRef = useRef<HTMLSpanElement>(null);

  const updateSlideNumber = () => {
    if (slideNumberRef.current) {
      slideNumberRef.current.innerHTML = addLeadingZero(currentSlideRef.current + 1);
    }
  };

  const addLeadingZero = (num: number) => {
    return num < 10 ? `0${num}` : num.toString();
  };

  const navigate = (direction: number) => {
    if (!sliderRef.current || isAnimatingRef.current) return false;
    isAnimatingRef.current = true;

    const slides = sliderRef.current.querySelectorAll('.slide');
    const slidesInner = Array.from(slides).map(item => item.querySelector('.slide__img'));
    
    const previous = currentSlideRef.current;
    currentSlideRef.current = direction === 1 ? 
      currentSlideRef.current < slidesTotalRef.current - 1 ? 
        currentSlideRef.current + 1 : 0 :
      currentSlideRef.current > 0 ? 
        currentSlideRef.current - 1 : slidesTotalRef.current - 1;

    updateSlideNumber();

    const currentSlide = slides[previous] as HTMLElement;
    const upcomingSlide = slides[currentSlideRef.current] as HTMLElement;
    const upcomingInner = slidesInner[currentSlideRef.current] as HTMLElement;

    gsap
      .timeline({
        defaults: {
          duration: 1.2,
          ease: 'power3.inOut',
        },
        onStart: () => {
          upcomingSlide.classList.add('slide--current');
          gsap.set(upcomingSlide, { zIndex: 10 }); // Reduced z-index
        },
        onComplete: () => {
          currentSlide.classList.remove('slide--current');
          gsap.set(upcomingSlide, { zIndex: 1 });
          isAnimatingRef.current = false;
        }
      })
      .addLabel('start', 0)
      .to(currentSlide, {
        yPercent: -direction * 100,
      }, 'start')
      .fromTo(upcomingSlide, {
        yPercent: 0,
        autoAlpha: 0,
        rotationX: 140,
        scale: 0.1,
        z: -1000
      }, {
        autoAlpha: 1,
        rotationX: 0,
        z: 0,
        scale: 1,
      }, 'start+=0.1')
      .fromTo(upcomingInner, {
        scale: 1.8
      }, {
        scale: 1,
      }, 'start+=0.17');
  };

  const next = () => navigate(NEXT);
  const prev = () => navigate(PREV);

  useEffect(() => {
    if (!sliderRef.current) return;

    const slides = sliderRef.current.querySelectorAll('.slide');
    if (slides.length === 0) {
      console.error("Slides not found!");
      return;
    }

    slidesTotalRef.current = slides.length;
    slides[0].classList.add('slide--current');

    // Preload images
    preloadImages('.slide__img').then(() => {
      document.body.classList.remove('loading');
    });

    // Initialize Observer
    const observer = Observer.create({
      type: 'wheel,touch,pointer',
      onDown: () => prev(),
      onUp: () => next(),
      wheelSpeed: -1,
      tolerance: 10
    });

    return () => {
      observer.kill();
    };
  });

  return {
    sliderRef,
    slideNumberRef,
    next,
    prev
  };
};
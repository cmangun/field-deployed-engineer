"use client";
import PortfolioWebglHeader from '@/layouts/headers/PortfolioWebglHeader';
import { useCursorAndBackground } from '@/hooks/useCursorAndBackground';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import { pfizerCaseStudy } from '@/data/caseStudies/pfizerCaseStudy';
import { parallaxSlider } from '@/utils/ParallaxSlider';
import React, { useEffect } from 'react';

const PortfolioHorizontalShowcase = () => {
    // Set background color & cursor
    useCursorAndBackground({ bgColor: "#FAF9F6" });

    // Initialize parallax slider
    useEffect(() => {
        parallaxSlider();
    }, []);

    return (
        <>
            {/* Magic cursor */}
            <div id="magic-cursor" className="cursor-white-bg">
                <div id="ball"></div>
            </div>

            {/* Global Components */}
            <BackToTop />
            <div style={{ position: 'fixed', top: 0, right: 0, left: 0, zIndex: 999 }}>
                <PortfolioWebglHeader />
            </div>

            <main>
                <div className="parallax-slider-wrapper">
                    <div className="parallax-sliders">
                        <div className="parallax-slider-inner">
                            {pfizerCaseStudy.slides.map((slide, index) => (
                                <div 
                                    key={slide.id} 
                                    className="parallax-item not-hide-cursor"
                                >
                                    <div className="parallax-content">
                                        <span>{slide.type === 'hero' ? 'Case Study' : slide.subtitle}</span>
                                        <h4>{slide.title}</h4>
                                    </div>
                                    <div 
                                        className="parallax-img"
                                        style={{
                                            backgroundImage: slide.backgroundImage 
                                                ? `url(${slide.backgroundImage})`
                                                : undefined
                                        }}
                                    ></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default PortfolioHorizontalShowcase;

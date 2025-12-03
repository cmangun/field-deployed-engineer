"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCursorAndBackground } from '@/hooks/useCursorAndBackground';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import { caseStudyCardsData } from '@/data/caseStudyCardsData';
import { parallaxSlider } from '@/utils/ParallaxSlider';
import PortfolioWebglHeader from '@/layouts/headers/PortfolioWebglHeader';

const CaseStudyShowcase = () => {
    const router = useRouter();
    
    // Set background color & cursor
    useCursorAndBackground({ bgColor: "#FAF9F6" });

    // Initialize parallax slider
    useEffect(() => {
        parallaxSlider();
    }, []);

    const handleCardClick = (slug: string, isPlaceholder?: boolean) => {
        if (isPlaceholder) {
            // For placeholder cards, show coming soon or stay on page
            return;
        }
        router.push(`/case-study/${slug}`);
    };

    return (
        <>
            {/* Magic cursor */}
            <div id="magic-cursor" className="cursor-white-bg">
                <div id="ball"></div>
            </div>

            {/* Global Components */}
            <BackToTop />
            <PortfolioWebglHeader />

            {/* Hero H1 - Top Left */}
            <h1 style={{
                position: 'fixed',
                top: '30px',
                left: '30px',
                zIndex: 9999,
                fontSize: '30px',
                fontWeight: 600,
                color: '#000',
                margin: 0,
                letterSpacing: '0.5px',
            }}>
                FORWARD DEPLOYED ENGINEER <span style={{ color: '#999', fontWeight: 400 }}>|</span> <span style={{ fontWeight: 400, color: '#666' }}>Christopher Mangun</span>
            </h1>

            <main>
                <div className="parallax-slider-wrapper">
                    <div className="parallax-sliders">
                        <div className="parallax-slider-inner">
                            {caseStudyCardsData.map((card, index) => (
                                <div 
                                    key={card.id} 
                                    className="parallax-item not-hide-cursor"
                                    data-cursor={card.isPlaceholder ? "Coming<br>Soon" : "View<br>Case Study"}
                                    onClick={() => handleCardClick(card.slug, card.isPlaceholder)}
                                    style={{ 
                                        cursor: card.isPlaceholder ? 'default' : 'pointer',
                                        opacity: card.isPlaceholder ? 0.85 : 1,
                                    }}
                                >
                                    <div className="parallax-content">
                                        {/* Case Study Number */}
                                        <span style={{ 
                                            fontSize: '12px', 
                                            color: '#fff',
                                            letterSpacing: '2px',
                                            textTransform: 'uppercase',
                                            marginBottom: '8px',
                                            display: 'block'
                                        }}>
                                            {String(index + 1).padStart(2, '0')} / {caseStudyCardsData.length}
                                        </span>
                                        
                                        {/* Client */}
                                        <span style={{ 
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            color: '#fff',
                                            marginBottom: '4px',
                                            display: 'block'
                                        }}>
                                            {card.client}
                                        </span>
                                        
                                        {/* Title */}
                                        <h4 style={{ marginBottom: '12px', color: '#fff' }}>{card.title}</h4>
                                        
                                        {/* Subtitle/Description */}
                                        <p style={{ 
                                            fontSize: '14px', 
                                            color: '#fff',
                                            lineHeight: 1.5,
                                            maxWidth: '320px',
                                            marginBottom: '16px'
                                        }}>
                                            {card.subtitle}
                                        </p>
                                        
                                        {/* Domain */}
                                        <div style={{
                                            fontSize: '11px',
                                            color: '#fff',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            borderTop: '1px solid rgba(255,255,255,0.3)',
                                            paddingTop: '12px',
                                            marginTop: 'auto'
                                        }}>
                                            {card.domain}
                                        </div>

                                        {/* Placeholder Badge */}
                                        {card.isPlaceholder && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '20px',
                                                right: '20px',
                                                fontSize: '10px',
                                                padding: '4px 10px',
                                                color: '#fff',
                                                background: 'rgba(255,255,255,0.15)',
                                                borderRadius: '20px',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px'
                                            }}>
                                                Coming Soon
                                            </div>
                                        )}
                                    </div>
                                    <div 
                                        className="parallax-img"
                                        style={{
                                            backgroundImage: `url(${card.heroImage})`,
                                            filter: card.isPlaceholder ? 'grayscale(30%)' : 'none'
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

export default CaseStudyShowcase;

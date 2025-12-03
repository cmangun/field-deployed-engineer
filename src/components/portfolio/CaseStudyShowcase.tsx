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
        <div style={{
            backgroundImage: 'url(/assets/img/background2.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            minHeight: '100vh',
        }}>
            {/* Global style for menu-open state */}
            <style>{`
                body.menu-open .fixed-header-title,
                body.menu-open .fixed-header-title span,
                body.menu-open .fixed-header-title * {
                    color: #fff !important;
                }
                @media (max-width: 767px) {
                    .fixed-header-title {
                        font-size: 18px !important;
                        top: 20px !important;
                        left: 20px !important;
                        max-width: calc(100% - 40px);
                    }
                }
            `}</style>

            {/* Magic cursor */}
            <div id="magic-cursor" className="cursor-white-bg">
                <div id="ball"></div>
            </div>

            {/* Global Components */}
            <BackToTop />
            <PortfolioWebglHeader />



            <main>
                <div className="parallax-slider-wrapper">
                    <div className="parallax-sliders">
                        <div className="parallax-slider-inner">
                            {caseStudyCardsData.map((card, index) => (
                                <div 
                                    key={card.id} 
                                    className="parallax-item not-hide-cursor"
                                    data-cursor={card.id === 'intro' ? "" : (card.isPlaceholder ? "Coming<br>Soon" : "View<br>Case Study")}
                                    onClick={() => card.id !== 'intro' && handleCardClick(card.slug, card.isPlaceholder)}
                                    style={{ 
                                        cursor: card.id === 'intro' ? 'default' : (card.isPlaceholder ? 'default' : 'pointer'),
                                        opacity: card.isPlaceholder && card.id !== 'intro' ? 0.85 : 1,
                                    }}
                                >
                                    {/* Special intro card */}
                                    {card.id === 'intro' ? (
                                        <>
                                            <style>{`
                                                .intro-content:hover h2,
                                                .intro-content:hover p,
                                                .intro-content:hover span {
                                                    color: #fff !important;
                                                }
                                            `}</style>
                                            <div className="parallax-content intro-content" style={{ 
                                                opacity: 1, 
                                                visibility: 'visible',
                                                position: 'absolute',
                                                top: '80px',
                                                left: '40px',
                                                right: '40px',
                                                transition: 'all 0.3s ease',
                                            }}>
                                                <h2 style={{ 
                                                    fontSize: '48px',
                                                    fontWeight: 700,
                                                    color: '#000',
                                                    marginBottom: '16px',
                                                    lineHeight: 1.1,
                                                    transition: 'color 0.3s ease',
                                                }}>
                                                    Christopher Mangun
                                                </h2>
                                                <p style={{ 
                                                    fontSize: '24px',
                                                    fontWeight: 500,
                                                    color: '#333',
                                                    marginBottom: '24px',
                                                    lineHeight: 1.3,
                                                    transition: 'color 0.3s ease',
                                                }}>
                                                    AI/MLOps<br/>Field Deployed Engineer
                                                </p>
                                                <p style={{ 
                                                    fontSize: '18px',
                                                    fontWeight: 400,
                                                    color: '#666',
                                                    transition: 'color 0.3s ease',
                                                    marginBottom: '16px',
                                                }}>
                                                    15 years engineering constrained regulated systems into defined and aligned diagnostic architecture and enterprise enablement.
                                                </p>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-end',
                                                    width: '100%',
                                                }}>
                                                    <span style={{
                                                        fontSize: '32px',
                                                        color: '#000',
                                                        transition: 'color 0.3s ease',
                                                    }}>→</span>
                                                </div>
                                            </div>
                                            <div 
                                                className="parallax-img"
                                                style={{
                                                    backgroundColor: '#e5e5e5',
                                                    backgroundImage: 'none',
                                                }}
                                            ></div>
                                        </>
                                    ) : (
                                        <>
                                    <div className="parallax-content">
                                        {/* Title */}
                                        <h4 style={{ marginBottom: '8px', color: '#fff' }}>{card.title}</h4>
                                        
                                        {/* Domain - simplified */}
                                        <p style={{
                                            fontSize: '14px',
                                            color: '#fff',
                                            opacity: 0.8,
                                        }}>
                                            {card.domain}
                                        </p>

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
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CaseStudyShowcase;

"use client"
import React, { useRef, useEffect, useState } from 'react';

interface CaseStudySlide {
    id: number;
    type: 'hero' | 'context' | 'approach' | 'architecture' | 'results' | 'proof';
    title: string;
    subtitle?: string;
    content: string[];
    backgroundImage?: string;
    codeSnippet?: string;
    testimonial?: {
        quote: string;
        author: string;
        role: string;
        company: string;
    };
    onsiteImage?: string;
}

interface CaseStudyHorizontalProps {
    caseStudy: {
        title: string;
        company: string;
        slides: CaseStudySlide[];
    };
}

const CaseStudyHorizontal: React.FC<CaseStudyHorizontalProps> = ({ caseStudy }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft;
            const slideWidth = container.offsetWidth;
            const newSlide = Math.round(scrollLeft / slideWidth);
            
            if (newSlide !== currentSlide && !isTransitioning) {
                setCurrentSlide(newSlide);
            }
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [currentSlide, isTransitioning]);

    const scrollToSlide = (index: number) => {
        const container = containerRef.current;
        if (!container) return;

        setIsTransitioning(true);
        const slideWidth = container.offsetWidth;
        container.scrollTo({
            left: slideWidth * index,
            behavior: 'smooth'
        });

        setTimeout(() => setIsTransitioning(false), 500);
    };

    return (
        <div className="case-study-horizontal">
            {/* Navigation Dots */}
            <div className="case-study-nav">
                {caseStudy.slides.map((_, index) => (
                    <button
                        key={index}
                        className={`nav-dot ${currentSlide === index ? 'active' : ''}`}
                        onClick={() => scrollToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Slides Container */}
            <div ref={containerRef} className="case-study-slides-container">
                {caseStudy.slides.map((slide) => (
                    <div
                        key={slide.id}
                        className={`case-study-slide slide-${slide.type}`}
                        style={{
                            backgroundImage: slide.backgroundImage 
                                ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${slide.backgroundImage})`
                                : 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
                        }}
                    >
                        <div className="slide-content">
                            {/* Hero Slide */}
                            {slide.type === 'hero' && (
                                <>
                                    <span className="slide-label">Case Study</span>
                                    <h1 className="slide-title">{slide.title}</h1>
                                    <p className="slide-subtitle">{slide.subtitle}</p>
                                    <div className="slide-body">
                                        {slide.content.map((line, idx) => (
                                            <p key={idx} className="body-text">{line}</p>
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Context/Approach/Architecture/Results Slides */}
                            {['context', 'approach', 'architecture', 'results'].includes(slide.type) && (
                                <>
                                    <span className="slide-number">0{slide.id}</span>
                                    <h2 className="slide-title">{slide.title}</h2>
                                    {slide.subtitle && <p className="slide-subtitle">{slide.subtitle}</p>}
                                    <div className="slide-body">
                                        {slide.content.map((line, idx) => (
                                            <p key={idx} className="body-text">{line}</p>
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Proof Slide */}
                            {slide.type === 'proof' && (
                                <div className="proof-slide-grid">
                                    {/* Code Snippet */}
                                    {slide.codeSnippet && (
                                        <div className="proof-code">
                                            <h3>Technical Implementation</h3>
                                            <pre><code>{slide.codeSnippet}</code></pre>
                                        </div>
                                    )}

                                    {/* Onsite Photo */}
                                    {slide.onsiteImage && (
                                        <div className="proof-image">
                                            <img src={slide.onsiteImage} alt="Onsite work" />
                                        </div>
                                    )}

                                    {/* Testimonial */}
                                    {slide.testimonial && (
                                        <div className="proof-testimonial">
                                            <blockquote>"{slide.testimonial.quote}"</blockquote>
                                            <div className="testimonial-author">
                                                <strong>{slide.testimonial.author}</strong>
                                                <span>{slide.testimonial.role}</span>
                                                <span>{slide.testimonial.company}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Swipe Indicator */}
                        {slide.id < caseStudy.slides.length && (
                            <div className="swipe-indicator">
                                <span>→</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <style jsx>{`
                .case-study-horizontal {
                    position: relative;
                    width: 100%;
                    height: 100vh;
                    overflow: hidden;
                    background: #000;
                }

                .case-study-nav {
                    position: fixed;
                    top: 50%;
                    right: 40px;
                    transform: translateY(-50%);
                    z-index: 100;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .nav-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .nav-dot.active {
                    background: rgba(255, 255, 255, 0.9);
                    transform: scale(1.4);
                }

                .case-study-slides-container {
                    display: flex;
                    width: 100%;
                    height: 100vh;
                    overflow-x: scroll;
                    overflow-y: hidden;
                    scroll-snap-type: x mandatory;
                    scroll-behavior: smooth;
                    -webkit-overflow-scrolling: touch;
                }

                .case-study-slides-container::-webkit-scrollbar {
                    display: none;
                }

                .case-study-slide {
                    min-width: 100vw;
                    height: 100vh;
                    scroll-snap-align: start;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-size: cover;
                    background-position: center;
                    position: relative;
                    padding: 100px 80px;
                }

                .slide-content {
                    max-width: 900px;
                    color: #fff;
                }

                .slide-label {
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 4px;
                    opacity: 0.6;
                    margin-bottom: 30px;
                    display: block;
                    font-weight: 500;
                }

                .slide-number {
                    font-size: 120px;
                    font-weight: 900;
                    line-height: 1;
                    opacity: 0.08;
                    position: absolute;
                    top: 60px;
                    left: 80px;
                }

                .slide-title {
                    font-size: 64px;
                    font-weight: 900;
                    line-height: 1;
                    margin-bottom: 30px;
                    text-transform: uppercase;
                    letter-spacing: -2px;
                }

                .slide-hero .slide-title {
                    font-size: 80px;
                }

                .slide-subtitle {
                    font-size: 22px;
                    font-weight: 300;
                    margin-bottom: 50px;
                    opacity: 0.85;
                    line-height: 1.4;
                }

                .slide-body {
                    font-size: 18px;
                    line-height: 1.7;
                    max-width: 700px;
                }

                .body-text {
                    margin-bottom: 24px;
                    font-weight: 300;
                    opacity: 0.9;
                }

                .swipe-indicator {
                    position: absolute;
                    bottom: 60px;
                    right: 80px;
                    font-size: 32px;
                    opacity: 0.4;
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 0.4; transform: translateX(0); }
                    50% { opacity: 0.8; transform: translateX(15px); }
                }

                /* Proof Slide Styles */
                .proof-slide-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 40px;
                    width: 100%;
                    max-width: 1400px;
                }

                .proof-code {
                    background: rgba(0, 0, 0, 0.9);
                    padding: 40px;
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .proof-code h3 {
                    font-size: 14px;
                    margin-bottom: 24px;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    opacity: 0.7;
                    font-weight: 600;
                }

                .proof-code pre {
                    overflow-x: auto;
                    font-size: 13px;
                    line-height: 1.8;
                    font-family: 'Courier New', monospace;
                }

                .proof-code code {
                    color: #00ff88;
                }

                .proof-image img {
                    width: 100%;
                    height: auto;
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .proof-testimonial {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(20px);
                    padding: 50px;
                    border-radius: 12px;
                    grid-column: 1 / -1;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .proof-testimonial blockquote {
                    font-size: 26px;
                    line-height: 1.5;
                    margin-bottom: 30px;
                    font-style: italic;
                    font-weight: 300;
                }

                .testimonial-author {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .testimonial-author strong {
                    font-size: 16px;
                    font-weight: 600;
                }

                .testimonial-author span {
                    font-size: 13px;
                    opacity: 0.7;
                }

                @media (max-width: 768px) {
                    .case-study-slide {
                        padding: 60px 30px;
                    }

                    .slide-number {
                        font-size: 80px;
                        left: 30px;
                    }

                    .slide-title {
                        font-size: 40px;
                    }

                    .slide-hero .slide-title {
                        font-size: 52px;
                    }

                    .slide-subtitle {
                        font-size: 18px;
                    }

                    .slide-body {
                        font-size: 16px;
                    }

                    .proof-slide-grid {
                        grid-template-columns: 1fr;
                        gap: 24px;
                    }

                    .case-study-nav {
                        right: 20px;
                    }

                    .swipe-indicator {
                        right: 30px;
                        bottom: 40px;
                    }
                }
            `}</style>
        </div>
    );
};

export default CaseStudyHorizontal;

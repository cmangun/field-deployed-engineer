"use client"
import { fadeAnimation, innerServiceAnimation, servicePanelAnimation, studioProjectAnimation, textPerspectiveAnimation, textRevealAnimation } from '@/hooks/useGsapAnimation';
import PhaseMethodology from '@/components/methodology/PhaseMethodology';
import CreativeAgencyProject from '@/components/project/CreativeAgencyProject';
import FashionStudioHero from '@/components/hero-banner/FashionStudioHero';
import CreativeAgencyFooter from '@/layouts/footers/CreativeAgencyFooter';
import PortfolioNavHeader from '@/layouts/headers/PortfolioNavHeader';
import { useCursorAndBackground } from '@/hooks/useCursorAndBackground';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import useScrollSmooth from '@/hooks/useScrollSmooth';
import { useGSAP } from '@gsap/react';

const PortfolioPinterestMain = () => {
    // Initialize custom cursor and background styles
    useCursorAndBackground({ bgColor: "#F3F1EA" });

    // Enable smooth scroll animations
    useScrollSmooth();

    useGSAP(() => {
        const timer = setTimeout(() => {
            textPerspectiveAnimation();
            studioProjectAnimation();
            textRevealAnimation();
            fadeAnimation();
            innerServiceAnimation();
            servicePanelAnimation();
        }, 100)
        return () => clearTimeout(timer);
    });

    return (
        <>
            <div id="magic-cursor">
                <div id="ball"></div>
            </div>
            {/* Global Components */}
            <BackToTop />
            <PortfolioNavHeader />

            <div id="smooth-wrapper">
                <div id="smooth-content">
                    {/* Main Content Sections */}
                    <main>
                        <FashionStudioHero />
                        {/* Section divider bar */}
                        <div style={{
                            width: '100%',
                            height: '4px',
                            backgroundColor: '#EA4D4D'
                        }} />
                        <CreativeAgencyProject showDataCursor={true} subtitleTextColor=''/>
                        <PhaseMethodology />
                    </main>
                    <CreativeAgencyFooter bgColor="#0E0F11" />
                </div>
            </div>
        </>
    );
};

export default PortfolioPinterestMain;

"use client"
import { fadeAnimation } from "@/hooks/useGsapAnimation";
import { useCursorAndBackground } from '@/hooks/useCursorAndBackground';
import PortfolioWebglHeader from '@/layouts/headers/PortfolioWebglHeader';
import AboutUsBanner from '@/components/banner/AboutUsBanner';
import CareerDetails from "@/components/career/CareerDetails";
import useScrollSmooth from '@/hooks/useScrollSmooth';
import { useGSAP } from '@gsap/react';
import React from 'react';

// Use string path for image
const thumbImg = "/assets/img/hero.png";

const CareerDetailsMain = () => {
    // Initialize custom cursor and background styles
    useCursorAndBackground({ bgColor: "#fff" });

    // Enable smooth scroll animations
    useScrollSmooth();

    useGSAP(() => {
        const timer = setTimeout(() => {
            fadeAnimation();
        }, 100)
        return () => clearTimeout(timer);
    });

    return (
        <>
            <div id="magic-cursor" className="cursor-bg-red-2">
                <div id="ball"></div>
            </div>

            {/* Global Components */}
            <PortfolioWebglHeader />

            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <main>
                        <AboutUsBanner image={thumbImg} spacingCls='' />
                        <CareerDetails />
                    </main>
                </div>
            </div>
        </>
    );
};

export default CareerDetailsMain;

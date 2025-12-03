import MobileMenus from '@/layouts/subComponents/MobileMenus';
import logoWhite from '../../../public/assets/img/logo/logo-white.png';
import MobileOffcanvas from '@/components/offcanvas/MobileOffcanvas';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const PortfolioThumbSliderHeader = () => {
    const [openOffCanvas, setOpenOffCanvas] = useState(false);

    return (
        <>
            <header>
                <div className="tp-header-14-area header-transparent pt-10">
                    <div className="container container-1750">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="tp-header-14-wrapper d-flex align-items-center justify-content-between">
                                    <div className="tp-header-14-left">
                                        <div className="tp-header-logo">
                                            <Link href="/"><Image width={120} src={logoWhite} alt="logo white"></Image></Link>
                                        </div>
                                    </div>
                                    <div className="tp-header-14-right d-flex align-items-center">
                                        <div className="tp-header-14-bar-wrap ml-20">
                                            <button onClick={() => setOpenOffCanvas(true)} className="tp-header-8-bar tp-offcanvas-open-btn">
                                                <span>Menu</span>
                                                <span>
                                                    <svg width="24" height="8" viewBox="0 0 24 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0 0H14V1.5H0V0Z" fill="currentcolor" />
                                                        <path d="M0 6H24V7.5H0V6Z" fill="currentcolor" />
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="tp-mobile-menu-active d-none">
                    <MobileMenus />
                </nav>
            </header>

            {/* off canvas */}
            <MobileOffcanvas openOffcanvas={openOffCanvas} setOpenOffcanvas={setOpenOffCanvas} />
            {/* off canvas */}
        </>
    );
};

export default PortfolioThumbSliderHeader;
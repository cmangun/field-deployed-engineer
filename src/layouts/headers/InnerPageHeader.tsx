"use client"
import logoBlack from '../../../public/assets/img/logo/logo-black.png';
import OffCanvasPanel from '@/components/offcanvas/OffCanvasPanel';
import useStickyHeader from '@/hooks/useStickyHeader';
import NavMenus from '../subComponents/NavMenus';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const InnerPageHeader = ({ containerCls = " container-1750" }) => {
    const [openOffCanvas, setOpenOffCanvas] = useState(false);
    const isSticky = useStickyHeader(20);

    return (
        <>
            <div id="header-sticky" className={`tp-header-area tp-header-inner-style tp-header-ptb 
                tp-header-blur sticky-white-bg header-transparent mt-30 @@class ${isSticky ? 'header-sticky' : ''}`}>
                <div className={`container ${containerCls}`}>
                    <div className="row align-items-center">
                        <div className="col-xl-2 col-lg-6 col-6">
                            <div className="tp-header-logo">
                                <Link href="/">
                                    <Image priority width={120} className="logo-white" src={logoBlack} alt="logo black" />
                                    <Image priority width={120} className="logo-black d-none" src={logoBlack} alt="logo black" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-xl-8 d-none d-xl-block">
                            <div className="tp-header-box text-center">
                                <div className="tp-header-menu tp-header-dropdown dropdown-white-bg">
                                    <nav className="tp-mobile-menu-active">
                                        <NavMenus />
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-6 col-6">
                            <div className="tp-header-right text-end">
                                <div className="tp-header-14-bar-wrap ml-20">
                                    <button onClick={() => setOpenOffCanvas(true)} className="tp-header-8-bar tp-offcanvas-open-btn">
                                        <span>Menu</span>{" "}
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

            {/* off canvas */}
            <OffCanvasPanel openOffcanvas={openOffCanvas} setOpenOffcanvas={setOpenOffCanvas} />
            {/* off canvas */}
        </>
    );
};

export default InnerPageHeader;
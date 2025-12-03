import logoBlack from "../../../public/assets/img/logo/logo-black.png";
import OffCanvasPanel from "@/components/offcanvas/OffCanvasPanel";
import useStickyHeader from "@/hooks/useStickyHeader";
import { ArrowSvg, ButtonBlurFilter } from "@/svg";
import NavMenus from "../subComponents/NavMenus";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CreativeStudioHeader = () => {
    const [openOffCanvas, setOpenOffCanvas] = useState(false);
    const isSticky = useStickyHeader(20);

    return (
        <>
            <header>
                <div id="header-sticky" className={`tp-header-area tp-header-ptb tp-header-4-style header-4-light-style tp-header-blur header-transparent tp-header-border sticky-white-bg ${isSticky ? 'header-sticky' : ''}`}>
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-xl-2 col-lg-6 col-md-6 col-6">
                                <Link href="/">
                                    <Image className="logo-black" width={120} src={logoBlack} alt="logo-black" />
                                </Link>
                            </div>
                            <div className="col-xl-8 col-lg-7 d-none d-xl-block">
                                <div className="tp-header-box d-flex align-items-center justify-content-center">
                                    <div className="tp-header-menu tp-header-dropdown dropdown-white-bg">
                                        <nav className="tp-mobile-menu-active">
                                            <NavMenus />
                                        </nav>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-6 col-md-6 col-6">
                                <div className="tp-header-right d-flex align-items-center justify-content-end">
                                    <div className="tp-header-btn-box">
                                        <Link href="/contact-us-light" className="tp-btn-black btn-green-light-bg">
                                            <span className="tp-btn-black-filter-blur">
                                                <ButtonBlurFilter filterId="buttonFilter" />
                                            </span>
                                            <span className="tp-btn-black-filter d-inline-flex align-items-center" style={{ filter: 'url(#buttonFilter)' }}>
                                                <span className="tp-btn-black-text">Get in Touch</span>
                                                <span className="tp-btn-black-circle">
                                                    <ArrowSvg width="10" height="10" viewBox="0 0 10 10" pathValue="M1 9L9 1M9 1H1M9 1V9" />
                                                </span>
                                            </span>
                                        </Link>
                                    </div>
                                    <div className="tp-header-bar ml-20 d-xl-none">
                                        <button onClick={() => setOpenOffCanvas(true)} className="tp-offcanvas-open-btn">
                                            <i></i>
                                            <i></i>
                                            <i></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* off canvas */}
            <OffCanvasPanel openOffcanvas={openOffCanvas} setOpenOffcanvas={setOpenOffCanvas} />
            {/* off canvas */}
        </>
    );
};

export default CreativeStudioHeader;
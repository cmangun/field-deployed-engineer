"use client"
import logoBlack from "../../../public/assets/img/logo/logo-black.png";
import OffCanvasPanel from "@/components/offcanvas/OffCanvasPanel";
import useStickyHeader from '@/hooks/useStickyHeader';
import NavMenus from '../subComponents/NavMenus';
import React, { useState } from 'react';
import { EmailIconThree } from "@/svg";
import Image from 'next/image';
import Link from 'next/link';

const DigitalMarketingHeader = () => {
    const [openOffCanvas, setOpenOffCanvas] = useState(false);
    const isSticky = useStickyHeader(20);

    return (
        <>
            <header>
                {/* -- header area start -- */}
                <div id="header-sticky" className={`tp-header-area tp-header-ptb tp-header-blur sticky-white-bg header-transparent tp-header-3-style ${isSticky ? 'header-sticky' : ''}`}>
                    <div className="container container-1750">
                        <div className="row align-items-center">
                            <div className="col-xl-1 col-lg-5 col-5">
                                <div className="tp-header-logo">
                                    <Link href="/">
                                        <Image className="logo-white" width={120} src={logoBlack} alt="logo" />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-xl-11 col-lg-7 col-7">
                                <div className="tp-header-box d-flex align-items-center justify-content-end justify-content-xl-between">
                                    <div className="tp-header-menu tp-header-dropdown dropdown-white-bg d-none d-xl-flex">
                                        <nav className="tp-mobile-menu-active">
                                            <NavMenus />
                                        </nav>
                                    </div>
                                    <div className="tp-header-btn d-none d-md-flex">
                                        <Link className="tp-btn-yellow-green green-solid" href="/contact">
                                            <i>
                                                <EmailIconThree colorName="currentcolor" strokeWidth="1.5" />
                                            </i>
                                            <span>
                                                <span className="text-1">Send a message</span>
                                                <span className="text-2">Send a message</span>
                                            </span>
                                        </Link>
                                    </div>
                                    <div className="tp-header-bar ml-15 d-xl-none">
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
                {/* -- header area end -- */}
            </header>

            {/* off canvas */}
            <OffCanvasPanel openOffcanvas={openOffCanvas} setOpenOffcanvas={setOpenOffCanvas} />
            {/* off canvas */}
        </>
    );
};

export default DigitalMarketingHeader;
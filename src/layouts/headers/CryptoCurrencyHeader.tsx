import logoWhite from '../../../public/assets/img/logo/logo-white.png';
import logoBlack from '../../../public/assets/img/logo/logo-black.png';
import OffCanvasPanel from '@/components/offcanvas/OffCanvasPanel';
import useStickyHeader from '@/hooks/useStickyHeader';
import NavMenus from '../subComponents/NavMenus';
import React, { useState } from 'react';
import { ArrowEleven } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';

const CryptoCurrencyHeader = () => {
    const [openOffCanvas, setOpenOffCanvas] = useState(false);
    const isSticky = useStickyHeader(20);

    // Header Classes
    const headerClasses = `tp-header-area tp-header-13-ptb 
        sticky-white-bg tp-header-blur header-transparent ${isSticky ? 'header-sticky' : ''}`;

    return (
        <>
            <header>
                {/* -- header area start -- */}
                <div id="header-sticky" className={headerClasses}>
                    <div className="container container-1750">
                        <div className="row align-items-center">
                            <div className="col-xl-2 col-lg-5 col-5">
                                <div className="tp-header-logo">
                                    <Link href="/">
                                        <Image width={120} className="logo-white" src={logoWhite} alt="logo white" />
                                        <Image width={120} className="logo-black d-none" src={logoBlack} alt="logo black" />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-xl-10 col-lg-7 col-7">
                                <div className="tp-header-box d-flex align-items-center justify-content-end justify-content-xl-between">
                                    <div className="tp-header-menu tp-header-13-menu tp-header-dropdown dropdown-white-bg  d-none d-xl-flex">
                                        <nav className="tp-mobile-menu-active">
                                            <NavMenus />
                                        </nav>
                                    </div>
                                    <div className="tp-header-right d-flex align-items-center justify-content-end">
                                        <div className="cr-header-login d-none d-lg-block">
                                            <Link href="/login">Login</Link>
                                        </div>
                                        <div className="tp-header-btn-box d-none d-md-block ml-15">
                                            <Link href="/contact" className="tp-btn-white-border tp-btn-light-bg">Get Started <span>
                                                <ArrowEleven />
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
                </div>
                {/* -- header area end -- */}
            </header>

            {/* off canvas */}
            <OffCanvasPanel openOffcanvas={openOffCanvas} setOpenOffcanvas={setOpenOffCanvas} />
            {/* off canvas */}
        </>
    );
};

export default CryptoCurrencyHeader;
import logoBlack from '../../../public/assets/img/logo/logo-black.png';
import OffCanvasPanel from '@/components/offcanvas/OffCanvasPanel';
import useStickyHeader from '@/hooks/useStickyHeader';
import HeaderTop from './subComponents/HeaderTop';
import NavMenus from '../subComponents/NavMenus';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MobileApplicationHeader = () => {
     const [openOffCanvas, setOpenOffCanvas] = useState(false);
    const isSticky = useStickyHeader(20);

    return (
        <>
            <header>
                <div className="tp-header-10-main header-transparent">
                    {/* -- header top area start -- */}
                    <HeaderTop />
                    {/* -- header top area end -- */}

                    {/* -- header area start -- */}
                    <div className={`tp-header-10-area tp-header-blur sticky-white-bg tp-header-10-sticky ${isSticky ? 'header-sticky' : ''}`}>
                        <div className="container container-1430">
                            <div className="tp-header-10-wrapper mt-30">
                                <div className="row align-items-center">
                                    <div className="col-xl-2 col-lg-4 col-md-6 col-5">
                                        <div className="tp-header-10-logo">
                                            <Link href="/">
                                                <Image width={120} src={logoBlack} alt="logo-light" />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-xl-10 col-lg-8 col-md-6 col-7">
                                        <div className="tp-header-10-box d-flex align-items-center justify-content-end justify-content-xl-between">
                                            <div className="tp-header-menu tp-header-10-menu tp-header-dropdown dropdown-white-bg d-none d-xl-block">
                                                <nav className="tp-mobile-menu-active">
                                                    <NavMenus />
                                                </nav>
                                            </div>
                                            <div className="tp-header-10-right d-flex align-items-center">
                                                <div className="tp-header-10-btn-box d-none d-sm-block">
                                                    <div className="animated-border-box radius-style-2">
                                                        <Link className="tp-btn-gradient sm p-relative" href="/register">
                                                            Sign up
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="tp-header-10-offcanvas ml-20">
                                                    <div className="tp-header-bar">
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
                        </div>
                    </div>
                    {/* -- header area end -- */}
                </div>
            </header>

            {/* off canvas */}
            <OffCanvasPanel openOffcanvas={openOffCanvas} setOpenOffcanvas={setOpenOffCanvas} />
            {/* off canvas */}
        </>
    );
};

export default MobileApplicationHeader;
import MobileMenus from '@/layouts/subComponents/MobileMenus';
import blackLogo from '../../../public/assets/img/logo/logo-black.png';
import MobileOffcanvas from '@/components/offcanvas/MobileOffcanvas';
import React, { useState } from 'react';
import { MenubarIcon } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';

const PortfolioFixedHeader = () => {
    const [openOffCanvas, setOpenOffCanvas] = useState(false);

    return (
        <>
            <div className="tp-header-14-area fixed-header-style header-fixed pt-10">
                <div className="container container-1800">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="tp-header-14-wrapper d-flex align-items-center justify-content-between">
                                <div className="tp-header-14-left">
                                    <div className="tp-header-logo">
                                        <Link href="/">
                                            <Image src={blackLogo} width={120} alt="logo" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="tp-header-14-right d-flex align-items-center">
                                    <div className="tp-header-14-info d-none d-md-block">
                                        <Link className="tp-line-white" href="mailto:hello@agntix.com">hello@agntix.com</Link>
                                    </div>
                                    <div className="tp-header-14-bar-wrap ml-20">
                                        <button onClick={() => setOpenOffCanvas(true)} className="tp-header-8-bar tp-offcanvas-open-btn">
                                            <span>Menu</span>{" "}
                                            <span><MenubarIcon /></span>
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

            {/* off canvas */}
            <MobileOffcanvas openOffcanvas={openOffCanvas} setOpenOffcanvas={setOpenOffCanvas} />
            {/* off canvas */}
        </>
    );
};

export default PortfolioFixedHeader;
import MobileMenus from "@/layouts/subComponents/MobileMenus";
import logo from "../../../public/assets/img/logo/logo-pink-black.png";
import MobileOffcanvas from "@/components/offcanvas/MobileOffcanvas";
import React, { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';

const CreativeAgencyHeader = () => {
    const [openOffCanvas, setOpenOffCanvas] = useState(false);

    return (
        <>
            <header>
                {/* -- header area start -- */}
                <div className="tp-header-5-area header-transparent pt-25 header-style-light">
                    <div className="container container-1830">
                        <div className="row align-items-center">
                            <div className="col-xl-12">
                                <div className="tp-header-5-box d-flex align-items-center justify-content-between">
                                    <div className="tp-header-5-logo">
                                        <Link href="/">
                                            <Image width={120} src={logo} alt="logo" />
                                        </Link>
                                    </div>
                                    <div className="tp-header-5-menu-bar">
                                        <button onClick={() => setOpenOffCanvas(true)} className="tp-header-5-bar tp-offcanvas-open-btn">
                                            <span></span>
                                            <span></span>
                                        </button>
                                    </div>
                                    <div className="tp-header-5-button d-none d-md-block">
                                        <Link className="tp-btn-red-border" href="/contact">Get in Touch</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="tp-mobile-menu-active d-none">
                    <ul>
                        <MobileMenus />
                    </ul>
                </nav>
                {/* -- header area end -- */}

            </header>

            {/* off canvas */}
            <MobileOffcanvas openOffcanvas={openOffCanvas} setOpenOffcanvas={setOpenOffCanvas} />
            {/* off canvas */}

        </>
    );
};

export default CreativeAgencyHeader;
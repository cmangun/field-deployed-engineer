import MobileMenus from "@/layouts/subComponents/MobileMenus";
import logoBlack from "../../../public/assets/img/logo/logo-black.png";
import MobileOffcanvas from "@/components/offcanvas/MobileOffcanvas";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const DesignAgencyHeader = () => {
    const [openOffCanvas, setOpenOffCanvas] = useState(false);

    return (
        <>
            <header>
                {/* -- header area start -- */}
                <div className="tp-header-2-area header-black-style z-index-3 mt-40">
                    <div className="container container-1750">
                        <div className="row align-items-center">
                            <div className="col-6">
                                <div className="tp-header-logo">
                                    <Link href="/">
                                        <Image width={140} src={logoBlack} alt="logo-black" />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="tp-header-2-right d-flex justify-content-end">
                                    <button onClick={() => setOpenOffCanvas(true)} className="tp-header-2-bar tp-offcanvas-open-btn d-flex align-items-center">
                                        <span>Menu</span>
                                        <span>
                                            <i></i>
                                            <i></i>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="tp-mobile-menu-active d-none">
                    <ul><MobileMenus /></ul>
                </nav>
            </header>

            {/* off canvas */}
            <MobileOffcanvas openOffcanvas={openOffCanvas} setOpenOffcanvas={setOpenOffCanvas} />
            {/* off canvas */}
        </>
    );
};

export default DesignAgencyHeader;
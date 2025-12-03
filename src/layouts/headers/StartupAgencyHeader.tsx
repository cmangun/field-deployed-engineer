import logoBlack from '../../../public/assets/img/logo/logo-black.png';
import OffCanvasPanel from '@/components/offcanvas/OffCanvasPanel';
import useStickyHeader from '@/hooks/useStickyHeader';
import useGlobalContext from '@/hooks/useContext';
import NavMenus from '../subComponents/NavMenus';
import { ArrowThirteen, SearchIcon } from '@/svg';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const StartupAgencyHeader = () => {
    const [openOffCanvas, setOpenOffCanvas] = useState(false);
    const { toggleSearch } = useGlobalContext();
    const isSticky = useStickyHeader(20);

    // Header Classes
    const headerClasses = `tp-header-12-ptb tp-header-blur
        sticky-white-bg tp-header-9-sticky header-transparent tp-header-8-border ${isSticky ? 'header-sticky' : ''}`;

    return (
        <>
            <header>
                <div id="header-sticky" className={headerClasses}>
                    <div className="container container-1750">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="tp-header-12-wrapper d-flex align-items-center justify-content-between">
                                    <div className="tp-header-8-left d-flex align-items-center">
                                        <div className="tp-header-logo">
                                            <Link href="/"> <Image width={120} src={logoBlack} alt="logo" /></Link>
                                        </div>
                                    </div>
                                    <div className="tp-header-12-middle">
                                        <div className={`tp-header-menu tp-header-12-menu tp-header-dropdown dropdown-black-bg d-none d-xl-block`}>
                                            <nav className="tp-mobile-menu-active">
                                                <NavMenus />
                                            </nav>
                                        </div>
                                    </div>
                                    <div className="tp-header-8-right d-flex align-items-center d-md-inline-flex">
                                        <div className="tp-header-8-search-box d-none d-md-block">
                                            <button onClick={toggleSearch} className="tp-header-8-search tp-search-open-btn">
                                                <span>
                                                    <SearchIcon strokeColor="#191919" />
                                                </span>
                                            </button>
                                        </div>
                                        <div className="tp-header-8-btn d-none d-md-block">
                                            <Link className="tp-btn-border-2 st" href="/contact">
                                                GET STARTED {" "}
                                                <span>
                                                    <ArrowThirteen />
                                                </span>
                                            </Link>
                                        </div>
                                        <div className={`tp-header-10-offcanvas ml-20 d-xl-none`}>
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
            </header>

            {/* off canvas */}
            <OffCanvasPanel openOffcanvas={openOffCanvas} setOpenOffcanvas={setOpenOffCanvas} />
            {/* off canvas */}
        </>
    );
};

export default StartupAgencyHeader;
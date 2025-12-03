import logoBlack from '../../../public/assets/img/logo/logo-black.png';
import OffCanvasPanel from '@/components/offcanvas/OffCanvasPanel';
import useStickyHeader from '@/hooks/useStickyHeader';
import useGlobalContext from '@/hooks/useContext';
import NavMenus from '../subComponents/NavMenus';
import { ArrowTen, SearchIcon } from '@/svg';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ITSolutionHeader = () => {
    const [openOffCanvas, setOpenOffCanvas] = useState(false);
    const { toggleSearch } = useGlobalContext();
    const isSticky = useStickyHeader(20);

    return (
        <>
            <header>

                {/* -- header area start -- */}
                <div id="header-sticky" className={`tp-header-10-area tp-header-11-style tp-header-blur 
                    sticky-white-bg header-transparent ${isSticky ? 'header-sticky' : ''}`}>
                    <div className="container container-1630">
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
                                        <div className={`tp-header-menu tp-header-10-menu tp-header-dropdown dropdown-white-bg d-none d-xl-block`}>
                                            <nav className="tp-mobile-menu-active">
                                                <NavMenus />
                                            </nav>
                                        </div>
                                        <div className="tp-header-10-right d-flex align-items-center">
                                            <div className="tp-header-11-search-box d-none d-md-block">
                                                <button onClick={toggleSearch} className="tp-header-11-search tp-search-open-btn">
                                                    <span>
                                                        <SearchIcon strokeColor="#21212D" width='18' height='18' />
                                                    </span>
                                                </button>
                                            </div>
                                            <div className="tp-header-11-btn-box d-none d-md-block ml-20">
                                                <Link className="tp-btn-black-radius d-flex align-items-center justify-content-between" href="/contact">
                                                    <span>
                                                        <span className="text-1">Start a project</span>
                                                        <span className="text-2">Start a project</span>
                                                    </span>
                                                    <i>
                                                        <span>
                                                            <ArrowTen strokeColor="#21212D" />
                                                            <ArrowTen strokeColor="#21212D" />
                                                        </span>
                                                    </i>
                                                </Link>
                                            </div>
                                            <div className="tp-header-10-offcanvas ml-15">
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
            </header>

            {/* off canvas */}
            <OffCanvasPanel openOffcanvas={openOffCanvas} setOpenOffcanvas={setOpenOffCanvas} />
            {/* off canvas */}
        </>
    );
};

export default ITSolutionHeader;
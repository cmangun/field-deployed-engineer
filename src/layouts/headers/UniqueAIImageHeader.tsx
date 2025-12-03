import logoWhite from '../../../public/assets/img/logo/logo-white.png';
import logoBlack from '../../../public/assets/img/logo/logo-black.png';
import OffCanvasPanel from '@/components/offcanvas/OffCanvasPanel';
import useStickyHeader from '@/hooks/useStickyHeader';
import useGlobalContext from '@/hooks/useContext';
import NavMenus from '../subComponents/NavMenus';
import React, { useState } from 'react';
import { SearchIcon } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';

const UniqueAIImageHeader = () => {
    const [openOffCanvas, setOpenOffCanvas] = useState(false);
    const { toggleSearch } = useGlobalContext();
    const isSticky = useStickyHeader(20);
    
    return (
        <>
            <header>

                {/* -- header area start -- */}
                <div className={`tp-header-7-area sticky-white-bg tp-header-blur header-transparent mt-30 ${isSticky ? 'header-sticky' : ''}`}>
                    <div className="container">
                        <div className="tp-header-7-wrapper">
                            <div className="row align-items-center">
                                <div className="col-xl-2 col-lg-4 col-md-6 col-5">
                                    <div className="tp-header-7-logo">
                                        <Link href="/">
                                            <Image width={120} className="logo-white" src={logoWhite} alt="logo" />
                                            <Image width={120} className="logo-black d-none" src={logoBlack} alt="logo" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-xl-10 col-lg-8 col-md-6 col-7">
                                    <div className="tp-header-7-box d-flex align-items-center justify-content-end justify-content-xl-between">
                                        <div className="tp-header-menu tp-header-7-menu tp-header-dropdown dropdown-white-bg d-none d-xl-block">
                                            <nav className="tp-mobile-menu-active">
                                                <NavMenus />
                                            </nav>
                                        </div>
                                        <div className="tp-header-7-right d-flex align-items-center">
                                            <div className="tp-header-7-serach-box d-none d-md-block">
                                                <button onClick={toggleSearch} className="tp-header-7-serach mr-30 tp-search-open-btn">
                                                    <span><SearchIcon strokeColor='currentColor' /></span>
                                                </button>
                                            </div>
                                            <div className="tp-header-7-btn-box d-none d-sm-block">
                                                <div className="animated-border-box">
                                                    <Link className="tp-btn-gradient sm p-relative" href="/register">Sign up</Link>
                                                </div>
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
                </div>
                {/* -- header area end -- */}
            </header>

            {/* off canvas */}
            <OffCanvasPanel openOffcanvas={openOffCanvas} setOpenOffcanvas={setOpenOffCanvas} />
            {/* off canvas */}
        </>
    );
};

export default UniqueAIImageHeader;
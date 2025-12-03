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

const CorporateAgencyHeader = () => {
    const [openOffCanvas, setOpenOffCanvas] = useState(false);
    const { toggleSearch } = useGlobalContext();
    const isSticky = useStickyHeader(20);

    return (
        <>
            <div className={`tp-header-9-area tp-header-blur tp-header-9-sticky sticky-white-bg header-transparent tp-header-9-mt ${isSticky ? 'header-sticky' : ''}`}>
                <div className="container container-1750">
                    <div className="row align-items-center">
                        <div className="col-xl-3 col-lg-4 col-md-6 col-4">
                            <div className="tp-header-9-logo">
                                <Link href="/">
                                    <Image className="logo-1" width={120} src={logoWhite} alt="logo-white" />
                                    <Image className="logo-2" width={120} src={logoBlack} alt="logo-black" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-8 col-md-6 col-8">
                            <div className="tp-header-9-box d-flex align-items-center justify-content-end justify-content-xl-between">
                                <div className="tp-header-9-menu tp-header-dropdown dropdown-white-bg d-none d-xl-block">
                                    <nav className="tp-mobile-menu-active">
                                        <NavMenus />
                                    </nav>
                                </div>
                                <div className="tp-header-9-right d-flex align-items-center justify-content-end">
                                    <div className="tp-header-9-search-box d-none d-md-block">
                                        <button onClick={toggleSearch} className="tp-header-9-search tp-search-open-btn">
                                            <span>
                                                <SearchIcon strokeColor='currentcolor' />
                                            </span>
                                        </button>
                                    </div>
                                    <div className="tp-header-9-btn ml-25">
                                        <Link className="tp-btn-yellow-green" href="/contact">
                                            <span>
                                                <span className="text-1">LET’S TALK</span>
                                                <span className="text-2">LET’S TALK</span>
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

            {/* off canvas */}
            <OffCanvasPanel openOffcanvas={openOffCanvas} setOpenOffcanvas={setOpenOffCanvas} />
            {/* off canvas */}
        </>
    );
};

export default CorporateAgencyHeader;
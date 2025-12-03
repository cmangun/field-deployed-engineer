import MobileMenus from '@/layouts/subComponents/MobileMenus';
import logoWhite from '../../../public/assets/img/logo/logo-white.png';
import logoB from '../../../public/assets/img/logo/logo-black.png';
import MobileOffcanvas from '@/components/offcanvas/MobileOffcanvas';
import React, { useState } from 'react';
import { MenubarIcon } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';

interface PortfolioWebglHeaderProps {
    customClass?: string;
    logoBlack?: boolean;
    logoWidth?: number;
    logoHeight?: number;
}

const PortfolioWebglHeader: React.FC<PortfolioWebglHeaderProps> = (
    {
        customClass = 'header-transparent',
        logoBlack,
        logoWidth = 120

    }) => {
    const [openOffCanvas, setOpenOffCanvas] = useState(false);

    return (
        <>
            <div className={`tp-header-14-area ${customClass ? customClass : 'header-transparent'}`}>
                <div className="container container-1800">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="tp-header-14-wrapper d-flex align-items-center justify-content-end" style={{ width: '100%' }}>
                                <div className="tp-header-14-right d-flex align-items-center" style={{ marginLeft: 'auto' }}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Fixed top-right menu button */}
            <div style={{
                position: 'fixed',
                top: '30px',
                right: '50px',
                zIndex: 99999,
            }}>
                <button onClick={() => setOpenOffCanvas(!openOffCanvas)} className="case-studies-btn" style={{
                    color: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: '#fff',
                    padding: '15px 25px',
                    borderRadius: '16px',
                    border: '1px solid #000',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit',
                    fontSize: '14px',
                    cursor: 'pointer',
                }}>
                    <span>{openOffCanvas ? 'Close' : 'Case Studies'}</span>{" "}
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        {openOffCanvas ? '×' : <MenubarIcon />}
                    </span>
                </button>
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

export default PortfolioWebglHeader;
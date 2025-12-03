import MobileMenus from '@/layouts/subComponents/MobileMenus';
import logoWhite from '../../../public/assets/img/logo/logo-white.png';
import logoB from '../../../public/assets/img/logo/logo-black.png';
import MobileOffcanvas from '@/components/offcanvas/MobileOffcanvas';
import React, { useState } from 'react';
import { MenubarIcon } from '@/svg';

interface PortfolioWebglHeaderProps {
    customClass?: string;
    logoBlack?: boolean;
    logoWidth?: number;
    logoHeight?: number;
}

const PortfolioWebglHeader: React.FC<PortfolioWebglHeaderProps> = ({
    customClass = 'header-transparent',
    logoBlack,
    logoWidth = 120
}) => {
    const [openOffCanvas, setOpenOffCanvas] = useState(false);

    return (
        <>
            {/* Empty header wrapper - hidden to remove gap */}
            <div className={`tp-header-14-area ${customClass ? customClass : 'header-transparent'}`} style={{ display: 'none' }}>
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
            
            {/* Fixed top-left identity - hidden when menu is open */}
            {!openOffCanvas && (
            <div className="header-identity" style={{
                position: 'fixed',
                top: '15px',
                left: '84px',
                zIndex: 99999,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 0',
            }}>
                <style jsx>{`
                    @media (min-width: 768px) {
                        .header-identity {
                            top: 30px !important;
                            left: 84px !important;
                        }
                    }
                `}</style>
                <span style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#333',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                }}>
                    Field Deployed Engineer
                </span>
                <span style={{ color: '#ccc', fontSize: '15px' }}>|</span>
                <span style={{
                    fontSize: '15px',
                    color: '#666',
                }}>
                    Christopher Mangun
                </span>
            </div>
            )}

            {/* Fixed bottom-right menu button */}
            <div className="header-buttons" style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                zIndex: 99999,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
            }}>
                <style jsx>{`
                    @media (min-width: 768px) {
                        .header-buttons {
                            bottom: 40px !important;
                            right: 50px !important;
                        }
                    }
                    .case-studies-btn {
                        padding: 14px 24px;
                        font-size: 11px;
                    }
                    @media (min-width: 768px) {
                        .case-studies-btn {
                            padding: 16px 28px !important;
                            font-size: 12px !important;
                        }
                    }
                `}</style>
                <button onClick={() => setOpenOffCanvas(!openOffCanvas)} className="case-studies-btn" style={{
                    color: openOffCanvas ? '#fff' : '#000',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: openOffCanvas ? '#000' : '#fff',
                    borderRadius: '100px',
                    border: '1px solid rgba(0,0,0,0.1)',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                    boxShadow: openOffCanvas ? 'none' : '0 4px 20px rgba(0,0,0,0.08)',
                }}>
                    <span>{openOffCanvas ? 'Close' : 'Menu'}</span>
                    <span style={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        fontSize: openOffCanvas ? '18px' : '14px',
                        fontWeight: 300,
                    }}>
                        {openOffCanvas ? '×' : '→'}
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

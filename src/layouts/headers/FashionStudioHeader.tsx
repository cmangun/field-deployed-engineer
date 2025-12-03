import MobileMenus from '@/layouts/subComponents/MobileMenus';
import MobileOffcanvas from '@/components/offcanvas/MobileOffcanvas';
import React, { useState } from 'react';

const FashionStudioHeader = () => {
const [openOffCanvas, setOpenOffCanvas] = useState(false);

    return (
        <>
            <div className="tp-header-14-area tp-header-15-style header-transparent">
                <div className="container container-1750">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="tp-header-14-wrapper d-flex align-items-center justify-content-end">
                                <div className="tp-header-14-right info-black-text d-flex align-items-center">
                                    <div className="tp-menu-toggle-wrap">
                                        <button 
                                            onClick={() => setOpenOffCanvas(!openOffCanvas)} 
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: '15px 40px',
                                                border: 'none',
                                                background: '#FFFFFF',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                                fontWeight: '700',
                                                letterSpacing: '0.05em',
                                                textTransform: 'uppercase',
                                                mixBlendMode: 'multiply',
                                                color: '#000000',
                                                clipPath: 'polygon(0% 20%, 85% 20%, 100% 50%, 85% 80%, 0% 80%, 0% 20%)'
                                            }}
                                        >
                                            CASE STUDIES
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

export default FashionStudioHeader;

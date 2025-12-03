import logoBlack from '../../../public/assets/img/logo/logo-black.png';
import OffCanvasPanel from '@/components/offcanvas/OffCanvasPanel';
import useStickyHeader from '@/hooks/useStickyHeader';
import NavMenus from '../subComponents/NavMenus';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ServicesHeaderProps {
    variantClass?: string;
}

const ServicesHeader: React.FC<ServicesHeaderProps> = ({ variantClass = "" }) => {
    const [openOffCanvas, setOpenOffCanvas] = useState(false);
    const isSticky = useStickyHeader(20);

    return (
        <>
            <header className="tp-header-shop-area header-transparent pt-10">
                <div className="container-fluid">
                    <div id="header-sticky" className={`tp-header-shop-wrap ${variantClass} tp-header-blur sticky-white-bg ${isSticky ? 'header-sticky' : ''}`}>
                        <div className="row align-items-center">
                            {/* Logo */}
                            <div className="col-xxl-2 col-xl-2 col-lg-6 col-md-6 col-6">
                                <div className="tp-header-shop-logo">
                                    <Link href="/portfolio-pinterest-light">
                                        <span style={{ 
                                            fontSize: '24px', 
                                            fontWeight: 700, 
                                            color: '#000',
                                            letterSpacing: '-0.02em'
                                        }}>
                                            CM
                                        </span>
                                    </Link>
                                </div>
                            </div>

                            {/* Navigation Menu */}
                            <div className="col-xxl-7 col-xl-7 d-none d-xl-block">
                                <div className="tp-header-shop-menu tp-header-dropdown dropdown-white-bg" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <nav className="tp-mobile-menu-active">
                                        <ul style={{ display: 'flex', gap: '40px', listStyle: 'none', margin: 0, padding: 0 }}>
                                            <li>
                                                <Link href="/fractional-fde" style={{ 
                                                    color: '#000', 
                                                    textDecoration: 'none',
                                                    fontSize: '15px',
                                                    fontWeight: 500,
                                                    transition: 'opacity 0.3s'
                                                }}>
                                                    Services
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/portfolio-pinterest-light" style={{ 
                                                    color: '#000', 
                                                    textDecoration: 'none',
                                                    fontSize: '15px',
                                                    fontWeight: 500,
                                                    transition: 'opacity 0.3s'
                                                }}>
                                                    Case Studies
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/career-details-light" style={{ 
                                                    color: '#000', 
                                                    textDecoration: 'none',
                                                    fontSize: '15px',
                                                    fontWeight: 500,
                                                    transition: 'opacity 0.3s'
                                                }}>
                                                    Resume
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" style={{ 
                                                    color: '#000', 
                                                    textDecoration: 'none',
                                                    fontSize: '15px',
                                                    fontWeight: 500,
                                                    transition: 'opacity 0.3s'
                                                }}>
                                                    About
                                                </Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>

                            {/* Header Actions */}
                            <div className="col-xxl-3 col-xl-3 col-lg-6 col-md-6 col-6">
                                <div className="tp-header-shop-right d-flex align-items-center justify-content-end">
                                    <div className="tp-header-shop-action">
                                        <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }}>
                                            {/* Contact Button */}
                                            <li className="d-none d-md-block">
                                                <Link href="mailto:cmangun@gmail.com" style={{
                                                    backgroundColor: '#FF5722',
                                                    color: '#fff',
                                                    padding: '12px 24px',
                                                    borderRadius: '24px',
                                                    textDecoration: 'none',
                                                    fontSize: '14px',
                                                    fontWeight: 600,
                                                    transition: 'all 0.3s ease',
                                                    display: 'inline-block'
                                                }}>
                                                    Let's Talk
                                                </Link>
                                            </li>

                                            {/* Mobile Menu Toggle */}
                                            <li className="d-xl-none">
                                                <div className="tp-header-10-offcanvas">
                                                    <div className="tp-header-bar">
                                                        <button onClick={() => setOpenOffCanvas(true)} className="tp-offcanvas-open-btn" style={{
                                                            background: 'none',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: '5px'
                                                        }}>
                                                            <i style={{ width: '25px', height: '2px', backgroundColor: '#000', display: 'block' }}></i>
                                                            <i style={{ width: '25px', height: '2px', backgroundColor: '#000', display: 'block' }}></i>
                                                            <i style={{ width: '25px', height: '2px', backgroundColor: '#000', display: 'block' }}></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* off canvas */}
            <OffCanvasPanel openOffcanvas={openOffCanvas} setOpenOffcanvas={setOpenOffCanvas} />
        </>
    );
};

export default ServicesHeader;

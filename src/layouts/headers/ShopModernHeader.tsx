import logoWhite from '../../../public/assets/img/logo/logo-white.png';
import logoShop from '../../../public/assets/img/logo/logo-shop.png';
import OffCanvasPanel from '@/components/offcanvas/OffCanvasPanel';
import useStickyHeader from '@/hooks/useStickyHeader';
import useGlobalContext from '@/hooks/useContext';
import NavMenus from '../subComponents/NavMenus';
import { SearchIcon } from '@/svg';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ShopModernHeaderProps {
    variantClass?: string;
    useWhiteLogo?: boolean;
}

const ShopModernHeader: React.FC<ShopModernHeaderProps> = ({ variantClass = "", useWhiteLogo = false }) => {
    const { toggleSearch, toggleCartOffcanvas } = useGlobalContext();
    const [openOffCanvas, setOpenOffCanvas] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const isSticky = useStickyHeader(20);

    // Handlers
    const toggleLangMenu = () => setIsLangMenuOpen(prev => !prev);

    return (
        <>
            <header className="tp-header-shop-area header-transparent pt-10">
                <div className="container-fluid">
                    <div id="header-sticky" className={`tp-header-shop-wrap ${variantClass} tp-header-blur sticky-white-bg ${isSticky ? 'header-sticky' : ''}`}
                    >
                        <div className="row align-items-center">
                            {/* Navigation Menu */}
                            <div className="col-xxl-6 col-xl-7 d-none d-xl-block">
                                <div className="tp-header-shop-menu tp-header-dropdown dropdown-white-bg">
                                    <nav className="tp-mobile-menu-active">
                                        <NavMenus />
                                    </nav>
                                </div>
                            </div>

                            {/* Logo */}
                            <div className="col-xxl-2 col-xl-2 col-lg-6 col-md-6 col-6">
                                <div className="tp-header-shop-logo text-xl-center">
                                    <Link href="/">
                                        {useWhiteLogo ? (
                                            <>
                                                <Image className="logo-1" width={120} src={logoWhite} alt="logo" />
                                                <Image className="logo-2" width={120} src={logoShop} alt="logo" />
                                            </>
                                        ) : (
                                            <Image width={120} src={logoShop} alt="logo" />
                                        )}
                                    </Link>
                                </div>
                            </div>

                            {/* Header Actions */}
                            <div className="col-xxl-4 col-xl-3 col-lg-6 col-md-6 col-6">
                                <div className="tp-header-shop-right d-flex align-items-center justify-content-end">
                                    <div className="tp-header-shop-action">
                                        <ul>
                                            {/* Search Button */}
                                            <li className="d-none d-md-block">
                                                <div className="tp-header-shop-search">
                                                    <button onClick={toggleSearch} className="tp-search-open-btn">
                                                        <SearchIcon width='16' height='16' strokeColor="currentColor" />
                                                    </button>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="tp-header-shop-cart">
                                                    <button onClick={toggleCartOffcanvas} className="cartmini-open-btn">
                                                        Cart
                                                        <span>3</span>
                                                    </button>
                                                </div>
                                            </li>

                                            {/* Language Selector */}
                                            <li>
                                                <div className="tp-header-shop-lang d-none d-xl-block">
                                                    <button
                                                        id="header-lang-toggle"
                                                        onClick={toggleLangMenu}
                                                        aria-expanded={isLangMenuOpen}
                                                        aria-label="Language selector"
                                                    >
                                                        <span>En</span>{" "}
                                                        <span className={`lang-toggle-icon ${isLangMenuOpen ? 'open' : ''}`}>
                                                            <svg
                                                                width="10"
                                                                height="6"
                                                                viewBox="0 0 10 6"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M1 1L5 5L9 1"
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                        </span>
                                                    </button>

                                                    {/* Language Dropdown */}

                                                    <ul className={`header-lang-submenu ${isLangMenuOpen ? 'open' : ''}`}>
                                                        <li>
                                                            <Link className="tp-line-white" href="#" onClick={() => setIsLangMenuOpen(false)}>Arabic</Link>{" "}
                                                            <Link className="tp-line-white" href="#" onClick={() => setIsLangMenuOpen(false)}>Spanish</Link>{" "}
                                                            <Link className="tp-line-white" href="#" onClick={() => setIsLangMenuOpen(false)}>Mandarin</Link>
                                                        </li>
                                                    </ul>
                                                </div>

                                                {/* Mobile Menu Toggle */}
                                                <div className="tp-header-10-offcanvas d-xl-none">
                                                    <div className="tp-header-bar">
                                                        <button onClick={() => setOpenOffCanvas(true)} className="tp-offcanvas-open-btn">
                                                            <i></i>
                                                            <i></i>
                                                            <i></i>
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
            {/* off canvas */}
        </>
    );
};

export default ShopModernHeader;
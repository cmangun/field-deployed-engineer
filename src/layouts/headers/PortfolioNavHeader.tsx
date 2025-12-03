"use client"
import { useState } from 'react';
import PortfolioNavMenus from '../subComponents/PortfolioNavMenus';
import PortfolioOffCanvas from '@/components/offcanvas/PortfolioOffCanvas';
import { CaseStudyData } from '@/types/caseStudy';

interface PortfolioNavHeaderProps {
    variantClass?: string;
    navVariant?: 'light' | 'dark';
    caseStudyData?: CaseStudyData;
}

const PortfolioNavHeader: React.FC<PortfolioNavHeaderProps> = ({ 
    variantClass = "",
    navVariant = "dark",
    caseStudyData
}) => {
    const [openOffCanvas, setOpenOffCanvas] = useState(false);
    const [megaMenuOpen, setMegaMenuOpen] = useState(false);

    return (
        <>
            {/* Background blur overlay when mega menu is open */}
            <div 
                style={{
                    position: 'fixed',
                    top: '80px',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    zIndex: 997,
                    opacity: megaMenuOpen ? 1 : 0,
                    pointerEvents: megaMenuOpen ? 'auto' : 'none',
                    transition: 'opacity 0.3s ease',
                }}
            />

            {/* Desktop Nav */}
            <div className="d-none d-xl-block">
                <PortfolioNavMenus 
                    variant={navVariant} 
                    onMegaMenuToggle={setMegaMenuOpen}
                    caseStudyData={caseStudyData}
                />
            </div>

            {/* Mobile Menu Toggle */}
            <div 
                className="d-xl-none"
                style={{
                    position: 'fixed',
                    top: '15px',
                    right: '15px',
                    zIndex: 1000,
                }}
            >
                <button 
                    onClick={() => setOpenOffCanvas(true)} 
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        padding: '16px 20px',
                        background: '#0d9488',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                    }}
                >
                    <span style={{ width: '24px', height: '2px', background: '#fff' }} />
                    <span style={{ width: '24px', height: '2px', background: '#fff' }} />
                    <span style={{ width: '16px', height: '2px', background: '#fff' }} />
                </button>
            </div>

            {/* Mobile off canvas */}
            <PortfolioOffCanvas openOffcanvas={openOffCanvas} setOpenOffcanvas={setOpenOffCanvas} />
        </>
    );
};

export default PortfolioNavHeader;

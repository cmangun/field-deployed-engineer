"use client";
import portfolioMenuData from "@/data/header-menu/portfolioMenuData";
import { MenuItem } from "@/types/menu-d-t";
import { CaseStudyData } from "@/types/caseStudy";
import { useState, useEffect } from "react";
import Link from "next/link";

// Healthcare/Regulated Color Palette
const CHARCOAL = '#1f2937';
const CHARCOAL_LIGHT = '#4b5563';
const TEAL = '#0d9488';

// Phase labels and anchors (without Product - it's now a separate column)
const PHASE_LABELS = ['Diagnose', 'Architect', 'Engineer', 'Enable', 'Impact'];
const PHASE_ANCHORS = ['diagnose', 'architect', 'engineer', 'enable', 'impact'];

// Column widths
const LOGO_WIDTH = '170px';
const PHASE_WIDTH = '120px';
const PRODUCT_WIDTH = '190px';
const ROW_HEIGHT = '80px';

interface PortfolioNavMenusProps {
  variant?: 'light' | 'dark';
  onMegaMenuToggle?: (isOpen: boolean) => void;
  caseStudyData?: CaseStudyData;
}

export default function PortfolioNavMenus({ variant = 'dark', onMegaMenuToggle, caseStudyData }: PortfolioNavMenusProps) {
  const [hoveredNavItem, setHoveredNavItem] = useState<number | null>(null);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<number>(0);
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Check if we're in case study mode
  const isCaseStudyMode = !!caseStudyData;

  // Track scroll progress
  useEffect(() => {
    if (!isCaseStudyMode) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isCaseStudyMode]);

  const brandRows = [
    { brand: 'Pfizer', slug: 'pfizer', logo: '/assets/logo/pfizer.png', phases: ['CEO Strike Force Discovery', 'AI Content Pipeline Design', 'RAG + SharePoint Build', 'Team Playbooks & Training', '200+ Users Enabled'], product: 'Enterprise AI Search Assistant', link: '/case-study/pfizer', image: '/assets/img/home-06/project/Embedded.jpg' },
    { brand: 'Colab', slug: 'colab', logo: '/assets/logo/cocologo.png', phases: ['Knowledge Landscape Discovery', 'RAG Knowledge Engine Design', 'Hybrid Search Pipeline', 'Champion Network & Adoption', '97% Search Time Reduction'], product: 'AI Knowledge Companion (CoCo)', link: '/case-study/colab', image: '/assets/img/home-06/project/colab.jpg' },
    { brand: 'Abbott', slug: 'abbott', logo: '/assets/logo/abbott-logo.png', phases: ['Diagnostic Workflow Mapping', '30K Device Architecture', 'BinaxNOW NLP Pipeline', 'HIPAA-Compliant Handoff', 'Global Diagnostics Scale'], product: 'ML-Ready Data Platform', link: '/case-study/abbott', image: '/assets/img/home-06/project/abbott.jpg' },
    { brand: 'Publicis', slug: 'publicis', logo: '/assets/img/cmlogo.png', phases: ['Enterprise Systems Audit', 'Unified Content Supply Chain', 'Identity & Workflow Platform', 'Agency Team Training', '14 Agencies Unified'], product: 'Enterprise Content Platform', link: '/case-study/publicis', image: '/assets/img/home-06/project/publicishealth.jpg' },
    { brand: 'Naked Heart', slug: 'nakedheart', logo: '/assets/logo/NakedHeart-color.jpg', phases: ['Foundation Needs Assessment', 'Donation Platform Design', 'Multi-Currency Build', 'Local Team Training', 'Global Fundraising Enabled'], product: 'Global Donation Platform', link: '/case-study/nakedheart', image: '/assets/img/home-06/project/nakedheart.jpg' },
  ];

  const isCaseStudyMenu = (menu: MenuItem) => menu.megaMenu && menu.submenus;

  const currentImage = brandRows[hoveredRow]?.image || brandRows[0].image;
  const currentLink = brandRows[hoveredRow]?.link || brandRows[0].link;
  const currentTitle = brandRows[hoveredRow]?.brand || brandRows[0].brand;

  const tableWidth = `calc(${LOGO_WIDTH} + ${PRODUCT_WIDTH} + (${PHASE_WIDTH} * 5))`;
  const menuHeight = `calc(${ROW_HEIGHT} * ${brandRows.length})`;

  // Find the current case study row data
  const currentCaseStudyRow = isCaseStudyMode 
    ? brandRows.find(row => row.slug === caseStudyData?.slug) || brandRows[0]
    : null;

  return (
    <>
      {/* Fixed Teal Header Bar - Row 1 */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        backgroundColor: TEAL,
        height: '80px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}>
          {/* CM Logo */}
          <Link 
            href="/career-details-light" 
            style={{ 
              width: LOGO_WIDTH,
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              borderRight: '1px solid rgba(255,255,255,0.2)',
              backgroundColor: CHARCOAL,
            }}
          >
            <img 
              src="/assets/img/cmlogo_ko.png" 
              alt="Christopher Mangun" 
              style={{ height: '50px', width: 'auto' }} 
            />
          </Link>

          {/* Product Header Column - Now second column */}
          <div
            onMouseEnter={() => {
              if (!isCaseStudyMode) {
                setShowMegaMenu(true);
                if (onMegaMenuToggle) onMegaMenuToggle(true);
              }
            }}
            style={{
              width: PRODUCT_WIDTH,
              color: '#fff',
              fontSize: '18px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              borderRight: '1px solid rgba(255,255,255,0.2)',
              cursor: isCaseStudyMode ? 'default' : 'pointer',
              backgroundColor: CHARCOAL_LIGHT,
            }}
          >
            Product <img src="/assets/img/product.png" alt="product" style={{ width: '40px', height: '40px', marginLeft: '6px', verticalAlign: 'middle', filter: 'brightness(0) invert(1)' }} />
          </div>

          {/* Phase Header Columns */}
          {PHASE_LABELS.map((label, idx) => (
            <div
              key={label}
              onMouseEnter={() => {
                if (!isCaseStudyMode) {
                  setShowMegaMenu(true);
                  if (onMegaMenuToggle) onMegaMenuToggle(true);
                }
              }}
              style={{
                width: PHASE_WIDTH,
                color: '#fff',
                fontSize: '18px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                borderRight: '1px solid rgba(255,255,255,0.2)',
                cursor: isCaseStudyMode ? 'default' : 'pointer',
              }}
            >
              {label} »
            </div>
          ))}

          {/* Spacer */}
          <div style={{ flex: 1 }}></div>

          {/* Nav Buttons */}
          <ul style={{ 
            display: 'flex',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            paddingRight: '20px',
          }}>
            {portfolioMenuData.map((menu: MenuItem, index: number) => {
              const isFirst = index === 0;
              const isLast = index === portfolioMenuData.length - 1;
              const hasMegaMenu = isCaseStudyMenu(menu);
              
              return (
                <li
                  key={menu.id}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => { 
                    if (hasMegaMenu && !isCaseStudyMode) {
                      setShowMegaMenu(true);
                      if (onMegaMenuToggle) onMegaMenuToggle(true);
                    }
                    setHoveredNavItem(menu.id);
                  }}
                  onMouseLeave={() => setHoveredNavItem(null)}
                >
                  {hasMegaMenu ? (
                    <button
                      onClick={() => {
                        if (!isCaseStudyMode) {
                          setShowMegaMenu(!showMegaMenu);
                          if (onMegaMenuToggle) onMegaMenuToggle(!showMegaMenu);
                        }
                      }}
                      style={{
                        color: hoveredNavItem === menu.id ? TEAL : '#fff',
                        backgroundColor: hoveredNavItem === menu.id ? '#fff' : 'transparent',
                        padding: '12px 24px',
                        display: 'block',
                        fontWeight: 600,
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        borderRadius: isFirst ? '8px 0 0 8px' : isLast ? '0 8px 8px 0' : '0',
                        borderLeft: !isFirst ? '1px solid rgba(255,255,255,0.2)' : 'none',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      }}
                    >
                      {menu.title}
                    </button>
                  ) : (
                    <Link 
                      href={menu.link}
                      style={{
                        color: hoveredNavItem === menu.id ? TEAL : '#fff',
                        backgroundColor: hoveredNavItem === menu.id ? '#fff' : 'transparent',
                        padding: '12px 24px',
                        display: 'block',
                        fontWeight: 600,
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        borderRadius: isFirst ? '8px 0 0 8px' : isLast ? '0 8px 8px 0' : '0',
                        borderLeft: !isFirst ? '1px solid rgba(255,255,255,0.2)' : 'none',
                      }}
                    >
                      {menu.title}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Case Study Mode - Single Row Below Header */}
      {isCaseStudyMode && currentCaseStudyRow && (
        <>
          {/* Case Study Row - Directly below main nav */}
          <div 
            style={{
              position: 'fixed',
              top: '80px',
              left: 0,
              right: 0,
              zIndex: 998,
              backgroundColor: '#fff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              height: ROW_HEIGHT,
            }}
          >

          {/* Progress Bar - Overlay on case study row, starting at Diagnose */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: `calc(${LOGO_WIDTH} + ${PRODUCT_WIDTH})`,
              right: 0,
              height: '10px',
              backgroundColor: 'rgba(0,0,0,0.1)',
              zIndex: 10,
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${scrollProgress}%`,
                backgroundColor: CHARCOAL,
                transition: 'width 0.1s ease-out',
              }}
            />
          </div>
          <div style={{ 
            display: 'flex',
            alignItems: 'stretch',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
          }}>
            {/* Brand Logo Cell */}
            <div
              style={{
                width: LOGO_WIDTH,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: CHARCOAL,
              }}
            >
              <img 
                src={currentCaseStudyRow.logo} 
                alt={currentCaseStudyRow.brand}
                style={{
                  maxWidth: '90px',
                  maxHeight: '32px',
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)',
                }}
              />
            </div>

            {/* Product Cell - Now right after Brand Logo */}
            <div
              style={{
                width: PRODUCT_WIDTH,
                padding: '12px 12px',
                fontSize: '14px',
                fontWeight: 700,
                color: '#fff',
                backgroundColor: CHARCOAL_LIGHT,
                borderLeft: '1px solid rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                textAlign: 'left',
                lineHeight: 1.3,
              }}
            >
              {currentCaseStudyRow.product}
            </div>

            {/* Phase Cells - Clickable to scroll to sections */}
            {currentCaseStudyRow.phases.map((phase, phaseIndex) => {
              const anchorLink = `#${PHASE_ANCHORS[phaseIndex]}`;
              const isHovered = hoveredCell === `cs-${phaseIndex}`;
              
              return (
                <a
                  key={phaseIndex}
                  href={anchorLink}
                  onMouseEnter={() => setHoveredCell(`cs-${phaseIndex}`)}
                  onMouseLeave={() => setHoveredCell(null)}
                  style={{
                    width: PHASE_WIDTH,
                    padding: '12px 8px',
                    fontSize: '11px',
                    color: isHovered ? '#fff' : CHARCOAL,
                    fontWeight: 600,
                    backgroundColor: isHovered ? CHARCOAL : 'transparent',
                    borderLeft: '1px solid rgba(0,0,0,0.08)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    lineHeight: 1.3,
                    transition: 'all 0.2s ease',
                  }}
                >
                  {phase}
                </a>
              );
            })}

            {/* KPI Stats in remaining space - animated with scroll */}
            <div style={{ 
              flex: 1, 
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '32px',
              height: '100%',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px', fontWeight: 700, color: TEAL }}>${Math.round((scrollProgress / 100) * 2)}M+</span>
                <span style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Saved</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px', fontWeight: 700, color: TEAL }}>{Math.round((scrollProgress / 100) * 90)}</span>
                <span style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Days</span>
              </div>
            </div>
          </div>
        </div>
        </>
      )}

      {/* Mega Menu Dropdown - Only in normal mode */}
      {!isCaseStudyMode && showMegaMenu && (
        <div 
          style={{
            position: 'fixed',
            top: '80px',
            left: 0,
            right: 0,
            zIndex: 998,
            backgroundColor: '#fff',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            display: 'flex',
            height: menuHeight,
          }}
          onMouseLeave={() => {
            setShowMegaMenu(false);
            setHoveredRow(0);
            setHoveredCell(null);
            if (onMegaMenuToggle) onMegaMenuToggle(false);
          }}
        >
          {/* Left: Data Table */}
          <div style={{ 
            width: tableWidth,
            borderRight: '1px solid rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {brandRows.map((row, rowIndex) => {
              const isRowHovered = hoveredRow === rowIndex;
              const isLastRow = rowIndex === brandRows.length - 1;
              
              return (
                <div
                  key={row.brand}
                  onMouseEnter={() => setHoveredRow(rowIndex)}
                  style={{ 
                    display: 'flex',
                    alignItems: 'stretch',
                    flex: 1,
                    backgroundColor: isRowHovered ? 'rgba(0, 0, 0, 0.10)' : 'transparent',
                    borderBottom: !isLastRow ? '1px solid rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                  }}
                >
                  {/* Brand Logo Cell */}
                  <Link
                    href={row.link}
                    onMouseEnter={() => setHoveredCell(`${rowIndex}-logo`)}
                    onMouseLeave={() => setHoveredCell(null)}
                    style={{
                      width: LOGO_WIDTH,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: hoveredCell === `${rowIndex}-logo` ? TEAL : CHARCOAL,
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      transform: hoveredCell === `${rowIndex}-logo` ? 'scale(1.15)' : 'scale(1)',
                      boxShadow: hoveredCell === `${rowIndex}-logo` ? '0 8px 24px rgba(31, 41, 55, 0.4)' : 'none',
                      zIndex: hoveredCell === `${rowIndex}-logo` ? 20 : 1,
                      position: 'relative',
                      borderRadius: hoveredCell === `${rowIndex}-logo` ? '8px' : '0',
                    }}
                  >
                    <img 
                      src={row.logo} 
                      alt={row.brand}
                      style={{
                        maxWidth: '90px',
                        maxHeight: '32px',
                        objectFit: 'contain',
                        filter: 'brightness(0) invert(1)',
                      }}
                    />
                  </Link>

                  {/* Product Cell - Now second column */}
                  <Link
                    href={`${row.link}#product`}
                    onMouseEnter={() => setHoveredCell(`${rowIndex}-product`)}
                    onMouseLeave={() => setHoveredCell(null)}
                    style={{
                      width: PRODUCT_WIDTH,
                      padding: '12px 12px',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#fff',
                      backgroundColor: hoveredCell === `${rowIndex}-product` ? CHARCOAL : CHARCOAL_LIGHT,
                      borderLeft: '1px solid rgba(0,0,0,0.08)',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      textAlign: 'left',
                      lineHeight: 1.3,
                      transition: 'all 0.2s ease',
                      transform: hoveredCell === `${rowIndex}-product` ? 'scale(1.15)' : 'scale(1)',
                      boxShadow: hoveredCell === `${rowIndex}-product` ? '0 8px 24px rgba(31, 41, 55, 0.4)' : 'none',
                      borderRadius: hoveredCell === `${rowIndex}-product` ? '8px' : '0',
                      zIndex: hoveredCell === `${rowIndex}-product` ? 20 : 1,
                      position: 'relative',
                    }}
                  >
                    {row.product}
                  </Link>

                  {/* Phase Cells */}
                  {row.phases.map((phase, phaseIndex) => {
                    const cellKey = `${rowIndex}-${phaseIndex}`;
                    const isCellHovered = hoveredCell === cellKey;
                    const anchorLink = `${row.link}#${PHASE_ANCHORS[phaseIndex]}`;
                    
                    return (
                      <Link
                        key={phaseIndex}
                        href={anchorLink}
                        onMouseEnter={() => setHoveredCell(cellKey)}
                        onMouseLeave={() => setHoveredCell(null)}
                        style={{
                          width: PHASE_WIDTH,
                          padding: '12px 8px',
                          fontSize: '11px',
                          color: isCellHovered ? '#fff' : (isRowHovered ? CHARCOAL : CHARCOAL),
                          fontWeight: isRowHovered ? 600 : 400,
                          backgroundColor: isCellHovered ? CHARCOAL : 'transparent',
                          borderLeft: '1px solid rgba(0,0,0,0.08)',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          lineHeight: 1.3,
                          transition: 'all 0.2s ease',
                          transform: isCellHovered ? 'scale(1.15)' : 'scale(1)',
                          boxShadow: isCellHovered ? '0 8px 24px rgba(31, 41, 55, 0.4)' : 'none',
                          borderRadius: isCellHovered ? '8px' : '0',
                          zIndex: isCellHovered ? 20 : 1,
                          position: 'relative',
                        }}
                      >
                        {phase}
                      </Link>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Right: Preview Card - Tier 3 (Image → Headline → Descriptor) */}
          <div style={{ 
            width: '320px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#fff',
            borderLeft: '1px solid rgba(0,0,0,0.08)',
          }}>
            {/* Image at top */}
            <Link 
              href={currentLink} 
              style={{ 
                display: 'block', 
                width: '100%',
                height: '200px',
                overflow: 'hidden',
              }}
            >
              <img 
                src={currentImage} 
                alt={currentTitle}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  transition: 'all 0.3s ease',
                }}
              />
            </Link>
            
            {/* Headline */}
            <div style={{
              padding: '20px 24px 12px',
            }}>
              <Link 
                href={currentLink}
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: CHARCOAL,
                  textDecoration: 'none',
                  lineHeight: 1.2,
                  display: 'block',
                }}
              >
                {currentTitle}
              </Link>
            </div>
            
            {/* Descriptor */}
            <div style={{
              padding: '0 24px 20px',
              flex: 1,
            }}>
              <p style={{
                fontSize: '14px',
                fontWeight: 400,
                color: CHARCOAL_LIGHT,
                lineHeight: 1.5,
                margin: 0,
              }}>
                {brandRows[hoveredRow]?.product || brandRows[0].product}
              </p>
              <Link 
                href={currentLink}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  marginTop: '16px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: TEAL,
                  textDecoration: 'none',
                }}
              >
                View Case Study →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

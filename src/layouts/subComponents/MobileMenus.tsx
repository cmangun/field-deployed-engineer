import menuItemsTwo from '@/data/header-menu/menuItemTwo';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Logo mapping - white logos for dark menu
const logoMap: Record<string, string> = {
  'pfizer': '/assets/img/logo/Pfizer-white.png',
  'colab': '/assets/img/logo/Pfizer-white.png', // Pfizer RAG work
  'syneos health': '/assets/img/logo/Amgen-white.png', // Repatha program
  'publicis health': '/assets/img/logo/logo-white.png',
  'medtronic': '/assets/img/logo/logo-white.png',
  'abbott': '/assets/img/logo/logo-white.png',
  'amgen': '/assets/img/logo/Amgen-white.png',
  'sanofi': '/assets/img/logo/Logo_Sanofi_white.png',
  'alinity': '/assets/img/logo/alinity-m-logo-white.png',
  'binaxnow': '/assets/img/logo/Binax.png',
  'ipg / area 23': '/assets/img/logo/IPG-white.png',
  'naked heart foundation': '/assets/img/logo/NHF.png',
};

const LogoPlaceholder = ({ brand }: { brand: string }) => {
  const initial = brand.charAt(0).toUpperCase();
  return (
    <div style={{
      width: '80px',
      height: '80px',
      borderRadius: '12px',
      backgroundColor: 'rgba(255,255,255,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '28px',
      fontWeight: 600,
      color: '#666',
    }}>
      {initial}
    </div>
  );
};

const CompanyLogo = ({ brand }: { brand: string }) => {
  const [hasError, setHasError] = useState(false);
  const logoPath = logoMap[brand.toLowerCase()];
  
  if (!logoPath || hasError) {
    return <LogoPlaceholder brand={brand} />;
  }
  
  return (
    <div style={{
      width: '80px',
      height: '80px',
      position: 'relative',
      borderRadius: '12px',
      overflow: 'hidden',
      backgroundColor: 'rgba(255,255,255,0.05)',
    }}>
      <Image
        src={logoPath}
        alt={brand}
        fill
        style={{ objectFit: 'contain', padding: '8px' }}
        onError={() => setHasError(true)}
      />
    </div>
  );
};

const MobileMenus = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [resumeHovered, setResumeHovered] = useState(false);
  const [showcaseHovered, setShowcaseHovered] = useState(false);
  const [homeHovered, setHomeHovered] = useState(false);

  return (
    <div style={{
      backgroundColor: '#000',
      minHeight: '100vh',
      width: '100%',
      padding: '100px 40px 50px 40px',
    }}>
      {/* Home Link */}
      <Link 
        href="/career-details-light"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '8px 0',
          textDecoration: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
        onMouseEnter={() => setHomeHovered(true)}
        onMouseLeave={() => setHomeHovered(false)}
      >
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '12px',
          backgroundColor: homeHovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color 0.2s ease',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={homeHovered ? '#fff' : 'rgba(255,255,255,0.6)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s ease' }}>
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
        <span style={{
          fontSize: '17px',
          fontWeight: 400,
          color: homeHovered ? '#fff' : 'rgba(255,255,255,0.6)',
          transition: 'color 0.2s ease',
        }}>
          Home
        </span>
      </Link>

      {/* Case Studies Link */}
      <Link 
        href="/portfolio-horizontal-showcase-light"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '8px 0',
          textDecoration: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
        onMouseEnter={() => setShowcaseHovered(true)}
        onMouseLeave={() => setShowcaseHovered(false)}
      >
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '12px',
          backgroundColor: showcaseHovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color 0.2s ease',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={showcaseHovered ? '#fff' : 'rgba(255,255,255,0.6)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s ease' }}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
          </svg>
        </div>
        <span style={{
          fontSize: '17px',
          fontWeight: 400,
          color: showcaseHovered ? '#fff' : 'rgba(255,255,255,0.6)',
          transition: 'color 0.2s ease',
        }}>
          Case Studies
        </span>
      </Link>

      {/* Case Studies List */}
      <nav>
        {menuItemsTwo.map((item) => (
          item.caseStudies && (
            <div key="case-studies">
              {item.caseStudies.map((caseStudy, csIndex) => (
                <Link 
                  key={`case-study-${csIndex}`} 
                  href={caseStudy.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '8px 0',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onMouseEnter={() => setHoveredItem(csIndex)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <CompanyLogo brand={caseStudy.brand} />
                  <span style={{
                    fontSize: '17px',
                    fontWeight: 400,
                    color: hoveredItem === csIndex ? '#fff' : 'rgba(255,255,255,0.6)',
                    transition: 'color 0.2s ease',
                  }}>
                    {caseStudy.role}
                  </span>
                </Link>
              ))}
            </div>
          )
        ))}
      </nav>

      {/* Resume Link */}
      <Link 
        href="/career-details-light"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '8px 0',
          textDecoration: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
        onMouseEnter={() => setResumeHovered(true)}
        onMouseLeave={() => setResumeHovered(false)}
      >
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '12px',
          backgroundColor: resumeHovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color 0.2s ease',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={resumeHovered ? '#fff' : 'rgba(255,255,255,0.6)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s ease' }}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
        </div>
        <span style={{
          fontSize: '17px',
          fontWeight: 400,
          color: resumeHovered ? '#fff' : 'rgba(255,255,255,0.6)',
          transition: 'color 0.2s ease',
        }}>
          Resume
        </span>
      </Link>
    </div>
  );
};

export default MobileMenus;

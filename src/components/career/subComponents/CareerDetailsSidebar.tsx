import React from 'react';

// Responsive typography styles (matching CaseStudyTemplate)
const responsiveStyles = `
    .cs-section-title-no-margin { font-size: clamp(36px, 6vw, 72px); font-weight: 700; font-style: normal; }
`;

const CareerDetailsSidebar = () => {
    return (
        <>
            <style>{responsiveStyles}</style>
            <div className="cta-footer-grain" style={{ backgroundColor: '#0d9488', color: '#fff', borderRadius: '24px', position: 'relative', overflow: 'hidden', padding: '60px 0' }}>
                {/* Grain overlay */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: '24px',
                    zIndex: 1,
                    pointerEvents: 'none',
                    opacity: 0.4,
                    mixBlendMode: 'overlay' as const,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    filter: 'contrast(200%) brightness(150%)',
                }} />
                <div className="container container-1230" style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h4 className="cs-section-title-no-margin" style={{ color: '#fff', margin: 0 }}>Connect</h4>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            {/* Phone */}
                            <a href="tel:+19177171894" className="cta-icon-btn" style={{ 
                                width: '60px', 
                                height: '60px', 
                                border: '2px solid #fff', 
                                borderRadius: '24px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                color: '#fff',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                backgroundColor: 'transparent'
                            }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 16.92V19.92C22 20.48 21.56 20.93 21 20.99C20.44 21.05 19.87 21.08 19.29 21.08C10.23 21.08 2.92 13.77 2.92 4.71C2.92 4.13 2.95 3.56 3.01 3C3.07 2.44 3.52 2 4.08 2H7.08C7.56 2 7.97 2.34 8.06 2.81C8.24 3.76 8.53 4.68 8.92 5.55C9.09 5.93 9 6.38 8.68 6.67L7.01 8.34C8.39 11.02 10.98 13.61 13.66 14.99L15.33 13.32C15.62 13 16.07 12.91 16.45 13.08C17.32 13.47 18.24 13.76 19.19 13.94C19.66 14.03 20 14.44 20 14.92V16.92H22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </a>
                            {/* Email */}
                            <a href="mailto:cmangun@gmail.com" className="cta-icon-btn" style={{ 
                                width: '60px', 
                                height: '60px', 
                                border: '2px solid #fff', 
                                borderRadius: '24px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                color: '#fff',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                backgroundColor: 'transparent'
                            }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </a>
                            {/* LinkedIn */}
                            <a href="https://www.linkedin.com/in/christopher-mangun-5257265/" target="_blank" rel="noopener noreferrer" className="cta-icon-btn" style={{ 
                                width: '60px', 
                                height: '60px', 
                                border: '2px solid #fff', 
                                borderRadius: '24px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                color: '#fff',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                backgroundColor: 'transparent'
                            }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </a>
                            {/* GitHub */}
                            <a href="https://github.com/cmangun" target="_blank" rel="noopener noreferrer" className="cta-icon-btn" style={{ 
                                width: '60px', 
                                height: '60px', 
                                border: '2px solid #fff', 
                                borderRadius: '24px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                color: '#fff',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                backgroundColor: 'transparent'
                            }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 19C4 20.5 4 16.5 2 16M16 22V18.13C16.0375 17.6532 15.9731 17.1738 15.811 16.7238C15.6489 16.2738 15.3929 15.8634 15.06 15.52C18.2 15.17 21.5 13.98 21.5 8.52C21.4997 7.12383 20.9627 5.7812 20 4.77C20.4559 3.54851 20.4236 2.19835 19.91 1C19.91 1 18.73 0.650001 16 2.48C13.708 1.85882 11.292 1.85882 9 2.48C6.27 0.650001 5.09 1 5.09 1C4.57638 2.19835 4.54414 3.54851 5 4.77C4.03013 5.7887 3.49252 7.14346 3.5 8.55C3.5 13.97 6.8 15.16 9.94 15.55C9.611 15.89 9.35726 16.2954 9.19531 16.7399C9.03335 17.1844 8.96681 17.6581 9 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CareerDetailsSidebar;

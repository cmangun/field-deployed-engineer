"use client";
import { CrossIconTwo } from '@/svg';
import PortfolioMobileMenu from '../../layouts/subComponents/PortfolioMobileMenu';
import React from 'react';

type IProps = {
    openOffcanvas: boolean;
    setOpenOffcanvas: React.Dispatch<React.SetStateAction<boolean>>;
};

const PortfolioOffCanvas: React.FC<IProps> = ({ openOffcanvas, setOpenOffcanvas }) => {
    return (
        <>
            <div 
                style={{
                    position: 'fixed',
                    top: 0,
                    right: openOffcanvas ? 0 : '-100%',
                    width: '100%',
                    maxWidth: '400px',
                    height: '100vh',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(30px)',
                    WebkitBackdropFilter: 'blur(30px)',
                    zIndex: 9999,
                    transition: 'right 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    overflowY: 'auto',
                    boxShadow: openOffcanvas ? '-10px 0 40px rgba(0,0,0,0.1)' : 'none',
                }}
            >
                <div style={{ padding: '24px' }}>
                    {/* Header */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '40px',
                        paddingBottom: '20px',
                        borderBottom: '1px solid rgba(0,0,0,0.08)',
                    }}>
                        <span style={{
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#000',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                        }}>
                            Menu
                        </span>
                        <button 
                            onClick={() => setOpenOffcanvas(false)}
                            style={{
                                width: '44px',
                                height: '44px',
                                border: '1px solid rgba(0,0,0,0.1)',
                                borderRadius: '50%',
                                background: 'transparent',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <CrossIconTwo />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav>
                        <PortfolioMobileMenu />
                    </nav>

                    {/* Contact Info */}
                    <div style={{
                        marginTop: '40px',
                        paddingTop: '24px',
                        borderTop: '1px solid rgba(0,0,0,0.08)',
                    }}>
                        <h4 style={{
                            fontSize: '12px',
                            fontWeight: 700,
                            color: '#000',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            marginBottom: '16px',
                        }}>
                            Contact
                        </h4>
                        <p style={{
                            fontSize: '14px',
                            color: 'rgba(0,0,0,0.6)',
                            lineHeight: 1.6,
                            margin: 0,
                        }}>
                            Christopher Mangun<br />
                            Forward Deployed Engineer AI/ML<br />
                            <a 
                                href="mailto:cmangun@gmail.com" 
                                style={{ color: '#0d9488', textDecoration: 'none' }}
                            >
                                cmangun@gmail.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            <div 
                onClick={() => setOpenOffcanvas(false)}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    zIndex: 9998,
                    opacity: openOffcanvas ? 1 : 0,
                    visibility: openOffcanvas ? 'visible' : 'hidden',
                    transition: 'all 0.3s ease',
                }}
            />
        </>
    );
};

export default PortfolioOffCanvas;

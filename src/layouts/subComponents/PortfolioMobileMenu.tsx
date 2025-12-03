"use client";
import portfolioMenuData from '@/data/header-menu/portfolioMenuData';
import React, { useState } from 'react';
import Link from 'next/link';

// Global color constants
const TEAL = '#0d9488';      // Pantone Coral Rose 16-1349 TPG
const CHARCOAL = '#1f2937';    // Pantone Gray Flannel 17-4016 TPG

const PortfolioMobileMenu = () => {
    const [activeMenu, setActiveMenu] = useState<number | null>(null);
    const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);

    const toggleMenu = (id: number) => {
        if (activeMenu === id) {
            setActiveMenu(null);
        } else {
            setActiveMenu(id);
            setActiveSubmenu(null);
        }
    };

    const toggleSubmenu = (index: number) => {
        if (activeSubmenu === index) {
            setActiveSubmenu(null);
        } else {
            setActiveSubmenu(index);
        }
    };

    return (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {portfolioMenuData.map((menuItem) => (
                <li key={menuItem.id} style={{ borderBottom: `1px solid rgba(99, 102, 106, 0.08)` }}>
                    {menuItem.megaMenu && menuItem.submenus ? (
                        <>
                            <div 
                                onClick={() => toggleMenu(menuItem.id)}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '18px 0',
                                    cursor: 'pointer',
                                }}
                            >
                                <span style={{
                                    fontSize: '24px',
                                    fontWeight: 600,
                                    color: CHARCOAL,
                                    textTransform: 'uppercase',
                                }}>
                                    {menuItem.title}
                                </span>
                                <span style={{
                                    fontSize: '20px',
                                    color: TEAL,
                                    transform: activeMenu === menuItem.id ? 'rotate(45deg)' : 'rotate(0)',
                                    transition: 'transform 0.3s ease',
                                }}>
                                    +
                                </span>
                            </div>

                            {/* Submenu categories */}
                            <div style={{
                                maxHeight: activeMenu === menuItem.id ? '1000px' : '0',
                                overflow: 'hidden',
                                transition: 'max-height 0.4s ease',
                            }}>
                                {menuItem.submenus.map((submenu, subIndex) => (
                                    <div key={subIndex} style={{ marginBottom: '16px' }}>
                                        <div 
                                            onClick={() => toggleSubmenu(subIndex)}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '12px 16px',
                                                cursor: 'pointer',
                                                backgroundColor: 'rgba(99, 102, 106, 0.03)',
                                                borderRadius: '8px',
                                            }}
                                        >
                                            <span style={{
                                                fontSize: '14px',
                                                fontWeight: 700,
                                                color: CHARCOAL,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.1em',
                                            }}>
                                                {submenu.title}
                                            </span>
                                            <span style={{
                                                fontSize: '16px',
                                                color: CHARCOAL,
                                                transform: activeSubmenu === subIndex ? 'rotate(45deg)' : 'rotate(0)',
                                                transition: 'transform 0.3s ease',
                                            }}>
                                                +
                                            </span>
                                        </div>

                                        {/* Case study items */}
                                        <div style={{
                                            maxHeight: activeSubmenu === subIndex ? '500px' : '0',
                                            overflow: 'hidden',
                                            transition: 'max-height 0.3s ease',
                                        }}>
                                            <ul style={{ listStyle: 'none', padding: '8px 0 0 16px', margin: 0 }}>
                                                {submenu.megaMenu?.map((item: any, itemIndex: number) => (
                                                    <li key={itemIndex}>
                                                        <Link 
                                                            href={item.link}
                                                            style={{
                                                                display: 'block',
                                                                padding: '12px 16px',
                                                                fontSize: '16px',
                                                                color: CHARCOAL,
                                                                textDecoration: 'none',
                                                                borderRadius: '6px',
                                                                transition: 'all 0.2s ease',
                                                            }}
                                                        >
                                                            {item.title}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <Link 
                            href={menuItem.link}
                            style={{
                                display: 'block',
                                padding: '18px 0',
                                fontSize: '24px',
                                fontWeight: 600,
                                color: CHARCOAL,
                                textTransform: 'uppercase',
                                textDecoration: 'none',
                            }}
                        >
                            {menuItem.title}
                        </Link>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default PortfolioMobileMenu;

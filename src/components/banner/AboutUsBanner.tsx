import Image from 'next/image';
import React from 'react';

// Healthcare/Regulated Color Palette
const TEAL = '#0d9488';

// Consistent padding for hero section
const HERO_PADDING = '50px';

const AboutUsBanner = ({ image, spacingCls = "", maxHeight = "50vh" }) => {
    return (
        <div className={`ar-banner-area ${spacingCls}`} style={{ paddingTop: '50px' }}>
            {/* Hero Image - 50px padding on left, right, and top */}
            <div 
                className="ar-banner-wrap ar-about-us-4" 
                style={{ 
                    maxHeight: 'calc(100vh - 280px)', 
                    overflow: 'hidden', 
                    borderRadius: '24px', 
                    marginLeft: HERO_PADDING, 
                    marginRight: HERO_PADDING,
                }}
            >
                <Image 
                    style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: '24px' }} 
                    className="w-100" 
                    src={image} 
                    alt="about thumb" 
                    data-speed=".8" 
                />
            </div>

            {/* Title Section - Below hero image */}
            <div style={{ paddingLeft: HERO_PADDING, paddingTop: '24px', paddingBottom: '8px' }}>
                <h1 style={{ 
                    fontSize: '48px', 
                    fontWeight: 700, 
                    marginBottom: '0', 
                    lineHeight: 1.1,
                    color: '#1f2937',
                    textAlign: 'left',
                }}>
                    Forward Deployed Engineer AI / ML
                </h1>
            </div>

            {/* Name below title */}
            <div style={{ paddingLeft: HERO_PADDING, paddingTop: '8px', paddingBottom: '10px' }}>
                <h2 style={{ 
                    fontSize: '32px', 
                    fontWeight: 500, 
                    color: TEAL, 
                    margin: 0,
                    textAlign: 'left',
                }}>
                    Christopher Mangun
                </h2>
            </div>
        </div>
    );
};

export default AboutUsBanner;

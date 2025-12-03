
import { getCurrentYear } from '@/utils/getCurrentYear';
import Link from 'next/link';
import React from 'react';

interface FooterProps {
    bgColor?: string;
    Zindex?: string
}

const CreativeAgencyCopyright: React.FC<FooterProps> = ({ bgColor = "#1b1b1d", Zindex }) => {
    return (
        <div className={`tp-copyright-area tp-copyright-style-6 ${Zindex}`} style={{ backgroundColor: bgColor }}>
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="tp-copyright-content text-center text-md-start tp_fade_anim" data-delay=".3" data-fade-from="bottom" data-ease="bounce">
                            <h2 className="tp-copyright-big-text">
                                Agntix.studio
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="tp-copyright-bottom">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="tp-copyright-left text-center text-md-start">
                                <span>©{getCurrentYear()} Agntix Design Studio.</span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="tp-copyright-right text-center text-md-end">
                                <Link href="#">Terms and Conditions</Link>
                                <Link href="#">Privacy Policy</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreativeAgencyCopyright;
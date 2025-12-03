import { LinkedinSvg, GithubSvg } from "@/svg";
import Link from 'next/link';
import React from 'react';

interface FooterProps {
    bgColor?: string;
    className?: string;
    Zindex?:string;
}

const CreativeAgencyFooter: React.FC<FooterProps> = ({ bgColor = "#1b1b1d", className="", Zindex="" }) => {
    return (
        <div className={`tp-footer-area tp-footer-style-6 ${className} ${Zindex} pt-120 pb-80`} style={{ backgroundColor: bgColor, marginTop: '100px' }}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-xl-6 col-lg-6 col-md-12">
                        <div className="tp-footer-widget tp-footer-col-1 pb-40 tp_fade_anim" data-delay=".3">
                            <h4 className="tp-footer-widget-title">How can I help?</h4>
                            <div className="tp-footer-widget-social">
                                <Link href="https://www.linkedin.com/in/christopher-mangun-5257265/" target="_blank" rel="noopener noreferrer">
                                    <LinkedinSvg />
                                </Link>
                                <Link href="https://github.com/cmangun" target="_blank" rel="noopener noreferrer">
                                    <GithubSvg />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-12">
                        <div className="tp-footer-widget tp-footer-col-3 pb-40 mb-30 tp_fade_anim" data-delay=".5">
                            <h4 className="tp-footer-widget-title-sm pre mb-20">Contact</h4>
                            <div className="tp-footer-widget-info">
                                <Link href="mailto:cmangun@gmail.com">cmangun@gmail.com</Link>
                                <Link href="tel:9177171894">917-717-1894</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreativeAgencyFooter;
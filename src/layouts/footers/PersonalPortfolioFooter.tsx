import PortfolioCopyright from './subComponents/PortfolioCopyright';
import { ArrowFour } from '@/svg';
import Link from 'next/link';
import React from 'react';

const PersonalPortfolioFooter = ({ spacingClass = "pt-115" }) => {
    return (
        <footer>
            {/* -- footer area start -- */}
            <div className={`pp-footer-area pp-footer-ptb ${spacingClass}`}>
                <div className="container container-1750">
                    <div className="pp-footer-box">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="pp-footer-wrapper text-center">
                                    <span className="pp-footer-subtitle tp_fade_anim">Looking for a new talent</span>
                                    <h4 className="pp-footer-title tp_fade_anim not-hide-cursor" data-cursor="Send<br>Mail">
                                        <Link className="codetext cursor-hide" href="mailto:hello@gmail.com">hello@gmail.com</Link>
                                    </h4>
                                    <div className="pp-footer-btn-box d-flex justify-content-center z-index-1">
                                        <div className="tp_fade_anim" data-delay=".3" data-fade-from="top" data-ease="bounce">
                                            <Link className="pp-footer-btn mr-15" href="/contact-me-light">Contact Me {" "}
                                                <span><ArrowFour strokeWidth={2} /></span>
                                            </Link>
                                        </div>
                                        <div className="tp_fade_anim" data-delay=".5" data-fade-from="top" data-ease="bounce">
                                            <a
                                                className="pp-footer-btn"
                                                href="/downloads/mycv.doc"
                                                download="My_Professional_CV.doc"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Download CV {" "}
                                                <span><ArrowFour strokeWidth={2} /></span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* -- footer area end -- */}

            {/* -- footer copyright area start -- */}
            <PortfolioCopyright />
            {/* -- footer copyright area end -- */}

        </footer>
    );
};

export default PersonalPortfolioFooter;
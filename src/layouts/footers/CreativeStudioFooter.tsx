import { FacebookTwo, TwitterTwo, DribbleTwo, InstagramTwo } from '@/svg';
import CreativeStudioCopyright from './subComponents/CreativeStudioCopyright';
import Link from 'next/link';
import React from 'react';

const CreativeStudioFooter = ({ buttonCls = "" }) => {
    return (
        <footer className={`creative-footer-style ${buttonCls} p-relative z-index-1`} style={{ backgroundColor: "#F6F6F9" }}>
            <div className="tp-footer-widget-social">
                <div className="tp_fade_anim" data-delay=".9" data-fade-from="top" data-ease="bounce">
                    <Link href="#">
                        <span><FacebookTwo /></span>
                    </Link>
                </div>
                <div className="tp_fade_anim" data-delay=".7" data-fade-from="top" data-ease="bounce">
                    <Link href="#">
                        <span><TwitterTwo /></span>
                    </Link>
                </div>
                <div className="tp_fade_anim" data-delay=".5" data-fade-from="top" data-ease="bounce">
                    <Link href="#">
                        <span><DribbleTwo /></span>
                    </Link>
                </div>
                <div className="tp_fade_anim" data-delay=".3" data-fade-from="top" data-ease="bounce">
                    <Link href="#">
                        <span><InstagramTwo /></span>
                    </Link>
                </div>
            </div>

            <div className="creative-footer-text d-none d-lg-block">
                <p>Agntix I’ve gone too far, send me back up 👆</p>
            </div>

            {/* -- footer area start -- */}
            <div className="creative-footer-area pt-160 pb-35">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-4 col-lg-4">
                            <div className="tp-footer-widget tp-footer-col-1 pb-40 tp_fade_anim" data-delay=".3">
                                <h4 className="tp-footer-widget-title">Helping <br /> start-ups scale & grow.</h4>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-4 col-md-6">
                            <div className="tp-footer-widget tp-footer-col-2 pb-40 tp_fade_anim" data-delay=".5">
                                <h4 className="tp-footer-widget-title-sm pre mb-25">Quick links</h4>
                                <div className="tp-footer-widget-menu">
                                    <ul>
                                        <li><Link href="#">About</Link></li>{" "}
                                        <li><Link href="#">Who we are</Link></li>{" "}
                                        <li><Link href="#">Services</Link></li>{" "}
                                        <li><Link href="#">Projects</Link></li>{" "}
                                        <li><Link href="#">Blog</Link></li>{" "}
                                        <li><Link href="#">Pricing</Link></li>{" "}
                                        <li><Link href="#">Contact Us</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6">
                            <div className="tp-footer-widget tp-footer-col-3 pb-40 mb-30 tp_fade_anim" data-delay=".7" data-on-scroll="3">
                                <h4 className="tp-footer-widget-title-sm pre mb-20">Contact</h4>
                                <div className="tp-footer-widget-info">
                                    <Link href="mailto:agntixs@studio.com">agntixs@studio.com</Link>
                                    <Link href="tel:+3025550107">+(302) 555-0107</Link>
                                </div>
                                <div className="tp-footer-widget-info">
                                    <Link href="https://www.google.com/maps/" target="_blank">4517 Washington Ave. Manchester, <br />
                                        Kentucky 39495</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CreativeStudioCopyright />
            {/* -- footer area end -- */}
        </footer>
    );
};

export default CreativeStudioFooter;
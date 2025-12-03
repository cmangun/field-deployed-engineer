import MobileApplicationCopyright from './subComponents/MobileApplicationCopyright';
import logoBlack from '../../../public/assets/img/logo/logo-black.png';
import { ArrowSvg, SendEmailIcon, StarIcon } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const MobileApplicationFooter = () => {
    return (
        <footer>
            {/* -- footer area start -- */}
            <div className="app-footer-area pt-100 pb-60">
                <div className="container container-1230">
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6 mb-40">
                            <div className="dgm-footer-widget app-footer-col-1 z-index-1">
                                <div className="dgm-footer-logo mb-30">
                                    <Link href="/">
                                        <Image width={120} src={logoBlack} alt="logo black" />
                                    </Link>
                                </div>
                                <div className="dgm-footer-widget-paragraph mb-35">
                                    <p>Your ultimate travel partner. Carries the <br />
                                        info you need while travelling.</p>
                                </div>
                                <div className="app-footer-rating">
                                    <div className="app-hero-bottom-rating">
                                        <div className="app-hero-bottom-rating-point">
                                            <span>4.8</span>
                                        </div>
                                        <div className="app-hero-bottom-rating-star">
                                            <div className="app-hero-bottom-rating-stars">
                                                {Array.from({ length: 5 }).map((_, index) => (
                                                    <span style={{ marginRight: 4 }} key={index}><StarIcon key={index} width={15} height={15} color="#FFD04F" /></span>
                                                ))}
                                            </div>
                                            <Link href="#">Based on 204 Reviews {" "}
                                                <ArrowSvg pathValue='M1 1L9 9M9 9V1M9 9H1' /></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-2  col-md-3 mb-40">
                            <div className="dgm-footer-widget app-footer-widget app-footer-col-2">
                                <h4 className="dgm-footer-widget-title">About product</h4>
                                <div className="dgm-footer-widget-menu">
                                    <ul>
                                        <li><Link href="#">About</Link></li>
                                        <li><Link href="#">Features</Link></li>
                                        <li><Link href="#">How it works</Link></li>
                                        <li><Link href="#">Reviews</Link></li>
                                        <li><Link href="#">Subscribe</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-3 mb-40">
                            <div className="dgm-footer-widget app-footer-widget app-footer-col-3">
                                <h4 className="dgm-footer-widget-title">Need help?</h4>
                                <div className="app-footer-widget-info mb-20">
                                    <div className="app-footer-widget-info-title">Call us directly?</div>
                                    <Link className="tp-line-black" href="tel:123456789">(+123) 567 8910</Link>
                                </div>

                                <div className="app-footer-widget-info">
                                    <div className="app-footer-widget-info-title">Need live support?</div>
                                    <Link className="tp-line-black" href="mailto:qV2Ct@example.com">support@domain.com</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 mb-40">
                            <div className="dgm-footer-widget app-footer-widget app-footer-col-4 z-index-1">
                                <h4 className="dgm-footer-widget-title">Keep in touch with us</h4>
                                <div className="dgm-footer-widget-paragraph color-style mb-25">
                                    <p>Subscribe our newsletter to get the <br /> latest news and updates!</p>
                                </div>
                                <div className="dgm-footer-widget-input p-relative">
                                    <form action="#">
                                        <input type="text" placeholder="Enter your email" />
                                        <div className="input-button">
                                            <div className="animated-border-box radius-style-2">
                                                <Link className="tp-btn-gradient sm p-relative" href="#">Send{" "}
                                                    <SendEmailIcon />
                                                </Link>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* -- footer area end -- */}

            {/* -- copyright area start --  */}
            <MobileApplicationCopyright />
            {/* -- copyright area end -- */}

        </footer>
    );
};

export default MobileApplicationFooter;
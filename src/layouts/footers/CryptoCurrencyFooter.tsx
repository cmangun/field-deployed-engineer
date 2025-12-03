import FooterBg from '../../../public/assets/img/home-13/footer/cr-footer-bg.png';
import logoWhite from '../../../public/assets/img/logo/logo-white.png';
import { FooterSocialIcons } from './subComponents/FooterSocialIcons';
import CryptoCopyright from './subComponents/CryptoCopyright';
import { StarIcon } from '@/svg/StarIcons';
import { ArrowSvg } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CryptoCurrencyFooter = () => {
    return (
        <footer className="z-index-1 include-bg">
            <div className="cr-footer-bg">
                <Image src={FooterBg} alt="footer-bg" />
            </div>
            {/* -- footer area start -- */}
            <div className="dgm-footer-area cr-footer-area pb-60">
                <div className="container container-1230">
                    <div className="cr-footer-border-wrap pt-140 ">
                        <div className="cr-footer-inner-warp z-index-1">
                            <div className="row">
                                <div className="col-xl-4 col-lg-4 col-md-6 mb-40 tp_fade_anim" data-delay=".3">
                                    <div className="dgm-footer-widget cr-footer-col-1 z-index-1">
                                        <div className="dgm-footer-logo mb-20">
                                            <Link href="/"><Image width={120} src={logoWhite} alt="logo white" /></Link>
                                        </div>
                                        <div className="dgm-footer-widget-paragraph mb-30">
                                            <p>Empowering your crypto journey</p>
                                        </div>
                                        <div className="cr-footer-widget-social mb-35">
                                            <FooterSocialIcons className='tp-footer-widget-social' />
                                        </div>
                                        <div className="app-footer-rating">
                                            <div className="app-hero-bottom-rating">
                                                <div className="app-hero-bottom-rating-point">
                                                    <span>4.8</span>
                                                </div>
                                                <div className="app-hero-bottom-rating-star">
                                                    <div className="app-hero-bottom-rating-stars">
                                                        <span><StarIcon width={13} height={13} color='#06D991' /></span>{" "}
                                                        <span><StarIcon width={13} height={13} color='#06D991' /></span>{" "}
                                                        <span><StarIcon width={13} height={13} color='#06D991' /></span>{" "}
                                                        <span><StarIcon width={13} height={13} color='#06D991' /></span>{" "}
                                                        <span><StarIcon width={13} height={13} color='#06D991' /></span>
                                                    </div>
                                                    <Link className="tp-line-white" href="#">Based on 204 Reviews {" "}
                                                        <ArrowSvg pathValue='M1 1L9 9M9 9V1M9 9H1' />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-3 mb-40 tp_fade_anim" data-delay=".5">
                                    <div className="dgm-footer-widget app-footer-widget cr-footer-col-2">
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
                                <div className="col-xl-3 col-lg-4 col-md-3 mb-40 tp_fade_anim" data-delay=".7">
                                    <div className="dgm-footer-widget app-footer-widget cr-footer-col-3">
                                        <h4 className="dgm-footer-widget-title">Collaborate</h4>
                                        <div className="dgm-footer-widget-menu">
                                            <ul>
                                                <li><Link href="#">Partners</Link></li>
                                                <li><Link href="#">Partners Program</Link></li>
                                                <li><Link href="#">Affiliate Program</Link></li>
                                                <li><Link href="#">Community</Link></li>
                                                <li><Link href="#">HR Partner Program</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-3 col-md-3 mb-40 tp_fade_anim" data-delay=".9">
                                    <div className="dgm-footer-widget app-footer-widget cr-footer-col-4">
                                        <h4 className="dgm-footer-widget-title">Need help?</h4>
                                        <div className="app-footer-widget-info mb-20">
                                            <div className="app-footer-widget-info-title">Call us directly?</div>
                                            <Link className="tp-line-white" href="tel:123456789">(+123) 567 8910</Link>
                                        </div>

                                        <div className="app-footer-widget-info">
                                            <div className="app-footer-widget-info-title">Need live support?</div>
                                            <Link className="tp-line-white" href="mailto:qV2Ct@example.com">support@domain.com</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* -- footer area end -- */}

            {/* -- copyright area start -- */}
            <CryptoCopyright />
            {/* -- copyright area end -- */}

        </footer>
    );
};

export default CryptoCurrencyFooter;
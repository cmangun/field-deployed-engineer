
import logoBlack from '../../../public/assets/img/logo/logo-black.png';
import { FooterSocialIcons } from './subComponents/FooterSocialIcons';
import StartupCopyright from './subComponents/StartupCopyright';
import { ArrowSixteen } from '@/svg/ArrowIcons';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const StartupAgencyFooter = () => {
    return (
        <footer>
            {/* -- footer area start -- */}
            <div className="st-footer-area pt-115">
                <div className="container container-1320">
                    <div className="st-footer-top-border p-relative">
                        <div className="row">
                            <div className="col-xl-5 col-lg-5 col-md-7">
                                <div className="st-footer-widget st-footer-col-1 mb-70 tp_fade_anim" data-delay=".3">
                                    <div className="ar-footer-logo mb-30">
                                        <Link href="/"><Image width={140} src={logoBlack} alt="logo-black" /></Link>
                                    </div>
                                    <div className="st-footer-widget-content">
                                        <p>
                                            @ 2025 Copyright - Agntix | Design by <br />
                                            <Link href="#">“Aqlova’’</Link> | Powered by Envato
                                        </p>
                                    </div>
                                    {/* footer social */}
                                    <div className="st-footer-widget-social">
                                        <span className="st-footer-widget-social-title">Follow us on:</span>
                                        <FooterSocialIcons className='tp-footer-widget-social' />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-5">
                                <div className="st-footer-widget st-footer-col-2 mb-70 tp_fade_anim" data-delay=".5">
                                    <div className="st-footer-widget-box d-lg-flex">
                                        <h4 className="st-footer-widget-title">Find us</h4>
                                        <div className="st-footer-widget-info">
                                            <div className="st-footer-widget-info-title">
                                                <Link className="tp-line-black" href="#">Los angeles, USA</Link>
                                            </div>
                                            <div className="st-footer-widget-info-title">
                                                <Link className="tp-line-black" href="tel:0123456789">+1 (208) 120-802</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-5">
                                <div className="st-footer-widget st-footer-col-3 mb-70 tp_fade_anim" data-delay=".6">
                                    <div className="st-footer-widget-box d-lg-flex">
                                        <h4 className="st-footer-widget-title">Quick link</h4>
                                        <div className="st-footer-widget-menu">
                                            <ul>
                                                <li><Link className="tp-line-black" href="#">About us</Link></li>
                                                <li><Link className="tp-line-black" href="#">Services</Link></li>
                                                <li><Link className="tp-line-black" href="#">Projects</Link></li>
                                                <li><Link className="tp-line-black" href="#">Blogs</Link></li>
                                                <li><Link className="tp-line-black" href="#">Contact</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="st-footer-top-icon">
                            <span><ArrowSixteen strokeColor="#453030" /></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* footer copyright */}
            <StartupCopyright />

            {/* -- footer area end -- */}
        </footer>
    );
};

export default StartupAgencyFooter;
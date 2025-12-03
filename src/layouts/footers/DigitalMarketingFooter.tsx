import { FooterSocialIconsTwo } from './subComponents/FooterSocialIcons';
import DigitalMarketingCopyright from './subComponents/DigitalMarketingCopyright';
import logo from "../../../public/assets/img/logo/logo-white.png";
import { EmailIconTwo, SendEmailIcon, } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const DigitalMarketingFooter = ({ spacingCls = "" }) => {
    return (
        <footer className={`${spacingCls} pb-20`}>
            <div className="dgm-footer-bg p-relative">
                {/* -- footer area start -- */}
                <div className="dgm-footer-area black-bg-5 pt-100 pb-60">
                    <div className="container container-1430">
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-6 mb-40">
                                <div className="dgm-footer-widget dgm-footer-col-1 z-index-1 tp_fade_anim" data-delay=".3">
                                    <div className="dgm-footer-logo mb-30">
                                        <Link href="/"><Image width={120} src={logo} alt="logo-white" /></Link>
                                    </div>
                                    <div className="dgm-footer-widget-paragraph mb-35">
                                        <p>We are committed to helping you succeed, and we will work with you every step of the way.</p>
                                    </div>
                                    {/* footer social icons */}
                                    <FooterSocialIconsTwo className='dgm-footer-widget-social' />
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-2  col-md-3 mb-40">
                                <div className="dgm-footer-widget dgm-footer-col-2 tp_fade_anim" data-delay=".4">
                                    <h4 className="dgm-footer-widget-title">Service</h4>
                                    <div className="dgm-footer-widget-menu">
                                        <ul>
                                            <li><Link href="#">UI/UX Design</Link></li>
                                            <li><Link href="#">Web Design</Link></li>
                                            <li><Link href="#">Branding</Link></li>
                                            <li><Link href="#">Webflow</Link></li>
                                            <li><Link href="#">Development</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-md-3 mb-40">
                                <div className="dgm-footer-widget dgm-footer-col-3 tp_fade_anim" data-delay=".5">
                                    <h4 className="dgm-footer-widget-title">Company</h4>
                                    <div className="dgm-footer-widget-menu">
                                        <ul>
                                            <li><Link href="#">Home</Link></li>
                                            <li><Link href="#">Agency</Link></li>
                                            <li><Link href="#">Achievement</Link></li>
                                            <li><Link href="#">Webflow</Link></li>
                                            <li><Link href="#">Contact Us</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6 mb-40">
                                <div className="dgm-footer-widget dgm-footer-col-4 z-index-1 tp_fade_anim" data-delay=".6">
                                    <h4 className="dgm-footer-widget-title">Newsletter</h4>
                                    <div className="dgm-footer-widget-paragraph color-style mb-35">
                                        <p>Subscribe our newsletter to get the <br /> latest news and updates!</p>
                                    </div>
                                    <div className="dgm-footer-widget-input p-relative">
                                        <form action="#">
                                            <input type="text" placeholder="Enter your email" />
                                            <span className="input-icon">
                                                <EmailIconTwo />
                                            </span>
                                            <button className="input-button" type="submit">
                                                <span><SendEmailIcon /></span>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* -- footer area end -- */}

                {/* -- copyright area start -- */}
                <DigitalMarketingCopyright />
                {/* -- copyright area end -- */}
            </div>
        </footer>
    );
};

export default DigitalMarketingFooter;
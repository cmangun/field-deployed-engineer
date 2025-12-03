import UniqueAICopyright from './subComponents/UniqueAICopyright';
import { EmailIconFour, FooterShape } from '@/svg';
import { ArrowFive } from '@/svg/ArrowIcons';
import Link from 'next/link';
import React from 'react';

const UniqueAIImageFooter = () => {
    return (
        <footer>
            {/* -- footer area start -- */}
            <div className="ai-footer-area pt-110 pb-120 p-relative" style={{ backgroundColor: "#08041D" }}>
                <div className="container container-1230">
                    <div className="row">
                        <div className="col-xl-5 col-lg-6">
                            <div className="ai-footer-widget ai-footer-col-1 tp_fade_anim" data-delay=".3">
                                <h4 className="ai-footer-widget-title">
                                    We develop <br />
                                    <span className="p-relative">
                                        & create AI experience
                                        <FooterShape />
                                    </span>
                                </h4>
                                <div className="ai-footer-newsletter">
                                    <form action="#">
                                        <label>Newsletter Signup</label>
                                        <div className="ai-footer-input p-relative">
                                            <input type="text" placeholder="Enter your email address" />
                                            <span className="ai-footer-icon-1"> <EmailIconFour /></span>
                                            <button className="ai-footer-icon-2" type="submit">
                                                <span><ArrowFive /></span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                            <div className="ai-footer-widget ai-footer-col-2 mt-25 tp_fade_anim" data-delay=".5">
                                <h4 className="ai-footer-widget-title-sm">Socials</h4>
                                <div className="ai-footer-menu">
                                    <ul>
                                        <li><Link href="#">Twitter</Link></li>
                                        <li><Link href="#">Facebook</Link></li>
                                        <li><Link href="#">Instagram</Link></li>
                                        <li><Link href="#">Dribble</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                            <div className="ai-footer-widget ai-footer-col-3 mt-25 tp_fade_anim" data-delay=".7">
                                <h4 className="ai-footer-widget-title-sm">Menu</h4>
                                <div className="ai-footer-menu">
                                    <ul>
                                        <li><Link href="#">Home</Link></li>
                                        <li><Link href="#">About</Link></li>
                                        <li><Link href="#">Services</Link></li>
                                        <li><Link href="#">Shop</Link></li>
                                        <li><Link href="#">Contacts</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6">
                            <div className="ai-footer-widget ai-footer-col-4 mt-25 tp_fade_anim" data-delay=".9">
                                <h4 className="ai-footer-widget-title-sm">Say Hello</h4>
                                <div className="ai-footer-contact-info">
                                    <div className="ai-footer-contact-item mb-20">
                                        <Link href="mailto:info@email.com">info@email.com</Link>
                                        <Link href="tel:+18005552569">+1 800 555 25 69</Link>
                                    </div>
                                    <div className="ai-footer-contact-item">
                                        <Link href="https://www.google.com/maps/" target="_blank">
                                            The USA — <br /> 685 15h Street, Office 408 Seattle, WA 80066
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer Copyright */}
            <UniqueAICopyright />

            {/* -- footer area end -- */}
        </footer>
    );
};

export default UniqueAIImageFooter;
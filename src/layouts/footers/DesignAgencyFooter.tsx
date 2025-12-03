import DesignAgencyCopyright from "./subComponents/DesignAgencyCopyright";
import { EmailIconThree } from "@/svg";
import Link from 'next/link';
import React from 'react';

const DesignAgencyFooter = ({ spacingCls = "" }) => {
    return (
        <footer>
            <div className={`design-footer-area ${spacingCls}`}>
                <div className="container container-1680">
                    <div className="design-footer-top-wrap pb-50">
                        <div className="row align-items-end">
                            <div className="col-lg-7">
                                <div className="design-footer-top-text">
                                    <h4 className="tp-section-title-dirtyline title-box">
                                        <span className="tp-text-right-scroll tp_text_invert_2">time to</span><br />
                                        <span className="tp-text-left-scroll tp_text_invert_2">roar!</span>
                                    </h4>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="design-footer-top-btn text-start text-lg-end">
                                    <Link className="tp-btn-sky-border solid-bg" href="/contact">Let’s talk!</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="design-footer-middle pt-55">
                        <div className="row align-items-center">
                            <div className="col-xl-4 col-lg-5 col-md-6">
                                <div className="design-footer-widget design-footer-col-1 pb-60">
                                    <h4 className="design-footer-widget-title">Our Newsletter</h4>
                                    <div className="design-footer-widget-input p-relative">
                                        <input type="text" placeholder="Your email address" />
                                        <span className="design-footer-widget-input-icon">
                                            <EmailIconThree />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-8 col-lg-7 col-md-6">
                                <div className="design-footer-right pb-60">
                                    <div className="row align-items-center">
                                        <div className="col-xl-4">
                                            <div className="design-footer-widget design-footer-col-2">
                                                <h4 className="design-footer-widget-title sm">Call us</h4>
                                                <div className="design-footer-widget-info">
                                                    <Link className="tp-line-white" href="tel:+(213)555-8573">+(213) 555-8573</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-4">
                                            <div className="design-footer-widget design-footer-col-3">
                                                <h4 className="design-footer-widget-title sm">Drop us a line</h4>
                                                <div className="design-footer-widget-info">
                                                    <Link className="tp-line-white" href="mailto:inquiry@agntix.com">inquiry@agntix.com</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-4">
                                            <div className="design-footer-widget design-footer-col-4">
                                                <h4 className="design-footer-widget-title sm">Skype</h4>
                                                <div className="design-footer-widget-info">
                                                    <Link className="tp-line-white" href="#">agntix.agency</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer Copyright */}
            <DesignAgencyCopyright />
        </footer>
    );
};

export default DesignAgencyFooter;
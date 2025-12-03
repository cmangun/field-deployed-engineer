import footerShape from "../../../../public/assets/img/home-01/footer/footer-shape-1.png";
import { getCurrentYear } from "@/utils/getCurrentYear";
import Image from 'next/image';
import React from 'react';
import Link from "next/link";

const HomeFooterCopyright = ({ bgColor }: { bgColor?: string }) => {
    return (
        <div className="tp-copyright-area" style={{ backgroundColor: bgColor }}>
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="tp-copyright-content text-center text-md-start tp_fade_anim">
                            <h2 className="tp-copyright-big-text tp_fade_anim p-relative" data-delay=".5" data-fade-from="bottom" data-ease="bounce" data-on-scroll="3">
                                Agntix.studio
                                <Image className="tp-copyright-img d-none d-md-block" src={footerShape} alt="footer-shape" />
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

export default HomeFooterCopyright;
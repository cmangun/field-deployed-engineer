"use client";
import footerBg from "../../../public/assets/img/home-02/footer/footer-bg.jpg";
import footerLogo from "../../../public/assets/img/logo/logo-white.png";
import { useTextAnimation } from '@/hooks/useTextAnimations';
import { getCurrentYear } from "@/utils/getCurrentYear";
import { useRef } from 'react';
import Image from "next/image";
import Link from 'next/link';

const DesignStudioFooter = () => {
    const headingRef = useRef<HTMLAnchorElement>(null);
    useTextAnimation(headingRef);

    return (
        <footer>
            <div className="des-footer-wrap pb-15">
                <div className="container-fluid">
                    <div className="des-footer-area des-footer-bg text-center include-bg"
                        style={{ backgroundImage: `url(${footerBg.src})` }}>
                        <div className="des-footer-top d-flex align-items-center justify-content-between">
                            <span>Creative Design Agency</span>
                            <div className="des-footer-logo">
                                <Link href="/">
                                    <Image
                                        width={140}
                                        src={footerLogo}
                                        alt="footer-logo"
                                    />
                                </Link>
                            </div>
                            <span>Based in London</span>
                        </div>
                        <div className="des-footer-middle">
                            <span>Contact us and {`let's`} bring your vision to life</span>
                            <h3 className="des-footer-title">
                                <Link ref={headingRef} className="text-scale-anim" href="/contact">
                                    Contact Us
                                </Link>
                            </h3>
                        </div>
                        <div className="des-footer-bottom d-flex align-items-center justify-content-between">
                            <span>Powered by Aqlova</span>
                            <div className="des-footer-bottom-social text-center">
                                <Link href="#">Twitter</Link>
                                <Link href="#">Instagram</Link>
                                <Link href="#">Behance</Link>
                                <Link href="#">Dribbble</Link>
                            </div>
                            <span>Copyright © {getCurrentYear()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default DesignStudioFooter;
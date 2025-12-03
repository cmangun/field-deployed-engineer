import portfolio1 from '../../../public/assets/img/home-02/portfolio/portfolio-1.jpg';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

const PortfolioDetailsThree = () => {
    return (
        <div className="tp-pd-3-hero-area">
            <div className="tp-pd-3-hero-style">
                <div className="container-fluid">
                    <div className="des-portfolio-item p-relative mb-30">
                        <div className="des-portfolio-thumb anim-zoomin-wrap p-relative">
                            <Image style={{ width: "100%", height: "auto" }} className="w-100 anim-zoomin" src={portfolio1} alt="portfolio" />
                        </div>
                        <div className="des-portfolio-category d-none d-lg-block">
                            <span>Web Design</span>{" "}
                            <span>Web Development</span>
                        </div>
                        <div className="des-portfolio-category portfolio-meta d-none d-lg-block">
                            <span>2025</span>
                        </div>
                        <div className="des-portfolio-content">
                            <h2 className="des-portfolio-title tp-text-revel-anim"><Link href="/portfolio-details-creative-slider-light">Electro Hub</Link></h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioDetailsThree;
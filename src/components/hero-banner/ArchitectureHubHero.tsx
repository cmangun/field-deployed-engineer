import heroBgShape from '../../../public/assets/img/home-08/hero/hero-bg-shape.png';
import shape1 from '../../../public/assets/img/home-08/hero/hero-shape-1.png';
import shape2 from '../../../public/assets/img/home-08/hero/hero-shape-2.png';
import shape3 from '../../../public/assets/img/home-08/hero/hero-shape-3.png';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ArchitectureHubHero = () => {
    return (
        <div className="ar-hero-area ar-hero-border">
            <div className="container container-1430">
                <div className="ar-hero-bg ar-hero-ptb" style={{ backgroundImage: `url(${heroBgShape.src})` }}>
                    <div className="row justify-content-center">
                        <div className="col-xl-11">
                            <div className="ar-hero-title-box text-center tp_fade_anim" data-delay=".3">
                                <h2 className="ar-hero-title mb-15">
                                    <span><Image className="ar-hero-shape-1 d-none d-md-inline-block" src={shape1} alt="hero-shape" /></span>Our
                                    Buildings Integrate
                                    {" "}<span>
                                        <Image className="ar-hero-shape-2 d-none d-md-inline-block" src={shape2} alt="hero-shape" />
                                    </span> Best <i>Cosy Home <span><Image className="ar-hero-shape-3 d-none d-md-inline-block" src={shape3} alt="hero-shape" /></span></i>
                                </h2>
                            </div>
                            <div className="ar-hero-btn text-center tp_fade_anim" data-delay=".5" data-fade-from="top" data-ease="bounce">
                                <Link className="tp-btn-black-solid" href="/contact">Showcase the best Deals</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArchitectureHubHero;
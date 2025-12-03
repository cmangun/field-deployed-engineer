import shape from '../../../public/assets/img/portfolio/portfolio-details-4/portfolio-details-shape.jpg';
import logo from '../../../public/assets/img/portfolio/portfolio-details-4/portfolio-details-logo.png';
import thumb from '../../../public/assets/img/portfolio/portfolio-details-4/portfolio-details-thumb-2.jpg';
import Image from 'next/image';
import React from 'react';

const PortfolioDetailsFourColorArea = () => {
    return (
        <div className="tp-pd-4-color-ptb p-relative mb-160">
            <div className="tp-pd-4-color-picker">
                <Image src={shape} alt="shape image" />
            </div>
            <div className="container-fluid p-0">
                <div className="row gx-0">
                    <div className="col-xl-4 col-lg-6">
                        <div className="tp-pd-4-color-heading">
                            <div className="tp-pd-4-color-shape">
                                <Image src={logo} alt="logo" />
                            </div>
                            <div className="tp_fade_anim" data-delay=".3">
                                <h4 className="tp-pd-4-color-title">Logo Design</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing <br />
                                    elit. Maecenas varius tortor nibh, sit amet tempor nibh <br />
                                    finibus et. Aenean eu enim justo.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8 col-lg-6">
                        <div className="tp-pd-4-color-wrapper p-relative">
                            <div className="tp-pd-4-color-thumb">
                                <Image style={{ width: "100%", height: "auto" }} src={thumb} alt="thumb" />
                            </div>
                            <div className="row gx-0">
                                <div className="offset-xl-6 col-xl-6">
                                    <div className="tp-pd-4-color-content tp_fade_anim" data-delay=".5">
                                        <span>Color Palete</span>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing <br />
                                            elit. Maecenas varius tortor nibh, sit amet tempor nibh <br />
                                            finibus et. Aenean eu enim justo.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioDetailsFourColorArea;
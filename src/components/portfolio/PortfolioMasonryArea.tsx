import Link from 'next/link';
import React from 'react';

const PortfolioMasonryArea = () => {
    return (
        <div className="tp-portfolio-masonry-ptb pt-130">
            <div className="container container-1830">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="tp-portfolio-masonry-heading pb-80">
                            <h2 className="tp-portfolio-masonry-big-text tp-char-animation">Skill vison</h2>
                        </div>
                    </div>
                </div>
                <div className="tp-portfolio-masonry-wrap">
                    <div className="row">
                        <div className="col-xl-6 col-lg-4"></div>
                        <div className="col-xl-6 col-lg-8">
                            <div className="tp-portfolio-masonry-top-right">
                                <p>
                                    A Product Designer focus on the main aim growing <br />
                                    your business, while {`I'll`} make sure that your business <br />
                                    is effectively represented in the digital environment <br />
                                    and stands out from the competitors.
                                </p>
                                <div className="tp-portfolio-masonry-social">
                                    <Link href="#">Instagram</Link>
                                    <Link href="#">Behance</Link>
                                    <Link href="#">Dribbble</Link>
                                    <Link href="#">Linkedin</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioMasonryArea;
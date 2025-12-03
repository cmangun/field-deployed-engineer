import detailsThumb from '../../../public/assets/img/portfolio/portfolio-details-2/portfolio-details-thumb-1.jpg';
import Image from 'next/image';
import React from 'react';

const PortfoliDetailsGalleryBanner = () => {
    return (
        <div className="tp-pd-2-area pb-140">
            <div className="container-fluid p-0">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="tp-pd-2-banner">
                            <Image style={{ width: "100%", height: "auto" }} data-speed=".8" src={detailsThumb} alt="details thumb" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfoliDetailsGalleryBanner;
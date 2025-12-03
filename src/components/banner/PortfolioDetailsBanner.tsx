import portfolioBanner from '../../../public/assets/img/portfolio/portfolio-details-1/portfolio-details-banner.jpg';
import Image, { StaticImageData } from "next/image";
import React from "react";

interface PortfolioDetailsBannerProps {
    spacingCls?: string;
    varientCls?: string;
    image?: StaticImageData | string;
    alt?: string;
    parallax?: boolean;
}

const PortfolioDetailsBanner: React.FC<PortfolioDetailsBannerProps> = ({
    spacingCls = "pt-110",
    varientCls = "",
    image,
    alt = "Portfolio banner image",
}) => {
    return (
        <section
            className={`tp-portfolio-details-1-area pb-140 ${spacingCls}`}
        >
            <div className="container container-1830">
                <div className="row">
                    <div className="col-lg-12">
                        <div className={`tp-portfolio-details-1-banner ${varientCls}`}>
                            <Image
                                src={image ?? portfolioBanner}
                                alt={alt}
                                data-speed=".8"
                                priority
                                className="w-100 h-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PortfolioDetailsBanner;

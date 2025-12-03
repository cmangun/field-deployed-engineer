import leftImg1 from "../../../../public/assets/img/home-03/portfolio/port-1.jpg";
import rightImg1 from "../../../../public/assets/img/home-03/portfolio/port-2.jpg";
import leftImg2 from "../../../../public/assets/img/home-03/portfolio/port-3.jpg";
import rightImg2 from "../../../../public/assets/img/home-03/portfolio/port-4.jpg";
import leftImg3 from "../../../../public/assets/img/home-03/portfolio/port-5.jpg";
import rightImg3 from "../../../../public/assets/img/home-03/portfolio/port-6.jpg";
import leftImg4 from "../../../../public/assets/img/home-03/portfolio/port-7.jpg";
import rightImg4 from "../../../../public/assets/img/home-03/portfolio/port-8.jpg";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const projectsData = [
    {
        leftImg: leftImg1,
        rightImg: rightImg1,
        date: "DEC 2025",
        category: "Creative",
        title: "Pellente dapibus",
        link: "portfolio-details-creative-slider-light.html",
    },
    {
        leftImg: leftImg2,
        rightImg: rightImg2,
        date: "DEC 2025",
        category: "Creative",
        title: "Stickers Pack",
        link: "portfolio-details-creative-slider-light.html",
    },
    {
        leftImg: leftImg3,
        rightImg: rightImg3,
        date: "DEC 2025",
        category: "Creative",
        title: "Diseno Grafico",
        link: "portfolio-details-creative-slider-light.html",
    },
    {
        leftImg: leftImg4,
        rightImg: rightImg4,
        date: "DEC 2025",
        category: "Creative",
        title: "Bright Captive",
        link: "portfolio-details-creative-slider-light.html",
    },
];

const PortfolioProjectArea = () => {
    return (
        <div className="tp-portfolio-slicer-area pt-170">
            <div className="container container-1720">
                <div className="row">
                    <div className="col-xl-12">
                        {projectsData.map((item, index) => (
                            <div className="tp-portfolio-slicer-wrap" key={index}>
                                <div className="row">
                                    {/* Left Image */}
                                    <div className="col-xl-4 col-lg-4 col-md-6">
                                        <div className="tp-portfolio-slicer-thumb pro-img-1">
                                            <Image style={{ width: "100%", height: "auto" }} src={item.leftImg} alt={item.title} />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="col-xl-4 col-lg-4 col-md-12 order-1 order-lg-0">
                                        <div className="tp-portfolio-slicer-content text-center">
                                            <div className="tp-portfolio-slicer-meta-box d-flex justify-content-center">
                                                <span className="tp-portfolio-slicer-meta">
                                                    {item.date}
                                                </span>
                                                <span className="tp-portfolio-slicer-meta">
                                                    {item.category}
                                                </span>
                                            </div>
                                            <h4 className="tp-portfolio-slicer-title-sm">
                                                <Link href={item.link}>
                                                    {item.title.split(" ").map((word, i) => (
                                                        <React.Fragment key={i}>
                                                            {word}
                                                            <br />
                                                        </React.Fragment>
                                                    ))}
                                                </Link>
                                            </h4>
                                            <Link
                                                className="tp-btn-white-border tp-btn-transparent"
                                                href={item.link}
                                            >
                                                Get Started
                                            </Link>
                                        </div>
                                        <div className="tp-portfolio-slicer-border color-1 text-center">
                                            <span></span>
                                        </div>
                                    </div>

                                    {/* Right Image */}
                                    <div className="col-xl-4 col-lg-4 col-md-6 order-0 order-lg-0">
                                        <div className="tp-portfolio-slicer-thumb pro-img-2">
                                            <Image style={{ width: "100%", height: "auto" }} src={item.rightImg} alt={item.title} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioProjectArea;

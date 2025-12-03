import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

// image import
import port10 from '../../../public/assets/img/portfolio/portfolio-details-3/port-10.jpg';
import port11 from '../../../public/assets/img/portfolio/portfolio-details-3/port-11.jpg';

const PortfolioDetailsThreeNavigation = () => {
    // data array
    const navigationData = [
        {
            id: 1,
            img: port10,
            href: '/portfolio-details-creative-slider-light',
            categories: ['Web Design', 'Web Development'],
            year: '2025',
            title: 'Luxe Beauty',
        },
        {
            id: 2,
            img: port11,
            href: '/portfolio-details-creative-slider-light',
            categories: ['Web Design', 'Web Development'],
            year: '2025',
            title: 'Luxe Beauty',
        },
    ];

    return (
        <div className="tp-pd-3-navigation-area pt-100">
            <div className="container-fluid">
                <div className="row gx-15 justify-content-center">
                    <div className="col-xl-6">
                        <div className="tp-pd-3-navigation-top text-center pb-100">
                            <h2 className="tp-pd-3-navigation-title">next projects</h2>
                        </div>
                    </div>
                </div>
                <div className="row gx-20">
                    {navigationData.map((item) => (
                        <div key={item.id} className="col-lg-6">
                            <div
                                className="tp-pd-3-navigation-thumb-wrap tp-pd-3-navigation-thumb-overlay p-relative not-hide-cursor mb-20"
                                data-cursor="View<br>Demo"
                            >
                                <Link className="cursor-hide" href={item.href}>
                                    <div className="tp-pd-3-navigation-thumb">
                                        <Image
                                            style={{ width: "100%", height: "auto" }}
                                            src={item.img}
                                            alt={item.title}
                                            className="w-100"
                                        />
                                    </div>

                                    {/* category */}
                                    <div className="des-portfolio-category d-flex align-items-center">
                                        {item.categories.map((cat, i) => (
                                            <div key={i} className={`fix ${i === 0 ? 'mr-10' : ''}`}>
                                                <span>{cat}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* year */}
                                    <div className="des-portfolio-category portfolio-meta">
                                        <div className="fix">
                                            <span>{item.year}</span>
                                        </div>
                                    </div>

                                    {/* title */}
                                    <div className="tp-pd-3-navigation-content fix">
                                        <h4 className="tp-pd-3-navigation-title-sm">{item.title}</h4>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PortfolioDetailsThreeNavigation;

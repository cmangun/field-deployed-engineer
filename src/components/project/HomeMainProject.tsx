import { ArrowSvg, ButtonBlurFilter } from '@/svg';
import ProjectItem from './subComponents/ProjectItem';
import Link from 'next/link';
import React from 'react';

const HomeMainProject = () => {
    return (
        <div className="tp-project-area pt-200 pb-60">
            <div className="container">
                <div className="tp-project-title-box mb-50">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="tp-project-subtitle-wrap">
                                <span className="tp-section-subtitle pre">Featured Projects</span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="tp-project-link text-start text-md-end">
                                <Link href="/portfolio-col-3-light" className="tp-btn-black btn-red-bg">
                                    <span className="tp-btn-black-filter-blur">
                                        <ButtonBlurFilter filterId='buttonFilter6' />
                                    </span>
                                    <span className="tp-btn-black-filter d-inline-flex align-items-center" style={{ filter: "url(#buttonFilter6)" }}>
                                        <span className="tp-btn-black-text">View all Works</span>
                                        <span className="tp-btn-black-circle">
                                            <ArrowSvg />
                                        </span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Display the list of featured project cards */}
                <ProjectItem />
            </div>
        </div>
    );
};

export default HomeMainProject;
import PortfolioProjectCard from './subComponents/PortfolioProjectCard';
import { projectsDT } from '@/types/project-d-t';
import projectsData from '@/data/projectData';
import { ArrowSvg, ArrowTwo } from '@/svg';
import Link from 'next/link';
import React from 'react';

const PersonalPortfolioProject = () => {
    const displayProject: projectsDT[] = projectsData.slice(43, 47);

    return (
        <div id="down" className="pp-project-area pp-project-ptb z-index-1 pt-160 pb-100">
            <div className="container container-1430">
                <div className="row">
                    <div className="col-xxl-3 col-xl-12 col-md-4">
                        <div className="pp-project-sub-heading mb-70 tp_fade_anim" data-delay=".3">
                            <span className="tp-section-subtitle-clash clash-subtitle-pos body-ff">
                                Work Showcase
                                <i><ArrowTwo /></i>
                            </span>
                        </div>
                    </div>

                    <div className="col-xxl-6 col-xl-6 col-md-8">
                        <div className="pp-project-heading mb-70 tp_fade_anim" data-delay=".5">
                            <h3 className="tp-section-title-teko fs-120">
                                Discover my <br />Creative Expertise
                            </h3>
                        </div>
                    </div>

                    <div className="col-xxl-3 col-xl-6 col-md-6">
                        <div className="pp-project-btn pb-90">
                            <div className="tp-btn-red-circle-box tp-pp-btn-style tp_fade_anim"
                                data-delay=".5" data-fade-from="top" data-ease="bounce">
                                <Link className="tp-btn-red-circle-icon" href="/portfolio-masonry-light">
                                    <span><ArrowSvg width={12} height={12} /></span>
                                </Link>
                                <Link className="tp-btn-red-circle-text" href="/portfolio-masonry-light">
                                    View all Projects
                                </Link>
                                <Link className="tp-btn-red-circle-icon" href="/portfolio-masonry-light">
                                    <span><ArrowSvg width={12} height={12} /></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row gx-40">
                    {displayProject.map((project) => (
                        <PortfolioProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PersonalPortfolioProject;
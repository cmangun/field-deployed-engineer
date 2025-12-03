import projectsData from '@/data/projectData';
import { ArrowFour } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ArchitectureHubProject = () => {

    return (
        <div className="ar-project-area pt-150 pb-55">
            <div className="container container-1430">
                <div className="ar-project-title-wrap ar-title-mlr mb-65">
                    <div className="row align-items-end">
                        <div className="col-xl-6 col-lg-8 col-md-7">
                            <div className="ar-project-title-box">
                                <span className="tp-section-subtitle-satisfy mb-20 tp_fade_anim" data-delay=".3">Latest Project</span>
                                <h3 className="tp-section-title-clash-600 mb-0 tp_fade_anim" data-delay=".4">Selected <br /> case studies</h3>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-4 col-md-5">
                            <div className="ar-project-btn-box d-flex justify-content-md-end justify-content-start mb-15">
                                <div className="tp-btn-red-circle-box tp_fade_anim" data-delay=".4" data-fade-from="top" data-ease="bounce">
                                    <Link className="tp-btn-red-circle-icon" href="/portfolio-col-3-light">
                                        <span><ArrowFour /></span>
                                    </Link>
                                    <Link className="tp-btn-red-circle-text" href="/portfolio-col-3-light">all projects</Link>
                                    <Link className="tp-btn-red-circle-icon" href="/portfolio-col-3-light">
                                        <span><ArrowFour /></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row gx-40">
                    {projectsData.slice(23, 27).map((project) => (
                        <div key={project.id} className="col-md-6">
                            <div className="ar-project-item mb-60">
                                <div className="ar-project-category d-flex align-items-center justify-content-between">
                                    <span>{project.title}</span>
                                    <i>{project.year}</i>
                                </div>
                                <div className="ar-project-thumb not-hide-cursor" data-cursor="View<br>Demo">
                                    <Link className="cursor-hide" href={project.link}>
                                        {project.altText && <Image style={{ width: "100%", height: "auto" }} className="w-100" src={project.image} alt={project.altText} />}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArchitectureHubProject;
import shapeBg from '../../../public/assets/img/home-09/project/project-img-bg-shape.png';
import { projectsDT } from '@/types/project-d-t';
import projectsData from '@/data/projectData';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CorporateAgencyProject = () => {
    return (
        <div className="crp-project-area tp-panel-pin-area pt-100 mb-150">
            <div className="container container-1330">
                <div className="row">
                    <div className="col-xl-5">
                        <div className="crp-project-title-box tp-panel-pin">
                            <h4 className="tp-section-title-teko fs-150 mb-50 tp_fade_anim" data-delay=".3">
                                Our recent <span>projects</span>
                            </h4>
                            <div className="tp_fade_anim" data-delay=".5" data-fade-from="top" data-ease="bounce">
                                <Link className="tp-btn-yellow-border" href="/portfolio-col-3-light">
                                    <span>
                                        <span className="text-1">See All Projects</span>
                                        <span className="text-2">See All Projects</span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-7">
                        <div className="crp-project-right">
                            {projectsData.slice(33, 37).map((project: projectsDT) => (
                                <div key={project.id} className="crp-project-item tp-panel-pin mb-40">
                                    <div className="crp-project-meta d-flex justify-content-between align-items-center">
                                        <span>{project.number}</span>
                                        <span>{project.year}</span>
                                    </div>
                                    <div className="crp-project-thumb text-center"
                                    style={{ backgroundImage: `url(${shapeBg.src})` }}>
                                        <Image src={project.image} alt={project.title} />
                                    </div>
                                    <div className="crp-project-content">
                                        <h4 className="crp-project-title-sm mb-15">
                                            <Link className="tp-line-white green" href={project.link}>
                                                {project.title}
                                            </Link>
                                        </h4>
                                        <div className="crp-project-category">
                                            {project.categories?.map((category, index) => (
                                                <Link key={index} href="#">{category}</Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CorporateAgencyProject;
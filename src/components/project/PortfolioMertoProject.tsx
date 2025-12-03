import projectsData from '@/data/projectData';
import { ArrowTwentyFive } from '@/svg/ArrowIcons';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PortfolioMertoProject = () => {
    return (
        <div className="design-project-area pt-200 pb-80 title-box">
            <div className="container container-1680">
                <div className="design-project-title-wrap p-relative mb-140">
                    <div className="tp-portfolio-metro-shape">
                        <span><ArrowTwentyFive /> Know More</span>
                    </div>
                    <div className="row align-items-end">
                        <div className="col-xl-9 col-lg-9 col-md-9">
                            <div className="design-project-title-box">
                                <h4 className="tp-section-title-dirtyline">
                                    <span className="tp-text-right-scroll tp_text_invert_2">recent</span> <br />
                                    <span className="tp_text_invert_2">work</span>
                                </h4>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-3">
                            <div className="tp-portfolio-metro-social text-md-end pb-50">
                                <div>
                                    <Link href="#">Linkedin</Link>
                                </div>
                                <div>
                                    <Link href="#">Instagram</Link>
                                </div>
                                <div>
                                    <Link href="#">Dribbble</Link>
                                </div>
                                <div>
                                    <Link href="#">Behance</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="top" className="design-project-item-wrap">
                    {projectsData.slice(47, 52).map((project, index) => (
                        <div key={project.id} className="design-project-item mb-120">
                            <div className="row align-items-center">
                                {/* Image Column */}
                                <div className={`col-xl-7 ${project.layout === 'left' ? 'order-xl-1 order-0' : ''}`}>
                                    <div className={`design-project-thumb item-${index % 2 === 0 ? '1' : '2'} ${project.layout === 'left' ? 'text-end' : ''}`}>
                                        <Image style={{ width: "100%", height: "auto" }} src={project.image} alt={project.title} />
                                    </div>
                                </div>
                                {/* Content Column */}
                                <div className={`col-xl-5 ${project.layout === 'left' ? 'order-xl-0 order-1' : ''}`}>
                                    <div className={`design-project-content ${project.contentClass ? project.contentClass : ""}`}>
                                        <h4 className="design-project-title tp_reveal_anim">
                                            <Link href={project.link}>
                                                {project.hasLineBreak ? (
                                                    <>
                                                        {project.title.split(' ')[0]} <br /> {project.title.split(' ').slice(1).join(' ')}
                                                    </>
                                                ) : (
                                                    project.title
                                                )}
                                            </Link>
                                        </h4>
                                        <span className="tp_reveal_anim">{project.services}</span>
                                        <Link className="tp-btn-sky-border height-50" href={project.link}>
                                            View project
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default PortfolioMertoProject;
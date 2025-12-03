import projectsData from '@/data/projectData';
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const DesignAgencyProject = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div className="design-project-area design-project-2-style pt-200 pb-60 title-box" ref={containerRef}>
            <div className="container container-1680">
                <div className="design-project-title-wrap mb-140">
                    <div className="row align-items-end">
                        <div className="col-xl-9 col-lg-9 col-md-9">
                            <div className="design-project-title-box">
                                <h4 className="tp-section-title-dirtyline">
                                    <span className="tp-text-right-scroll tp_text_invert_2">recent</span> <br />
                                    <span className="tp_text_invert_2">work</span>
                                </h4>
                                <p className="tp_reveal_anim" data-delay=".5">In the creative wilderness, clients find our work truly beloved.</p>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-3">
                            <div className="design-project-btn text-start text-md-end">
                                <Link className="tp-btn-sky-border" href="/portfolio-metro-light">Explore work</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="design-project-item-wrap">
                    {projectsData.slice(16, 19).map((project, index) => (
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

export default DesignAgencyProject;
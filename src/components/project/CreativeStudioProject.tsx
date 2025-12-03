"use client"

import { ButtonBlurFilter, ArrowSvg } from '@/svg';
import { projectsDT } from '@/types/project-d-t';
import projectsData from '@/data/projectData';
import Image from "next/image";
import Link from 'next/link';
import React from 'react';

const CreativeStudioProject = () => {

    const renderProject = (project: projectsDT) => (
        <div className="col-lg-6" key={project.id}>
            <div className="creative-project-item mb-100">
                <div className="creative-project-thumb anim-zoomin-wrap p-relative">
                    <div className="anim-zoomin not-hide-cursor" data-cursor="View<br/>Demo">
                        <Link className="cursor-hide" href={project.link}>
                            <Image style={{ width: "100%", height: "auto" }} src={project.image} alt={project.title} />
                        </Link>
                    </div>
                    <div className="creative-project-category">
                        {project.categories?.map((category, index) => (
                            <span key={index}>{category}</span>
                        ))}
                    </div>
                </div>
                <div className="creative-project-content">
                    <div className="creative-project-meta">
                        <span>{project.year}</span>
                        <span>{project.client}</span>
                    </div>
                    <h4 className="creative-project-title-sm"><Link className="tp-line-white" href={project.link}>{project.title}</Link></h4>
                </div>
            </div>
        </div>
    );

    return (
        <div className="creative-project-area creative-project-2-style pb-120">
            <div className="container container-1580">
                <div className="creative-project-2-top">
                    <div className="row align-items-end">
                        <div className="col-lg-3">
                            <div className="creative-project-title-box">
                                <span className="tp-section-subtitle mb-20 fs-17 pre-circle tp_fade_anim" data-delay=".3">Work Showcase</span>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="creative-project-title-box">
                                <h4 className="tp-section-title fs-64 tp_fade_anim" data-delay=".5">Discover my <br /> Creative Expertise</h4>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="creative-project-2-btn text-lg-end tp_fade_anim" data-fade-from="top" data-delay=".3" data-ease="bounce">
                                <Link href="/about-us-light" className="tp-btn-black btn-green-light-bg mb-20">
                                    <span className="tp-btn-black-filter-blur">
                                        <ButtonBlurFilter filterId="buttonFilter1" />
                                    </span>
                                    <span className="tp-btn-black-filter d-inline-flex align-items-center" style={{ filter: 'url(#buttonFilter3)' }}>
                                        <span className="tp-btn-black-text">About Agntix</span>
                                        <span className="tp-btn-black-circle">
                                            <ArrowSvg />
                                        </span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row gx-40">
                    {projectsData.slice(12, 16).map(renderProject)}
                </div>
            </div>
        </div>
    );
};

export default CreativeStudioProject;
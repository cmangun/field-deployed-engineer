import project1 from '../../../public/assets/img/home-15/project/project-1.jpg';
import project2 from '../../../public/assets/img/home-15/project/project-2.jpg';
import project3 from '../../../public/assets/img/home-15/project/project-1.1.jpg';
import project4 from '../../../public/assets/img/home-15/project/project-2.2.jpg';
import project5 from '../../../public/assets/img/home-15/project/project-1.3.jpg';
import project6 from '../../../public/assets/img/home-15/project/project-2.3.jpg';
import project7 from '../../../public/assets/img/home-15/project/project-1.4.jpg';
import project8 from '../../../public/assets/img/home-15/project/project-2.4.jpg';
import { fashionStudioProjectDT } from '@/types/custom-d-t';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const projects: fashionStudioProjectDT[] = [
    {
        id: 1,
        title: 'Modelling',
        subtitle: 'Fashion & Life Style',
        images: { left: project1, right: project2 },
        link:"/portfolio-details-modern-light"
    },
    {
        id: 2,
        title: 'Acting',
        subtitle: 'Character',
        images: { left: project3, right: project4 },
        link:"/portfolio-details-modern-light"
    },
    {
        id: 3,
        title: 'Costume',
        subtitle: 'Cloth & Wearing',
        images: { left: project5, right: project6 },
        link:"/portfolio-details-modern-light"
    },
    {
        id: 4,
        title: 'Artist',
        subtitle: 'Creative Designer',
        images: { left: project7, right: project8 },
        link:"/portfolio-details-modern-light"
    },
];


const FashionStudioProject = () => {
    const [activeProject, setActiveProject] = useState(2);

    const handleAwardHover = (projectId: number) => {
        setActiveProject(projectId);
    };

    return (
        <div className="tp-project-5-area pb-140 z-index-1">
            <div className="container container-1350">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="tp-project-5-section-box pb-130 d-flex justify-content-between align-items-center">
                            <span className="tp-project-5-section-subtitle">Services</span>
                            <h4 className="tp-project-5-section-title">My expertise in this area</h4>
                            <Link className="tp-project-5-section-link" href="/portfolio-details-modern-light">
                                View more
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="tp-project-5-wrap p-relative">
                <div className="row justify-content-center">
                    <div className="col-xl-12">
                        <div className="tp-project-5-title-wrap">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className={`tp-project-5-title-box text-center ${project.id === activeProject ? 'active' : ''}`}
                                    rel={`tp-project-5-thumb-box-${project.id}`}
                                    onMouseEnter={() => handleAwardHover(project.id)}
                                >
                                    <div className="tp-project-5-title-box-bg" />
                                    <div className="tp-project-5-thumb-box d-flex justify-content-between align-items-end">
                                        <div className="tp-project-5-thumb thumb-1">
                                            <Image src={project.images.left} alt={project.title} />
                                        </div>
                                        <div className="tp-project-5-thumb thumb-2">
                                            <Image src={project.images.right} alt={project.title} />
                                        </div>
                                    </div>
                                    <h4 className="tp-project-5-title">
                                        <Link href={project.link}>{project.title}</Link>
                                    </h4>
                                    <span>{project.subtitle}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FashionStudioProject;
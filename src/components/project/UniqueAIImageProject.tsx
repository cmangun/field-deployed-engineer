import shapeTwo from '../../../public/assets/img/title-shape/title-shape-1.png';
import shape from '../../../public/assets/img/home-07/shape/shape-2.png';
import { useHoverEffect } from '@/hooks/useHoverEffect';
import projectsData from '@/data/projectData';
import { BottomArrow } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const UniqueAIImageProject = () => {
    const { addToRefs } = useHoverEffect();

    return (
        <div className="ai-project-area">
            <div className="container container-1230">
                <div className="row justify-content-center">
                    <div className="col-xl-10">
                        <div className="ai-project-title-box p-relative text-center mb-60">
                            <div className="ai-project-shape-1">
                                <Image style={{width:"100%", height:"auto"}} src={shape} alt="shape" />
                            </div>
                            <div className="tp-section-subtitle-gradient mb-20 tp_fade_anim" data-delay=".3">
                                <div><Image src={shapeTwo} alt="shape" /></div>
                                what we create
                            </div>
                            <h4 className="tp-section-title fs-54 mb-20 tp_fade_anim" data-delay=".5">
                                Image Generator showcases our capabilities in visual content creation
                            </h4>
                            <div className="tp_fade_anim" data-fade-from="top" data-delay=".7" data-ease="bounce">
                                <span><BottomArrow /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid p-0">
                <div className="ai-project-thumb-wrap">
                    <div className="row gx-0">
                        {projectsData.slice(27, 33).map((project) => (
                            <div className="col-xl-4 col-lg-6 col-md-6" key={project.id}>
                                <div className="ai-project-item anim-zoomin-wrap p-relative">
                                    <div ref={addToRefs} className="ai-project-thumb anim-zoomin tp--hover-item fix">
                                        <div className="tp--hover-img"
                                            data-displacement="assets/img/webgl/1.jpg"
                                            data-intensity="0.6"
                                            data-speedin="1"
                                            data-speedout="1">
                                            <Image
                                                style={{ width: "100%", height: "auto" }}
                                                src={project.image}
                                                alt={`${project.title} project image`}
                                                width={500}
                                                height={300}
                                                onLoad={(e) => {
                                                    const img = e.target as HTMLImageElement;
                                                    if (img) img.style.opacity = '1';
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="ai-project-content">
                                        <span className="ai-project-subtitle">{project.subtitle}</span>
                                        <h4 className="ai-project-title">
                                            <Link className="tp-line-black" href={project.link}>
                                                {project.title}
                                            </Link>
                                        </h4>
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

export default UniqueAIImageProject;
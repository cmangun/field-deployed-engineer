import { LeftArrowIcon, RightArrowIcon } from '@/svg';
import projectsData from '@/data/projectData';
import Image from 'next/image';
import Link from 'next/link';

// Import Swiper components and modules
import { project_swiper_params } from '@/constants/swiper';
import { Swiper, SwiperSlide } from "swiper/react";

const ITSolutionProject = () => {
    return (
        <div className="it-project-area it-project-ptb pt-120">
            <div className="container container-1230">
                <div className="row justify-content-center">
                    <div className="col-xl-11">
                        <div className="it-project-title-box text-center mb-45">
                            <span className="tp-section-subtitle-platform platform-text-black tp-split-text tp-split-right">
                                Proud projects that make us stand out
                            </span>
                            <h4 className="tp-section-title-platform platform-text-black fs-200 tp-split-text tp-split-right">
                                Case Studies
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="it-project-slider-wrap text-center">
                <Swiper
                    className='it-project-active pb-50'
                    {...project_swiper_params}
                >
                    {projectsData.slice(37, 43).map((project) => (
                        <SwiperSlide key={project.id}>
                            <div className="it-project-item text-center">
                                <div className="it-project-thumb fix">
                                    <Link href={project.link}>
                                        <Image
                                            style={{ width: "100%", height: "auto" }}
                                            className="w-100"
                                            src={project.image}
                                            alt={project.title}
                                        />
                                    </Link>
                                </div>
                                <div className="it-project-content">
                                    <h4 className="it-project-title">
                                        <Link className="tp-line-black" href={project.link}>
                                            {project.title}
                                        </Link>
                                    </h4>
                                    <span>{project.category}</span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="it-project-arrow">
                    <button className="it-project-prev">
                        <span>
                            <LeftArrowIcon width='14' height='14' viewBox='0 0 14 14' strokeWidth={2} pathValue='M13 7H1M1 7L7 1M1 7L7 13' />
                        </span>
                    </button>
                    <button className="it-project-next">
                        <span>
                            <RightArrowIcon width='14' height='14' viewBox='0 0 14 14' strokeWidth={2} pathValue='M1 7H13M13 7L7 1M13 7L7 13' />
                        </span>
                    </button>
                </div>
                <div className="it-project-dots"></div>
            </div>
        </div>
    );
};

export default ITSolutionProject;
import { projectsDT } from '@/types/project-d-t';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PortfolioProjectCard = ({ project }: { project: projectsDT }) => {

    return (
        <div className="col-lg-6 tp_fade_anim" data-delay={project.delay} data-fade-from={project.fadeDirection}>
            <div className="pp-project-item tp--hover-item mb-65">
                <div className="pp-project-item-thumb not-hide-cursor" data-cursor="View<br/>Demo">
                    <Link className="cursor-hide" href={project.link}>
                        <Image style={{ width: "100%", height: "auto" }} src={project.image} alt={project.title} />
                    </Link>
                </div>
                <div className="pp-project-item-contenet">
                    <h4 className="pp-project-item-title">
                        <Link href={project.link}>{project.title}</Link>
                    </h4>
                    <span className="pp-project-item-meta">{`${project.category} - ${project.year}`}</span>
                </div>
            </div>
        </div>
    );
};

export default PortfolioProjectCard;
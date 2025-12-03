import projectsData from '@/data/projectData';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CreativeAgencyProjectProps {
    showDataCursor?: boolean;
    subtitleTextColor?: string;
}

const CreativeAgencyProject: React.FC<CreativeAgencyProjectProps> = (
    {
        showDataCursor = true,
        subtitleTextColor = "color-red",
    }
) => {
    return (
        <div id="case-studies" className="studio-project-area studio-project-ptb pb-60">
            <div style={{ paddingLeft: '50px', paddingRight: '50px' }}>
                <div className="studio-project-top-wrap mb-70" style={{ paddingTop: '100px' }}>
                    <div className="row">
                        <div className="col-xl-4 d-none d-xl-block"></div>
                        <div className="col-xl-8 col-12">
                            <h3 style={{
                                color: '#EA4D4D',
                                fontSize: '100px',
                                fontWeight: '700',
                                lineHeight: '1',
                                fontFamily: 'var(--tp-ff-heading)',
                                marginBottom: '0',
                                textAlign: 'left',
                                paddingLeft: '15px'
                            }}>
                                Case Studies
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="studio-project-wrap">
                    {projectsData.slice(19, 31).map((project) => (
                        <div className="studio-project-item mb-80" key={project.id}>
                            {/* Image at top */}
                            <div className="not-hide-cursor" {...(showDataCursor === true ? { 'data-cursor': 'View<br>Demo' } : "")}>
                                <Link className="cursor-hide" href={project.link}>
                                    <div className="studio-project-thumb">
                                        <Image style={{ width: "100%", height: "auto" }} src={project.image} alt={project.title} />
                                    </div>
                                </Link>
                            </div>
                            {/* Title and description below */}
                            <div className="studio-project-content" style={{ marginTop: '24px' }}>
                                <h4 className="studio-project-title-sm">
                                    <Link href={project.link}>{project.title}</Link>
                                </h4>
                                <span>{project.services}</span>
                                {project.description && (
                                    <p style={{ fontSize: '14px', marginTop: '12px', lineHeight: '1.6', color: '#555' }}>
                                        {project.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CreativeAgencyProject;

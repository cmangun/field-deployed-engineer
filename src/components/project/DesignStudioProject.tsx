import projectImg from "../../../public/assets/img/home-02/project/project-1.jpg";
import ProjectCounter from "../counter/ProjectCounter";
import Image from 'next/image';
import React from 'react';

const DesignStudioProject = () => {

    return (
        <div className="des-project-area pb-200">
            <div className="des-project-banner">
                <Image
                    style={{ width: "100%", height: "auto" }}
                    className="w-100"
                    data-speed=".7"
                    src={projectImg}
                    alt="project-image"
                />
            </div>
            {/* couter section */}
            <ProjectCounter/>
        </div>
    );
};

export default DesignStudioProject;
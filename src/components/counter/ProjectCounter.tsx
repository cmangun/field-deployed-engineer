import AnimatedCounterTwo from './AnimatedCounterTwo';
import React from 'react';
const stats = [
    {
        id: 1,
        value: 120,
        suffix: "+",
        duration: 1,
        tagline: "[ Nice! ]",
        title: "Projects Completed"
    },
    {
        id: 2,
        value: 16,
        suffix: "+",
        duration: 1,
        tagline: "[ Holy Moly! ]",
        title: "Years of Experience"
    },
    {
        id: 3,
        value: 185,
        suffix: "%",
        duration: 1,
        tagline: "[ Ho Ho! ]",
        title: "Growing Agency"
    }
];

const ProjectCounter = ({ spacingCls = "pt-140" }) => {

    return (
        <div className="container container-1510">
            <div className={`des-project-title-wrap pb-90 ${spacingCls}`}>
                <div className="row align-items-center">
                    <div className="col-xxl-6 col-xl-5">
                        <div className="des-project-title-box">
                            <span className="tp-section-subtitle text-capitalize text-black mb-15">
                                Fun Facts
                            </span>
                            <h3 className="tp-section-title-mango mb-0">
                                Numbers that Speak Volumes
                            </h3>
                        </div>
                    </div>
                    <div className="col-xxl-6 col-xl-7">
                        <div className="des-project-top-text">
                            <p>
                                We are a team of passionate and crazy individuals dedicated to bringing
                                your ideas to life. With a keen eye for aesthetics, attention to detail, & a
                                deep understanding of design principles, we strive to deliver exceptional
                                results that exceed your expectations!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="des-project-wrap">
                <div className="row">
                    {stats.map((stat) => (
                        <div key={stat.id} className="col-xxl-6 offset-xxl-6 col-xl-7 offset-xl-5">
                            <div className="des-project-item d-flex align-items-center">
                                <div className="des-project-total">
                                    <span>
                                        <AnimatedCounterTwo min={0} max={stat.value} />{stat.suffix}
                                    </span>
                                </div>
                                <div className="des-project-info">
                                    <span>{stat.tagline}</span>
                                    <h4>{stat.title}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectCounter;
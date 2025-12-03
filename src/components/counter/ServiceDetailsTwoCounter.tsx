import AnimatedCounterTwo from './AnimatedCounterTwo';
import React from 'react';

const ServiceDetailsTwoCounter = () => {
    // Data for the counters
    const counterData = [
        {
            id: 1,
            value: 50,
            unit: '%',
            delay: '.3',
            description: 'Boost In\nWeb Traffic',
            descriptionBr: ['Boost In', 'Web Traffic']
        },
        {
            id: 2,
            value: 23,
            unit: '%',
            delay: '.5',
            description: 'Growth in User\nEngagement',
            descriptionBr: ['Growth in User', 'Engagement']
        },
        {
            id: 3,
            value: 50,
            unit: '%',
            delay: '.7',
            description: 'Boost In\nWeb Traffic',
            descriptionBr: ['Boost In', 'Web Traffic']
        }
    ];

    return (
        <div className="pp-service-details-bottom">
            <div className="container container-1230">
                <div className="row gx-0">
                    {counterData.map((item) => (
                        <div className="col-lg-4 col-md-6" key={item.id}>
                            <div 
                                className="pp-service-details-about-item mb-30 tp_fade_anim" 
                                data-delay={item.delay}
                            >
                                <span>
                                    <AnimatedCounterTwo min={0} max={item.value}/> {item.unit}
                                </span>
                                <p>
                                    {item.descriptionBr[0]} <br />
                                    {item.descriptionBr[1]}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailsTwoCounter;
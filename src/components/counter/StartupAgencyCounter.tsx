import AnimatedCounterTwo from './AnimatedCounterTwo';
import React from 'react';

const StartupAgencyCounter = () => {
    // Counter data
    const counterData = [
        {
            id: 1,
            value: 55,
            suffix: 'k',
            duration: 1,
            label: 'Projects <br> completed',
            className: ''
        },
        {
            id: 2,
            value: 12,
            suffix: 'k+',
            duration: 1,
            label: 'Happy clients <br> over the world',
            className: ''
        },
        {
            id: 3,
            value: 15,
            suffix: '',
            duration: 1,
            label: 'Years of <br> experience',
            className: ''
        },
        {
            id: 4,
            value: 68,
            suffix: 'k',
            duration: 1,
            label: 'Awards <br> achievement',
            className: ''
        }
    ];

    return (
        <div className="st-counter-area st-counter-ptb pb-160">
            <div className="container container-1320">
                <div className="st-counter-wrapper">
                    <div className="row gx-0">
                        {counterData.map((item) => (
                            <div key={item.id} className="col-md-3 col-sm-6">
                                <div className={`st-counter-item text-center ${item.className}`}>
                                    <h4>
                                        <AnimatedCounterTwo min={0} max={item.value} />
                                        {item.suffix}
                                    </h4>
                                    <span dangerouslySetInnerHTML={{ __html: item.label.replace('\n', '<br />') }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartupAgencyCounter;
import React from 'react';

// Import all images
import img1 from '../../../public/assets/img/1.webp';
import img2 from '../../../public/assets/img/2.webp';
import img3 from '../../../public/assets/img/3.webp';
import img4 from '../../../public/assets/img/4.webp';
import img5 from '../../../public/assets/img/5.webp';
import img6 from '../../../public/assets/img/6.webp';
import img7 from '../../../public/assets/img/7.webp';
import img9 from '../../../public/assets/img/9.webp';
import img10 from '../../../public/assets/img/10.webp';
import img11 from '../../../public/assets/img/11.webp';
import img12 from '../../../public/assets/img/12.webp';
import img13 from '../../../public/assets/img/13.webp';
import img14 from '../../../public/assets/img/14.webp';
import img15 from '../../../public/assets/img/15.webp';
import img16 from '../../../public/assets/img/16.webp';
import img17 from '../../../public/assets/img/17.webp';
import ImageTrail from '@/utils/ImageTrail';
import Link from 'next/link';

const CreativeAgencyHero = ({ title = "Agntix", fontStyle="" }) => {
    // Create an array of image data
    const images = [
        { id: 1, src: img1 },
        { id: 2, src: img2 },
        { id: 3, src: img3 },
        { id: 4, src: img4 },
        { id: 5, src: img5 },
        { id: 6, src: img6 },
        { id: 7, src: img7 },
        { id: 9, src: img9 },
        { id: 10, src: img10 },
        { id: 11, src: img11 },
        { id: 12, src: img12 },
        { id: 13, src: img13 },
        { id: 14, src: img14 },
        { id: 15, src: img15 },
        { id: 16, src: img16 },
        { id: 17, src: img17 },
    ];

    return (
        <div className="studio-hero-area p-relative fix pb-80">
          <ImageTrail images={images}/>
            <div className="container container-1830">
                <div className="studio-hero-bg">
                    <div className="row">
                        <div className="col-xl-12">
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="studio-hero-content text-center tp-text-perspective" data-delay=".5" data-fade-from="top" data-ease="bounce">
                                <h2 className={`studio-hero-title ${fontStyle}`}>{title}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreativeAgencyHero;
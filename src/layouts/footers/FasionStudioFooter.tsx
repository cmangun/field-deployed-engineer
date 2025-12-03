import insta1 from '../../../public/assets/img/home-15/instagram/insta-1.jpg';
import insta2 from '../../../public/assets/img/home-15/instagram/insta-2.jpg';
import insta3 from '../../../public/assets/img/home-15/instagram/insta-3.jpg';
import insta4 from '../../../public/assets/img/home-15/instagram/insta-4.jpg';
import aboutImg from '../../../public/assets/img/home-15/about/about-img.jpg';
import FashionCopyright from './subComponents/FashionCopyright';
import { ArrowThirteen } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const instagramImages = [insta1, insta2, insta3, insta4];
const socialLinks = [
    {
        title: 'Instagram',
        description: 'REGULAR UPDATES ON',
        href: '#'
    },
    {
        title: 'Twitter',
        description: 'WORD TALKS',
        href: '#'
    },
    {
        title: 'Dribbble',
        description: 'SINGLE SHOTS',
        href: '#'
    },
    {
        title: 'Behance',
        description: 'COMPLETE PROJECTS',
        href: '#'
    }
];


const FashionStudioFooter = () => {

    return (
        <footer className="tp-footer-15-area pt-140">
            <div className="container container-1230">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="tp-footer-15-cta-wrap mb-100">
                            <div className="tp-about-5-title-box text-center p-relative">
                                <span className="tp-about-5-subtitle">
                                    GET TO <br /> X <br /> KNOW ME
                                </span>
                                <h2 className="tp-section-title-5 fs-140 tp-char-animation">
                                    <em>Find me</em>{" "}
                                    <span className="d-none d-md-inline-block">
                                        <Image src={aboutImg} alt="About me" className="img-fluid" />
                                    </span>
                                    <br />
                                    <span>in the best suites</span>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>

                <SocialLinks links={socialLinks} />
            </div>
            {/* Instagram Gallery Component */}
            <div className="container container-1350">
                <div className="tp-footer-15-instagram-wrap">
                    <div className="row">
                        {instagramImages.map((image, index) => (
                            <div key={index} className="col-xl-3 col-lg-3 col-md-6">
                                <div className="tp-footer-15-instagram-thumb fix mb-30">
                                    <Link href="#">
                                        <Image src={image} alt={`Instagram post ${index + 1}`} className="img-fluid" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Footer Copyright Component */}
            <FashionCopyright />
        </footer>
    );
};

// Social Links Component
const SocialLinks = ({ links }: { links: typeof socialLinks }) => (
    <div className="row justify-content-center">
        <div className="col-xl-10">
            <div className="tp-footer-15-social-wrap mb-100 d-flex align-items-center justify-content-between">
                {links.map((link, index) => (
                    <div key={index} className="tp-footer-15-social">
                        <span>{link.description}</span>
                        <Link className="d-flex align-items-center" href={link.href}>
                            {link.title}
                            <span>
                                <ArrowThirteen pathValue='M1 13L13 1' pathValueTwo='M1 1H13V13' />
                                <ArrowThirteen pathValue='M1 13L13 1' pathValueTwo='M1 1H13V13' />
                            </span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default FashionStudioFooter;
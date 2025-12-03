
import { StaticImageData } from 'next/image';
import sliderImg1 from '../../public/assets/img/home-14/slider/text-slider.svg';
import sliderImg2 from '../../public/assets/img/home-14/slider/text-slider.svg';
import sliderImg3 from '../../public/assets/img/home-14/slider/text-slider.svg';
import sliderImg4 from '../../public/assets/img/home-14/slider/text-slider.svg';
import sliderImg5 from '../../public/assets/img/home-14/slider/text-slider.svg';

interface brandDT {
    id: number;
    title: string;
    icon?: StaticImageData;
    iconFill?: string
}
// home personal portfolio data start
export const portfolioTextSlideData: brandDT[] = [
    {
        id: 1,
        title: 'Teaming up with ambitious agencies',
        icon: sliderImg1
    },
    {
        id: 2,
        title: 'Currently working Independently',
        icon: sliderImg2
    },
    {
        id: 3,
        title: 'Teaming up with ambitious agencies',
        icon: sliderImg3
    },
    {
        id: 4,
        title: 'Open to projects and Partnerships',
        icon: sliderImg4
    },
    {
        id: 5,
        title: 'Teaming up with ambitious agencies',
        icon: sliderImg5
    },
    {
        id: 6,
        title: 'Currently working Independently',
        icon: sliderImg2
    },
    {
        id: 7,
        title: 'Teaming up with ambitious agencies',
        icon: sliderImg3
    },
];

export const portfolioBrandSlideData: brandDT[] = [
    { id: 1, title: 'E-commerce', iconFill: '#FFF669' },
    { id: 2, title: 'Landing page', iconFill: '#FFF669' },
    { id: 3, title: 'Social network', iconFill: '#FFF669' },
    { id: 4, title: 'Blog', iconFill: '#FFF669' },
    { id: 5, title: 'Corporate website', iconFill: '#FFF669' },
    { id: 6, title: 'Dashboard', iconFill: '#FFF669' },
    { id: 7, title: 'Landing page', iconFill: '#FFF669' },
    { id: 8, title: 'Social network', iconFill: '#FFF669' },
    { id: 9, title: 'Blog', iconFill: '#FFF669' },
    { id: 10, title: 'Landing page', iconFill: '#FFF669' },
    { id: 11, title: 'Social network', iconFill: '#FFF669' },
    { id: 12, title: 'Blog', iconFill: '#FFF669' },
    { id: 13, title: 'Corporate website', iconFill: '#FFF669' },
];
// home personal portfolio data end
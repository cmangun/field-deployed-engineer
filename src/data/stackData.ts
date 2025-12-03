import stackShape from '../../public/assets/img/home-10/stack/stack-shape-1.png';
import stackShapeTwo from '../../public/assets/img/home-10/stack/stack-shape-2.png';
import stackRound from '../../public/assets/img/home-10/stack/stack-round.png';
import stackPhone from '../../public/assets/img/home-10/stack/stack-phone.png';
import stackMan from '../../public/assets/img/home-10/stack/stack-man.png';
import { ServiceItem } from '@/types/custom-d-t';

const stackData: ServiceItem[] = [
    {
        id: 1,
        subtitle: "Data dashboard",
        number: "01",
        title: "Easy to manage your all app data.",
        description: "Lorem ipsum is simply printing typesetting industry industry's standard dummy text printer scrambled ipsum is simply dummy text of the printing.",
        link: "/service-details-light",
        linkText: "Read more",
        bgColor: "#f7f7fd",
        stackColorClass: "dark-stack-color",
        images: [
            { src: stackRound, alt: "stack-round", offset: -4.5, className: "" },
            { src: stackMan, alt: "stack-man", offset: 5, className: "shape-1" },
            { src: stackPhone, alt: "stack-phone", offset: -4, className: "shape-2" },
            { src: stackShape, alt: "stack-shape", offset: 3, className: "shape-3" },
            { src: stackShapeTwo, alt: "stack-shape", offset: 2, className: "shape-4" }
        ]
    },
    {
        id: 2,
        subtitle: "Data dashboard",
        number: "02",
        title: "Easy book trips easy payment.",
        description: "Lorem ipsum is simply printing typesetting industry industry's standard dummy text printer scrambled ipsum is simply dummy text of the printing.",
        link: "/service-details-light",
        linkText: "Read more",
        bgColor: "",
        stackColorClass: "",
        images: [
            { src: stackRound, alt: "stack-round", offset: -4.5, className: "" },
            { src: stackMan, alt: "stack-man", offset: 5, className: "shape-1" },
            { src: stackPhone, alt: "stack-phone", offset: -4, className: "shape-2" },
            { src: stackShape, alt: "stack-shape", offset: 3, className: "shape-3" },
            { src: stackShapeTwo, alt: "stack-shape", offset: 2, className: "shape-4" }
        ]
    },
    {
        id: 3,
        subtitle: "Data dashboard",
        number: "03",
        title: "Easy to manage your all app data.",
        description: "Lorem ipsum is simply printing typesetting industry industry's standard dummy text printer scrambled ipsum is simply dummy text of the printing.",
        link: "/service-details-light",
        linkText: "Read more",
        bgColor: "#f7f7fd",
        stackColorClass: "dark-stack-color",
        images: [
            { src: stackRound, alt: "stack-round", offset: -4.5, className: "" },
            { src: stackMan, alt: "stack-man", offset: 5, className: "shape-1" },
            { src: stackPhone, alt: "stack-phone", offset: -4, className: "shape-2" },
            { src: stackShape, alt: "stack-shape", offset: 3, className: "shape-3" },
            { src: stackShapeTwo, alt: "stack-shape", offset: 2, className: "shape-4" }
        ]
    }
];
export default stackData;
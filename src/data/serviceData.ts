
import { BrandingIcon, BusinessConsultationIcon, BusinessGrowthIcon, ChartIcon, ExpertSupportIcon, HexagonIcon, ImageQualityIcon, LayersIcon, LightningBoltIcon, ProfessionalBusinessIcon, ReliableWxpertIcon, ShieldIcon, ShoppingCartIcon, UIUXDesignIcon, WebDevelopmentIcon } from "@/svg/ServiesIcons";
import service1 from "../../public/assets/img/home-01/service/service-1.jpg";
import service2 from "../../public/assets/img/home-01/service/service-2.jpg";
import service3 from "../../public/assets/img/home-01/service/service-3.jpg";
import service4 from "../../public/assets/img/home-01/service/service-4.jpg";
import { servicesDT } from "@/types/service-d-t";
//home-5 design agency light service image
import service5 from '../../public/assets/img/home-05/service/service-1.jpg';
import service6 from '../../public/assets/img/home-05/service/service-2.jpg';
import service7 from '../../public/assets/img/home-05/service/service-3.jpg';
import service8 from '../../public/assets/img/home-05/service/service-4.jpg';
//home-6 Creative agency light service image
import service9 from '../../public/assets/img/home-06/service/service-1.jpg';
import service10 from '../../public/assets/img/home-06/service/service-2.jpg';
import service11 from '../../public/assets/img/home-06/service/service-3.jpg';
import service12 from '../../public/assets/img/home-06/service/service-4.jpg';
import service13 from '../../public/assets/img/home-06/service/service-5.jpg';
import service14 from '../../public/assets/img/home-06/service/service-6.jpg';
//home-5 IT Solution service icon
import icon1 from '../../public/assets/img/home-11/feature/icon-1.png';
import icon2 from '../../public/assets/img/home-11/feature/icon-2.png';
import icon3 from '../../public/assets/img/home-11/feature/icon-3.png';
import icon4 from '../../public/assets/img/home-11/feature/icon-4.png';
import icon5 from '../../public/assets/img/home-11/feature/icon-5.png';
//home startup agency service image
import stService1 from '../../public/assets/img/home-12/service/st-service-1.jpg';
import stService2 from '../../public/assets/img/home-12/service/st-service-2.jpg';
import stService3 from '../../public/assets/img/home-12/service/st-service-3.jpg';
import stService4 from '../../public/assets/img/home-12/service/st-service-4.jpg';
//inner service-1 images
import service15 from '../../public/assets/img/inner-service/service-3.jpg';
import service16 from '../../public/assets/img/inner-service/service-4.jpg';
import service17 from '../../public/assets/img/inner-service/service-1.jpg';
import service18 from '../../public/assets/img/inner-service/service-2.jpg';
import service19 from '../../public/assets/img/inner-service/service-5.jpg';
import service20 from '../../public/assets/img/inner-service/service-6.jpg';
import service21 from '../../public/assets/img/inner-service/service-7.jpg';
import service22 from '../../public/assets/img/inner-service/service-8.jpg';

const servicesData: servicesDT[] = [
    //Home main services data start
    {
        id: 1,
        title: "Web Design",
        image: service1,
        description: "Whether you need stunning visuals for your website, captivating graphics for your marketing materials, or innovative UI/UX designs for your app, our team of experts is here to turn your vision into reality.",
        categories: ["UX Design", "User Testing", "Motion Design", "Product Prototype"],
        link: "/service-details-light",
    },
    {
        id: 2,
        title: "Product Design",
        image: service2,
        description: "Our product design services focus on creating intuitive and aesthetically pleasing products that resonate with your audience and stand out in the market.",
        categories: ["UX Design", "User Testing", "Product Prototype", "Mobile UI", "Software UI design", "Web app design"],
        link: "/service-details-light",
    },
    {
        id: 3,
        title: "Web Development",
        image: service3,
        description: "From website development and e-commerce platforms to custom software and mobile apps, our development team has the expertise to bring your ideas to life.",
        categories: ["UX Design", "Frontend", "Backend", "E-commerce", "No Code / Low Code"],
        link: "/service-details-light",
    },
    {
        id: 4,
        title: "Branding",
        image: service4,
        description: "It's the core of your company's identity. It guides all business decisions, ensuring a consistent and impactful presence in the market.",
        categories: ["Research & Insights", "Unique Ways", "Value Proposition", "Naming", "Verbal Identity"],
        link: "/service-details-light",
    },
    //Home main services data end
    //Home two services data start
    {
        id: 5,
        title: "SEO Marketing",
        description: "We immerse ourselves in your issues and we put our knowledge and expertise at your service",
        link: "/service-details-light",
    },
    {
        id: 6,
        title: "Social Marketing",
        description: "We immerse ourselves in your issues and we put our knowledge and expertise at your service",
        link: "/service-details-light",
    },
    {
        id: 7,
        title: "Content Marketing",
        description: "We immerse ourselves in your issues and we put our knowledge and expertise at your service",
        link: "/service-details-light",
    },
    {
        id: 8,
        title: "Email Marketing",
        description: "We immerse ourselves in your issues and we put our knowledge and expertise at your service",
        link: "/service-details-light",
    },
    //Home two services data end
    {
        id: 9,
        title: "Branding",
        categories: ["Logo design", "Brand Guidelines", "Visual Identity", "Custom Emails", "Presentations"],
        link: "/service-details-2-light",
    },
    {
        id: 10,
        title: "Identity",
        categories: ["Logo design", "Brand Guidelines", "Visual Identity", "Custom Emails", "Presentations"],
        link: "/service-details-2-light",
    },
    {
        id: 11,
        title: "Impact",
        categories: ["Logo design", "Brand Guidelines", "Visual Identity", "Custom Emails", "Presentations"],
        link: "/service-details-2-light",
    },
    // home five design agency light data start
    {
        id: 12,
        slug: 'collapseOne',
        number: '01',
        title: 'mobile app',
        image: service5,
        description: "Our goal is your brand's wild influence. Exclusive logos, mockups, and corporate identities make your unique value stand out.",
        categories: ['Logo design', 'Brand Guidelines', 'Visual Identity', 'Presentations'],
        isExpanded: true,
        link: "/service-details-2-light",
    },
    {
        id: 13,
        slug: 'collapseTwo',
        number: '02',
        title: 'branding',
        image: service6,
        description: "Our goal is your brand's wild influence. Exclusive logos, mockups, and corporate identities make your unique value stand out.",
        categories: ['Logo design', 'Brand Guidelines', 'Visual Identity', 'Presentations'],
        isExpanded: false,
        link: "/service-details-2-light",
    },
    {
        id: 14,
        slug: 'collapseThree',
        number: '03',
        title: 'ux design',
        image: service7,
        description: "Our goal is your brand's wild influence. Exclusive logos, mockups, and corporate identities make your unique value stand out.",
        categories: ['Logo design', 'Brand Guidelines', 'Visual Identity', 'Presentations'],
        isExpanded: false,
        link: "/service-details-2-light",
    },
    {
        id: 15,
        slug: 'collapseFour',
        number: '04',
        title: 'development',
        image: service8,
        description: "Our goal is your brand's wild influence. Exclusive logos, mockups, and corporate identities make your unique value stand out.",
        categories: ['Logo design', 'Brand Guidelines', 'Visual Identity', 'Presentations'],
        isExpanded: false,
        link: "/service-details-2-light",
    },
    // home five design agency light data end

    // home Six Creative agency light data start
    {
        id: 16,
        number: '01',
        title: 'mobile app',
        image: service9,
        link: "/service-details-2-light",
    },
    {
        id: 17,
        number: '02',
        title: 'UI / ux design',
        image: service10,
        link: "/service-details-2-light",
    },
    {
        id: 18,
        number: '03',
        title: '3D Modeling Services',
        image: service11,
        link: "/service-details-2-light",
    },
    {
        id: 19,
        number: '04',
        title: 'Creative Direction',
        image: service12,
        link: "/service-details-2-light",
    },
    {
        id: 20,
        number: '05',
        title: 'WEB Development',
        image: service13,
        link: "/service-details-2-light",
    },
    {
        id: 21,
        number: '06',
        title: 'Brand Identity',
        image: service14,
        link: "/service-details-2-light",
    },
    // home Six Creative agency light data end
    // home eight Unique Ai Image light data start
    {
        id: 22,
        svgIcon: ExpertSupportIcon,
        title: "Expert Support",
        description: "Our team has the expertise to help you achieve.",
        delay: ".3",
        link: "/service-details-2-light",
    },
    {
        id: 23,
        svgIcon: ReliableWxpertIcon,
        title: "Reliable Experts",
        description: "Our team has the expertise to help you achieve.",
        delay: ".5",
        link: "/service-details-2-light",
    },
    {
        id: 24,
        svgIcon: ImageQualityIcon,
        title: "Image Quality",
        description: "Our team has the expertise to help you achieve.",
        delay: ".7",
        link: "/service-details-2-light",
    },
    // home eight Unique Ai Image light data start
    {
        id: 25,
        delay: ".3",
        svgIcon: BusinessConsultationIcon,
        title: "Business Consultation",
        description: "Lorem ipsum dolor sit amet, conse ctetur sadipiscing elit, sed dominus eiusmc od tempor omincid idu nt ut labore et dolore magna aliqua.",
        link: "/service-details-2-light",
    },
    {
        id: 26,
        delay: ".5",
        svgIcon: ProfessionalBusinessIcon,
        title: "Professional Business",
        description: "Lorem ipsum dolor sit amet, conse ctetur sadipiscing elit, sed dominus eiusmc od tempor omincid idu nt ut labore et dolore magna aliqua.",
        link: "/service-details-2-light",
    },
    {
        id: 27,
        delay: ".7",
        svgIcon: BusinessGrowthIcon,
        title: "Business Growth",
        description: "Lorem ipsum dolor sit amet, conse ctetur sadipiscing elit, sed dominus eiusmc od tempor omincid idu nt ut labore et dolore magna aliqua.",
        link: "/service-details-2-light",
    },
    // home nine Corporate Agency light data start

    //home twelve IT Solution feature data start
    {
        id: 28,
        title: "IT Consultation",
        image: icon1,
        description: "Trust our top minds to eliminate workflow pain points, implement new tech & app.",
        categories: ["Strategy", "Consultation", "Management"],
        colorClass: "color-1",
        delay: ".3",
        link: "/service-details-light",
    },
    {
        id: 29,
        title: "Data Security",
        image: icon2,
        description: "Trust our top minds to eliminate workflow pain points, implement new tech & app.",
        categories: ["Management", "Backup & Recovery", "Transfer"],
        colorClass: "color-2",
        delay: ".5",
        link: "/service-details-light",
    },
    {
        id: 30,
        title: "IT Consultation",
        image: icon3,
        description: "Trust our top minds to eliminate workflow pain points, implement new tech & app.",
        categories: ["Strategy", "Consultation", "Management"],
        colorClass: "color-3",
        delay: ".7",
        link: "/service-details-light",
    },
    {
        id: 31,
        title: "Cloud Services",
        image: icon4,
        description: "Trust our top minds to eliminate workflow pain points, implement new tech & app.",
        categories: ["Cloud Storerage", "Hosting & VPS"],
        colorClass: "color-4",
        delay: ".3",
        link: "/service-details-light",
    },
    {
        id: 32,
        title: "UI/UX Design",
        image: icon5,
        description: "Trust our top minds to eliminate workflow pain points, implement new tech & app.",
        categories: ["Website", "Landing Page", "Mobile App"],
        colorClass: "color-5",
        delay: ".5",
        link: "/service-details-light",
    },
    //home twelve service feature data end

    //Home Crypto Currency Service data start
    {
        id: 33,
        svgIcon: ShoppingCartIcon,
        title: "Buy & Sell Cryptocurrency",
        description: "Buy and sell cryptocurrencies quickly & securely our trusted platform.",
        link: "/service-details-2-light",
    },
    {
        id: 34,
        svgIcon: LightningBoltIcon,
        title: "Advanced Crypto Trading",
        description: "Take your trading to the next level with our powerful, high-speed",
        link: "/service-details-2-light",
    },
    {
        id: 35,
        svgIcon: ShieldIcon,
        title: "Secure Crypto Wallet",
        description: "Your assets are protected with multi layer encryption.",
        link: "/service-details-2-light",
    },
    {
        id: 36,
        svgIcon: LayersIcon,
        title: "Staking & Passive Income",
        description: "Earn rewards on your crypto holdings by staking with our secure",
        link: "/service-details-2-light",
    },
    {
        id: 37,
        svgIcon: ChartIcon,
        title: "Of-Ramp Solutions",
        description: "All withdrawals are protected with industry leading encryption",
        link: "/service-details-2-light",
    },
    {
        id: 38,
        svgIcon: HexagonIcon,
        title: "Blockchain integration",
        description: "Deposit your crypto into liquidity pools and earn interest on your assets.",
        link: "/service-details-2-light",
    },

    //Home Crypto Currency Service data end

    //Home Startup Agency Service data start
    {
        id: 39,
        title: 'DEVELOPMENT',
        image: stService1,
        categories: [
            'UX Design', 'User Testing', 'Product Prototype', 'Mobile UI', 'Web app design',
            'UX Design', 'User Testing', 'Product Prototype', 'Mobile UI', 'Web app design',
            'UX Design', 'User Testing', 'Product Prototype', 'Mobile UI', 'Web app design'
        ],
        link: "/service-details-light",
    },
    {
        id: 40,
        title: 'MARKETING',
        image: stService2,
        categories: [
            'UX Design', 'User Testing', 'Product Prototype', 'Mobile UI', 'Web app design',
            'UX Design', 'User Testing', 'Product Prototype', 'Mobile UI', 'Web app design',
            'UX Design', 'User Testing', 'Product Prototype', 'Mobile UI', 'Web app design'
        ],
        link: "/service-details-light",
    },
    {
        id: 41,
        title: 'GRAPHICS',
        image: stService3,
        categories: [
            'UX Design', 'User Testing', 'Product Prototype', 'Mobile UI', 'Web app design',
            'UX Design', 'User Testing', 'Product Prototype', 'Mobile UI', 'Web app design',
            'UX Design', 'User Testing', 'Product Prototype', 'Mobile UI', 'Web app design'
        ],
        link: "/service-details-light",
    },
    {
        id: 42,
        title: 'TECHNOLOGY',
        image: stService4,
        categories: [
            'UX Design', 'User Testing', 'Product Prototype', 'Mobile UI', 'Web app design',
            'UX Design', 'User Testing', 'Product Prototype', 'Mobile UI', 'Web app design',
            'UX Design', 'User Testing', 'Product Prototype', 'Mobile UI', 'Web app design'
        ],
        link: "/service-details-light",
    },
    //Home Startup Agency Service data end

    //service data for service-1 inner page
    {
        id: 43,
        title: 'Branding',
        spacingCls:"mb-200",
        text: [
            'Strong branding sets your startup apart, signaling quality and professionalism.',
            'It builds trust with your audience, making you stand out in a crowded market.'
        ],
        categories: [
            'Brand Naming',
            'Creative Direction',
            'Brand Strategy',
            'Graphic charter',
            'Logo Design'
        ],
        images: [service15, service16],
        link: "/service-details-2-light"
    },
    {
        id: 44,
        title: 'Digital Design',
        spacingCls:"mb-200",
        text: [
            'A process of assumption & validation with a goal of taking into account all the necessary variables, which are always custom and are to be uncovered',
            'Every business has digital potential, and we are here to help you leverage that potential.'
        ],
        categories: [
            'Wireframe',
            'UI design',
            'Prototyping',
            'Design system',
            'UI & UX audit',
            'Design System',
            'Interactive Experiences'
        ],
        images: [service17, service18],
        link: "/service-details-2-light"
    },
    {
        id: 45,
        title: 'Marketing Assets',
        spacingCls:"mb-200",
        text: [
            'Marketing strategy is proudly responsible for the half of a campaign\'s success, another half relies solely on its implementation.',
            'We focus on creating visuals that communicate your value and engage your audience.'
        ],
        categories: [
            'Animated logos',
            'Product Illustrations',
            'Launch Videos',
            'Illustrations',
            'Visual Effects',
            'Illustration 3D'
        ],
        images: [service19, service20],
        link: "/service-details-2-light"
    },
    {
        id: 46,
        title: 'Development',
        spacingCls:"",
        text: [
            'Efficiency and scalability. The two factors which any decision gets filtered out with - programming language, framework, library, each line of code, and server side'
        ],
        categories: [
            'Integration',
            'Front-end',
            'Back-end',
            'Webflow'
        ],
        images: [service21, service22],
        link: "/service-details-2-light"
    },
    //service four inner page service data
    {
        id: 47,
        title: 'Branding Design',
        description: "It's the core of your company's identity. It guides all business.",
        svgIcon: BrandingIcon,
        link: '/service-details-light'
    },
    {
        id: 48,
        title: 'UI/UX Design',
        description: "It's the core of your company's identity. It guides all business.",
        svgIcon: UIUXDesignIcon,
        link: '/service-details-light'
    },
    {
        id: 49,
        title: 'Web Development',
        description: "It's the core of your company's identity. It guides all business.",
        svgIcon: WebDevelopmentIcon,
        link: '/service-details-light'
    },
    {
        id: 50,
        title: 'Branding Design',
        description: "It's the core of your company's identity. It guides all business.",
        svgIcon: BrandingIcon,
        link: '/service-details-light'
    },
    {
        id: 51,
        title: 'UI/UX Design',
        description: "It's the core of your company's identity. It guides all business.",
        svgIcon: UIUXDesignIcon,
        link: '/service-details-light'
    },
    //Service details two data
    {
        id: 52,
        svgIcon: BrandingIcon,
        title: "Brand strategy and positioning",
        link: "/service-details-2-light",
        delay: ".3",
        categories: [
            "+ Brand Discovery",
            "+ Brand Voice & Messaging",
            "+ Brand Positioning Strategy"
        ]
    },
    {
        id: 53,
        svgIcon: UIUXDesignIcon,
        title: "Logo & Visual Identity",
        titleBr: ["Logo & Visual", "Identity"],
        link: "/service-details-2-light",
        delay: ".5",
        categories: [
            "+ Custom Logo Design",
            "+ Color Palette & Typography",
            "+ Iconography & Graphic Assets"
        ]
    },
    {
        id: 54,
        svgIcon: WebDevelopmentIcon,
        title: "Rebranding & Brand Refresh",
        titleBr: ["Rebranding & Brand", "Refresh"],
        link: "/service-details-2-light",
        delay: ".7",
        categories: [
            "+ Brand Audit & Analysis",
            "+ Visual & Messaging",
            "+ Market Repositioning"
        ]
    }
];

export default servicesData;
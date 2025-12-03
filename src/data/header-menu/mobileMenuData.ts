import menuThumb from "../../../public/assets/img/menu/menu-1.png";
import { StaticImageData } from "next/image";

// Define types for our menu data
interface MenuLink {
    title: string;
    link: string;
    badge?: string;
}

interface SubMenuItem extends MenuLink {
    submenu?: MenuLink[];
}

interface MenuColumn {
    title: string;
    links: MenuLink[];
}

interface MenuItem {
    id: number;
    title: string;
    link: string;
    megaMenu: boolean;
    columns?: MenuColumn[];
    submenu?: SubMenuItem[];
    image?: {
        src: StaticImageData;
        alt: string;
    };
}

// Menu data structure
const mobileMenuData: MenuItem[] = [
    {
        id: 1,
        title: "Demo",
        link: "/",
        megaMenu: true,
        columns: [
            {
                title: "Home Light Version",
                links: [
                    { title: "Modern Agency", link: "/", badge: "Popular" },
                    { title: "Design Studio", link: "/design-studio" },
                    { title: "Digital Marketing", link: "/digital-marketing", badge: "Trending" },
                    { title: "Creative Studio", link: "/creative-studio" },
                    { title: "Design Agency", link: "/design-agency" },
                    { title: "Creative Agency", link: "/creative-agency" },
                    { title: "Architecture Hub", link: "/architecture-hub", badge: "Hot" },
                    { title: "AI Image Genaretor", link: "/unique-ai-image" }
                ]
            },
            {
                title: "Home Light Version",
                links: [
                    { title: "Corporate Agency", link: "/corporate-agency" },
                    { title: "Mobile App", link: "/mobile-application", badge: "Popular" },
                    { title: "IT Solutions", link: "/it-solution", badge: "Hot" },
                    { title: "Cryptocurrency", link: "/cryptocurrency" },
                    { title: "Startup Agency", link: "/startup-agency", badge: "Popular" },
                    { title: "Fashion Studio", link: "/fashion-studio" },
                    { title: "Personal Portfolio", link: "/personal-portfolio" },
                    { title: "Shop Home", link: "/shop-modern", badge: "Hot", }
                ]
            },
            {
                title: "Showcases",
                links: [
                    { title: "Webgl Showcase", link: "/portfolio-webgl-showcase", badge: "Hot" },
                    { title: "Coverflow Slider", link: "/portfolio-coverflow-slider-light" },
                    { title: "Creative Thumb Slider", link: "/portfolio-creative-thumb-slider", badge: "Hot" },
                    { title: "Creative Skew Slider", link: "/portfolio-creative-skew-slider", badge: "Hot" },
                    { title: "Creative Text Slider", link: "/portfolio-creative-text-slider" },
                    { title: "Parallax Slider", link: "/portfolio-parallax-slider" },
                    { title: "Perspective Showcase", link: "/portfolio-perspective-slider-light", badge: "Hot" },
                    { title: "Horizontal Showcase", link: "/portfolio-horizontal-showcase-light" }
                ]
            },
            {
                title: "Showcases",
                links: [
                    { title: "Wrapper Slider", link: "/portfolio-wrapper-slider", badge: "Hot" },
                    { title: "Portfolio slicer", link: "/portfolio-slicer-light", badge: "Hot" },
                    { title: "Portfolio Showcase", link: "/portfolio-showcase-light" },
                    { title: "Brand Showcase", link: "/brand-showcase-light" },
                    { title: "Interactive with hover", link: "/portfolio-interactive-with-hover", badge: "Hot" },
                    { title: "Interactive with Scroll", link: "/portfolio-interactive-with-scroll" },
                    { title: "Slider Elegant", link: "/portfolio-slider-elegant-light" }
                ]
            }
        ]
    },
    {
        id: 2,
        title: "Pages",
        link: "#",
        megaMenu: true,
        columns: [
            {
                title: "About Light Version",
                links: [
                    { title: "About Me", link: "/about-me-light" },
                    { title: "About Us", link: "/about-us-light" },
                    { title: "Modern About", link: "/about-modern-light" },
                    { title: "Creative About", link: "/about-creative-light" },
                    { title: "Startup About", link: "/about-startup-light" },
                    { title: "Career", link: "/career-light" }
                ]
            },
            {
                title: "Services Light Version",
                links: [
                    { title: "Services", link: "/service-1-light" },
                    { title: "Corporate Services", link: "/service-2-light" },
                    { title: "Startup Services", link: "/service-3-light" },
                    { title: "Modern Services", link: "/service-4-light" },
                    { title: "Services Details", link: "/service-details-light" },
                    { title: "Services Details 02", link: "/service-details-2-light" }
                ]
            },
            {
                title: "Special Pages Light",
                links: [
                    { title: "Careers Details", link: "/career-details-light" },
                    { title: "Pricing", link: "/pricing-light" },
                    { title: "Team", link: "/team-light" },
                    { title: "Team Details", link: "/team-details-light" },
                    { title: "FAQ's", link: "/faq-light" },
                    { title: "404 Page", link: "/error-light" }
                ]
            }
        ]
    },
    {
        id: 3,
        title: "Projects",
        link: "/portfolio-metro-light",
        megaMenu: true,
        columns: [
            {
                title: "Portfolio Grid",
                links: [
                    { title: "Two Columns", link: "/portfolio-col-2-light" },
                    { title: "Three Columns", link: "/portfolio-col-3-light" },
                    { title: "Four Columns Wide", link: "/portfolio-col-4-light" },
                    { title: "Masonry", link: "/portfolio-masonry-light" },
                    { title: "Portfolio Metro", link: "/portfolio-metro-light" },
                    { title: "Portfolio Pinterest", link: "/portfolio-pinterest-light" },
                    { title: "Horizontal Showcase", link: "/portfolio-horizontal-showcase-light" }
                ]
            },
            {
                title: "Showcases",
                links: [
                    { title: "Webgl Showcase", link: "/portfolio-webgl-showcase" },
                    { title: "Coverflow Slider", link: "/portfolio-coverflow-slider-light" },
                    { title: "Creative Thumb Slider", link: "/portfolio-creative-thumb-slider" },
                    { title: "Creative Skew Slider", link: "/portfolio-creative-skew-slider" },
                    { title: "Creative Text Slider", link: "/portfolio-creative-text-slider" },
                    { title: "Parallax Slider", link: "/portfolio-parallax-slider" },
                    { title: "Perspective Showcase", link: "/portfolio-perspective-slider-light" }
                ]
            },
            {
                title: "Showcases",
                links: [
                    { title: "Wrapper Slider", link: "/portfolio-wrapper-slider" },
                    { title: "Portfolio slicer", link: "/portfolio-slicer-light" },
                    { title: "Portfolio Showcase", link: "/portfolio-showcase-light" },
                    { title: "Brand Showcase", link: "/brand-showcase-light" },
                    { title: "Interactive with hover", link: "/portfolio-interactive-with-hover" },
                    { title: "Interactive with Scroll", link: "/portfolio-interactive-with-scroll" },
                    { title: "Slider Elegant", link: "/portfolio-slider-elegant-light" }
                ]
            },
            {
                title: "Single Projects",
                links: [
                    { title: "Classic Stack", link: "/portfolio-details-classic-stack-light" },
                    { title: "Creative Slider", link: "/portfolio-details-creative-slider-light" },
                    { title: "Gallery", link: "/portfolio-details-gallery-light" },
                    { title: "Modern", link: "/portfolio-details-modern-light" },
                    { title: "Video", link: "/portfolio-details-video-light" },
                    { title: "Image Comparison", link: "/portfolio-details-image-comparison-light" },
                ]
            }
        ],
        image: {
            src: menuThumb,
            alt: "menu thumb"
        }
    },
    {
        id: 4,
        title: "Blog",
        link: "/blog-list-light",
        megaMenu: false,
        submenu: [
            { title: "Blog Classic Light", link: "/blog-standard-light" },
            { title: "Blog Listing Light", link: "/blog-list-light" },
            {
                title: "Grid Layout",
                link: "/blog-grid",
                submenu: [
                    { title: "2 Columns Light", link: "/blog-grid-2-col-light" },
                    { title: "3 Columns Light", link: "/blog-grid-light" },
                    { title: "2 Col + sidebar Light", link: "/blog-grid-with-sidebar-light" }
                ]
            },
            { title: "Masonry Grid Light", link: "/blog-masonry-light" },
            {
                title: "Single Layouts",
                link: "/blog-details-without-sidebar",
                submenu: [
                    { title: "Blog Single Post Light", link: "/blog-details-light" },
                    { title: "Blog No Sidebar Light", link: "/blog-details-without-sidebar-light" }
                ]
            }
        ]
    },
    {
        id: 5,
        title: "Shop",
        link: "/shop-modern-light",
        megaMenu: false,
        submenu: [
            { title: "Shop Modern", link: "/shop-modern-light" },
            { title: "Shop With Slider", link: "/shop-with-slider-light" },
            {
                title: "Shop Page",
                link: "#",
                submenu: [
                    { title: "Shop Page", link: "/shop" },
                    { title: "Shop Details", link: "/shop-details" }
                ]
            },
            {
                title: "My Account",
                link: "#",
                submenu: [
                    { title: "My Account", link: "/my-account" },
                    { title: "Cart", link: "/cart" },
                    { title: "Checkout", link: "/checkout" },
                    { title: "Wishlist", link: "/wishlist" },
                    { title: "LogIn", link: "/login" },
                    { title: "Register", link: "/register" }
                ]
            }
        ]
    },
    {
        id: 6,
        title: "Contact",
        link: "/contact",
        megaMenu: false,
        submenu: [
            { title: "Contact Me", link: "/contact-me-light" },
            { title: "Contact Us", link: "/contact-us-light" },
            { title: "Get In Touch", link: "/contact" }
        ]
    }
];

export default mobileMenuData;
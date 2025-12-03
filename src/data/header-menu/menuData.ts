import { MenuItem } from "@/types/menu-d-t";
import MegaMenuThumb from "../../../public/assets/img/menu/menu-1.png";

const headerMenuData:MenuItem[] = [
  {
    id: 1,
    hasDropdown: true,
    active: true,
    megaMenu: true,
    children: true,
    title: "Blog Random Forest ",
    pluseIncon: true,
    link: "#",
    submenus: [
      {
        title: "Home Light Version",
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Modern Agency", link: "/", tag: "Popular", },
          { title: "Design Studio", link: "/design-studio" },
          { title: "Digital Marketing", link: "/digital-marketing", tag: "Trending" },
          { title: "Creative Studio", link: "/creative-studio" },
          { title: "Design Agency", link: "/design-agency" },
          { title: "Creative Agency", link: "/creative-agency" },
          { title: "Architecture Hub", link: "/architecture-hub", tag: "Hot" },
          { title: "AI Image Generator", link: "/unique-ai-image" }
        ]
      },
      {
        title: "Home Light Version",
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Corporate Agency", link: "/corporate-agency" },
          { title: "Mobile App", link: "/mobile-application", tag: "Popular" },
          { title: "IT Solutions", link: "/it-solution", tag: "Hot" },
          { title: "Cryptocurrency", link: "/cryptocurrency" },
          { title: "Startup Agency", link: "/startup-agency", tag: "Popular" },
          { title: "Fashion Studio", link: "/fashion-studio" },
          { title: "Personal Portfolio", link: "/personal-portfolio" },
          { title: "Shop Home", link: "/shop-modern", tag: "Hot", }
        ]
      },
      {
        title: "Showcases",
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Webgl Showcase", link: "/portfolio-webgl-showcase", tag: "Hot" },
          { title: "Coverflow Slider", link: "/portfolio-coverflow-slider-light" },
          { title: "Creative Thumb Slider", link: "/portfolio-creative-thumb-slider", tag: "Hot" },
          { title: "Creative Skew Slider", link: "/portfolio-creative-skew-slider", tag: "Hot" },
          { title: "Creative Text Slider", link: "/portfolio-creative-text-slider" },
          { title: "Parallax Slider", link: "/portfolio-parallax-slider" },
          { title: "Perspective Showcase", link: "/portfolio-perspective-slider-light", tag: "Hot" },
          { title: "Horizontal Showcase", link: "/portfolio-horizontal-showcase-light" }
        ]
      },
      {
        title: "Showcases",
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Wrapper Slider", link: "/portfolio-wrapper-slider", tag: "Hot" },
          { title: "Portfolio slicer", link: "/portfolio-slicer-light", tag: "Hot" },
          { title: "Portfolio Showcase", link: "/portfolio-showcase-light" },
          { title: "Brand Showcase", link: "/brand-showcase-light" },
          { title: "Interactive with hover", link: "/portfolio-interactive-with-hover", tag: "Hot" },
          { title: "Interactive with Scroll", link: "/portfolio-interactive-with-scroll" },
          { title: "Slider Elegant", link: "/portfolio-slider-elegant-light" }
        ]
      }
    ]
  },
  {
    id: 2,
    active: true,
    children: true,
    title: "Pages",
    pluseIncon: true,
    link: "#",
    smallMenu: true,
    submenus: [
      {
        title: "About Light Version",
        link: "#",
        pluseIncon: true,

        megaMenu: [
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
        link: "#",
        pluseIncon: true,
        megaMenu: [
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
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Careers Details", link: "/career-details-light" },
          { title: "Pricing", link: "/pricing-light" },
          { title: "Team", link: "/team-light" },
          { title: "Team Details", link: "/team-details-light" },
          { title: "FAQ's", link: "/faq-light" },
          { title: "404 Page", link: "/error-light" }
        ]
      },
    ]
  },
  {
    id: 3,
    hasDropdown: true,
    active: true,
    children: true,
    title: "Projects",
    pluseIncon: true,
    mediumMenu: true,
    link: "#",
    submenus: [
      {
        title: "Portfolio Grid",
        link: "#",
        pluseIncon: true,
        megaMenu: [
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
        link: "#",
        pluseIncon: true,
        megaMenu: [
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
        link: "#",
        pluseIncon: true,
        megaMenu: [
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
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Classic Stack", link: "/portfolio-details-classic-stack-light" },
          { title: "Creative Slider", link: "/portfolio-details-creative-slider-light" },
          { title: "Gallery", link: "/portfolio-details-gallery-light" },
          { title: "Modern", link: "/portfolio-details-modern-light" },
          { title: "Video", link: "/portfolio-details-video-light" },
          { title: "Image Comparison", link: "/portfolio-details-image-comparison-light" },
        ]
      }
    ],
    menuThumb: {
      title: "Mega Menu Thumb",
      link: "#",
      pluseIncon: true,
      isThumb: true,
      thumbSrc: MegaMenuThumb,
      thumbAlt: "Portfolio showcase"
    }
  },
  {
    id: 4,
    hasDropdown: true,
    active: true,
    megaMenu: false,
    children: true,
    title: "Blog",
    pluseIncon: true,
    link: "#",
    submenus: [
      {
        title: "Blog Classic Light",
        link: "/blog-standard-light",
        pluseIncon: false
      },
      {
        title: "Blog Listing Light",
        link: "/blog-list-light",
        pluseIncon: false
      },
      {
        title: "Grid Layout",
        link: "/blog-grid",
        pluseIncon: true,
        submenus: [
          { title: "2 Columns Light", link: "/blog-grid-2-col-light" },
          { title: "3 Columns Light", link: "/blog-grid-light" },
          { title: "2 Col + sidebar Light", link: "/blog-grid-with-sidebar-light" }
        ]
      },
      {
        title: "Masonry Grid Light",
        link: "/blog-masonry-light",
        pluseIncon: false
      },
      {
        title: "Single Layouts",
        link: "/blog-details-without-sidebar",
        pluseIncon: true,
        submenus: [
          { title: "Blog Single Post Light", link: "/blog-details-light" },
          { title: "Blog No Sidebar Light", link: "/blog-details-without-sidebar-light" }
        ]
      }
    ]
  },
  {
    id: 5,
    hasDropdown: true,
    active: true,
    megaMenu: false,
    children: true,
    title: "Shop",
    pluseIncon: true,
    link: "/shop-modern-light",
    submenus: [
      {
        title: "Shop Modern",
        link: "/shop-modern",
        pluseIncon: false
      },
      {
        title: "Shop With Slider",
        link: "/shop-with-slider-light",
        pluseIncon: false
      },
      {
        title: "Shop Page",
        link: "#",
        pluseIncon: true,
        submenus: [
          { title: "Shop Page", link: "/shop" },
          { title: "Shop Details", link: "/shop-details" },
        ]
      },
      {
        title: "My Account",
        link: "#",
        pluseIncon: true,
        submenus: [
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
    hasDropdown: true,
    active: true,
    megaMenu: false,
    children: true,
    title: "Contact",
    pluseIncon: true,
    link: "/contact",
    submenus: [
      {
        title: "Contact Me",
        link: "/contact-me-light",
        pluseIncon: false
      },
      {
        title: "Contact Us",
        link: "/contact-us-light",
        pluseIncon: false
      },
      {
        title: "Get In Touch",
        link: "/contact",
        pluseIncon: false
      },
    ]
  }
];
export default headerMenuData;


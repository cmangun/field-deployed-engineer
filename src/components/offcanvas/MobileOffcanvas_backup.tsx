import MobileMenus from "../../layouts/subComponents/MobileMenus";
import { usePathname } from "next/navigation";
import React from 'react';

type IProps = {
    openOffcanvas: boolean;
    setOpenOffcanvas: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileOffcanvas: React.FC<IProps> = ({ openOffcanvas, setOpenOffcanvas }) => {
    const pathName = usePathname();

    const darkPaths = [
        "/portfolio-wrapper-slider",
        "/portfolio-webgl-showcase",
        "/portfolio-creative-thumb-slider",
        "/portfolio-creative-skew-slider",
        "/portfolio-creative-text-slider",
        "/portfolio-parallax-slider",
        "/portfolio-showcase-light",
        "/portfolio-interactive-with-hover",
        "/portfolio-interactive-with-scroll",
    ];

    const isDarkPath = pathName && darkPaths.includes(pathName);

    return (
        <div className={`tp-offcanvas-2-area p-relative offcanvas-2-white-bg ${openOffcanvas ? "opened" : ""}`}>
            <div className="tp-offcanvas-2-bg is-left left-box"></div>
            <div className="tp-offcanvas-2-bg is-right right-box d-none d-md-block"></div>
            <div className="tp-offcanvas-2-wrapper">
                {/* LEFT PANEL - Menu only */}
                <div className="tp-offcanvas-2-left left-box">
                    <div className="tp-offcanvas-menu">
                        <nav>
                            <MobileMenus />
                        </nav>
                    </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="tp-offcanvas-2-right right-box d-none d-md-block p-relative">
                </div>
            </div>
        </div>
    );
};

export default MobileOffcanvas;

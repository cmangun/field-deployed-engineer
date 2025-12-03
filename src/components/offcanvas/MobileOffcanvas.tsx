import MobileMenus from "../../layouts/subComponents/MobileMenus";
import React, { useEffect } from 'react';

type IProps = {
    openOffcanvas: boolean;
    setOpenOffcanvas: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileOffcanvas: React.FC<IProps> = ({ openOffcanvas, setOpenOffcanvas }) => {
    // Add/remove body class when menu opens/closes
    useEffect(() => {
        if (openOffcanvas) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
        return () => {
            document.body.classList.remove('menu-open');
        };
    }, [openOffcanvas]);

    return (
        <>
            <style jsx>{`
                .offcanvas-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: #000;
                    z-index: 9998;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .offcanvas-overlay.opened {
                    opacity: 1;
                    visibility: visible;
                }
                .offcanvas-content {
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 100vh;
                    width: 100%;
                    max-width: 500px;
                    z-index: 9999;
                    overflow-y: auto;
                    transform: translateX(-40px);
                    opacity: 0;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    transition-delay: 0.1s;
                }
                .offcanvas-overlay.opened .offcanvas-content {
                    transform: translateX(0);
                    opacity: 1;
                }
                @media (max-width: 767px) {
                    .offcanvas-content {
                        max-width: 100%;
                    }
                }
            `}</style>
            <div className={`offcanvas-overlay ${openOffcanvas ? "opened" : ""}`}>
                <div className="offcanvas-content">
                    <MobileMenus />
                </div>
            </div>
        </>
    );
};

export default MobileOffcanvas;

import offcanvas1 from "../../../public/assets/img/offcanvas/offcanvas-1.jpg";
import offcanvas2 from "../../../public/assets/img/offcanvas/offcanvas-2.jpg";
import offcanvas3 from "../../../public/assets/img/offcanvas/offcanvas-3.jpg";
import offcanvas4 from "../../../public/assets/img/offcanvas/offcanvas-4.jpg";
import logoBlack from '../../../public/assets/img/logo/logo-black.png';
import logoWhite from '../../../public/assets/img/logo/logo-white.png';
import PhotoProviderWrapper from '../shared/PhotoProviderWrapper';
import { CrossIconTwo, DribbleTwo, InstagramSvg } from '@/svg';
import MainMobileMenu from "../../layouts/subComponents/MainMobileMenu";
import { BehanceTwoSvg } from "@/svg/social-icons/Behance";
import { YouTubeSvg } from "@/svg/social-icons/YouTube";
import { PhotoView } from 'react-photo-view';
import { ImageDT } from '@/types/custom-d-t';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const galleryImages: ImageDT[] = [
    { id: 1, imgSrc: offcanvas1 },
    { id: 2, imgSrc: offcanvas2 },
    { id: 3, imgSrc: offcanvas3 },
    { id: 4, imgSrc: offcanvas4 }
];

// prop type
type IProps = {
    openOffcanvas: boolean;
    setOpenOffcanvas: React.Dispatch<React.SetStateAction<boolean>>;
};


const OffCanvasPanel: React.FC<IProps> = ({ openOffcanvas, setOpenOffcanvas }) => {
    return (
        <>
            <div className={`tp-offcanvas-area ${openOffcanvas ? "opened" : ""}`}>
                <div className="tp-offcanvas-wrapper @@class offcanvas-white-bg">
                    <div className="tp-offcanvas-top d-flex align-items-center justify-content-between">
                        <div className="tp-offcanvas-logo">
                            <Link href="/">
                                <Image className="logo-1" width={120} src={logoBlack} alt="logo-black" />
                                <Image className="logo-2" width={120} src={logoWhite} alt="logo-white" />
                            </Link>
                        </div>
                        <div className="tp-offcanvas-close">
                            <button onClick={() => setOpenOffcanvas(false)} className="tp-offcanvas-close-btn">
                                <CrossIconTwo />
                            </button>
                        </div>
                    </div>
                    <div className="tp-offcanvas-main">
                        <div className="tp-offcanvas-content d-none d-xl-block">
                            <h3 className="tp-offcanvas-title">Hello There!</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, </p>
                        </div>
                        <div className="tp-offcanvas-menu d-xl-none">
                            <nav><MainMobileMenu /></nav>
                        </div>
                        <div className="tp-offcanvas-gallery d-none d-xl-block">
                            <div className="row gx-2">
                                <PhotoProviderWrapper>
                                    {galleryImages.map((image: ImageDT) => (
                                        <div className="col-md-3 col-3" key={image.id}>
                                            <div className="tp-offcanvas-gallery-img fix">
                                                <PhotoView src={image.imgSrc.src}>
                                                    <Image style={{ width: "100%", height: "auto" }} src={image.imgSrc} alt={`Gallery image${image.id}`} />
                                                </PhotoView>
                                            </div>
                                        </div>
                                    ))}
                                </PhotoProviderWrapper>
                            </div>
                        </div>
                        <div className="tp-offcanvas-contact">
                            <h3 className="tp-offcanvas-title sm">Information</h3>
                            <ul>
                                <li><Link href="tel:1245654">+ 4 20 7700 1007</Link></li>
                                <li><Link href="mailto:hello@diego.com">hello@diego.com</Link></li>
                                <li><Link href="#">Avenue de Roma 158b, Lisboa</Link></li>
                            </ul>
                        </div>
                        <div className="tp-offcanvas-social">
                            <h3 className="tp-offcanvas-title sm">Follow Us</h3>
                            <ul>
                                <li>
                                    <Link href="#"><InstagramSvg /></Link>
                                </li>
                                <li>
                                    <Link href="#"> <DribbleTwo /></Link>
                                </li>
                                <li>
                                    <Link href="#"><BehanceTwoSvg /></Link>
                                </li>
                                <li>
                                    <Link href="#"><YouTubeSvg /></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div onClick={() => setOpenOffcanvas(false)}
                className={`body-overlay ${openOffcanvas ? "opened" : ""}`}
            ></div>
        </>
    );
};

export default OffCanvasPanel;
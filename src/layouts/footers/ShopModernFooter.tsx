import ShopModernCopyright from './subComponents/ShopModernCopyright';
import Link from 'next/link';
import React from 'react';

const ShopModernFooter = () => {
    return (
        <footer>
            {/* -- footer area start -- */}
            <div className="tp-footer-area tp-footer-shop-style pt-60 pb-30" style={{ backgroundColor: "#4D3D30" }}>
                <div className="container-fluid p-0">
                    <div className="tp-footer-shop-top">
                        <div className="row gx-0">
                            <div className="col-lg-3 col-6">
                                <div className="tp-footer-shop-widget tp-footer-shop-col-1">
                                    <h4 className="tp-footer-shop-widget-title">STORE</h4>
                                    <ul>
                                        <li><Link className="tp-line-white" href="#">Home</Link></li>
                                        <li><Link className="tp-line-white" href="#">About</Link></li>
                                        <li><Link className="tp-line-white" href="#">Journal</Link></li>
                                        <li><Link className="tp-line-white" href="#">Contact</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-6">
                                <div className="tp-footer-shop-widget tp-footer-shop-col-1">
                                    <h4 className="tp-footer-shop-widget-title">SHOP</h4>
                                    <ul>
                                        <li><Link className="tp-line-white" href="#">All</Link></li>
                                        <li><Link className="tp-line-white" href="#">Lookbook</Link></li>
                                        <li><Link className="tp-line-white" href="#">Collections</Link></li>
                                        <li><Link className="tp-line-white" href="#">Featured</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-6">
                                <div className="tp-footer-shop-widget tp-footer-shop-col-1">
                                    <h4 className="tp-footer-shop-widget-title">COLLECTIONS</h4>
                                    <ul>
                                        <li><Link className="tp-line-white" href="#">Decors</Link></li>
                                        <li><Link className="tp-line-white" href="#">Furnitures</Link></li>
                                        <li><Link className="tp-line-white" href="#">Ceramic</Link></li>
                                        <li><Link className="tp-line-white" href="#">Lamps</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-6">
                                <div className="tp-footer-shop-widget tp-footer-shop-col-1">
                                    <h4 className="tp-footer-shop-widget-title">HELP</h4>
                                    <ul>
                                        <li><Link className="tp-line-white" href="#">Contact</Link></li>
                                        <li><Link className="tp-line-white" href="#">Login & Account</Link></li>
                                        <li><Link className="tp-line-white" href="#">Privacy Policy</Link></li>
                                        <li><Link className="tp-line-white" href="#">Refund policy</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tp-footer-shop-big-text">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="tp-hero-shop-title tp-char-animation">zonspace</h1>
                            </div>
                        </div>
                    </div>
                    {/*Footer copyright */}
                    <ShopModernCopyright />
                </div>
            </div>
            {/* -- footer area end -- */}

        </footer>
    );
};

export default ShopModernFooter;
import { getCurrentYear } from '@/utils/getCurrentYear';
import Link from 'next/link';
import React from 'react';

const ShopModernCopyright = () => {
    return (
        <div className="tp-footer-shop-copyright pt-20">
            <div className="row">
                <div className="col-lg-6">
                    <div className="tp-footer-shop-copyright-text pl-100">
                        <p className="space">©Agntix | {getCurrentYear()}</p>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="tp-footer-shop-copyright-text text-lg-end pr-100">
                        <p>Design & Dev: <Link className="tp-line-white" href="#">Aqlova</Link></p>
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default ShopModernCopyright;
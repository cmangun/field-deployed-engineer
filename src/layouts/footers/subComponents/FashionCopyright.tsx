import Link from 'next/link';
import React from 'react';

const FashionCopyright = () => {
    return (
        <div className="container container-1350">
            <div className="tp-footer-15-copyright pb-30">
                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6">
                        <div className="tp-footer-15-copyright-text text-center text-md-start">
                            <span>© All Rights Reserved. By Aqlova</span>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6">
                        <div className="tp-footer-15-copyright-text text-center text-md-end">
                            <span>
                                <Link href="mailto:info@example.com">info@example.com</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FashionCopyright;
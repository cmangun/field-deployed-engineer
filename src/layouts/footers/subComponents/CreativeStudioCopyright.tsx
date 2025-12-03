import { getCurrentYear } from '@/utils/getCurrentYear';
import Link from 'next/link';
import React from 'react';

const CreativeStudioCopyright = () => {
    return (
        <div className="tp-copyright-area">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="tp-copyright-content text-center">
                            <h2 className="tp-copyright-big-text">Agntix.studio</h2>
                        </div>
                    </div>
                </div>
                <div className="tp-copyright-bottom">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="tp-copyright-left text-center text-lg-start">
                                <span>©{getCurrentYear()} Agntix Design Studio.</span>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="tp-copyright-right text-center text-lg-end">
                                <Link href="#">Terms and Conditions</Link>
                                <Link href="#">Privacy Policy</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreativeStudioCopyright;
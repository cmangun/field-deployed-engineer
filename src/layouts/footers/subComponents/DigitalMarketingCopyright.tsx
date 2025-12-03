
import { EmailIconOne } from '@/svg';
import { getCurrentYear } from '@/utils/getCurrentYear';
import Link from 'next/link';
import React from 'react';

const DigitalMarketingCopyright = () => {
    return (
        <div className="tp-copyright-2-area tp-copyright-2-border black-bg-5">
            <div className="container container-1430">
                <div className="row align-items-center">
                    <div className="col-xl-4 col-lg-5 col-md-6">
                        <div className="tp-copyright-2-left text-center text-md-start z-index-1">
                            <p>© {getCurrentYear()} <Link href="#">Agntix</Link>. All Rights Reserved.</p>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 d-none d-lg-block">
                        <div className="tp-copyright-2-middle">
                            <Link href="mailto:agntix@gmail.com">
                                <span><EmailIconOne /></span>{" "}
                                agntix@gmail.com
                            </Link>
                        </div>
                    </div>
                    <div className="col-xl-5 col-lg-4 col-md-6">
                        <div className="tp-copyright-2-right">
                            <div className="tp-copyright-2-menu text-md-end text-center">
                                <ul>
                                    <li><Link href="#">Privacy policy </Link></li>{" "}
                                    <li><Link href="#">Terms and conditions</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DigitalMarketingCopyright;
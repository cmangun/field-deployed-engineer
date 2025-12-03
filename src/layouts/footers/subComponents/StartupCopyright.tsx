import { ArrowFour } from '@/svg';
import Link from 'next/link';
import React from 'react';

const StartupCopyright = () => {
    return (
        <div className="st-copyright-area st-copyright-ptb">
            <div className="container container-1320">
                <div className="row align-items-center">
                    <div className="col-lg-12">
                        <div className="st-copyright-text text-center">
                            <span className="st-copyright-sub">Ready to work together?</span>
                            <h3 className="st-copyright-title"><Link href="/portfolio-col-3-light">START PROJECT <span>
                                <ArrowFour width={14} height={14} />
                            </span>
                             </Link> 
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartupCopyright;
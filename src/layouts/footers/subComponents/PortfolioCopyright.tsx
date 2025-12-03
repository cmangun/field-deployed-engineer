import { getCurrentYear } from '@/utils/getCurrentYear';
import React from 'react';

const PortfolioCopyright = () => {
    return (
        <div className="pp-footer-copyright-area pp-footer-copyright-ptb">
            <div className="container container-1430">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="pp-footer-copyright-wrap">
                            <div className="pp-footer-copyright-text">
                                <p>© {getCurrentYear()} all rights reserved</p>
                            </div>
                            <div className="pp-footer-copyright-text-center">
                                <p>Available for a full-time position</p>
                            </div>
                            <div className="pp-footer-copyright-text">
                                <p>Made by Agntix.</p>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioCopyright;